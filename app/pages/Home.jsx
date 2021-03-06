import React from "react";
import {connect} from "react-redux";
import {toggleSearch} from "actions/index";
import Search from "components/Search";
import {Profile} from "datawheel-canon";
import "./Home.css";
import d3plus from "helpers/d3plus";

import {Geomap} from "d3plus-react";

class Home extends Profile {

  render() {

    const {attrs, focus, message} = this.props;
    const focusISO = focus.map(f => attrs[f].iso3);

    return (
      <div className="home">
        <div className="splash">
          <div className="image"></div>
          <div className="gradient"></div>
        </div>
        <div className="intro">
          <div className="text">
            <h2 className="title">{ message }</h2>
            <Search className="search-home" local={ true } limit={ 5 } />
          </div>
          <Geomap config={{
            data: focus.reduce((arr, f) => (arr.push(attrs[f]), arr), []),
            downloadButton: false,
            groupBy: "iso3",
            height: 500,
            label: d => d.name,
            legend: false,
            ocean: "transparent",
            on: {
              "click.shape": d => {
                if (d) window.location = `/profile/${d.id}`;
              }
            },
            padding: 24,
            shapeConfig: {
              hoverOpacity: 1,
              Path: {
                fill: d => focusISO.includes(d.feature.properties.iso_a3) ? "#74E19A" : "rgba(255, 255, 255, 0.35)",
                stroke: "rgba(255, 255, 255, 0.75)"
              }
            },
            tiles: false,
            tooltipConfig: {
              background: "white",
              body: "",
              footer: "",
              footerStyle: {
                "margin-top": 0
              },
              padding: "12px",
              title: d => `${d.name}<img class='link-arrow' src='/images/nav/link-arrow.svg' />`
            },
            topojson: "/topojson/continent.json",
            topojsonId: d => d.properties.iso_a3,
            topojsonKey: "collection",
            width: 400,
            zoom: false
          }} />
        </div>
        <div className="tiles">
          <h3 className="title">Explore Countries</h3>
          <span className="more-link"><img className="icon" src={ `/images/sections/dropdown-arrow.svg` } /></span>
          {
            focus.map(f =>
              <a key={f} className="tile" href={ `/profile/${f}` } style={{backgroundImage: `url('/images/geo/${f}.jpg')`}}>
                <span className="name">{ attrs[f].name }</span>
              </a>
            )
          }
          
        </div>
      </div>
    );
  }
}

Home.defaultProps = {
  d3plus,
  message: "Data Africa is an open source agriculture, climate, poverty, and health visualization engine."
};

export default connect(state => ({
  attrs: state.attrs.geo,
  focus: state.focus
}), {toggleSearch})(Home);
