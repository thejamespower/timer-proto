import React from 'react';
import { TextField } from '@material-ui/core';
import TimerCreator from '../../components/TimerCreator';
import TimerList from '../../components/TimerList';

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
    };
  }

  handleChange(name) {
    return event => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <TextField
          id="item-name"
          label="Name"
          value={this.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TimerCreator name={name} />
        <TimerList />
      </div>
    );
  }
}
