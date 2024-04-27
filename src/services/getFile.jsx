const URI = process.env.REACT_APP_URI_FILE;

export const getFile = async(data)=>{
    const response = await fetch(`${URI}/${data}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}