import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks } from "./LIbraryService";

export const LibraryPage = () =>{
    const[books, setBooks] = useState([]);

    useEffect(()=>{
        getAllBooks().then(setBooks)
    },[]);

    const navigate = useNavigate();
    return(
    <div>
      <button id="add_new_book" onClick={()=>navigate("/add-book")}>Add new book</button>
      <h3 className="title_app">Library</h3>
      <div className="books_list">
      {
        books.map(book=>(
          <div key={book.id} className="book_element">
            <img className="book_image" src={book.image}/>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Publishing house: {book.publishing_house}</p>
            <p>Publishing date: {book.publishing_date}</p>
          </div>
        ))
      }
      </div>
    </div>
  )
}
