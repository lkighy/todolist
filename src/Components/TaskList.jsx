
import React from 'react';
import '../assets/css/taskList.css';

import { Input, Progress, Popconfirm, Empty } from 'antd';

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

    // this.props.add()
    // this.props.update()
    // this.props.select()

    render() {
        const tasklist = this.props.tasklist.map((item, index)=>
            <TaskCard onClick={this.props.select(index)} remove={this.props.remove} id={this.props.id} task={item} key={item.id} />
        )
        let empty;
        if (this.props.tasklist.length == 0) {
            empty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前还没有任务，赶紧添加一个吧" />
        }
        return (
            <div className="taskList">
                <div className="search">
                    <Input value={this.state.keyword} onInput={this.handleSearchInput} placeholder="输入内容进行搜索" />
                </div>
                <div className="list">
                    {tasklist}
                    {empty}
                </div>
            </div>
        )
    }
}

function TaskCard(props) {
    return (
        <div className="taskCard">
            <div className={"taskContent " + (props.task.id == props.id ? 'on' : '')}>
                <div className="deleteBtn">
                    <Popconfirm
                        title="确定要删除这个任务？"
                        okText="是"
                        cancelText="否"
                        onConfirm={props.remove(this.props.index)}
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