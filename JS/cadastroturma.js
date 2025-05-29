// Carrega cursos no dropdown

 async function carregarCursos() {
  try {
    const resposta = await fetch("http://10.107.144.19::8080/v1/registro-ocorrencias/cursos");

    if (!resposta.ok) {
      throw new Error("Erro na resposta da API");
    }

    const cursos = await resposta.json();
    const select = document.getElementById("curso");

    cursos.forEach(curso => {
      const option = document.createElement("option");
      option.value = curso.id;
      option.textContent = curso.nome;
      select.appendChild(option);
    });

  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
    alert("Não foi possível carregar os cursos.");
  }
}

// Chama a função assim que a página carregar
carregarCursos();

// Envio do formulário
document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value.trim(),
    curso_id: parseInt(document.getElementById("curso").value),
    ano_inicio: document.getElementById("inicio").value,
    ano_termino: document.getElementById("termino").value,
    quantidade_maxima: parseInt(document.getElementById("quantidade").value)
  };

  try {
    const resposta = await fetch("http://10.107.144.19:8080/v1/registro-ocorrencias/turma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const data = await resposta.json();

    if (data.status_code === 201) {
      alert("Turma cadastrada com sucesso!");
      document.getElementById("cadastroForm").reset();
    } else {
      alert("Erro ao cadastrar turma: " + data.message);
    }

  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao conectar com a API.");
  }
});
