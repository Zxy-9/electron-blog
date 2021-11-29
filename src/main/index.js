import { app, BrowserWindow } from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
const menuTemplate = [{
  label: '主页',
  click() {
    mainWindow.webContents.send('href', '/index');
  }
},
{
	label:'file对象',
	click() {
	  mainWindow.webContents.send('href', '/file');
	}
},
{
  label: '窗口打开/代理',
  submenu: [
    {
      label: 'window.open',
      click() {
        mainWindow.webContents.send('href', '/page1');
      }
    },
    {
      label: 'BrowserWindowProxy',
      click() {
        mainWindow.webContents.send('href', '/page2');
      }
    }
  ]
}
];
 
var Menu = require('electron').Menu;
Menu.setApplicationMenu( Menu.buildFromTemplate(menuTemplate));
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
