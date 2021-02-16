import React, { useState, useEffect} from 'react'
import { useConfirm } from "material-ui-confirm";
import IconMeedia from '../../images/icon8.png'
import IconCountry from '../../images/icon9.png'
import IconLike from '../../images/liked-img.png'
import IconUs from '../../images/resources/us-pc2.png'
import IconClock from '../../images/clock.png'
import PostCommments from "../PostComments/PostComments";
import UpdatePostModal from '../../modals/UpdatePostModal/UpdatePostModal'
import LoadingSpinner from '../../feedback/LoadingSpinner/LoadingSpinner'
import axios from 'axios'

const UserFeed = props => {

  const confirm = useConfirm();

  const { email , userDetails, companyDetails } = props

  let commentAuthor = ""
  let commentEmail = ""

  if(userDetails.email === ""){
    commentAuthor = companyDetails.company_name
    commentEmail = companyDetails.company_email
  }else {
    commentAuthor = userDetails.name
    commentEmail = userDetails.email
  }
  
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
  const [loading , setLoading] = useState(true)

  const [ showComment, setShowComment ] = useState(false)
  const [ showModal, setShowModal] = useState(false)
  

const openModal = () => {
      setShowModal(true)
}
const closeModal = () => {
      setShowModal(false)
}
const toggleShowComment = () => {
    setShowComment(!showComment)
}

useEffect(() => {
    axios.get(`/posts/users/${email}`)
          .then(res => {
            const fetchedPosts = res.data.posts
            setPosts(fetchedPosts)
            setLoading(false)
          })

  }, [])

  const postsList = posts.reverse()

  const handleUpdate = async (postid) => {
    // event.preventDefault()
    

    // const formData = new FormData()
    // formData.append('postImage', post_postImage)
    // formData.append('title', post_title)
    // formData.append('country', post_country)
    // formData.append('author', author)
    // formData.append('content', post_content)
    // formData.append('email', email)

    // try {
        
    //     const result = await axios.patch(`/posts/${postId}`, formData, {
    //                     headers : {
    //                         'Accept': 'application/json',
    //                         'Content-Type': 'multipart/form-data',
    //                     },
    //                     onUploadProgress: (progressEvent) => {
    //                         let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //                         setUploadPourcentage(percentCompleted)
                            
    //                         setTimeout(() => setUploadPourcentage(0),50000)}  
    //                 })
    //             setOnSuccess(true)
    //             setTimeout(() => setOnSuccess(false), 15000)
    //     fetch(`/${result.data.createdPost.post_postImage}`).then(res => {
    
    // })

    //     const newImageUrl = await axios.get(`/${result.data.createdPost.postImage}`)
    //     const ImageFetched = result.data.createdPost.postImage
        
    //     let newData = newImageUrl.data
    

    //     setUploadedFile({newData, ImageFetched })

    // } catch(error){
    
    //     setOnFailure(true)
    //     setTimeout(() => setOnFailure(false), 15000)
    // }   
  } 
  const handleDelete = (postId, title) => {
    confirm({ description: `This will permanently delete ${title} post.` })
      .then(() => {
            axios.delete(`/posts/${postId}`)
            .then(res => {
                const newPostList = posts.filter(post => post._id !== postId)
                setPosts(newPostList)
            })
      })

  };

  if(loading){
    return <LoadingSpinner/>
  }else {
    return (
      <div>
        {
          postsList.map((post) => {
            return (
              <div className="posts-section" key={post._id}>
                <div className="posty">
                  <div className="post-bar no-margin">
                    <div className="post_topbar">
                      <div className="usy-dt">
                        <img src={IconUs} alt="img"/>
                        <div className="usy-name">
                          <h3>{ post.author }</h3>
                            <span><img src={IconClock} alt="img" />{post.date}</span>
                        </div>
                      </div>
                    <div className="ed-opts">
                        <button className="btn btn-info" 
                                style={{borderRadius : '100%'}} 
                                onClick={() => { 
                                  openModal()
                                  handleUpdate(post._id)}
                                }>
                          <i className="fa fa-pencil fa-fw"></i> </button>
                        <button className="btn btn-danger" style={{borderRadius : '100%'}} onClick={() => handleDelete(post._id, post.title)}><i className="fa fa-trash-o fa-lg"></i></button>
                        <UpdatePostModal  
                            showModal={showModal} 
                            closeModal={closeModal}
                            post = { post }
                            postId={post._id}
                            title={post.title}
                            country={post.country}
                            author={post.author}
                            email={post.email}
                            content={post.content}
                            postImage={post.postImage} 
                            // handleUpdate={handleUpdate}
                            />
                    </div>
                    </div>
                    <div className="epi-sec">
                      <ul className="descp">
                        <li>
                          <img src={IconMeedia} alt="img" />
                          <span>243CongoNetwork</span>
                        </li>
                        <li>
                          <img src={IconCountry} alt="img" />
                          <span>{ post.country }</span>
                        </li>
                      </ul>
                      <ul className="bk-links">
                      </ul>
                    </div>
                    <div className="job_descp">
                      <h3> {post.title} </h3>
                      <p>{post.content}</p>
                      {
                            post.postImage === "" ? null : 
                                      <img  
                                        src={`/${post.postImage}`} 
                                        alt="post image" width="50%" 
                                        height="20%" style={{ margin : 'auto', marginBottom : '8%'}}
                                      />
                        }
                      <ul className="skill-tags">
                        <li><a href="/" > HTML </a></li>
                        <li><a href="/" > PHP </a></li>
                        <li><a href="/" > CSS </a></li>
                        <li><a href="/" > Javascript </a></li>
                        <li><a href="/" > Wordpress </a></li>
                      </ul>
                    </div>
                    <div className="job-status-bar">
                      <ul className="like-com">
                        <li>
                           <p><i className="fas fa-heart"></i> Like {post.likes}
                            <img src={IconLike} alt="img" /> </p>
                        </li>
                        <li >
                            <p onClick={toggleShowComment}><i className="fas fa-comment-alt"></i> show Comment </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {
                    showComment ? <PostCommments 
                                      postId={post._id}
                                      commentAuthor = { commentAuthor }
                                      commentEmail = { commentEmail }
                                      /> : null
                  }
                </div>
        
                <div className="process-comm">
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }

  
}
 
export default UserFeed;
