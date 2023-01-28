import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import PasswordStrengthLabel from "./PasswordStrengthLabel";

/**
 * @function AuthComponent builds the UI component needed for authentication : - )
 * @note Partially based on the video Emma provided and Norton Veto'd, going to separate out
 * async/fetch logic and component logic as much as possible.
 * @param mode describes the "mode" of the AuthComponent, which can either be signup mode
 * or login mode. Depending on the mode, we will render a different UI for login
 * @returns
 */
const AuthComponent = (mode = "signup", modeSwapHandler) => {
  const userRef = useRef(); // used to keep track of and show user relating things
  const errRef = useRef(); // used to keep track of and show form errors
  //const {setAuth, isAuth} = useContext(AuthContext);
  // Gonna have handleSubmit functionality here for now
  const handleSignUp = async (e) => {
    // Prevent form from refreshing the page 🤮
    e.preventDefault();
    // Trippy stuff but we fetch to our backend, get an accessToken that we 
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/signup`,
          JSON.stringify({ email, pwd, firstName, lastName }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      //setAuth({ email, pwd, roles, accessToken });
      setEmail('');
      setPwd('');
      setSuccess(true);
  } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
  }
  }
  // Honestly might do UseReduce instead
  const [email, setEmail] = useState("");
  // Names
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // Email and password stuff
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // focus is for accessibility stuff I guess especially for screen readers I think
    userRef.current.focus()
  }, [])
  return (
    <div className="auth-component-outer w-full md:w-5/6 mt-10 md:px-2">
      <div className="auth-component-form-body md:px-2 flex flex-col items-center">
        <form onSubmit={handleSignUp} className="flex flex-col items-center gap-y-4 w-full">
          <p ref={errRef} className={errMsg ? "text-white bg-red-600 w-full text-center py-2 text-sm" : "hidden"} aria-live="assertive">{errMsg}</p>
          <div className="flex flex-col w-full md:flex-row gap-y-4 justify-between max-w-full">
            <div className="form-element-inner flex flex-col items-start w-full md:w-5/12">
              <label for="first-name" className="text-sm text-gray-800">
                First Name
              </label>
              <input
                required
                type="text"
                id="first-name-input"
                className="w-full text-md mr-1 border-gray-200 rounded-md border-2 p-2"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className="form-element-inner flex flex-col items-start w-full md:w-5/12">
              <label for="last-name" className="text-sm text-gray-800">
                Last Name
              </label>
              <input
                required
                type="email"
                id="last-name-input"
                className="w-full text-md mr-1 border-gray-200 rounded-md border-2 p-2"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="form-element-inner flex flex-col gap-y-2 items-start w-full">
            <label for="email" className="text-sm text-gray-800">
              Email
            </label>
            <input
              required
              type="text"
              id="email-input"
              className="w-full text-md border-gray-200 rounded-md border-2 p-2"
              placeholder="John@gmail.com"
              value={email}
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="form-element-inner flex flex-col gap-y-2 items-start w-full">
            <div className="flex w-full justify-between">
              <label for="password" className="text-sm text-gray-800">
                Password
              </label>
              <PasswordStrengthLabel password={pwd} />
            </div>
            <input
              required
              type="password"
              id="password-input"
              className="w-full text-md border-gray-200 rounded-md border-2 p-2"
              placeholder="FooBar"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            ></input>
          </div>
          <button 
          type="submit"
          onClick={handleSignUp}
          className="signup-button w-full mt-4 py-3 rounded-md bg-themeblue text-white text-xl font-semibold">
            Sign Up
          </button>
        </form>
        {/* We have a sign up and login swapper that changes the context between sign up and log in */}
        <div
          id="login-signup-swapper"
          className="w-full text-center inline-block"
        ></div>
      </div>
    </div>
  );
};

export default AuthComponent;
