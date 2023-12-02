import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const chartRef = useRef();

  console.log(data);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const width = 640;
    const height = 300;

    // Define margin
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const keys = Object.keys(data);
    const values = Object.values(data);

    const xScale = d3
      .scaleBand()
      .domain(keys)
      .range([0, innerWidth])
      .padding(0.6);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(values)])
      .range([innerHeight, 0]);

    // Bars
    svg
      .selectAll("rect")
      .data(keys)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d))
      .attr("y", (d) => yScale(data[d]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(data[d]))
      .attr("fill", "#f0c3f1");

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("path, line")
      .style("stroke", "white");

    // Y Axis
    svg
      .append("g")
      .call(d3.axisLeft(yScale).tickSize(0))
      .selectAll("path, line")
      .style("stroke", "white");
    // Y Axis Label
    svg
      .append("text")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - innerHeight / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text("₹");

    svg.select(".domain").style("stroke", "white !important");

    svg.selectAll(".tick text").style("fill", "white !important");
  }, [data]);

  return <svg ref={chartRef} width={640} height={300}></svg>;
};

export default BarChart;
