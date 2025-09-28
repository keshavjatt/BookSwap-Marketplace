import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaBook, FaInbox, FaPaperPlane, FaPlus, FaExchangeAlt, FaCheck, FaTimes, FaSync } from 'react-icons/fa';

const Dashboard = () => {
  const { user, refreshData, triggerRefresh } = useAuth();
  const [activeTab, setActiveTab] = useState('myBooks');
  const [myBooks, setMyBooks] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingRequest, setUpdatingRequest] = useState(null);

  // Dashboard data fetch karo - refreshData change hone par automatically
  useEffect(() => {
    fetchDashboardData();
  }, [refreshData]); // Yeh dependency add karo

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Parallel API calls karo
      const [booksRes, receivedRes, sentRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/books/user/my-books`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/requests/received`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/requests/sent`)
      ]);

      if (booksRes.data.success) setMyBooks(booksRes.data.data);
      if (receivedRes.data.success) setReceivedRequests(receivedRes.data.data);
      if (sentRes.data.success) setSentRequests(sentRes.data.data);

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Manual refresh function
  const handleManualRefresh = () => {
    fetchDashboardData();
    toast.success('Dashboard updated!');
  };

  // Request status update karo
  const updateRequestStatus = async (requestId, status) => {
    setUpdatingRequest(requestId);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${requestId}/status`,
        { status }
      );

      if (response.data.success) {
        // LOCAL STATE UPDATE - REAL TIME
        if (status === 'accepted') {
          // My books update karo
          setMyBooks(prev =>
            prev.map(book =>
              book._id === response.data.data.book._id 
                ? { ...book, available: false }
                : book
            )
          );
          
          // Received requests update karo
          setReceivedRequests(prev => 
            prev.map(req => 
              req._id === requestId ? response.data.data : req
            )
          );
          
          // Sent requests mein bhi update karo (agar kisi aur ne request ki thi same book ke liye)
          setSentRequests(prev =>
            prev.map(req =>
              req.book._id === response.data.data.book._id && req.status === 'pending'
                ? { ...req, status: 'declined' }
                : req
            )
          );
        } else {
          // Just received requests update karo
          setReceivedRequests(prev => 
            prev.map(req => 
              req._id === requestId ? response.data.data : req
            )
          );
        }
        
        toast.success(`Request ${status} successfully`);
        
        // Global refresh trigger karo taaki books page bhi update ho
        triggerRefresh();
      }
    } catch (error) {
      console.error('Request status update error:', error);
      const message = error.response?.data?.message || 'Failed to update request';
      toast.error(message);
    } finally {
      setUpdatingRequest(null);
    }
  };

  // Loading state
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
        {/* Dashboard Header with Refresh Button */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-600">
                  Manage your books and swap requests from your dashboard.
                </p>
              </div>
              <button
                onClick={handleManualRefresh}
                className="md:hidden flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaSync className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={handleManualRefresh}
                className="hidden md:flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <FaSync className="mr-2 h-4 w-4" />
                Refresh
              </button>
              <Link
                to="/add-book"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <FaPlus className="mr-2 -ml-1 h-4 w-4" />
                Add New Book
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <FaBook className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-600">My Books</p>
                  <p className="text-2xl font-bold text-gray-900">{myBooks.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <FaInbox className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Received Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{receivedRequests.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center">
                <FaPaperPlane className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-600">Sent Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{sentRequests.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'myBooks', name: 'My Books', icon: FaBook, count: myBooks.length },
                { id: 'received', name: 'Received Requests', icon: FaInbox, count: receivedRequests.length },
                { id: 'sent', name: 'Sent Requests', icon: FaPaperPlane, count: sentRequests.length }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.name}
                    <span className="ml-2 bg-gray-200 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* My Books Tab */}
            {activeTab === 'myBooks' && (
              <div>
                {myBooks.length === 0 ? (
                  <div className="text-center py-8">
                    <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No books added yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first book to swap!</p>
                    <Link
                      to="/add-book"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FaPlus className="mr-2 -ml-1 h-4 w-4" />
                      Add Your First Book
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myBooks.map((book) => (
                      <div key={book._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 line-clamp-2">{book.title}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            book.available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {book.available ? 'Available' : 'Swapped'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                        <p className="text-gray-500 text-sm mb-2">Condition: {book.condition}</p>
                        {book.description && (
                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{book.description}</p>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {receivedRequests.filter(req => req.book._id === book._id).length} requests
                          </span>
                          {book.available && (
                            <span className="text-xs text-green-600">Accepting requests</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Received Requests Tab */}
            {activeTab === 'received' && (
              <div>
                {receivedRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <FaInbox className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No requests received</h3>
                    <p className="text-gray-600">When someone requests your books, they'll appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {receivedRequests.map((request) => (
                      <div key={request._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{request.book.title}</h4>
                            <p className="text-gray-600 text-sm">
                              Requested by {request.requester.name}
                            </p>
                            <p className="text-gray-500 text-sm">{request.requester.email}</p>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                        
                        {request.message && (
                          <p className="text-gray-600 text-sm mb-3 bg-white p-3 rounded border">
                            "{request.message}"
                          </p>
                        )}

                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateRequestStatus(request._id, 'accepted')}
                              disabled={updatingRequest === request._id}
                              className="flex-1 inline-flex items-center justify-center bg-green-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                              <FaCheck className="mr-2 h-4 w-4" />
                              {updatingRequest === request._id ? 'Accepting...' : 'Accept'}
                            </button>
                            <button
                              onClick={() => updateRequestStatus(request._id, 'declined')}
                              disabled={updatingRequest === request._id}
                              className="flex-1 inline-flex items-center justify-center bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                              <FaTimes className="mr-2 h-4 w-4" />
                              {updatingRequest === request._id ? 'Declining...' : 'Decline'}
                            </button>
                          </div>
                        )}

                        {request.status === 'accepted' && (
                          <div className="bg-green-50 border border-green-200 rounded p-3">
                            <p className="text-green-800 text-sm">
                              You accepted this swap request. Please contact {request.requester.name} at {request.requester.email} to arrange the book exchange.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sent Requests Tab */}
            {activeTab === 'sent' && (
              <div>
                {sentRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <FaPaperPlane className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No requests sent</h3>
                    <p className="text-gray-600 mb-4">When you request books from others, they'll appear here.</p>
                    <Link
                      to="/books"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FaExchangeAlt className="mr-2 -ml-1 h-4 w-4" />
                      Browse Books
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sentRequests.map((request) => (
                      <div key={request._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{request.book.title}</h4>
                            <p className="text-gray-600 text-sm">
                              Owner: {request.owner.name}
                            </p>
                            <p className="text-gray-500 text-sm">{request.owner.email}</p>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                        
                        {request.message && (
                          <p className="text-gray-600 text-sm mb-3 bg-white p-3 rounded border">
                            Your message: "{request.message}"
                          </p>
                        )}

                        {request.status === 'accepted' && (
                          <div className="bg-green-50 border border-green-200 rounded p-3">
                            <p className="text-green-800 text-sm">
                              Your request was accepted! Please contact {request.owner.name} at {request.owner.email} to arrange the book exchange.
                            </p>
                          </div>
                        )}

                        {request.status === 'declined' && (
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <p className="text-red-800 text-sm">
                              Your request was declined. You can browse other available books.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;