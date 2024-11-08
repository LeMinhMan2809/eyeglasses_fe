import React from "react";

const BlogCard = ({ image, title, date, description, content }) => {
  const url = "http://localhost:4000";
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg">
      <img
        src={url + "/images/blog/" + image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{`Tin tức | ${date}`}</p>
        <p className="text-gray-700">{description}</p>
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
    </div>
  );
};

export default BlogCard;
