import Error from "../../../components/Error";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata= {
  title: "Error Page | NextCommerce Nextjs E-commerce template",
  description: "This is Error Page for NextCommerce Template",
};

const ErrorPage = () => {
  return (
    <main>
      <Header />
      <Error />
      <Footer />
    </main>
  );
};

export default ErrorPage;
