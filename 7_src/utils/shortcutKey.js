import store from '@/store'

const ctrlKey = 17, 
    cKey = 67, // 复制
    dKey = 68, // 删除
    deleteKey = 46 // 删除

// 与组件状态无关的操作

// 组件锁定状态下可以执行的操作

// 组件未锁定状态下可以执行的操作
const keyMap = {
    [cKey]: copy,
    [dKey]: deleteComponent,
    [deleteKey]: deleteComponent,
}

let isCtrlDown = false
// 全局监听按键操作并执行相应命令
export function listenGlobalKeyDown() {
    window.onkeydown = (e) => {
        const { curComponent } = store.state
        if (e.keyCode == ctrlKey) {
            isCtrlDown = true
        } else if (e.keyCode == deleteKey && curComponent) {
            store.commit('deleteComponent')
            store.commit('recordSnapshot')
        } else if (isCtrlDown) {
            e.preventDefault()
            keyMap[e.keyCode] && keyMap[e.keyCode]()
        }
    }

    window.onkeyup = (e) => {
        if (e.keyCode == ctrlKey) {
            isCtrlDown = false
        }
    }
}

function copy() {
    store.commit('copy')
}


function deleteComponent() {
    if (store.state.curComponent) {
        store.commit('deleteComponent')
        store.commit('recordSnapshot')
    }
}



