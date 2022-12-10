import back from "./back.js";

class crud{
    async GET(resource,body){

    }

    async POST(resource,body){
        const data={
            method:'POST',
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json'
            }

        }
        const url= `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url,data)).json())
        return response;
    }

    async PUT(resource,body){
        
    }

    async DELETE(resource,body){
        
    }

}

export default new crud();