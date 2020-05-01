import React from 'react';

import {Checkbox} from 'antd';
import '../assets/css/todoList.css';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="todo">
                <div className="list">
                    <Checkbox >
                        企业VI设计
                    </Checkbox>
                </div>
            </div>
        )
    }
}