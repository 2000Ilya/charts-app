import data from "./data";

const months = ["Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь"];

const categories = [
  {
    legend: "В программе ИТ П.",
    tooltip: {
      category: "В программе",
      name: "В программе ИТ",
    },
    color: "#0078D2",
  },
  {
    legend: "В программе ЦП П.",
    tooltip: {
      category: "В программе",
      name: "В программе ЦП",
    },
    color: "#56B9F2",
  },
  {
    legend: "Вне программ ИТ П.",
    tooltip: {
      category: "Вне программ",
      name: "Вне программ ИТ",
    },
    color: "#00724C",
  },
  {
    legend: "Вне программ ЦП П.",
    tooltip: {
      category: "Вне программ",
      name: "Вне программ ЦП",
    },
    color: "#22C38E",
  },
];

const chartCategories = categories.map((category) => {
  return {
    ...category,
    itemStyle: {
      color: category.color,
    },
    name: category.tooltip.name,
    type: "bar",
    stack: category.tooltip.category,
    data: [],
    label: {
      show: true,
      position: "top",
    },
  };
});

const filledChartCategories = chartCategories.map((category) => ({
  ...category,
  data: data.filter((item) => item.name === category.tooltip.name),
}));

const chartDataSortedByPeriod = filledChartCategories.map((category) => {
  category.data.sort((item1, item2) => {
    const indexA = months.indexOf(item1.period);
    const indexB = months.indexOf(item2.period);
    return indexA - indexB;
  });
  return category;
});

export default { xAxis: months, data: chartDataSortedByPeriod };
