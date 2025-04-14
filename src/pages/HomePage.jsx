import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/UsersApi";
import  UserCard  from "../components/UserCard";
import { useState, useEffect } from "react";
import UserList from "../components/UserList";
import { data } from "react-router-dom";
import GetPageNumbers from "../pagenumbers/GetPageNumbers";
import { useDebounce } from "../hooks/UseDebounce";


export default function HomePage() {
  const [page, setPage] = useState(1);
  
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  const debouncedName = useDebounce(filters.name, 500);
  const debouncedEmail = useDebounce(filters.email, 500);
  

  
  useEffect(() => {
    setPage(1);
  }, [filters.name, filters.gender, filters.status]);

  const handleResetFilters = () => {
    const isChanged =
      filters.name !== "" ||
      filters.email !== "" ||
      filters.gender !== "" ||
      filters.status !== "";
  
    if (isChanged) {
      setFilters({
        name: "",
        email: "",
        gender: "",
        status: "",
      });
      setPage(1); 
    }
  };
  
  

  const { data: usersData, isLoading, isError, isFetching } = useQuery({
    queryKey: ["users", { 
      name: debouncedName,
      email: debouncedEmail,
      gender: debouncedGender,
      status: debouncedStatus, 
    }, page],
    
    queryFn: () => fetchUsers({ ...filters,
      name: debouncedName,
      email: debouncedEmail,
    
      page,
    }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
  const users = usersData?.data || [];
  const totalPages = usersData?.totalPages || 1;
  
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
        ✨ User List (Page {page})
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={filters.name}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, name: e.target.value }))
            
          }
          className="border px-4 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Tìm theo email..."
          value={filters.email}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, email: e.target.value }))
          }
          className="border px-4 py-2 rounded-lg"
        />
 <div className="relative w-52">
  <select
    value={filters.gender}
    onChange={(e) =>
      setFilters((prev) => ({ ...prev, gender: e.target.value }))
    }
    className="appearance-none border w-full px-4 py-2 pr-10 rounded-lg"
  >
    <option value="">Giới tính: Tất cả</option>
    <option value="male">Nam</option>
    <option value="female">Nữ</option>
  </select>

  <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
    </div>
  </div>
  <div className="relative w-52">
  <select
    value={filters.gender}
    onChange={(e) =>
      setFilters((prev) => ({ ...prev, status: e.target.value }))
    }
    className="appearance-none border w-full px-4 py-2 pr-10 rounded-lg"
  >
    <option value="">Trạng thái: Tất cả</option>
    <option value="active">Đang hoạt động</option>
    <option value="inactive">Chưa hoạt động</option>
  </select>
  

  <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
    </div>
    
  </div>
   <button
    onClick={handleResetFilters}
    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
  >
    Reset 
  </button>
  
  </div>

      {isLoading && <p className="text-center text-gray-500">Loading users...</p>}
      {isError && <p className="text-center text-red-500">Error fetching users.</p>}

      {data && <UserList users={users} />}
   

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
  );
}