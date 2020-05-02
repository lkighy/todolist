import React from 'react';

import { Button, Form, Input, Popconfirm, message } from 'antd';

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import '../assets/css/addTask.css';

import { uuid } from '../utils/uuid';

export default class AddTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            todolist: [],
            visible: false,
        }

        this.handleInputTask = this.handleInputTask.bind(this)
        this.handleTodoAdd = this.handleTodoAdd.bind(this)
        this.handleTodoRemove = this.handleTodoRemove.bind(this)
        this.handleInputTodo = this.handleInputTodo.bind(this)
        this.handleAddTask = this.handleAddTask.bind(this)
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
    

    handleAddTask(e) {
        // 校验为空
        if (this.state.title === '') {
            message.warning('任务名称不能为空！')
            return
        }
        if (this.state.todolist.find(item=> {return item.title === ''}) === -1) {
            message.warning('添加的待办清单不能为空！')
            return
        } 
        this.props.add({
            ...this.state,
            startTime: new Date().getTime(),
            id: uuid(),
            progress: 0,
        })
        this.setState({
            title: '',
            todolist: [],
            visible: false,
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
                    visible={this.state.visible}
                    okText="确定"
                    cancelText="取消"
                    onCancel={() => {this.setState({visible: false})}}
                    onConfirm={this.handleAddTask}
                    icon={null}>
                    <Button className="btn" onClick={()=>this.setState({visible: !this.state.visible})} type="primary" size="large" icon={<PlusOutlined />} />
                </Popconfirm>,
            </div>
        )
    }
}

function AddForm(props) {
    return (
        <Form labelCol={{ span: 8 }} labelAlign="right" name="addTask" style={{ width: '320px' }}>
            <Form.Item label="任务名称" required rules={[{ required: true, message: '任务名称不能为空!' }]}>
                <Input style={{ width: '180px' }} value={props.title} onInput={props.inputTask}></Input>
            </Form.Item>

            {props.todolist.map((todo, index) =>

                <Form.Item key={todo.id} label={'代办清单' + index} required rules={[{ required: true, message: '任务名称不能为空!' }]}>
                    <Input style={{ width: '180px' }} value={todo.title} data-index={index} onInput={props.inputTodo}></Input>
                    <span className="removeBtn" data-index={index} onClick={props.todoRemove}>
                        <MinusCircleOutlined />
                    </span>
                </Form.Item>
            )}
            <Button
                type="dashed"
                onClick={props.addTodo}
                style={{ width: '100%' }}
            >
                <PlusOutlined />
                    添加代办清单
                </Button>
        </Form>
    )

}