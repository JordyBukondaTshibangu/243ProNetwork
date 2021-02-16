import React, {useState} from "react";
import GoogleLogin from 'react-google-login';
import OnSuccessMessage from '../../feedback/SuccessMeesgae/SuccessMeesgae'
import OnFailureMessage from '../../feedback/FailureMeesage/FailureMeesage'


const SignIn = props => {


  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  let  [ toggle, setToggle ] = useState(true)

  const  onSuccess = props.onSuccess
  const  onFailure = props.onFailure

  const handleToggleStateUser = () => {
    setToggle(toggle = true)
  }
  const handleToggleStateCompany = () => {
    setToggle(toggle = false)
  }
  const handleSubmitUser = (event) => {
    event.preventDefault()
    props.handleSignInUser(email, password)

  }
  const handleSubmitCompany = (event) => {
    event.preventDefault()
    props.handleSignInCompany(email, password)

  }
  const responseGoogle = response => {
    let emailgoogle = response.profileObj.email
    let namegoogle = response.profileObj.name
    let picturegoogle = response.profileObj.imageUrl

    props.signInWithGoogle(emailgoogle, namegoogle, picturegoogle)
    
  }
  

  const style = {
    color: "#fff",
    backgroundColor: "#17a2b8",
    borderColor: "#17a2b8"
  }

  let AsUser = (
          <form onSubmit={handleSubmitUser} >
            <div className="row">
              <div className="col-lg-12 no-pdd">
                <div className="sn-field">
                  <input type="email" placeholder="email" required value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                  <i className="la la-user"></i>
                </div>
              </div>
              <div className="col-lg-12 no-pdd">
                <div className="sn-field">
                  <input type="password"  placeholder="Password" required value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                  <i className="la la-lock"></i>
                </div>
              </div>
              <div className="col-lg-12 no-pdd">
                <div className="checky-sec">
                  <a href="/"> Forgot Password? </a>
                </div>
              </div>
              <div className="col-lg-12 no-pdd">
              
                <button type="submit"  value="submit" style={style}>
                   Sign in as User 
                </button>  
                 
              </div>
            </div>
          </form>
  )
  let AsCompany = (
          <form onSubmit={handleSubmitCompany} >
            <div className="row">
              <div className="col-lg-12 no-pdd">
                <div className="sn-field">
                  <input type="email" placeholder="email" required value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                  <i className="la la-user"></i>
                </div>
              </div>
              <div className="col-lg-12 no-pdd">
                <div className="sn-field">
                  <input type="password"  placeholder="Password" required value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                  <i className="la la-lock"></i>
                </div>
              </div>
              <div className="col-lg-12 no-pdd">
                <div className="checky-sec">
                  <a href="/"> Forgot Password? </a>
                </div>
              </div>
              <div className="col-lg-12 no-pdd">
                <button type="submit" style={style} value="submit"> 
                   Sign in as Company 
                </button>
                
              </div>
            </div>
          </form>
  )

  return (
    <div className="sign_in_sec current" id="tab-1">
    <h3>Sign in</h3>
    <br/> 
    <div className="signup-tab">
                    <i className="fa fa-long-arrow-left"></i>
                    <h2>johndoe@example.com</h2>
                    <ul>
                        <li data-tab="tab-3" className="current"> <button className="btn btn-info" onClick={handleToggleStateUser}> User </button> </li>
                        <li data-tab="tab-4">  <button className="btn btn-secondary" onClick={handleToggleStateCompany}> Company </button> </li>
                    </ul>
                </div>
                <div className="dff-tab current" id="tab-3">
 
          { toggle ? AsUser : AsCompany} 
        </div>
  
    <div className="login-resources">
          { 
              onSuccess ? <OnSuccessMessage message = "Great! Succesfully Signed In" /> : null
          }
          {
               onFailure ? <OnFailureMessage message = "Email or Password wrong" /> : null 
          }
      <h4>Login Via Social Account</h4>
      <ul>
        <li>
        <GoogleLogin
            clientId="783580502123-gjnqmvrlgheq85um1piigofdb0bm0baf.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </li>
      </ul>
    </div>
  </div>      
  )
}

export default SignIn



