import { useEffect } from "react";
import Home from "./assets/pages/Home";
import { Routes, Route } from "react-router-dom";
import Signin from "./assets/components/Signin";
import SignUp from "./assets/components/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "./assets/email_signin/config";
import { authActions } from "./app/AuthSlice";
import Vendor from "./assets/components/Vendor";
import MapBoxJl from "./assets/pages/MapBoxJl";
import Admin from "./assets/pages/Admin";
import SettingsAdmin from "./assets/pages/SettingsAdmin";
import UsersAdmin from "./assets/pages/UsersAdmin";
import VendorAdmin from "./assets/pages/VendorAdmin";
import CreateUser from "./assets/pages/CreateUser";
import AllVendors from "./assets/pages/AllVendors";
import { useTranslation } from "react-i18next";
import UserProfile from "./assets/pages/Profile/UserProfile";
import AboutUS from "./assets/pages/AboutUS";

const App = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    authentication.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          authActions.login({
            uid: authUser.uid,
            fullName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        console.log("User is not logged in.");
      }
    });
  }, [dispatch]);

  // Adjust the state path based on the structure of authenticationSlice
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <div className="bg-white">
      {/* <h1>{t('Game on')}</h1>
      <p>{t('home')}</p> */}
      <Routes>
        <Route path="/" element={<Home users={user} />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/aboutus" element={<AboutUS />} />
        <Route path="/vendors" element={<AllVendors />} />
        <Route path="/:productId" element={<Vendor />} />
        <Route path="/vendors/:productId" element={<Vendor />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/map" element={<MapBoxJl />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<UsersAdmin />} />
        <Route path="/admin/users/create" element={<CreateUser />} />
        <Route path="/admin/settings" element={<SettingsAdmin />} />
        <Route path="/admin/vendor" element={<VendorAdmin />} />
      </Routes>
    </div>
  );
};

export default App;
