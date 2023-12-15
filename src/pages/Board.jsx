import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column";
import data from "../data.json";
import PRIORITY from "../constants";
import { sortDataByPriority } from "../utils";

const Board = () => {
  const sortedData = sortDataByPriority(data);

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
        {Object.keys(sortedData).map((item) => (
          <Column
            key={item}
            columnId={item}
            title={PRIORITY[item]}
            tasks={sortedData[item]}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
