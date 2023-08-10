import Header from "./components/Header";
import Center from "./components/Center";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import EmptyBoard from "./components/EmptyBoard";

function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  const [boardModalOpen, setBoardModalOpen] = useState(false);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
        {boards.length > 0 ? (
          <>
            <Header
              setBoardModalOpen={setBoardModalOpen}
              boardModalOpen={boardModalOpen}
            />
            <Center
              setBoardModalOpen={setBoardModalOpen}
              boardModalOpen={boardModalOpen}
            />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
    </div>
  );
}

export default App;
