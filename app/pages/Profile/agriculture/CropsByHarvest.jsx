import React from "react";

import {Treemap} from "d3plus-react";
import {SectionColumns, SectionTitle} from "datawheel-canon";

import {fetchData} from "actions/profile";
import {COLORS_CROP} from "helpers/colors";
import {VARIABLES} from "helpers/formatters";

class CropsByHarvest extends SectionColumns {

  render() {

    const {profile} = this.props;
    const data = this.context.data.harvested_area;

    return (
      <SectionColumns>
        
        <article className="section-text">
          <SectionTitle>Crops by Harvested Area</SectionTitle>
          The most common crop in { profile.name }, by harvested area, is { data[0].crop_name } with a harvested area of <strong>{ VARIABLES.harvested_area(data[0].harvested_area) }</strong>.
        </article>
        <Treemap config={{
          data,
          groupBy: ["crop_parent", "crop_name"],
          height: 450,
          label: d => d.crop_name instanceof Array ? d.crop_parent : d.crop_name,
          shapeConfig: {
            fill: d => COLORS_CROP[d.crop_parent]
          },
          sum: d => d.harvested_area
        }} />
    </SectionColumns>
    );
  }
}

CropsByHarvest.need = [
  fetchData("harvested_area", "api/join/?geo=<id>&sumlevel=lowest&show=crop&required=harvested_area,value_of_production,crop_parent,crop_name&order=harvested_area&sort=desc")
];

export default CropsByHarvest;
