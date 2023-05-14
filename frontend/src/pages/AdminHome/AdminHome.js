import React, { Component } from 'react';
import './AdminHome.css';
import { reqUpdateInformation } from '../../api'
import storageUtils from '../../utils/storageUtils'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'johndoe@example.com',
      username: 'johndoe123',
      address: '123 Main St',
      postcode: '12345',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      isEditing: false,
      activeField: '',
    };
  }

  componentDidMount() {
    const user = storageUtils.getUser();
    const username = user.username; // 替换为实际的用户名

    fetch(`/user/info?username=${username}`) // 根据后端接口的地址进行调整
      .then((response) => response.json())
      .then((data) => {
        // 将获取到的数据设置到组件状态中
        const { email, username, address, postcode, description} = data.userInfo;
        this.setState({ email, username, address, postcode, description});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  handleDoubleClick = (field) => {
    this.setState({ isEditing: true, activeField: field });
  };

  handleChange = (e) => {
    this.setState({
      [this.state.activeField]: e.target.value,
    });
  };

  handleSave = async() => {
    this.setState({ isEditing: false, activeField: '' });
    // 在此处可以进行保存或提交数据的操作
    const { email, username, address, postcode, description } = this.state;
  
  // 构建要发送给后端的数据对象
    const updatedInfo = {
    email,
    username,
    address,
    postcode,
    description,
    };
    const res = await reqUpdateInformation(updatedInfo);//把用户名密码传过去，用了ES6的async，await
    console.log(res);
    console.log('Saved!');
  };

  render() {
    const { email, username, address, postcode, description, isEditing, activeField } = this.state;

    return (
      <div className="content">
        <div className="welcome-message">
          WELCOME TO FIND A SERVICE
        </div>

        <div className="personal-info">
          <h2>Administator Information</h2>

          <div className="info-field">
            <div className="label" onDoubleClick={() => this.handleDoubleClick('email')}>
              <span>Email:</span>
            </div>
            <div className="value">
              {isEditing && activeField === 'email' ? (
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  onBlur={this.handleSave}
                  autoFocus
                />
              ) : (
                <span onDoubleClick={() => this.handleDoubleClick('email')}>{email}</span>
              )}
            </div>
          </div>

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