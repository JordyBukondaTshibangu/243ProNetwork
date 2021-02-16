import React from "react";
import { Link } from "react-router-dom";
import IconUser from "../../images/resources/us-pc2.png";
import IconClock from "../../images/clock.png";
import IconEmai from "../../images/icon8.png";
import IconCountry from "../../images/icon9.png";
import IconLike from "../../images/liked-img.png";

const SingleJob = (props) => {
  let { id, author, content, country, date, email, jobType, salary, socialmedialink, title } = props;

  return (
    <div>
      <div className="posty">
        <div className="post-bar no-margin">
          <div className="post_topbar">
            <div className="usy-dt">
              <img src={IconUser} alt="" />
              <div className="usy-name">
                <h3>{author}</h3>
                <span>
                  <img src={IconClock} alt="" /> posted on : {date}
                </span>
              </div>
            </div>
            <div className="ed-opts">
              <a href="/" title="" className="ed-opts-open">
                <i className="la la-ellipsis-v"></i>
              </a>
            </div>
          </div>
          <div className="epi-sec">
            <ul className="descp">
              <li>
                <img src={IconEmai} alt="" />
                <span>{email}</span>
              </li>
              <li>
                <img src={IconCountry} alt="" />
                <span> {country}</span>
              </li>
            </ul>
            <ul className="bk-links">
              <li>
                <Link to={`/apply-job/${id}`}>
                  <i className="la la-envelope"></i>
                </Link>
              </li>
            </ul>
          </div>
          <div className="job_descp">
            <h3>{title}</h3>
            <ul className="job-dt">
              <li>
                <a href="/jobs" title="">
                  {jobType}
                </a>
              </li>
              <li>
                <span>R {salary}</span>
              </li>
            </ul>
            <p>
              {content}
              <Link to={`/apply-job/${id}`} style={{color : 'black'}}>
                <span> ...read more  </span>
              </Link>
            </p>
            <ul className="skill-tags">
              {socialmedialink.map((socialLink, index) => {
                return (
                  <li key={index}>
                    <Link to={socialLink}> {socialLink} </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="job-status-bar">
            <ul className="like-com">
              <li>
                <img src={IconLike} alt="liked" />
              </li>
              <li>
                <Link to={`/apply-job/${id}`}  className="com">
                  <i className="fas fa-eye"></i> view job
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="process-comm"></div>
    </div>
  );
};

export default SingleJob;


  
