import React, { Component } from 'react';
import './ProviderHome.css';
import { reqUpdateInformation, reqUserInfo,sendRequest } from '../../api'
import storageUtils from '../../utils/storageUtils'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: storageUtils.getUser().email,
      username: storageUtils.getUser().username,
      address: storageUtils.getUser().address,
      postcode: storageUtils.getUser().postcode,
      description: storageUtils.getUser().description,
      isEditing: false,
      activeField: '',
    };
  }

  componentDidMount() {
    const user = storageUtils.getUser();
    const username = user.username; // 替换为实际的用户名

    // fetch(`/user/info?username=${username}`) // 根据后端接口的地址进行调整
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // 将获取到的数据设置到组件状态中
    //     const { email, username, address, postcode, description} = data.userInfo;
    //     this.setState({ email, username, address, postcode, description});
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  }
  
  handleDoubleClick = (field) => {
    this.setState({ isEditing: true, activeField: field });
  };

  handleChange = (e) => {
    this.setState({
      [this.state.activeField]: e.target.value,
    });
  };e

  handleSave = async() => {
    this.setState({ isEditing: false, activeField: '' });
    // 在此处可以进行保存或提交数据的操作
    // let copy = true
    // if(this.state.username!=storageUtils.getUser().name){
    //   try{
    //     let result = await reqUserInfo(this.state.username);
    //   //  const response = JSON.stringify(result.data);
    //     const user = JSON.parse(result.data)
    //     console.log("雪豹" + user.return_obj[0].service.name);
    // }catch{
    //   copy = false
    // }
    if(this.state.username!=storageUtils.getUser().username||this.state.address!=storageUtils.getUser().address||this.state.postcode!=storageUtils.getUser().postcode||this.state.description!=storageUtils.getUser().description){
    const { email, username, address, postcode, description } = this.state;
  // 构建要发送给后端的数据对象
    const updatedInfo = {
    email,
    username,
    address,
    postcode,
    description,
    };
    console.log("雪豹" + email);
    storageUtils.saveUser(updatedInfo)
    let result = await sendRequest(storageUtils.getUser().email,"admin",null,"I have updated my information!","updated account");
    const res = await reqUpdateInformation(email,username,address,postcode,description);//把用户名密码传过去，用了ES6的async，await
    const user = JSON.parse(res.data)
    //const dasd = JSON.stringify(user)
   // console.log("雪豹" + user.msg);
    alert(user.msg)
    //console.log("阿松大"+res[1]);
  }
  };

  render() {
    const { email, username, address, postcode, description, isEditing, activeField } = this.state;

    return (
      <div className="content">
        <div className="welcome-message">
          WELCOME TO FIND A SERVICE
        </div>

        <div className="personal-info">
          <h2>Service Provider Information</h2>
          <div className="info-field">
            <div className="label" onDoubleClick={() => this.handleDoubleClick('username')}>
              <span>Username:</span>
            </div>
            <div className="value">
              {isEditing && activeField === 'username' ? (
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  onBlur={this.handleSave}
                  autoFocus
                />
              ) : (
                <span onDoubleClick={() => this.handleDoubleClick('username')}>{username}</span>
              )}
            </div>
          </div>

          <div className="info-field">
            <div className="label" onDoubleClick={() => this.handleDoubleClick('address')}>
              <span>Address:</span>
            </div>
            <div className="value">
              {isEditing && activeField === 'address' ? (
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={this.handleChange}
                  onBlur={this.handleSave}
                  autoFocus
                  />
                  ) : (
                  <span onDoubleClick={() => this.handleDoubleClick('address')}>{address}</span>
                  )}
                  </div>
                  </div>

                  <div className="info-field">
        <div className="label" onDoubleClick={() => this.handleDoubleClick('postcode')}>
          <span>Postcode:</span>
        </div>
        <div className="value">
          {isEditing && activeField === 'postcode' ? (
            <input
              type="text"
              name="postcode"
              value={postcode}
              onChange={this.handleChange}
              onBlur={this.handleSave}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => this.handleDoubleClick('postcode')}>{postcode}</span>
          )}
        </div>
      </div>

      <div className="info-field">
        <div className="label" onDoubleClick={() => this.handleDoubleClick('description')}>
          <span>Description:</span>
        </div>
        <div className="value">
          {isEditing && activeField === 'description' ? (
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
              onBlur={this.handleSave}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => this.handleDoubleClick('description')}>{description}</span>
          )}
        </div>
      </div>
    </div>
  </div>
);}
}

export default Home;