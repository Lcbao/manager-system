import UserCard from "./UserCard";

export default function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-400 italic">No users found.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
