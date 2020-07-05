# Redux

Redux is a predictable state container for JS Applications. It can be used in conjunction with React. 

Redux offers a tradeoff. It asks you to:

- Describe application state as plain objects and arrays.
- Describe changes in the system as plain objects.
- Describe the logic for handling changes as pure functions. 

These are strong constraints. Thus, one should think carefully before adopting Redux. 



## Installation

```sh
# NPM
npm install redux

# Yarn
yarn add redux
```



### Redux Toolkit

Redux itself is small and unopinionated. We also have a separate addon package called **[Redux Toolkit](https://redux-toolkit.js.org/)**, which includes some opinionated defaults that help you use Redux more effectively. It's our official recommended approach for writing Redux logic.

RTK includes utilities that help simplify many common use cases, including [store setup](https://redux-toolkit.js.org/api/configureStore), [creating reducers and writing immutable update logic](https://redux-toolkit.js.org/api/createreducer), and even [creating entire "slices" of state at once](https://redux-toolkit.js.org/api/createslice).



### Creating a React Redux App

```sh
npx create-react-app my-app --template redux
```



## Core Concepts

### Redux store

A store holds the entire state tree of the application. The only way to change this state tree is to dispatch an action on it. 

Technically, a redux store is just an **object with a few methods**. 

Redux store methods:

- `getState()`
- `dispatch(action)`
- `subscribe(listener)`
- `replaceReducer(nextReducer)`



#### `getState()`

This method returns the current state tree of the application. 

#### `dispatch(action)`

This method dispatches an action, which is an object that indicate state changes. 

#### `subscribe(listener)`

This method adds a change listener, which is essentially a call back function. Whenever an action is dispatched, this callback would be called. 

This is a low-level API and most likely would not be used directly. 



## Sample Code

### Simple Usage with Actions and Reducers

Redux store the whole state of an app in an object tree inside a single store. The only to change the state tree is to emit an **action**, which is an object describing what happen. 

To specify how the actions transform the state tree, we need to write **pure reducers**. 

Instead of mutating the state directly, you specify the mutations you want to happen with plain objects called *actions*. Then you write a special function called a *reducer* to decide how every action transforms the entire application's state.

In a typical Redux app, there is just a single store with a single root reducing function. As your app grows, you split the root reducer into smaller reducers independently operating on the different parts of the state tree. This is exactly like how there is just one root component in a React app, but it is composed out of many small components.



```jsx
import { createStore } from 'redux'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => console.log(store.getState()))

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```



## `react-redux`

### Pure (presentational) component vs container component

The React component is contains only presentation information (i.e., in JSX) can be considered pure or presentational component. 

Connecting that pure component to the Redux store creates a container component, which takes data from the Redux store and render the pure component. 



### `connect()`

This function connects a React component to a Redux store. It provides the connected components:

- The pieces of data it needs from the store
- The functions it can use to dispatch any actions to the store. 

It returns a new, connected component class that wraps the passed in component. In other words, it receives a pure component and return a container component. 

**Signature**:

```js
function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
```

- `mapStateToProps?: (state, ownProps?) => Object`
- `mapDispatchToProps?: Object | (dispatch, ownProps?) => Object`
- `mergeProps?: (stateProps, dispatchProps, ownProps) => Object`
- `options?: Object` : Refer to https://react-redux.js.org/api/connect for details



Example:

```jsx
// The component PureTaskList has `tasks` as one of its properties. The mapStateToProps of connect() takes the state information of tasks in the redux store and uses it to generate a `tasks` property to be used by the the component

// The component PureTaskList has two handlers, namely `onArchieveTask` and `onPinTask`, as its properties. The mapDispatchToProps maps these properties to the dispatch of
export default connect(
        ({ tasks }) => ({
            tasks: tasks.filter(t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
        }),
        dispatch => ({
            onArchiveTask: id => dispatch(archiveTask(id)),
            onPinTask: id => dispatch(pinTask(id)),
        })
    )(PureTaskList);
```

