import React, { useState } from "react";
import { authentication } from "../email_signin/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
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

  const handleSignOut = async () => {
    try {
      await signOut(authentication);
      setUserDetails(null); // Clears the user details from the state
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  if (userDetails) {
    return (
      <>
        <AdminDashboard />
        <button
          className="fixed top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {userDetails ? (
        <>
          <AdminDashboard />
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </>
      ) : (
        <div className="w-full max-w-md px-5 py-10 bg-white rounded-lg shadow-xl">
          <form className="flex flex-col space-y-5" onSubmit={signIn}>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          {loginError && (
            <p className="mt-4 text-center text-red-500 text-xs italic">
              {loginError}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorAdmin;
