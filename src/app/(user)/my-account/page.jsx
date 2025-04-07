import MyAccount from "../../../components/MyAccount";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata= {
  title: "My Account | NextCommerce Nextjs E-commerce template",
  description: "This is My Account page for NextCommerce Template",
};

const MyAccountPage = () => {
  return (
    <main>
      <Header />
      <MyAccount />
      <Footer />
    </main>
  );
};

export default MyAccountPage;
