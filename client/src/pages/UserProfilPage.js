import React from "react";
import Header from "../container/Header/Header";
import MainUserProfil from "../container/MainUserProfil/MainUserProfil";
import Footer from "../container/Footer/Footer";

const UserProfil = props => {

  return ( 
      <div>
        <Header />
        <MainUserProfil {...props}/>
        <Footer />
      </div>
   );
}
 
export default UserProfil ;
