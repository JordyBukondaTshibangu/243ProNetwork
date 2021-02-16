import React from 'react'

const DeleteMessage = props => {
    return (
        <div className="alert alert-danger" role="alert">
            {props.message}
        </div>
        
    )
}

export default DeleteMessage