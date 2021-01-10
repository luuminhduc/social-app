import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import firebase from 'firebase';
import config from './firebase/config';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import SimpleHeader from './components/SimpleHeader';
import Loading from './components/Loading';
import AlertList from './components/AlertList';
import DashBoard from './pages/Dashboard';
import AccountSetting from './pages/AccountSetting';
import PersonalPage from './pages/PersonalPage';
import Friends from './pages/Friends';
import RandomUsers from './pages/RandomUsers';
import RequestedModal from './components/RequestedModal';
import CommonModal from './components/CommonModal';

const AuthIsLoaded = ({children}) => {
  const auth = useSelector(state => state.firebaseReducer.auth);
  if(!isLoaded(auth)) return <Loading status={true}/>
  return children;
}

const rrfProps = {
  firebase,
  config,
  dispatch: store.dispatch,
}


const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <AuthIsLoaded>
          <Loading/>
          <SimpleHeader/>
          <AlertList/>
          <RequestedModal/>
          <CommonModal/>
          <Switch>
          <Route exact path="/">
              <DashBoard/>
            </Route>
            <Route exact path="/register">
              <Register/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/accountSetting">
              <AccountSetting/>
            </Route>
            <Route exact path="/user/:userId">
              <PersonalPage/>
            </Route>
            <Route exact path="/friends">
              <Friends/>
            </Route>
            <Route exact path="/randomUsers">
              <RandomUsers/>
            </Route>
          </Switch>
          </AuthIsLoaded>
        </Router>
      </ReactReduxFirebaseProvider>

    </Provider>
  );
}
 
export default App;