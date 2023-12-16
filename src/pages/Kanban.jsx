import { BoardProvider } from "../hooks/useBoard";
import Board from "../components/Board";

const Kanban = () => {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
};

export default Kanban;
