document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const periodo = document.getElementById("periodo").value.trim();
  const curso = document.getElementById("curso").value.trim(); 
  const max_alunos = parseInt(document.getElementById("quantidade").value);

  if (!nome || !periodo || !curso || isNaN(max_alunos)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const dados = {
    nome: nome,
    periodo: periodo,
    curso: curso, 
    max_alunos: max_alunos
  };

  console.log("Dados enviados:", JSON.stringify(dados, null, 2));

  try {
    const resposta = await fetch("http://10.107.134.24:8080/v1/registro-ocorrencias/turma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const data = await resposta.json();

    if (resposta.ok && (data.status_code === 201 || data.status_code === 200)) {
      alert("Turma cadastrada com sucesso!");
      document.getElementById("cadastroForm").reset();
    } else {
      alert("Erro ao cadastrar turma: " + (data.message || JSON.stringify(data)));
      console.error("Erro ao cadastrar:", data);
    }

  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    alert("Erro ao conectar com a API.");
  }
});
