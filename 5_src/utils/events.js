import {$} from './utils'

// 编辑器自定义事件
const events = {
    redirect(key_id,{url,name,timeout}) {
        if (url) {
            console.log(url,name,timeout)
            //window.location.href = url
        }
    },

    alert(key_id,{msg,timeout}) {
        if (msg) {
            if (timeout!="") {
                setTimeout(() => {
                    console.log("延迟",msg)
                }, timeout);
            }
            else{
                console.log("无延迟",msg)
            }
            $(key_id).innerText=msg
        }

    }
}

const mixins = {
    methods: events,
}

const eventList = [
    {
        key: 'redirect',
        label: '跳转事件',
        event: events.redirect,
        params: {
            name:{
                label:"名称",
                component:"el-select",
                value:"",
                option:[
                    {
                        "label": "左对齐",
                        "value": "left"
                    },
                    {
                        "label": "居中",
                        "value": "center"
                    },
                ]
            },
            url:{
                label:"链接",
                component:"el-input",
                value:"",
            },
            timeout:{
                label:"延迟(s)",
                component:"el-input",
                value:"",
                type:"number"
            },
        },
    },
    {
        key: 'alert',
        label: 'alert 事件',
        event: events.alert,
        params: {
            msg:{
                label:"信息",
                component:"el-input",
                value:"",
            },
            timeout:{
                label:"延迟",
                component:"el-input",
                value:"",
                type:"number"
            },
        },
    },
]

export {
    mixins,
    events,
    eventList,
}