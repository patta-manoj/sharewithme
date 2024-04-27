const URI = process.env.REACT_APP_URI_DASHBOARD;

export const addFile = async(data) =>{
    const response = await fetch(URI , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json();

    return responseData ;
}


export const getFile = async()=>{
    const response = await fetch(URI , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const responseData = await response.json();

    return responseData;
}