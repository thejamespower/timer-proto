import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TimerCreator from './TimerCreator'
import { createdTimer } from '../../action-creators'

const mapStateToProps = null

const mapDispatchToProps = dispatch => bindActionCreators({
  createdTimer,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerCreator)
