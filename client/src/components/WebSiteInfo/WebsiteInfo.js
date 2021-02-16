import React, { useState } from "react";
import "./WebsiteInfo.css";
import AboutImage from "../../images/CPN1.png";
import ContactModal from "../../modals/ContactModal/ContactModal";


export default function WebsiteInfo() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <section className="Company-overview">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h2>Network Overview</h2>
              <p align="justify">
                The Congolese Professionals Network is a platform that was
                initiated by Young Congolese Professionals in direct response to
                the growing need for collaboration and networking among young
                professionals originally from Congo that have been going through
                the same challenges without necessarily having people to consult
                or get advice from, or good connections that could assist them
                in their growing careers. The goal of the platform is to
                identify the skills and service offering of the young
                professionals within the community, connect them with other
                professionals within similar fields and also with those having
                similar interests in order to promote collaboration and
                communication. The focus is slightly different at each level of
                service and conversation, but the goal remains the same; empower
                the young person to make positive changes in our community. The
                Congolese Professionals Network, also known as “243Network” is a
                community organization providing a platform for networking,
                collaboration, mentorship as well as business ideation and
                implementation for the young professionals from Congo based in
                South Africa and extending beyond the South African borders. We
                aim to promote unity among the Congolese community in South
                Africa by fostering an environment where young professionals
                work together, assist and refer each other and advise each
                other, and ultimately consume each other products. A community
                of people that is mentoring the younger generation, facilitating
                a cross-pollination of ideas and projects that could benefit the
                Congolese community in general and our country on the larger
                scale of things. Your network is your net worth; it is with the
                same mentality that we would like to increase the network of
                young professionals within the community.
              </p>
              <p>
                The actions of the platform will be focused around 8 themes:
              </p>
              <br />
              <p>
                <p>1. Advertising of product and services</p>
                <p>2. Posting of Job opportunities</p>
                <p>3. Posting of Request for services or products</p>
                <p>4. Posting of Job seeking requests</p>
                <p>5. Professionals Mentorship Program</p>
                <p>6. Business Ideation and Financing</p>
                <p>7. Business Sponsoring and Mentoring.</p>
                <p>8. Social Actions within the community</p>
              </p>
              <p>
                We look forward to collaborating with each of you. United we are
                stronger.
              </p>
            </div>
            <div className="col-md-6 col-sm-12">
              <img src={AboutImage} alt="img" className="aboutImg" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="blog">
                <h2>Contact 243Netowork via C2</h2>
                <button className="btn btn-info" onClick={openModal}>
                    Write to us  <i className="la la-envelope"></i>
                </button>

                <ContactModal
                  authorEmail={"diurkabwit@hotmail.com"}
                  applicantEmail={"kashmirger@gmail.com"}
                  showModal={showModal}
                  closeModal={closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              title="gmap_canvas"
              src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
            <anchor href="https://www.pureblack.de"></anchor>
          </div>
        </div>
      </section>
    </div>
  );
}
