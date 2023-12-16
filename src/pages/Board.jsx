import { useState } from "react";

import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column";

import data from "../data.json";
import { GROUP_BY_LABELS } from "../constants";
import { sortByGroup } from "../utils";

const Board = () => {
  const [groupBy, setGroupBy] = useState(GROUP_BY_LABELS.USER);
  const sortedData = sortByGroup(data, groupBy);

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

  return (
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
  );
};

export default Board;
