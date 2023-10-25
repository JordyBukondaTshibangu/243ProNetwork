import React, { useState } from 'react'

import Logo from '../../components/Logo/Logo'
import SearchBar from '../../components/SearchBar/SearchBar'
import NavBar from '../../components/NavBar/NavBar'
import MobileNavBar from '../../components/ResponsiveNavBar/MobileNavBar'

const Header = () => {

    const [show, setshow] = useState(false)

    const toggleNavbar = () => {
        setshow(!show)
    }
    return ( 
        <header>
            <div className="container"   style={{backgroundColor : "green"}}>
                <div className="header-data">
                    <Logo/>
                    <SearchBar />
                    <NavBar toggleNavbar={toggleNavbar}/>
                    {
                        show ? <MobileNavBar toggleNavbar={toggleNavbar}/> : null
                    }
                </div>
            </div>
        </header>
     );
}
 
export default Header;
