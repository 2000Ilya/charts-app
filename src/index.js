import { init } from "echarts";

import getSeriesData from "./helpers/getSeriesData";

import formatTooltip from "./helpers/formatTooltip";

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
    formatter: formatTooltip,
  },
  legend: {
    orient: "horizontal",
    bottom: "0px",
    icon: "circle",
    formatter: function (legendItem) {
      return legendItem + " П.";
    },
  },
  grid: {
    left: "12px",
    right: "38px",
    bottom: "55px",
    top: "101px",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: getSeriesData.xAxis,
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
  series: getSeriesData.data,
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
