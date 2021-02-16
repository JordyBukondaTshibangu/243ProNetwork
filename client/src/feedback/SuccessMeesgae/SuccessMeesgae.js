import React from 'react'

const OnSuccessMessage = props => {
    return (
        <div className="alert alert-success" role="alert">
           {props.message}
        </div>
    )
}

export default OnSuccessMessage