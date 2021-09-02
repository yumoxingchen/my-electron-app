# Electron学习

## Electron快速入门

### 1、创建项目文件夹并进入

```bash
mkdir my-electron-app
cd my-electron-app
npm init
```

### 2、初始化

```bash
npm init
```

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "frist app!",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron ."
      #实现使用npm start运行
  },
  "author": "ymxc",
  "license": "ISC",
  "devDependencies": {
    "@electron-forge/cli": "^6.0.0-beta.60",
    "electron": "^13.2.3"
  }
}

```

### 3、安装Electron

```bash
npm install --save-dev electron
```

### 4、创建主页面index.html

```html5
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.

</body>
</html>
```

### 5、main.js创建一个窗口并在窗口中打开页面

```js
// 从electron中引入
const {
    app,
    BrowserWindow
} = require('electron')
const path = require('path')

// 创建窗口
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
           	//使用preload.js
            preload:path.join(__dirname,'preload.js')
        }
    })
	//加载页面
    win.loadFile('index.html')

}
// 当app准备好的时候创建窗口
app.whenReady().then(()=>{
    createWindow()
})
// 当所有的窗口都关闭以后退出
app.on("window-all-closed",()=>{
    app.quit()
})
```

### 6、使用proload.js实现一些操作

```js
window.addEventListener("DOMContentLoaded",()=>{
    
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if(element) element.innerText=text
    }

    for(const dependency of ['chrome','node','electron']){
        replaceText(`${dependency}-version`,process.versions[dependency])
    }

})
```

### 7、运行结果

![image-20210831161514807](https://ola.yumoxingchen.cn/%E5%9B%BE%E5%BA%8A/image-20210831161514807.png?hash=y0aqBl4W&download=1)

## 功能实现

### 1、添加通知

在index.html中加入：

```html
<script src="renderer.js"></script>
```

并在根目录中创建renderer.js文件，向其中写入：

```js
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = '123'
const CLICKED_MESSAGE = 'clicked'

new Notification(NOTIFICATION_TITLE,{body:NOTIFICATION_BODY}).onclick(()=>{
    console.log(CLICKED_MESSAGE)
})
```



效果如图：

![image-20210902132923076](https://ola.yumoxingchen.cn/%E5%9B%BE%E5%BA%8A/image-20210902132923076.png?hash=y0aqBl4W&download=1)

### 2、任务栏图标进度条

在createWindow中写入：

```js
    const addCount = 0.03
    const delay = 100 //ms

    let c = 0

    prograssInterval = setInterval(()=>{
        win.setProgressBar(c)

        if(c<1) c+=addCount
        else c=0
    },delay)
```

在关闭前清除计时器：

```js
app.on("before-quit",()=>{
    clearInterval(prograssInterval)
})
```

### 3、任务栏图标右键菜单

```js
app.setUserTasks([{
    program:process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
}])
```

取消时：

```js
app.serUserTasks([])
```

![image-20210902135337839](https://ola.yumoxingchen.cn/%E5%9B%BE%E5%BA%8A/image-20210902135337839.png?hash=y0aqBl4W&download=1)

