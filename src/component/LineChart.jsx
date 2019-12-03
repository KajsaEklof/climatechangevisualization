import React, { Component } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label
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

        let seaLevelData = [];
        seaData.map( x => 
            seaLevelData.push({
                Year: x.Time,
                SeaLevel: x.GMSL
            }))

        return ( 
            <React.Fragment>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              Glaciers Size and Sea Level Rise 
            </p>
            <LineChart
            data={seaLevelData, glacierdata}
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
              <XAxis dataKey="Year" />
              <YAxis />
              <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }}/>
              <Legend verticalAlign="top" />
              <Line
                 data={seaLevelData}
                 type="monotone"
                 dataKey="SeaLevel"
                 stroke="pink"
                 activeDot={{ r: 8 }}
               />
              <Line
              legendType="diamond"
              type="monotone"
              dataKey="Mean cumulative mass balance" 
              stroke="#8884d8"
              
              activeDot={{ r: 8 }}
            />
            </LineChart>
          </React.Fragment>
         );
    }
}
 
export default MyLineChart;