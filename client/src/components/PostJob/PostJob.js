import React from "react";
import "./PostJob.css";
import { Link } from 'react-router-dom'
import UserPic from "../../images/resources/user-pic.png";

const  PostJob = () => {
  return ( 
    <div>
    <div className="post-topbar">
      <div className="user-picy">
        <img src={UserPic} alt="" />
      </div>
      <div className="post-st">
        <ul>
          <li>
            <Link className="post-jb active" to="/" title="">
              Post a Job
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
   );
}
 
export default PostJob;
