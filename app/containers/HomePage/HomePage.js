// @flow
import React, { Component } from 'react';
import { Progress, Row, Col, Statistic, Button, Card, Icon,Tabs,Table,Tag,Divider} from 'antd';
import './HomePage.css';
import {Link, Route} from 'react-router-dom'
import routes from '../../constants/routes';
import { connect } from 'react-redux';
type Props = {};
const { TabPane } = Tabs;

class HomePage extends Component<Props> {


  handleTabChange = (key) => {
  };

  render() {
    const columns = [
      {
        title: '仓库名',
        dataIndex: 'repository',
        key: 'repository',
      },
      {
        title: '文件夹路径',
        key: 'syncPath',
        dataIndex: 'syncPath',

      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: status => (
            <Tag color={status===1?'green':'red'}>
              {status===1?'同步完成':'正在同步'}
            </Tag>
        ),
      },
    ];

    return (
      <div className="container ">
        <Card title="基本信息" bordered={false} className="margin-top" extra={<Link to={routes.SETTING}><Icon type="setting" theme="twoTone"  style={{fontSize:40}}/></Link>}>
          <Row gutter={16}>
            <Col span={4}/>
            <Col span={4}>
              <Statistic title="已同步文件" value={112893}
                         prefix={<Icon type="cloud" theme="twoTone" twoToneColor="#52c41a"/>}/>
            </Col>
            <Col span={8}/>
            <Col span={4}>
              <Statistic title="正在同步文件" value={112893} prefix={<Icon type="sync" spin/>}/>
            </Col>
            <Col span={4}/>
          </Row>
          <Row gutter={16} className="margin-top">
            <Col span={4}/>
            <Col span={4}>
              <Statistic title="剩余时间" value={112893} prefix={<Icon type="clock-circle" theme="twoTone"/>}/>
              <Progress className="margin-top" type="circle" percent={75} format={percent => `${percent} Days`}/>
            </Col>
            <Col span={8}/>
            <Col span={4}>
              <Statistic title="已完成百分比" value={112893}
                         prefix={<Icon type="dashboard" theme="twoTone" twoToneColor="#eb2f96"/>}/>
              <Progress className="margin-top" type="circle" percent={75}/>
            </Col>
            <Col span={4}/>
          </Row>
        </Card>

        <Card  bordered={false} className="margin-top">
          <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane tab="同步列表" key="1">
              <Table columns={columns} dataSource={this.props.settings.syncDirInfo} />
            </TabPane>
            <TabPane tab="日志详情" key="2">
              <div className="padding logContent">
                <p><span>2019/5/29 22:17:22</span> <span>INFO</span> sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}


export default connect(
  state=>{
    return { settings: state.settings}
  },
  {

  }
)(HomePage);
