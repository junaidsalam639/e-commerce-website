import MailSuccess from "../../../components/MailSuccess";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
export const metadata= {
  title: "Mail Success Page | NextCommerce Nextjs E-commerce template",
  description: "This is Mail Success Page for NextCommerce Template",
};

const MailSuccessPage = () => {
  return (
    <main>
      <Header />
      <MailSuccess />
      <Footer />
    </main>
  );
};

export default MailSuccessPage;
