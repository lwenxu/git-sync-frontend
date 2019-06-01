import React, { Component } from 'react';
import { Icon, Card, Form, Input, InputNumber, Upload, Button } from 'antd';
import { setSettings } from '../../api';
import { Link, Route } from 'react-router-dom';
import routes from '../../constants/routes';
import { addOrUpdateSyncDir } from '../../actions/settings';
import { connect } from 'react-redux';

class SyncDirSettings extends Component {

  componentDidMount = () => {
    const { setFields } = this.props.form;
    let obj = {};
    for (let k in this.props.dirInfo) {
      obj[k] = { value: this.props.dirInfo[k] };
    }
    setFields(obj);
  };


  handleAddSyncDir = (file, fileList) => {
    const { setFields } = this.props.form;
    setFields({
      syncPath: { value: file.path }
    });
    return false;
  };

  handleDelete = () => {
    this.props.dirInfo.id && this.props.deleteSync(this.props.dirInfo.id);
    // const { setFields } = this.props.form;
    // setFields({});
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addOrUpdateSyncDir({ ...this.props.dirInfo, status: 1, ...values });
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue, setFields } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="仓库名称">
            {getFieldDecorator('repository', {
              rules: [{ required: true, message: '仓库名称必须填写' }]
            })(<Input placeholder="如 /lwenxu/sync.git "/>)}
          </Form.Item>
          <Form.Item label="同步规则（*星期  *年  *月  *天  *分钟  *秒）">
            {getFieldDecorator('syncRule', {
              rules: [{ required: true, message: '同步规则必须填写' }],
              initialValue: "* * * * *"
            })(<Input />)}
          </Form.Item>
          <Form.Item label="同步文件夹">
            {getFieldDecorator('syncPath', {
              rules: [{ required: true, message: '同步文件夹必须填写' }]
            })(<Input addonAfter={
              <Upload showUploadList={false} directory={true} multiple={false} beforeUpload={this.handleAddSyncDir}>
                <Icon type="plus-circle" theme="twoTone"/><span style={{ marginLeft: 5 }}> 选择文件夹</span>
              </Upload>
            }/>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存同步配置
            </Button>
            <Button type="danger" onClick={this.handleDelete} className="margin-left">
              删除配置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'SyncDirSettings' })(SyncDirSettings);
