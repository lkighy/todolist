
import React from 'react';
import '../assets/css/taskList.css';

import { Input, Progress, Space } from 'antd';

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
        return (
            <div className="taskList">
                <div className="search">
                    <Input value={this.state.keyword} onInput={this.handleSearchInput} placeholder="输入内容进行搜索" />
                </div>
                <div className="list"> 
                    <div className="taskCard">
                        {/* 关闭图标，还有什么呢 */}
                        <div>标题选得好，绅士少不了</div>
                        <Progress></Progress>
                    </div>
                    <div className="taskCard">
                        <div>标题选得好，绅士少不了</div>
                        <Progress></Progress>
                    </div>
                </div>
            </div>
        )
    }
}