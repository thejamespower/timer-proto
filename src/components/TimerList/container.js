import { connect } from 'react-redux'

import TimerList from './TimerList'

const mapStateToProps = state => ({
  timers: state.timers.timers,
  superTimer: state.timers.superTimer,
})

export default connect(
  mapStateToProps,
  null,
)(TimerList)
