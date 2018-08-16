export const host =  "https://ev-server.ddns.net";
export const api = host + "/tlacrm/api";
export const color = {
    main: "#0d47a1",
    light: "#5472d3",
    dark: "#002171"
};

export const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXIiOnsiX2lkIjoiNWI3MTEyMTUyMWQ0MDUyMjQ4MzUyYmQ4IiwidXNlcm5hbWUiOiJldmFsbGkiLCJuYW1lIjoiRWRnYXIgVmFsbGkiLCJhdmF0YXIiOiJkZWZhdWx0LnBuZyIsImNyZWF0ZV9kYXRlIjoiMjAxOC0wOC0xM1QwNTowNzozMi42MjdaIiwidXBkYXRlX2RhdGUiOiIyMDE4LTA4LTEzVDA1OjA3OjMyLjYyN1oifSwicGVyc2lzdGVudCI6dHJ1ZX0sImlhdCI6MTUzNDEzNjg3MiwiZXhwIjo0Njg5ODEwNDcyfQ.pZMbZYQ7iGVyEFl98Xjrq0pz-3QVjMrszsgp7dCbD5k";

export const request = {
    async GET(url){

        const request = await fetch(url, {
            "headers": {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
                "Token": token
            },
            "method": "GET",
        });

        const response = await request.json();
        return response;
    },
    async POST(url, body) {
        const request = await fetch(url, {
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",
                "Token": token
            },
            method: "POST",
            body: JSON.stringify(body),
        });
        const response = await request.json();
        return response;
    }
}   
