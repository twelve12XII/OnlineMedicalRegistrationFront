export const postRequestWithFile = async (url, object) => {
    // if(auth){
    //     auth = getAuthHeader();
    // }
    console.log(object)
    const formdata = new FormData();
    // formdata.append("bucket", "ROADMAP");
    formdata.append("file", object, "[PROXY]");
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=something; application/json',
            // ...(auth !== null && auth !== false && ({
            //     Authorization: 'Basic ' + auth
            // }))
        },
        ...(object !== null && ({body: formdata})),
        // redirect: 'follow'
    }).then(response => response.text())
        .then(result => console.log(result))
        .catch(e => {
        console.log(e)
        throw e
    })
}

export const postRequestEgor = async (url, object) => {
    // if(auth){
    //     auth = getAuthHeader();
    // }
    return await fetch('https://f5dd-46-138-0-220.ngrok-free.app/Home/' + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // ...(auth !== null && auth !== false && ({
            //     Authorization: 'Basic ' + auth
            // }))
        },
        ...(object !== null && ({
            body: JSON.stringify(object)
        }))
    }).catch(e => {
        console.log(e)
        throw e
    })
}

export const postRequestOleg = async (url, object) => {
    // if(auth){
    //     auth = getAuthHeader();
    // }
    return await fetch('https://9182-93-188-41-71.ngrok-free.app/' + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // ...(auth !== null && auth !== false && ({
            //     Authorization: 'Basic ' + auth
            // }))
        },
        ...(object !== null && ({
            body: JSON.stringify(object)
        }))
    }).catch(e => {
        console.log(e)
        throw e
    })
}
export const getRequest = async (url) => {
    // if(auth){
    //     auth = getAuthHeader();
    // }
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // ...(auth !== null && ({
            //     Authorization: 'Basic ' + auth
            // }))
        }
    })
}