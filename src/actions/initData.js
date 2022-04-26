export const initData = {
  boards: [
    {
      id: "board-1",
      columnOrder: ["column-1", "column-2", "column-3"],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          title: "Todo 1",
          taskOrder: ["task-1", "task-2", "task-3"],
          tasks: [
            {
              id: "task-1",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 1",
              image:
                "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/1175917cb0e741706e55adce1dcaf568/photo-1521791055366-0d553872125f.jpg",
            },
            {
              id: "task-2",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 2",
              image: null,
            },
            {
              id: "task-3",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of task 3",
              image: null,
            },
          ],
        },
        {
          id: "column-2",
          boardId: "board-1",
          title: "Todo 2",
          taskOrder: ["task-4", "task-5"],
          tasks: [
            {
              id: "task-4",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of task 4",
              image: null,
            },
            {
              id: "task-5",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of task 5",
              image: null,
            },
          ],
        },
        {
          id: "column-3",
          boardId: "board-1",
          title: "Todo 3",
          taskOrder: ["task-6", "task-7", "task-8", "task-9"],
          tasks: [
            {
              id: "task-6",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of task 6",
              image:
                "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/1175917cb0e741706e55adce1dcaf568/photo-1521791055366-0d553872125f.jpg",
            },
            {
              id: "task-7",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of task 7",
              image: null,
            },
            {
              id: "task-8",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of task 8",
              image: null,
            },
            {
              id: "task-9",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of task 9",
              image: null,
            },
          ],
        },
      ],
    },
  ],
};
