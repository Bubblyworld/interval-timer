import { Workout, Interval, RepeatCol, Repeat } from "./workout.js";

const noop = () => {};

// Tree is a tree with three kinds of nodes - the root node, repeat nodes and
// leaf nodes. The leaf nodes represent a single rep/interval, the repeat nodes
// represent multiple copies of their subtrees and the root node is the unique
// node at the top.
class Tree {
  constructor(name, children) {
    this.name = name;
    this.children = children;
  }

  traverse(cbs) {
    if (this instanceof RootNode && cbs.enterRoot instanceof Function) {
      cbs.enterRoot(this);
    }

    if (this instanceof RepeatNode && cbs.enterRepeat instanceof Function) {
      cbs.enterRepeat(this);
    }

    if (this instanceof LeafNode && cbs.enterLeaf instanceof Function) {
      cbs.enterLeaf(this);
    }

    for (var i = 0; i < this.children.length; i++) {
      this.children[i].traverse(cbs);
    }

    if (this instanceof RootNode && cbs.exitRoot instanceof Function) {
      cbs.exitRoot(this);
    }

    if (this instanceof RepeatNode && cbs.exitRepeat instanceof Function) {
      cbs.exitRepeat(this);
    }

    if (this instanceof LeafNode && cbs.exitLeaf instanceof Function) {
      cbs.exitLeaf(this);
    }
  }

  // rankRepeats returns a list of each repeat's distance from the root, where 0
  // is the distance of the first repeat from the root. The list is in the order
  // nodes are entered.
  rankRepeats() {
    var rank = 0;
    var ranks = [];
    this.traverse({
      enterRepeat: repeat => {
        ranks.push(rank);
        rank++;
      },
      exitRepeat: root => {
        rank--;
      }
    });

    return ranks;
  }

  toWorkout() {
    var intervals = [];
    this.traverse({
      enterLeaf: leaf => {
        intervals.push(new Interval(leaf.duration, leaf.description));
      }
    });

    var rankedRepeats = this.rankRepeats();
    var maxRank = rankedRepeats.reduce((x, y) => Math.max(x, y), -1);
    var repeatCols = [];
    for (var i = 0; i <= maxRank; i++) {
      repeatCols.push(new RepeatCol([]));
    }

    var i = -1;
    var offset = 0;
    var rankStack = [];
    var offsetStack = [];
    this.traverse({
      enterLeaf: leaf => offset++,
      enterRepeat: repeat => {
        i++;
        rankStack.push(rankedRepeats[i]);
        offsetStack.push(offset);
      },
      exitRepeat: repeat => {
        var o = offsetStack.pop();
        var r = rankStack.pop();
        repeatCols[maxRank - r].push(new Repeat(o, offset, repeat.repeats));
      }
    });

    return new Workout(this.name, intervals, repeatCols);
  }
}

export class RootNode extends Tree {
  constructor(name, children) {
    super(name, children);
  }
}

// NOTE: We assume that RepeatNodes always have at least one child.
export class RepeatNode extends Tree {
  constructor(repeats, children) {
    super("", children);

    this.repeats = repeats;
  }
}

export class LeafNode extends Tree {
  constructor(duration, description) {
    super("", []);

    this.duration = duration;
    this.description = description;
  }
}
