import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook,updateBook} from "./LIbraryService";
import image_delete from "../images/icons/delete_icon.svg";
import image_edit from "../images/icons/edit_icon.svg";
import image_home from "../images/icons/icons8-home.svg";
import image_main from "../images/icons/icon_home_main.svg";
import user_photo from "../images/test_user/user_photo.jpg";
import arrow_img from "../images/icons/arrow-down-s-line.svg";
import blue_arrow from "../images/icons/arrow-drop-right-blue_line.svg";
import blue_folder from "../images/icons/folder-download-blue-line.svg";

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
      .then(setEditingModeBookId(null), setEditedBook({}))
    };

    const cancelEdit = () =>{
      setEditingModeBookId(null);
      setEditedBook({});
    }

    return(
    <div className="main_page">
      {/* <button id="add_new_book" onClick={()=>navigate("/add-book")}>Add new book</button> */}
      <div className="control_panel">
        <div className="title image_text_block">
          <img className="panel_icon" src={image_home}/>
          <b>Book</b>Base</div>
        <div className="panel_part">
          <div className="chapter image_text_block">
            <div  className="grey_square">
              <div className="option_icon main_icon"></div>
            </div>
            Discover
          </div>
          <div className="chapter image_text_block">
            <div  className="grey_square">
              <div className="option_icon list_icon"></div>
            </div>
            Category
          </div>
          <div className="chapter image_text_block">
            <div  className="grey_square">
              <div className="option_icon library_icon"></div>
            </div>
            My Library
          </div>
          <div className="chapter image_text_block">
            <div  className="grey_square">
              <div className="option_icon download_icon"></div>
            </div>
            Download
          </div>
          <div className="chapter image_text_block">
            <div  className="grey_square">
              <div className="option_icon audio_icon"></div>
            </div>
            Audio Books
          </div>
          <div className="chapter image_text_block">
            <div  className="grey_square">
              <div className="option_icon favourite_icon"></div>
            </div>
            Favourite
          </div>             
        </div>
        <hr id="line_divide_blockes"/>
        <div className="panel_part">
          <div className="chapter image_text_block">
            <div  className="grey_square">
              <div className="option_icon setting_icon"></div>
            </div>
            Settings
          </div>
          <div className="chapter image_text_block">
            <div  className="grey_square">
              <div className="option_icon support_icon"></div>
            </div>
            Support
          </div>
          <div className="chapter image_text_block">
            <div  className="grey_square">
              <div className="option_icon logout_icon"></div>
            </div>
            Logout
          </div> 
        </div>
      </div>
      <div className="main_panel">
        <div className="search_panel">
          <input id="search_input" placeholder="Search your favourite books"/>
          <div className="info_panel">
            <div id="notification_bell_img" className="info_panel_part"></div>
            <div className="user_info info_panel_part">
              <img className="user_info_part" src={user_photo} id="user_profile_photo_img"/>
              <div className="user_info_part">Olenka</div>
              <img className="arrow_image" src={arrow_img}/>
            </div>
            
          </div>
        </div>

         <div className="recommended books_part">
          <div className="header">
            <b>Recommended</b>
            <div className="see_all_btn">
              <span style={{color:"blue"}}>See all</span>
              <img src={blue_arrow} id="blue_arrow_see_all_btn"/>
            </div>
          </div>

          <div className="recommended_books">
            <div className="books_list">
              {
                books.map(book=>{
                  if(book.id>10){
                    return(
                      <div className="book_element" id={`book${book.id}`}>
                        <img src={book.image} className="book_image"/>
                          <div className="book_discribe">
                            <span className="book_line"><b>{book.title}</b></span>
                            <br/>
                            <span className="book_line">{book.author}</span>
                          </div>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>

        </div>

          <div className="all_categories books_part">
            <div className="header">
              <b>Categories</b>
              <div className="see_all_btn">
                <img src={blue_folder} id="blue_folder_all_categories_btn"/>
              </div>
              
            </div>

            <div className="books_list">

            </div>
          </div>

        {/* <div className="books_list">
          {
          books.map(book=>(
          <div key={book.id} className="book_element">
            {
              (editingModeBookId === book.id) ? <div className="change_book_form">
              <label className="label_field_add_form">
                Image: <input  type="text" name="image" value={editedBook.image} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <label className="label_field_add_form">
                Title: <input  type="text" name="title" value={editedBook.title} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <label className="label_field_add_form">
                Author: <input  type="text" name="author" value={editedBook.author} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <label className="label_field_add_form">
                Publishing house: <input  type="text" name="publishing_house" value={editedBook.publishing_house} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <label className="label_field_add_form">
                Publishing date: <input  type="date" name="publishing_date" value={editedBook.publishing_date} onChange={(e)=>onChangeBookValue(e)}/>
              </label>
              <div className="delete_edit_panel">
                <button className="action_button save_btn" onClick={()=>saveChangeDataBook()}>Save</button>
                <button className="action_button cancel_btn" onClick={()=>cancelEdit()}>Cancel</button>
              </div>           
              </div> : <>
              <img className="book_image" src={book.image}/>
              <p>Title: {book.title}</p>
              <p>Author: {book.author}</p>
              <p className="book_line">Publishing house: {book.publishing_house}</p>
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
      </div> */}
      </div>
      
    </div>
  )
}
