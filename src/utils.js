import data from "./data.json";
const { users } = data;

export const getUser = (id) => users.find((user) => user.id === id);

export const sortDataByPriority = (data) => {
  const sortedData = {};

  data.tickets.forEach((ticket) => {
    const { priority, userId, ...rest } = ticket;
    if (!sortedData[priority]) {
      sortedData[priority] = [];
    }
    sortedData[priority].push({ ...rest, user: getUser(userId) });
  });

  return sortedData;
};
