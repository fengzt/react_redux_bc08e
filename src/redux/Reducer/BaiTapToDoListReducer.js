// rxreducer : cũng ra cú pháp này
// const initialState = {
// }

// export default (state = initialState, { type, payload }) => {
//     switch (type) {

//     case typeName:
//         return { ...state, ...payload }

//     default:
//         return state
//     }
// }

import { ToDoListDarkTheme } from "../../theme/ToDoListDarkTheme";
// import { ToDoListLightTheme } from "../../theme/ToDoListLightTheme";
// import { ToDoListPrimaryTheme } from "../../theme/ToDoListPrimaryTheme";
import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
} from "../Type/BaiTapToDoListType";
import { arrTheme } from "../../theme/ThemeManager";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: 1, taskName: "task 1", done: true },
    { id: 2, taskName: "task 2", done: false },
    { id: 3, taskName: "task 3", done: true },
    { id: 4, taskName: "task 4", done: false },
    { id: 5, taskName: "task 5", done: true },
  ],
  taskEdit: {},
};

const BaiTapToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      // Kiểm tra rỗng
      if (action.newTask.taskName.trim() === "") {
        alert("Task Name must be filled");
        return { ...state };
      }
      // Kiểm tra tồn tại
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );
      if (index !== -1) {
        alert("Task Name has already added");
        return { ...state };
      }
      state.taskList = [...taskListUpdate, action.newTask];
      return { ...state };
    }
    case change_theme: {
      let theme = arrTheme.find((theme) => theme.id == action.themeId);
      // Vì theme.id đang trong object, hiểu là chuỗi; còn action.themeId lấy từ value, hiểu là số
      // => không thể dùng === , mà chỉ dùng == để chỉ bằng về tính trừu tượng: "2" == 2 => true
      // "2" === 2 => false
      //   console.log(theme);
      if (theme) {
        state.themeToDoList = theme.theme;
        return { ...state };
      }
      break;
    }
    case done_task: {
      let taskListUpdate = [...state.taskList];
      let taskDone = taskListUpdate.find(
        (task) => task.taskName === action.taskName
      );
      if (taskDone) {
        taskDone.done = true;
      }
      state.taskList = taskListUpdate;
      return { ...state };
    }
    case delete_task: {
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.taskName
      );
      if (index !== -1) {
        taskListUpdate.splice(index, 1);
      }
      state.taskList = taskListUpdate;
      return { ...state };
    }
    case edit_task: {
      //   console.log(action.taskName);
      return { ...state, taskEdit: action.task };
    }
    default:
      return { ...state };
  }
};

export default BaiTapToDoListReducer;
