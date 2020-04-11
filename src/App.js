import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import "antd/dist/antd.css";
import Dashboard from "./pages/Dashboard";
import Provider from "./store";

function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            )}
          />

          <Route path="/" render={() => <h1>PAGE NOT FOUND</h1>} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
