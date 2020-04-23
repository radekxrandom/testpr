import React from "react";

/**
 * Component displaying navigation tiles.
 * @component
 * @param {Object[]} tiles
 */

const PaginationNav = props => {
  return (
    <div className="pagination">
      <span
        onClick={() => props.clickedTile(props.activeTile - 1)}
        className={props.activeTile === 0 ? "unClickable" : "clickable"}
      >
        &laquo;
      </span>
      {props.tiles.map(tile => (
        <span
          key={tile.id}
          className={tile.active ? "active" : "disabled"}
          onClick={() => props.clickedTile(tile.id)}
        >
          {tile.id + 1}
        </span>
      ))}
      <span
        onClick={() => props.clickedTile(props.activeTile + 1)}
        className={props.activeTile === 19 ? "unClickable" : "clickable"}
      >
        &raquo;
      </span>
    </div>
  );
};

export default PaginationNav;
