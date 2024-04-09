const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();
}

function getRandomMeal() {
  // clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    })
    .catch((err) => console.log(err));
}

function addMealToDOM(meal) {
  const { strMeal, strMealThumb, strCategory, strArea, strInstructions } = meal;

  let ingredients = "";
  //   `
  //           <li>Egg Plants - 1 lb</li>
  //           <li>Sugar - 2 tbs</li>
  //           <li>Salt - 1 tsp</li>
  //           <li>Pepper - 1 tsp</li>
  //           <li>Garlic - 1 whole</li>
  //           <li>Olive Oil - 3 tbs</li>
  //           <li>Ground Pork - 4 oz</li>
  //           <li>Rice Vinegar - 3 tbs</li>
  //           <li>Soy Sauce - 2 tbs</li>
  //           <li>Bay Leaf - 2</li>
  //       `;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      const stringIng = "strIngredient" + i;
      const stringMea = "strMeasure" + i;

      ingredients =
        ingredients + `<li>${meal[stringIng]} - ${meal[stringMea]}</li>`;
      // `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
      //   console.log(ingredients);
      //   index = 0
      //   ingredients = "" + <li>Egg Plants - 1 lb</li>;

      //   index = 1
      // ingredients = '<li>Egg Plants - 1 lb</li>' + '<li>Egg Plants - 1 lb</li>';

      //   index = 2
      // ingredients = '<li>Egg Plants - 1 lb</li><li>Egg Plants - 1 lb</li>' + '<li>Egg Plants - 1 lb</li>';
    }
  }

  console.log(ingredients);

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
              ${ingredients}
            </ul>
          </div>
        </div>
    `;
}

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
