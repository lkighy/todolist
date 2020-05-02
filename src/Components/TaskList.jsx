
import React from 'react';
import '../assets/css/taskList.css';

import { Input, Progress, Popconfirm, Empty } from 'antd';

import { DeleteOutlined, RightOutlined } from '@ant-design/icons';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            searchList: [],
        };
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    handleSearchInput(e) {
        this.setState({
            keyword: e.target.value,
        })
    }

    render() {
        const tasklist = this.props.tasklist.map((item, index) =>
            <TaskCard
                index={index}
                remove={this.props.remove}
                select={this.props.select}
                id={this.props.id}
                task={item}
                key={item.id} />
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

class TaskCard extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleRemove(e) {
        this.props.remove(this.props.task.id)
    }

    handleSelect(e) {
        this.props.select(this.props.task.id)
    }

    render() {
        return (
            <div className="taskCard">
                <div className={"taskContent " + (this.props.task.id == this.props.id ? 'on' : '')}>
                    <Popconfirm
                        title="确定要删除这个任务？"
                        okText="是"
                        cancelText="否"
                        onConfirm={this.props.remove}
                    >
                        <div className="deleteBtn">
                            <DeleteOutlined />
                        </div>
                    </Popconfirm>
                    <div className="taskName"
                        onClick={this.handleSelect}>
                        {this.props.task.title}
                    </div>
                    <div>
                        <RightOutlined />
                    </div>
                </div>
                <Progress percent={parseInt(this.props.task.progress * 100 / this.props.task.todolist.length)}></Progress>
            </div>
        )
    }
}