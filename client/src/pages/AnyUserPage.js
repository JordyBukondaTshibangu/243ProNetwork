import React from "react";
import Header from "../container/Header/Header";
import Footer from "../container/Footer/Footer";
import MainAnyUser from "../container/MainAnyUser/MainAnyUser";

const AnyUserPage  = props => {
  return ( 
    <div>
      <Header />
      <MainAnyUser {...props } />
      <Footer />
    </div>
   );
}
 
export default AnyUserPage ;

