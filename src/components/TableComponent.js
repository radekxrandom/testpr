import React from "react";

const TableComponent = props => {
  return (
    <div className="tableWrapper">
      <table>
        <thead>
          <tr id="col">
            <th onClick={() => props.sortBy("id")}>
              <p className="controls">
                <span className="tblHdTxt">ID </span>
                {props.arrow === "id" &&
                  props.rowObjects[0].id < props.rowObjects[1].id && (
                    <span className="arrow"> &darr;</span>
                  )}
                {props.arrow === "id" &&
                  props.rowObjects[0].id > props.rowObjects[1].id && (
                    <span className="arrow"> &uarr;</span>
                  )}
              </p>
            </th>
            <th onClick={() => props.sortBy("name")}>
              <p className="controls">
                <span className="tblHdTxt">NAME </span>
                {props.arrow === "name" &&
                  props.rowObjects[0].name < props.rowObjects[1].name && (
                    <span className="arrow"> &darr;</span>
                  )}
                {props.arrow === "name" &&
                  props.rowObjects[0].name > props.rowObjects[1].name && (
                    <span className="arrow"> &uarr;</span>
                  )}
              </p>
            </th>
            <th onClick={() => props.sortBy("city")}>
              <p className="controls">
                <span className="tblHdTxt">CITY </span>
                {props.arrow === "city" &&
                  props.rowObjects[0].city < props.rowObjects[1].city && (
                    <span className="arrow">&darr;</span>
                  )}
                {props.arrow === "city" &&
                  props.rowObjects[0].city > props.rowObjects[1].city && (
                    <span className="arrow">&uarr;</span>
                  )}
              </p>
            </th>
            <th onClick={() => props.sortBy("total")}>
              <p className="controls">
                <span className="tblHdTxt">TOTAL </span>
                {props.arrow === "total" &&
                  props.rowObjects[0].total < props.rowObjects[1].total && (
                    <span className="arrow">&darr;</span>
                  )}
                {props.arrow === "total" &&
                  props.rowObjects[0].total > props.rowObjects[1].total && (
                    <span className="arrow">&uarr;</span>
                  )}
              </p>
            </th>
            <th onClick={() => props.sortBy("avg")}>
              <p className="controls">
                <span className="tblHdTxt">AVERAGE </span>
                {props.arrow === "avg" &&
                  props.rowObjects[0].avg < props.rowObjects[1].avg && (
                    <span className="arrow">&darr;</span>
                  )}
                {props.arrow === "avg" &&
                  props.rowObjects[0].avg > props.rowObjects[1].avg && (
                    <span className="arrow">&uarr;</span>
                  )}
              </p>
            </th>
            <th onClick={() => props.sortBy("latest")}>
              <p className="controls">
                <span className="tblHdTxt">LAST </span>
                {props.arrow === "latest" &&
                  props.rowObjects[0].latest < props.rowObjects[1].latest && (
                    <span className="arrow">&darr;</span>
                  )}
                {props.arrow === "latest" &&
                  props.rowObjects[0].latest > props.rowObjects[1].latest && (
                    <span className="arrow">&uarr;</span>
                  )}
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.rowObjects.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.city}</td>
              <td>{row.total}</td>
              <td>{row.avg}</td>
              <td>{row.latest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
