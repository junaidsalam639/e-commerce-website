import BlogDetails from "../../../../components/BlogDetails";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
export const metadata = {
  title: "Blog Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Blog Details Page for NextCommerce Template",
};

const BlogDetailsPage = () => {
  return (
    <main>
      <Header />
      <BlogDetails />
      <Footer />
    </main>
  );
};

export default BlogDetailsPage;
