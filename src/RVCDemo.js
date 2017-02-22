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
  ],
  emails: [
    ''
  ]
};
const CONTACT_VALIDATION = {
  name: (value) => {
    if (typeof value !== 'string' || value === '') {
      throw new Error('Invalid name.');
    }
  },
  phone: {
    country: (value) => {
      if (String(Number(value)) === 'NaN' || value === '') {
        throw new Error('Invalid country code.');
      }
    }
  },
  projects: [
    {
      title: (value) => {
        if (typeof value !== 'string' || value === '') {
          throw new Error('Invalid title.');
        }
      }
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
      validation: CONTACT_VALIDATION,
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

  renderPhone (ctrl, contact) {
    if (ctrl) {
      const sc = ctrl.getSubControllers();

      return (
        <div>
          <h3>
            Phone: ({this.renderFullPhoneNumber(contact && contact.phone)})
          </h3>
          <input
            type='number'
            placeholder='Country Code'
            value={sc.country.value}
            onChange={event => sc.country.onChange(event.target.value)}
          />
          <div
            style={{ border: 'solid 0.125rem red' }}
          >
            {ctrl.getValidationMessage('country')}
          </div>
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
          key={`Project:${index}`}
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
    const sc = this.rvc.getSubControllers();

    return (
      <div>
        <h1>
          RVCDemo
        </h1>
        <h3>
          Name:
        </h3>
        <input
          type='text'
          placeholder='Name'
          value={sc.name.value || ''}
          onChange={event => sc.name.onChange(event.target.value)}
        />
        <div
          style={{ border: 'solid 0.125rem red' }}
        >
          {this.rvc.getValidationMessage('name')}
        </div>
        <hr />
        {this.renderPhone(sc.phone, contact)}
        <hr />
        <h3>
          Projects:
        </h3>
        {this.renderProjectList(sc.projects)}
        <button
          onClick={() => this.rvc.addItemToArray('projects', {})}
        >
          + Add a Project
        </button>
        <hr />
        <h3>
          Emails: ({contact.emails && contact.emails.join(', ')})
        </h3>
        {sc.emails.map((ctrl, index) => {
          return (
            <div
              key={`Email:${index}`}
            >
              <input
                type='email'
                value={ctrl.data}
                onChange={event => ctrl.setData(event.target.value)}
                autoFocus
              />
              <button
                onClick={() => this.rvc.removeItemFromArray('emails', index)}
              >
                - Remove
              </button>
              <br />
              <br />
            </div>
          );
        })}
        <button
          onClick={() => this.rvc.addItemToArray('emails', '')}
        >
          + Add an Email
        </button>
      </div>
    );
  }
}
