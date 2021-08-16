import { FC } from "react";
import { AppProps } from "next/app";
import "@assets/main.css";
import { UIProvider } from "@components/ui/context";

const NoLayout: FC = ({ children }) => <>{children}</>;

const MyApp = ({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) => {
  const Layout = Component.Layout ?? NoLayout;
  return (
    <>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </>
  );
};

export default MyApp;
