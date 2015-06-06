import Index from './pages/Index';
import CustomRendering from './pages/CustomRendering';
import React from 'react';
import {Route} from 'react-router';

export default (
  <Route name="index" handler={Index} path="/">
    <Route name="custom_rendering" handler={CustomRendering} />
  </Route>
);

