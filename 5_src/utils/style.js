import { sin, cos } from '@/utils/translate'

export const styleData = [ 
    {
        "key":"left",
        "label":"x 坐标",
        "component":"el-input",
        "type":"number"
    },
    {
        "key":"top",
        "label":"y 坐标",
        "component":"el-input",
        "type":"number"
    },
    {
        "key":"width",
        "label":"宽",
        "component":"el-input",
        "type":"number"
    },
    {
        "key":"height",
        "label":"高",
        "component":"el-input",
        "type":"number"
    },
    {
        "key":"color",
        "component":"el-color-picker",
        "label":"字体颜色",
        "type":"number"
    },
    {
        "key":"fontSize",
        "component":"el-input",
        "label":"字体大小",
        "type":"number"
    },
    {
        "key":"fontWeight",
        "component":"el-input",
        "label":"字体粗细",
        "type":"number"
    },
    {
        "key":"lineHeight",
        "component":"el-input",
        "label":"行高",
        "type":"number"
    },
    {
        "key":"letterSpacing",
        "component":"el-input",
        "label":"字间距",
        "type":"number"
    },
    {
        "key":"opacity",
        "component":"el-input",
        "label":"透明度",
        "type":"number"
    },
    { 
        "key": "borderWidth", 
        "component":"el-input",
        "label": "边框宽度" 
    },
    { 
        "key": "borderStyle", 
        "component":"el-select",
        "label": "边框风格",
        "option":[
            {
                "label": "实线",
                "value": "solid"
            },
            {
                "label": "虚线",
                "value": "dashed"
            }
        ]
    },
    { 
        "key": "borderColor",
        "component":"el-color-picker",
        "label": "边框颜色" 
    },
    { 
        "key": "borderRadius",
        "component":"el-input",
        "label": "边框半径"
    },
    {
        "key":"textAlign",
        "component":"el-select",
        "label":"左右对齐",
        "option":[
            {
                "label": "左对齐",
                "value": "left"
            },
            {
                "label": "居中",
                "value": "center"
            },
            {
                "label": "右对齐",
                "value": "right"
            }
        ]
    },
    { 
        "key": "verticalAlign", 
        "component":"el-select",
        "label": "上下对齐",
        "option":[
            {
                "label": "上对齐",
                "value": "top"
            },
            {
                "label": "居中对齐",
                "value": "middle"
            },
            {
                "label": "下对齐",
                "value": "bottom"
            }
        ]
    },
    {
        "key":"propValue",
        "component":"el-input",
        "label":"内容",
        "type":"textarea"
    }
]

export function getStyle(style, filter = []) {
    const needUnit = [
        'fontSize',
        'width',
        'height',
        'top',
        'left',
        'borderWidth',
        'letterSpacing',
        'borderRadius',
    ]

    const result = {}
    Object.keys(style).forEach(key => {
        if (!filter.includes(key)) {
            if (key != 'rotate') {
                result[key] = style[key]

                if (needUnit.includes(key)) {
                    result[key] += 'px'
                }
            } else {
                result.transform = key + '(' + style[key] + 'deg)'
            }
        }
    })

    return result
}

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style) {
    style = { ...style }
    if (style.rotate != 0) {
        const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate)
        const diffX = (style.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
        style.left += diffX
        style.right = style.left + newWidth

        const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate)
        const diffY = (newHeight - style.height) / 2 // 始终是正
        style.top -= diffY
        style.bottom = style.top + newHeight

        style.width = newWidth
        style.height = newHeight
    } else {
        style.bottom = style.top + style.height
        style.right = style.left + style.width
    }

    return style
}
