import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaExchangeAlt, FaBook, FaUsers, FaRocket } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Swap Your <span className="text-blue-600">Books</span> with Readers Worldwide
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover new stories, share your favorites, and build a community of book lovers. 
            Trade books effortlessly with our modern book swapping platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/books" 
                  className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg text-center"
                >
                  Browse Books
                </Link>
                <Link 
                  to="/add-book" 
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold text-lg text-center"
                >
                  Add Your Book
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg text-center"
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/books" 
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 md:px-8 md:py-4 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors font-semibold text-lg text-center"
                >
                  Browse Books
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose BookSwap?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              The modern way to discover, share, and exchange books with fellow readers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FaExchangeAlt className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Swapping</h3>
              <p className="text-gray-600">
                Simple and intuitive book exchange system. Request books, manage trades, and connect with other readers effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FaBook className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vast Collection</h3>
              <p className="text-gray-600">
                Access thousands of books across all genres. From classics to contemporary, find your next favorite read.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Join a passionate community of book lovers. Share reviews, recommendations, and literary discussions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How BookSwap Works</h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Account</h3>
              <p className="text-blue-100">
                Sign up for free and set up your reader profile in minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Add Your Books</h3>
              <p className="text-blue-100">
                List books you want to swap with photos and descriptions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Swapping</h3>
              <p className="text-blue-100">
                Browse books, send requests, and arrange exchanges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <FaRocket className="text-4xl text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Book Journey?</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Join thousands of readers who are already swapping books and discovering new stories.
            </p>
            {isAuthenticated ? (
              <Link 
                to="/books" 
                className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg inline-block"
              >
                Browse Available Books
              </Link>
            ) : (
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg inline-block"
              >
                Join BookSwap Today
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;