// import React from 'react';

import { getStore, TASK_KEY } from './utils/storage';

let tasklist = JSON.parse(getStore(TASK_KEY));
// 测试数据
// let tasklist = [
//     {
//         title: "这是主题",
//         id: "40b08bd4-cad2-477c-b955-5b8cb214f194",
//         startTime: 1588380444250,
//         progress: 0,
//         todolist: [
//             {
//                 "title": "todo",
//                 "startTime": 1588380444250,
//                  id: "40b08bd4-cad2-477c-b955-5b8cb214f194"
//                 "status": true
//             }
//         ]
//     }
// ]

let state = {
    tasklist: tasklist ? tasklist : [],
}


export { state };