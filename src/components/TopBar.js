import React from 'react';
import _     from 'lodash';
import cx    from 'classnames';

require('styles/components/TopBar.scss')

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userIn: false,
      userInfo: {} 
    }
  }

  componentDidMount() {
  }

  render() {
    const {userIn} = this.state;
    return (
      <div className="top-bar">
        <section className="navs">
          <strong className="logo">大白菜们的博客</strong>
          <ul className="nav">
            <li>首页</li>
            <li>推荐博文</li>
            <li>分类</li>
            <li>博主们</li>
            <li>我的</li>
          </ul>
        </section>
        <section className="controls">
          { userIn ?
            <section className="user-info">
            </section>
            :
            <section className="user-controls">
              <a className="btn-type-1">注册</a>
              <a className="btn-type-1">登陆</a>
            </section>
          }
        </section>
      </div>
    );
  }

  setStateWith(name,value){
    if (name && value) {
      this.setState({[name]: value})
    }
  }
}

export default TopBar;