const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
} 

const src =  "src"
module.exports={
    configureWebpack:config=>{
      config.entry = './'+src+'/main.js'
    },
    chainWebpack: config => {
        // 别名配置
        config.resolve.alias
          .set('@', resolve(src))
          .set('components', resolve('{src}/components'))
    },
} 