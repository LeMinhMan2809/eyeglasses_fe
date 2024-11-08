import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:4000/api/blog").then((response) => {
      // console.log(response.data);
      setBlogData(response.data.blogs);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    });
  }, [currentPage, pageSize]);

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 ml-[6rem]">
        Bài viết
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ml-[6rem] mr-[6rem]">
        {blogData.map((post, index) => (
          <BlogCard
            key={index}
            image={post.image}
            title={post.title}
            date={new Date(post.createdAt).toLocaleDateString("vi-VN")}
            description={post.description}
            content={post.content}
          />
        ))}
      </div>
      <Stack className="mt-5 items-center" spacing={2}>
        <Pagination
          shape="rounded"
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          variant="outlined"
        />
      </Stack>
    </div>
  );
};

export default Blog;
