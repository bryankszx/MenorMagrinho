async function carregarTurmas() {
    try {
      const resposta = await fetch("http://localhost:8080/v1/registro-ocorrencias/turma");
      const respostaJson = await resposta.json();
      const turmas = respostaJson.data || [];
  
      const container = document.querySelector(".card-grid");
  
      // Limpa os cards antigos
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
  
      turmas.forEach(turma => {
        const card = document.createElement("div");
        card.classList.add("card");
  
        // Remove o ID do topo, não cria mais esse elemento
  
        const nome = document.createElement("h3");
        nome.textContent = turma.nome;
  
        const curso = document.createElement("p");
        curso.textContent = `Curso: ${turma.curso}`;
  
        const periodo = document.createElement("p");
        periodo.textContent = `Período: ${turma.periodo}`;
  
        const maxAlunos = document.createElement("p");
        maxAlunos.textContent = `Máx. Alunos: ${turma.quantidade_maxima}`;
  
        // Adiciona os elementos ao card
        card.appendChild(nome);
        card.appendChild(curso);
        card.appendChild(periodo);
        card.appendChild(maxAlunos);
  
        container.appendChild(card);
      });
  
    } catch (erro) {
     
      alert("Erro ao buscar turmas da API.");
    }
  }
  
  carregarTurmas();
  