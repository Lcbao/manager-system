import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <div className="bg-gradient-to-br from-pink-100 to-blue-100 p-[2px] rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xl font-bold text-blue-700 mb-1">{user.name}</h3>
        <p className="text-gray-600 text-sm">📧 {user.email}</p>
        <p className="text-gray-600 text-sm">{user.gender === "male" ? "👨🏼‍💼 male" : user.gender === "female" ? "👩🏼‍💼 female" : "Unknown"}</p>
        <p
          className={`text-sm mt-1 ${
            user.status === "active" ? "text-green-600" : "text-red-500"
          }`}
        >
          ⚡ Status: {user.status}
        </p>
        <Link
          to={`/users/${user.id}`}
          className="inline-block mt-3 px-4 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-green-600 transition"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}