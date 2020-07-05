// src/components/Task.stories.js
// This story file is kind of like a test case for the component

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';

// Load the component to be tested
import Task from './Task';

// These exports are details of the story
export default {
  component: Task,
  title: 'Task',
  // Our exports that end in "Data" are not stories.
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

// taskData and actionsData are not part of the story. They are just there to configure the component
export const taskData = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

// the ... operator here spreads the taskData object into id: '1', title: "Test Task", etc. 
// Each these exports seems to be a test case.

// export const Default = () => <Task task={{ ...taskData }} {...actionsData} />;
export const Default = () => {
  return <Task task={object('task', { ...taskData })} {...actionsData} />;
};

export const Pinned = () => <Task task={{ ...taskData, state: 'TASK_PINNED' }} {...actionsData} />;

export const Archived = () => (
  <Task task={{ ...taskData, state: 'TASK_ARCHIVED' }} {...actionsData} />
);