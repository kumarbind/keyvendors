import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { store, persistor, wrapper } from "../store/store";
import theme from "../config/theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createEmotionCache from "../config/createEmotionCache";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css"; //here
import "slick-carousel/slick/slick-theme.css"; //here
import "../styles/globals.css";
import "../styles/slider.css";
import "../styles/carousel.css";
import NextNProgress from "nextjs-progressbar";
import { MetaInfo } from "components/style/MetaInfo";
import ErrorBoundary from "components/style/ErrorBoundary";
import { RouteGuard } from "components/style/RouteGuard";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { metaInfo } = pageProps;
  return (
    <Provider store={store}>
      {metaInfo && <MetaInfo metaInfo={metaInfo} />}
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <ErrorBoundary>
              <CssBaseline />
              <NextNProgress />
              <RouteGuard>
                <Component {...pageProps} />
              </RouteGuard>

              <ToastContainer
                position="top-right"
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
              />
            </ErrorBoundary>
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps };
};

//export default wrapper.withRedux(MyApp);
