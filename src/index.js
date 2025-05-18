import React from "react";
import * as ReactDomClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import "./index.css"
const app = ReactDomClient.createRoot(document.getElementById("app"));
app.render(
<BrowserRouter>
<App/>
</BrowserRouter>
);