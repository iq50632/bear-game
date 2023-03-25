'use strict'

import { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } from 'electron'
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

function createTray (win) {
  const iconPath = require('../renderer/assets/icon.png')
  const tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    // {
    //   label: '貓咪 4',
    //   click: () => {
    //     win.show()
    //     win.webContents.send('switch-cat', 4)
    //   }
    // },
    // {
    //   label: '貓咪 5',
    //   click: () => {
    //     win.show()
    //     win.webContents.send('switch-cat', 5)
    //   }
    // },
    // {
    //   label: '貓咪 6',
    //   click: () => {
    //     win.show()
    //     win.webContents.send('switch-cat', 6)
    //   }
    // },
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    {
      label: '縮小',
      click: () => win.hide() // 隱藏 桌面貓咪
    },
    {
      label: '結束',
      click: () => {
        app.isQuiting = true
        app.quit()
      }
    }
  ])
  tray.setToolTip('This is bear hand.')
  tray.setContextMenu(contextMenu)

  // tray.on('click', () => win.show())

  return tray
}
function createWindow () {
  mainWindow = new BrowserWindow({
    height: 630,
    width: 1000,
    icon: '../renderer/assets/icon.png', // 視窗框架圖示
    resizable: false, // 可否調整視窗大小
    frame: false, // 是否隱藏框架 與 Menu
    transparent: true, // 視窗是否透明（frame 為 true 才有作用）
    useContentSize: true,
    autoHideMenuBar: true, // 是否隱藏 Menu（按下 Alt 可顯示）
    fullscreen: false, // 視窗是否全螢幕顯示
    webPreferences: {
      defaultFontFamily: {
        standard: 'MyFont'
      },
      defaultFontSize: 80
    }
  })
  mainWindow.webContents.openDevTools()

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  const win = createWindow()

  createTray(win)

  globalShortcut.register('CommandOrControl+1', () => {
    if (!mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(true)
    } else {
      mainWindow.setFullScreen(false)
    }
  })
})

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

ipcMain.on('close', () => {
  mainWindow.close()
})

ipcMain.on('fullScreen', () => {
  // mainWindow.flashFrame(true) // 視窗是否閃爍
  const isFull = mainWindow.isFullScreen()
  console.log(isFull)
  mainWindow.setFullScreen(!isFull)
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
