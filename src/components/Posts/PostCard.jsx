import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="bg-gradient-to-br from-pink-100 to-blue-100 p-[2px] rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xl font-bold text-blue-700 mb-1">{post.id}</h3>
        <p className="text-gray-600 text-sm">{post.user_id}</p>
        <p className="text-gray-600 text-sm">{post.title}</p>
        
        <Link
          to={`/users/${post.id}`}
          className="inline-block mt-3 px-4 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-green-600 transition"
        >
          View Post Details →
        </Link>
      </div>
    </div>
  );
}