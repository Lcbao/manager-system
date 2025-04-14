import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2";

export const fetchUsers = async (filters = {}, page = 1) => {
  const params = new URLSearchParams({ ...filters, page }).toString();
  const res = await axios.get(`${API_URL}/users?${params}`);
  return {
    data: res.data,
    totalPages: Number(res.headers["x-pagination-pages"]) || 1,
    currentPage: Number(res.headers["x-pagination-page"]) || page,
  };
};

// export const fetchUsers = async (filters = {}, page = 1) => {
//   const params = new URLSearchParams();
//   if (filters.name) params.append("name", filters.name);
//   if (filters.email) params.append("email", filters.email);
//   if (filters.gender) params.append("gender", filters.gender);
//   if (filters.status) params.append("status", filters.status);
//   if (page) params.append("page", page);
//   const res = await axios.get(`${API_URL}/users?${params.toString()}`);
//   return res.data;
// };

export const fetchUserDetail = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`);
  return res.data;
};

export default fetchUsers;
