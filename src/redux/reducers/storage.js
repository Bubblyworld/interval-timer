import { UPDATE_STORAGE } from "../actions/storage.js";

export default (storage = {}, action) => {
  switch (action.type) {
    case UPDATE_STORAGE:
      return {
        storageEnabled: true,
        token: action.token
      };
  }

  return storage;
};
