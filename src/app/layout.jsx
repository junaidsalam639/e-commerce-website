import "./css/euclid-circular-a-font.css";
import "./css/style.css";
import "./css/async-gallery.css";
import { ModalProvider } from "./context/QuickViewModalContext";
import { CartModalProvider } from "./context/CartSidebarModalContext";
import { ReduxProvider } from "../redux/provider";
import QuickViewModal from "../components/Common/QuickViewModal";
import CartSidebarModal from "../components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "./context/PreviewSliderContext";
import PreviewSliderModal from "../components/Common/PreviewSlider";
import ScrollToTop from "../components/Common/ScrollToTop";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <>
          <ReduxProvider>
            <CartModalProvider>
              <ModalProvider>
                <PreviewSliderProvider>
                  {children}
                  <QuickViewModal />
                  <CartSidebarModal />
                  <PreviewSliderModal />
                </PreviewSliderProvider>
              </ModalProvider>
            </CartModalProvider>
          </ReduxProvider>
          <ScrollToTop />
          <Toaster />
        </>
      </body>
    </html>
  );
}
