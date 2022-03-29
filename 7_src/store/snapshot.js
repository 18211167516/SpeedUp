import component from './component'
import { defineStore } from 'pinia'
import {deepCopy} from '@/utils/utils'

export default defineStore({
    id:"snapshot",
    state: ()=>{
        return {
            snapshotData: [], // 编辑器快照数据
            snapshotIndex: -1, // 快照索引
        }
    },
    actions: {
        //撤销
        undo() {
            if (this.snapshotIndex >= 0) {
                this.snapshotIndex--
                const componentData = deepCopy(this.snapshotData[this.snapshotIndex]) || []
                const compnt = component()
                if (compnt.curComponent) {
                    // 如果当前组件不在 componentData 中，则置空
                    const needClean = !componentData.find(component => compnt.curComponent.id === component.id)

                    if (needClean) {
                        compnt.setCurComponent({
                            component: null,
                            index: null,
                        })
                    }
                }
                //设置这个componentData
                compnt.setComponentData(componentData)
            }
        },
        //回滚
        redo() {
            if (this.snapshotIndex < this.snapshotData.length - 1) {
                this.snapshotIndex++
                const compnt = component()
                compnt.setComponentData(deepCopy(this.snapshotData[this.snapshotIndex]))
            }
        },
        //添加快照
        recordSnapshot() {
            const compnt = component()
            // 添加新的快照
            this.snapshotData[++this.snapshotIndex] = deepCopy(compnt.componentData)
            // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
            if (this.snapshotIndex < this.snapshotData.length - 1) {
                this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1)
            }
        },
    },
})
