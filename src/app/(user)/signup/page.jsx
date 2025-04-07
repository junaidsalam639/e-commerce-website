import Signup from "../../../components/Auth/Signup";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata = {
  title: "Signup Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signup Page for NextCommerce Template",
};

const SignupPage = () => {
  return (
    <main>
      <Header />
      <Signup />
      <Footer />
    </main>
  );
};

export default SignupPage;
