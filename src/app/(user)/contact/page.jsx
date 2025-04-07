import Contact from "../../../components/Contact";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

export const metadata= {
  title: "Contact Page | NextCommerce Nextjs E-commerce template",
  description: "This is Contact Page for NextCommerce Template",
};

const ContactPage = () => {
  return (
    <main>
      <Header />
      <Contact />
      <Footer />
    </main>
  );
};

export default ContactPage;
