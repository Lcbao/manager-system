import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="bg-green-300 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
      
        <Link to="/" className="flex items-center space-x-2">
          {/* <img
            src="uhost-icon.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          /> */}
          <span className="text-xl font-bold text-blue-700">Manange System</span>
        </Link>

 
        <nav className="flex space-x-4">
          <Link
            to="/users"
            className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition"
          >
            User List
          </Link>
          <Link
            to="/posts"
            className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-semibold hover:bg-purple-600 transition"
          >
            Posts
          </Link>
          
        </nav>
      </div>
    </header>
  );
}
