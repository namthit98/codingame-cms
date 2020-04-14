import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import "antd/dist/antd.css";
import Dashboard from "./pages/Dashboard";
import Provider from "./store";
import ListUsers from "./pages/ListUsers";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import CreateQuestion from "./pages/CreateQuestion";

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

          <Route
            exact
            path="/users"
            render={() => (
              <MainLayout>
                <ListUsers />
              </MainLayout>
            )}
          />

          <Route
            exact
            path="/users/create"
            render={() => (
              <MainLayout>
                <CreateUser />
              </MainLayout>
            )}
          />

          <Route
            exact
            path="/questions/create"
            render={() => (
              <MainLayout>
                <CreateQuestion />
              </MainLayout>
            )}
          />

          <Route
            exact
            path="/login"
            render={() => (
              <AuthLayout>
                <Login />
              </AuthLayout>
            )}
          />

          <Route path="/" render={() => <h1>PAGE NOT FOUND</h1>} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
