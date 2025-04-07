import ShopDetails from "../../../components/ShopDetails";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
};

function ShopDetailsPage() {
  return (
    <main>
      <Header />
      <ShopDetails />
      <Footer />
    </main>
  );
};

export default ShopDetailsPage;
