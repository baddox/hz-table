import React from 'react';
import {Link, RouteHandler} from 'react-router';


require('./style.scss');

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }
  
  render() {
    return (
      <div id="container">
        <h1><Link to="index" id="main-title">HzTable</Link></h1>
        <p style={{position: "relative", top: "-1.5em"}}><em><small>a neat table component built with <a href="https://facebook.github.io/react/" target="_blank">React</a></small></em></p>
        <p>Custom column widgets are working now! That means custom cell rendering, filtering, and sorting.</p>
        <p>Source code: <a href="https://github.com/baddox/hz-table" target="_blank">https://github.com/baddox/hz-table</a></p>

        <div>
          <ul>
            <li>
              <Link to="custom_rendering">Custom Rendering Example</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <RouteHandler />
        </div>
      </div>
    );
  }
};

Index.propTypes = {
  foo: React.PropTypes.bool.isRequired,
};

Index.defaultProps = {
  foo: true,
};
