import React from 'react';
import PropTypes from 'prop-types';

// This task component is a controlled component. Its state and handlers are passed by its parent (i.e., tasklist)
// The only logic that it does is calling the handlers that were passed to it. 
export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
    // Create a div component of the class list-item
    return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
}

Task.propTypes = {
    task: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }),
    onArchiveTask: PropTypes.func,
    onPinTask: PropTypes.func,
  };