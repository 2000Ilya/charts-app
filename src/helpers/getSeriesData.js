import data from "../resources/data";

const months = ["Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь"];

const categories = [
  {
    name: "В программе ИТ",
    tooltip: {
      category: "В программе",
      name: "Проекты ИТ",
    },
    color: "#0078D2",
  },
  {
    name: "В программе ЦП",
    tooltip: {
      category: "В программе",
      name: "Проекты ЦП",
    },
    color: "#56B9F2",
  },
  {
    name: "Вне программ ИТ",
    tooltip: {
      category: "Вне программ",
      name: "Проекты ИТ",
    },
    color: "#00724C",
  },
  {
    name: "Вне программ ЦП",
    tooltip: {
      category: "Вне программ",
      name: "Проекты ЦП",
    },
    color: "#22C38E",
  },
];

const chartCategories = categories.map((category, index) => {
  return {
    ...category,
    itemStyle: {
      color: category.color,
      zIndex: 1000000000,
    },
    name: category.name,
    type: "bar",
    stack: category.tooltip.category,
    data: [],
    label: {
      show: true,
      position: "top",
    },
  };
});

const filledChartCategories = chartCategories.map((category, index) => {
  return {
    ...category,
    data: data
      .filter((item) => item.name === category.name)
      .map((item) => ({ ...item, tooltipName: category.tooltip.name })),
  };
});

const chartDataSortedByPeriod = filledChartCategories.map((category) => {
  category.data.sort((item1, item2) => {
    const indexA = months.indexOf(item1.period);
    const indexB = months.indexOf(item2.period);
    return indexA - indexB;
  });
  return category;
});

export default { xAxis: months, data: chartDataSortedByPeriod };
