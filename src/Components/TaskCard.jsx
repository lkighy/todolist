import React from 'react';

import { Progress } from 'antd';
import '../assets/css/todoList.css';

export default class TaskCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>标题选得好，绅士少不了</div>
                <Progress></Progress>
            </div>
        )
    }
}