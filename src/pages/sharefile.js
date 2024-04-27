import { React, useState ,useEffect } from 'react';
import './ShareFile.css';
import storage from '../firebase/firebaseConfig'
import {getDownloadURL, ref , uploadBytes} from 'firebase/storage'
// import { v4 } from 'uuid';
import Uploading from '../Components/Uploading_animation/Uploading_Loader_Percentage_MUI'
import { NotificationManager } from 'react-notifications';
import Alert from '@mui/material/Alert';
import { Button, useMediaQuery } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { Dialog } from 'primereact/dialog';
import TextField from '@mui/material/TextField';
import { addFile } from '../services/addFile';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import Cookies from 'js-cookie';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Checkbox } from "primereact/checkbox";
import { addFile as addFileToDashboard } from '../services/addFileToDashboard';

const generateUniqueID = (name) => {
    function generateRandomDigits() {
      return Math.floor(100 + Math.random() * 900).toString();
    }

    const now = new Date();
    const date = now.toLocaleDateString("en-GB").replace(/\//g, ""); // Format: DDMMYY
    const formattedName = name.replace(/\s/g, '');
    const randomDigits = generateRandomDigits();

    const uniqueID = `${date}${'-'}${formattedName}${'-'}${randomDigits}`;
    return uniqueID ;
}




function ShareFile() {
    const [file, setFile] = useState(null);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [idToDisplay, setIdToDisplay] = useState('');
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [visible, setVisible] = useState(true);
    const [userName , setUserName] = useState(sessionStorage.getItem('savedUserName') || '');
    const [isUserNameValid , setUserNameValid] = useState(true);
    const [usernameValidMessage , setUsernameValidMessage] = useState('');
    const [uniqueID, setUniqueID] = useState(generateUniqueID(userName));
    const [uploadFailed , setUploadFailed] = useState(false);
    const useMobileQuery = useMediaQuery('(max-width:600px)');
    const [protectionRequired , setProtectionRequired] = useState();
    const [password , setPassword] = useState('');
    const [myFilesCookie,setMyFileCookie] = useState(Cookies.get('myFilesCookie'));
    const [filesList , setFilesList] = useState([]);
    const [randomRenameFile , setRandomRenameFile] = useState(false);
    const [openPasswordDialog , setOpenPasswordDialog] = useState(false);
    const [showInDashboardChecked , setShowInDashboardChecked] = useState(false);
    const [idToShowInDashboard , setIdToShowInDashboard] = useState('');


    useEffect(()=>{
        setFilesList(myFilesCookie?JSON.parse(myFilesCookie):[]);
        if(userName)
            setVisible(false);
    } , []);



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const maxSize = 12 * 1024 * 1024; // 12MB

        if (selectedFile) {
            if (selectedFile.size <= maxSize) {
                setFile(selectedFile);
            } else {
                setOpenBackDrop(true);
            }
        }
        setRandomRenameFile(true);
    };

    const formatSize = (sizeInBytes) => {
        if (sizeInBytes >= 1024 * 1024) {
            return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        } else if (sizeInBytes >= 1024) {
            return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        } else {
            return `${sizeInBytes} bytes`;
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmitUserName = async(e)=>{
        e.preventDefault();
        const status = userNameStatus();
        if(status){
            await new Promise((resolve) => {
                setTimeout(() => {
                    setVisible(false);
                    resolve();
                }, 1000);
            });
        }
    }

    const userNameStatus = ()=>{
        if(userName.length<5){
            setUserNameValid(false);
            if(userName==='')
                setUsernameValidMessage("Username shouldn't be empty");
            else
                setUsernameValidMessage('Username must be at least 5 characters');
            return false;
        }
        setUserNameValid(true);
        sessionStorage.setItem('savedUserName',userName);
        setUsernameValidMessage('');
        return true;
    }


    const footerContent = (
        <form onSubmit={handleSubmitUserName}>
        <div className='dialogbox-footer' style={{display:'flex' , justifyContent:'space-around',alignItems:'center'}}>
            
            <div style={{justifyContent:'center' , display:'grid' , alignItems:'center', }}>
                <TextField size='medium' color={isUserNameValid?'success':'error'} InputProps={useMediaQuery('(max-width:600px)')?'22px':'20px'} error={!isUserNameValid} label='Enter username' id='user-name-input-field' helperText={!isUserNameValid?usernameValidMessage:''} required onChange={(e)=>setUserName(e.target.value)} />
            </div>
            <Button variant='contained' size='large' icon="pi pi-check" onClick={handleSubmitUserName} >Confirm</Button>
            
        </div>
        </form>
    );


    function handleuserNameDialog (){
        setVisible(true);
    }

    useEffect(()=>{
        setUniqueID(generateUniqueID(userName));
    },[userName]);


    const accept = () => {
        setProtectionRequired(true);
        setOpenPasswordDialog(true);
    };

    const reject = () => {
        setProtectionRequired(false);
        handleUpload();
    };
    
    const confirm1 = async (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Protect my file with password',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        })
    };

    const addDataToCookie = (name , id)=>{
        const newData = [...filesList , {name , id}];
        Cookies.set('myFilesCookie' , JSON.stringify(newData) , {expires:7});
        setFilesList(JSON.parse(Cookies.get('myFilesCookie')));
    }


    const handleUpload = async () => {
        if(!file){
            return;
        }
        try{
            if(userName == null){
                handleuserNameDialog();
            }
            setUploading(true);
            setUniqueID(generateUniqueID(userName));
            setIdToDisplay(uniqueID);
            if(file == null){
                return ;
            }
            const temp = file.name;
            const imageRef = ref(storage , `ShareWithMe-P4/${temp}` );
            await uploadBytes(imageRef , file) ;
            const url = await getDownloadURL(imageRef);
            setIdToShowInDashboard(uniqueID);
            const response = await addFile({
                id:uniqueID , 
                name:file.name,
                uri: url , 
                secured:protectionRequired ,
                password:password
            })
            if(response.code===1){
                NotificationManager.success('File uploaded successfully!', 'Success!', 2000);
                addDataToCookie(file.name , uniqueID);
                setUploaded(true);
            }
            else if(JSON.stringify(response.code===-1)){
                console.log('Error uploading file');
                setUploadFailed(true);
                setUploading(false);
                NotificationManager.error('Error uploading the file!', 'Error!');
            }
        }
        catch (error) {
            setUploadFailed(true);
            console.log('Error uploading file:', error);
            NotificationManager.error('Error uploading the file!', 'Error!');
        }
        setUploading(false);
        setProtectionRequired();
        setRandomRenameFile(false);
    };


    const handleCancel = () => {
        setFile(null);
    };

    const calculateProgress = () => {
        const maxSize = 12 * 1024 * 1024;
        return file ? file.size / maxSize : 0;
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        const maxSize = 12 * 1024 * 1024; // 12MB

        if (selectedFile) {
            if (selectedFile.size <= maxSize) {
                setFile(selectedFile);
            } else {
                setOpenBackDrop(true);
            }
        }
        setRandomRenameFile(true);
    };

    const handleRenameClick = () => {
        setIsRenaming(true);
        setNewName(file.name.split('.')[0]);
    };

    const handleRenameChange = (e) => {
        setNewName(e.target.value);
    };

    useEffect(()=>{
        if(file!=null && randomRenameFile){
            const nameParts = file.name.split('.');
            const extension = nameParts.pop();

            const currentDate = new Date();
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const currentTimeHHMM = hours + minutes;

            const updatedName = `${nameParts}${'_'+currentTimeHHMM}.${extension}`;
            const updatedFile = new File([file], updatedName, { type: file.type });
            setFile(updatedFile);
        }
    },[randomRenameFile]);


    const handleRenameSubmit = () => {
        setIsRenaming(false);
        if (newName.trim() !== '') {
            const nameParts = file.name.split('.');
            const extension = nameParts.pop();
            const updatedName = `${newName.trim()}${'_'+Math.floor(Math.random()*100)}.${extension}`;
            const updatedFile = new File([file], updatedName, { type: file.type });
            setFile(updatedFile);
        }
    };

    const handleRenameCancel = () => {
        setIsRenaming(false);
        setRandomRenameFile(false);
    };




    const getIconForFileType = (fileType) => {
        const iconMapping = {
            'image/jpeg': 'file-image',
            'image/png': 'file-image',
            'image/gif': 'file-image',
            'application/pdf': 'file-pdf',
            'application/msword': 'file-word',
            'application/vnd.ms-excel': 'file-excel',
            'application/vnd.ms-powerpoint': 'file-powerpoint',
            'audio/mpeg': 'file-audio',
            'audio/wav': 'file-audio',
            'audio/ogg': 'file-audio',
            'audio/midi': 'file-audio',
            'audio/aac': 'file-audio',
            'audio/mp4': 'file-audio',
            'audio/3gpp': 'file-audio',
            'video/mp4': 'file-video',
            'video/mpeg': 'file-video',
            'video/ogg': 'file-video',
            'video/webm': 'file-video',
            'video/3gpp': 'file-video',
            'application/zip': 'file-archive-o'
        };

        return iconMapping[fileType] || 'file';
    };

    const [isCopied, setIsCopied] = useState(false);


    const copyID =async ()=>{
        try{
            await navigator.clipboard.writeText(idToDisplay);
            setIsCopied(true);
            setTimeout(()=>{
                setIsCopied(false);
            } , 2000);
        }
        catch(err){console.log("Error while copying")};
    };



    const headerPassword = <div className="font-bold mb-3">Pick a password</div>;
    const footerPassword = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );

    const validatePassword = ()=>{
        if(password.length>7){
            setOpenPasswordDialog(false);
            handleUpload();
            setPassword('');
        }
    }

    const handleCheckboxChange = () => {
        setShowInDashboardChecked(prevState => !prevState);
    };

    const showInDashboard = ()=>{
        if(showInDashboardChecked){
            const response = addFileToDashboard({name:file.name , id:idToShowInDashboard , userName:userName});
            if(response.code===-1){
                alert('Failed to add file to dashboard');
            }
        }
        setUploaded(false);
        setShowInDashboardChecked(false);
    }


    return (
        <div className='share-file-container-3'>
            {protectionRequired && 
                <Dialog visible={openPasswordDialog} position={'top'} onHide={()=>{setOpenPasswordDialog(false);setProtectionRequired(false)}} draggable={false} resizable={false}>
                    <div className='password-dialog'>
                        <Password toggleMask='true' strongRegex='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' value={password} onChange={(e) => setPassword(e.target.value)} header={headerPassword} footer={footerPassword} />
                        <div>
                            <Button variant='contained' onClick={validatePassword}>Set Password</Button>
                        </div>
                    </div>
                </Dialog>
            }
            
            {visible && <div className="card flex justify-content-center">
                    <Dialog header="" className='username-dialog-box' visible={visible} onHide={() => setVisible(!userNameStatus())} footer={footerContent}>
                        <span>Welcome to our file-sharing application! We kindly request you to choose a unique username.</span>
                        <span>Your username will be used as a reference for <strong>generating an unique ID</strong> for the files you share, making it <strong>easier for you to remember</strong> and manage them.</span><br></br>
                    </Dialog>
                </div>}
            {openBackDrop?
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackDrop}
                    onClick={()=>{
                        setOpenBackDrop(false);
                    }}
            >
                <Alert severity='warning' variant='outlined' style={{fontSize:useMobileQuery?'18px':'22px' , fontWeight:'800' , color:'black' }}><span style={{fontWeight:'500'}}>File size exceeded <strong>12MB</strong></span>{idToDisplay}</Alert>
            </Backdrop>:
            uploading ? <div className='file-uploading-wait-container'>
                            {/* {NotificationManager.success('File uploaded successfully!', 'Success!')} */}
                            <div style={{marginLeft:'13vw'}}>
                                <Uploading value={0}/>
                            </div>
                            <div className='uploading-message-container' style={{display:'flex' , gap:'1rem'}}>
                                <div><span>File is uploading, </span></div>
                                <div className='please-wait-container' style={{display:'flex' , gap:'1rem'}}>
                                    <div>
                                        <span style={{'--i':'1'}}>p</span> <span style={{'--i':'2'}}>l</span> 
                                        <span style={{'--i':'3'}}>e</span>  <span style={{'--i':'4'}}>a</span>
                                        <span style={{'--i':'5'}}>s</span> <span style={{'--i':'6'}}>e</span>
                                    </div>
                                    <div>
                                        <span style={{'--i':'7'}}>w</span> <span style={{'--i':'8'}}>a</span>
                                        <span style={{'--i':'9'}}>i</span> <span style={{'--i':'10'}}>t</span>
                                    </div>
                                    <div>
                                        <span style={{'--i':'11'}}>.</span> <span style={{'--i':'12'}}>.</span> <span style={{'--i':'13'}}>.</span>
                                    </div>

                                    
                                </div>
                                
                            </div>
                        </div> :
                    uploaded ? (
                    <div className='updated-note-container'>
                        <Alert severity="success" variant='filled' style={{fontSize:useMobileQuery?'18px':'22px' , userSelect:'none'}}>File Successfully uploaded<br></br><strong>Note ID</strong></Alert>
                        <Alert severity='warning' variant='outlined' onClick={copyID} style={{cursor:'pointer' ,fontSize:useMobileQuery?'18px':'22px' , fontWeight:'800' }}><span style={{fontWeight:'600' }} id='id-to-copy-span'>ID : </span>{isCopied?'Copied':idToDisplay}</Alert>
                        <div className="flex align-items-center">
                            <Checkbox inputId="dashboardCheck" onChange={handleCheckboxChange} checked={showInDashboardChecked} tooltip='Visible to everyone' tooltipOptions={{position:'top'}}/>
                            <label htmlFor="dashboardCheck" className="ml-2" style={{marginLeft:'8px'}}>Show in dashboard</label>
                        </div>
                        <div>
                            <Button variant='contained' onClick={showInDashboard}>Continue</Button>
                        </div>
                    </div>
                ):uploadFailed?(
                    <div className='updated-note-container'>
                    <Alert severity="error" variant='filled' style={{fontSize:useMobileQuery?'18px':'22px' , userSelect:'none'}}>Failed to upload file</Alert>
                    <div>
                        <Button variant='contained' onClick={() => setUploaded(false)}>Continue</Button>
                    </div>
                </div>
                ):
                <>
                    <span className='change-username-span' onClick={()=>setVisible(true)}>Change Username</span>
                    <div className='file-share-card'>
                        <div className='file-share-head-bar'>
                            <div className='file-upload-btn'>
                                <input
                                    type="file"
                                    id="file-input"
                                    accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .pptx, .mp3 , .zip , .txt, .doc"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="file-input" id="file-label" className='choose-file-btn'>Choose</label>
                            </div>
                            <div className='upload-cancel-btn-container'>
                                <ConfirmPopup />
                                <button
                                    className="upload-btn"
                                    onClick={confirm1}
                                    disabled={!file}
                                ><i className='pi pi-upload'></i> Upload</button>
                                <button
                                    className="cancel-btn"
                                    onClick={handleCancel}
                                    disabled={!file}
                                ><i className='pi pi-times'></i> Cancel</button>
                            </div>
                            <div className="progress-bar-container">
                                {file && (
                                    <>
                                        <p>Total file size: {formatSize(file.size)}</p>
                                        {file.size > 12 * 1024 * 1024 && (
                                            <p className="error">File size exceeds 12MB limit.</p>
                                        )}
                                        <progress value={calculateProgress()} max="1" />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='file-upload-container-body'>
                            <div
                                className="file-upload-container"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                            <div className="file-list-container">
                                <h3>Selected File:</h3>
                                <div className="file-preview">
                                    {file && (
                                        <div key={file.lastModified} className="file-item">
                                            <p className="file-name">{file.name}</p>
                                            {file.type && file.type.includes('image') ? (
                                                    <img src={URL.createObjectURL(file)} alt={`Preview ${file.name}`} />
                                                ) : (
                                                    <i className={`file-icon far fa-${getIconForFileType(file.type)} fa-4x`} id='file-icon-display' />
                                            )}
                                            <div className='rename-remove-file'>
                                                {isRenaming ? (
                                                    <div className="rename-input-container">
                                                        <input
                                                            type="text"
                                                            value={newName}
                                                            onChange={handleRenameChange}
                                                        />
                                                        <div className='image-rename-controller'>
                                                            <button
                                                                className="rename-submit-btn"
                                                                onClick={handleRenameSubmit}
                                                            >
                                                                Rename
                                                            </button>
                                                            <button
                                                                className="rename-cancel-btn"
                                                                onClick={handleRenameCancel}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="rename-btn"
                                                        onClick={handleRenameClick}
                                                        style={{ marginLeft: '10px', backgroundColor: '#ea4335', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                                                    >
                                                        Rename
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            }


        </div>
        
    )
}


export default ShareFile;
