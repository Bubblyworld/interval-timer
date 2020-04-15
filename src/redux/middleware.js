import { writeToStorage } from "../storage.js";
import actions from "../redux/actions";

// storageMiddleware uses an update token on the store to trigger writes to local
// storage after a certain period of inactivity. This is to prevent stampedes
// from clobbering the storage and probably killing the CPU.
export default function storageMiddleware(delay) {
  return store => next => action => {
    // We don't want to start storing things on disk until the initial check
    // has terminated; this might end up clobbering things.
    const state = store.getState();
    if (!state.storage || !state.storage.storageEnabled) {
      return next(action);
    }

    // We don't want token dispatches to dispatch token dispatches! AAARGH!
    if (action.type == actions.UPDATE_STORAGE) {
      return next(action);
    }

    const localToken = (state.storage.token || 0) + 1;
    store.dispatch(actions.updateStorage(localToken));

    setTimeout(() => {
      const globalState = store.getState();
      if (localToken == globalState.storage.token) {
        writeToStorage(store.getState()).then(
          () => {},
          err => console.log("failed to write to storage: " + err)
        );
      }
    }, delay);

    return next(action);
  };
}
