import React from "react";

/**
 * Component used to display table with company information.
 * @component
 * @param {Object[]} displayedCompanies - Companies to display
 * @param {string} displayedCompanies[].name - Company name
 * @param {string} displayedCompanies[].city - Company city
 * @param {number} displayedCompanies[].avg - Company average income
 * @param {number} displayedCompanies[].total - Company total income
 * @param {number} displayedCompanies[].latest - Company last month's income
 * @param onClickSortByField - Function which sorts data by clicked field.
 */

const TableComponent = props => {
  return (
    <table>
      <thead>
        <tr id="col">
          <th onClick={() => props.onClickSortByField("id")}>
            <p className="controls">
              <span className="tblHdTxt">ID </span>
              {props.arrow === "id" && <span className="arrow"> &darr;</span>}
              {props.arrow === "idReversed" && (
                <span className="arrow"> &uarr;</span>
              )}
            </p>
          </th>
          <th onClick={() => props.onClickSortByField("name")}>
            <p className="controls">
              <span className="tblHdTxt">NAME </span>
              {props.arrow === "name" && <span className="arrow"> &darr;</span>}
              {props.arrow === "nameReversed" && (
                <span className="arrow"> &uarr;</span>
              )}
            </p>
          </th>
          <th onClick={() => props.onClickSortByField("city")}>
            <p className="controls">
              <span className="tblHdTxt">CITY </span>
              {props.arrow === "city" && <span className="arrow"> &darr;</span>}
              {props.arrow === "cityReversed" && (
                <span className="arrow"> &uarr;</span>
              )}
            </p>
          </th>
          <th onClick={() => props.onClickSortByField("total")}>
            <p className="controls">
              <span className="tblHdTxt">TOTAL </span>
              {props.arrow === "total" && (
                <span className="arrow"> &darr;</span>
              )}
              {props.arrow === "totalReversed" && (
                <span className="arrow"> &uarr;</span>
              )}
            </p>
          </th>
          <th onClick={() => props.onClickSortByField("avg")}>
            <p className="controls">
              <span className="tblHdTxt">AVERAGE </span>
              {props.arrow === "avg" && <span className="arrow"> &darr;</span>}
              {props.arrow === "avgReversed" && (
                <span className="arrow"> &uarr;</span>
              )}
            </p>
          </th>
          <th onClick={() => props.onClickSortByField("latest")}>
            <p className="controls">
              <span className="tblHdTxt">LATEST </span>
              {props.arrow === "latest" && (
                <span className="arrow"> &darr;</span>
              )}
              {props.arrow === "latestReversed" && (
                <span className="arrow"> &uarr;</span>
              )}
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.displayedCompanies.length > 0 &&
          props.displayedCompanies.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.city}</td>
              <td>{row.total}</td>
              <td>{row.avg}</td>
              <td>{row.latest}</td>
            </tr>
          ))}
        {!props.displayedCompanies.length && (
          <tr>
            <td align="center" className="tdSpanWholeRow" colspan="6">
              No search results
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
