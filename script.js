const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
const searchUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

function searchMeal(e) {
  e.preventDefault();

  //   clear single meal content
  single_mealEl.innerHTML = "";

  //   console.log(search.value);
  //   console.log(e.target.search.value);

  // get search query string
  const queryStr = search.value.trim();

  if (queryStr) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${queryStr}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        addMealsToDOM(data.meals, queryStr);
      })
      .catch((err) => console.log(err));
  } else {
    alert("Please enter a search text...");
  }
}

function addMealsToDOM(meals, queryStr) {
  if (meals === null) {
    mealsEl.innerHTML = "";
    resultHeading.innerHTML = `<h2>There are no search results. Try again!</h2>`;
  } else {
    resultHeading.innerHTML = `<h2>Search results for '${queryStr}':</h2>`;

    mealsEl.innerHTML = meals
      .map(({ strMeal, strMealThumb, idMeal }) => {
        // const { strMeal, strMealThumb } = meal;

        const singleMeal = `
            <div class="meal">
                <img
                    src="${strMealThumb}"
                    alt="${strMeal}"
                />
                <div onclick="getMealById(${idMeal})" class="meal-info">
                    <h3>${strMeal}</h3>
                </div>
            </div>
        `;
        return singleMeal;
      })
      .join(""); // ["<div></div>", "<div></div>", "<div></div>" ...].join("")
  }

  //   clear search input
  search.value = "";
}

function getMealById(mealId) {
  fetchData(mealId);
}

function fetchData(id) {
  const requestUrl = id ? searchUrl + id : randomUrl;

  fetch(requestUrl)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    })
    .catch((err) => console.log(err));
}

function getRandomMeal() {
  // clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetchData();
}

function addMealToDOM(meal) {
  const { strMeal, strMealThumb, strCategory, strArea, strInstructions } = meal;

  //   let ingredients = "";
  //   //   `
  //   //           <li>Egg Plants - 1 lb</li>
  //   //           <li>Sugar - 2 tbs</li>
  //   //           <li>Salt - 1 tsp</li>
  //   //           <li>Pepper - 1 tsp</li>
  //   //           <li>Garlic - 1 whole</li>
  //   //           <li>Olive Oil - 3 tbs</li>
  //   //           <li>Ground Pork - 4 oz</li>
  //   //           <li>Rice Vinegar - 3 tbs</li>
  //   //           <li>Soy Sauce - 2 tbs</li>
  //   //           <li>Bay Leaf - 2</li>
  //   //       `;
  //   for (let i = 1; i <= 20; i++) {
  //     const stringIng = "strIngredient" + i;
  //     const stringMea = "strMeasure" + i;

  //     if (meal[stringIng]) {
  //       const singleIngredient = `<li>${meal[stringIng]} - ${meal[stringMea]}</li>`;

  //       ingredients += singleIngredient;

  //       // `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
  //       //   console.log(ingredients);
  //       //   index = 0
  //       //   ingredients = "" + <li>Egg Plants - 1 lb</li>;

  //       //   index = 1
  //       // ingredients = '<li>Egg Plants - 1 lb</li>' + '<li>Egg Plants - 1 lb</li>';

  //       //   index = 2
  //       // ingredients = '<li>Egg Plants - 1 lb</li><li>Egg Plants - 1 lb</li>' + '<li>Egg Plants - 1 lb</li>';
  //     }
  //   }

  //   console.log(ingredients);

  //   single_mealEl.innerHTML = `
  //         <div class="single-meal">
  //           <h1>${strMeal}</h1>
  //           <img
  //             src="${strMealThumb}"
  //             alt="${strMeal}"
  //           />
  //           <div class="single-meal-info">
  //             <p>${strCategory ? `${strCategory}` : ""}</p>
  //             <p>${strArea ? `${strArea}` : ""}</p>
  //           </div>
  //           <div class="main">
  //             <p>${strInstructions}</p>
  //             <h2>Ingredients</h2>
  //             <ul>
  //               ${ingredients}
  //             </ul>
  //           </div>
  //         </div>
  //     `;

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const stringIng = "strIngredient" + i;
    const stringMea = "strMeasure" + i;

    if (meal[stringIng]) {
      ingredients.push(`<li>${meal[stringIng]} - ${meal[stringMea]}</li>`);
    }
  }

  const stringIngredients = ingredients.join("");

  single_mealEl.innerHTML = `
        <div class="single-meal">
          <h1>${strMeal}</h1>
          <img
            src="${strMealThumb}"
            alt="${strMeal}"
          />
          <div class="single-meal-info">
            <p>${strCategory ? `${strCategory}` : ""}</p>
            <p>${strArea ? `${strArea}` : ""}</p>
          </div>
          <div class="main">
            <p>${strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
              ${stringIngredients}
            </ul>
          </div>
        </div>
    `;
}

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
