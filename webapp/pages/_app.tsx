import "../styles/globals.css";
import "../styles/_preloader.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
