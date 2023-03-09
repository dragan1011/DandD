/* import React, { useState } from "react";

const DragContext = ({ note, children }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const onDragStart = (item) => {
    setDraggedItem(item);
  };

  const onDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div>
      <p>{note}</p>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          onDragStart,
          onDragEnd,
          draggedItem,
        })
      )}
    </div>
  );
};
const DragArea = ({ items, onChange, children }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("dragged-item"));
    setDraggedItem(null);
    onChange((items) => {
      const updatedItems = [...items];
      updatedItems.splice(data.index, 1);
      updatedItems.splice(event.currentTarget.dataset.index, 0, data.item);
      return updatedItems;
    });
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          onDragStart: () =>
            setDraggedItem({ item: child.props.children, index }),
          onDragEnd: () => setDraggedItem(null),
          "data-index": index,
        })
      )}
    </div>
  );
};
const DragItem = ({
  note,
  index,
  onDragStart,
  onDragEnd,
  draggedItem,
  children,
}) => {
  const onDragStartHandler = () => {
    onDragStart(index);
  };

  const onDragEndHandler = () => {
    onDragEnd();
  };

  const onDragOverHandler = (event) => {
    event.preventDefault();
  };

  const onDropHandler = (event) => {
    event.preventDefault();
    const newIndex = parseInt(draggedItem, 10);
    const oldIndex = index;
    const newItems = [...items];
    newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, items[oldIndex]);
    onChange(newItems);
  };

  return (
    <div
      draggable
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
    >
      <p>{note}</p>
      <div onDragOver={onDragOverHandler} onDrop={onDropHandler}>
        {children}
      </div>
    </div>
  );
};

export { DragContext, DragArea, DragItem };
 */
