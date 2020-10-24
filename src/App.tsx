import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./modules/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "./modules/Login";
import { ThemeProvider, Themes } from "@icstark/ui";

function App() {
  return (
    <ThemeProvider theme={Themes["ant"]}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={(props: any) => <Home {...props} />}
          />
          <Route
            path="/login"
            exact
            component={(props: any) => <Login {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
