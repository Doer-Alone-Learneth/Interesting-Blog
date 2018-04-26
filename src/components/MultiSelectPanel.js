import React     from 'react';
import _         from 'lodash';

require('styles/components/MultiSelectPanel.scss')

class MultiSelectPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftSelects:{},
      rightSelects:{}
    }
  }

  componentDidMount() {
    this.initData();
  }

  render() {
    const {leftSelects, rightSelects} = this.state;

    return (
      <div className="multi-select-panel">
        <div className="left-selects">
          {this.renderSelectList('leftSelect', Object.values(leftSelects))}
        </div>
        <div className="middle-controllers">
          <button onClick={()=>this.addList()}>添加</button>
          <button onClick={()=>this.removeList()}>移除</button>
          <button onClick={()=>this.controlAll('add')}>添加全部</button>
          <button onClick={()=>this.controlAll('remove')}>移除全部</button>
        </div>
        <div className="right-selects">
          {this.renderSelectList('rightSelect', Object.values(rightSelects))}
        </div>
        <div className="confirm-selects">
          <button type="button">确定</button>
        </div>
      </div>
    );
  }

  initData() {
    const {leftSelects, rightSelects} = this.props;
    if (leftSelects || rightSelects) {
      this.setInitState('leftSelects',leftSelects);
      this.setInitState('rightSelects',rightSelects);
    }
  }

  setInitState(name,date) {
    if (!date) return;
    const newDate = {}
    date.map((item) => {
      if (item.id) {
        newDate[item.id] = item;
      }
    })
    this.setStateWith(name, newDate);
  }

  renderSelectList(name,selects) {
    if (name && selects) {
      return(
        <select name={name} ref={name} multiple={true} onChange={(e)=> this.getSelected(e)}>
          {selects.map((item, index) => {
            return <option key={index} value={item.id}>{item.title}</option>
          })}
        </select>
      )
    }
  }

  getSelected(e) {
    if (e.target){
      const {options, name} =  e.target;
      const readySelect = [];
      for(let i = 0; i< options.length; i++) {
        if(options[i].selected){
          readySelect.push(options[i].value)
        }
      }
      const readyName = 'ready' + name;
      this.setStateWith(readyName,readySelect);
    }
  }

  addList() {
    const {leftSelects, rightSelects, readyleftSelect} = this.state;
    const newLeft = Object.assign(leftSelects);
    const newRight = Object.assign(rightSelects);
    if (readyleftSelect && readyleftSelect.length) {
      const leftKeys = Object.keys(leftSelects);
      readyleftSelect.map((item)=>{
        if (leftKeys.indexOf(item)>=0) {
          newRight[item] = newLeft[item];
          _.unset(newLeft,item);
        }
      })
      this.setStateWith('leftSelects',newLeft);
      this.setStateWith('rightSelects',newRight);
      // 解决无法触发onChange问题
      this.allMoveSelected('leftSelect');
    }
  }

  removeList() {
    const {leftSelects, rightSelects, readyrightSelect} = this.state;
    const newLeft = Object.assign(leftSelects);
    const newRight = Object.assign(rightSelects);
    if (readyrightSelect && readyrightSelect.length) {
      const rightKeys = Object.keys(rightSelects);
      readyrightSelect.map((item)=>{
        if (rightKeys.indexOf(item)>=0) {
          newLeft[item] = newRight[item];
          _.unset(newRight,item);
        }
      })
      this.setStateWith('leftSelects',newLeft);
      this.setStateWith('rightSelects',newRight);
      // 解决无法触发onChange问题
      this.allMoveSelected('rightSelect');
    }
  }

  controlAll(type) {
    const {leftSelects, rightSelects} = this.state;
    
    let newLeft = {};
    let newRight = {};
    if (type == 'add') {
      newRight = Object.assign(rightSelects,leftSelects);
    }
    if (type == 'remove') {
      newLeft = Object.assign(leftSelects,rightSelects);
    }
    this.setStateWith('leftSelects',newLeft);
    this.setStateWith('rightSelects',newRight);
  }

  allMoveSelected(name) {
    const options = this.refs[name].options
    for( let i = 0; i < options.length; i++) {
      options[i].selected = false;
    }
  }

  setStateWith(name,value){
    if (name && value) {
      this.setState({[name]: value})
    }
  }
}

MultiSelectPanel.defaultProps = {
  leftSelects: [
    {id: '606923582', title: '哈哈哈测试上传配图绑定'},
    {id: '606923178', title: '测试计划计划'}
  ],
  rightSelects: [
    {id: '606922897', title: 'kkkk'},
    {id: '606922825', title: '新的乱买词'},
    {id: '606921622', title: '21新增的移动计划112312311'},
    {id: '606921621', title: '测试测试...1'},
    {id: '606921233', title: '客户端测试 计划hhh'},
    {id: '606919079', title: '2222'},
    {id: '606919078', title: '多线程计划'},
    {id: '606918743', title: '1233456789'},
    {id: '606918698', title: 'test_kune90909'}
  ]
}

export default MultiSelectPanel;