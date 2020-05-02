import React from 'react';

import { Button, Form, Input, Popconfirm } from 'antd';

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import '../assets/css/addTask.css';

import { uuid } from '../utils/uuid';
import FormItemLabel from 'antd/lib/form/FormItemLabel';
import TodoList from './TodoList';

export default class AddTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            id: uuid(),
            startTime: new Date().getTime(),
            progress: 0,
            todolist: [],
        }

        this.handleInputTask = this.handleInputTask.bind(this)
        this.handleTodoAdd = this.handleTodoAdd.bind(this)
        this.handleTodoRemove = this.handleTodoRemove.bind(this)
        this.handleInputTodo = this.handleInputTodo.bind(this)
    }

    handleInputTask(e) {
        this.setState({
            title: e.currentTarget.value,
        })
    }

    handleInputTodo(e) {
        let value = e.currentTarget.value;
        let index = e.currentTarget.dataset.index;
        let todolist = this.state.todolist;
        todolist[index].title = value;
        this.setState({
            todolist
        })
        console.log("查看执行2")
    }

    handleTodoAdd() {
        this.setState({
            todolist: [...this.state.todolist, {
                title: '',
                startTime: new Date().getTime(),
                id: uuid(),
                status: false,
            }]
        })
    }

    handleTodoRemove(e) {
        let todolist = this.state.todolist;
        todolist.splice(e.currentTarget.dataset.index, 1)
        this.setState({
            todolist
        })
    }

    render() {
        return (
            <div className="AddTask">
                <Popconfirm
                    title={<AddForm
                        todolist={this.state.todolist}
                        title={this.state.title}
                        addTodo={this.handleTodoAdd}
                        inputTask={this.handleInputTask}
                        todoRemove={this.handleTodoRemove}
                        inputTodo={this.handleInputTodo}
                    />}
                    okText="确定"
                    cancelText="取消"
                    icon={null}>
                    <Button className="btn" type="primary" size="large" icon={<PlusOutlined />} />
                </Popconfirm>,
            </div>
        )
    }
}

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            id: uuid(),
            startTime: new Date().getTime(),
            progress: 0,
            todolist: [],
        }

        this.handleInputTask = this.handleInputTask.bind(this)
        this.handleTodoAdd = this.handleTodoAdd.bind(this)
        this.handleTodoRemove = this.handleTodoRemove.bind(this)
    }

    handleInputTask(e) {
        this.setState({
            title: e.currentTarget.value,
        })
    }
    handleTodoAdd() {
        this.setState({
            todolist: [...this.state.todolist, {
                title: '',
                startTime: new Date().getTime(),
                id: uuid(),
                status: false,
            }],
            progress: this.state.progress + 1
        })
    }
    handleTodoRemove(e) {
        let todolist = this.state.todolist;
        todolist.splice(e.currentTarget.dataset.index, 1)
        this.setState({
            todolist
        })
    }

    render() {
        return (
            <Form labelCol={{ span: 8 }} labelAlign="right" name="addTask" style={{ width: '320px' }}>
                <Form.Item label="任务名称">
                    <Input style={{ width: '180px' }} value={this.props.title} onInput={this.props.inputTask}></Input>
                </Form.Item>

                {this.props.todolist.map((todo, index) =>

                    <Form.Item key={todo.id} label={'代办清单' + index}>
                        <Input style={{ width: '180px' }} value={todo.title} data-index={index} onInput={this.props.inputTodo}></Input>
                        <span className="removeBtn" data-index={index} onClick={this.props.todoRemove}>
                            <MinusCircleOutlined />
                        </span>
                    </Form.Item>
                )}
                <Button
                    type="dashed"
                    onClick={this.props.addTodo}
                    style={{ width: '100%' }}
                >
                    <PlusOutlined /> 添加代办清单
                </Button>
            </Form>
        )

    }
}