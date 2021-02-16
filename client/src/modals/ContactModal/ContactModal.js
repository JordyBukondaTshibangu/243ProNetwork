// import React, { useState } from "react";
// import Modal from "react-modal";
// import "./ContactModal.css";
// import OnSuccessMessage from "../../feedback/UpdateMessage/UpdateMessage";
// import OnFailureMessage from "../../feedback/FailureMeesage/FailureMeesage";
// import axios from "axios";

// Modal.setAppElement("#root");

// const ContactModal = (props) => {
//   const { showModal, closeModal, authorEmail, applicantEmail } = props;

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState(applicantEmail);
//   const [subject, setSubject] = useState("");
//   const [content, setContent] = useState("");

//   const [onSuccess, setOnSuccess] = useState(false);
//   const [onFailure, setOnFailure] = useState(false);

//   const handleSubmit = event => {
    
//     event.preventDefault();
//     const emailObject = {
//       senderemail: email,
//       recipientEmail: authorEmail,
//       name,
//       subject,
//       content,
//     };
//   };

//   const style = {
//     color: "#fff",
//     backgroundColor: "#17a2b8",
//     borderColor: "#17a2b8",
//   };

//   return (
//     <Modal
//       isOpen={showModal}
//       onRequestClose={closeModal}
//       className="modal-wrapper"
//     >
//       <div className="modal-content">
//         <div className="modal-header text-center">
//           <h3>Write to us</h3>
//         </div>
//         <div className="modal-body mx-3">
//           <div class="input-group mb-3">
//             <div class="input-group-prepend">
//               <span class="input-group-text" id="basic-addon1">
//                 <i className="fas fa-user prefix grey-text"></i>
//               </span>
//             </div>
//             <input
//               type="text"
//               class="form-control"
//               placeholder="Your name"
//               aria-label="Username"
//               aria-describedby="basic-addon1"
//             />
//           </div>

//           <div class="input-group mb-3">
//             <div class="input-group-prepend">
//               <span class="input-group-text" id="basic-addon1">
//                 <i className="fas fa-envelope prefix grey-text"></i>
//               </span>
//             </div>
//             <input
//               type="text"
//               class="form-control"
//               placeholder="Your Email"
//               aria-label="Username"
//               aria-describedby="basic-addon1"
//             />
//           </div>

//           <div class="input-group mb-3">
//             <div class="input-group-prepend">
//               <span class="input-group-text" id="basic-addon1">
//                 <i class="fas fa-tag prefix grey-text"></i>
//               </span>
//             </div>
//             <input
//               type="text"
//               class="form-control"
//               placeholder="Subject"
//               aria-label="Username"
//               aria-describedby="basic-addon1"
//             />
//           </div>

//           <div class="input-group">
//             <div class="input-group-prepend">
//               <span class="input-group-text">Your message</span>
//             </div>
//             <textarea
//               class="form-control"
//               aria-label="With textarea"
//             ></textarea>
//           </div>
//         </div>
//         <div className="modal-footer d-flex justify-content-center">
//           <button style={style}>Send</button>
//         </div>
//       </div>

//       <div className="text-center"></div>
//     </Modal>
//   );
// };

// export default ContactModal;
