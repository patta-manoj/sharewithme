import React from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


function passwordDialog() {
    return (
        <div>
            <div className="card flex justify-content-center">
                <Dialog header="Header" visible={true}
                    style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                
                </Dialog>
            </div>
        </div>
    )
}

export default passwordDialog