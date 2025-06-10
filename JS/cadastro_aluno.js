document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const matricula = document.getElementById("matricula").value.trim();
  const dataNascimentoRaw = document.getElementById("datanascimento").value;
  const id_turma = 1; // ou use um `select` se quiser deixar dinâmico

  if (!nome || !matricula || !dataNascimentoRaw) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const data_nascimento = dataNascimentoRaw; 

  const aluno = {
    nome: nome,
    matricula: matricula,
    data_nascimento: data_nascimento,
    id_turma: id_turma
  };

  console.log("Aluno a ser enviado:", aluno);

  try {
    const resposta = await fetch("http://10.107.134.29:8080/v1/registro-ocorrencias/alunos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno)
    });

    const data = await resposta.json();

    if (resposta.ok && (data.status_code === 201 || data.status_code === 200)) {
      alert("Aluno cadastrado com sucesso!");
      document.getElementById("cadastroForm").reset();
    } else {
      alert("Erro ao cadastrar aluno: " + (data.message || JSON.stringify(data)));
      console.error("Erro ao cadastrar:", data);
    }
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    alert("Erro ao conectar com a API: " + error.message);
  }
});
