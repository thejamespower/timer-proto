import React from 'react';
import TimeField from 'react-simple-timefield';
import PropTypes from 'prop-types';

import { yellow800 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconClock from 'material-ui/svg-icons/device/access-time';
import TextField from 'material-ui/TextField';

export default function CustomTimeField(props) {
  const muiTheme = getMuiTheme({
    fontFamily: 'Arial',
    palette: {
      primary1Color: yellow800,
    },
    textField: {
      floatingLabelColor: '#666',
    },
  });

  const { onChange, value } = props;

  return (
    <section className="container">
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ marginRight: 20 }}>
          <IconClock
            style={{ width: 25, marginRight: 6, marginBottom: -6 }}
            color="#bbb"
          />
          <TimeField
            showSeconds
            value={value}
            onChange={onChange}
            style={{ width: 82, fontSize: 20 }}
            input={<TextField floatingLabelFixed floatingLabelText="Time" />}
          />
        </div>
      </MuiThemeProvider>
    </section>
  );
}

CustomTimeField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

CustomTimeField.defaultProps = {
  onChange: null,
  value: null,
};
