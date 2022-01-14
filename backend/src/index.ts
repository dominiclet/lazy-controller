import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io';
import cors from "cors";
import robot from "robotjs";

const app = express()
app.use(cors());
const port = 5000
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

  console.log(`Accepted connection by ${socket.id}`);

  // Pause 
  socket.on("pause", () => {
    console.log(`Pause event by ${socket.id}`)
    console.log(robot);
    robot.keyTap("space");
  });
})

app.get('/', (_, res) => {
  res.status(200).send()
})

httpServer.listen(port, () => console.log(`Running on port ${port}`))
