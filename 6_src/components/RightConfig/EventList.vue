<template>
    <div class="event-list">
        <div class="div-events">
                <el-button @click="isShowEvent = true">添加/编辑事件</el-button>
                <div>
                    <el-tag v-for="event in Object.keys(curComponent.events)"
                        :key="event"
                        closable
                        @close="removeEvent()"
                    >
                        {{ event }}
                    </el-tag>
                </div>
        </div>

        <!-- 选择事件 -->
        <Modal v-model="isShowEvent">
            <el-tabs v-model="eventActiveName" tabPosition="left">
                <el-tab-pane
                    v-for="item in eventList"
                    :key="item.key"
                    :label="item.label"
                    :name="item.key"
                    style="padding: 0 20px;"
                >
                    {{item.params}}
                    <el-form>
                        <el-form-item v-for="(obj, index) in item.params" :key="index" :label="obj.label">
                            <template v-if="obj.component=='el-select'">
                                <el-select  v-model="obj.value">
                                    <el-option
                                        :key="item.value"
                                        v-for="item in obj.option"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </template>
                            <template v-else>
                                <component
                                    v-model="obj.value"
                                    :is="obj.component"
                                    :type="obj.type"
                                />
                            </template>
                        </el-form-item>
                    </el-form>
                    <el-button style="margin-top: 20px;" @click="addEvent(item.key, item.params)">确定</el-button>
                </el-tab-pane>
            </el-tabs>
        </Modal>
    </div>
</template>

<script>
import {mapState,mapActions } from 'pinia'
import component from '@/store/component'
import Modal from '@/components/Modal'
import { eventList } from '@/utils/events'

export default {
    components: { Modal },
    data() {
        return {
            isShowEvent: false,
            eventURL: '',
            eventActiveName: 'redirect',
            eventList,
        }
    },
    computed: {
        ...mapState(component,['curComponent'])
    },
    methods: {
        ...mapActions(component,["addEvents","removeEvents"]),
        addEvent(event, param) {
            const params = {}
            Object.keys(param).forEach(element => {
                params[element] = param[element].value
            });
            console.log(params);
            this.isShowEvent = false
            const key_id = "#"+this.curComponent.id
            this.addEvents(event,{key_id:key_id,param:params})
            console.log(this.curComponent);
        },

        removeEvent() {
            this.removeEvents()
        },
    },
}
</script>

<style lang="scss" scoped>
.event-list {
    .div-events {
        text-align: center;
        padding: 0 20px;

        .el-button {
            display: inline-block;
            margin-bottom: 10px;
        }

        .el-tag {
            display: block;
            width: 50%;
            margin: auto;
            margin-bottom: 10px;
        }
    }
}
</style>
