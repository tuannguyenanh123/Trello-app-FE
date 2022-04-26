import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import { v4 as uuidv4 } from "uuid";

import Column from "../Column/Column";
import "./BoardContent.scss";
import { initData } from "../../actions/initData";
import { mapOrder } from "../../utils/sort";
import { applyDrag } from "../../utils/dragDrog";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [isShowAddTask, setIsShowAddTask] = useState(false);
  const inputRef = useRef(null);
  const [valueInput, setValueInput] = useState("");
  // focus input when input element mount dom
  useEffect(() => {
    if (isShowAddTask === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowAddTask]);
  useEffect(() => {
    const boardInitData = initData.boards.find((item) => item.id === "board-1");
    if (boardInitData) {
      setBoard(boardInitData);
      // sort columns
      setColumns(
        mapOrder(boardInitData.columns, boardInitData.columnOrder, "id")
      );
    }
  }, []);
  if (_.isEmpty(board)) {
    return (
      <>
        <div className="not-found">Board not found</div>
      </>
    );
  }
  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };
  const onCardDrop = (dropResult, columnId) => {
    if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
      // column hiện tại đang cầm thả xuống: currentColumn
      let newColumns = [...columns];
      let currentColumn = newColumns.find((column) => column.id === columnId);
      currentColumn.tasks = applyDrag(currentColumn.tasks, dropResult);
      currentColumn.taskOrder = currentColumn.tasks.map((task) => task.id);
      setColumns(newColumns);
    }
  };
  const handleAddList = () => {
    if (!valueInput && inputRef && inputRef.current) {
      inputRef.current.focus();
      return;
    }
    // update board columns
    const _columns = [...columns];
    _columns.push({
      id: uuidv4(),
      boardId: board.id,
      title: valueInput,
      tasks: [],
    });
    setColumns(_columns);
    setValueInput("");
    inputRef.current.focus();
  };
  const onUpdateColumn = (newColumn) => {
    const columnId = newColumn.id;
    let nColumns = [...columns]; // original columns
    let index = nColumns.findIndex((column) => column.id === columnId);
    if (newColumn._destroy) {
      //remove column
      nColumns.splice(index, 1);
    } else {
      // update title
      nColumns[index] = newColumn;
    }
    setColumns(nColumns);
  };
  return (
    <>
      <div className="board-columns">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={(index) => columns[index]}
          dragHandleSelector=".column-drag-handle" // select position drap drop
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "column-drop-preview",
          }}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column, index) => {
              return (
                <Draggable key={column.id}>
                  <Column
                    column={column}
                    onCardDrop={onCardDrop}
                    onUpdateColumn={onUpdateColumn}
                  />
                </Draggable>
              );
            })}
        </Container>
        {isShowAddTask ? (
          <div className="content-add-column">
            <input
              type="text"
              className="form-control"
              ref={inputRef}
              value={valueInput}
              onChange={(e) => {
                setValueInput(e.target.value);
              }}
            />
            <div className="group-btn">
              <button
                className="btn btn-success"
                onClick={() => {
                  handleAddList();
                }}
              >
                Add list
              </button>
              <i
                className="fa fa-times icon"
                onClick={() => {
                  setIsShowAddTask(false);
                }}
              ></i>
            </div>
          </div>
        ) : (
          <div
            className="add-new-column"
            onClick={() => {
              setIsShowAddTask(true);
            }}
          >
            <i className="fa fa-plus icon"></i>
            Add another column
          </div>
        )}
      </div>
    </>
  );
};

export default BoardContent;
