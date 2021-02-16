import React, { useState, useEffect } from "react";
import "./SinglePost.css";
import IconMeedia from '../../images/icon8.png'
import IconCountry from '../../images/icon9.png'
import IconLike from '../../images/liked-img.png'
import IconUs from '../../images/resources/us-pc2.png'
import IconClock from '../../images/clock.png'
import PostCommments from "../PostComments/PostComments";
import axios from 'axios'

const  SinglePost = props => {

  let { _id, title, country, author, email, content, date, likes, userDetails, companyDetails, postImage } = props

  const image = `/${postImage}`
  const postId = _id

  let commentAuthor = ""
  let commentEmail = ""

  if(userDetails.email === ""){
    commentAuthor = companyDetails.company_name
    commentEmail = companyDetails.company_email
  }else {
    commentAuthor = userDetails.name
    commentEmail = userDetails.email
  }


  const [ showComment, setShowComment ] = useState(false)
  const [likeAction, setLikeAction ] = useState(likes)
  const [ userpic , setUserpic ] = useState("")

  useEffect(() => {
    axios.get(`/posts/profil/${email}`) 
          .then(res => {
              if(res.data.user_picture !== "" && res.data.user_picture !== undefined){
                    const userImage = res.data.user_picture
                    setUserpic(`/${userImage}`)
              }
              if(res.data.company_picture !== "" && res.data.company_picture !== undefined){
                    const companyImage = res.data.company_picture
                    setUserpic(`/${companyImage}`)
              }
          })
}, [])

  const toggleShowComment = () => {
    setShowComment(!showComment)

  }

  const updateLike = (event) => {
    event.preventDefault()
    const newPostObject = {
      likes : likeAction
    }
    axios.patch(`/posts/${postId}`, newPostObject)

  }
  return (
    <div>
      <div className="posts-section">
        <div className="posty">
          <div className="post-bar no-margin">
            <div className="post_topbar">
              <div className="usy-dt">
              { 
                userpic === "" ? 
                      <img src={IconUs} alt="" width="10%" height="5%"/> : 
                      <img src={userpic} alt="" width="10%" height="5%"/>
              }
                <div className="usy-name">
                  <h3>{ author }</h3>
                  <span>
                    <img src={IconClock} alt="" />{date}
                  </span>
                </div>
              </div>
            </div>
            <div className="epi-sec">
              <ul className="descp">
                <li>
                  <img src={IconMeedia} alt="" />
                  <span>243CongoNetwork</span>
                </li>
                <li>
                  <img src={IconCountry} alt="" />
                  <span>{ country }</span>
                </li>
              </ul>
            </div>
            <div className="job_descp">
              <h3> {title} </h3>
              <p>{content}</p>
              <img src={image} alt="image" width="100%" height="30%" style={{ margin : 'auto', marginBottom : '8%'}}/>
              <ul className="skill-tags">
                <li><a href="/home" > HTML </a></li>
                <li><a href="/home" > PHP </a></li>
                <li><a href="/home" > CSS </a></li>
                <li><a href="/home" > Javascript </a></li>
                <li><a href="/home" > Wordpress </a></li>
              </ul>
            </div>
            <form className="job-status-bar" onSubmit={updateLike}>
              <ul className="like-com">
                <li>
                   <p onClick = { () => { setLikeAction(likes + 1 )}}>
                      <button type="submit" className="btn">
                        <i className="fas fa-heart"></i>
                        <i> { likeAction } </i>
                       <img src={IconLike} alt=""/>  
                      </button>  
                    </p>
                </li>
                <li>
                    <p onClick={toggleShowComment}>
                      <i className="fas fa-comment-alt"></i>
                      <i> show Comment  </i>
                    </p>
                </li>
              </ul>
            </form>
          </div>
          {
            showComment ? <PostCommments 
                              postId={ postId} 
                              commentEmail = { commentEmail}
                              commentAuthor = { commentAuthor}
                          /> : null
          }
        </div>

        <div className="process-comm">
        </div>
      </div>
    </div>
  );
}
 
export default SinglePost ;
