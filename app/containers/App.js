// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getAccountInfo, getSyncDirInfos, updateSyncStatus } from '../actions/settings';
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
    let socket = new WebSocket(`${config.wsUrl}/ws`);
    socket.onmessage = ({data}) => {
      let originData = JSON.parse(data);
      let syncInfo = originData['data'];
      switch (originData.type) {
        case 'sync_status_change':
          this.props.updateSyncStatus(syncInfo);
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
  {getAccountInfo,getSyncDirInfos,updateSyncStatus}
)(App);
