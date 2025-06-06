const searchInput = document.querySelector("#searchBar");
const imgApi = document.querySelectorAll(".imagePost");
const errorMsg = document.querySelector(".errorMsg");
const inicialPage = document.querySelector(".inicialPage");

const conteudo1 = document.querySelector(".conteudo1");
const buttonSearch = document.querySelector(".buttonSearch");
let filmes = [];

const apiKey = "9289afbe0608fae3463b9d9d7f6ceee1";

async function loadMorePages(query, pages = 3) {
  let allResults = [];
  for (let page = 1; page <= pages; page++) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
    );
    const data = await response.json();
    allResults = [...allResults, ...data.results];
  }
  return allResults;
}

searchInput.addEventListener("input", async () => {
  inicialPage.classList.add("hide");
  conteudo1.classList.remove("hide");
  const txt = searchInput.value.toLowerCase();

  const filtrados = await loadMorePages(txt);

  if (filtrados.length > 0) {
    conteudo1.innerHTML = "";

    filtrados.forEach((filme) => {
      if (filme.poster_path) {
        let divInterna = document.createElement("div");
        conteudo1.appendChild(divInterna);
        let image = document.createElement("img");
        image.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w200/${filme.poster_path}`
        );
        divInterna.appendChild(image);
      }
    });
    errorMsg.style.display = "none";
  } else if (searchInput.value === "") {
    inicialPage.classList.remove("hide");
    conteudo1.classList.add("hide");
  } else {
    conteudo1.innerHTML = "";
    errorMsg.style.display = "block";
    errorMsg.innerText = "Nenhum filme encontrado.";
  }
});

async function getDadosApi() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1`
    );
    const data = await response.json();

    data.results.forEach((img, i) => {
      if (imgApi[i]) {
        imgApi[i].setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w200/${img.poster_path}`
        );
      }
    });
  } catch (err) {
    console.error("Erro ao carregar filmes:", err);
  }
}
getDadosApi();
