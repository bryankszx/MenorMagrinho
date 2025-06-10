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

      const nome = document.createElement("h3");
      nome.textContent = turma.nome;

      const curso = document.createElement("p");
      curso.textContent = `Curso: ${turma.curso}`;

      const periodo = document.createElement("p");
      periodo.textContent = `Período: ${turma.periodo}`;

      const maxAlunos = document.createElement("p");
      maxAlunos.textContent = `Máx. Alunos: ${turma.max_alunos}`; // ✅ Aqui está o ajuste

      card.appendChild(nome);
      card.appendChild(curso);
      card.appendChild(periodo);
      card.appendChild(maxAlunos);
      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao buscar turmas:", erro);
    alert("Erro ao buscar turmas da API.");
  }
}

carregarTurmas();
