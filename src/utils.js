import {
  GROUP_BY_LABELS,
  PRIORITY_COLUMN_LABELS,
  STATUS_GROUPS,
} from "./constants";

export const getUserWithId = (users, id) =>
  users.find((user) => user.id === id);

export const getUserWithName = (users, name) =>
  users.find((user) => user.name === name);

export const getInitials = (name) =>
  name
    .split(" ")
    .map((name) => name[0]?.toUpperCase())
    .join("");

const addUserToTask = (users, tickets) =>
  tickets?.map((task) => {
    const { userId, ...rest } = task;
    return { ...rest, user: getUserWithId(users, userId) };
  });

const sortTickets = (response, sortBy, groupBy) => {
  const sortedTickets = response?.tickets?.sort((a, b) => {
    if (groupBy === "priority" && sortBy === "priority") {
      return b.id.localeCompare(a.id);
    }
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
    const sortedTickets = sortTickets(response, sortBy, groupBy);
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
  const tasksWithUsers = addUserToTask(response?.users, response?.tickets);

  for (let label in PRIORITY_COLUMN_LABELS) {
    if (!data[label]) {
      data[label] = [];
    }
    const groupTasks = tasksWithUsers?.filter(
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
  const tasksWithUsers = addUserToTask(response?.users, response?.tickets);
  const users = response?.users;
  const sortedUsers = users?.sort((a, b) => a.name.localeCompare(b.name));

  sortedUsers?.forEach((user) => {
    const { name } = user;
    if (!data[name]) {
      data[name] = [];
    }
    const groupTasks = tasksWithUsers?.filter(
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
  const tasksWithUsers = addUserToTask(response?.users, response?.tickets);

  STATUS_GROUPS.forEach((group) => {
    if (!data[group]) {
      data[group] = [];
    }
    const groupTasks = tasksWithUsers?.filter((task) => task.status === group);
    if (groupTasks) {
      data[group].push(...groupTasks);
    }
  });

  return data;
};

export const setInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value;
};
