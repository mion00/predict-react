/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import {CHANGE_VISIBLE_LOG, logInfoRequested} from '../actions/LogActions';

const checkIfNoTraces = (logName, state) => {
  const first = state.logs.logs.find((log) => log.name === logName);
  return first !== undefined && Object.keys(first.traces).length === 0;
};

const infoPayload = (logName, infoType) => {
  return {logName, infoType};
};

// Download logs for visible log if needed
const logMiddleware = (store) => (next) => (action) => {
  if (action.type === CHANGE_VISIBLE_LOG && action.payload.requestInfo) {
    if (checkIfNoTraces(action.payload.logName, store.getState())) {
      store.dispatch(logInfoRequested(infoPayload(action.payload.logName, 'events')));
      store.dispatch(logInfoRequested(infoPayload(action.payload.logName, 'resources')));
      store.dispatch(logInfoRequested(infoPayload(action.payload.logName, 'traces')));
    }
  }
  return next(action);
};

export default logMiddleware;
