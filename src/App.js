import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import Launch from "./Launch";
import LaunchPads from "./LaunchPads";

export default function App() {
  

  return (
    <>
        
        <Routes>
            <Route path="/" element={<LaunchPads/>} ></Route>
            <Route path="/launches/:id" element={<Launch/>} ></Route>
        </Routes>

    </>
  );
}

