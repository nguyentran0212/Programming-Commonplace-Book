# Storybook

Storybook is a tool to design and develop UI components in isolation from the business logic and context of application itself. 

## Installation and Setup

This procedure is for React. 

```sh
# Create our application:
npx create-react-app taskbox

cd taskbox

# Add Storybook:
npx -p @storybook/cli sb init
```



Checking and starting up both the application and the storybook software:

```sh
# Run the test runner (Jest) in a terminal:
yarn test --watchAll

# Start the component explorer on port 9009:
yarn storybook

# Run the frontend app proper on port 3000:
yarn start
```



## Configurations of Storybook

Configurations of Storybook is inside the `.storybook/` as follows:

```js
// .storybook/main.js

module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
};
```



There is an optional file `preview.js` that can be used to specify the type of css file to the used when rendering the component:

```js
// .storybook/preview.js

import '../src/index.css';
```



After changing, we need to restart the Storybook server. 



## Development with Storybook

Storybook allows building UI in a **component-driven development** approach. It starts with components and ends with screens. This approach helps dealing with the complexity emerging from UI development. 

Another approach that influences the procedure is Test-Driven Development, in which Storybook first facilitates the development of test states of the UI component, and then we will build the component in isolation using the mocked data. Each test state in Storybook is called a **story**. 

Sample code of a component and its corresponding story file:

```jsx
// src/components/Task.js

import React from 'react';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className="list-item">
      <input type="text" value={title} readOnly={true} />
    </div>
  );
}
```

```jsx
// src/components/Task.stories.js

import React from 'react';
import { action } from '@storybook/addon-actions';

import Task from './Task';

// This default export tells the storybook app of the set of test case (i.e., stories) being described here
export default {
  component: Task,
  title: 'Task',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// This is mocked data
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

// A test case (i.e., story)
export const Default = () => <Task task={{ ...taskData }} {...actionsData} />;

// Another test case
export const Pinned = () => <Task task={{ ...taskData, state: 'TASK_PINNED' }} {...actionsData} />;

// Another test case
export const Archived = () => (
  <Task task={{ ...taskData, state: 'TASK_ARCHIVED' }} {...actionsData} />
);
```



### Story

A story is simply a function that returns a rendered React component (i.e., a component with a set of props) in a given state. 

The `action()` provided by Storybook allows us to create a callback that appears in the action panel of the Storybook UI when we click on the button. So, if we click on the button, and if the button is supposed to be clicked, then it should appear on the action panel. This is how we do the UI testing. 



### Snapshot testing

Snapshot testing is the practice of recording "known good" output of a component for a given input, and then flagging the component whenever the output changes in the future. This is a quick way to identify the new version of a component and checkout the changes. 

Make sure that the data that the component uses to render does not change all the time. 

In storybook, snapshot testing is done with the `Storyshots` addon. The procedure is as follow:

1. Install the `Storyshots` addon
2. Create the file `src/storybook.test.js`
3. Configure the file `src/storybook.test.js`
4. Use `yarn test` to see the results. 



After doing all of this, the current state of component's stories is saved as snapshots. Any changes to these states will case the test to fail, thus notifying us to the changes. 



Installation of the addon:

```sh
yarn add -D @storybook/addon-storyshots react-test-renderer
```



Configure:

```js
// src/storybook.test.js

import initStoryshots from '@storybook/addon-storyshots';
initStoryshots();
```



### Automated Testing with Jest

We can use Jest to render the story to the DOM, and run some DOM querying code to verify salient features of the output, such as one element is render before other elements. 





## Miscs.

### Decorators

A decorator allows adding arbitrary code around the story. In the following example, a decorator was used to add a padding around the story. 

Remember that `story()` is a function that returns a React component.



**Example**:

```jsx
// Notice the decorators
export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  excludeStories: /.*Data$/,
};
```



### Knobs add-on

Knobs allows Storybook users to edit props dynamically in the Storybook UI. 

#### Installation

First, add knobs to the dependencies of the project

```sh
yarn add -D @storybook/addon-knobs
```

Then, configure knobs in the storybook configuration

```js
// .storybook/main.js

module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
  ],
};
```

Finally, restart the storybook server



#### Usage

First, import object knob type and decorator

```js
// src/components/Task.stories.js

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';
```

Next, add knob decorator into the configuration of the stories

```js
// src/components/Task.stories.js

export default {
  component: Task,
  title: 'Task',
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};
```

Lastly, integrate object knob type with the props of the component:

```js
// src/components/Task.stories.js

export const Default = () => {
  return <Task task={object('task', { ...taskData })} {...actionsData} />;
};
```



The `knob` object accepts a label and a default object as parameters. This default object would show up on the storybook screen and allow us to change its content dynamically in at run time. 