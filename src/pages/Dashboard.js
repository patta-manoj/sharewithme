import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getFile } from '../services/addFileToDashboard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ToggleButton } from 'primereact/togglebutton';
import { InputText } from "primereact/inputtext";



export default function Dashboard() {
    const [data, setData] = useState([]);
    const useMobile = useMediaQuery('(max-width:800px)');
    const useMobile_412 = useMediaQuery('(max-width:412px)');
    const [userNameFrozen, setUserNameFrozen] = useState(false);
    const [idFrozen, setIdFrozen] = useState(false);
    const [fullData , setFullData] =useState([]);
    const [searchKey, setSearchKey] = useState('');

    const fetchFiles = async()=>{
        try{
            const response = await getFile();
            if(response.code === 1)
            {
                const temp_files = response.files || [];
                const temp = temp_files.reverse();
                setFullData(temp);
                setData(temp);
            }
        }
        catch(err){

        }
        
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text onClick={fetchFiles}/>;

    const handleSearchKeyOnChange = (key)=>{
        setSearchKey(key);
        if(key===''){
            setData(fullData);
            return;
        }
        const filteredData = fullData.filter(item =>
            item.name.includes(key) ||
            item.id.includes(key) ||
            item.userName.includes(key)
        );
        setData(filteredData);
    }





    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div className="card m-2">
            <div className='m-1 relative grid gap-3 justify-between flex-wrap overflow-x-auto p-3' style={{display:'grid'}}>
                <div className='flex flex-wrap justify-between align-items-center gap-3' style={{display:'flex'}}>
                    {useMobile && <ToggleButton tooltip={userNameFrozen?'Hide Username':'Show Username'} tooltipOptions={{position:'top'}} style={{width:'10rem'}} checked={userNameFrozen} onChange={(e) => setUserNameFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Username" offLabel="Username" />}
                    {useMobile_412 && <ToggleButton tooltip={idFrozen?'Hide ID':'Show ID'} tooltipOptions={{position:'top'}} style={{width:'5rem'}} checked={idFrozen} onChange={(e) => setIdFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="ID" offLabel="ID" />}
                </div>
                <div className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" value={searchKey} onChange={(e)=>{handleSearchKeyOnChange(e.target.value)}}/>
                </div>
            </div>

            
            <DataTable value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: useMobile?'auto':'50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} >
                {useMobile && userNameFrozen && <Column field="userName" header="Username" style={{ width: '33.33%' }} ></Column>}
                {!useMobile && <Column field="userName" header="Username" style={{ width: '33.33%' }} ></Column>}

                <Column field="name" header="File name" style={{ width: useMobile?'50%':'33.33%' }}></Column>

                {useMobile_412 && idFrozen && <Column field="id" header="ID" ></Column>}
                {!useMobile_412 && <Column field="id" header="ID" ></Column>}
                
            </DataTable>
        </div>
    );
}
