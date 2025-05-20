import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook,updateBook} from "./LIbraryService";
import image_delete from "../images/icons/delete_icon.svg";
import image_edit from "../images/icons/edit_icon.svg";

export const LibraryPage = () =>{
    const[books, setBooks] = useState([]);
    const [editedBook, setEditedBook] = useState({});
    const [editingModeBookId, setEditingModeBookId] = useState(null);

    useEffect(()=>{
        getAllBooks().then(setBooks)
    },[]);

    const navigate = useNavigate();

    const removeBook = (id) =>{
      const found_book = books.find((book) => book.id===id);
      if(found_book!=null){
        deleteBook(id).then(() => setBooks(books.filter(book=>book.id!==id)));
      }
      else{
        alert("There are no exist books with required id. Try again!");
      }
    };

    const onEditMode = (book) =>{
      setEditingModeBookId(book.id);
      setEditedBook({...book});
    }

    const onChangeBookValue = (e) =>{
      const {name, value} = e.target;
      setEditedBook(prev=>({...prev, [name]:value}));
    }

    const saveChangeDataBook = ()=>{
      updateBook(editedBook)
      .then(setBooks(prevBooks => prevBooks.map(book=>book.id===editedBook.id ? editedBook : book)))
      .then( setEditingModeBookId(null), setEditedBook({}))
    };

    const cancelEdit = () =>{
      setEditingModeBookId(null);
      setEditedBook({});
    }

    return(
    <div>
      <button id="add_new_book" onClick={()=>navigate("/add-book")}>Add new book</button>
      <h3 className="title_app">Library</h3>
      <div className="books_list">
      {
        books.map(book=>(
          <div key={book.id} className="book_element">
            {
              (editingModeBookId === book.id) ? <>
              <label>
                Image: <input  type="text" name="image" value={editedBook.image} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <label>
                Title: <input  type="text" name="title" value={editedBook.title} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <label>
                Author: <input  type="text" name="author" value={editedBook.author} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <label>
                Publishing house: <input  type="text" name="publishing_house" value={editedBook.publishing_house} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <label>
                Publishing date: <input  type="date" name="publishing_date" value={editedBook.publishing_date} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <div className="delete_edit_panel">
                <button onClick={()=>saveChangeDataBook()}>Save</button>
                <button onClick={()=>cancelEdit()}>Cancel</button>
              </div>           
              </> : <>
              <img className="book_image" src={book.image}/>
              <p>Title: {book.title}</p>
              <p>Author: {book.author}</p>
              <p>Publishing house: {book.publishing_house}</p>
              <p>Publishing date: {book.publishing_date}</p>
              <div class="delete_edit_panel">
                <img id="delete_icon" src={image_delete} onClick={()=>removeBook(book.id)}/>
                <img id="edit_icon" src={image_edit} onClick={()=>onEditMode(book)}/>
              </div>
              </>

            }
            
          </div>
        ))
      }
      </div>
    </div>
  )
}
