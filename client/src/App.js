import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConfirmProvider } from "material-ui-confirm";
import axios from "axios";
import "./App.css";
import Home from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ApplyJobPage from "./pages/AppyJobPage";
import CommunityGuideLinePage from "./pages/CommunityGuideLinePage";
import AnyUserPage from "./pages/AnyUserPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyProfilPage from "./pages/CompanyProfilPage";
import AnyCompanyProfilPage from "./pages/AnyCompanyProfilPage";
import ErrorPage from "./pages/ErrorPage";
import JobsPage from "./pages/JobsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import SignInPage from "./container/SignInContainer/SignInContainer";
import UserProfilPage from "./pages/UserProfilPage";
import UsersPage from "./pages/UsersPage";
import UserContextProvider from "./contexts/userContext";
import JobContextProvider from "./contexts/jobContext";
import PostContextProvider from "./contexts/postContext";

import Unauthorized from "./Unauthorized";

const App = () => {
  const [userDetails, setUserDetails] = useState({
    _id: "430943",
    username: "John dow",
    picture: "test",
    country: "Congo",
    age: 0,
    name: "John",
    gender: "Male",
    company: "Fireworkx",
    email: "john@dow.com",
    phone: "0934090943",
    address: "14 Bloemendal Mowbray",
    about: "Lorem15",
    registered: "13 October 2021",
  });
  const [companyDetails, setCompanyDetails] = useState({
    _id: "89349843",
    company_name: "Fireworkx",
    password: "123455",
    company_picture: "test",
    company_country: "South Africa",
    createdAt: "23 october 1999",
    company_email: "fireworkxx@test.com",
    company_phone: "0342904309",
    company_address: "4 oakdale street Newland",
    company_about: "Lorem20",
    company_registered: "12 octobre 2000",
    total_number_employee: 4,
  });
  const [isAuth, setAuth] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [onFailure, setOnFailure] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const signInUser = (email, password) => {


        setUserDetails((prevState) => {
          return {
            ...prevState,
          _id: "430943",
          username: "John dow",
          picture: "test",
          country: "Congo",
          age: 0,
          name: "John",
          gender: "Male",
          company: "Fireworkx",
          email: "john@dow.com",
          phone: "0934090943",
          address: "14 Bloemendal Mowbray",
          about: "Lorem15",
          registered: "13 October 2021",
  
          };
        });
        localStorage.setItem("user", JSON.stringify(userDetails));
        localStorage.setItem("auth", true);
        localStorage.setItem("company", JSON.stringify(companyDetails));
        setAuth(true);


  };
  const signInCompany = (email, password) => {


        setCompanyDetails((prevState) => {
          return {
            ...prevState,
          _id: "89349843",
          company_name: "Fireworkx",
          password: "123455",
          company_picture: "test",
          company_country: "South Africa",
          createdAt: "23 october 1999",
          company_email: "fireworkxx@test.com",
          company_phone: "0342904309",
          company_address: "4 oakdale street Newland",
          company_about: "Lorem20",
          company_registered: "12 octobre 2000",
          total_number_employee: 4,
  
          };
        });


        localStorage.setItem("company", JSON.stringify(companyDetails));
        localStorage.setItem("auth", true);
        localStorage.setItem("user", JSON.stringify(userDetails));

        setAuth(true);
        setRedirect(true);
     
  };
  const signInWithGoogle = (email) => {
    axios
      .post("/user/login-social-account", { email })
      .then((res) => {
        setOnSuccess(true);
        setTimeout(() => setOnFailure(false), 1000);

        let user = res.data.user[0];

        const {
          _id,
          username,
          password,
          picture,
          country,
          age,
          name,
          gender,
          company,
          email,
          phone,
          address,
          about,
          registered,
        } = user;

        setUserDetails((prevState) => {
          return {
            ...prevState,
            _id,
            username,
            password,
            picture,
            country,
            age,
            name,
            gender,
            company,
            email,
            phone,
            address,
            about,
            registered,
          };
        });

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("auth", true);
        localStorage.setItem("company", JSON.stringify(companyDetails));

        setAuth(true);
        setRedirect(true);
        setTimeout(() => {
          setRedirect(true);
        }, 5000);
      })
      .catch((error) => {
        setAuth(false);
        setOnFailure(true);
        setTimeout(() => setOnFailure(false), 15000);
      });
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <Switch>
          <ConfirmProvider>
            <UserContextProvider>
              <PostContextProvider>
                <JobContextProvider>
                  <Route
                    exact
                    path="/"
                    signInUser={signInUser}
                    userDetails={userDetails}
                    signInCompany={signInCompany}
                    companyDetails={companyDetails}
                    render={(props) => (
                      <SignInPage
                        {...props}
                        signInUser={signInUser}
                        signInCompany={signInCompany}
                        //  signInWithFacebook={signInWithFacebook}
                        signInWithGoogle={signInWithGoogle}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                      />
                    )}
                  />
                  {redirect ? <Redirect to="/home" /> : null}

                  <Route
                    exact
                    path="/home"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={Home}
                  />
                  <Route
                    exact
                    path="/companies"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={CompaniesPage}
                  />
                  <Route
                    exact
                    path="/company-profil"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={CompanyProfilPage}
                  />
                  <Route
                    exact
                    path="/companies/:companyId"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={AnyCompanyProfilPage}
                  />
                  <Route
                    exact
                    path="/users"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={UsersPage}
                  />
                  <Route
                    exact
                    path="/users/:userId"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={AnyUserPage}
                  />
                  <Route
                    exact
                    path="/jobs"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={JobsPage}
                  />
                  <Route
                    exact
                    path="/apply-job/:jobId"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={ApplyJobPage}
                  />
                  <Route
                    exact
                    path="/my-profile"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={UserProfilPage}
                  />
                  <Route
                    exact
                    path="/about"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={AboutPage}
                  />
                  <Route
                    exact
                    path="/privacy-policy"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={PrivacyPolicyPage}
                  />
                  <Route
                    exact
                    path="/community-guide-line"
                    isAuth={isAuth}
                    userDetails={userDetails}
                    companyDetails={companyDetails}
                    component={CommunityGuideLinePage}
                  />
                  <Route exact path="/unauthorized" component={Unauthorized} />
                </JobContextProvider>
              </PostContextProvider>
            </UserContextProvider>
          </ConfirmProvider>
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
