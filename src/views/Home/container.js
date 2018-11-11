import { connect } from 'react-redux'

import Home from './Home'

const mapStateToProps = state => ({
  timers: state.timers.timers,
})

export default connect(
  mapStateToProps,
  null,
)(Home)
