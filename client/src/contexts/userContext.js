import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios'

export const  UserContext = createContext()

const UserContextProvider = props => {

    const [ usersDetails, setUsersDetails ] = useState([
        {
            _id: "",
            name:"" ,
            company:"" ,
            email: "",
            phone: "",
            picture : ""
        }
    ])

    useEffect(() => {
        axios.get('/user')
            .then(res => {
                const usersList = res.data.users
                localStorage.setItem('users', JSON.stringify(usersList))
                setUsersDetails(usersList)
            })
    }, [])

    return (
        <UserContext.Provider value={{ usersDetails }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider