import { FC } from "react";
import { Footer, Navbar } from "@components/common";
import s from "./Layout.module.css";

const Layout: FC = ({ children }) => {
  return (
    <div className={s.root}>
      <Navbar />
      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
