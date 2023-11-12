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

const App = () => {
  const dispatch = useDispatch();

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
    <Routes>
      <Route path="/" element={<Home users={user} />} />
      <Route path="/:productId" element={<Vendor />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/map" element={<MapBoxJl />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/users" element={<UsersAdmin />} />
      <Route path="/admin/users/create" element={<CreateUser />} />
      <Route path="/admin/settings" element={<SettingsAdmin />} />
      <Route path="/admin/vendor" element={<VendorAdmin />} />
    </Routes>
  );
};

export default App;
