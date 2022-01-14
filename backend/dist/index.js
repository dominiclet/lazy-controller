"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const robotjs_1 = __importDefault(require("robotjs"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 5000;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
    }
});
io.on("connection", (socket) => {
    const allSocks = io.sockets.sockets;
    if (allSocks.size != 1) {
        console.log(`Rejected connection attempt by ${socket.id}`);
        socket.disconnect();
        return;
    }
    console.log(`Accepted connection by ${socket.id}`);
    // Pause 
    socket.on("pause", () => {
        console.log(`Pause by ${socket.id}`);
        robotjs_1.default.keyTap("space");
    });
    // Volume up
    socket.on("vol_up", () => {
        console.log(`Volume up by ${socket.id}`);
        robotjs_1.default.keyTap("audio_vol_up");
    });
    // Volume down
    socket.on("vol_down", () => {
        console.log(`Volume down by ${socket.id}`);
        robotjs_1.default.keyTap("audio_vol_down");
    });
    // Forward 
    socket.on("forward", () => {
        console.log(`Forward by ${socket.id}`);
        robotjs_1.default.keyTap("right");
    });
    // Backward
    socket.on("backward", () => {
        console.log(`Backward by ${socket.id}`);
        robotjs_1.default.keyTap("left");
    });
});
app.get('/', (_, res) => {
    res.status(200).send();
});
httpServer.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map