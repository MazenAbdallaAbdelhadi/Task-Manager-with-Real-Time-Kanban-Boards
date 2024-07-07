const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Import and use event handlers
    require("./events/connection")(socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

module.exports = initializeSocket;

