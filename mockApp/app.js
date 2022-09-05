const { Server } = require("socket.io");
const io = new Server(3000);
const fs = require("fs");
const { parse } = require("csv-parse");

const positionsForLine1 = [];
const positionsForLine2 = [];
const positionsForLine3 = [];

streamLineData('line1',positionsForLine1)
streamLineData('line2',positionsForLine2)
streamLineData('line3',positionsForLine3)


function streamLineData(lineId,array){
  fs
  .createReadStream("./lines/"+lineId+".csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    array.push(row);
  })
  .on("end", () => {
    io.on("connection", (socket) => {
      for (let index = 0; index < array.length; index++) {
        const position = array[index];
        emitRow(index, position, socket, lineId);
      }
    });
  });
}

function emitRow(i, row, socket, lineId) {
  setTimeout(function () {
    socket.emit("position", {
      position: {id:lineId, lat: row[0], lon: row[1], heading: row[2] },
    });
  }, 1000 * i);
}
