const API_KEY = "4f7285dc";

/**
 * @description - Fetches 10 movie title, description and image
 */
async function fetchMovies(pageNumber) {
  console.log(pageNumber);

  // Clean old results
  cleanup();

  // Capture the search terms
  const searchTerm = document.querySelector("#search-btn").value; // .value in order to get the input value
  console.log(`The movie searched is ${searchTerm}`);

  const movieData = await fetch(
    `https://omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${
      pageNumber || 1
    }`
  );
  const data = await movieData.json();
  console.log(data);
  const pages = parseInt(data.totalResults / 10) + 1;
  // console.log(pages);

  showPaginator(pages);

  // for (i = 0; i < pages; i++) {}

  // console.log(data.Search.length);

  /**
   * Shape of data returned by the API
   *
   * data = {
   *   Response: True || False
   *   data: [{}, {}, {}]
   * }
   */

  // Handle Response
  // In case of error
  if (data.Response === "False") {
    const errorSelection = document.querySelector(".error");
    const errorMessage = document.createElement("h3");

    errorMessage.innerText = "Search not found! Try Again :/";
    errorMessage.style.color = "white";
    errorMessage.style.textAlign = "center";

    errorSelection.append(errorMessage);
  }
  // In case of successful request
  else {
    // TODO: Update UI to show movie cards
    const movieArray = data.Search;
    console.log(movieArray);
    movieArray.forEach((movie) => {
      const wrapperCard = document.createElement("div");
      wrapperCard.classList.add("card");
      wrapperCard.style.width = "18rem";

      const wrapperBody = document.createElement("div");
      wrapperBody.classList.add("card-body");

      const title = document.createElement("h5");
      title.innerText = movie.Title;
      title.classList.add("card-title");

      const year = document.createElement("p");
      year.innerText = movie.Year;
      year.classList.add("card-text");

      const type = document.createElement("p");
      type.innerText = movie.Type;
      type.classList.add("card-text");

      const image = document.createElement("img");
      console.log(image.getAttribute("src"));
      if (movie.Poster === "N/A") {
        image.setAttribute("src", "images/default-image.png");
      } else {
        image.src = movie.Poster;
      }
      image.classList.add("card-img-top");

      const movieLike = document.createElement("div");
      movieLike.classList.add("movieLike");
      const heart = document.createElement("img");
      heart.style.width = "20px";
      movieLike.style.display = "flex";
      movieLike.style.justifyContent = "center";
      movieLike.style.cursor = "pointer";
      heart.setAttribute("src", "images/heart.svg");
      // movieLike.onclick(function(movie){})
      movieLike.append(heart);

      wrapperCard.append(image, wrapperBody);
      wrapperBody.append(title, type, year, movieLike);

      // Render it in the body
      const resultSection = document.querySelector(".results");
      resultSection.append(wrapperCard);
    });
  }

  // Request: `https://omdbapi.com/?apikey=${key}&s=${searchTerm}&page=${page}`
  // E.g. request: `https://omdbapi.com/?apikey=4f7285dc&s=movie&page=2`
}

const cleanup = () => {
  const errorSec = document.querySelector(".error");
  const cardSec = document.querySelector(".results");
  const pagSec = document.querySelector(".paginator");

  errorSec.querySelectorAll("*").forEach((n) => n.remove()); // removing every node of the node list given by querySecelectorAll
  cardSec.querySelectorAll("*").forEach((n) => n.remove());
  if (pagSec) {
    pagSec.querySelectorAll("*").forEach((n) => n.remove());
  }
};

const cleanup2 = () => {
  // const errorSec = document.querySelector(".error");
  // const cardSec = document.querySelector(".results");
  // const pagSec = document.querySelector(".paginator");

  const arrayOfSections = [".error", ".results", ".paginator"].map(
    // we made an array of classes and maped them to query select each of them
    (className) => document.querySelector(className)
  );

  // const arrayOfSections = [errorSec, cardSec, pagSec];
  // const arrayOfSections = document.querySelector(
  //   ".paginator, .error, .results"
  // );

  arrayOfSections.forEach((sec) => {
    sec.querySelectorAll("*").forEach((n) => n.remove());
  });

  // errorSec.querySelectorAll("*").forEach((n) => n.remove()); // removing every node of the node list given by querySecelectorAll
  // cardSec.querySelectorAll("*").forEach((n) => n.remove());
  // if (pagSec) {
  //   pagSec.querySelectorAll("*").forEach((n) => n.remove());
  // }
};

// showpaginator function
const showPaginator = (pages) => {
  const wrapperNav = document.createElement("nav");
  wrapperNav.classList.add("pagination-section");

  const wrapperUl = document.createElement("ul");
  wrapperUl.classList.add("pagination");

  for (let page = 0; page < pages; page++) {
    const pageElement = document.createElement("li");
    pageElement.classList.add("page-item", "page-link", "pe-auto");
    pageElement.style.cursor = "pointer";
    pageElement.textContent = page + 1;

    //binding page elements to js fucntion
    pageElement.onclick = function () {
      const pageNumber = page + 1;
      fetchMovies(pageNumber);
    };
    wrapperUl.append(pageElement);
  }

  wrapperNav.append(wrapperUl);
  const paginator = document.querySelector(".paginator");
  paginator.append(wrapperNav);
};
// * Render Cards using the data from API.
