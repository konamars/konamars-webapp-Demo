import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import UserDataProvider from "./UserDataProvider";

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider(props: AuthProviderProps) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      audience={import.meta.env.VITE_AUTH0_API_AUDIENCE}
      redirectUri={window.location.origin}
      useRefreshTokens={true}
    >
      <UserDataProvider>{props.children}</UserDataProvider>
    </Auth0Provider>
  );
}

export default AuthProvider;
