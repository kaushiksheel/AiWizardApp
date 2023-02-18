import React from "react";
import { Route, Routes } from "react-router-dom";
import GenerateImage from "./pages/GenerateImage";
// @ts-ignore
import GenerateText from "./pages/GenerateText";


export interface IData {
  url: string;
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<GenerateImage />} />
      <Route path="/text-generate" element={<GenerateText />} />
    </Routes>
  );
}

export default App;
