
import React from 'react';
import '../assets/css/taskList.css';

import { Input, Progress, Popconfirm, Empty, message } from 'antd';

import { DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            searchList: []
        };
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    handleSearchInput(e) {
        let keyword = e.target.value;
        let searchList = this.props.tasklist.filter(item => {
            return item.title.indexOf(keyword) !== -1
        })
        this.setState({
            keyword,
            searchList,
        })
    }

    render() {
        const tasklist = this.props.tasklist.map((item, index) => {
            return (<TaskCard
                index={index}
                remove={this.props.remove}
                select={this.props.select}
                update={this.props.update}
                id={this.props.id}
                task={item}
                key={item.id} />)
        })
        let empty;
        if (this.props.tasklist.length == 0) {
            empty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前还没有任务，赶紧添加一个吧" />
        }
        return (
            <div className="taskList">
                <div className="search">
                    <div className="placeholder"></div>
                    {/* <Input value={this.state.keyword} onInput={this.handleSearchInput} placeholder="输入内容进行搜索" /> */}
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

        this.state = {
            isEdit: false,
            title: '',
        }

        this.handleRemove = this.handleRemove.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleRemove(e) {
        this.props.remove(this.props.task.id)
    }

    handleSelect(e) {
        this.props.select(this.props.task.id)
    }

    handleEdit(e) {
        this.setState({
            title: e.currentTarget.value,
        })
    }

    handleUpdate(e) {
        if (this.state.title === '') {
            message.warning("任务名称不能为空！")
            return
        }
        let task = this.props.task;
        this.props.update(task.id, {
            ...task,
            title: this.state.title,
        })
        this.setState({
            title: '',
            isEdit: false,
        })

    }

    render() {
        let className = this.props.task.id === this.props.id ? 'taskCard on' : 'taskCard'
        return (
            <div className={className}>
                <div className="taskContent">
                    <Popconfirm
                        title="确定要删除这个任务？"
                        okText="是"
                        cancelText="否"
                        onConfirm={this.handleRemove}
                    >
                        <div className="deleteBtn">
                            <DeleteOutlined />
                        </div>
                    </Popconfirm>
                    <div className="taskName"
                        onClick={this.handleSelect}>
                        {this.props.task.title}
                    </div>
                    <div className="editTask" onClick={() => this.setState({ isEdit: true })}>
                        <EditOutlined />
                    </div>
                </div>
                <Progress percent={parseInt(this.props.task.progress * 100 / this.props.task.todolist.length)}></Progress>

                {this.state.isEdit ? (<div className="taskInput">
                    <Input onInput={this.handleEdit} value={this.state.title} placeholder="请输入任务名称"></Input>
                    <div className="addBtn" onClick={() => this.setState({ isEdit: false })}><CloseOutlined /></div>
                    <div className="addBtn" onClick={this.handleUpdate}><CheckOutlined /></div>
                </div>) : ''}
            </div>
        )
    }
}