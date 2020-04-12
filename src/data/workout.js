import { RootNode, RepeatNode, LeafNode } from "./tree.js";

// Workout is a flat data structure that's equivalent to a workout tree as
// defined in "./tree.js". This form of the data structure is more useful for
// rendering UI components, while the tree is easier to write code against.
export class Workout {
  constructor(intervals, repeatCols) {
    this.intervals = intervals;
    this.repeatCols = repeatCols;
  }

  toTree() {
    var children = this._toTree();
    return new RootNode(children);
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

        var subTree = new Workout(subIntervals, subRepeats)._toTree();
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
}

// Repeat represents repeating the intervals in the range [indexA, indexB).
export class Repeat {
  constructor(indexA, indexB, repeats) {
    this.indexA = indexA;
    this.indexB = indexB;
    this.repeats = repeats;
  }

  contains(index) {
    return index >= this.indexA && index <= this.indexB;
  }

  intersects(repeat) {
    return this.contains(repeat.indexA) || this.contains(repeat.indexB);
  }
}
