import React, { Component } from 'react';
import { Icon, Card, Form, Input, Upload, Button } from 'antd';
import { setSettings,getSettings } from '../../api';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import { addOrUpdateAccountInfo } from '../../actions/settings';
import { connect } from 'react-redux';


class SystemSettings extends Component {
  componentDidMount = () => {
    const { setFields } = this.props.form;
    let obj = {};
    for (let k in this.props.accountInfo) {
      obj[k]={value: this.props.accountInfo[k]}
    }
    setFields(obj);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addOrUpdateAccountInfo({...this.props.accountInfo,type:"github",...values});
      }
    });
  };

  handleSetGitDir = (file) => {
    const { setFields } = this.props.form;
    setFields({
      gitPath: { value: file.path }
    });
    return false;
  };

  render() {
    const { getFieldDecorator} = this.props.form;
    return (
      <div>
        <Card title="系统设置" bordered={false} className="margin-top"
              extra={<Link to={routes.HOME}><Icon type="arrow-left" style={{ fontSize: 32 }}/></Link>}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Git 路径">
              {getFieldDecorator('gitPath', {
                rules: [{ required: true, message: 'Git 路径必须填写' }]
              })(<Input addonAfter={
                <Upload style={{cursor:"pointer"}} showUploadList={false} directory={false} multiple={false} beforeUpload={this.handleSetGitDir}>
                  <Icon type="plus-circle" theme="twoTone" /><span style={{marginLeft:5}}> 选择文件夹</span>
                </Upload>
              }/>)}
            </Form.Item>
            <Form.Item label="ssh-key">
              {getFieldDecorator('sshKey', {
                rules: [{ required: true, message: 'ssh-key必须填写' }]
              })(<Input.TextArea rows={6}/>)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交系统配置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}


export default connect(
  state=>{
    return {accountInfo:state.settings.accountInfo}
  },
  {addOrUpdateAccountInfo}
)(Form.create({ name: 'SyncDirSettings' })(SystemSettings));
