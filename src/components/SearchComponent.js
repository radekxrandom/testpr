import React from "react";

const SearchComponent = props => {
  return (
    <div className="searchInput">
      <input
        placeholder="Search companies for monies"
        onChange={props.handleInput}
        name="searchInput"
      />
    </div>
  );
};

export default SearchComponent;
