import data from "./data";

const categories0 = [
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

const categories = {
  first: ["В программе ЦП", "В программе ИТ"],
  second: ["Вне программ ЦП", "Вне программ ИТ"],
};

const [[category1, category2], [category3, category4]] = Object.keys(
  categories
).map((key) => {
  return categories[key]
    .map((categoryName) => ({
      value: data.filter((item) => item.name === categoryName),
      categoryName,
    }))
    .map((data) => {
      const { value, categoryName } = data;
      return {
        name: categoryName,
        type: "bar",
        stack: key,
        data: value.map((item) => item.value),
      };
    });
});

const xAxis = ["Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь"];

const result = [category1, category2, category3, category4].map((category) => {
  // console.log(category);
  // category.period.sort((a, b) => {
  //   const indexA = xAxis.findIndex((type) => a.Type === type);
  //   const indexB = xAxis.findIndex((type) => b.Type === type);
  //   return indexA - indexB; // to get positive, 0, negative number for the sort callback.
  // });

  return category;
});

export default [category1, category2, category3, category4];
