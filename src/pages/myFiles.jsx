import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import './myFiles.css'
import { Button } from '@mui/material';
import { Message } from 'primereact/message';


function MyFiles() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if(Cookies.get('myFilesCookie')){
            const storedFiles = JSON.parse(Cookies.get('myFilesCookie')) || [];
            setFiles(storedFiles);
        }
    }, []);

    const copyId = async(id)=>{
        try{
            await navigator.clipboard.writeText(id);
            document.getElementById(`id-btn-${id}`).innerHTML = 'Copied';
            setTimeout(()=>{
                document.getElementById(`id-btn-${id}`).innerHTML = 'Copy ID';
            } , 500);
        }
        catch(err){
            console.log("Error while copying : " + err.message);
        }
    }

    const cardFooter = (id)=>{
        return(
            <div style={{display:'flex' , alignItems:'flex-end' , justifyContent:'flex-end'}}>
                <Button onClick={()=>copyId(id)} id={`id-btn-${id}`}>Copy ID</Button>
            </div>
        )
    }


    return (
        <div className='my-files-container' >
            {Cookies.get('myFilesCookie')?
                files.map((file) => (
                    <Card footer={cardFooter(file.id)} key={file.id} className='card-container'>
                        <div className='card-data-myfiles'>
                            <span>{file.name}</span>
                            <p><strong>ID : </strong>{file.id}</p>
                        </div>
                    </Card>
                )):
                <>
                    <Message severity='info' text='No files found' style={{fontSize:'22px'}}/>
                </>
            }
        </div>
    );
}

export default MyFiles;
