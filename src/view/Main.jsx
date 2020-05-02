import React, { Component } from 'react';
import './App.css';
import './assets/css/main.css';

import { Layout, Affix, Button } from 'antd';

import TaskList from './Components/TaskList';
import TodoList from './Components/TodoList';


import { PlusSquareOutlined } from '@ant-design/icons';

import { state } from './state';

const { Header, Content, Sider } = Layout;

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...state,
      title: '',
      time: '',
      id: '',
      todolist: [{
        title: "todo",
        startTime: 1588380444250,
        status: true
      }, {
        title: "代办的事",
        startTime: 1588380444250,
        status: true
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
      <Layout>
        <Sider className="sider" width="300px" theme="light" breakpoint="lg" collapsedWidth="0">
          <TaskList tasklist={this.state.tasklist} />
          <Affix>
            <Button type="primary" size="large" icon={<PlusSquareOutlined />} />
          </Affix>
        </Sider>
        <Layout>
          {title}
          <Content className="content">
            <TodoList todolist={this.state.todolist} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}