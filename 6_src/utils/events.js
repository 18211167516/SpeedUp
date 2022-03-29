import {$} from './utils'

// 编辑器自定义事件
const events = {
    redirect(key_id,{url,timeout}) {
        if (url) {
            console.log(url,timeout)
        }
    },
    showLogin(){
        this.$parent.showLoginForm()
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
            console.log($(key_id));
            //$(key_id).innerText=msg
        }

    }
}

const mixins = {
    methods: events,
}

const eventList = [
    {
        key: 'showLogin',
        label: '调起登录事件',
        event: events.showLogin,
        params: {},
    },
    {
        key: 'redirect',
        label: '跳转事件',
        event: events.redirect,
        params: {
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
                label:"延迟(ms)",
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