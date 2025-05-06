import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../components/Home";

export const metadata = {
  title: "E-commerce | Nextjs E-commerce template",
  description: "This is Home Page",
};

export default function HomePage() {

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
