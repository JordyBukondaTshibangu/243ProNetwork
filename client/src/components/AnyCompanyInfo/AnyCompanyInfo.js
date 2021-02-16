import React from "react";

const AnyCompanyInfo = (props) => {

    const { overview ,awards ,skills ,location, country  } = props 
  return ( 
    <React.Fragment>
        <div className="product-feed-tab current">
    <div className="user-profile-ov">
      <h3>
        <a href="/" title="" className="overview-open">Overview</a>
      </h3>
      <p>{ 
            overview === undefined ? null : overview
          }</p>
    </div>
    <div className="user-profile-ov">
      <h3>
        <a href="/" title="" className="ed-box-open">Awards </a>
      </h3>
        {
          awards.length < 1 ? null : 
          awards.map((award, index) => {
            return (
                    <div key={index}>
                          <p> { award }</p>
                    </div>
            )
          })
        }
    </div>
    <div className="user-profile-ov">
      <h3>
        <a href="/" title="" className="lct-box-open">Location</a>
      </h3>
      <h4>{ country }</h4>
      <p>{ location }</p>
    </div>
    <div className="user-profile-ov">
      <h3>
        <a href="/" title="" className="skills-open">Skills</a>
      </h3>
      <ul>
          {
            skills.map((skill,index) => {
              return ( <li key={index}><a href="/" title="">{ skill }</a></li>)
            })
          }
      </ul>
    </div>
</div>
    </React.Fragment>
   );
}
 
export default AnyCompanyInfo;