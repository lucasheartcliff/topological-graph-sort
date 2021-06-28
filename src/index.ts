interface ItemsMap {
  [k: number]: typeof sequence[0];
}

const sequence = [
  {
    id: 1,
    nodeName: "1",
    duration: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
    level: 1,
    predecessors: [],
    sucessors: [],
    children: [1, 5, 8]
  },
  {
    id: 2,
    nodeName: "1.1",
    duration: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
    level: 2,
    children: [2, 3, 4],
    predecessors: [],
  },
  {
    id: 3,
    nodeName: "1.1.1",
    duration: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    level: 3,
    predecessors: [4],
  },
  {
    id: 4,
    nodeName: "1.1.2",
    duration: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    level: 3,
    predecessors: [2],
  },
  {
    id: 5,
    nodeName: "1.1.3",
    duration: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    level: 3,
    predecessors: [],
    sucessors: []
  },
  {
    id: 6,
    nodeName: "1.2",
    duration: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
    level: 2,
    children: [6, 7],
    predecessors: [],
  },
  {
    id: 7,
    nodeName: "1.2.1",
    duration: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    level: 3,
    predecessors: [7],
  },
  {
    id: 8,
    nodeName: "1.2.2",
    duration: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    level: 3,
    predecessors: [],
  },
  {
    id: 9,
    nodeName: "1.3",
    duration: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
    predecessors: [],
    level: 2,
  }
];

const isAllDependenciesDone = (dependencies: number[], doneMap: ItemsMap) => {
  if (dependencies && dependencies.length) {
    for (const i of dependencies) {
      if (!doneMap[i]) {
        return false;
      }
    }
  }
  return true;
};

const sort = () => {
  const sortedArray = [];
  const pending = sequence.reduce((acc, cur, index) => {
    acc[index] = cur;
    return acc;
  }, {} as ItemsMap);

  const doneMap: ItemsMap = {};

  while (Object.values(pending).length > 0) {
    const list = Object.entries(pending);

    for (const [key, value] of list) {
      const item = value;
      const { predecessors, children } = item;

      if (
        isAllDependenciesDone(predecessors, doneMap) &&
        isAllDependenciesDone(children, doneMap)
      ) {
        sortedArray.push(item);
        doneMap[key] = item;
        delete pending[key];
      }
    }
  }

  return sortedArray;
};

console.log(sort());
