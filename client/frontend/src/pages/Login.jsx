import React, { Component, useState } from "react";
import AuthComponent from "../components/AuthComponent";
import "../Login.css";
const AuthPage = () => {
  const [tabSelection, setTab] = useState("Home");
  /**
   * AuthPage can be a flex row container with two column, some overarching padding
   * to kind of give space for the two components
   * * Looking at the design file the Home - Help - Content tab is raised slightly above
   * wrt the rest of the UI so ima try to do that
   * There's gonna be an auth component and then kind of like the hero to the left.
   * Hero to the left can be its own component maybe to encapsulate the functionality
   * I'll do the switching of the auth - help - contact on this page
   */
  const [authMode, setAuthMode] = useState("login");
  return (
    <div className="AuthPage-container-center w-[100vw] h-[95vh] 2xl:h-[100vh] flex justify-center items-center">
      <div className="AuthPage-container-outer pt-8 xl:pt-0 px-8 bg-white max-w-[1200px] 2xl:max-w-[1550px] 3xl:max-w-[90vw] w-[100vw] h-auto 2xl:h-[90vh] flex flex-row overflow-y-auto">
        <div className="hero-component-placeholder rounded-[18px] px-14 3xl:px-20 py-4 2xl:py-8 pb-20 hidden md:flex flex-col md:w-1/2 h-auto">
          <div className="hero-component-top text-lg 2xl:text-2xl 3xl:text-3xl font-bold tracking-tight">
            Ask Eric
          </div>
          <div className="hero-component-content">
            <div className="hero-component-header mt-16 3xl:mt-20 text-5xl 2xl:text-6xl 3xl:text-7xl tracking-tight pr-2 font-bold">
              Get the help you deserve
            </div>
            <div className="hero-component-sub mt-6 2xl:mt-10 3xl:mt-18 text-md 2xl:text-2xl 3xl:text-3xl tracking-wide leading-8 pr-2 font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </div>
            <div className="hero-component-testimonials w-full rounded-md px-8 py-8 2xl:px-10 mt-8 2xl:mt-20">
              {/** Note: This one is not gonna have right padding since it should extend the whole width */}
              <div className="testimonial-content text-white trackind-wide text-md 2xl:text-2xl 3xl:text-3xl 3xl:tracking-wider">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.”
              </div>
              <div className="testimonial-footer mt-4 2xl:mt-10 flex">
                <div className="person-image">
                  <img
                    alt="Guy in testimonial"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                    className="testimonial-picture w-16 2xl:w-20 rounded-full"
                  />
                </div>
                <div className="person-info ml-6 flex flex-col justify-center gap-1">
                  <div className="person-name text-white 2xl:text-xl">
                    Angel Lopez Pol
                  </div>
                  <div className="person-role text-white text-sm 2xl:text-lg font-thin">
                    Consumer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-help-contact-container md:px-8 flex flex-col w-full md:w-1/2 items-center rounded-xl">
          <div className="home-tabs hidden md:flex w-full py-4 justify-center items-center">
            <div className="max-w-sm 3xl:max-w-md w-4/5 flex justify-around text-md 2xl:text-xl 3xl:text-3xl 3xl:py-4 font-semi-bold">
              <div className="cursor-pointer">Home</div>
              <div className="cursor-pointer">Help</div>
              <div className="cursor-pointer">Contact</div>
            </div>
          </div>
          <div className="auth-component-sign-up mt-10 xs:min-w-sm md:min-w-md w-5/6 md:w-full">
            <div className="auth-component-header flex flex-col items-center">
              <div className="w-5/6 px-4">
                {authMode === "signup" ? (
                  <div className="hidden md:flex flex-col gap-y-1 auth-component-header-large">
                    <h3 className="flex text-3xl 2xl:text-5xl 3xl:text-6xl font-bold text-center">
                      Get Started 👋
                    </h3>
                    <p className="text-gray-600 text-sm 2xl:text-xl 3xl:text-2xl">
                      Create your account now
                    </p>
                  </div>
                ) : (
                  <div className="hidden md:flex flex-col gap-y-1 auth-component-header-large">
                    <h3 className="flex text-3xl 2xl:text-5xl 3xl:text-6xl font-bold text-center">
                      Welcome Back 👋
                    </h3>
                    <p className="text-gray-600 text-sm 2xl:text-xl 3xl:text-2xl">
                      Sign in to your account
                    </p>
                  </div>
                )}
              </div>
              <div className="md:hidden auth-component-header-small mt-2 flex flex-col gap-y-2 items-center">
                <h3 className="flex text-4xl font-bold">Ask Eric</h3>
                <p className="text-sm text-center">
                  Create your account to get the answers you deserve about your
                  healthcare policy.
                </p>
              </div>
            </div>
            <div className="auth-component-body w-full flex flex-col items-center">
              <AuthComponent mode={authMode} modeSwapHandler={setAuthMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
