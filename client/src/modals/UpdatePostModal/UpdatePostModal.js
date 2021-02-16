import React, {  useState } from 'react'
import './UpdatePostModal.css'
import Modal from 'react-modal'
// import axios from 'axios'
import UploadBar from '../../components/FeedBack/UploadBar/UploadBar'
import OnSuccessMessage from '../../feedback/UpdateMessage/UpdateMessage'
import OnFailureMessage from '../../feedback/FailureMeesage/FailureMeesage'


Modal.setAppElement('#root')

const  AddPostModal = props => {

    const {
        // postId,
        title,
        country,
        // author,
        // email,
        content,
        // postImage,
        handleUpdate
     } = props

    const [post_title, setTitile ] = useState(title) 
    const [post_country, setCountry ] = useState(country) 
   
    const [post_content, setContent ] = useState(content)

    // const [post_postImage, setPostImage] = useState(postImage) 
    const [filename, setFilename] = useState("choose file")
    // const [uploadedFile, setUploadedFile ] = useState({})
    const uploadPourcentage = 0
    const onSuccess = false
    const onFailure = false
    

    const { showModal, closeModal } = props

    const onChange = event => {
        setFilename(event.target.files[0].name)
        // setPostImage(event.target.files[0])
    }
    const style = {
        color: "#fff",
        backgroundColor: "#17a2b8",
        borderColor: "#17a2b8"
    }
    return (
      <Modal isOpen={showModal} onRequestClose={closeModal} className="modal-wrapper">
        <div className="post-project">
            <h3>Edit a Post </h3>
            <div className="post-project-fields">
                <form onSubmit={handleUpdate}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="custom-file" style={{marginBottom : "20px"}}>
                                <label className="custom-file-label" htmlFor="customFile" onChange={onChange} >{filename}</label>
                                <input type="file" id="customFile" onChange={onChange}/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <input type="text"  placeholder="Title" value={post_title} onChange={(event)=>{setTitile(event.target.value)}} required/>
                        </div>
                        <div className="col-lg-6">
                            <input type="text"  placeholder="Country" value={post_country} onChange={(event)=>{setCountry(event.target.value)}} required/>
                        </div>
                        <div className="col-lg-12">
                            <textarea name="description" placeholder="What's in your mind" value={post_content }  onChange={(event)=>{setContent(event.target.value)}} required></textarea>
                        </div>
                        <div className="col-lg-12" style={{marginBottom : "20px"}}>
                            <UploadBar percentage={uploadPourcentage} />
                        </div>
                        <div className="col-lg-12">
                            { 
                                onSuccess ? <OnSuccessMessage message = "Your Post was posted" /> : null
                            }
                            {
                                onFailure ? <OnFailureMessage message = "Oupss, something went wrong" /> : null 
                            }
                        </div>
                        <div className="col-lg-6">
                            <ul>
                                <li><button style={style} type="submit" value="post">Post</button></li>
                                {
                                    onSuccess ?  <li><button className= "btn btn-primary danger" onClick={closeModal}>Close</button></li> : 
                                                 <li><button className= "btn btn-primary danger" onClick={closeModal}>Cancel</button></li>
                                }
                            </ul>
                        </div>
                    </div>
                </form>
               
                
            </div>
        </div>
    </Modal>
    )
}

export default AddPostModal
