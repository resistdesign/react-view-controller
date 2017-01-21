import React, { Component, PropTypes } from 'react';
import RVC from './ReactViewController';
import Project from './Project';

const CONTACT_META = {
  name: '',
  phone: {
    country: 0,
    area: 0,
    local: 0,
    id: ''
  },
  projects: [
    {
      title: '',
      description: '',
      date: ''
    }
  ]
};

export default class RVCDemo extends Component {
  static propTypes = {};

  rvc;

  constructor () {
    super();

    this.rvc = new RVC({
      meta: CONTACT_META,
      data: this.state.contact,
      onChange: (contact) => {
        this.setState({
          contact
        });
      }
    });
  }

  state = {
    contact: {}
  };

  renderPhone (ctrl) {
    if (ctrl) {
      const sc = ctrl.getSubControllers();

      return (
        <div>
          <h3>
            Phone:
          </h3>
          <input
            type='number'
            placeholder='Country Code'
            value={sc.country.value}
            onChange={event => sc.country.onChange(event.target.value)}
          />
          <br />
          <br />
          <input
            type='number'
            placeholder='Area Code'
            value={sc.area.value}
            onChange={event => sc.area.onChange(event.target.value)}
          />
          <br />
          <br />
          <input
            type='number'
            placeholder='Local Code'
            value={sc.local.value}
            onChange={event => sc.local.onChange(event.target.value)}
          />
          <br />
          <br />
          <input
            type='number'
            placeholder='ID Code'
            value={sc.id.value}
            onChange={event => sc.id.onChange(event.target.value)}
          />
        </div>
      );
    }
  }

  renderFullPhoneNumber (phone) {
    if (phone) {
      return (
        <span>
          +{phone.country} {phone.area}-{phone.local}-{phone.id}
        </span>
      );
    }
  }

  renderProject (ctrl, index) {
    if (ctrl) {
      return (
        <Project
          key={`Project:${ctrl.data.title}:${index}`}
          rvc={ctrl}
          onRemove={() => this.rvc.removeItemFromArray('projects', index)}
        />
      );
    }
  }

  renderProjectList (ctrls) {
    if (ctrls instanceof Array) {
      return ctrls.map((ctrl, index) => this.renderProject(ctrl, index));
    }
  }

  render () {
    const { contact } = this.state;
    const subControllers = this.rvc.getSubControllers();

    return (
      <div>
        <h1>
          RVCDemo
        </h1>
        <h3>
          Name
        </h3>
        <input
          type='text'
          placeholder='Name'
          value={subControllers.name.value}
          onChange={event => subControllers.name.onChange(event.target.value)}
        />
        <hr />
        <div>
          Phone Country
          Code: {this.renderFullPhoneNumber(contact && contact.phone)}
        </div>
        {this.renderPhone(subControllers.phone)}
        <hr />
        <h3>
          Projects
        </h3>
        {this.renderProjectList(subControllers.projects)}
        <button
          onClick={() => this.rvc.addItemToArray('projects', {})}
        >
          + Add a Project
        </button>
      </div>
    );
  }
}
