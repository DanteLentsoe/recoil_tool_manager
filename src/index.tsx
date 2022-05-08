import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Canvas from "./pages/Canvas";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Atoms from "./pages/collection/atoms";
import { Selectors } from "./pages/collection/selectors";
import { Async } from "./pages/DataFetching";
import DrawerNav from "./components/drawer";
import { Async2 } from "./pages/DataFetching2";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <DrawerNav />
        <Router>
          <Switch>
            <Route path={"/collection/atoms"}>
              <Atoms />
            </Route>

            <Route path={"/collection/selectors"}>
              <Selectors />
            </Route>

            <Route path={"/collection/datafetch"}>
              <Suspense fallback={<div>Loading...</div>}>
                <Async />
              </Suspense>
            </Route>

            <Route path={"/collection/datafetch2"}>
              <Suspense fallback={<div>Loading...</div>}>
                <Async2 />
              </Suspense>
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
