import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Menubar } from "./component/Menubar";
import { Home } from "./component/Home";
import { AddEditProduct } from "./component/AddEditProduct";

function App() {
  return (
    <>
      <Menubar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddEditProduct isEdit={false} />} />
        <Route path="/edit-product/:id" element={<AddEditProduct isEdit={true} />} />
      </Routes>
    </>
  );
}

export default App;
