import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import { useBoard } from "../hooks/useBoard";

const Board = () => {
  const { tickets, onDragEnd } = useBoard();

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.keys(tickets).map((label) => (
            <Column
              key={label}
              columnId={label}
              title={label}
              tasks={tickets[label]}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
