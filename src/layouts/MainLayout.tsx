import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import logoSrc from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt, FaExternalLinkAlt } from "react-icons/fa";
import { Link, useLocation, useRouter } from "@tanstack/react-location";
import TopBarLoader from "../components/TopBarLoader";
import clsx from "clsx";
import useUserData from "../hooks/useUserData";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout(props: MainLayoutProps) {
  const { logout } = useAuth0();
  const { userData } = useUserData();
  const router = useRouter();
  const location = useLocation();

  return (
    <div>
      {router.pending ? <TopBarLoader /> : null}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 drop-shadow-lg">
        <div>
          <Link to={"/"}>
            <img src={logoSrc} alt="Digital Lync Logo" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {location.current.pathname.includes("/admin") ? null : (
            <div>
              <Link
                // target={"_blank"}
                to={"admin"}
                className="link-primary  text-blue-500"
              >
                <span className="flex items-center">
                  Admin Portal <FaExternalLinkAlt className="pl-1" />
                </span>
              </Link>
            </div>
          )}

          <div className={clsx("dropdown-hover dropdown-end dropdown")}>
            <label tabIndex={0} className="m-1">
              <div className="avatar cursor-pointer">
                <div className="h-12 w-12 rounded-full">
                  <img src={userData?.picture} alt="Profile" />
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link to={"profile"}>
                  <CgProfile />
                  My Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() =>
                    logout({
                      returnTo:
                        import.meta.env.MODE === "development"
                          ? "http://localhost:3000"
                          : undefined,
                    })
                  }
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="min-h-screen pb-20">{props.children}</div>
    </div>
  );
}

export default MainLayout;
