import React , { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConfirmProvider } from "material-ui-confirm";
import axios from 'axios'
import "./App.css";
import Home from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ApplyJobPage from "./pages/AppyJobPage";
import CommunityGuideLinePage from "./pages/CommunityGuideLinePage";
import AnyUserPage from './pages/AnyUserPage'
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
import ProtectedRoute from './ProtectedRoutes'
import Unauthorized from './Unauthorized'



const  App = () => {

  const [ userDetails, setUserDetails ] = useState({
    _id : "",
    username : "",
    picture : "",
    country : "",
    age : 0,
    name : "",
    gender : "",
    company : "",
    email : "",
    phone : "",
    address : "",
    about : "",
    registered : "",
  })
  const [ companyDetails, setCompanyDetails ] = useState({
    _id : "",
    company_name : "",
    password : "",
    company_picture : "",
    company_country : "",
    createdAt : "",
    company_email : "",
    company_phone : "",
    company_address : "",
    company_about : "",
    company_registered : "",
    total_number_employee : 0
  })
  const [isAuth, setAuth ] = useState(false)
  const [onSuccess, setOnSuccess ] = useState(false)
  const [onFailure, setOnFailure ] = useState(false)
  const [redirect, setRedirect ] = useState(false)

  const signInUser = (email, password ) => {
      axios.post('/user/login', {email, password})
         .then(res => {
              setOnSuccess(true)
              setTimeout(() => setOnFailure(false), 1000)
              
            let user = res.data.user[0]
            const {  _id, username,picture, country , age ,name,gender, company,email,phone,address, about,registered } = user

              setUserDetails(prevState => {
                  return { ...prevState, _id, username,picture, country , age ,name,gender, company,email,phone,address, about,registered}
              })
              localStorage.setItem('user', JSON.stringify(user))
              localStorage.setItem('auth', true)
              localStorage.setItem('company', JSON.stringify(companyDetails))
              setAuth(true)
              setRedirect(true)
              setTimeout(() => {
              setRedirect(true)

              }, 5000)
                
         })
         .catch(error => {
                setAuth(false)
                setOnFailure(true)
                setTimeout(() => setOnFailure(false), 15000)
          })
  }
  const signInCompany= (email, password ) => {
  
    axios.post('/company/login', {email, password})
         .then(res => {
           
            setOnSuccess(true)
            let existingCompany = res.data.company[0]
            
            const {  _id, company,password,picture, country , createdAt, email, phone, address, about,registered, total_number_employee } = existingCompany
                
                setCompanyDetails(prevState => {
                    return { ...prevState,
                              company_id : _id, 
                              password,createdAt ,
                              company_name:  company,
                              company_picture: picture, 
                              company_country:  country , 
                              company_email :  email,
                              company_phone :  phone,
                              company_address :  address, 
                              company_about:  about,
                              total_number_employee : total_number_employee,
                              company_registered :  registered}
                })

                const companyLocalStorage ={
                  company_id : _id, 
                  password,createdAt ,
                  company_name:  company,
                  company_picture: picture, 
                  company_country:  country , 
                  company_email :  email,
                  company_phone :  phone,
                  company_address :  address, 
                  company_about:  about,
                  total_number_employee : total_number_employee,
                  company_registered :  registered
                }

                localStorage.setItem('company', JSON.stringify(companyLocalStorage))
                localStorage.setItem('auth', true)
                localStorage.setItem('user', JSON.stringify(userDetails))
                
                setAuth(true)
                setRedirect(true)
                
         })
         .catch(error => {
          setAuth(false)
          setOnFailure(true)
    })

  }
  const signInWithGoogle = (email) => {

    axios.post('/user/login-social-account', {email})
    .then(res => {
         setOnSuccess(true)
         setTimeout(() => setOnFailure(false), 1000)
         
       let user = res.data.user[0]
       
       const {  _id, username,password,picture, country , age ,name,gender, company,email,phone,address, about,registered } = user
       
       

         setUserDetails(prevState => {
             return { ...prevState, _id, username,password,picture, country , age ,name,gender, company,email,phone,address, about,registered}
         })

         localStorage.setItem('user', JSON.stringify(user))
         localStorage.setItem('auth', true)
         localStorage.setItem('company', JSON.stringify(companyDetails))
         
         setAuth(true)
         setRedirect(true)
         setTimeout(() => {
          setRedirect(true)

         }, 5000)
           
    })
    .catch(error => {
           setAuth(false)
           setOnFailure(true)
           setTimeout(() => setOnFailure(false), 15000)
     })
  }

  return (
    <React.Fragment>
      <div className="wrapper">
        <Switch>
        <ConfirmProvider>
        <UserContextProvider>
        <PostContextProvider>
        <JobContextProvider>
        
          <Route exact path="/"  
                    signInUser = { signInUser } userDetails = { userDetails} 
                    signInCompany={signInCompany} companyDetails={companyDetails} 
                    render = {  props => <SignInPage 
                                              {...props} signInUser={signInUser} 
                                                         signInCompany={signInCompany}
                                                        //  signInWithFacebook={signInWithFacebook}
                                                         signInWithGoogle={signInWithGoogle}
                                                         onSuccess={onSuccess}
                                                         onFailure={onFailure}/>}  
          />
          {
            redirect ? <Redirect to="/home" /> : null
          }

          <ProtectedRoute exact path="/home" isAuth = {isAuth}   userDetails = {userDetails} companyDetails={companyDetails} component={Home} />
          <ProtectedRoute exact path="/companies" isAuth = {isAuth} userDetails = {userDetails} companyDetails={companyDetails}  component={CompaniesPage} />
          <ProtectedRoute exact path="/company-profil" isAuth = {isAuth} userDetails = {userDetails} companyDetails={companyDetails}  component={CompanyProfilPage}/>
          <ProtectedRoute exact path="/companies/:companyId" isAuth = {isAuth}  userDetails = {userDetails} companyDetails={companyDetails}  component={AnyCompanyProfilPage}/>
          <ProtectedRoute exact path="/users" isAuth = {isAuth} userDetails = {userDetails} companyDetails={companyDetails}  component={UsersPage}/>
          <ProtectedRoute exact path="/users/:userId" isAuth = {isAuth} userDetails = {userDetails} companyDetails={companyDetails}  component={AnyUserPage}/>
          <ProtectedRoute exact path="/jobs" isAuth = {isAuth} userDetails = {userDetails} companyDetails={companyDetails}  component={JobsPage} />
          <ProtectedRoute exact path="/apply-job/:jobId" isAuth = {isAuth} userDetails = {userDetails} companyDetails={companyDetails}  component={ApplyJobPage}/>
          <ProtectedRoute exact path="/my-profile" isAuth = {isAuth} userDetails = {userDetails} companyDetails={companyDetails}  component={UserProfilPage}/>
          <ProtectedRoute exact path="/about" isAuth = {isAuth}  userDetails = {userDetails} companyDetails={companyDetails}  component={AboutPage} />
          <ProtectedRoute exact path="/privacy-policy" isAuth = {isAuth} userDetails = {userDetails} companyDetails={companyDetails}  component={PrivacyPolicyPage} />
          <ProtectedRoute exact path="/community-guide-line" isAuth = {isAuth} userDetails = {userDetails} companyDetails={companyDetails}  component={CommunityGuideLinePage}/>
          <Route exact path='/unauthorized' component={Unauthorized} />

        </JobContextProvider>  
        </PostContextProvider>
        </UserContextProvider>
        </ConfirmProvider>
        <Route component={ErrorPage} />  
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
