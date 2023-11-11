import React, { useState } from "react";
import { authentication } from "../email_signin/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import AdminDashboard from "./AdminDashboard";

const VendorAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loginError, setLoginError] = useState("");

  const db = getFirestore();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      const userId = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, "users", userId));

      if (userDoc.exists() && userDoc.data().userRole === 2) {
        setUserDetails({
          fullName: userDoc.data().fullName,
          email: userDoc.data().email,
        });
      } else {
        setLoginError("Unauthorized access or invalid role");
      }
    } catch (error) {
      console.error("Error signing in with email and password", error);
      setLoginError("Failed to sign in");
    }
  };

  return (
    <div>
      <div className="  h-screen w-full">
        {userDetails ? (
          <AdminDashboard />
        ) : (
          <div className="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={signIn}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
            {loginError && (
              <p className="text-red-500 text-xs italic">{loginError}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorAdmin;
