import { useState } from "react";

import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column";

import data from "../data.json";
import { GROUP_BY_LABELS, SORT_BY_OPTIONS } from "../constants";
import { groupData } from "../utils";

const Board = () => {
  const [groupBy, setGroupBy] = useState(GROUP_BY_LABELS.STATUS);
  const [sortBy, setSortBy] = useState(SORT_BY_OPTIONS.PRIORITY);

  const sortedData = groupData(data, groupBy, sortBy);

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

    const sourceColumn = sortedData[sourceColumnId];
    const destinationColumn = sortedData[destinationColumnId];

    const [removedTask] = sourceColumn.splice(sourceIndex, 1);

    destinationColumn.splice(destinationIndex, 0, removedTask);
  };

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <select value={groupBy} onChange={handleGroupByChange}>
        {Object.values(GROUP_BY_LABELS).map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      <select value={sortBy} onChange={handleSortByChange}>
        {Object.values(SORT_BY_OPTIONS).map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.keys(sortedData).map((label) => (
            <Column
              key={label}
              columnId={label}
              title={label}
              tasks={sortedData[label]}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
