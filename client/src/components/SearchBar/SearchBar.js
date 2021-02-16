import React, { useState } from 'react'
import SearchModal from '../../modals/SearchModal/SearchModal'

const SearchBar = () => {

    const [ showModal, setShowmodal ] = useState(false)

    const openModal = () => {
        setShowmodal(true)
    }
    const closeModal = () => {
        setShowmodal(false)
    }
    const style = {
        border : "1px solid white"
    }
    
    return ( 
        <div className="search-bar">
            <button type="submit" className="btn btn-info" onClick={openModal} style={style}>
                Search <i className="la la-search"></i>
            </button>
            <SearchModal 
                showModal={showModal}
                closeModal={closeModal}
            />
        </div>
     );
}
 
export default SearchBar ;