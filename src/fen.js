var util = require('./util');

var initial = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w';

var roles = {
  p: "pawn",
  r: "rook",
  n: "knight",
  b: "bishop",
  a: "advisor",
  c: "cannon",
  k: "king"
};

var letters = {
  pawn: "p",
  rook: "r",
  knight: "n",
  bishop: "b",
  advisor: "a",
  cannon: "c",
  king: "k"
};

function read(fen) {
  // console.log("read fen", fen);
  if (fen === 'start') fen = initial;
  var pieces = {};
  fen.replace(/ .+$/, '').replace(/~/g, '').split('/').forEach(function(row, y) {
    var x = 0;
    row.split('').forEach(function(v) {
      var nb = parseInt(v);
      if (nb) x += nb;
      else {
        // console.log("XY = ", x, y);
        pieces[util.pos2key([x, 9 - y])] = {
          role: roles[v.toLowerCase()],
          color: v === v.toLowerCase() ? 'black' : 'white'
        };
        x++;
      }
    });
  });
  return pieces;
}

function write(pieces) {
  return [8, 7, 6, 5, 4, 3, 2].reduce(
    function(str, nb) {
      return str.replace(new RegExp(Array(nb + 1).join('1'), 'g'), nb);
    },
    util.invRanks.map(function(y) {
      return util.ranks.map(function(x) {
        var piece = pieces[util.pos2key([x, y])];
        if (piece) {
          var letter = letters[piece.role];
          return piece.color === 'white' ? letter.toUpperCase() : letter;
        } else return '1';
      }).join('');
    }).join('/'));
}

module.exports = {
  initial: initial,
  read: read,
  write: write
};
