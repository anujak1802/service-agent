import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-700">
                Complaint Management System
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex">
              <Link
                to="/"
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${location.pathname === '/' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Home
              </Link>
              <Link
                to="/submit"
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${location.pathname === '/submit' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Submit Complaint
              </Link>
              {/* <Link
                to="/admin"
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${location.pathname === '/admin' ? 'border-blue-500 text-blue-600极狐' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Admin Dashboard
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;