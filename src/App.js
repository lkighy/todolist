import React, { Component } from 'react';
import './App.css';
import './assets/css/main.css';

import { Layout } from 'antd';

import TaskList from './Components/TaskList';
import TodoList from './Components/TodoList';

const { Header, Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Sider className="sider" width="300px" theme="light" breakpoint="lg" collapsedWidth="0">
            {/* 传入参数到 taskList 中，这代表着监控好吗 */}
            {/* 那么的话，现在要做的就是，1.将列表传入进去 */}
            {/* 2. 点击选择的方法，*/}
            {/* 3. 确定传入的类型的格式， */}
            {/* [{id: 1234506, title: 标题名称， child: [] / 完成数量，以及总数量}] */}
            <TaskList />
          </Sider>
          <Layout>
            <Header className="header">
              <div className="title">标题选得好，绅士少不了</div>
              <div className="time">2020/12/12</div>
            </Header>
            <Content className="content">
              <TodoList />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;