import React from 'react';
import TopBar from '../components/TopBar'

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index-warp">
        <TopBar />
      </div>
    );
  }

  setStateWith(name,value){
    if (name && value) {
      this.setState({[name]: value})
    }
  }
}

export default Index;