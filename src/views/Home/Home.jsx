import React from 'react';
import { TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TimerCreator from '../../components/TimerCreator';
import TimerList from '../../components/TimerList';

export default class Home extends React.Component {
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '4rem',
        }}
      >
        <div style={{ width: '100%', maxWidth: '50vw' }}>
          <Card style={{ marginBottom: '4rem' }}>
            <CardContent>
              <TextField
                style={{ width: '100%' }}
                id="item-name"
                label="Name"
                value={this.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TimerCreator name={name} />
            </CardContent>
          </Card>
          <TimerList />
        </div>
      </div>
    );
  }
}
