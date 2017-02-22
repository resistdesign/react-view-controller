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
        <div
          style={{ border: 'solid 0.125rem red' }}
        >
          {rvc.getValidationMessage('title')}
        </div>
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
