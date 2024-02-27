import React from "react";

const Stats = ({ items }) => {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  }

  const itemsNum = items.length;
  const packedItemsNum = items.reduce(
    (acc, item) => acc + (item.packed ? 1 : 0),
    0
  );
  const percentage = Math.round((packedItemsNum / itemsNum) * 100);
  return (
    <footer className="stats">
      <em>
        {packedItemsNum === itemsNum
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${itemsNum} items on your list, and you have already packed ${packedItemsNum} (${percentage}%).`}
      </em>
    </footer>
  );
};

export default Stats;
