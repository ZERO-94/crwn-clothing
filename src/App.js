import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component';
import { connect } from 'react-redux';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //           id : snapShot.id,
    //           ...snapShot.data()
    //         });
    //     }
    //     );
    //   } else {
    //     setCurrentUser(userAuth);
    //   }
    // });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route 
          exact 
          path='/signIn' 
          render= {() => this.props.currentUser ? <Redirect to='/'/> : <SignInAndSignUpPage/>}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser : selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
