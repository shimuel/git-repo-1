
import React from 'react'
import { Switch, Route,Link} from  'react-router-dom'

import {PlayerAPI} from '../services/playersService'

  // The FullRoster iterates over all of the players and creates
  // a link to their profile page.
const FullRoster = () => (
    <div>
      <ul>
        {
          PlayerAPI.all().map(p => (
            <li key={p.number}>
              <Link to={`/roster/${p.number}`}>{p.name}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
  
  // The Player looks up the player using the number parsed from
  // the URL's pathname. If no player is found with the given
  // number, then a "player not found" message is displayed.
const Player = (props) => {
    const player = PlayerAPI.get(
      parseInt(props.match.params.number, 10)
    )
    if (!player) {
      return <div>Sorry, but the player was not found</div>
    }
    return (
      <div>
        <h1>{player.name} (#{player.number})</h1>
        <h2>Position: {player.position}</h2>
        <Link to='/roster'>Back</Link>
      </div>
    )
  }
  
  // The Roster component matches one of two different routes
  // depending on the full pathname 
  export const Roster = () => (
    <Switch>
      <Route exact path='/roster' component={FullRoster}/>
      <Route path='/roster/:number' component={Player}/>
    </Switch>
  )
  
  export const Schedule = () => (
    <div>
      <ul>
        <li>6/5 @ Evergreens</li>
        <li>6/8 vs Kickers</li>
        <li>6/14 @ United</li>
      </ul>
    </div>
  )
  
