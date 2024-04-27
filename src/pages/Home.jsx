import React, { useEffect } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import {useNavigate , Link} from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import './Home.css'
import Accordion from '../Components/QA Accordion Home/Accordion'
import { ScrollTop } from 'primereact/scrolltop';
import HomeFooter from '../Components/Home footer/footer';
import { Divider } from 'primereact/divider';



function Home({showInstructions , showContacts}) {
    const navigate = useNavigate();
    const mobile = useMediaQuery('(max-width: 768px)');
    const items = [
        {
            label: 'Share File',
            icon: 'pi pi-cloud-upload',
            command: () => {
                navigate('/sharefile')
            }
        },
        {
            label: 'Get File',
            icon: 'pi pi-cloud-download',
            command: () => {
                navigate('/getfile')
            }
        },
    ];

    const scrollIntoInstructions= () =>{
        const div = document.getElementById("instructions-container");
        div.scrollIntoView({
            behavior:'smooth'
        });
    }

    const scrollIntoContact = () =>{
        const div = document.getElementById("home-footer");
        div.scrollIntoView({
            behavior:'smooth'
        })
    }

    useEffect(()=>{
        if(showInstructions){
            scrollIntoInstructions();
        }
        else if(showContacts)
            scrollIntoContact();
    })

    
    return (
        <div className='home-body'>
            <div className='home-header'>
                <div className='header-content'>
                    <span style={{fontWeight:'bold' , fontSize:'1.5rem',textAlign:'center'}}>Anonymous file sharing made easy</span>
                    <article className='mt-1'>
                        Our file-sharing platform is a secure and anonymous way to share files without creating an account.<br></br>
                        Users can share files with a unique ID, and they can optionally secure their files with a password.<br />
                    </article>
                    <div>
                        <SplitButton style={{fontSize:mobile?'16px':''}} label="GET STARTED" model={items} className='mt-2' onClick={()=>scrollIntoInstructions()}/>
                    </div>
                </div>
            </div>
            <div className='home-body-content' id='instructions-container'>
                <section className='home-body-content-section-1'>
                    <div className='section-1-main-container'>
                        <h2>How to share files with ShareWithMe?</h2>
                        <div className='home-content-how_to_send_steps' uk-scrollspy="cls: uk-animation-fade; target: li; delay: 300;">
                            <ol>
                                <li>
                                    <h3>
                                        <span className='how_to_steps_bubble'>1</span>
                                        Select Share file in {useMediaQuery('(max-width:900px)')?'sidebar':'navbar'}
                                    </h3>
                                    <p>
                                        Click on <strong>SHARE FILE</strong> in {useMediaQuery('(max-width:900px)')?'sidebar':'navbar'} to navigate
                                        in to respective page to send.
                                    </p>
                                </li>
                                <li>
                                    <h3>
                                        <span className='how_to_steps_bubble'>2</span>
                                        Select files to send
                                    </h3>
                                    <p>
                                        Click on <strong>CHOOSE</strong> to select file to send or drag and drop them directly anywhere on our interface.Rename file needed
                                    </p>
                                </li>
                                <li>
                                    <h3>
                                        <span className='how_to_steps_bubble'>3</span>
                                        <span>Upload Your Files <span className='fa fa-upload' /></span>
                                    </h3>
                                    <p>
                                        To send your files, simply click the <strong>UPLOAD</strong> button.Optionally Add Password Protection
                                    </p>
                                </li>
                                
                            </ol>
                        </div>
                        
                        <div className='home-content-how_to_send_steps' uk-scrollspy="cls: uk-animation-fade; target: li; delay: 300;">
                            <ol>
                                <li>
                                    <h3>
                                        <span className='how_to_steps_bubble'>4</span>
                                        <span>Optional Step - Password Protection <span className='fa fa-lock' /></span>
                                    </h3>
                                    <p>
                                        If you wish to protect the files with a password,select <strong>YES</strong> and provide the desired <strong>password</strong>.
                                    </p>
                                </li>
                                <li>
                                    <h3>
                                        <span className='how_to_steps_bubble'>5</span>
                                        File Upload Successful 🎉
                                    </h3>
                                    <p>
                                        Upon successfully uploading your file, a unique <strong>ID  </strong> will be generated.This ID can be used to retrieve your file.
                                    </p>
                                </li>
                                <li>
                                    <h3>
                                        <span className='how_to_steps_bubble'>6</span>
                                        <span>Optional Step - Display in Dashboard <span className='fa fa-dashboard'/></span>
                                    </h3>
                                    <p>
                                        After a successful file upload, you have the option to display it in the dashboard. Simply <strong>CHECK</strong> the box 
                                        and your file name along with its ID will be visible to <strong>everyone</strong> in the dashboard.
                                    </p>
                                </li>
                            </ol>
                        </div>
                        <div className='section-1-footer-buttons'>
                            <Link to='/sharefile'><button>Send files now</button></Link>
                        </div>
                    </div>
                </section>

                <section className='home-body-content-section-2'>
                    <div className='section-2-main-container'>
                            <h2>How to retrieve files with ShareWithMe?</h2>
                            <div className='home-content-how_to_receive_steps' uk-scrollspy="cls: uk-animation-slide-bottom; target: .sec-2_child-2; delay: 300;">
                                <ol>
                                    <li uk-scrollspy="cls: uk-animation-slide-left;">
                                        <h3>
                                            <span className='how_to_steps_bubble'>1</span>
                                            Select get file in {useMediaQuery('(max-width:900px)')?'sidebar':'navbar'}
                                        </h3>
                                        <p>
                                            Click on <strong>GET FILE</strong> in {useMediaQuery('(max-width:900px)')?'sidebar':'navbar'} to navigate
                                            in to respective page to send.
                                        </p>
                                    </li>
                                    <li className='sec-2_child-2'>
                                        <h3>
                                            <span className='how_to_steps_bubble'>2</span>
                                            Enter the Unique File ID
                                        </h3>
                                        <p>
                                            To proceed, enter the unique <strong>ID</strong> associated with the uploaded file. 
                                            This ID is generated during the file upload process.Once entered, click on <strong>GET FILE </strong> 
                                            to retrieve it securely.
                                        </p>
                                    </li>
                                    <li uk-scrollspy="cls: uk-animation-slide-right;delay:600">
                                        <h3>
                                            <span className='how_to_steps_bubble'>3</span>
                                            If the File is Password-Protected
                                        </h3>
                                        <p>
                                            If the file you're trying to retrieve is password-protected, please provide the required password. 
                                        </p>
                                    </li>
                                </ol>
                            </div>
                    </div>
                    <div className='section-2-footer-buttons'>
                        <Link to='/getfile'><button>Get files now</button></Link>
                    </div>
                </section>

                <section className='home-body-content-section-3'>
                    <div className='section-3-main-container' uk-scrollspy="cls: uk-animation-fade; target: .section-3-header-content; delay: 100;">
                        <div className='section-3-header-content'>
                            <h4>Let's dive into the exceptional features that set us apart from the rest.</h4>
                            <p>
                                ShareWithMe is the simplest, fastest and safest interface to transfer and share files. Send photos, 
                                videos and other large files without the need for account creation, ensuring your privacy remains intact.
                            </p>
                        </div>
                        <div className='home-content-features' uk-scrollspy="cls: uk-animation-fade; target: li; delay: 300;">
                            <ol>
                                <li>
                                    <h3>
                                        <svg viewBox="0 0 24 24"  width="45px" height="45px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M10.25 4.00003C10.25 3.69074 10.0602 3.41317 9.77191 3.30105C9.48366 3.18892 9.15614 3.26524 8.94715 3.49324L3.44715 9.49324C3.24617 9.71248 3.19374 10.0298 3.3135 10.302C3.43327 10.5743 3.70259 10.75 4.00002 10.75H20C20.4142 10.75 20.75 10.4142 20.75 10C20.75 9.58582 20.4142 9.25003 20 9.25003L10.25 9.25003V4.00003Z" fill="#3f51b5"></path>
                                                <path opacity="0.5" d="M13.75 20L13.75 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14C3.25 13.5858 3.58579 13.25 4 13.25L20 13.25C20.2974 13.25 20.5667 13.4258 20.6865 13.698C20.8063 13.9703 20.7538 14.2875 20.5529 14.5068L15.0529 20.5068C14.8439 20.7348 14.5164 20.8111 14.2281 20.699C13.9399 20.5869 13.75 20.3093 13.75 20Z" fill="#3f51b5"></path>
                                            </g>
                                        </svg>
                                        Secure file transfer without the need for account creation
                                    </h3>
                                    <p>
                                        Our unique feature simplifies secure file transfers by eliminating the need for account registration. 
                                        Say farewell to sign-up hassles and enjoy effortless, protected file sharing on demand.
                                    </p>
                                </li>
                                <li>
                                    <h3>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="lock-keyhole" className="svg-inline--fa fa-lock-keyhole " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="40px" width="40px">
                                            <g className="fa-duotone-group">
                                                <path className="opacity-45" fill="#828dcf" d="M224 64C179.8 64 144 99.82 144 144V192H80V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H304V144C304 99.82 268.2 64 224 64z"></path>
                                                <path className="fa-primary" fill="#3f51b5" d="M384 192C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H384zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320V384C192 401.7 206.3 416 224 416C241.7 416 256 401.7 256 384V320z"></path>
                                            </g>
                                        </svg>
                                        Protect Your Transfers with Password
                                    </h3>
                                    <p>
                                        This feature adds a password protection layer to shared files, 
                                        ensuring that only those with the right password can access them, enhancing security.
                                    </p>
                                </li>
                                <li>
                                    <h3>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height="50px" width='50px'>
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier"> <path d="M21 16.5C21 18.433 19.433 20 17.5 20C15.567 20 14 18.433 14 16.5C14 14.567 15.567 13 17.5 13C19.433 13 21 14.567 21 16.5Z" fill="#3f51b5"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.25 10C1.25 9.58579 1.58579 9.25 2 9.25H22C22.4142 9.25 22.75 9.58579 22.75 10C22.75 10.4142 22.4142 10.75 22 10.75H2C1.58579 10.75 1.25 10.4142 1.25 10Z" fill="#3f51b5"></path>
                                            <path opacity="0.5" d="M4.1875 9.25L4.6138 7.54479C5.15947 5.36211 5.43231 4.27077 6.24609 3.63538C7.05988 3 8.1848 3 10.4347 3H13.5653C15.8152 3 16.9401 3 17.7539 3.63538C18.5677 4.27077 18.8405 5.36211 19.3862 7.54479L19.8125 9.25H4.1875Z" fill="#3f51b5"></path>
                                            <path d="M10 16.5C10 18.433 8.433 20 6.5 20C4.567 20 3 18.433 3 16.5C3 14.567 4.567 13 6.5 13C8.433 13 10 14.567 10 16.5Z" fill="#3f51b5"></path>
                                            <path opacity="0.5" d="M9.88379 17.3966C9.9594 17.1104 9.99968 16.8099 9.99968 16.5C9.99968 16.2272 9.96845 15.9616 9.90939 15.7067L10.323 15.4999C11.3787 14.972 12.6214 14.972 13.6771 15.4999L14.09 15.7064C14.0309 15.9614 13.9997 16.227 13.9997 16.5C13.9997 16.8098 14.0399 17.1101 14.1155 17.3961L13.0063 16.8415C12.3728 16.5248 11.6273 16.5248 10.9938 16.8415L9.88379 17.3966Z" fill="#3f51b5"></path>
                                        </g>
                                    </svg>
                                        Preserve Your Privacy
                                    </h3>
                                    <p>
                                        Sharing files shouldn't mean compromising your privacy. 
                                        Our application enables you to share files without divulging personal information, 
                                        all without the need for additional downloads on your device.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>

                <div className='notebox-container' uk-scrollspy="cls: uk-animation-shake; target: .message-container; delay: 200;repeat:true">
                    <div className='message-container'>
                        <div className='title'>
                            NOTICE
                            <svg viewBox="0 0 1024 1024" className="icon" height='50px' width='50px' version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(-25)">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M512 181.9c7.6 0 15.2 0.4 22.7 1.1v-48c0-4.8-4-8.8-8.8-8.8H498c-4.8 0-8.8 4-8.8 8.8v48c7.6-0.7 15.2-1.1 22.8-1.1zM578.5 844.6h-133c6.9 30.4 34.1 53.2 66.5 53.2s59.7-22.8 66.5-53.2z" fill="#3f51b5"></path>
                                    <path d="M595.2 814.6H428.8c-8.3 0-15 6.7-15 15 0 54.1 44 98.2 98.2 98.2s98.2-44 98.2-98.2c0-8.3-6.7-15-15-15z m-149.7 30h133c-6.9 30.4-34.1 53.2-66.5 53.2s-59.7-22.8-66.5-53.2z" fill="#41207e"></path>
                                    <path d="M700.4 454.6l-188.1 188h78.6l109.5-109.4zM469.9 642.6l230.5-230.5v-31c-0.4-93.3-84.7-169.2-188.4-169.2-103.9 0-188.4 76.2-188.4 169.8v260.9c0.8 0 1.6-0.1 2.4-0.1h143.9zM407.1 311c19.1 0 34.7 15.5 34.7 34.7 0 19.1-15.5 34.7-34.7 34.7s-34.7-15.5-34.7-34.7c0-19.2 15.5-34.7 34.7-34.7zM633.4 642.6H698c0.8 0 1.6 0 2.4 0.1v-67.1l-67 67zM698 672.6H326c-15.5 0-45.6 15.6-67.3 40.7-17.8 20.7-20.1 35.6-18.5 39.3 0.3 0.7 2.7 1.5 6.4 1.5h530.7c3.7 0 6-0.8 6.4-1.5 1.7-3.7-0.6-18.6-18.5-39.3-21.6-25.1-51.7-40.7-67.2-40.7z" fill="#3f51b5"></path>
                                    <path d="M788 693.8c-16.2-18.9-37.5-34.4-57.6-43.2V381.8c0-53.6-22.9-104-64.5-141.8-28.4-25.8-63.2-43.6-101.2-52.2V135c0-21.4-17.4-38.8-38.8-38.8H498c-21.4 0-38.8 17.4-38.8 38.8v52.8c-37.9 8.6-72.7 26.4-101.2 52.2-41.6 37.8-64.5 88.1-64.5 141.8v268.8c-20.2 8.8-41.4 24.4-57.6 43.2-22.8 26.4-31.4 53.1-23 71.4 3.2 7.1 11.9 19 33.6 19h530.7c21.7 0 30.4-11.9 33.6-19 8.6-18.3 0-45-22.8-71.4z m-4.3 58.9c-0.3 0.7-2.7 1.5-6.4 1.5H246.6c-3.7 0-6-0.8-6.4-1.5-1.7-3.7 0.6-18.6 18.5-39.3 21.7-25.2 51.8-40.7 67.3-40.7h372c15.5 0 45.6 15.6 67.3 40.7 17.8 20.6 20.1 35.6 18.4 39.3zM512.3 642.6l188.1-188.1v78.6L590.9 642.6h-78.6z m185.7 0h-64.6l67-67v67.1c-0.8 0-1.6-0.1-2.4-0.1zM498.1 126.2H526c4.8 0 8.8 4 8.8 8.8v48c-7.5-0.7-15.1-1.1-22.7-1.1s-15.2 0.4-22.7 1.1v-48c-0.1-4.7 3.9-8.8 8.7-8.8zM323.6 381.7c0-93.6 84.5-169.8 188.4-169.8 103.7 0 188 75.9 188.4 169.2v31L469.9 642.6H326c-0.8 0-1.6 0-2.4 0.1v-261z" fill="#41207e"></path>
                                    <path d="M407.1 345.7m-34.7 0a34.7 34.7 0 1 0 69.4 0 34.7 34.7 0 1 0-69.4 0Z" fill="#FFFFFF"></path>
                                </g>
                            </svg>
                        </div>
                        <div className='message-body'>
                            <p>
                                This application is currently in its <strong>beta version</strong>. 
                                Users can send files up to a <strong>maximum of 12MB at a time</strong>. 
                                We kindly request your support in helping us grow by sharing your experiences with us on social media. 
                                Your feedback is invaluable as we continue to enhance our services. <strong>Thank you</strong> for being part of our journey!
                            </p>
                        </div>
                    </div>
                </div>

                {
                    <div className='accordion-parent-section' uk-scrollspy="cls: uk-animation-slide-bottom; target: .accordion-child-section; delay: 200;">
                        <div className='accordion-child-section' >
                            <span style={{fontSize:'22px'}}>A secure solution</span> <br />
                            <p style={{fontSize:'20px' , fontWeight:'600'}}>The safety of your data is our priority</p>
                            <Accordion scrollIntoInstructions={scrollIntoInstructions}/>
                        </div>
                    </div>
                }
            </div>
            <footer className='home-footer' id='home-footer'>
                <div className='.footer-child'>
                    <HomeFooter />
                </div>
                <Divider type='solid' />
                <div className='footer-child' style={{fontSize:'20px'}}>
                </div>
            </footer>
            

            <ScrollTop target="window" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
        </div>
    )
}

export default Home;