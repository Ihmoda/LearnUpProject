// turns array of users into an object with mongo ids as keys
export function formatUsers(users) {
  const reducer = (acc, element) => {
    const { email, id, admin } = element;
    acc[id] = {
      email,
      id,
      admin,
    };
    return acc;
  };
  return users.reduce(reducer, {});
}
