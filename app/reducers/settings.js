import {
  SAVE_ACCOUNT_INFO,
  GET_ACCOUNT_INFO,
  SAVE_SYNC_DIR_INFO,
  GET_SYNC_DIR_INFO,
  UPDATE_SYNC_STATUS,
  UPDATE_SYNCING_FILES,
  UPDATE_SUCCESS_COUNT,
  UPDATE_FAILED_COUNT
} from '../actions/settings';

let initVal = {
  accountInfo: {
    id: '',
    gitPath: '',
    sshKey: ''
  },
  syncDirInfo: [
    {
      id: '',
      syncPath: '',
      repository: '',
      syncRule: '',
      status: 1
    }
  ],
  syncingFiles: [],
  successCount: 0,
  failedCount: 0
};

export default function settings(state = initVal, action) {
  switch (action.type) {
    case SAVE_ACCOUNT_INFO:
      return { ...state, accountInfo: action.payload };
    case SAVE_SYNC_DIR_INFO:
      return { ...state, syncDirInfo: action.payload };
    case GET_ACCOUNT_INFO:
      return state.accountInfo;
    case GET_SYNC_DIR_INFO:
      return state.accountInfo;
    case UPDATE_SYNC_STATUS:
      let { syncDirInfo } = state;
      let index = syncDirInfo.findIndex(item => item.id === action.payload.id);
      syncDirInfo.splice(index, 1, action.payload);
      state.syncDirInfo = syncDirInfo;
      return { ...state };
    case UPDATE_SYNCING_FILES:
      return { ...state, syncingFiles: action.payload };
    case UPDATE_SUCCESS_COUNT:
      return { ...state, successCount: action.payload };
    case UPDATE_FAILED_COUNT:
      return { ...state, failedCount: action.payload };
    default:
      return state;
  }
};
