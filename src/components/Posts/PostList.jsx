import PostCard from "./PostCard";


export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-400 italic">No posts found.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}