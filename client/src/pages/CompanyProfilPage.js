import React from 'react'
import Header from '../container/Header/Header'
import MainCopmanyProfil from "../container/MainCompanyProfil/MainCompanyProfil";
import Footer from '../container/Footer/Footer'

const UserProfil = props => {
    return ( 
        <div>
            <Header/>
            <MainCopmanyProfil {...props}/>
            <Footer/>
        </div>
     );
}
 
export default UserProfil ;

