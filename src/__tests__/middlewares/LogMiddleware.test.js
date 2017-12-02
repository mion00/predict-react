/**
 * Created by tonis.kasekamp on 10/16/17.
 */
import logMiddleware from '../../middlewares/LogMiddleware';
import {changeVisibleLog, logInfoRequested} from '../../actions/LogActions';

const store = {
  dispatch: jest.fn(),
  getState: jest.fn(() => {
    return {logs: {logs: []}};
  })
};
const next = jest.fn();

describe('LogMiddleware', () => {
  afterEach(() => {
    store.dispatch.mockClear();
  });

  it('does nothing for other actions', () => {
    logMiddleware(store)(next)({type: 'AA'});

    expect(store.dispatch.mock.calls.length).toEqual(0);
  });

  describe('change visible', () => {
    const defaultRequest = {logId: 1, requestInfo: true};
    it('does nothing if requestInfo is false', () => {
      logMiddleware(store)(next)(changeVisibleLog({logId: 1, requestInfo: false}));

      expect(store.dispatch.mock.calls.length).toEqual(0);
    });

    it('does nothing if log is undefined', () => {
      logMiddleware(store)(next)(changeVisibleLog(defaultRequest));

      expect(store.dispatch.mock.calls.length).toEqual(0);
    });

    it('does nothing if log already has events', () => {
      store.getState = jest.fn(() => {
        return {logs: {logs: [{id: 1, events: [{}]}]}};
      });
      logMiddleware(store)(next)(changeVisibleLog(defaultRequest));

      expect(store.dispatch.mock.calls.length).toEqual(0);
    });

    it('requests all data types if needed', () => {
      store.getState = jest.fn(() => {
        return {logs: {logs: [{id: 1, events: []}]}};
      });
      logMiddleware(store)(next)(changeVisibleLog(defaultRequest));

      expect(store.dispatch.mock.calls[0][0]).toEqual(logInfoRequested({'infoType': 'events', 'logId': 1}));
      expect(store.dispatch.mock.calls[1][0]).toEqual(logInfoRequested({'infoType': 'resources', 'logId': 1}));
      expect(store.dispatch.mock.calls[2][0]).toEqual(logInfoRequested({'infoType': 'executions', 'logId': 1}));
    });
  });
});
