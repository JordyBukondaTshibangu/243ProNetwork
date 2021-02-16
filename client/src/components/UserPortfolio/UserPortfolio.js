import React from "react";
import photoIcon from '../../images/photo-icon.png'
import picIcon1 from '../../images/resources/pf-gallery1.png'
import picIcon12 from "../../images/resources/pf-gallery2.png"
import picIcon2 from "../../images/resources/pf-gallery3.png"
import picIcon3 from "../../images/resources/pf-gallery4.png"
import picIcon4 from "../../images/resources/pf-gallery5.png"
import picIcon5 from "../../images/resources/pf-gallery6.png"
import picIcon6 from "../../images/resources/pf-gallery7.png"
import picIcon7 from "../../images/resources/pf-gallery8.png"
import picIcon8 from "../../images/resources/pf-gallery9.png"
import picIcon9 from "../../images/resources/pf-gallery10.png"
import picIcon10 from "../../images/resources/pf-gallery11.png"
import picIcon11 from "../../images/resources/pf-gallery12.png"

export default function UserPortfolio() {
  return (
    <div className="widget widget-portfolio">
    <div className="wd-heady">
      <h3>Portfolio</h3>
      <img src={photoIcon} alt="image0"/>
    </div>
    <div className="pf-gallery">
      <ul>
        <li><img src={picIcon1} alt="img1"/></li>
        <li><img src={ picIcon2} alt="img2"/></li>
        <li><img src={ picIcon3 } alt="img3"/></li>
        <li><img src={ picIcon4 } alt="img4"/></li>
        <li><img src={ picIcon5 } alt="img5"/></li>
        <li><img src={ picIcon6 } alt="img6"/></li>
        <li><img src={ picIcon7 } alt="img7"/></li>
        <li><img src={ picIcon8 } alt="img8"/></li>
        <li><img src={ picIcon9 } alt="img9"/></li>
        <li><img src={ picIcon10 }  alt="img10"/></li>
        <li><img src={ picIcon11 }  alt="img11"/></li>
        <li><img src={ picIcon12 }  alt="img12"/></li>
      </ul>
    </div>
  </div>
  );
}
