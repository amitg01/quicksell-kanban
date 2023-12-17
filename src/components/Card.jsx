import { Draggable } from "react-beautiful-dnd";
import BoardIcon from "../shared/Icons/BoardIcon";

const Card = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <BoardIcon.CardIcon type="priority" task={task} />
          <BoardIcon.CardIcon type="user" task={task} />
          <BoardIcon.CardIcon type="status" task={task} />
          <p>{task.id}</p>
          <p>{task.title}</p>
          <p>{task.user.name}</p> - <p>{task.priority}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
