import back from './back.js';

class crud{
    async GET(resource){
        
        const token = localStorage.getItem("token");
        let bearer;
        if (token === "") {
            bearer = "";
        } else {
            bearer = `${token}`;
        }

        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resource}`
        //const url = `${"http://localhost:4000"}${resource}`       
        let response = (await (await fetch(url, data)).json())
        return response


    }

    async POST(resource,body){

        const token = localStorage.getItem("token");
        let bearer;
        if(token===""){

            bearer = "";
        
        }else {

            bearer=`${token}`

        }

        const data={
            method:'POST',
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json',
                'x-auth-token': bearer
            }
        }

        const url= `${back.api.baseURL}${resource}`
        //console.log(url);
        let response = (await (await fetch(url,data)).json())
        return response;
    }

    async PUT(resource,body){
        const token = localStorage.getItem("token");
        let bearer;
        if(token ===""){
            bearer = "";
        } else {
            bearer = `${token}`;
        }
        
        
        const data = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type':'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
        
    }

    async DELETE(resource,body){
        const token = localStorage.getItem("token");
        let bearer;
        if (token === "") {
            bearer = "";
        } else {
            bearer = `${token}`;
        }

        const data = {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
    }
        
    }



export default new crud();