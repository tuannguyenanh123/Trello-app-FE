import React, { useState, useEffect, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";

import { mapOrder } from "../../utils/sort";
import Task from "../Task/Task";
import "./Column.scss";
import ComfirmModal from "../Modal/ComfirmModal";
import {
  MODAL_ACTION_CLOSE,
  MODAL_ACTION_CONFIRM,
} from "../../utils/constants";

const Column = ({ column, onCardDrop, onUpdateColumn }) => {
  const taskList = mapOrder(column.tasks, column.taskOrder, "id");
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [titleColumn, setTitleColumn] = useState("");
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);
  const [valueTextArea, setValueTextArea] = useState("");

  useEffect(() => {
    if (isShowAddNewCard === true && textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isShowAddNewCard]);
  useEffect(() => {
    if (column && column.title) {
      setTitleColumn(column.title);
    }
  }, [column]);

  const toggleModal = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };
  const onModalAction = (type) => {
    if (type === MODAL_ACTION_CLOSE) {
      //do nothing
    }
    if (type === MODAL_ACTION_CONFIRM) {
      // remove a column
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }
    toggleModal();
  };
  // click lan dau select all value input , lần sau focus không select all
  const selectAllText = (event) => {
    setIsFirstClick(false);
    if (isFirstClick) {
      event.target.select();
    } else {
      inputRef.current.setSelectionRange(
        titleColumn.length,
        titleColumn.length
      );
    }
    // event.target.focus();
  };
  const handleClickOutside = () => {
    setIsFirstClick(true);
    const newColumn = {
      ...column,
      title: titleColumn,
      _destroy: false,
    };
    onUpdateColumn(newColumn);
  };

  const handleAddNewCard = () => {
    if (!valueTextArea) {
      textAreaRef.current.focus();
      return;
    }
    const newCard = {
      id: uuidv4(),
      boardId: column.boardId,
      columnId: column.id,
      title: valueTextArea,
      image: null,
    };
    let newColumn = { ...column };
    newColumn.tasks.unshift(newCard);
    newColumn.taskOrder = newColumn.tasks.map((task) => task.id);
    onUpdateColumn(newColumn);
    console.log(column);
    console.log(newColumn);
    setValueTextArea("");
    textAreaRef.current.focus();
  };
  return (
    <>
      <div className="column">
        <header className="column-drag-handle">
          <div className="column-title">
            {/* {column.title} */}
            <Form.Control
              type="text"
              size={"sm"}
              value={titleColumn}
              className="column-title-edit"
              onClick={selectAllText}
              onChange={(event) => {
                setTitleColumn(event.target.value);
              }}
              spellCheck={false}
              onBlur={handleClickOutside}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              ref={inputRef}
            />
          </div>
          <div className="column-dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic"></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">Add card</Dropdown.Item>
                <Dropdown.Item onClick={toggleModal}>
                  Remove column
                </Dropdown.Item>
                <Dropdown.Item href="#">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>

        <div className="task-list">
          <Container
            // onDragStart={(e) => console.log("drag started", e)}
            // onDragEnd={(e) => console.log("drag end", e)}
            // onDragEnter={() => {
            //   console.log("drag enter:", column.id);
            // }}
            // onDragLeave={() => {
            //   console.log("drag leave:", column.id);
            // }}
            // onDropReady={(p) => console.log("Drop ready: ", p)}
            groupName="col"
            onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
            getChildPayload={(index) => taskList[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "card-drop-preview",
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {taskList &&
              taskList.length > 0 &&
              taskList.map((task, index) => {
                return (
                  <Draggable key={task.id}>
                    <Task task={task} />
                  </Draggable>
                );
              })}
          </Container>

          {isShowAddNewCard && (
            <div className="add-new-card">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Enter a title for this card..."
                rows="2"
                ref={textAreaRef}
                value={valueTextArea}
                onChange={(e) => {
                  setValueTextArea(e.target.value);
                }}
                spellCheck={false}
              ></textarea>
              <div className="group-btn">
                <button className="btn btn-success" onClick={handleAddNewCard}>
                  Add task
                </button>
                <i
                  className="fa fa-times icon"
                  onClick={() => setIsShowAddNewCard(false)}
                ></i>
              </div>
            </div>
          )}
        </div>
        {!isShowAddNewCard && (
          <footer>
            <div
              className="footer-icon"
              onClick={() => setIsShowAddNewCard(true)}
            >
              <i className="fa fa-plus icon"></i>
              Add another card
            </div>
          </footer>
        )}
      </div>
      <ComfirmModal
        show={isShowModalDelete}
        title="Remove a column"
        content={`Are you sure you want to remove column <b>${column.title}</b>`}
        onAction={onModalAction}
      />
    </>
  );
};

export default Column;
