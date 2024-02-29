import { useState } from "react";
import { initialFriends } from "./data";
import Sidebar from "./Sidebar";
import SplitBillForm from "./SplitBillForm";

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [openAddFriend, setOpenAddFriend] = useState(false);

  function selectFriendHandler(id) {
    setSelectedFriendId(selectedFriendId === id ? null : id);
  }

  function addFriendHandler(newFriend) {
    setFriends((currFriends) => [...currFriends, { ...newFriend }]);
    setOpenAddFriend(false);
  }

  function updateBalanceHandler(id, newBalance) {
    setFriends((currFriends) =>
      currFriends.map((friend) =>
        friend.id === id ? { ...friend, balance: newBalance } : friend
      )
    );
  }

  return (
    <div className="app">
      <Sidebar
        friends={friends}
        selectedFriendId={selectedFriendId}
        onSelectFriend={selectFriendHandler}
        openAddFriend={openAddFriend}
        onOpenAddFriend={() => setOpenAddFriend(true)}
        onAddFriend={addFriendHandler}
      />
      <SplitBillForm
        friend={friends.find((friend) => friend.id === selectedFriendId)}
        onUpdateFriendBalance={updateBalanceHandler}
      />
    </div>
  );
}
