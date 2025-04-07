import React from "react";
import BlogGridWithSidebar from "../../../../components/BlogGridWithSidebar";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
export const metadata= {
  title: "Blog Grid Page | NextCommerce Nextjs E-commerce template",
  description: "This is Blog Grid Page for NextCommerce Template",
};

const BlogGridWithSidebarPage = () => {
  return (
    <>
      <Header />
      <BlogGridWithSidebar />
      <Footer />
    </>
  );
};

export default BlogGridWithSidebarPage;
