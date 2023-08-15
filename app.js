class Que {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }
}
class Knight {
  constructor(x, y, path = []) {
    this.x = x;
    this.y = y;
    this.path = path; // The path taken to reach this position
  }
  getValidMoves(boardSize) {
    const possibleMoves = [
      [1, 2],
      [2, 1],
      [-1, 2],
      [-2, 1],
      [1, -2],
      [2, -1],
      [-1, -2],
      [-2, -1],
    ];
    const validMoves = [];

    for (const [dx, dy] of possibleMoves) {
      const newX = this.x + dx;
      const newY = this.y + dy;
      if (newX >= 0 && newY >= 0 && newX < boardSize && newY < boardSize) {
        validMoves.push([newX, newY]);
      }
    }

    return validMoves;
  }
}

function knightMoves(start, end) {
  const boardSize = 8;
  const queue = [];
  const visited = new Set();

  const startKnight = new Knight(start[0], start[1], [start]);
  queue.push(startKnight);
  visited.add(`${start[0]}-${start[1]}`);

  while (queue.length > 0) {
    const currentKnight = queue.shift();

    if (currentKnight.x === end[0] && currentKnight.y === end[1]) {
      return currentKnight.path;
    }

    for (const [newX, newY] of currentKnight.getValidMoves(boardSize)) {
      const newPosition = `${newX}-${newY}`;
      if (!visited.has(newPosition)) {
        visited.add(newPosition);
        const newPath = [...currentKnight.path, [newX, newY]];
        queue.push(new Knight(newX, newY, newPath));
      }
    }
  }
  return [];
}

function printPath(path) {
  if (path.length > 0) {
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    for (const [x, y] of path) {
      console.log(`[${x},${y}]`);
    }
    return;
  }
  console.log("Cannot reach given destination in a 8x8 chessboard.");
}

const path1 = knightMoves([5, 3], [2, 3]);
printPath(path1);
