class Node {
  constructor(x = 0, y = 0, linked = []) {
    this.x = x;
    this.y = y;
    this.linked = linked;
    this._boardLen = 8;
  }

  generateAll(
    visited = Array(this._boardLen)
      .fill()
      .map(() => Array(this._boardLen).fill(false))
  ) {
    visited[this.x][this.y] = this;
    this.genMove(1, 2, visited);
    this.genMove(1, -2, visited);
    this.genMove(-1, 2, visited);
    this.genMove(-1, -2, visited);
    this.genMove(2, 1, visited);
    this.genMove(2, -1, visited);
    this.genMove(-2, 1, visited);
    this.genMove(-2, -1, visited);
  }

  genMove(deltaX, deltaY, visited) {
    const newX = this.x + deltaX;
    const newY = this.y + deltaY;

    if (
      newX < 0 ||
      newX >= this._boardLen ||
      newY < 0 ||
      newY >= this._boardLen
    ) {
      return null;
    }
    if (!visited[newX][newY]) {
      visited[newX][newY] = true;
      const newNode = new Node(newX, newY);
      this.linked.push(newNode);
      newNode.generateAll(visited);
    } else {
      this.linked.push(visited[newX][newY]);
    }
  }

  findNode(
    x,
    y,
    visited = Array(this._boardLen)
      .fill()
      .map(() => Array(this._boardLen).fill(false)),
    node = this
  ) {
    
    const targetX = x;
    const targetY = y;
    visited[node.x][node.y] = true;
    if (node.x === targetX && node.y === targetY) {
      return node;
    }

    for (let tile of node.linked) {
      if (!visited[tile.x][tile.y]) {
        let foundNode = this.findNode(x, y, visited, tile);
        if (foundNode) {
          return foundNode;
        }
      }
    }

    return null;
  }

  travail(startX,startY, endX, endY) {
    const startNode = this.findNode(startX, startY);
    const endNode = this.findNode(endX, endY);
    const parentMap = new Map();
    let visited = Array(this._boardLen).fill().map(() => Array(this._boardLen).fill(false))

    let queue = [];
    let paths = [];
    let minPathLength = Infinity;
    if (startNode === endNode) {
        console.log("no need to move!");
        return;
    }
    visited[startNode.x][startNode.y] = true;
    queue.push({ node: startNode, path: [{ x: startNode.x, y: startNode.y }] });
    while (queue.length > 0) {
        let { node: visiting, path } = queue.shift();
        if (visiting.x === endNode.x && visiting.y === endNode.y) {
            if (path.length < minPathLength) {
                minPathLength = path.length;
                paths = [path];
            } else if (path.length === minPathLength) {
                paths.push(path);
            }
            continue;
        }

        

        visiting.linked.forEach(tile => {
            if (!visited[tile.x][tile.y]) {
                visited[visiting.x][visiting.y] = true;
                queue.push({node: tile , path: [...path, { x: tile.x, y: tile.y }]});
            }
        })

    }

    if (paths.length > 0) {
            paths.forEach(path => {
            console.log("Path found: ",path);
        });
    }
    

  }


}
const board = new Node();

board.generateAll();
