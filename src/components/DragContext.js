import React, { useState } from "react";

const DragContext = React.createContext({
  dragItemId: null,
  setDragItemId: () => {},
});

const DragContextProvider = ({ children }) => {
  const [dragItemId, setDragItemId] = useState(null);

  return (
    <DragContext.Provider value={{ dragItemId, setDragItemId }}>
      {children}
    </DragContext.Provider>
  );
};

export { DragContext, DragContextProvider };
