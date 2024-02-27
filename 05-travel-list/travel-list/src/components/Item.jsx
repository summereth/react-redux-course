import React from "react";

const Item = ({ item, onCheckItem, onDeleteItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={(e) => {
          onCheckItem(item);
        }}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item)}>❌</button>
    </li>
  );
};

export default Item;
