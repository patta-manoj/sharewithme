import React, { useState } from 'react'
import SearchBar from '../Components/Getfile Components/Searchbar'
import './getfile.css'
import { Button } from '@mui/material';
import AlertMessage from '../Components/Getfile Components/AlertMessage.jsx'
import { getFile } from '../services/getFile';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import {getFile as getSecuredFile} from '../services/getSecuredFile';
import { Message } from 'primereact/message';



function GetFile() {
    const [uniqueId , setUniqueId] = useState('');
    const [fileFound , setFileFound] = useState(true);
    const [password , setPassword] = useState('');
    const [openDialog , setOpenDialog] = useState(false);
    const [invalidPassword , setInvalidPassword] = useState(false);

    const getFileWithPassword = async()=>{
        if(password==='' || password==null || password===undefined){
            setInvalidPassword(true);
            return;
        }
        const response = await getSecuredFile({id:uniqueId , password:password});
        if(response){
            if(response.code===1){
                setFileFound(true);
                window.open(response.uri, '_blank');
            }
            else if(response.code===-10){
                setInvalidPassword(true);
            }
        }
    }


    const fetchUniqueId = (e)=>{
        setUniqueId(e.target.value);
    }

    const fileProtectedDialog = ()=>{
        setOpenDialog(true);
    }

    const fetchFile = async () => {
        if (!uniqueId || uniqueId===null || uniqueId==='') {
            setFileFound(false);
            return;
        }
        try {
            const response = await getFile(uniqueId);
            if (response) {
                const data = await response;
                if(data.code===1){
                    setFileFound(true);
                    window.open(data.uri, '_blank');
                }
                else if(data.code===5){
                    fileProtectedDialog();
                }
                else if(data.code===0){
                    setFileFound(false);
                }
            } else {
                setFileFound(false);
                console.error('Failed to fetch file URI');
            }
        } catch (error) {
            setFileFound(false);
            console.error('Error fetching file URI:', error);
        }
    }

    const handleContinue = ()=>{
        setFileFound(true);
    }

    return (
        <div>
            {openDialog && 
            <Dialog header={invalidPassword?'Invalid password':'Password Required '} visible={openDialog} position='top' style={{ width: 'auto' , minWidth:'25vw' }} onHide={() => setOpenDialog(false)} draggable={false} resizable={false}>
                <div className='password-dialog'>
                        <Password className={invalidPassword?'p-invalid':''} value={password} onChange={(e) => {setPassword(e.target.value);setInvalidPassword(false)}}  feedback={false} toggleMask/>
                        <div>
                            <Button variant='contained' onClick={getFileWithPassword}>Get File</Button>
                        </div>
                </div>
                <footer style={{textAlign:'center' , marginTop:'1rem'}}>
                    <span>{invalidPassword?<Message severity="error" text="Invalid password" />:''}</span>
                </footer>
            </Dialog>}
            <div className='file-search-container'>
                {fileFound ? (
                    <div className='file-search-card'>
                        <SearchBar onValueChange={fetchUniqueId} clickHandler={fetchFile} />
                        <div className='click-here-to-open-file'>
                            <Button variant='outlined' onClick={fetchFile}>
                                GET FILE
                            </Button>
                        </div>
                        <div className={!fileFound ? 'file-not-found' : 'file-found'}>
                            {fileFound ? null : 'Invalid ID ... File Not Found'}
                        </div>
                    </div>
                ) : (
                    <div className='error-message'>
                        <div className='message-not-found'>
                            <AlertMessage />
                        </div>
                        <div style={{display:'grid' , justifyContent:'center' , alignItems:'center'}}>
                            <Button variant='contained' color='primary' onClick={handleContinue} style={{marginTop:'1rem'}}>
                                Continue
                            </Button>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    )
}

export default GetFile