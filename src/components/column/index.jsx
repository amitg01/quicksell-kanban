import { Droppable } from "react-beautiful-dnd";
import Card from "../Card";
import ColumnHeader from "./header";

const Column = ({ columnId, title, tasks }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <ColumnHeader title={title} ticketsCount={tasks.length} />
          {tasks.map((task, index) => (
            <Card key={task.id} index={index} task={task} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
