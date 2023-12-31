import { createContext, useContext, useEffect, useState } from "react";

import {
  BOARD_DATA_URL,
  GROUP_BY_LABELS,
  LOCALSTORAGE_GROUP_BY_KEY,
  LOCALSTORAGE_SORT_BY_KEY,
  SORT_BY_OPTIONS,
} from "../constants";
import { getFromLocalStorage, groupData, setInLocalStorage } from "../utils";
import { getBoardData } from "../api/boardApi";

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
  const [boardData, setBoardData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [sortBy, setSortBy] = useState(
    getFromLocalStorage(LOCALSTORAGE_SORT_BY_KEY) || SORT_BY_OPTIONS.PRIORITY
  );
  const [groupBy, setGroupBy] = useState(
    getFromLocalStorage(LOCALSTORAGE_GROUP_BY_KEY) || GROUP_BY_LABELS.STATUS
  );

  const handleSortByChange = (e) => {
    const { value } = e.target;
    setSortBy(value);
    setInLocalStorage(LOCALSTORAGE_SORT_BY_KEY, value);
  };

  const handleGroupByChange = (e) => {
    const { value } = e.target;
    setGroupBy(value);
    setInLocalStorage(LOCALSTORAGE_GROUP_BY_KEY, value);
  };

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

  const fetchData = async () => {
    const { data } = await getBoardData(BOARD_DATA_URL);
    setBoardData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const sortedTickets = groupData(boardData, groupBy, sortBy);
    setTickets(sortedTickets);
  }, [sortBy, groupBy, boardData]);

  return {
    tickets,
    sortBy,
    handleGroupByChange,
    groupBy,
    handleSortByChange,
    onDragEnd,
  };
};
