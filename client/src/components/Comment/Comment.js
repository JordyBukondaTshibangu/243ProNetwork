import React from "react";
import IconClock from '../../images/clock.png'
import Icon from '../../images/resources/bg-img3.png'

const  Comment = props => {
    
   const  {  author , content , date , email } = props
    
  return (

        <ul>
          <li>
            <div className="comment-list">
              <div className="bg-img">
                <img src={Icon} alt="" />
              </div>
              <div className="comment">
                <h3>{author} - { email }</h3>
                <span>
                  <img src={IconClock} alt="" /> {date}
                </span>
                <p>{content}</p>
              </div>
            </div>
          </li>
        </ul>

  );
}
 
export default Comment ;
