async function init() {
    const matriculaInput = document.getElementById("matricula");
  
    matriculaInput.addEventListener("blur", async () => {
      const matricula = matriculaInput.value.trim();
      if (matricula) {
        await buscarAlunoPorMatricula(matricula);
      }
    });
  }
  
  async function buscarAlunoPorMatricula(matricula) {
    try {
      const response = await fetch("URL_DO_ENDPOINT_DE_ALUNOS");
      const resultado = await response.json();
  
      if (!resultado.status || !Array.isArray(resultado.alunos)) {
        alert("Erro no retorno da API.");
        return;
      }
  
      const aluno = resultado.alunos.find(a => a.matricula === matricula);
  
      if (!aluno) {
        alert("Aluno não encontrado.");
        return;
      }
  
      // Preencher os campos do formulário
      document.querySelector("input[placeholder='Nome Completo']").value = aluno.nome;
  
      const nascimento = new Date(aluno.data_nascimento);
      document.querySelector("input[placeholder='DD/MM/AAAA']").value = nascimento.toLocaleDateString("pt-BR");
  
      if (aluno.turmas && aluno.turmas.length > 0) {
        const turma = aluno.turmas[0];
        document.querySelector("select[name='turma']").value = turma.nome.slice(-1); // Ex: "3-A" → "A"
        document.querySelector("select[name='curso']").value = turma.curso;
      }
  
      // Histórico de Ocorrências
      if (aluno.ocorrencias) {
        document.querySelector("textarea[placeholder='Histórico de Ocorrências']").value = aluno.ocorrencias.join("\n");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      alert("Erro ao buscar dados do aluno.");
    }
  }
  
  // Chamar a função principal quando o DOM estiver carregado
  document.addEventListener("DOMContentLoaded", init);
  