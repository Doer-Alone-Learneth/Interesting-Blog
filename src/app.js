import React                                   from 'react';
import MultiSelectPanel                        from './components/MultiSelectPanel';
import { BrowserRouter as Router, Route, Link }from 'react-router-dom';
import Index                                   from './pages/Index';

require('normalize.css/normalize.css');
require('styles/App.scss');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <h1>一群大白菜的博客系统</h1>
        <h2>react路由</h2>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
              <li>
                <Link to="/MultiSelectPanel">MultiSelectPanel组件</Link>
              </li>
            </ul>
            <Route exact path="/" component={Index} />
            <Route exact path="/MultiSelectPanel" component={MultiSelectPanel} />
          </div>
        </Router>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
