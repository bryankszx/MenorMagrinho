async function init() {
  try {
    const response = await fetch("http://localhost:8080/v1/registro-ocorrencias/alunos");
    const resultado = await response.json();

    console.log("Dados recebidos da API:", resultado);

    if (!resultado.status || !Array.isArray(resultado.alunos)) {
      alert("Erro no retorno da API.");
      return;
    }

    const aluno = resultado.alunos[0];
    if (!aluno) {
      alert("Nenhum aluno encontrado.");
      return;
    }

    document.getElementById("nome").value = aluno.nome || "";
    document.getElementById("matricula").value = aluno.matricula || "";

    if (aluno.data_nascimento) {
      const nascimento = new Date(aluno.data_nascimento);
      const dia = String(nascimento.getDate()).padStart(2, "0");
      const mes = String(nascimento.getMonth() + 1).padStart(2, "0");
      const ano = nascimento.getFullYear();
      document.getElementById("ano").value = `${dia}/${mes}/${ano}`;
    } else {
      document.getElementById("ano").value = "";
    }

    // Exibe todas as turmas do aluno no console
    console.log("Turmas do aluno:", aluno.turmas);

    if (aluno.turmas && aluno.turmas.length > 0) {
      // Preenche com a primeira turma como antes
      const primeiraTurma = aluno.turmas[0];
      document.getElementById("turma").value = primeiraTurma.nome ? primeiraTurma.nome.slice(-1) : "";
      document.getElementById("curso").value = primeiraTurma.curso || "";

      // Monta uma string listando todas as turmas
      const listaTurmas = aluno.turmas
        .map(t => `Nome: ${t.nome}, Período: ${t.periodo}, Curso: ${t.curso}, Máx alunos: ${t.max_alunos}`)
        .join("\n");

      // Exemplo: coloca essa lista numa textarea ou div com id="listaTurmas"
      const listaTurmasElement = document.getElementById("listaTurmas");
      if (listaTurmasElement) {
        listaTurmasElement.textContent = listaTurmas;
      }
    } else {
      document.getElementById("turma").value = "";
      document.getElementById("curso").value = "";
      const listaTurmasElement = document.getElementById("listaTurmas");
      if (listaTurmasElement) {
        listaTurmasElement.textContent = "Nenhuma turma cadastrada.";
      }
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    alert("Erro ao buscar dados do aluno.");
  }
}

document.addEventListener("DOMContentLoaded", init);
