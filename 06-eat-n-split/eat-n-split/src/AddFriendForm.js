import { useState } from "react";

export default function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function addFriendHandler(e) {
    e.preventDefault();

    const newFriend = {
      id: Date.now(),
      name,
      image,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("");
  }

  return (
    <form className="form-add-friend">
      <label>👫 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌅 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="button" onClick={addFriendHandler}>
        Add
      </button>
    </form>
  );
}
