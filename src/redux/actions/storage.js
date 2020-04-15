export const UPDATE_STORAGE = "UPDATE_STORAGE";

export function updateStorage(token) {
  return {
    type: UPDATE_STORAGE,
    token: token
  };
}
