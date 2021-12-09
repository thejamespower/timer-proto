import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TimerCreator from './TimerCreator';
import { createTimer } from '../../action-creators';

const mapStateToProps = null;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createTimer,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(TimerCreator);
