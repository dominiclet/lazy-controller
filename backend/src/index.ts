import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io';
import cors from "cors";
import robot from "robotjs";

const app = express()
app.use(cors());
const port = 8080;
const hostname = process.env.HOST || 'localhost';
const httpServer = createServer(app);

const io = new Server(httpServer, {
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

  console.log(`Accepted connection by ${socket.id}. Rejecting subsequent connections.`);

  // Pause 
  socket.on("pause", () => {
    console.log(`Pause by ${socket.id}`)
    robot.keyTap("space");
  });

  // Volume up
  socket.on("vol_up", () => {
    console.log(`Volume up by ${socket.id}`);
    robot.keyTap("audio_vol_up");
  });

  // Volume down
  socket.on("vol_down", () => {
    console.log(`Volume down by ${socket.id}`);
    robot.keyTap("audio_vol_down");
  });

  // Forward 
  socket.on("forward", () => {
    console.log(`Forward by ${socket.id}`);
    robot.keyTap("right");
  })

  // Backward
  socket.on("backward", () => {
    console.log(`Backward by ${socket.id}`);
    robot.keyTap("left");
  })

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected. Accepting subsequent connections.`)
  })
})

app.get('/', (_, res) => {
  res.status(200).send()
})

httpServer.listen(port, hostname, 511, () => console.log(`Running on host: ${hostname}, port: ${port}`))
