const API = "http://localhost:5124/api/library";

export async function getAllBooks(){
    const response = await fetch(API,{
        method:"GET",
        headers:{"Accept":"application/json"}
    });
    return response.json();
}

export async function addNewBook(new_book){
    const response = await fetch(API,{
        method:"POST",
        headers:{"Accept":"application/json", "Content-Type":"application/json"},
        body: JSON.stringify(new_book)
    });
    return response.json();
}