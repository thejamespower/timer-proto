import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import SuperTimer from './SuperTimer';
import {
  startSuperTimer,
  tickSuperTimer,
  completeSuperTimer,
} from '../../action-creators';

const mapStateToProps = state => ({
  superTimer: state.timers.superTimer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startSuperTimer,
      tickSuperTimer,
      completeSuperTimer,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuperTimer);
