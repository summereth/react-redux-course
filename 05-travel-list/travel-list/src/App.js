import "./index.css";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { initialItems } from "./data";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(initialItems);

  function addItemsHandler(item) {
    setItems((items) => [...items, { ...item }]);
  }

  function checkItemHandler(item) {
    setItems((items) =>
      items.map((x) => (x.id === item.id ? { ...x, packed: !x.packed } : x))
    );
  }

  function deleteItemHandler(item) {
    setItems((items) => items.filter((x) => x.id !== item.id));
  }

  function clearItemsHandler() {
    const confirmed = window.confirm("Are you sure to delete all items?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItemsHandler} />
      <PackingList
        items={items}
        onCheckItem={checkItemHandler}
        onDeleteItem={deleteItemHandler}
        onClearItems={clearItemsHandler}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
