import Footer from "@/components/layout/Footer";
import "../styles/globals.css";

import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "@/store/provider";

const opensans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Zahalal",
  description: "Халяльный гид: рестораны, мечети и услуги по всей России",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={opensans.className}>
        <Toaster
          position="bottom-left"
        />
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
