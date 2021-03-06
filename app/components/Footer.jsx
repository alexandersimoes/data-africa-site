import React, {Component} from "react";
import "./Footer.css";

class Footer extends Component {

  render() {
    const {dark} = this.props;
    return (
      <footer id="footer" className={ dark ? "dark" : "light" }>
        <div className="inner">
          <div className="links">
            <ul className="list">
              <h5 className="title">Explore</h5>
              <li className="item"><a className="link" href="/">Search</a></li>
              <li className="item"><a className="link" href="/map">Map</a></li>
            </ul>
            <ul className="list">
              <h5 className="title">About</h5>
              <li className="item"><a className="link" href="/about#background">Background</a></li>
              <li className="item"><a className="link" href="/about#data">Data Sources</a></li>
              <li className="item"><a className="link" href="/about#glossary">Glossary</a></li>
              <li className="item"><a className="link" href="/about#terms">Terms of Use</a></li>
            </ul>
          </div>
          <div className="logos">
            <a href="http://www.ifpri.org" target="_blank"><img className="ifpri" src="/images/logos/ifpri.png" /></a>
            <a href="http://datawheel.us" target="_blank"><img className="datawheel" src={ `/images/logos/datawheel${ dark ? "-white" : "" }.png` } /></a>
          </div>
        </div>
      </footer>
    );

  }
}

export default Footer;
