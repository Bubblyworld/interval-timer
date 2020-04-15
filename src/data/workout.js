import { RootNode, RepeatNode, LeafNode } from "./tree.js";

// Workout is a flat data structure that's equivalent to a workout tree as
// defined in "./tree.js". This form of the data structure is more useful for
// rendering UI components, while the tree is easier to write code against.
export class Workout {
  constructor(name, intervals, repeatCols) {
    this.name = name;
    this.intervals = intervals;
    this.repeatCols = repeatCols;
  }

  toTree() {
    var maxRank = -1;
    var nodesByRank = {}; // rank is length from node to root in final tree
    this.intervals.forEach((interval, i) => {
      const rank = this._rankOfIndex(i);
      var nodes = nodesByRank[rank] || [];
      var node = new LeafNode(interval.duration, interval.description);

      node._index = i;
      maxRank = Math.max(maxRank, rank);
      nodes.push(node);
      nodesByRank[rank] = nodes;
    });
    this.repeatCols.forEach(repeatCol => {
      repeatCol.repeats.forEach(repeat => {
        const rank = this._rankOfRepeat(repeat);
        var nodes = nodesByRank[rank] || [];
        var node = new RepeatNode(repeat.repeats, []);

        node._index = repeat.indexA;
        maxRank = Math.max(maxRank, rank);
        nodes.push(node);
        nodesByRank[rank] = nodes;
      });
    });

    var tree = new RootNode(this.name, []);
    if (maxRank == -1) {
      return tree; // corner-case where workout is empty
    }

    // To preserve order, we need to sort the nodes in each rank by index.
    for (var i = 0; i <= maxRank; i++) {
      var nodes = nodesByRank[i] || [];
      nodes.sort((a, b) => (a._index < b._index ? -1 : 1));
      nodesByRank[i] = nodes;
    }

    // Build up the tree by adding each node to it's containing parent's nodes.
    (nodesByRank[0] || []).forEach(node => tree.children.push(node));
    for (var rank = 1; rank <= maxRank; rank++) {
      (nodesByRank[rank] || []).forEach(node => {
        const parents = (nodesByRank[rank - 1] || []).filter(
          parent => parent._index <= node._index
        );

        parents[parents.length - 1].children.push(node);
      });
    }

    return tree;
  }

  _rankOfIndex(index) {
    var rank = 0;
    this.repeatCols.forEach(repeatCol => {
      repeatCol.repeats.forEach(repeat => {
        if (repeat.containsIndex(index)) {
          rank++;
        }
      });
    });

    return rank;
  }

  _rankOfRepeat(rep) {
    var rank = 0;
    this.repeatCols.forEach(repeatCol => {
      repeatCol.repeats.forEach(repeat => {
        if (repeat.equals(rep)) {
          return;
        }

        if (repeat.contains(rep)) {
          rank++;
        }
      });
    });

    return rank;
  }

  isValid(repeat) {
    for (var i = 0; i < this.repeatCols.length; i++) {
      for (var j = 0; j < this.repeatCols[i].repeats.length; j++) {
        var other = this.repeatCols[i].repeats[j];

        if (!repeat.intersects(other)) {
          continue;
        }

        if (repeat.equals(other)) {
          return false; // workout already contains interval
        }

        if (!repeat.contains(other) && !other.contains(repeat)) {
          return false; // tree constaint is violated
        }
      }
    }

    return true;
  }

  addRepeat(repeat) {
    if (!this.isValid(repeat)) {
      return; // can't do anything in this case
    }

    for (var i = 0; i < this.repeatCols.length; i++) {
      if (this.repeatCols[i].isDisjoint(repeat)) {
        this.repeatCols[i].push(repeat);
        this.repeatCols[i].repeats.sort((a, b) =>
          a.indexA < b.indexA ? -1 : 1
        );
        return;
      }
    }

    this.repeatCols.push(new RepeatCol([repeat]));
  }

  deleteInterval(index) {
    var intervals = [
      ...this.intervals.slice(0, index),
      ...this.intervals.slice(index + 1)
    ];

    var repeatCols = this.repeatCols
      .map(repeatCol => {
        return new RepeatCol(
          repeatCol.repeats
            .map(repeat => {
              var indexA =
                repeat.indexA > index ? repeat.indexA - 1 : repeat.indexA;
              var indexB =
                repeat.indexB > index ? repeat.indexB - 1 : repeat.indexB;

              return new Repeat(indexA, indexB, repeat.repeats);
            })
            .filter(repeat => repeat.indexB - repeat.indexA > 0)
        );
      })
      .filter(repeatCol => repeatCol.repeats.length > 0);

    this.intervals = intervals;
    this.repeatCols = [];
    repeatCols.forEach(repeatCol => {
      repeatCol.repeats.forEach(repeat => this.addRepeat(repeat));
    });
  }

  deleteRepeat(colIndex, repIndex) {
    var repeatCols = this.repeatCols;
    this.repeatCols = [];
    repeatCols.forEach((repeatCol, col) => {
      repeatCol.repeats.forEach((repeat, rep) => {
        if (col == colIndex && rep == repIndex) {
          return;
        }

        this.addRepeat(repeat);
      });
    });
  }
}

export class Interval {
  constructor(duration, description) {
    this.duration = duration;
    this.description = description;
  }
}

export class RepeatCol {
  constructor(repeats) {
    this.repeats = repeats;
  }

  push(repeat) {
    for (var i = 0; i < this.repeats.length; i++) {
      if (this.repeats[i].intersects(repeat)) {
        throw new Error("error: tried to push non-disjoint repeat onto column");
      }
    }

    this.repeats.push(repeat);
  }

  isDisjoint(repeat) {
    for (var i = 0; i < this.repeats.length; i++) {
      const other = this.repeats[i];

      if (repeat.intersects(other)) {
        return false;
      }

      if (repeat.contains(other) || other.contains(repeat)) {
        return false;
      }
    }

    return true;
  }
}

// Repeat represents repeating the intervals in the range [indexA, indexB).
export class Repeat {
  constructor(indexA, indexB, repeats) {
    this.indexA = indexA;
    this.indexB = indexB;
    this.repeats = repeats;
  }

  containsIndex(index) {
    return index >= this.indexA && index < this.indexB;
  }

  contains(repeat) {
    return (
      this.containsIndex(repeat.indexA) && this.containsIndex(repeat.indexB - 1)
    );
  }

  equals(repeat) {
    return this.indexA == repeat.indexA && this.indexB == repeat.indexB;
  }

  intersects(repeat) {
    return (
      this.containsIndex(repeat.indexA) || this.containsIndex(repeat.indexB - 1)
    );
  }
}
