import "./App.css";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { LocationGenerics, routes } from "./routes";
import { useAuth0, GetTokenSilentlyOptions } from "@auth0/auth0-react";
import Login from "./pages/login";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import useTopbarLoader from "./hooks/useTopbarLoader";

const location = new ReactLocation<LocationGenerics>();

// This function is used for fetching access token outside react tree.
export let getToken:
  | ((options?: GetTokenSilentlyOptions) => Promise<string>)
  | null = null;

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  getToken = getAccessTokenSilently;

  useTopbarLoader(isLoading);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {isAuthenticated ? (
        <Router location={location} routes={routes}>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </Router>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
