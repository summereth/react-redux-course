export default function Friend({ friend, isSelected, onSelectFriend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : ""
        }
      >
        {friend.balance === 0
          ? `You and ${friend.name} are even`
          : friend.balance > 0
          ? `${friend.name} owes you $${friend.balance}`
          : `You owes ${friend.name} $${-friend.balance}`}
      </p>
      <button className="button" onClick={() => onSelectFriend(friend.id)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}
