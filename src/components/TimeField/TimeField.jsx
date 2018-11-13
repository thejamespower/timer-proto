import React from 'react'
import TimeField from 'react-simple-timefield'
import PropTypes from 'prop-types'

import { yellow800 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconClock from 'material-ui/svg-icons/device/access-time'
import TextField from 'material-ui/TextField'

export default class CustomTimeField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  static defaultProps = {
    onChange: null,
    value: null,
  }

  constructor(...args) {
    super(...args)

    this.state = {
      value: args.value || '00:00:00',
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { value: nextValue } = nextProps
    const { value: stateValue } = this.state
    if (nextValue !== undefined && nextValue !== stateValue) {
      this.setState({ value: nextValue })
    }
  }

  onChange(time) {
    const { value } = this.state
    const newTime = time.replace(/-/g, ':')
    const newTimeSeconds = newTime.padEnd(8, value.substr(5, 3))

    this.setState({ value: newTimeSeconds })
  }

  render() {
    const { value } = this.state

    const muiTheme = getMuiTheme({
      fontFamily: 'Arial',
      palette: {
        primary1Color: yellow800,
      },
      textField: {
        floatingLabelColor: '#666',
      },
    })

    const { onChange = this.onChange } = this.props

    return (
      <section className="container">
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={{ marginRight: 20 }}>
            <IconClock style={{ width: 25, marginRight: 6, marginBottom: -6 }} color="#bbb" />
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
    )
  }
}
