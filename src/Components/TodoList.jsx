import React from 'react';

import { Checkbox, Empty, Popconfirm, Button } from 'antd';
import '../assets/css/todoList.css';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const todolist = this.props.todolist.map(item =>
            <TodoItem todo={item} key={item.title} />
        )
        let empty;
        if (this.props.todolist.length == 0) {
            empty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="还没有代办清单喔" />
        }
        return (
            <div className="todo">
                <div className="list">
                    {todolist}
                </div>

                <Button
                    type="dashed"
                    style={{ width: '100%', borderRadius: '8px' }}
                >
                    <PlusOutlined /> 添加代办清单
                </Button>
                {empty}
            </div>
        )
    }
}

function TodoItem(props) {
    return (
        (<div className="todoItem">
            <Checkbox className="todoCheck">
                {props.todo.title}
            </Checkbox>
            <div className="deleteBtn">

                <Popconfirm
                    title="确定要删除这个代办项？"
                    okText="是"
                    cancelText="否"
                >
                    <DeleteOutlined />

                </Popconfirm>
            </div>

        </div>)
    )
}