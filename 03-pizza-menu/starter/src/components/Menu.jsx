import React from "react";
import pizzaData from "../data";
import Pizza from "./Pizza.jsx";

const Menu = () => {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza, index) => (
              <Pizza pizza={pizza} key={index} />
            ))}
          </ul>
        </>
      ) : (
        <p>We are still working on our menu. Please come back later</p>
      )}
    </main>
  );
};

export default Menu;
