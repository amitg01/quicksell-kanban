import { Draggable } from "react-beautiful-dnd";

const Card = ({ task, index }) => {
  console.log({ task });
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{task.id}</p>
          <p>{task.title}</p>
          <p>{task.user.name}</p> - <p>{task.priority}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
