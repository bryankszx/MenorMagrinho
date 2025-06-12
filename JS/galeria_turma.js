async function carregarTurmas() {
  try {
    const resposta = await fetch("http://localhost:8080/v1/registro-ocorrencias/turma");
    const respostaJson = await resposta.json();

    console.log("Resposta da API:", respostaJson);

    respostaJson.turmas.forEach((turma) => {
      const container = document.getElementById('card-grid')
      console.log(turma)
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = "../IMGS/senai.png"

      const div2 = document.createElement("div")
      div2.classList.add("div2")

      const nome = document.createElement("h2");
      nome.textContent = turma.nome;

      const curso = document.createElement("p");
      curso.textContent = `Curso: ${turma.curso}`;

      const periodo = document.createElement("p");
      periodo.textContent = `Período: ${turma.periodo}`;

      div2.appendChild(curso)
      div2.appendChild(periodo);

      card.appendChild(img)
      card.appendChild(nome);
      card.appendChild(div2);
  
      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao buscar turmas:", erro);
    alert("Erro ao buscar turmas da API.");
  }
}

async function buscarPeloId(){
    
  const url = `http://localhost:8080/v1/registro-ocorrencias/turma/:${id}`

  //Pede para o fetch fazer uma requisição na url
  const response = await fetch(url)

  const data = await response.json()

  console.log(data)

  return data
}

async function exibirPesquisa(evento){
  const container = document.getElementById('card-grid')
  if(evento.key == 'Enter'){
      container.replaceChildren()
      const alunos = await buscarPeloId(evento.target.value)
      alunos.forEach(criarCard)
  }
}

carregarTurmas();

document.getElementById('input').addEventListener('keydown', exibirPesquisa)

