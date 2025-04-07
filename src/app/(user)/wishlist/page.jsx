import { Wishlist } from "../../../components/Wishlist";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata= {
  title: "Wishlist Page | NextCommerce Nextjs E-commerce template",
  description: "This is Wishlist Page for NextCommerce Template",
};

const WishlistPage = () => {
  return (
    <main>
      <Header />
      <Wishlist />
      <Footer />
    </main>
  );
};

export default WishlistPage;
