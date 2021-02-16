import React from 'react'

const OnFailureMessage = props => {
    return (
        <div className="alert alert-danger" role="alert">
           {props.message}
        </div>
    )
}

export default OnFailureMessage