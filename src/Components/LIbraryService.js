const API = "http://localhost:5124/api/library";

export async function getAllBooks(){
    const response = await fetch(API,{
        method:"GET",
        headers:{"Accept":"application/json"}
    });
    return response.json();
}