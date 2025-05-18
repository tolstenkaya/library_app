import React, { useEffect, useState } from "react";
import { getAllBooks } from "./LIbraryService";

export const App = () =>{
  const [books, setBooks]=useState([]);
  useEffect(()=>{
    getAllBooks().then(setBooks)
  },[]);

  return(
    <div>
      <h3>Books</h3>
      {
        books.map(book=>(
          <div key={book.id}>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Publishing house: {book.publishing_house}</p>
            <p>Publishing date: {book.publishing_date}</p>
          </div>
        ))
      }
    </div>
  )
};