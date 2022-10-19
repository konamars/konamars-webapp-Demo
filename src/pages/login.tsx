import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "@tanstack/react-location";
import { toast } from "react-toastify";
import illustrationSrc from "../assets/illustration-login.png";
import logoSrc from "../assets/logo.png";

const searchParams = new URLSearchParams(window.location.search);
console.log(
  "🚀 ~ file: login.tsx ~ line 9 ~ searchParams",
  searchParams.toString()
);
if (searchParams.has("error_description")) {
  toast(searchParams.get("error_description"));
}

function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleSignIn = () => {
    loginWithRedirect({
      redirectUri:
        import.meta.env.MODE === "development"
          ? "http://localhost:3000"
          : undefined,
    });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="h-screen">
      <div className="flex">
        <div className="flex w-1/3 flex-col items-center justify-center p-4 pb-72">
          <div className="pb-16">
            <img src={logoSrc} alt="Digital Lync Logo" />
          </div>
          <div className="py-16 text-center">
            <h1 className="text-3xl capitalize text-gray-800">Welcome</h1>
            <p className="pt-4 text-gray-500">
              Please sign in to your account below
            </p>
          </div>
          <div>
            <button
              onClick={handleSignIn}
              className="btn btn-primary btn-wide capitalize"
            >
              <span className="text-white">Sign In</span>
            </button>
          </div>
        </div>
        <div className="w-2/3">
          <img
            src={illustrationSrc}
            className="h-screen w-full"
            alt="Learn skills in your own pace"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
