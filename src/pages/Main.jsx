import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import {Routes , Route , Link} from 'react-router-dom'
import Home from './Home.jsx'
import About from './About'
import ShareFile from './sharefile'
import GetFile from './getfile'
import MyFiles from './myFiles'
import Dashboard from './Dashboard'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {isDatabaseConnected} from '../services/databaseConnected.js'
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';


export default function Main() {
    const [open, setOpen] = React.useState(true);


    const [openReloadMessage , setOpenReloadMessage] = useState(false);


    const isDB_Connected = async()=>{
        await isDatabaseConnected().then((res)=>{
            const isConnected = res.isConnected;
            if(isConnected === 1){
                setOpen(false);
            }
            else if(isConnected === -1){
                setTimeout(()=>{
                    setOpenReloadMessage(true);
                },3000);
            }
        })
    }


    useEffect(()=>{
        isDB_Connected();
    } , [])
    return (
        <>
            {!open?<>
                <header style={{position:'sticky',top:'0',zIndex:'200'}}>
                    <Navbar />
                </header>
                <main style={{display:'grid',justifyContent:'center',alignItems:'center',minHeight:'90vh',margin:'0'}}>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/about' element={<About />}></Route>
                        <Route path='/sharefile' element={<ShareFile />}></Route>
                        <Route path='/getfile' element={<GetFile />}></Route>
                        <Route path='/myfiles' element={<MyFiles />}></Route>
                        <Route path='/dashboard' element={<Dashboard />}></Route>
                        <Route path='/instructions' element={<Home showInstructions={true} />} />
                        <Route path='/contact' element={<Home showInstructions={false} showContacts={true}/>} />
                    </Routes>
                </main>
            </>
            :
                <Backdrop
                    sx={{ color: '#ddd', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    {openReloadMessage?<div style={{padding:'1rem'}}><Alert severity="error">Unable to connect our database. Please — <Button variant='text' color='error' onClick={()=>window.location.reload()}>Reload</Button></Alert></div>:
                        <CircularProgress color="inherit" />}

                </Backdrop>
            }
        </>
    )
}

