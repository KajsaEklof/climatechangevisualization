import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class MyLineChart extends Component {
  render() {
    let seaLevel = this.props.SeaLeveldata;
    let glacierdata = this.props.Glacierdata;
    const seaData = seaLevel.filter(
      x =>
        Date.parse(x.Time) > Date.parse("1945-01-01") &&
        Date.parse(x.Time) < Date.parse("2014-01-01")
    );

    seaData.map(x => (x.Time = x.Time.substring(0, 4)));

    const series = [
      {
        name: "SeaLevel",
        color: "#43188f",
        data: []
      },
      {
        name: "GlazierSize",
        color: "#ff7c53",
        data: []
      },
      { year: [] }
    ];

    glacierdata.map(x =>
      series[1].data.push({
        Year: x.Year,
        Value: x["Mean cumulative mass balance"]
      })
    );

    seaData.map(x =>
      series[0].data.push({
        Year: x.Time,
        Value: x.GMSL
      })
    );

    console.log(series);

    return (
      <React.Fragment>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          Glaciers Size and Sea Level Rise
        </p>
        <LineChart
          width={800}
          height={500}
          margin={{
            top: 10,
            right: 30,
            left: 50,
            bottom: 50
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Year"
            category={"Year"}
            allowDuplicatedCategory={false}
          />
          <YAxis dataKey="Value" />
          <Tooltip cursor={{ stroke: "red", strokeWidth: 2 }} />
          <Legend />

          {series.map(s => (
            <Line
              type={"monotone"}
              dataKey="Value"
              data={s.data}
              name={s.name}
              key={s.name}
              stroke={s.color}
            />
          ))}
        </LineChart>
      </React.Fragment>
    );
  }
}

export default MyLineChart;
