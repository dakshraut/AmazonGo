const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("cartUpdate", (data) => {
      io.emit("cartSync", data);
    });

    socket.on("notification", (data) => {
      io.emit("notify", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default socketHandler;
