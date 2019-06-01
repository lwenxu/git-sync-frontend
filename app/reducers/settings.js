import { SAVE_ACCOUNT_INFO, GET_ACCOUNT_INFO, SAVE_SYNC_DIR_INFO, GET_SYNC_DIR_INFO ,UPDATE_SYNC_STATUS} from '../actions/settings';

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
  ]
};

export default function settings(state= initVal, action) {
  switch (action.type) {
    case SAVE_ACCOUNT_INFO:
      return {...state,accountInfo : action.payload};
    case SAVE_SYNC_DIR_INFO:
      return {...state,syncDirInfo : action.payload};
    case GET_ACCOUNT_INFO:
      return state.accountInfo;
    case GET_SYNC_DIR_INFO:
      return state.accountInfo;
    case UPDATE_SYNC_STATUS:
      let { syncDirInfo } = state;
      let index = syncDirInfo.findIndex(item => item.id === action.payload.id);
      syncDirInfo.splice(index, 1, action.payload);
      return { ...state, syncDirInfo };
    default:
      return state;
  }
};
