import Signin from "../../../components/Auth/Signin";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata= {
  title: "Signin Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",
};

const SigninPage = () => {
  return (
    <main>
      <Header />
      <Signin />
      <Footer />
    </main>
  );
};

export default SigninPage;
