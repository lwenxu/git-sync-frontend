import axios from '../utils/http';

export function setSettings(settings) {
  return axios.post('/settings',settings)
}

export function getSettings() {
  return axios.get(`/settings`)
}


export function getSyncDirInfo() {
  return axios.get('/syncDirs');
}

export function setSyncDirInfo(dirInfo) {
  return axios.post('/syncDirs', dirInfo);
}


export function deleteSyncDir(id) {
  return axios.delete(`/syncDirs/id/${id}`)
}
