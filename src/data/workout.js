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
    var children = this._toTree();
    return new RootNode(this.name, children);
  }

  _toTree() {
    var repeatCol = new RepeatCol([]);
    if (this.repeatCols.length > 0) {
      // TODO: sort by indexA, currently assumes it's in order
      repeatCol = this.repeatCols[this.repeatCols.length - 1];
    }

    var rci = 0;
    var children = [];
    for (var i = 0; i < this.intervals.length; i++) {
      if (
        repeatCol.repeats.length > 0 &&
        rci < repeatCol.repeats.length &&
        i == repeatCol.repeats[rci].indexA
      ) {
        var subRepeats = [];
        var subIntervals = this.intervals.slice(
          i,
          repeatCol.repeats[rci].indexB
        );

        var diff = repeatCol.repeats[rci].indexA;
        for (var j = 0; j < this.repeatCols.length - 1; j++) {
          subRepeats.push(new RepeatCol([]));

          for (var k = 0; k < this.repeatCols[j].repeats.length; k++) {
            var repeat = this.repeatCols[j].repeats[k];
            if (repeatCol.repeats[rci].intersects(repeat)) {
              subRepeats[j].push(
                new Repeat(
                  repeat.indexA - diff,
                  repeat.indexB - diff,
                  repeat.repeats
                )
              );
            }
          }
        }

        var subTree = new Workout("", subIntervals, subRepeats)._toTree();
        children.push(new RepeatNode(repeatCol.repeats[rci].repeats, subTree));
        i += subIntervals.length - 1;
        rci++;

        continue;
      }

      children.push(
        new LeafNode(this.intervals[i].duration, this.intervals[i].description)
      );
    }

    return children;
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
      throw new Error(
        "tried to add a repeat that violates the workout constraints"
      );
    }

    for (var i = 0; i < this.repeatCols.length; i++) {
      if (this.repeatCols[i].isDisjoint(repeat)) {
        this.repeatCols[i].push(repeat);
        this.repeatCols[i].sort((a, b) => (a.indexA < b.indexA ? -1 : 1));
        return;
      }
    }

    this.repeatCols.push(new RepeatCol([repeat]));
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
