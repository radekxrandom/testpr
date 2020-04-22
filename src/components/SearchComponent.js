import React from "react";

/**
 * Component displaying navigation tiles.
 * @component
 * @param {string} searchedValue - User's input
 * @param searchData - Function which searches data on user input
 */

const SearchComponent = props => {
  return (
    <div className="searchInput">
      <input
        placeholder="Search"
        onChange={props.searchData}
        value={props.searchedValue}
        name="searchedValue"
      />
    </div>
  );
};

export default SearchComponent;
