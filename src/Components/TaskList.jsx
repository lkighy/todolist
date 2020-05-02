
import React from 'react';
import '../assets/css/taskList.css';

import { Input, Progress, Popconfirm } from 'antd';

import { DeleteOutlined, RightOutlined } from '@ant-design/icons';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        };
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    handleSearchInput(e) {
        this.setState({
            keyword: e.target.value,
        })
    }

    render() {
        const tasklist = this.props.tasklist.map(item =>
            <TaskCard task={item} key={item.id} />
        )
        return (
            <div className="taskList">
                <div className="search">
                    <Input value={this.state.keyword} onInput={this.handleSearchInput} placeholder="输入内容进行搜索" />
                </div>
                <div className="list">
                    {tasklist}
                    <div className="taskCard on">
                        {/* 删除图标，还有什么呢 */}
                        <div className="taskContent">
                            <div className="deleteBtn">
                                <Popconfirm
                                    title="确定要删除这个任务？"
                                    okText="是"
                                    cancelText="否"
                                >
                                    <DeleteOutlined />
                                </Popconfirm>
                            </div>
                            <div className="taskName">
                                任务名称
                            </div>
                            <div>
                                <RightOutlined />
                            </div>
                        </div>
                        <Progress></Progress>
                    </div>
                </div>
            </div>
        )
    }
}

function TaskCard(props) {
    return (
        <div className="taskCard">
            {/* 删除图标，还有什么呢 */}
            <div className="taskContent">
                <div className="deleteBtn">
                    <Popconfirm
                        title="确定要删除这个任务？"
                        okText="是"
                        cancelText="否"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </div>
                <div className="taskName">
                    {props.task.title}
                </div>
                <div>
                    <RightOutlined />
                </div>
            </div>
            <Progress percent={props.task.progress * 100 / props.task.todolist.length}></Progress>
        </div>
    )
}