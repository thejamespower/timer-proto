import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import SuperTimer from './SuperTimer'
import { superTimerStarted } from '../../action-creators'

const mapStateToProps = state => ({
  superTimer: state.timers.superTimer,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  superTimerStarted,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuperTimer)
