import React from "react";
import { LibraryPage } from "./Components/LibraryPage";
import { AddBookPage } from "./Components/AddBookPage";
import {Route, Routes} from "react-router-dom";

export const App = () =>(
  <Routes>
    <Route path="/" element={<LibraryPage/>}/>
    <Route path="/add-book" element={<AddBookPage/>}/>
  </Routes>
);