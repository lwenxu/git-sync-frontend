// @flow
import type { GetState, Dispatch } from '../reducers/types';
import {getSyncDirInfo,setSyncDirInfo,setSettings,getSettings,deleteSyncDir,reqCountInfo} from '../api/index';

export const SAVE_ACCOUNT_INFO = 'SAVE_ACCOUNT_INFO';
export const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';
export const SAVE_SYNC_DIR_INFO = 'SAVE_SYNC_DIR_INFO';
export const GET_SYNC_DIR_INFO = 'GET_SYNC_DIR_INFO';
export const UPDATE_SYNC_STATUS = 'UPDATE_SYNC_STATUS';
export const UPDATE_SYNCING_FILES = 'UPDATE_SYNCING_FILES';
export const UPDATE_SUCCESS_COUNT = 'UPDATE_SUCCESS_COUNT';
export const UPDATE_FAILED_COUNT = 'UPDATE_FAILED_COUNT';


export function saveAccountInfo(payload) {
  return {
    type: SAVE_ACCOUNT_INFO,
    payload
  }
}

export function saveSyncDirInfo(payload) {
  return {
    type: SAVE_SYNC_DIR_INFO,
    payload
  }
}


export function deleteSync(id) {
  return dispatch=>{
    id&&deleteSyncDir(id).then(res=>{
      if (res.code === 200) {
        dispatch(getSyncDirInfos());
      }
    })
  }
}

export function addOrUpdateSyncDir(info) {
  return dispatch=>{
    setSyncDirInfo(info).then(res=>{
      if (res.code === 200) {
        dispatch(getSyncDirInfos())
      }
    })
  }
}

export function addOrUpdateAccountInfo(info) {
  return dispatch=>{
    setSettings(info).then(res=>{
      if (res.code === 200) {
        dispatch(saveAccountInfo(res.data));
      }
    })
  }
}

export function getAccountInfo() {
  return dispatch=>{
    getSettings().then(res=>{
      if (res.code === 200) {
        dispatch(saveAccountInfo(res.data))
      }
    })
  }
}

export function getSyncDirInfos() {
  return dispatch=>{
    getSyncDirInfo().then(res=>{
      if (res.code === 200) {
        dispatch(saveSyncDirInfo(res.data))
      }
    })
  }
}


export function updateSyncStatus(jobInfo) {
  if (!jobInfo.status) {
    updateSyncingFiles([]);
  }
  return {
    type:UPDATE_SYNC_STATUS,
    payload: jobInfo
  };
}

export function updateSyncingFiles(payload) {
  return {
    type:UPDATE_SYNCING_FILES,
    payload
  }
}
export function updateSuccessCount(payload) {
  return {
    type:UPDATE_SUCCESS_COUNT,
    payload
  }
}
export function updateFailedCount(payload) {
  return {
    type:UPDATE_FAILED_COUNT,
    payload
  }
}

export function getCountInfo() {
  return dispatch=>{
        reqCountInfo().then(res=>{
          if (res.code === 200) {
            dispatch(updateSuccessCount(res.data.successCount));
            dispatch(updateFailedCount(res.data.failedCount));
          }
        })
  }
}
