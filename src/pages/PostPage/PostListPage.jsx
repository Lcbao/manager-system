import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchPosts from "../../api/PostsApi";
import { data } from "react-router-dom";
import GetPageNumbers from "../../pagenumbers/GetPageNumbers";
import PostList from "../../components/Posts/PostList";

export default function PostListPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    id: "",
    user_id: "",
    title: "",
  });

  const { data: postsData, isLoading, isError, isFetching } = useQuery({
    queryKey: ["users", filters, page], 
    queryFn: () => fetchPosts({ ...filters, page }), 
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
  
  const posts = postsData?.data || [];
  const totalPages = postsData?.totalPages || 1;
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 pt-16">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
        ✨ Post List (Page {page})
      </h1>
      {isLoading && <p className="text-center text-gray-500">Loading users...</p>}
      {isError && <p className="text-center text-red-500">Error fetching users.</p>}

      {data && <PostList posts={posts} />}
   

      <div className="flex flex-col items-center mt-10 gap-4">
  <div className="flex flex-wrap justify-center gap-2">
    <button
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg disabled:opacity-50"
      disabled={page === 1}
      onClick={() => setPage((p) => p - 1)}
    >
      ⬅ Previous
    </button>

    <div className="flex flex-wrap justify-center items-center gap-2 font-medium py-2 px-4 rounded-lg">

  {page >= 4 && (
    <>
      <button
        onClick={() => setPage(1)}
        className={`px-3 py-1 rounded-lg font-semibold border transition ${
          page === 1
            ? 'bg-blue-600 text-white border-blue-700'
            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
        }`}
      >
        1
      </button>
      {GetPageNumbers(page, totalPages).at(0) > 2 && (
        <span className="px-2 text-gray-400 font-semibold">...</span>
      )}
    </>
  )}

  {GetPageNumbers(page, totalPages).map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => setPage(pageNumber)}
      className={`px-3 py-1 rounded-lg font-semibold border transition ${
        pageNumber === page
          ? 'bg-blue-600 text-white border-blue-700'
          : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
      }`}
    >
      {pageNumber}
    </button>
  ))}

 
  {page < totalPages -2 && (
    <>
      {GetPageNumbers(page, totalPages).at(-1) < totalPages - 1 && (
        <span className="px-2 text-gray-400 font-semibold">...</span>
      )}
      <button
        onClick={() => setPage(totalPages)}
        className={`px-3 py-1 rounded-lg font-semibold border transition ${
          page === totalPages
            ? 'bg-blue-600 text-white border-blue-700'
            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
        }`}
      >
        {totalPages}
      </button>
    </>
  )}
</div>


    <button
      className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
      onClick={() => setPage((p) => p + 1)}
      disabled={page === totalPages}
    >
      Next ➡
    </button>
  </div>

  {isFetching && <span className="text-purple-500 text-sm">Đang tải...</span>}
</div>
    </div>
  )
}