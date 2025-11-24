let dados = [];
const cardContainer = document.querySelector(".card-container");

async function carregarDados() {
  let resposta = await fetch("data.json");
  dados = await resposta.json();
  renderizarCards(dados);
}

carregarDados("data.json");
async function iniciarBusca() {
  // Carrega os dados do JSON apenas na primeira busca
  if (dados.length === 0) {
    try {
      const resposta = await fetch("data.json");
      dados = await resposta.json();
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
      cardContainer.innerHTML = "<p>Erro ao carregar a base de dados.</p>";
      return;
    }
  }

  const inputBusca = document.querySelector("header input");
  const termoBusca = inputBusca.value.trim().toLowerCase();

  // Limpa os resultados anteriores
  cardContainer.innerHTML = "";

  if (!termoBusca) {
    // Se a busca for vazia, não exibe nada.
    renderizarCards(dados);
  }

  const resultados = dados.filter(
    (item) => item.DataOracao.toLowerCase() === termoBusca
  );

  if (resultados.length > 0) {
    renderizarCards(resultados);
  } else {
    //cardContainer.innerHTML = "<p>Nenhuma linguagem encontrada.</p>";
    renderizarCards(dados);
  }
}

function renderizarCards(dados) {
  for (let dado of dados) {
    let article = document.createElement("article");
    article.classList.add("card");
    article.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(22, 5, 41, 0.5)), url('${dado.Imagem}')`;
    article.innerHTML = `
      <h1 class="titulo">${dado.TituloOracao}</h1>
      <div class="box-dia">
      <h2 class="dia">${dado.DataOracao}</h2>
      <img src="${dado.Imagem}" alt="${dado.alt}"/>
      <div class="versiculo">
      <p>${dado.Versiculo}</p>
      <a href=${dado.link} target="_blank">Consultar Versículo</a></div>
      </div>
      <div class="box-oracao">
      <h3>VAMOS ORAR</h3>
      <p>${dado.Paragrafo1}</p>
      <p>${dado.Paragrafo2}</p>
      <p>${dado.Paragrafo3}</p>        
      </div>
`;
    cardContainer.appendChild(article);
  }
}
