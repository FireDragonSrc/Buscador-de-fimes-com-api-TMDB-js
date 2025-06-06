let index = 0;

const carrossel = document.querySelector(".carrossel");
const conteudoSlide = document.querySelector(".conteudoSlide");

setInterval(() => {
  atualizaCarrossel();
}, 1500);

function atualizaCarrossel() {
  let largura = carrossel.offsetWidth;
  let total = conteudoSlide.children.length;

  index++;

  if (index >= total) {
    index = 0;
  }
  conteudoSlide.style.transform = `translateX(-${index * largura}px)`;
}
