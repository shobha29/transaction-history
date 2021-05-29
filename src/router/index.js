import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { TransactionHistory, TransactionDetail } from "../screens";

export default function RouteContainer() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TransactionHistory} />
        <Route
          path="/transaction-summary"
          exact
          component={TransactionDetail}
        />
      </Switch>
    </Router>
  );
}
