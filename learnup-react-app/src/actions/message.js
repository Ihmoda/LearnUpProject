export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

export function updateMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    message,
  };
}
