import "../styles/globals.css";
import {
  ViewProvider,
  ProfileProvider,
  ChatProvider,
  NavProvider,
  PathProvider,
} from "../Components/PagesContext";
import { ToastContainer } from "react-toastify";
import NavBar from "../Components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div id="structure">
        <PathProvider>
          <NavProvider>
            <ChatProvider>
              <ProfileProvider>
                <ViewProvider>
                  <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    className="myToast"
                  />
                  <NavBar />
                  <Component {...pageProps} />
                </ViewProvider>
              </ProfileProvider>
            </ChatProvider>
          </NavProvider>
        </PathProvider>
      </div>
    </>
  );
}

export default MyApp;
