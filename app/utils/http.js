import axios from 'axios';
import config from '../config/config';
import { notification } from 'antd';

const http = axios.create({
  baseURL: config.baseUrl,  // api的base_url
  timeout: 5000  // 请求超时时间
});

const openNotificationWithIcon = (type,message,description) => {
  notification[type]({
    message,
    description
  });
};

http.interceptors.request.use(config => {
  return config;
}, error => {  //请求错误处理
  Promise.reject(error)
});

http.interceptors.response.use(
  response => {  //成功请求到数据
    //这里根据后端提供的数据进行对应的处理
    if (response.data.code === 200) {
      openNotificationWithIcon('success','成功',response.data.msg);
    }else {
      openNotificationWithIcon('error','失败',response.data.msg);
    }
    return response.data;
  },
  error => {  //响应错误处理
    return Promise.reject(error)
  }
);



export default http;
