import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Canvas from "./pages/Canvas";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Atoms from "./pages/collection/atoms";
import { Selectors } from "./pages/collection/selectors";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route path={"/collection/atoms"}>
              <Atoms />
            </Route>

            <Route path={"/collection/selectors"}>
              <Selectors />
            </Route>
            <Route>
              <Canvas />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
