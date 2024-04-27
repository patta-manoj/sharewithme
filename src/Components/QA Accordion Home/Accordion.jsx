
import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MultipleAccordion({scrollIntoInstructions}) {

    const mobile = useMediaQuery('(max-width:768px)');

    const mobile_620 = useMediaQuery('(max-width:620px)');

    return (
        <div>
            <Accordion multiple activeIndex={[0]} style={{overflowWrap:'break-word'}}>
                <AccordionTab style={{fontSize:mobile_620?'16px':'20px'}} header="Is registration necessary to access ShareWithMe services?">
                    <p className="m-0 fs-5" style={{fontSize:mobile?'16px':'18px'}}>
                        <strong>No,</strong> you can use our services without any registration. Simply <span onClick={()=>scrollIntoInstructions()} style={{cursor:'pointer', fontWeight:'700',textDecoration:'underline'}}>click here</span> for instructions on how to read and retrieve files.
                    </p>
                </AccordionTab>
                <AccordionTab header="Do you open or use my files?" style={{fontSize:mobile_620?'16px':'20px'}}>
                    <p className="m-0" style={{fontSize:mobile_620?'14px':'18px'}}>
                        <strong>No,</strong> we do not access or examine the files passing through our solution. 
                        Your data privacy is our utmost priority, and we maintain a strict policy of non-interference with your files.
                    </p>
                </AccordionTab>
                <AccordionTab header="Are my files safe?" style={{fontSize:mobile_620?'16px':'20px'}}>
                    <p className="m-0" style={{fontSize:mobile_620?'14px':'18px'}}>
                        Your file safety, confidentiality, and integrity are our top priorities. 
                        We employ robust measures to ensure their security. 
                        If you choose to add a password for download access, it encrypts the files, and only the password can decrypt them.
                    </p>
                    <p className="mT-2" style={{fontSize:mobile_620?'14px':'18px'}}>
                        Your password is securely hashed using a one-way function, making it impossible for attackers to access your files. 
                        If you lose the password, file recovery becomes technically impossible. Rest assured, your files are protected.
                    </p>
                </AccordionTab>

                <AccordionTab header="Can attackers (hackers) hack my password and access my files?" style={{fontSize:mobile_620?'16px':'20px'}}>
                    <p className="m-0" style={{fontSize:mobile_620?'14px':'18px'}}>
                        <strong>No, </strong>our security is fortified by the use of the bcrypt library to hash your password. 
                        <strong>Your password is securely hashed with a 256-bit key</strong>, providing a high level of protection for your files.
                        This robust encryption ensures that user files are stored securely, 
                        making it virtually <strong>impossible</strong> for attackers to compromise them.
                    </p>
                    <p className="mT-2" style={{fontSize:mobile_620?'14px':'18px'}}>
                        Even in the event that you forget your password, it remains impossible to access your file(s). 
                        Your data is safe and inaccessible to anyone without the correct credentials.
                    </p>
                </AccordionTab>
            </Accordion>
        </div>
    )
}
