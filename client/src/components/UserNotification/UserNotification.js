import React from "react";
import icno8 from '../../images/resources/bg-img3.png'
import icno9 from '../../images/icon8.png'
import icno10 from '../../images/icon9.png'

export default function UserNotification() {
  return (
    
    <div className="product-feed-tab current">
    <div className="posts-section">
      <div className="post-bar reviewtitle">
        <h2>Notification</h2>
      </div>
      <div className="post-bar">
        <div className="post_topbar">
          <div className="usy-dt">
            <img src={icno8} alt="" />
            <div className="usy-name">
              <h3>CONGOLESE NETWORK 243</h3>
              <div className="epi-sec epi2">
                <ul className="descp review-lt">
                  <li>
                    <img src={icno9} alt="" /><span>Congolese Network 243</span>
                  </li>
                  <li>
                    <img src={icno10} alt="" /><span>Congo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="job_descp mngdetl">
          <div className="star-descp review">
            <ul>
              <li><i className="fa fa-star"></i></li>
              <li><i className="fa fa-star"></i></li>
              <li><i className="fa fa-star"></i></li>
              <li><i className="fa fa-star"></i></li>
              <li><i className="fa fa-star-half-o"></i></li>
            </ul>
            <a href="/" title="">5.0 of 5 Reviews</a>
          </div>
          <div className="reviewtext">
            <p> We always work to make the future bright, Congo needs You, Africa needs You, The World needs You
              because we believe you are great and you can do amazing things with use 
              The Congolese Network encourages initiatives and supports them
              Together We Are Stronger 
              Together We Are The World 
            </p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
