import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../../views/Home';
import AddItem from '../../views/AddItem';

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/add-item" exact component={AddItem} />
    </div>
  </BrowserRouter>
);

Router.propTypes = {};

export default Router;
