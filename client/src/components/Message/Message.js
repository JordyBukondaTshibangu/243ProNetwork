import React from 'react'
import ImageIconProfil from '../../images/resources/m-img1.png'
import ImageIcon from '../../images/resources/m-img1.png'


const Message = props => {
    return(
        <div class="col-lg-8 col-md-12 pd-right-none pd-left-none">
            <div class="main-conversation-box">
                <div class="message-bar-head">
                    <div class="usr-msg-details">
                        <div class="usr-ms-img">
                            <img src={ImageIconProfil} alt=""/>
                        </div>
                        <div class="usr-mg-info">
                            <h3>John Doe</h3>
                            <p>Online</p>
                        </div>
                    </div>
                    <a href="#" title=""><i class="fa fa-ellipsis-v"></i></a>
                </div>
                <div class="messages-line">
                    <div class="main-message-box">
                        <div class="messg-usr-img">
                            <img src={ ImageIcon  } alt=""/>
                        </div>
                        <div class="message-dt">
                            <div class="message-inner-dt img-bx">
                                <img src="images/resources/mt-img1.png" alt=""/>
                                <img src="images/resources/mt-img2.png" alt=""/>
                                <img src="images/resources/mt-img3.png" alt=""/>
                            </div>
                            <span>Sat, Aug 23, 1:08 PM</span>
                        </div>
                    </div>
                    <div class="main-message-box st3">
                        <div class="message-dt st3">
                            <div class="message-inner-dt">
                                <p>Cras ultricies ligula.<img src="images/smley.png" alt=""/></p>
                            </div>
                            <span>5 minutes ago</span>
                        </div>
                        <div class="messg-usr-img">
                            <img src="images/resources/m-img1.png" alt=""/>
                        </div>
                    </div>
                    <div class="main-message-box ta-right">
                        <div class="message-dt">
                            <div class="message-inner-dt">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor.</p>
                            </div>
                            <span>Sat, Aug 23, 1:08 PM</span>
                        </div>
                        <div class="messg-usr-img">
                            <img src="images/resources/m-img2.png" alt=""/>
                        </div>
                    </div>
                    <div class="main-message-box st3">
                        <div class="message-dt st3">
                            <div class="message-inner-dt">
                                <p>....</p>
                            </div>
                            <span>Typing...</span>
                        </div>
                        <div class="messg-usr-img">
                            <img src="images/resources/m-img1.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div class="message-send-area">
                    <form>
                        <div class="mf-field">
                            <input type="text" placeholder="Type a message here"/>
                            <button type="submit" className="btn btn-info">Send</button>
                        </div>
                        <ul>
                            <li><a href="#" title=""><i class="fa fa-smile-o"></i></a></li>
                            <li><a href="#" title=""><i class="fa fa-camera"></i></a></li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
					
    )
}

export default Message