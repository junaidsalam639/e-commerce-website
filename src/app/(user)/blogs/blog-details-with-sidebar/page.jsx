import BlogDetailsWithSidebar from "../../../../components/BlogDetailsWithSidebar";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
export const metadata = {
  title: "Blog Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Blog Details Page for NextCommerce Template",
};

const BlogDetailsWithSidebarPage = () => {
  return (
    <main>
      <Header />
      <BlogDetailsWithSidebar />
      <Footer />
    </main>
  );
};

export default BlogDetailsWithSidebarPage;
