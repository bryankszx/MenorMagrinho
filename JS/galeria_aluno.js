async function carregarAlunos() {
  try {
    const resposta = await fetch("http://10.107.134.37:8080/v1/registro-ocorrencias/alunos");
    const respostaJson = await resposta.json();

    console.log("Resposta da API:", respostaJson);

    const lista = respostaJson.alunos || [];
    const container = document.getElementById('card-grid');

    // Limpa cards antigos
    container.innerHTML = '';

    lista.forEach(aluno => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Evento de clique no card → redireciona
      card.addEventListener("click", () => {
        window.location.href = `registro_ocorrencia.html?matricula=${aluno.matricula}`;
      });

      // Imagem
      const img = document.createElement("img");
      img.src = "../IMGS/user.png";
      card.appendChild(img);

      const div2 = document.createElement("div");
      div2.classList.add("div2");

      // Nome
      const nome = document.createElement("h3");
      nome.textContent = aluno.nome;
      card.appendChild(nome);

      // Matrícula
      const matricula = document.createElement("p");
      matricula.textContent = `Matrícula: ${aluno.matricula}`;
      div2.appendChild(matricula);

      // Data de nascimento
      const nascimento = document.createElement("p");
      const data = new Date(aluno.data_nascimento);
      nascimento.textContent = `Nasc.: ${data.toLocaleDateString('pt-BR')}`;
      div2.appendChild(nascimento);

      card.appendChild(div2);

      container.appendChild(card);
    });

  } catch (erro) {
    console.error("Erro ao buscar Alunos:", erro);
    alert("Erro ao buscar alunos da API.");
  }
}

carregarAlunos();
