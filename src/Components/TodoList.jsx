import React from 'react';

import { Checkbox, Empty, Popconfirm, Button, Input } from 'antd';
import '../assets/css/todoList.css';

import { DeleteOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { uuid } from '../utils/uuid';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todoInputValue: '',
            showInput: false,
        }

        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleItemInput = this.handleItemInput.bind(this)
        this.handleAddTodo = this.handleAddTodo.bind(this)
    }

    handleUpdate(e) {
        let index = e.target['data-index'];
        let todo = this.props.todolist[index];
        this.props.update({
            ...todo,
            status: !todo.status
        })
    }

    handleItemInput(e) {
        this.setState({
            todoInputValue: e.currentTarget.value
        })
    }

    handleAddTodo() {
        this.props.add({
            title: this.state.todoInputValue,
            startTime: new Date().getTime(),
            id: uuid(),
            status: false,
        })
        this.setState({
            todoInputValue: '',
            showInput: false,
        })
    }
    // 提交input

    render() {
        const todolist = this.props.todolist.map((item, index) =>
            <TodoItem
                key={item.id}
                todo={item}
                index={index}
                update={this.handleUpdate}
                remove={this.props.remove} />
        )
        let addButton;
        if (this.props.index !== -1) {
            addButton = (
                <Button
                    type="dashed"
                    style={{ width: '100%', borderRadius: '8px' }}
                    onClick={() => this.setState({showInput: true})}
                >
                    <PlusOutlined /> 添加代办清单
                </Button>)
        }
        let todoInput;
        if (this.state.showInput) {
            todoInput = <TodoAddItem
                value={this.state.todoInputValue}
                add={this.handleAddTodo}
                onInput={this.handleItemInput}
            />
        }
        let empty;
        if (this.props.todolist.length === 0) {
            empty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="还没有代办清单喔，快去添加一个吧" />
        }
        return (
            <div className="todo">
                <div className="list">
                    {todolist}
                    {todoInput}
                    {addButton}
                </div>
                {empty}
            </div>
        )
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemoveTodo = this.handleRemoveTodo.bind(this)
    }

    handleRemoveTodo(e) {
        console.log("e: ", e)
    }

    render() {
        return (
            <div className="todoItem">
                <Checkbox 
                checked={this.props.todo.status} 
                data-index={this.props.index} 
                onChange={this.props.update} 
                className={'todoCheck ' + (this.props.todo.status ? 'done' : '')}>
                    {this.props.todo.title}
                </Checkbox>
                <div className="deleteBtn">
                    <Popconfirm
                        title="确定要删除这个代办项？"
                        okText="是"
                        cancelText="否"
                        data-index={this.props.index}
                        onConfirm={this.props.remove}
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </div>
            </div>
        )
    }
}

function TodoAddItem(props) {
    return (
        <div className="todoItem TodoAddItem">
            <Input value={props.value} placeholder="请输入代办清单" onInput={props.onInput}></Input>
            <div className="addBtn" onClick={props.add}><CheckOutlined /></div>
        </div>
    )
}