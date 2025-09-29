import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaExchangeAlt, FaBook, FaUsers, FaRocket, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  // Sample book data for animation - only icons now
  const floatingBooks = [
    { color: "from-blue-400 to-blue-600" },
    { color: "from-purple-400 to-purple-600" },
    { color: "from-green-400 to-green-600" },
    { color: "from-red-400 to-red-600" },
    { color: "from-yellow-400 to-yellow-600" },
    { color: "from-indigo-400 to-indigo-600" },
    { color: "from-pink-400 to-pink-600" },
    { color: "from-teal-400 to-teal-600" },
    { color: "from-orange-400 to-orange-600" },
    { color: "from-cyan-400 to-cyan-600" },
    { color: "from-lime-400 to-lime-600" },
    { color: "from-rose-400 to-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Floating Books Background Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingBooks.map((book, index) => (
          <div
            key={index}
            className={`absolute text-white p-4 rounded-lg shadow-lg bg-gradient-to-r ${book.color} opacity-20 flex items-center justify-center`}
            style={{
              top: `${(index * 12) % 100}%`,
              left: `${(index * 18) % 100}%`,
              animation: `float${index % 3 + 1} ${15 + index * 2}s infinite ease-in-out`,
              transform: `scale(0.7)`,
              width: '60px',
              height: '60px'
            }}
          >
            <FaBook className="text-xl" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Discover & Swap{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Books
              </span>{' '}
              with Readers
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join a vibrant community of book lovers. Share your favorite stories, discover new adventures, 
              and build connections through the joy of reading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/books" 
                    className="group bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 z-20 relative"
                  >
                    <span>Browse Books</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/add-book" 
                    className="group border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 flex items-center space-x-3 z-20 relative"
                  >
                    <FaBook />
                    <span>Add Your Book</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="group bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 z-20 relative"
                  >
                    <span>Get Started Free</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/books" 
                    className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all duration-300 font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 flex items-center space-x-3 z-20 relative"
                  >
                    <FaBook />
                    <span>Browse Books</span>
                  </Link>
                </>
              )}
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Active Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">1K+</div>
                <div className="text-gray-600">Books Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">200+</div>
                <div className="text-gray-600">Successful Swaps</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose BookSwap Marketplace?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of book sharing with our modern, community-driven platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <FaExchangeAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Book Swapping</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Simple and intuitive book exchange system. Request books, manage trades, and connect 
                with fellow readers effortlessly in just a few clicks.
              </p>
              <ul className="mt-6 space-y-3">
                {['Instant requests', 'Real-time notifications', 'Easy tracking'].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-700">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-green-100 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <FaBook className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vast Book Collection</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Access thousands of books across all genres. From timeless classics to contemporary 
                bestsellers, discover your next favorite read in our growing library.
              </p>
              <ul className="mt-6 space-y-3">
                {['All genres covered', 'Quality verified', 'Detailed descriptions'].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-700">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-purple-100 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <FaUsers className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Join a passionate community of book lovers. Share reviews, exchange recommendations, 
                and engage in meaningful literary discussions with like-minded readers.
              </p>
              <ul className="mt-6 space-y-3">
                {['Reader reviews', 'Book discussions', 'Community events'].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-700">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Start your book swapping journey in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  1
                </div>
                <div className="absolute top-10 left-1/2 transform translate-x-12 w-16 h-1 bg-white/30 hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Create Account</h3>
              <div className="w-12 h-1 bg-blue-400 mx-auto mb-4"></div>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  2
                </div>
                <div className="absolute top-10 right-1/2 transform -translate-x-12 w-16 h-1 bg-white/30 hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Add Books</h3>
              <div className="w-12 h-1 bg-blue-400 mx-auto mb-4"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-white text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Start Swapping</h3>
              <div className="w-12 h-1 bg-blue-400 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.7); }
          33% { transform: translateY(-20px) translateX(10px) rotate(5deg) scale(0.7); }
          66% { transform: translateY(10px) translateX(-10px) rotate(-5deg) scale(0.7); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.7); }
          33% { transform: translateY(15px) translateX(-15px) rotate(-3deg) scale(0.7); }
          66% { transform: translateY(-10px) translateX(15px) rotate(3deg) scale(0.7); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.7); }
          33% { transform: translateY(-15px) translateX(-10px) rotate(2deg) scale(0.7); }
          66% { transform: translateY(20px) translateX(10px) rotate(-2deg) scale(0.7); }
        }

        @keyframes moveLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes moveRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .animate-moveLeft {
          animation: moveLeft 25s linear infinite;
        }

        .animate-moveRight {
          animation: moveRight 25s linear infinite;
        }

        .animate-moveLeft:hover,
        .animate-moveRight:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Home;