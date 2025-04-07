import ShopWithSidebar from "../../../components/ShopWithSidebar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata= {
  title: "Shop Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Page for NextCommerce Template",
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <Header />
      <ShopWithSidebar />
      <Footer />
    </main>
  );
};

export default ShopWithSidebarPage;
