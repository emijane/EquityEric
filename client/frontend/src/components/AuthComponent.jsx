import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import PasswordStrengthLabel from "./PasswordStrengthLabel";
import { Navigate, useNavigate } from "react-router-dom";
/**
 * @function AuthComponent builds the UI component needed for authentication : - )
 * @note Partially based on the video Emma provided and Norton Veto'd, going to separate out
 * async/fetch logic and component logic as much as possible.
 * @param mode describes the "mode" of the AuthComponent, which can either be signup mode
 * or login mode. Depending on the mode, we will render a different UI for login
 * @returns
 */
const AuthComponent = ({mode = "signup", modeSwapHandler}) => {
  const userRef = useRef(); // used to keep track of and show user relating things
  const errRef = useRef(); // used to keep track of and show form errors
  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    /** 
     * @note login payload
     * @param email: string email of the user signing on
     * @param password: string password of the user signing on
     */
    e.preventDefault();
    try {
        const response = await fetch(`https://ae90-2601-601-1b80-33a0-99e8-519d-5797-1c39.ngrok.io/api/login/`,
              {
                  body: JSON.stringify({ username: email, password: pwd }),
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
        )
        console.log("This is running")
        //console.log(JSON.stringify(response));
        const accessToken = response?.token;
        localStorage.setItem("askEricAccessToken", accessToken);
        console.log(accessToken);
        setAuth({ email, pwd, accessToken });
        setFirstName()
        setEmail('');
        setPwd('');
        setUserName('');
        setSuccess(true);
        // If successful (which it should be if we got all the way here) route to /chat route using imperative routing
        navigate('/chat');
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
  const handleSignUp = async (e) => {
    // Prevent form from refreshing the page 🤮
    e.preventDefault();
    // Trippy stuff but we fetch to our backend, get an accessToken that we 
    /** 
     * @note register payload
     * @param email: string email of the user registering
     * @param password: string password of the user registering
     * @param firstName: string first name
     * @param lastName: string last name
     */

    try {
      const response = await fetch(`https://ae90-2601-601-1b80-33a0-99e8-519d-5797-1c39.ngrok.io/api/register/`,
              {
                  body: JSON.stringify({ username: userName, email: email, password: pwd, first_name: firstName, last_name: lastName }),
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
        )
      console.log("This is running")
      const accessToken = response?.data?.accessToken;
      localStorage.setItem("askEricAccessToken", accessToken);
      console.log(accessToken);
      setAuth({ email, pwd, accessToken });
      setFirstName("")
      setEmail('');
      setUserName('');
      setPwd('');
      setSuccess(true);
      // If successful (which it should be if we got all the way here) route to /chat route using imperative routing
      navigate('/chat');
  } catch (err) {
      if (err) {
        console.log(err);
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Register Failed');
      }
      errRef.current.focus();
  }
  }
  // Honestly might do UseReduce instead
  const [email, setEmail] = useState("");
  // Names
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  // Email and password stuff
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // focus is for accessibility stuff I guess especially for screen readers I think
    if (userRef.current)
      userRef.current.focus()
  }, [])

  if (mode == 'signup')
  return (
    <div className="auth-component-outer w-full md:w-5/6 mt-10 md:px-2">
      <div className="auth-component-form-body md:px-2 flex flex-col items-center">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center sm:gap-y-4 gap-y-1 w-full">
          <p ref={errRef} className={errMsg ? "text-white bg-red-600 w-full text-center py-2 text-sm xl:text-lg 2xl:text-2xl" : "hidden"} aria-live="assertive">{errMsg}</p>
          <div className="flex flex-col w-full md:flex-row gap-y-4 justify-between max-w-full">
            <div className="form-element-inner flex flex-col items-start w-full md:w-5/12">
              <label for="first-name" className="text-sm xl:text-md 2xl:text-2xl text-gray-800">
                First Name
              </label>
              <input
                required
                type="text"
                id="first-name-input"
                className="w-full text-md xl:text-md 2xl:text-2xl mr-1 border-gray-200 rounded-md border-2 p-2"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className="form-element-inner flex flex-col items-start w-full md:w-5/12">
              <label for="last-name" className="text-sm xl:text-md 2xl:text-2xl text-gray-800">
                Last Name
              </label>
              <input
                required
                type="name"
                id="last-name-input"
                className="w-full text-md xl:text-md 2xl:text-2xl mr-1 border-gray-200 rounded-md border-2 p-2"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="form-element-inner flex flex-col gap-y-2 items-start w-full">
            <label for="email" className="text-sm xl:text-md 2xl:text-2xl text-gray-800">
              Username
            </label>
            <input
              required
              type="text"
              id="username-input"
              className="w-full text-md xl:text-md 2xl:text-2xl border-gray-200 rounded-md border-2 p-2"
              placeholder="JohnJohnsonMC"
              value={userName}
              ref={userRef}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <div className="form-element-inner flex flex-col gap-y-2 items-start w-full">
            <label for="email" className="text-sm xl:text-md 2xl:text-2xl text-gray-800">
              Email
            </label>
            <input
              required
              type="text"
              id="email-input"
              className="w-full text-md xl:text-md 2xl:text-2xl border-gray-200 rounded-md border-2 p-2"
              placeholder="John@gmail.com"
              value={email}
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="form-element-inner flex flex-col gap-y-2 items-start w-full">
            <div className="flex w-full justify-between">
              <label for="password" className="text-sm xl:text-md 2xl:text-2xl text-gray-800">
                Password
              </label>
              <PasswordStrengthLabel password={pwd} />
            </div>
            <input
              required
              type="password"
              id="password-input"
              className="w-full text-md xl:text-md 2xl:text-2xl border-gray-200 rounded-md border-2 p-2"
              placeholder="FooBar"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            ></input>
          </div>
          <button 
          type="submit"
          onClick={(e) => {
            console.log("What is happening");
            handleSignUp(e)}}
          className="signup-button w-full mt-4 py-3 rounded-md bg-themeblue text-white text-xl xl:text-2xl 2xl:text-3xl font-semibold">
            Sign Up
          </button>
        </form>
        {/* We have a sign up and login swapper that changes the context between sign up and log in */}
        <div
          id="login-signup-swapper"
          className="w-full text-center inline-block mt-2"
        >
          Already have an account? <button onClick={() => modeSwapHandler('login')}>Login</button> instead
        </div>
      </div>
    </div>
  );
  if (mode === "login")
  return (
    <div className="auth-component-outer w-full md:w-5/6 mt-10 md:px-2">
      <div className="auth-component-form-body md:px-2 flex flex-col items-center">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center gap-y-4 w-full">
          <p ref={errRef} className={errMsg ? "text-white bg-red-600 w-full text-center py-2 text-sm xl:text-lg 2xl:text-2xl" : "hidden"} aria-live="assertive">{errMsg}</p>

          <div className="form-element-inner flex flex-col gap-y-2 items-start w-full">
            <label for="email" className="text-sm xl:text-lg 2xl:text-2xl text-gray-800">
              Email
            </label>
            <input
              required
              type="text"
              id="email-input"
              className="w-full text-md xl:text-lg 2xl:text-2xl border-gray-200 rounded-md border-2 p-2"
              placeholder="John@gmail.com"
              value={email}
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="form-element-inner flex flex-col gap-y-2 items-start w-full">
            <div className="flex w-full justify-between">
              <label for="password" className="text-sm xl:text-lg 2xl:text-2xl text-gray-800">
                Password
              </label>
              <PasswordStrengthLabel password={pwd} />
            </div>
            <input
              required
              type="password"
              id="password-input"
              className="w-full text-md xl:text-lg 2xl:text-2xl border-gray-200 rounded-md border-2 p-2"
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
          className="signup-button w-full mt-4 py-3 rounded-md bg-themeblue text-white text-xl xl:text-2xl 2xl:text-3xl font-semibold">
            Log In
          </button>
        </form>
        {/* We have a sign up and login swapper that changes the context between sign up and log in */}
        <div
          id="login-signup-swapper"
          className="w-full text-center inline-block mt-2"
        >
          Don't have an account? <button onClick={() => modeSwapHandler('signup')}>Signup</button> here
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
