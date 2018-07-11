import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow } from 'electron';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const mode = process.env.NODE_ENV;

function reloadOnChange(win) {
	if (mode !== 'development') return { close: () => {} };

	const watcher = require('chokidar').watch(path.join(__dirname, '**'), { ignoreInitial: true });

	watcher.on('change', () => {
		win.reload();
	});

	return watcher;
}

function launch() {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth: 600,
		backgroundColor: 'white',
		titleBarStyle: 'hidden'
	});

	win.loadURL(
		url.format({
			pathname: path.join(__dirname, '../static/index.html'),
			protocol: 'file:',
			slashes: true
		})
	);

	const watcher = reloadOnChange(win);

	win.on('closed', function() {
		win = null;
		watcher.close();
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', launch);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		launch();
	}
});