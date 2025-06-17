async function init() {
    try {
      // Buscar dados dos alunos
      const response = await fetch("http://10.107.134.37:8080/v1/registro-ocorrencias/alunos");
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
        const primeiraTurma = aluno.turmas[0];
        document.getElementById("turma").value = primeiraTurma.nome ? primeiraTurma.nome.slice(-1) : "";
        document.getElementById("curso").value = primeiraTurma.curso || "";
  
        const listaTurmas = aluno.turmas
          .map(t => `Nome: ${t.nome}, Período: ${t.periodo}, Curso: ${t.curso}, Máx alunos: ${t.max_alunos}`)
          .join("\n");
  
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
  
      // 🔥 Buscar os registros de ocorrência (apenas relatos)
      buscarRelatoOcorrencia(aluno.matricula);
  
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      alert("Erro ao buscar dados do aluno.");
    }
  }
  
  // 🔥 Função para buscar os registros de ocorrência e exibir o relato
  async function buscarRelatoOcorrencia(matricula) {
    try {
      const response = await fetch("http://10.107.134.37:8080/v1/registro-ocorrencias/ocorrencia");
      const resultado = await response.json();
  
      console.log("Ocorrências recebidas da API:", resultado);
  
      if (!Array.isArray(resultado.ocorrencia)) {
        console.error("Formato inválido de ocorrências.");
        return;
      }
  
      // Filtra ocorrências que possuem o aluno com a matrícula informada
      const ocorrenciasDoAluno = resultado.ocorrencia.filter(oc =>
        oc.alunos.some(aluno => aluno.matricula === matricula)
      );
  
      if (ocorrenciasDoAluno.length === 0) {
        document.getElementById("relato").textContent = "Nenhuma ocorrência registrada.";
        return;
      }
  
      // Pega os relatos e junta em uma string
      const relatos = ocorrenciasDoAluno.map(oc => `• ${oc.relato}`).join("\n");
  
      // Exibe no elemento com id="relato"
      const relatoElement = document.getElementById("relato");
      if (relatoElement) {
        relatoElement.textContent = relatos;
      }
    } catch (error) {
      console.error("Erro ao buscar ocorrências:", error);
      alert("Erro ao buscar ocorrências.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", init);
  