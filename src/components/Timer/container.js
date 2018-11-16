import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import Timer from './Timer'
import { deleteTimer, completeTimer } from '../../action-creators'

const mapStateToProps = state => ({
  superTimerActive: state.timers.superTimer.active,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteTimer,
  completeTimer,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer)
