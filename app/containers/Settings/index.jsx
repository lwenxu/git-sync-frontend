import React, { Component } from 'react';
import { Icon, Card, Form, Input, InputNumber, Upload, Button } from 'antd';
import { setSettings, getSettings } from '../../api/index';
import SystemSettings from '../../components/SystemSettings';
import SyncDirList from '../../components/SyncDirList';

class Settings extends Component {
  render() {
    return (
      <div className="container">
          <SystemSettings/>
          <SyncDirList/>
      </div>
    );
  }
}

export default Settings;
