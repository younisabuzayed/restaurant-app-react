import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateItem, Main } from "../pages";

const Routers = () => 
{
    return (
      <Routes>
          <Route
            path="/*"
            element={<Main/>} />
          <Route
            path="/create-item"
            element={<CreateItem />} />
      </Routes>
    );
};

export default Routers;