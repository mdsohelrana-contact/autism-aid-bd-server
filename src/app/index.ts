import { createServer } from "http";
import app from "./app";
import { Server as SocketIOServer } from "socket.io";
import config from "./config/index";
import { socketAuth } from "./middlewares/socketAuth";
import "./utils/coupon/expireCoupons";

const httpServer = createServer(app);

export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  },
});

io.use(socketAuth);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const mainServer = async () => {
  try {
    httpServer.listen(config.port, () => {
      console.log(`Example app listening on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log("error:", error);
  }
};

mainServer();
