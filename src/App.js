import React from "react";
import "./App.css";
import Header from "./components/Header";
import TableContainer from "./containers/TableContainer";

const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <TableContainer />
      </div>
    </div>
  );
};

export default App;
