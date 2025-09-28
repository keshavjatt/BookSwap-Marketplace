import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaSearch, FaBook, FaUser, FaExchangeAlt, FaPlus, FaSync } from 'react-icons/fa';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [requesting, setRequesting] = useState(false);
  const { isAuthenticated, user, refreshData, triggerRefresh } = useAuth();

  // Books fetch karo backend se - refreshData change hone par automatically
  useEffect(() => {
    fetchBooks();
  }, [refreshData]); // Yeh dependency add karo

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/books`);
      
      if (response.data.success) {
        setBooks(response.data.data);
      }
    } catch (error) {
      console.error('Books fetch error:', error);
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  // Manual refresh function
  const handleManualRefresh = () => {
    fetchBooks();
    toast.success('Books list updated!');
  };

  // Book request send karo
  const handleRequestBook = async (bookId) => {
    if (!isAuthenticated) {
      toast.error('Please login to request books');
      return;
    }

    setRequesting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/requests`, {
        bookId,
        message: `Hi, I would like to swap this book with you!`
      });

      if (response.data.success) {
        toast.success('Book request sent successfully!');
        
        // Local state update karo - REAL TIME UPDATE
        setBooks(prevBooks => 
          prevBooks.map(book => 
            book._id === bookId ? { ...book, available: false } : book
          )
        );
        
        // Global refresh trigger karo taaki dashboard bhi update ho
        triggerRefresh();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send request';
      toast.error(message);
    } finally {
      setRequesting(false);
    }
  };

  // Search aur filter apply karo
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = !filterCondition || book.condition === filterCondition;
    
    return matchesSearch && matchesCondition;
  });

  // Condition badge color decide karo
  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check karo ki user ne book request bheji hai ya nahi
  const hasUserRequestedBook = (book) => {
    return !book.available;
  };

  // Check karo ki user book ka owner hai ya nahi
  const isUserOwner = (book) => {
    return isAuthenticated && user && book.owner._id === user._id;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header with Refresh Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Books</h1>
            <p className="text-lg text-gray-600">
              Discover amazing books available for swapping
            </p>
          </div>
          <div className="flex items-center space-x-4 justify-center md:justify-end">
            <button
              onClick={handleManualRefresh}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <FaSync className="mr-2 h-4 w-4" />
              Refresh
            </button>
            {isAuthenticated && (
              <Link
                to="/add-book"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <FaPlus className="mr-2 -ml-1 h-4 w-4" />
                Add Book
              </Link>
            )}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Condition Filter */}
            <select
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All Conditions</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600 mb-4">
              {books.length === 0 ? 'No books available yet. Be the first to add one!' : 'Try adjusting your search or filter criteria.'}
            </p>
            {isAuthenticated && (
              <Link
                to="/add-book"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <FaPlus className="mr-2 -ml-1 h-4 w-4" />
                Add Your First Book
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div key={book._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Book Image */}
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {book.image ? (
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaBook className="h-12 w-12 text-gray-400" />
                    )}
                  </div>

                  {/* Book Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-2 flex items-center">
                      <FaUser className="mr-2 h-4 w-4" />
                      {book.author}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConditionColor(book.condition)}`}>
                        {book.condition.charAt(0).toUpperCase() + book.condition.slice(1)}
                      </span>
                      
                      {book.available ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Unavailable
                        </span>
                      )}
                    </div>

                    {/* Owner Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>By {book.owner?.name}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {isUserOwner(book) ? (
                        <button 
                          disabled
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                        >
                          Your Book
                        </button>
                      ) : hasUserRequestedBook(book) ? (
                        <button 
                          disabled
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                        >
                          Requested
                        </button>
                      ) : !book.available ? (
                        <button 
                          disabled
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                        >
                          Not Available
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleRequestBook(book._id)}
                          disabled={requesting || !isAuthenticated}
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <FaExchangeAlt className="mr-2 h-4 w-4" />
                          {requesting ? 'Requesting...' : 'Request Swap'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-6 text-center text-gray-600">
              Showing {filteredBooks.length} of {books.length} books
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Books;