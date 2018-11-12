import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import Timer from './Timer'
import { timerDeleted } from '../../action-creators'

const mapStateToProps = null

const mapDispatchToProps = dispatch => bindActionCreators({
  timerDeleted,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer)
