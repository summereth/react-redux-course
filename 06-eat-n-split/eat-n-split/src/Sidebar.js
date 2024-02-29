import Friend from "./Friend";
import AddFriendForm from "./AddFriendForm";

export default function Sidebar({
  friends,
  selectedFriendId,
  onSelectFriend,
  openAddFriend,
  onOpenAddFriend,
  onAddFriend,
}) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            isSelected={selectedFriendId === friend.id}
            onSelectFriend={onSelectFriend}
          />
        ))}
      </ul>
      {openAddFriend ? (
        <AddFriendForm onAddFriend={onAddFriend} />
      ) : (
        <button className="button" onClick={onOpenAddFriend}>
          Add a friend
        </button>
      )}
    </div>
  );
}
