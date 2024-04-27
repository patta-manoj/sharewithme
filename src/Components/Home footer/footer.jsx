
import React from 'react'; 
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Panel1 from './panel1';
import Panel2 from './panel2';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function HorizontalDemo() {
    const mobile = useMediaQuery('(max-width:768px)')
    return (
        <Splitter style={{ height: 'auto' }} className='bg-transparent border-0' layout={mobile?'vertical':'horizontal'}>
            <SplitterPanel className="bg-transparent" size={25} minSize={15}>
                <Panel1 />
            </SplitterPanel>

            <SplitterPanel className="bg-transparent" size={75} minSize={40}>
                <Panel2 />
            </SplitterPanel>
        </Splitter>
    )
}
