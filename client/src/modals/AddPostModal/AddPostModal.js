import React, { useState } from 'react'
import './AddPostModal.css'
import Modal from 'react-modal'
import axios from 'axios'
import UploadBar from '../../components/FeedBack/UploadBar/UploadBar'
import OnSuccessMessage from '../../feedback/SuccessMeesgae/SuccessMeesgae'
import OnFailureMessage from '../../feedback/FailureMeesage/FailureMeesage'
import { Redirect } from 'react-router-dom'

Modal.setAppElement('#root')

const  AddPostModal = (props) => {

    let { showModal, closeModal, userDetails, companyDetails  } = props

    let emailForm = ""
    let countryForm = ""
    let authorForm = ""

    if(userDetails.email === ""){
        emailForm = companyDetails.company_email
        countryForm = companyDetails.company_country
        authorForm = companyDetails.company_name
    }else {
        emailForm = userDetails.email
        countryForm = userDetails.country
        authorForm = userDetails.name
    }
    const [title, setTitile ] = useState("")
    const [content, setContent ] = useState("")
    const [postImage, setPostImage] = useState("") 
    const [filename, setFilename] = useState("choose file")
    let [ uploadedFile, setUploadedFile ] = useState("")
    const [uploadPourcentage, setUploadPourcentage ] = useState(0)
    const [onSuccess, setOnSuccess ] = useState(false)
    const [onFailure, setOnFailure ] = useState(false)
    const [redirect, setRedirect ] = useState(false)
    
    const onChange = event => {

        setFilename(event.target.files[0].name)
        setPostImage(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('postImage', postImage)
        formData.append('title', title)
        formData.append('country', countryForm)
        formData.append('author', authorForm)
        formData.append('content', content)
        formData.append('email', emailForm)

        try {
            
            const result = await axios.post('/posts', formData, {
                                    headers : {
                                        'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data',
                                    },
                                    onUploadProgress: (progressEvent) => {
                                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                        setUploadPourcentage(percentCompleted)
                                        setTimeout(() => setUploadPourcentage(0),5000)} 
                                })
            const newImage = result.data.createdPost.postImage
            setUploadedFile(`/${newImage}`)
            
            setOnSuccess(true)

        } catch(error){
            setTimeout(() => setUploadPourcentage(0),5000)
            setOnFailure(true)
            setTimeout(() => setOnFailure(false), 10000)
            setTimeout(() => setRedirect(true), 15000)
        }   
    }
    
    const style = {
        color: "#fff",
        backgroundColor: "#17a2b8",
        borderColor: "#17a2b8"
      }
  
        return (
            <Modal isOpen={showModal} onRequestClose={closeModal} className="modal-wrapper">
                <div className="post-project">
                    <h3>Add a Post </h3>
                    <div className="post-project-fields">
                        <form onSubmit={handleSubmit}>
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <div className="custom-file" style={{marginBottom : "20px"}}>
                                        <label className="custom-file-label" htmlFor="customFile" onChange={onChange} >{filename}</label>
                                        <input type="file" id="customFile" onChange={onChange}/>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                       { 
                                          uploadedFile === "" ? null :  <img src={uploadedFile} alt="img"/>
                                       }
                                </div>
                                <div className="col-lg-9">
                                    <input type="text"  placeholder="Title" value={title} onChange={(event)=>{setTitile(event.target.value)}} required/>
                                </div>
                                <div className="col-lg-12">
                                    <textarea name="description" placeholder="What's in your mind" value={content }  onChange={(event)=>{setContent(event.target.value)}} required></textarea>
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
                                    {
                                        redirect ? <Redirect to="/jobs"/> : null
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
