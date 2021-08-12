// rxaction
import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
} from "../Type/BaiTapToDoListType";

export const addTaskAction = (newTask) => ({
  type: add_task,
  newTask,
});

export const changeThemeAction = (themeId) => ({
  type: change_theme,
  themeId,
});

export const doneTaskAction = (taskName) => ({
  type: done_task,
  taskName,
});

export const dellTaskAction = (taskName) => ({
  type: delete_task,
  taskName,
});

export const editTaskAction = (task) => ({
  type: edit_task,
  task,
});
