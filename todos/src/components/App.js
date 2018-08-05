import React from 'react'
import { Switch, Route,Link} from  'react-router-dom'
import {Roster, Schedule} from './main'
import Home  from './Home'
import Login from './auth/Login'
const App = () => (
  <div style={{display: 'table-row', height:'100%', width:'100%', border:'1px solid blue'}}>
    <div style={{display: 'table-cell', width: '300px', padding: '3px', borderRight:'solid 3px red'}}>
      <Header />
    </div>
    <div style={{display: 'table-cell',width: '100%', padding: '3px'}}>
      <Main />
    </div>
  </div>
)

export default App

    // The Main component renders one of the three provided
  // Routes (provided that one matches). Both the /roster
  // and /schedule routes will match any pathname that starts
  // with /roster or /schedule. The / route will only match
  // when the pathname is exactly the string "/"
  const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/roster' component={Roster}/>
        <Route path='/schedule' component={Schedule}/>
        <Route exact path="/login" component={Login} />
      </Switch>
    </main>
  )
  
  // The Header creates links that can be used to navigate
  // between routes.
  const Header = () => (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/roster'>Roster</Link></li>
          <li><Link to='/schedule'>Schedule</Link></li>
        </ul>
      </nav>
    </header>
  )