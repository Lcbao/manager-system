import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetail } from "../api/UsersApi";

export default function UserDetailPage() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserDetail(id),
  });

  if (isLoading) return <div className="p-6">Loading user...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading user detail</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
      <p className="mb-2"><strong>ID:</strong> {user.id}</p>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Gender:</strong> {user.gender}</p>
      <p className="mb-2"><strong>Status:</strong> {user.status}</p>
    </div>
  );
}
