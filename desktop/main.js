const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 860,
    minWidth: 380,
    title: 'Etçi Memet HACCP',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  Menu.setApplicationMenu(null);
  // Her açılışta web'deki en yeni sürüm açılır (güncelleme kurmaya gerek kalmaz); internet yoksa kurulumdaki kopya açılır.
  const YEREL = path.join(__dirname, 'app', 'index.html');
  const UZAK = 'https://erenerdem19777-stack.github.io/etci-memet-haccp/';
  let yedek = false;
  const yereliAc = () => { if (!yedek) { yedek = true; win.loadFile(YEREL); } };
  win.webContents.on('did-fail-load', (e, kod, aciklama, url, anaCerceve) => { if (anaCerceve && String(url).startsWith('https:')) yereliAc(); });
  win.loadURL(UZAK).catch(yereliAc);
  // Dış bağlantılar varsayılan tarayıcıda açılsın
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith(UZAK) && !url.startsWith('file:')) { e.preventDefault(); shell.openExternal(url); } });
}

if (!app.requestSingleInstanceLock()) { app.quit(); }
else {
  app.on('second-instance', () => { const w = BrowserWindow.getAllWindows()[0]; if (w) { if (w.isMinimized()) w.restore(); w.focus(); } });
  app.whenReady().then(createWindow);
  app.on('window-all-closed', () => app.quit());
}
