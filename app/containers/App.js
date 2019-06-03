// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import {
  getAccountInfo,
  getCountInfo,
  getSyncDirInfos, updateFailedCount, updateSuccessCount,
  updateSyncingFiles,
  updateSyncStatus
} from '../actions/settings';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import config from '../config/config';

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  componentDidMount = () => {
    // 获取配置信息
    this.props.getAccountInfo();
    this.props.getSyncDirInfos();
    this.props.getCountInfo();
    let socket = new WebSocket(`${config.wsUrl}/ws`);
    socket.onmessage = ({data}) => {
      let originData = JSON.parse(data);
      data = originData['data'];
      console.log(data);
      switch (originData.type) {
        case 'sync_status_change':
          this.props.updateSyncStatus(data);
          break;
        case 'syncing_files':
          this.props.updateSyncingFiles(data);
          break;
        case 'sync_success':
          this.props.updateSuccessCount(data);
          break;
        case 'sync_failed':
          this.props.updateFailedCount(data);
          break;
      }
    };
  };

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default connect(
  state=>{return {info:state}},
  {getAccountInfo,getSyncDirInfos,updateSyncStatus,getCountInfo,updateSyncingFiles, updateSuccessCount, updateFailedCount}
)(App);
