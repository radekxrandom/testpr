import React from "react";
import "./App.css";
import TableContainer from "./containers/TableContainer";

const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <h2>GREATEST TABLE EVER</h2>
        </div>
        <TableContainer />
      </div>
    </div>
  );
};

export default App;
