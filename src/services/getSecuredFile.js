const URI = process.env.REACT_APP_URI_SECURE;

export const getFile = async(body)=>{
    const response = await fetch(URI , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    return response.json();
}