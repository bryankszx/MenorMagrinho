async function carregarTurmas() {
  try {
    const resposta = await fetch("http://10.107.134.29:8080/v1/registro-ocorrencias/turma");
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

carregarTurmas();
