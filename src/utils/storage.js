export const setStore = (key, content) => {
    if (!key) return
    if (typeof content != 'string') {
        content = JSON.stringify(content)
    }
    return window.localStorage.setItem(key, content)
}

export const getStore = key => {
    if (!key) return
    return window.localStorage.getItem(key)
}