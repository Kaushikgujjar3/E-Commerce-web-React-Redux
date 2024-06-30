import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

// Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

// My Css
import '../src/style.css';

import SingleProductView from "./Components/SingleProductView";
import TopHeader from '../src/Components/TopHeader';
import CartData from "./Components/CartData";

function App() {

  return (
    <>
      <TopHeader></TopHeader>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/:category" element={<Home></Home>}></Route>
        <Route path="/product/:id" element={<SingleProductView></SingleProductView>}></Route>
        <Route path="/cartdata" element={<CartData></CartData>}></Route>
      </Routes>
    </>
  );
}

export default App;
