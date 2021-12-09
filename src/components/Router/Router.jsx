import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../../views/Home';

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Home} />
    </div>
  </BrowserRouter>
);

Router.propTypes = {};

export default Router;
