import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2";

export const fetchPosts = async (filters = {}, page = 1) => {
  const params = new URLSearchParams({ ...filters, page }).toString();
  const res = await axios.get(`${API_URL}/posts?${params}`);
  return {
    data: res.data,
    totalPages: Number(res.headers["x-pagination-pages"]) || 1,
    currentPage: Number(res.headers["x-pagination-page"]) || page,
  };
};

export const fetchPostDetail = async (id) => {
  const res = await axios.get(`${API_URL}/posts/${id}`);
  return res.data;
};

export default fetchPosts;
