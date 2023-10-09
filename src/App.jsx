import React, { useEffect } from "react";
import Home from "./assets/pages/Home";
import { Routes, Route } from "react-router-dom";
import Signin from "./assets/components/Signin";
import SignUp from "./assets/components/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "./assets/email_signin/config";
import { loginUser, setLoading } from "./features/userSlice";
import Vendor from "./assets/components/Vendor";
import MapBoxJl from "./assets/pages/MapBoxJl";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authentication.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            fullName: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.log("User is not logged in.");
      }
    });
  }, []);

  const user = useSelector((state) => state.data.user.user);
  return (
    <Routes>
      <Route path="/" element={<Home users={user} />} />
      <Route path="/:productId" element={<Vendor />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/map" element={<MapBoxJl />} />
    </Routes>
  );
};

export default App;
