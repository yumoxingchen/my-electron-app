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

}
// 当app准备好的时候创建窗口
app.whenReady().then(()=>{
    createWindow()
})
// 当所有的窗口都关闭以后退出
app.on("window-all-closed",()=>{
    app.quit()
})