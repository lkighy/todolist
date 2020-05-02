import React, { Component } from 'react';
import './App.css';
import './assets/css/main.css';

import { Layout } from 'antd';

import AddTask from './Components/AddTask';

import TaskList from './Components/TaskList';
import TodoList from './Components/TodoList';



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
      todolist: [{
        title: "todo",
        id: "40b08bd4-caa2-427c-b453-5b8cb2142f194",
        startTime: 1588380444250,
        status: true
      }, {
        title: "代办的事",
        id: "40b08bd4-cad2-427c-b455-5b8cb2142f194",
        startTime: 1588380444250,
        status: true
      },
      {
        title: "这是主题",
        id: "40b08bd4-cad2-477c-b955-5b8cb2142f194",
        startTime: 1588380444250,
        progress: 0
      }],
    };
  }

  // 实现增删改查
  handSetTasklist(type, task) {

  }

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
            <TaskList tasklist={this.state.tasklist} />
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