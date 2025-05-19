import React, { useState } from "react";
import image_cancel from "../images/icons/close.png";
import { useNavigate } from "react-router-dom";
import { addNewBook } from "./LIbraryService";

export const AddBookPage = () =>{
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishing_house, setPublishingHouse] = useState("");
    const [publishing_date, setPublishingDate] = useState("");
    const [image, setImage] = useState("");

    const redirectToMainPage = () => {
        navigate("/");
    }

    const addBook = (e) =>{
        e.preventDefault();
        const new_book = {title:title, author:author, publishing_house: publishing_house, publishing_date:publishing_date, image:image}
        addNewBook(new_book).then(() =>{
            navigate("/");
        });
    }

    return(
        <div className="add_page">
            <img id="close_icon" src={image_cancel} onClick={redirectToMainPage}/>
            <div>
                <h3 id="title_add_book">Add new book</h3>
                <div className="book_form">
                    <form>
                        <label className="label_field_add_form">
                            Book name:
                            <br/>
                            <input className="input_add_form" value={title} onChange={e=>setTitle(e.target.value)}/>
                        </label>
                        
                        <label className="label_field_add_form">
                            Author:
                            <br/>
                            <input className="input_add_form" value={author} onChange={e=>setAuthor(e.target.value)}/>
                        </label>
                        
                        <label className="label_field_add_form">
                            Publishing house:
                            <br/>
                            <input className="input_add_form" value={publishing_house} onChange={e=>setPublishingHouse(e.target.value)}/>
                        </label>
    
                        <label className="label_field_add_form">
                            Publishing date:
                            <br/>
                            <input className="input_add_form" type="date" value={publishing_date} onChange={e=>setPublishingDate(e.target.value)}/>
                        </label>

                        <label className="label_field_add_form">
                            Image link:
                            <br/>
                            <input className="input_add_form" value={image} onChange={e=>setImage(e.target.value)}/>
                        </label>

                        <button className="add_button" type="submit" onClick={e=>addBook(e)}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
};