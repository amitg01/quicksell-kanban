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
          <div className="flex-container">
            <p className="task_id">{task.id}</p>
            <BoardIcon.CardIcon type="user" task={task} />
          </div>
          <div className=" flex py">
            <BoardIcon.CardIcon type="status" task={task} className="mr" />
            <p className="ticket_title">{task.title}</p>
          </div>
          <div className="flex-container">
            <BoardIcon.CardIcon type="priority" task={task} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
