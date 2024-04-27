import React, { useEffect, useRef } from 'react'; 
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';

export default function SeverityDemo() {
    const msgs = useRef(null);

    useMountEffect(() => {
        msgs.current.show([
            {sticky: true, severity: 'warn', summary: 'Warning', detail: 'Invalid ID or File Not Found', closable: false},
        ]);
    });

    return (
        <Messages ref={msgs} />
    )
}
