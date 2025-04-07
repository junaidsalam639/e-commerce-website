import Checkout from "../../../components/Checkout";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata= {
  title: "Checkout Page | NextCommerce Nextjs E-commerce template",
  description: "This is Checkout Page for NextCommerce Template",
};

const CheckoutPage = () => {
  return (
    <main>
      <Header />
      <Checkout />
      <Footer />
    </main>
  );
};

export default CheckoutPage;
