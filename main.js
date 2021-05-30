const { app, BrowserWindow } = require('electron')
const { Notification } = require('electron')

const NOTIFICATION_TITLE = 'Уведомление'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow).then(showNotification)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

