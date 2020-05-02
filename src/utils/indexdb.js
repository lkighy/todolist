const DB_NAME = "todoList";
const todoTop = "todoTop";
const todoList = "todoList";
const todoEnd = "todoEnd";
const version = "1";

// indexeddb 模式
// 只读 readonly 
// 读写 readwrite
// 

let DBparamet = {
    dbName: "",
    version: "",
    // storeNames // 暂时不指定这个参数 , 暂且使用 dbName 代替该参数
    keyPath: {
        keyPath: '', // 键路径
        autoIncrement: true // 自动增长
    }, // 键路径， {keyPath:  }
    indexList: [{ // 索引列表
        indexName: '', // 缩影名称
        keyPath: '', // 键路径
        objectParameters: { // 可选参数
            unique: true, // 是否唯一
            // 多个条目， 为 ture 时，将在为每个数组元素添加一个条目。
            // 为false 则将数组视为单个条目
            multiEntry: true, 
            // 仅仅适用 Firefox(43+)为您的索引制定语言环境
            // 通过键范围对数据执行任何排序操作都将服从改语言环境的排序规则
            // string类型: 例如 'en-US'
            // auto: 使用平台默认语言环境
            // null 或 undefined: 未指定语言环境，则使用常规的 JavaScript排序，不支持语言环境
            locale: ''
        },
    }],
}

function hanleError(request) {
    request.onerror = e => {
        throw e.target.errorCode
    }
    return request
}

class DB {
    // dbName, 打开数据库的名称
    // version 版本
    // keyPath 键值
    // indexList 索引列表, array 格式 [{indexName, keyPath, {objectParameters}}]
    constructor(dbName, version, keyPath, indexList) {
        // 绑定 this
        this.add = this.add.bind(this)
        this.update = this.update.bind(this)
        this.select = this.select.bind(this)
        this.selectAll = this.selectAll.bind(this)
        this.indexSelect = this.indexSelect.bind(this)
        this.delete = this.delete.bind(this)

        this.dbName = dbName; // 需要校验
        this.version = version; // 需要判断为数字

        let request = window.indexedDB.open(dbName, version);

        // 添加失败处理函数
        request.onerror = e => {
            // 将错误抛出
            throw e.target.errorCode;
        }
        // 添加成功处理函数
        request.onsuccess = e => {
            this.db = e.target.result;
        }
        // 数据库创建或版本更新
        request.onupgradeneeded = e => {
            this.db = e.target.result;
            // 如果数据库不存在, 则新建数据库
            if (!this.db.objectStoreNames.contains(dbName)) {
                let objectStore = this.db.createObjectStore(dbName, keyPath)
                // 创建索引
                if (indexList) {
                    indexList.forEach(item => {
                        objectStore.createIndex(item.indexName, item.keyPath, item.objectParameters)
                    })
                }
            }
        }
        this.request = request;

    }
    // 添加数据 一条
    add(data) {
        let request = this.db.transaction([this.dbName], "readwrite").transaction.objectStore(this.dbName).add(data)
        return hanleError(request)
    }

    // 更新数据
    update(data) {
        let request = this.db.transaction([this.dbName], "readwrite").transaction.objectStore(this.dbName).put(data);
        return hanleError(request)
    }
    // 
    select(query) {
        let request = this.db.transaction([this.dbName], "readwrite").transaction.objectStore(this.dbName).get(query);
        return hanleError(request)
    }

    selectAll(query) {
        if (query) {
            let request = this.db.transaction([this.dbName], "readwrite").transaction.objectStore(this.dbName).getAll(query);
            return hanleError(request)

        } else {
            let request = this.db.transaction([this.dbName], "readwrite").transaction.objectStore(this.dbName).getAll();
            return hanleError(request)
        }
    }
    
    indexSelect(name, query) {
        let request = this.db.transaction([this.dbName], "readwrite").transaction.objectStore(this.dbName).index(name).get(query)
        return hanleError(request)
    }

    delete(query) {
        let request = this.db.transaction([this.dbName], "readwrite").transaction.objectStore(this.dbName).delete(query)
        return hanleError(request)
    }
}