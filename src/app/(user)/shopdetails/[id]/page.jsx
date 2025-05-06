import ShopDetails from "../../../../components/ShopDetails";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

export const metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
};

async function ShopDetailsPage({ params }) {
  const { id } = await params;

  return (
    <main>
      <Header />
      <ShopDetails id={id} />
      <Footer />
    </main>
  );
};

export default ShopDetailsPage;
