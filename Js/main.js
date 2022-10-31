$("#btn,#close").click(function () {
  let navigationWidth = $(".navigation").outerWidth();
  if ($(".navigation").css("left") == "0px") {
    $(".navigation").animate({ left: -navigationWidth });
    $("#btn").html('<i class="fa-solid fa-bars"></i>');
    $(".side-nav").animate({ top: "20%" }, 1000);
  } else {
    $(".navigation").animate({ left: 0 }, function () {
      $(".side-nav").animate({ top: "3%" }, 1000);
    });
    $("#btn").html('<i class="fa-solid fa-xmark"></i>');
  }
});

$(document).ready(function () {
  $(".loading-screen").fadeOut(1000, function () {
    $("body").css("overflow", "visible");
  });
});

async function getAllMeals() {
  let meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let myResponse = await meals.json();
  showData(myResponse);
}
getAllMeals();

function showData(myResponse) {
  console.log(myResponse);
  let box = "";
  for (let i = 0; i < myResponse.meals.length; i++) {
    box += `<div class="deleteDiv col-md-3" onclick='mealDetails(${myResponse.meals[i].idMeal})' class="col-md-3">
                <img class='w-100 my-3' src="${myResponse.meals[i].strMealThumb}"
                alt="Yummy" />
                <div class="layer-img d-flex align-items-center">
                ${myResponse.meals[i].strMeal}
                </div>
            </div>`;
  }
  document.getElementById("rowData").innerHTML = box;
}

async function mealDetails(meal_id) {
  $(".deleteDiv").remove();
  let mealId = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`
  );
  let myResponseId = await mealId.json();
  let mealInfo = await myResponseId.meals;
  let box = "";
  for (let i = 0; i < mealInfo.length; i++) {
    if (mealInfo[i].strMeasure1)
      box += `<div class="col-md-4 deleteDiv myMeal text-white">
              <img class="w-100" src="${mealInfo[i].strMealThumb}" alt="Yummy"><br>
              <h1>${mealInfo[i].strMeal}</h1>
            </div>
            <div class="col-md-8 myMealsInfo text-white text-left">
                  <h2>Instructions</h2>
                  <p>${mealInfo[i].strInstructions}</p>
                  <ul>
                  <li><span class='bold'>Area:</span>${mealInfo[i].strArea}</li>
                  <li><span class='bold'>Category:</span>${mealInfo[i].strCategory}</li>
                  </ul>
                  <p>Recipes :</p>
                  <ul class="d-flex flex-wrap" id="recipes">
                  <li class="my-3 mx-1 p-1 alert-success rounded">${mealInfo[i].strMeasure1} ${mealInfo[i].strIngredient1}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">${mealInfo[i].strMeasure2} ${mealInfo[i].strIngredient2}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">
                  ${mealInfo[i].strMeasure3} ${mealInfo[i].strIngredient3}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">
                  ${mealInfo[i].strMeasure4} ${mealInfo[i].strIngredient4}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">
                  ${mealInfo[i].strMeasure5} ${mealInfo[i].strIngredient5}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">
                  ${mealInfo[i].strMeasure6} ${mealInfo[i].strIngredient6}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">
                  ${mealInfo[i].strMeasure7} ${mealInfo[i].strIngredient7}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">
                  ${mealInfo[i].strMeasure8} ${mealInfo[i].strIngredient8}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">
                  ${mealInfo[i].strMeasure9} ${mealInfo[i].strIngredient9}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">
                  ${mealInfo[i].strMeasure10} ${mealInfo[i].strIngredient10}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">
                  ${mealInfo[i].strMeasure11} ${mealInfo[i].strIngredient11}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">${mealInfo[i].strMeasure12} ${mealInfo[i].strIngredient12}</li>
                  <li class="my-3 mx-1 p-1 alert-success rounded">${mealInfo[i].strMeasure13} ${mealInfo[i].strIngredient13}</li>
                  </ul>
                  <h3 class="my-2 mx-1 p-1">Tags :</h3>
                  <ul class="d-flex">
                  <li class="my-3 mx-1 p-1 alert-danger rounded">
                  ${mealInfo[i].strTags}</li>
                  </ul>
                  <a class="btn btn-success text-white" target="_blank" href="${mealInfo[i].strSource}">Source</a>
                  <a class="btn btn-danger youtube text-white" target="_blank" href="${mealInfo[i].strYoutube}">Youtube</a>
            </div>`;
    console.log(mealInfo);
    document.getElementById("rowData").innerHTML = box;
  }
}

let searchName = document.getElementById("searchByName");
let searchByFirstLet = document.getElementById("searchByFirstLet");
let SearchNav = document.getElementById("Search");
let SearchAll = document.getElementById("SearchAll");

SearchNav.addEventListener("click", function () {
  // if (SearchAll.classList.contains("d-none") == null) {
  //   showData();
  // } else {
  //   console.log(SearchNav);
  //   $(".deleteDiv").remove();
  //   $("#SearchAll").removeClass("d-none");
  // }
  $(".deleteDiv").remove();
  searchByName();
  $("#SearchAll,#searchBars,#searchedBar").removeClass("d-none");
  console.log(SearchNav);
});

async function searchByName(mealSearch, type) {
  console.log(mealSearch);
  if (type == 0) {
    var searchMealName = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealSearch}`
    );
  } else {
    var searchMealName = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealSearch}`
    );
  }
  let myMealResponse = await searchMealName.json();
  console.log(myMealResponse);
  let box = "";
  for (let i = 0; i < myMealResponse.meals.length; i++) {
    box += `<div onclick='mealDetails(${myMealResponse.meals[i].idMeal})'     class="col-md-3 deleteDiv">
                  <img class='w-100 my-3' src="${myMealResponse.meals[i].strMealThumb}"
                          alt="Yummy" />
                <div class="layer-img-search d-flex align-items-center">${myMealResponse.meals[i].strMeal}</div>
          </div>`;
  }
  document.getElementById("searchedMeals").innerHTML = box;
}
searchName.addEventListener("keyup", function () {
  searchByName(this.value, 0);
});
searchByFirstLet.addEventListener("keyup", function () {
  searchByName(this.value[0], 1);
});

let categoryNav = document.getElementById("Categories");
categoryNav.addEventListener("click", getMealCategory);
categoryNav.addEventListener("click", $(".loading-screen").fadeOut(1000));

async function getMealCategory() {
  $(".deleteDiv,#searchedBar,#searchBars").remove();
  let mealCategory = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let myCategoryResponse = await mealCategory.json();
  let myCategory = await myCategoryResponse.categories;
  console.log(myCategory);
  let box = "";
  for (let i = 0; i < myCategory.length; i++) {
    box += `<div class="col-md-3 deleteDiv col-lg-3 my-3  ">
    <div class="  rounded position-relative">
        <div onclick='filterMeals("${myCategory[i].strCategory}")' class="post">
            <img src="${myCategory[i].strCategoryThumb}" class="w-100  rounded">
            <div class="layer-img">
                <div class="info">
                    <h2>${myCategory[i].strCategory}</h2>
                    <p>${myCategory[i].strCategoryDescription.slice(0, 100)}</p>
                </div>
            </div>
        </div>
    </div>
</div>`;
  }
  document.getElementById("rowData").innerHTML = box;
}

async function filterMeals(mealName) {
  $(".deleteDiv,#searchedBar,#searchBars").remove();
  let mealCategory = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`
  );
  let myResponseCat = await mealCategory.json();
  console.log(myResponseCat);
  let mealInfo = await myResponseCat.meals;
  console.log(mealInfo);
  let box = "";
  for (let i = 0; i < 20; i++) {
    // if(){}
    box += `<div  class="col-md-3 deleteDiv myMeal text-white">
              <img onclick="mealDetails(${mealInfo[i].idMeal})" class="w-100 my-3" src="${mealInfo[i].strMealThumb}" alt="Yummy"><br>
              <div class="layer-img d-flex align-items-center justify-content-center">
              <h5>${mealInfo[i].strMeal}</h5>
                </div>
            </div>`;
    console.log(mealInfo);
    document.getElementById("rowData").innerHTML = box;
  }
}

let areaNav = document.getElementById("Area");
areaNav.addEventListener("click", getMealArea);

async function getMealArea() {
  $(".deleteDiv,#searchedBar,#searchBars").remove();
  let mealArea = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let myAreaResponse = await mealArea.json();
  console.log(myAreaResponse);
  let myArea = await myAreaResponse.meals;
  console.log(myArea);
  let box = "";
  for (let i = 0; i < 20; i++) {
    box += `<div class="col-md-6 col-lg-3 my-3  deleteDiv  ">
    <div class="  rounded position-relative text-center">
        <div onclick="filterAreas('${myArea[i].strArea}')" class="areaSelect">
            <i class="fa-solid fa-city fa-3x text-danger"></i>
            <h2 class="text-white">${myArea[i].strArea}</h2>
        </div>
    </div>
</div>`;
  }
  document.getElementById("rowData").innerHTML = box;
}
async function filterAreas(Area) {
  $(".deleteDiv,#searchedBar,#searchBars").remove();
  let mealArea = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`
  );
  let myResponseAre = await mealArea.json();
  console.log(myResponseAre);
  let areaInfo = await myResponseAre.meals;
  console.log(areaInfo);
  let box = "";
  for (let i = 0; i < 20; i++) {
    // if(){}
    box += `<div  class="col-md-3 deleteDiv myMeal text-white">
              <img onclick="mealDetails(${areaInfo[i].idMeal})" class="w-100 my-3" src="${areaInfo[i].strMealThumb}" alt="Yummy"><br>
              <div class="layer-img d-flex align-items-center justify-content-center">
              <h5>${areaInfo[i].strMeal}</h5>
                </div>
            </div>`;
    console.log(areaInfo);
    document.getElementById("rowData").innerHTML = box;
  }
}

let ingredientNav = document.getElementById("Ingredients");
ingredientNav.addEventListener("click", getIngredients);

async function getIngredients() {
  $(".deleteDiv,#searchedBar,#searchBars").remove();
  let mealIngredient = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let myIngredientResponse = await mealIngredient.json();
  console.log(myIngredientResponse);
  let myIngredient = await myIngredientResponse.meals;
  console.log(myIngredient);
  let box = "";
  for (let i = 0; i < 20; i++) {
    box += `<div class="col-md-6 col-lg-3 my-3 Ingredient-info">
    <div onclick="getIngredientInfo('${
      myIngredient[i].strIngredient
    }')" class=" rounded position-relative">
        <div class="IngredientColor text-center">
            <i class="fa-solid fa-bowl-food fa-3x"></i>
            <h2 class="text-white">${myIngredient[i].strIngredient}</h2>
            <p class="text-white">${myIngredient[i].strDescription.slice(
              0,
              100
            )}</p>
        </div>
    </div>
</div>`;
  }
  document.getElementById("rowData").innerHTML = box;
}

async function getIngredientInfo(IngredientName) {
  $(".deleteDiv,#searchedBar,#searchBars").remove();
  let IngredientInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientName}`
  );
  let myResponseIng = await IngredientInfo.json();
  console.log(myResponseIng);
  let IngredientsInfo = await myResponseIng.meals;
  console.log(IngredientsInfo);
  let box = "";
  for (let i = 0; i < 20; i++) {
    // if(){}
    box += `<div  class="col-md-3 deleteDiv myMeal text-white">
              <img onclick="mealDetails(${IngredientsInfo[i].idMeal})"
               class="w-100 my-3" src="${IngredientsInfo[i].strMealThumb}" alt="Yummy"><br>
              <div class="layer-img d-flex align-items-center justify-content-center">
              <h1>${IngredientsInfo[i].strMeal}</h1>
                </div>
            </div>`;
    document.getElementById("rowData").innerHTML = box;
  }
}

function validate() {
  var pnameAlert = document.getElementById("pnameAlert");

  // var nameRegex = /^[a-zA-Z]/;
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]/;

  var pname = nameInput.value;
  console.log(nameInput.value);

  if (!specialChars.test(pname)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    pnameAlert.classList.add("d-none");
    names = true;
  } else {
    pnameAlert.classList.remove("d-none");
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    names = false;
  }

  checkvalidation();
}

function mailValidate() {
  var pemail = emailInput.value;

  mailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

  if (mailRegex.test(pemail)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    pnameEmail.classList.add("d-none");
    mails = true;
  } else {
    pnameEmail.classList.remove("d-none");
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    mails = false;
  }
  checkvalidation();
}

function phoneValidate() {
  var pmobAlert = document.getElementById("pmobAlert");

  var phoneRegex = /^[0-9]{11}$/;

  var pphone = mobileInput.value;

  if (phoneRegex.test(pphone)) {
    mobileInput.classList.add("is-valid");
    mobileInput.classList.remove("is-invalid");
    pmobAlert.classList.add("d-none");

    phones = true;
  } else {
    pmobAlert.classList.remove("d-none");
    mobileInput.classList.add("is-invalid");
    mobileInput.classList.remove("is-valid");
    phones = false;
  }
  checkvalidation();
}

function passwordValidation() {
  var passAlert = document.getElementById("passAlert");
  var passInput = document.getElementById("passWord");

  var passRegex = /^(?=.*[A-Za-z])(?=.\d)[A-Za-z*\d]{8,}$/;

  var pass = passInput.value;

  console.log(pass);
  if (passRegex.test(pass)) {
    passInput.classList.add("is-valid");
    passInput.classList.remove("is-invalid");
    passAlert.classList.add("d-none");
    passwords = true;
  } else {
    passAlert.classList.remove("d-none");
    passInput.classList.add("is-invalid");
    passInput.classList.remove("is-valid");
    passwords = false;
  }

  checkvalidation();
}

function REpasswordValidation() {
  var passInput = document.getElementById("passWord");
  var prepassAlert = document.getElementById("prepassAlert");

  if (repass.value == passInput.value) {
    repass.classList.add("is-valid");
    repass.classList.remove("is-invalid");
    prepassAlert.classList.add("d-none");
    repassword = true;
  } else {
    prepassAlert.classList.remove("d-none");
    repass.classList.add("is-invalid");
    repass.classList.remove("is-valid");
    repassword = false;
  }
  checkvalidation();
}

var names = false;
var phones = false;
var mails = false;
var passwords = false;
var repassword = false;

function checkvalidation() {
  var btn_dis = document.getElementById("btn-dis");
  if (names && phones && mails && passwords && repassword) {
    btn_dis.classList.remove("disabled");
  } else {
    btn_dis.classList.add("disabled");
  }
}

let contactNav = document.getElementById("ContactUs");
contactNav.addEventListener("click", login);

function login() {
  $(".deleteDiv,#searchedBar,#searchBars").remove();
  // $(".hide").remove();

  document.getElementById("rowData").innerHTML = `
 <div class="myDiv deleteDiv">
      <h2 class="text-center mt-5 fw-bold" on+ >Contact US</h2>
      <div class="inputs text-center w-50 mt-5 m-auto">
          <input type="text" placeholder="Email" class="form-control m-2" id="emailInput">
          <div id="pnameEmail" class="alert alert-danger d-none">
              <p>please write valid email</p>
            </div>
          <input type="text" placeholder="Name" id="nameInput" class="form-control m-2">
  
          <div id="pnameAlert" class="alert alert-danger d-none">
            <p>Special char and numbers not allowed</p>
          </div>
          <input type="number" id="mobileInput" placeholder="Mobile" class="form-control m-2">
          <div id="pmobAlert" class="alert alert-danger d-none">
              <p>Enter a valid mobile number</p>
            </div>
          <input type="password" id="passWord" placeholder="password" class="form-control m-2">
          <div id="passAlert" class="alert alert-danger d-none">
              <p>Minimum eight characters, at least one letter and one number
              </p>
            </div>
          <input type="password" id="repass" placeholder="Confirm Password" class="form-control m-2">
          <div id="prepassAlert" class="alert alert-danger d-none">
              <p>enter a valid re-password
              </p>
            </div>
            <button class="btn btn-danger disabled" id="btn-dis">Submit</button>
     </div>
     </div>`;
  // let btn_dis = document.getElementById("btn-dis");
  var emailInput = document.getElementById("emailInput");
  var passInput = document.getElementById("passWord");
  var repass = document.getElementById("repass");
  var nameInput = document.getElementById("nameInput");
  var mobileInput = document.getElementById("mobileInput");
  nameInput.addEventListener("keyup", validate);
  mobileInput.addEventListener("keyup", phoneValidate);
  emailInput.addEventListener("keyup", mailValidate);
  passInput.addEventListener("keyup", passwordValidation);
  repass.addEventListener("keyup", REpasswordValidation);
  // btn_dis.addEventListener("change", checkvalidation);
}
