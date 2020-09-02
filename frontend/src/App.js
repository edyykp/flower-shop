import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {Home} from './Home';
import {BucheteFlori} from './BucheteFlori';
import {AranjamenteFlori} from './AranjamenteFlori';
import {Nunta} from './Nunta';
import {Botez} from './Botez';
import {Contact} from './Contact';
import {NoMatch} from './NoMatch';
import {NavigationBar} from './components/NavigationBar';
import {BucheteDeMireasa} from './BucheteDeMireasa';
import {LumanariDeCununie} from './LumanariDeCununie';
import {AranjamenteFloraleSala} from './AranjamenteFloraleSala';
import {BuchetePentruNasa} from './BuchetePentruNasa';
import {Footer} from './components/Footer';
import { loadReCaptcha } from 'react-recaptcha-google';
import { Lumanari } from './Lumanari';
import {AranjamenteCristelnita} from './AranjamenteCristelnita';
import {Plante} from './Plante';
import {TrandafiriCriogenati} from './TrandafiriCriogenati';
import {CumCumpar} from './CumCumpar';
import { ProductDetails } from './components/ProductDetails';
import  AccountBar  from './components/AccountBar';
import {SigninScreen} from './SigninScreen';
import {SignupScreen} from './SignupScreen';
import {ProductsScreen} from './ProductsScreen';
import { ProductsTable } from './ProductsTable';
import {ShippingScreen} from './ShippingScreen';
import Notifications from 'react-notify-toast';
import {Confirm} from './Confirm';
import { OrdersTable } from './OrdersTable';
import { SearchScreen } from './SearchScreen';
import { useSelector } from 'react-redux';
import { ProfileScreen } from './ProfileScreen';
import { MyOrdersScreen } from './MyOrdersScreen';
import { ForgotScreen } from './ForgotScreen';
import { ResetScreen } from './ResetScreen';
import { FinishedOrder } from './FinishedOrder';
import { PrivacyScreen } from './PrivacyScreen';
import { TermsScreen } from './TermsScreen';
import { Redirect } from './Redirect';
const App = () => {
    loadReCaptcha();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
      <React.Fragment>
          <Notifications />
          <Router className="router" >
            <AccountBar />
            <NavigationBar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/bucheteflori" component={BucheteFlori} />
              <Route path="/aranjamenteflori" component={AranjamenteFlori} />
              <Route path="/trandafiricriogenati" component={TrandafiriCriogenati} />
              <Route path="/plante" component={Plante} />
              <Route path="/nunta" component={Nunta} />
              <Route path="/buchetedemireasa" component={BucheteDeMireasa} />
              <Route path="/lumanaridecununie" component={LumanariDeCununie} />
              <Route path="/aranjamentefloralesala" component={AranjamenteFloraleSala} />
              <Route path="/buchetenasa" component={BuchetePentruNasa} />
              <Route path="/botez" component={Botez} />
              <Route path="/lumanari" component={Lumanari} />
              <Route path="/aranjamentecristelnita" component={AranjamenteCristelnita} />
              <Route path="/contact" component={Contact} />
              <Route path="/cumcumpar" component={CumCumpar}/>
              <Route path="/productdetails/:id" component={ProductDetails} />
              <Route path="/signin" component={SigninScreen} />
              <Route path="/signup" component={SignupScreen} />
              {userInfo && userInfo.isAdmin && <Route path="/products" component={ProductsScreen} />}
              {userInfo && userInfo.isAdmin && <Route path="/productstable" component={ProductsTable} />}
              <Route path="/shipping" component={ShippingScreen}/>
              <Route path="/confirmemail/:id" component={Confirm} />
              {userInfo && userInfo.isAdmin && <Route path="/orderstable" component={OrdersTable} />}
              <Route path="/search" component={SearchScreen} />
              {userInfo && !userInfo.isAdmin && <Route path="/accountprofile" component={ProfileScreen} />}
              {userInfo && !userInfo.isAdmin && <Route path="/orders" component={MyOrdersScreen} />}
              <Route path="/forgotten" component={ForgotScreen}/>
              <Route path="/reset" component={ResetScreen} />
              <Route path="/finishedorder/:id" component={FinishedOrder} />
              <Route path="/privacy" component={PrivacyScreen}/>
              <Route path="/terms" component={TermsScreen} />
              <Route path="/redirect/:id" component={Redirect}/>
              <Route component={NoMatch} />
            </Switch>
    {!(window.location.pathname === "/orderstable" || window.location.pathname === "/productstable") && <Footer /> }
              
         
            
          </Router>
       
          
       
      </React.Fragment>
    );
}

export default App;
