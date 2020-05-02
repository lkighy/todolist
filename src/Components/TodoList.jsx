import React from 'react';

import { Checkbox, Empty, Popconfirm, Button, Input, message } from 'antd';
import '../assets/css/todoList.css';

import { DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
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
        if (this.state.todoInputValue === '') {
            message.warning("待办清单名称不能为空！")
            return
        }
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
                update={this.props.update}
                remove={this.props.remove} />
        )
        let addButton;
        if (this.props.index !== -1) {
            addButton = (
                <Button
                    type="dashed"
                    style={{ width: '100%', borderRadius: '8px' }}
                    onClick={() => this.setState({ showInput: true })}
                >
                    <PlusOutlined /> 添加代办清单
                </Button>)
        }
        let todoInput;
        if (this.state.showInput) {
            todoInput = <TodoAddItem
                value={this.state.todoInputValue}
                add={this.handleAddTodo}
                close={() => { this.setState({ showInput: false }) }}
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
        super(props)

        this.state = {
            isEdit: false,
            title: props.todo.title,
        }
        this.handleEditInpput = this.handleEditInpput.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleEditInpput(e) {
        this.setState({
            title: e.currentTarget.value
        })
    }
    handleUpdate(e) {
        console.log("e: ", typeof e.target)
        let todo = this.props.todo;
        if (typeof e.target.checked === 'boolean') {
            this.props.update({
                ...todo,
                status: e.target.checked
            })
        } else {
            if (this.state.title === '') {
                message.warning('待办清单名称不能为空!')
                return
            }
            this.props.update({
                ...todo,
                title: this.state.title,
            })
            this.setState({
                isEdit: false,
            })
        }
        // let todo = this.props.todo;
        // this.props.update({
        //     ...todo,
        //     status: !todo.status
        // })
    }
    render() {
        if (this.state.isEdit) {
            return (
                <div className="todoItem">
                    <Input
                        onInput={this.handleEditInpput}
                        value={this.state.title}
                        className="todoInput"
                        placeholder="请输入待办清单名称"
                    ></Input>
                    <div className="deleteBtn" onClick={this.handleUpdate}>
                        <CheckOutlined />
                    </div>
                    <div className="editBtn" onClick={() => this.setState({ isEdit: false })}>
                        <MinusCircleOutlined />
                    </div>

                </div>
            )
        } else {
            return (
                <div className="todoItem">
                    <Checkbox
                        checked={this.props.todo.status}
                        data-index={this.props.index}
                        onChange={this.handleUpdate}
                        className={'todoCheck ' + (this.props.todo.status ? 'done' : '')}>
                        {this.props.todo.title}
                    </Checkbox>

                    <div className="editBtn" onClick={() => this.setState({ isEdit: true })}>
                        <EditOutlined />
                    </div>

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
}

function TodoAddItem(props) {
    return (
        <div className="todoItem TodoAddItem">
            <Input value={props.value} placeholder="请输入代办清单" onInput={props.onInput}></Input>
            <div className="addBtn" onClick={props.close}><CloseOutlined /></div>
            <div className="addBtn" onClick={props.add}><CheckOutlined /></div>
        </div>
    )
}