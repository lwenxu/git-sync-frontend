import React, { Component } from 'react';
import { Icon, Card, Form, Input, InputNumber, Upload, Button } from 'antd';
import { setSettings } from '../../api';
import { Link, Route } from 'react-router-dom';
import routes from '../../constants/routes';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { addOrUpdateSyncDir, deleteSync } from '../../actions/settings';
import SyncDirSettings from '../SyncDirSettings';


const { TabPane } = Tabs;

class SyncDirList extends Component {


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setSettings(values);
      }
    });
  };

  render() {
    let { syncInfos } = this.props;
    let syncs = [...syncInfos, { repository: '添加同步' }];
    return (
      <div>
        <Card title="系统设置" bordered={false} className="margin-top"
              extra={<Link to={routes.HOME}><Icon type="arrow-left" style={{ fontSize: 32 }}/></Link>}>
          <Tabs tabPosition="left">
            {
              syncs.map((dir, index) => {
                return (
                  <TabPane tab={dir.repository} key={dir.repository}>
                    <SyncDirSettings dirInfo={dir} addOrUpdateSyncDir={this.props.addOrUpdateSyncDir}
                                     deleteSync={this.props.deleteSync}/>
                  </TabPane>
                );
              })
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default Form.create({ name: 'SyncDirList' })(connect(
  state => {
    return { syncInfos: state.settings.syncDirInfo };
  },
  { addOrUpdateSyncDir, deleteSync }
)(SyncDirList));
