import { LeafNode, RepeatNode, RootNode } from "./tree.js";

// Traverse provides a serialisable way to iterate through a workout tree - in
// more academic terms, it's a reification of tree.traverse(). Note that if
// the tree changes the underlying traverse iteration may be invalid, so don't
// traverse over mutating trees.
export default class Traverse {
  constructor(tree) {
    this.tree = tree;
    this.iteration = iterationFor(tree);
  }

  isDone() {
    return this.iteration.length == 0;
  }

  node() {
    return this.iteration[this.iteration.length - 1].node;
  }

  next() {
    return Object.assign(this, { iteration: iterate(this.iteration) });
  }
}

class Iterator {
  constructor(node) {
    this.node = node;
    this.childIndex = 0; // for RepeatNodes and RootNodes
    this.repetition = 0; // for RepeatNodes
  }
}

function iterationFor(node) {
  if (!node) {
    return []; // default to empty iteration for undefined input edge case
  }

  if (node instanceof RootNode && node.children.length == 0) {
    return []; // edge-case where we have an empty tree
  }

  var iterator = new Iterator(node);
  if (node instanceof LeafNode) {
    return [iterator];
  } else {
    return [iterator, ...iterationFor(node.children[0])];
  }
}

function iterate(iteration) {
  if (iteration.length == 0) {
    return [];
  }

  var iterator = iteration[iteration.length - 1];
  if (iterator.node instanceof LeafNode) {
    return iterate(iteration.slice(0, -1));
  }

  iterator = Object.assign(iterator, { childIndex: iterator.childIndex + 1 });
  if (iterator.childIndex < iterator.node.children.length) {
    return [
      ...iteration.slice(0, -1),
      iterator,
      ...iterationFor(iterator.node.children[iterator.childIndex])
    ];
  }
  if (iterator.node instanceof RootNode) {
    return [];
  }

  iterator = Object.assign(iterator, {
    childIndex: 0,
    repetition: iterator.repetition + 1
  });
  if (iterator.repetition >= iterator.node.repeats) {
    return iterate(iteration.slice(0, -1));
  }

  return [
    ...iteration.slice(0, -1),
    iterator,
    ...iterationFor(iterator.node.children[iterator.childIndex])
  ];
}
