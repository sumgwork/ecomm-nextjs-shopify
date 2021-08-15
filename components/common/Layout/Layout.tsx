import { FC } from "react";

const Layout: FC = ({ children }) => {
  return (
    <div className="layout">
      <hr />
      {children}
    </div>
  );
};

export default Layout;
