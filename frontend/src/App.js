import React, {Component} from 'react';
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

class App extends Component {
  componentDidMount() {
    loadReCaptcha();
  }

  render() {
    return (
      <React.Fragment >
        <NavigationBar total={100}/>
        <div style={{paddingTop: "126px"}}>
          <Router className="router">
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
              <Route component={NoMatch} />

            </Switch>
          </Router>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
