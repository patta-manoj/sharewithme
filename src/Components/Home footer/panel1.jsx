import React from 'react'
import { useNavigate } from 'react-router-dom'
import './panel1.css'

function Panel1() {
    const navigate = useNavigate();
    return (
        <div className='panel-1-container'>
            <div className='panel-1-inner_container-1'>
                <div className='options-container'>
                    <span>Options</span>
                    <ul>
                        <li><span onClick={()=>navigate('/sharefile')}>Share file</span></li>
                        <li><span onClick={()=>navigate('/getfile')}>Get file</span></li>
                        <li><span onClick={()=>navigate('/myfiles')}>My Files</span></li>
                        <li><span  onClick={()=>navigate('/dashboard')}>Dashboard</span></li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default Panel1