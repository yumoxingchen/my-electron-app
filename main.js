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
            preload:path.join(__dirname,'preload.js')
        }
    })

    win.loadFile('index.html')

    const addCount = 0.03
    const delay = 100 //ms

    let c = 0

    prograssInterval = setInterval(()=>{
        win.setProgressBar(c)

        if(c<1) c+=addCount
        else c=0
    },delay)

}



// 当app准备好的时候创建窗口
app.whenReady().then(()=>{
    createWindow()
})

//退出前清除定时器
app.on("before-quit",()=>{
    clearInterval(prograssInterval)
})
// 当所有的窗口都关闭以后退出
app.on("window-all-closed",()=>{
    app.quit()
})

//设置任务栏右键菜单
app.setUserTasks([{
    program:process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
}])