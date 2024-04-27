import React from 'react';
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useMediaQuery } from '@mui/material';


export default function SearchBar({ onValueChange , clickHandler }) {
    const useMobile = useMediaQuery('(max-width:498px)');
    const useMobile_320 = useMediaQuery('(max-width:320px)');
    return (
        <div className="flex flex-wrap justify-content-center gap-3">
            <span className="p-input-icon-right" style={{display:'flex' , overflow:'hidden' , justifyContent:'center' , alignItems:'center'}}>
                <InputText placeholder="Search File ID" id='input-text-search' size={useMobile?25:useMobile_320?5:35} onChange={onValueChange} />
                <i className="fa fa-search" aria-hidden="true" style={{cursor:'pointer'}} id='search-icon' onClick={clickHandler}></i>
            </span>
            <span id='extarct-file-link'></span>
        </div>
    )
}
