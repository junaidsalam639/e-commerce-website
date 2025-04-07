import ShopWithoutSidebar from "../../../components/ShopWithoutSidebar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata= {
  title: "Shop Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Page for NextCommerce Template",
};

const ShopWithoutSidebarPage = () => {
  return (
    <main>
      <Header />
      <ShopWithoutSidebar />
      <Footer />
    </main>
  );
};

export default ShopWithoutSidebarPage;
