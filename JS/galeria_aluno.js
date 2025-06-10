async function carregarAlunos() {
  try {
    const resposta = await fetch("http://10.107.134.29:8080/v1/registro-ocorrencias/alunos");
    const respostaJson = await resposta.json();

    console.log("Resposta da API:", respostaJson);

    // A chave correta é 'alunos', que é um array
    const lista = respostaJson.alunos || [];

    const container = document.getElementById('card-grid');

    // Remove cards antigos
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Para cada aluno, cria um card
    lista.forEach(aluno => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Img
      const img = document.createElement("img");
      img.src = "../IMGS/user.png"
      card.appendChild(img)

      const div2 = document.createElement("div")
      div2.classList.add("div2")

      // Nome
      const nome = document.createElement("h3");
      nome.textContent = aluno.nome;
      card.appendChild(nome);

      // Matrícula
      const matricula = document.createElement("p");
      matricula.textContent = `Matrícula: ${aluno.matricula}`;
      div2.appendChild(matricula);

      // Data de nascimento (formatada)
      const nascimento = document.createElement("p");
      const data = new Date(aluno.data_nascimento);
      nascimento.textContent = `Nasc.: ${data.toLocaleDateString('pt-BR')}`;
      div2.appendChild(nascimento);

      
      card.appendChild(div2)

      // Adiciona o card ao container
      container.appendChild(card);
    });

  } catch (erro) {
    console.error("Erro ao buscar Alunos:", erro);
    alert("Erro ao buscar alunos da API.");
  }
}

carregarAlunos();
