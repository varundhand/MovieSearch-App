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
      // console.log(image.getAttribute("src"));
      if (movie.Poster === "N/A") {
        image.setAttribute("src", "images/default-image.png");
      } else {
        image.src = movie.Poster;
      }
      image.classList.add("card-img-top");

      const movieLike = document.createElement("div");
      movieLike.classList.add("movieLike");
      movieLike.innerHTML =
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path></svg>';

      movieLike.style.display = "flex";
      movieLike.style.justifyContent = "center";
      movieLike.style.cursor = "pointer";

      movieLike.onclick = () => {
        const SVGElement = movieLike.querySelector("svg");
        SVGElement.toggleAttribute("selected");

        const KEY = "favourite-movies";

        // 1. check to see if the movie has an attribute of 'selected'

        // 2. If not selected
        // movie clicked was not a favourite
        const favouriteMovies = JSON.parse(localStorage.getItem(KEY));
        favouriteMovies.push(movie);
        localStorage.setItem(KEY, JSON.stringify(favouriteMovies));

        // If movie clicked was already a favourite

        // 3. Retrevie favourite-movies from local storage

        // 4. Remove clicked element from Array (using filter)

        // 5. Update local storage to new array

        console.log(favouriteMovies, typeof favouriteMovies);

        // localStorage.setItem("FavMovies", JSON.stringify([movie]));
        // const favMovies = JSON.parse(localStorage.getItem("FavMovies"));
        // favMovies += [movie];
        // favMovies.push(/
      };

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
