import React from "react";
import {connect} from "react-redux";

import {BarChart} from "d3plus-react";
import Topic from "canon/Topic";

import {API} from ".env";

class RainfallBars extends Topic {

  render() {
    const {attrs, focus, id} = this.props;
    const attrLookup = attrs.reduce((obj, d) => (obj[d.id] = d, obj), {});
    return (
      <div className="topic">
        <h3>Rainfall by Location</h3>
        <BarChart config={{
          barPadding: 5,
          data: `${API}api/join/?show=geo&geo=${ focus.join(",") }sumlevel=all&required=rainfall_awa_mm`,
          discrete: "y",
          groupBy: "geo",
          label: d => attrLookup[d.geo] ? attrLookup[d.geo].name : d.geo,
          legend: false,
          shapeConfig: {
            fill: d => d.geo === id ? "rgb(120, 220, 133)" : "rgb(61, 71, 55)"
          },
          x: "rainfall_awa_mm",
          xConfig: {
            title: "Rainfall"
          },
          y: "geo",
          yConfig: {
            labels: [],
            title: "Locations"
          }
        }} />
      </div>
    );
  }
}

export default connect(state => ({
  attrs: state.attrs.geo,
  focus: state.focus
}), {})(RainfallBars);
