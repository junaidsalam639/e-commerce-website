import BlogGrid from "../../../../components/BlogGrid";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

export const metadata= {
  title: "Blog Grid Page | NextCommerce Nextjs E-commerce template",
  description: "This is Blog Grid Page for NextCommerce Template",
};

const BlogGridPage = () => {
  return (
    <main>
      <Header />
      <BlogGrid />
      <Footer />
    </main>
  );
};

export default BlogGridPage;
