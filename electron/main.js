const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let mainWindow;
let backendProcess;

function startBackend() {
    backendProcess = spawn(
        "python",
        [
            "-m",
            "uvicorn",
            "backend.main:app",
            "--host",
            "127.0.0.1",
            "--port",
            "8000"
        ],
        {
            cwd: path.join(__dirname, ".."),
            shell: true,
            stdio: "inherit"
        }
    );
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 900,

        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (!app.isPackaged) {
        mainWindow.loadURL("http://localhost:5173");
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(
            path.join(__dirname, "../frontend/dist/index.html")
        );
    }
}

app.whenReady().then(() => {

    if (app.isPackaged) {
        startBackend();
    }

    createWindow();

});

app.on("window-all-closed", () => {

    if (backendProcess) {
        backendProcess.kill();
    }

    if (process.platform !== "darwin") {
        app.quit();
    }
});