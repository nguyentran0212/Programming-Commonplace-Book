// src/components/TaskList.stories.js

import React from 'react';

import { PureTaskList } from './TaskList';
import { taskData, actionsData } from './Task.stories'; // Importing property data and event handler functions from the other file

export default {
  component: PureTaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  excludeStories: /.*Data$/,
};

// This is a smart way of reusing the property data from other file.
// This list is the list of tasks without any pin
export const defaultTasksData = [
  { ...taskData, id: '1', title: 'Task 1' },
  { ...taskData, id: '2', title: 'Task 2' },
  { ...taskData, id: '3', title: 'Task 3' },
  { ...taskData, id: '4', title: 'Task 4' },
  { ...taskData, id: '5', title: 'Task 5' },
  { ...taskData, id: '6', title: 'Task 6' },
];

// This is the list of task with one item pinned
export const withPinnedTasksData = [
  ...defaultTasksData.slice(0, 5),
  { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
];

// 4 stories. 
// Again, remember that a story is a function that generate a pre-render component
export const Default = () => <PureTaskList tasks={defaultTasksData} {...actionsData} />;

export const WithPinnedTasks = () => <PureTaskList tasks={withPinnedTasksData} {...actionsData} />;

export const Loading = () => <PureTaskList loading tasks={[]} {...actionsData} />;

export const Empty = () => <PureTaskList tasks={[]} {...actionsData} />;