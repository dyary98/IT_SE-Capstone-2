import React, { useEffect, useState } from "react";
import { authentication, provider } from "../email_signin/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Home from "../pages/Home";
import { Link, useNavigate } from "react-router-dom";
const Signin = () => {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handlSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClick = () => {
    signInWithPopup(authentication, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      navigate("/");
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-newBg py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handlSignIn}
          >
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <h1
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't have an account?{" "}
                  <Link className="hover:underline" to="/Signup">
                    Sign Up Here
                  </Link>
                </h1>
              </div>
            </div>

            <div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
          <button
            onClick={handleClick}
            className="group relative w-full flex justify-center py-2 mt-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
