// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
require('./css/pure.css');
require('./css/base.sass');

import React from 'react';
import Router from 'react-router';
import routes from './components/Application/routes';

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
