import React from 'react'
import Header from '../container/Header/Header'
import MainAnyCopmany from "../container/MainAnyCompanyProfil/MainAnyCompanyProfil";
import Footer from '../container/Footer/Footer'

const UserProfil = props => {
    
    return ( 
        <div>
            <Header/>
            <MainAnyCopmany {...props } />
            <Footer/>
        </div>
     );
}
 
export default UserProfil;


