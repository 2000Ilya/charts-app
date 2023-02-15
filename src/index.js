import { init } from "echarts";

import seriesData from "./newHandledData";

import tooltipFormatter from "./helpers/tooltipFormatter";

import "./style.css";

let dom = document.getElementById("chart-container");
let myChart = init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});

let app = {};

let option = {
  title: {
    text: "Проекты в программах и вне программ",
    subtext:
      "Сумма и процентное соотношение проектов, находящихся в программах и вне программ",
  },
  axisTick: {
    show: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line",
    },
    formatter: tooltipFormatter,
  },
  legend: {
    orient: "horizontal",
    bottom: "18px",
    icon: "circle",
  },
  grid: {
    left: "39px",
    right: "58px",
    bottom: "90px",
    top: "117px",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: seriesData.xAxis,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
  ],
  series: seriesData.data,
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
