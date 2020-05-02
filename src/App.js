import React, { Component } from 'react';
import './App.css';
import './assets/css/main.css';

import { Layout } from 'antd';

import AddTask from './Components/AddTask';
import TaskList from './Components/TaskList';
import TodoList from './Components/TodoList';

import { TASK_KEY, setStore } from './utils/storage';



import { state } from './state';

const { Header, Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...state,
      title: '',
      time: '',
      id: '',
      index: -1,
      todolist: [],
    };

    this.handleAddTask = this.handleAddTask.bind(this)
    this.handleRemoveTask = this.handleRemoveTask.bind(this)
    this.handleUpdateTask = this.handleUpdateTask.bind(this)
    this.handleSelectTask = this.handleSelectTask.bind(this)
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this)
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this)
  }

  // 增
  handleAddTask(task) {
    let tasklist = [...this.state.tasklist, task];
    this.setState({
      tasklist,
    })
    setStore(TASK_KEY, tasklist)
  }
  // 删
  handleRemoveTask(index) { // 如果要保证删除的是正确序号的任务列表，则可再传入一个ID来进行判定
    let tasklist = this.state.tasklist;
    tasklist.splice(index, 1)
    this.setState({
      tasklist
    })
    setStore(TASK_KEY, tasklist)
  }
  // 改
  handleUpdateTask(index, task) {
    let tasklist = this.state.tasklist;
    tasklist[index] = task
    this.setState({
      tasklist
    })
    setStore(TASK_KEY, tasklist)
  }
  // 点击
  handleSelectTask(index) {
    let task = this.state.tasklist[index]
    this.setState({
      title: task.title,
      time: task.time,
      id: task.id,
      index: index,
      todolist: task.todolist,
    })
  }
  // 待办清单增删改查
  handleAddTodo(newTodolist) { // 添加
    let tasklist = this.state.tasklist;
    tasklist[this.state.index].todolist = newTodolist;
    this.setState({
      tasklist
    })
    setStore(TASK_KEY, tasklist)
  }
  // 移除一个
  handleRemoveTodo(index) {
    let tasklist = this.state.tasklist;
    tasklist[this.state.index].todolist.splice(index, 1)
    this.setState({
      tasklist
    })
    setStore(TASK_KEY, tasklist)
  }
  // 更新
  handleUpdateTodo(index, todo) {
    let tasklist = this.state.tasklist;
    tasklist[this.state.index].todolist[index] = todo;
    this.setState({
      tasklist
    })
    setStore(TASK_KEY, tasklist)
  }
  // handleSelectTodo(index) {

  // }

  render() {
    let title;
    {
      if (this.state.title === "") {
        title = (<Header className="header">
          <div className="title">暂未选中任务</div>
        </Header>)
      } else {
        title = (<Header className="header">
          <div className="title">{this.state.title}</div>
          <div className="time">{this.state.time}</div>
        </Header>)
      }
    }
    return (
      <div className="App">
        <Layout>
          <Sider className="sider" width="300px" theme="light" breakpoint="lg" collapsedWidth="0">
            <TaskList remove={this.handleRemoveTask} id={this.state.id} tasklist={this.state.tasklist} />
            <AddTask />
          </Sider>
          <Layout>
            {title}
            <Content className="content">
              <TodoList todolist={this.state.todolist} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;