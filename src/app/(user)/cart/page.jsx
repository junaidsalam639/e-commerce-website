import Cart from "../../../components/Cart";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata = {
  title: "Cart Page | NextCommerce Nextjs E-commerce template",
  description: "This is Cart Page for NextCommerce Template",
};

const CartPage = () => {
  return (
    <>
      <Header />
      <Cart />
      <Footer />
    </>
  );
};

export default CartPage;
