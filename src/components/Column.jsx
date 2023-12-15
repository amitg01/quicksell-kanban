import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const Column = ({ columnId, title, tasks }) => {
  console.log({ tasks });
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <p>{title}</p>
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
