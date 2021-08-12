import React, { Component } from "react";
import { Container } from "../BaiTapToDoList/ComponentsToDoList/Container";
import { ThemeProvider } from "styled-components";
// import { ToDoListDarkTheme } from "../../theme/ToDoListDarkTheme";
// import { ToDoListLightTheme } from "../../theme/ToDoListLightTheme";
// import { ToDoListPrimaryTheme } from "../../theme/ToDoListPrimaryTheme";
import { Dropdown } from "../BaiTapToDoList/ComponentsToDoList/Dropdown";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../BaiTapToDoList/ComponentsToDoList/Heading";

import {
  TextField,
  Label,
  Input,
} from "../BaiTapToDoList/ComponentsToDoList/TextField";

import { Button } from "../BaiTapToDoList/ComponentsToDoList/Button";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../BaiTapToDoList/ComponentsToDoList/Table";

import { connect } from "react-redux";
import {
  addTaskAction,
  changeThemeAction,
  dellTaskAction,
  doneTaskAction,
  editTaskAction,
} from "../../redux/Action/BaiTapToDoListAction";
import { arrTheme } from "../../theme/ThemeManager";

class BaiTapToDoList extends Component {
  // Dùng state - setState để chuyển đôi dữ liệu trên cùng 1 component
  state = {
    taskName: "",
  };

  renderTaskToDo = () => {
    let { taskList } = this.props;
    let taskToDo = taskList.filter((task) => !task.done); // loại bỏ done: true
    return taskToDo.map((task, index) => {
      return (
        <Tr key={index}>
          <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
          <Th className="text-right">
            <Button
              className="ml-1"
              onClick={() => {
                this.props.editTask(task);
              }}
            >
              <i className="fa fa-edit"></i>
            </Button>
            <Button
              className="ml-1"
              onClick={() => {
                this.props.doneTask(task.taskName);
              }}
            >
              <i className="fa fa-check"></i>
            </Button>
            <Button
              className="ml-1"
              onClick={() => {
                this.props.deleteTask(task.taskName);
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Th>
        </Tr>
      );
    });
  };

  renderTaskCompleted = () => {
    let { taskList } = this.props;
    let taskCompleted = taskList.filter((task) => task.done);
    return taskCompleted.map((task, index) => {
      return (
        <Tr key={index}>
          <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
          <Th className="text-right">
            <Button
              className="ml-1"
              onClick={() => {
                this.props.deleteTask(task.taskName);
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Th>
        </Tr>
      );
    });
  };

  // Tường minh thì vẫn có thể làm hàm handleChange như QuanLyNguoiDung
  // Vì chỉ có 1 testField là input duy nhất của bài nên làm gọn
  //   handleChange = () => {
  //     let { name, value } = event.target;
  //     this.setState({
  //       [name]: value,
  //     });
  //   };

  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      let content = [];
      content.push(
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
      return content;
    });
  };

  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              this.props.changeTheme(value);
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading3 className="mt-3">To do list</Heading3>
          {/* Dùng hàm onChange hoặc onBlur để setState giá trị mới cho dữ liệu thay đổi */}
          <TextField
            value={this.props.taskEdit.taskName}
            label="Task name"
            onChange={(event) => {
              this.setState(
                {
                  taskName: event.target.value,
                } // dùng callBack - tham số thứ 2 để kiểm tra setState đúng chưa
                //       () => {
                //       console.log(this.state.newTask)
                //   }
              );
            }}
          />
          <Button
            className="ml-2"
            onClick={() => {
              // Dùng bóc tách phần tử để lấy giá trị từ state vào
              let { taskName } = this.state;
              // Tạo object newTask gồm: id, taskName, done
              let newTask = {
                id: Date.now(), // Lấy theo thời gian, đảm bảo id không trùng
                taskName,
                done: false, // Mặc định newTask là chưa làm
              };
              this.props.addTask(newTask);
            }}
          >
            <i className="fa fa-plus"></i> Add Task
          </Button>
          <Button className="ml-2">
            <i className="fa fa-upload"></i> Update Task
          </Button>
          <hr />
          <Heading3>Task to do</Heading3>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <Heading3 className="mt-3">Task completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  themeToDoList: state.BaiTapToDoListReducer.themeToDoList,
  taskList: state.BaiTapToDoListReducer.taskList,
  taskEdit: state.BaiTapToDoListReducer.taskEdit,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task) => {
      dispatch(addTaskAction(task));
    },
    changeTheme: (themeId) => {
      dispatch(changeThemeAction(themeId));
    },
    doneTask: (taskName) => {
      dispatch(doneTaskAction(taskName));
    },
    deleteTask: (taskName) => {
      dispatch(dellTaskAction(taskName));
    },
    editTask: (taskName) => {
      dispatch(editTaskAction(taskName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaiTapToDoList);
