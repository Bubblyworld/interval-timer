import { Audio } from "expo-av";

export const SHORT_BEEP = "SHORT_BEEP";

const sources = {
  SHORT_BEEP: require("../assets/beep.mp3")
};

// TODO: Maybe consider moving these assets into the store. Fine for now.
var soundBank = {};

// loadSounds preloads all sounds into global storage and returns a promise.
export function loadSounds() {
  return new Promise((resolve, reject) => {
    var anyErr = null;
    var errors = 0;
    var successes = 0;
    const total = Object.keys(sources).length;

    const checkDone = () => {
      if (errors + successes >= total) {
        if (errors > 0) {
          reject(anyErr);
          return;
        }

        resolve();
      }
    };

    Object.keys(sources).forEach(id => {
      Audio.Sound.createAsync(sources[id]).then(
        result => {
          successes++;
          soundBank[id] = result.sound;
          checkDone();
        },
        err => {
          errors++;
          anyErr = err;
          checkDone();
        }
      );
    });
  });
}

export function playSound(id) {
  const sound = soundBank[id];
  if (!sound) {
    return; // nothing to play
  }

  sound.replayAsync();
}
