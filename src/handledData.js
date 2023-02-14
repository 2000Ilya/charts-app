import data from "./data";

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

export default [category1, category2, category3, category4];
