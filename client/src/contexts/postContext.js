import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PostContext = createContext()

const PostContextProvider = (props) => {

    const [posts, setPosts] = useState([
        {
            _id:"",
            title: "",
            country: "",
            author: "",
            content: "",
            date: "",
            likes: 0,
            comments: [],
            postImage: ""
        }
    ])
    const [ loadingPost, setLoadingPost ] = useState(false)

    useEffect(() => {
        axios.get('/posts')
            .then(res => {
                const postsList = res.data.posts
                setPosts(postsList)
                setLoadingPost(true)
            })
    }, [])

    return ( 
        <PostContext.Provider value={{posts,loadingPost}}>
            {props.children}
        </PostContext.Provider>
     );
}
 
export default PostContextProvider;