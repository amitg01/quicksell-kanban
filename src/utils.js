import {
  GROUP_BY_LABELS,
  PRIORITY_COLUMN_LABELS,
  STATUS_GROUPS,
} from "./constants";

import data from "./data.json";
const { users } = data;

export const getUser = (id) => users.find((user) => user.id === id);

const addUserToTask = (tickets) =>
  tickets.map((task) => {
    const { userId, ...rest } = task;
    return { ...rest, user: getUser(userId) };
  });

const sortTickets = (response, sortBy) => {
  const sortedTickets = response?.tickets.sort((a, b) => {
    if (sortBy === "priority") {
      return b.priority - a.priority;
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
  });
  return sortedTickets;
};

export const groupData = (response, groupBy, sortBy) => {
  if (sortBy) {
    const sortedTickets = sortTickets(response, sortBy);
    response.tickets = sortedTickets;
  }

  switch (groupBy) {
    case GROUP_BY_LABELS.PRIORITY:
      return groupDataByPriority(response);
    case GROUP_BY_LABELS.USER:
      return groupDataByUsers(response);
    case GROUP_BY_LABELS.STATUS:
      return groupDataByStatus(response);
    default:
      return groupDataByStatus(response);
  }
};

export const groupDataByPriority = (response) => {
  const data = {};
  const tasksWithUsers = addUserToTask(response?.tickets);

  for (let label in PRIORITY_COLUMN_LABELS) {
    if (!data[label]) {
      data[label] = [];
    }
    const groupTasks = tasksWithUsers.filter(
      (task) => task.priority === PRIORITY_COLUMN_LABELS[label]
    );

    if (groupTasks) {
      data[label].push(...groupTasks);
    }
  }

  return data;
};

export const groupDataByUsers = (response) => {
  const data = {};
  const tasksWithUsers = addUserToTask(response?.tickets);
  const users = response?.users;
  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

  sortedUsers.forEach((user) => {
    const { name } = user;
    if (!data[name]) {
      data[name] = [];
    }
    const groupTasks = tasksWithUsers.filter(
      (task) => task.user.id === user.id
    );
    if (groupTasks) {
      data[name].push(...groupTasks);
    }
  });

  return data;
};

export const groupDataByStatus = (response) => {
  const data = {};
  const tasksWithUsers = addUserToTask(response?.tickets);

  STATUS_GROUPS.forEach((group) => {
    if (!data[group]) {
      data[group] = [];
    }
    const groupTasks = tasksWithUsers.filter((task) => task.status === group);
    if (groupTasks) {
      data[group].push(...groupTasks);
    }
  });

  return data;
};
