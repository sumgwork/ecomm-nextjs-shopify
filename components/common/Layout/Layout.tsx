import { FC } from "react";
import { Footer, Navbar } from "@components/common";
import s from "./Layout.module.css";
import { Sidebar } from "@components/ui";
import { CartSidebar } from "@components/cart";
import { useUI } from "@components/ui/context";
import { ApiProvider } from "@common";

const Layout: FC = ({ children }) => {
  const context = useUI();
  return (
    <ApiProvider>
      <div className={s.root}>
        <Navbar />
        <Sidebar isOpen={context.isSidebarOpen}>
          <CartSidebar />
        </Sidebar>
        <main className="fit">{children}</main>
        <Footer />
      </div>
    </ApiProvider>
  );
};

export default Layout;
