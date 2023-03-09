import React, { createContext, useContext, useState } from "react";
import users from "./users.json";

// DragContext
const DragContext = createContext();

const DragContextProvider = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const dragItem = (item) => {
    setDraggedItem(item);
  };

  const dropItem = (area, index) => {
    area.onChange((items) => {
      const newItems = [...items];
      const draggedIndex = newItems.indexOf(draggedItem);
      newItems.splice(draggedIndex, 1); // Remove the dragged item from its original position
      if (index > draggedIndex) {
        index--;
      }
      newItems.splice(index, 0, draggedItem);
      return newItems;
    });
    setDraggedItem(null);
  };

  return (
    <DragContext.Provider value={{ dragItem, dropItem }}>
      {children}
    </DragContext.Provider>
  );
};

// DragArea
const DragArea = ({ items, onChange, children }) => {
  const { dropItem } = useContext(DragContext);

  const onDrop = (e, index) => {
    e.preventDefault();
    dropItem({ onChange }, index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <li onDrop={onDrop} onDragOver={onDragOver}>
      {children}
    </li>
  );
};

// DragItem
const DragItem = ({ children }) => {
  const { dragItem } = useContext(DragContext);

  const onDragStart = (e) => {
    const item = React.Children.only(children).props;
    dragItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", ""); // Add this line to fix the issue
  };

  const onDragEnd = (e) => {
    const parent = e.target.parentNode;
    const newIndex = Array.prototype.indexOf.call(parent.children, e.target);
    parent.removeChild(e.target);
    parent.insertBefore(e.target, parent.children[newIndex]);
    e.target.style.display = "block"; // Add this line to fix the issue
  };

  return (
    <li draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}
    </li>
  );
};

// UserItem
const UserItem = ({ name, email }) => {
  return (
    <li>
      <span>{name}</span>
      <span>{email}</span>
    </li>
  );
};

// App
const App = () => {
  const [exampleUsers, setExampleUsers] = useState(users);

  return (
    <DragContextProvider>
      <ul>
        <DragArea items={exampleUsers} onChange={setExampleUsers}>
          {exampleUsers.map((user, i) => (
            <DragItem key={i}>
              <UserItem name={user.name} email={user.email} />
            </DragItem>
          ))}
        </DragArea>
      </ul>
    </DragContextProvider>
  );
};

export default App;
