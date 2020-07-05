// src/components/TaskList.js

import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';
import { connect } from 'react-redux';
// Note that these are the creator function of redux library
import { archiveTask, pinTask } from '../lib/redux';

export function PureTaskList({ loading, tasks, onPinTask, onArchiveTask }) {
    // Are these "events" actually callback functions?
    const events = {
        onPinTask,
        onArchiveTask,
    };

    // If the tasklist is still loading, then load the loading interface
    const LoadingRow = (
        <div className="loading-item">
          <span className="glow-checkbox" />
          <span className="glow-text">
            <span>Loading</span> <span>cool</span> <span>state</span>
          </span>
        </div>
      );
    
    if (loading) {
        return (
            <div className="list-items">
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        );
    }



    // If the tasklist is empty, then load the empty tasklist interface
    if (tasks.length === 0) {
        return (
            <div className="list-items">
                <div className="wrapper-message">
                    <span className="icon-check" />
                    <div className="title-message">You have no tasks</div>
                    <div className="subtitle-message">Sit back and relax</div>
                </div>
            </div>
        );
    }

    // tasks.filter creates a new array of task objects that match the condition
    // the ... spread this array into its component objects and place these objects into the tasksInOrder array
    const tasksInOrder = [
        ...tasks.filter(t => t.state === 'TASK_PINNED'),
        ...tasks.filter(t => t.state !== 'TASK_PINNED'),
      ];

    // Otherwise, load the proper one
    // List item consists of an array of task items
    // Each task is a component, which receives event handler and display information via props
    return (
        <div className="list-items">
            {tasksInOrder.map(task => (
            <Task key={task.id} task={task} {...events} />
            ))}
        </div>
    );
}

PureTaskList.propTypes = {
    loading: PropTypes.bool,
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
    onPinTask: PropTypes.func.isRequired,
    onArchiveTask: PropTypes.func.isRequired,
};
  
PureTaskList.defaultProps = {
    loading: false,
};

// In the first parameter of connect(), we map the state `tasks` in the redux store to the property `tasks` of the PureTaskList
// In the second parameters, we passes two Redux action generators archiveTask(id) and pinTask(id) to the property onAchiveTask and onPinTask, which are handlers
// In other words, the handlers are dispatch() actions that change the state of the tasks stored in the redux store
// Noted that each Task component has an id, and when this component calls the handler, it passes its id, thus the onArchiveTask would have id as its parameter.
export default connect(
        ({ tasks }) => ({
            tasks: tasks.filter(t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
        }),
        dispatch => ({
            onArchiveTask: id => dispatch(archiveTask(id)),
            onPinTask: id => dispatch(pinTask(id)),
        })
    )(PureTaskList);