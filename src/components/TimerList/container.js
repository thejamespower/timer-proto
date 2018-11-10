import { connect } from 'react-redux'

import TimerList from './TimerList'

const mapStateToProps = state => ({
  timers: state.timers.timers,
})

export default connect(
  mapStateToProps,
  null,
)(TimerList)
