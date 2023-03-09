import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DragContext } from "./DragContext";

const DragArea = ({ items, onChange, children }) => {
  const { setDragItemId } = useContext(DragContext);

  const handleDrop = (event) => {
    event.preventDefault();
    const dragItemId = event.dataTransfer.getData("dragItemId");
    const dropItemId = event.currentTarget.getAttribute("data-item-id");

    if (dragItemId !== dropItemId) {
      const dragIndex = items.findIndex((item) => item.id === dragItemId);
      const dropIndex = items.findIndex((item) => item.id === dropItemId);

      const newItems = [...items];
      newItems.splice(dropIndex, 0, newItems.splice(dragIndex, 1)[0]);
      onChange(newItems);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      data-testid="drag-area"
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          index,
          draggable: true,
          "data-item-id": child.props.item.id,
          onDragStart: () => setDragItemId(child.props.item.id),
          onDragEnd: () => setDragItemId(null),
        })
      )}
    </div>
  );
};

DragArea.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DragArea;
