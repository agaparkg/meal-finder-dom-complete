// HOMEWORK:
// Rewriting a Promise chain with an async function

const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
const searchByIdUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const searchByQueryStrUrl =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export const getMealsDataByQueryTxt = async (queryStr) => {
  try {
    return await (await fetch(`${searchByQueryStrUrl}${queryStr}`)).json();
  } catch (error) {
    console.log({
      message: "Something went wrong!",
      error,
    });
  }
};

export const getMealsDataById = async (id) => {
  try {
    const requestUrl = id ? searchByIdUrl + id : randomUrl;

    return await (await fetch(requestUrl)).json();
  } catch (error) {
    console.log({
      message: "Something went wrong!",
      error,
    });
  }
};
