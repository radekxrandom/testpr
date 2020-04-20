import React from "react";

const PaginationNav = props => {
  return (
    <div class="pagination">
      <span>&laquo;</span>
      {props.tiles.map(tile => (
        <span
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
