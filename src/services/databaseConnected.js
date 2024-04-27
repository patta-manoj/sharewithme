const URI_TEMP = process.env.REACT_APP_URI
const URI = `${URI_TEMP}/connection_established`;

export const isDatabaseConnected = async() =>{

    try{
        const response = await fetch(URI , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        const responseData = await response.json();
        return responseData;
    }
    catch(e){
        return {isConnected:-1};
    }
    
}