import { FC } from "react";
import { AppProps } from "next/app";

const Noop: FC = ({ children }) => <>{children}</>;

const MyApp = ({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) => {
  const Layout = Component.Layout ?? Noop;
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
