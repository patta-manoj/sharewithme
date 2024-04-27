
const URI = process.env.REACT_APP_URI_FILE;

export const addFile = async(data) =>{
    const response = await fetch(URI , {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    // console.log(responseData); // Log the parsed response data
    return responseData;
}