import { createContext, useContext, useEffect, useState } from "react";

import data from "../data.json";
import { GROUP_BY_LABELS, SORT_BY_OPTIONS } from "../constants";
import { groupData } from "../utils";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const contextValue = useBoardProvider();
  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);

const useBoardProvider = () => {
  const [tickets, setTickets] = useState([]);
  const [sortBy, setSortBy] = useState(SORT_BY_OPTIONS.PRIORITY);
  const [groupBy, setGroupBy] = useState(GROUP_BY_LABELS.STATUS);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const sourceColumn = tickets[sourceColumnId];
    const destinationColumn = tickets[destinationColumnId];

    const [removedTask] = sourceColumn.splice(sourceIndex, 1);

    destinationColumn.splice(destinationIndex, 0, removedTask);
  };

  useEffect(() => {
    const sortedData = groupData(data, groupBy, sortBy);
    setTickets(sortedData);
  }, [sortBy, groupBy]);

  return {
    tickets,
    setSortBy,
    setGroupBy,
    onDragEnd,
  };
};
