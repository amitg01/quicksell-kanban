import { BoardProvider } from "../hooks/useBoard";
import Board from "../components/Board";
import ToolBar from "../components/ToolBar";

const Kanban = () => {
  return (
    <BoardProvider>
      <ToolBar />
      <Board />
    </BoardProvider>
  );
};

export default Kanban;
