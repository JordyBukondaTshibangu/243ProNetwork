import React , {  useState  }from "react";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from '../../components/SignUp/SignUp'
import CompanyIntroDetails from '../../components/CompanyIntroDetails/CompanyIntroDetails'

const SignInContainer  = props => {
  
  let [toggle, setToggle ] = useState(true)

  const handleToggleStateSignIn = () => {
    setToggle(toggle = true)
  }

  const handleToggleStateSignUp = () => {
    setToggle(toggle = false)
  }
  
  return ( 
    <div className="sign-in">
      <div className="wrapper">
        <div className="sign-in-page">
          <div className="signin-popup">
            <div className="signin-pop">
            <div className="row">
            <CompanyIntroDetails/>

            <div className="col-lg-6">
                  <div className="login-sec"> 
                    <ul className="sign-control">
                      <li data-tab="tab-1" className="current" ><button className="btn btn-info" onClick={handleToggleStateSignIn} > Sign in </button> </li>
                      <li data-tab="tab-2" > <button className="btn btn-secondary" onClick={handleToggleStateSignUp}> Sign up </button> </li>
                    </ul>
                    { toggle ? 
                      <SignIn 
                          handleSignInUser = {props.signInUser}
                          handleSignInCompany = {props.signInCompany}
                          signInWithGoogle = { props.signInWithGoogle} 
                          onSuccess={props.onSuccess}
                          onFailure={props.onFailure}
                          /> :
                      <SignUp
                          onSuccess={props.onSuccess}
                          onFailure={props.onFailure}
                      />
                    } 
                    </div>
                    </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
   );
}
 
export default SignInContainer ;
