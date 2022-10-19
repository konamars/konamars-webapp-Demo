import { useContext } from "react";
import { UserDataContext } from "../components/contexts/UserDataProvider";

const useUserData = () => useContext(UserDataContext);

export default useUserData;
