import { useState } from "react";

export default function SplitBillForm({ friend, onUpdateFriendBalance }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [payer, setPayer] = useState("you");

  const friendExpense = bill - yourExpense;

  function updateBalanceHandler(e) {
    e.preventDefault();

    const newBalance =
      friend.balance + (payer === "you" ? friendExpense : -yourExpense);
    onUpdateFriendBalance(friend.id, newBalance);
  }

  if (friend) {
    return (
      <form className="form-split-bill">
        <h2>Split a bill with {friend.name}</h2>
        <label>💰 Bill value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
        <label>🧍‍♀️ Your expense</label>
        <input
          type="text"
          value={yourExpense}
          onChange={(e) => setYourExpense(Number(e.target.value))}
        />
        <label>👫 {friend.name}'s expense</label>
        <input type="text" value={friendExpense} disabled={true} />
        <label>🤑 Who is paying the bill?</label>
        <select value={payer} onChange={(e) => setPayer(e.target.value)}>
          <option value="you">You</option>
          <option value="friend">{friend.name}</option>
        </select>
        <button className="button" onClick={updateBalanceHandler}>
          Split bill
        </button>
      </form>
    );
  }
}
