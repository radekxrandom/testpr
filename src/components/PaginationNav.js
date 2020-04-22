import React from "react";

/**
 * Component displaying navigation tiles.
 * @component
 * @param {Object[]} tiles
 */

const PaginationNav = props => {
  return (
    <div className="pagination">
      <span>&laquo;</span>
      {props.tiles.map(tile => (
        <span
          key={tile.id}
          className={tile.active ? "active" : "disabled"}
          onClick={() => props.clickedTile(tile.id)}
        >
          {tile.id + 1}
        </span>
      ))}
      <span>&raquo;</span>
    </div>
  );
};

export default PaginationNav;
