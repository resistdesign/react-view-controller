import React, { Component, PropTypes as T } from 'react';

export default class Project extends Component {
  static propTypes = {
    rvc: T.object,
    onRemove: T.func
  };

  constructor () {
    super();
  }

  render () {
    const {
      rvc,
      onRemove
    } = this.props;
    const sc = rvc.getSubControllers();

    return (
      <div>
        <input
          type='text'
          placeholder='Title'
          value={sc.title.value}
          onChange={event => sc.title.onChange(event.target.value)}
          autoFocus
        />
        <button
          onClick={onRemove}
        >
          - Remove
        </button>
        <br />
        <br />
      </div>
    );
  }
}
