import './App.css'
import React from 'react'
import Registration from './components/Registration'
import MainPage from './components/MainPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Registration} />
        <Route path="/game" exact component={MainPage} />
      </Router>
    </Provider>
  )
}

export default App
