import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import { useState } from "react";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

function Header({ setBoardModalOpen, boardModalOpen }) {
  const [boardType, setBoardType] = useState("add");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  console.log(board);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setDeleteModalOpen(true);
    setElipsisMenuOpen(false);
  };
  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setDeleteModalOpen(false);
    } else {
      setDeleteModalOpen(false);
    }
  };
  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setElipsisMenuOpen(false);
    setBoardType("add");
  };
  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className="flex justify-between dark:text-white items-center">
        <div className=" flex items-center space-x-2  md:space-x-4">
          <img src={Logo} alt=" Logo " className=" h-6 w-6" />
          <h3 className=" md:text-4xl  hidden md:inline-block font-bold  font-sans">
            kanban
          </h3>

          <div className=" flex items-center ">
            {board && board.name && (
              <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
                {board.name}
              </h3>
            )}
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>
        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className=" button hidden md:block "
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className=" button py-1 px-3 md:hidden "
          >
            +
          </button>
          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setElipsisMenuOpen((state) => !state);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />
          {elipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>
        {openDropdown && (
          <HeaderDropdown
            setOpenDropdown={setOpenDropdown}
            setBoardModalOpen={setBoardModalOpen}
          />
        )}
      </header>

      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}

      {openAddEditTask && (
        <AddEditTaskModal
          setBoardType={setBoardType}
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          type="add"
        />
      )}
      {deleteModalOpen && (
        <DeleteModal
          setDeleteModalOpen={setDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
