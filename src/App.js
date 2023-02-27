import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import About from './components/About'
import CovidState from './components/CovidState'

import NotFound from './components/NotFound'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:id" component={CovidState} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
