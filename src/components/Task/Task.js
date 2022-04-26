import React from "react";
import "./Task.scss";

const Task = ({ task }) => {
  return (
    <>
      <div className="task-item">
        {task.image && (
          <img
            className="task-cover"
            src={task.image}
            alt={task.title}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />
        )}
        {task.title}
      </div>
    </>
  );
};

export default Task;
