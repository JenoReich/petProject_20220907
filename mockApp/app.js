const { Server } = require("socket.io");
const io = new Server(3000);
const fs = require("fs");
const { parse } = require("csv-parse");

const positions = [];
const stream = fs
  .createReadStream("./lines/line1.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    positions.push(row);
  })
  .on("end", () => {
    io.on("connection", (socket) => {
      for (let index = 0; index < positions.length; index++) {
        const position = positions[index];
        emitRow(index, position, socket);
      }
    });
  });

function emitRow(i, row, socket) {
  setTimeout(function () {
    socket.emit("position", {
      position: { lat: row[0], lon: row[1], heading: row[2] },
    });
  }, 1000 * i);
}
