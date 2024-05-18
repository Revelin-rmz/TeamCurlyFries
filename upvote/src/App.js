import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import DevDashboard from './components/DevDashboard';
import VoterDashboard from './components/VoterDashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dev-dashboard" component={DevDashboard} />
        <Route path="/voter-dashboard" component={VoterDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
