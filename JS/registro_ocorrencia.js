// Função para capturar parâmetros da URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Função principal que é executada quando a página carrega
async function init() {
    try {
        console.log('Iniciando carregamento da página...');
        
        const matriculaSelecionada = getQueryParam("matricula");
        console.log('Matrícula capturada da URL:', matriculaSelecionada);
        
        if (!matriculaSelecionada) {
            console.error('Nenhuma matrícula fornecida na URL');
            return;
        }

        // 1. BUSCAR DADOS DO ALUNO
        console.log('Iniciando busca dos dados do aluno...');
        const responseAluno = await fetch("http://10.107.134.37:8080/v1/registro-ocorrencias/alunos");
        
        if (!responseAluno.ok) {
            throw new Error(`Erro na requisição: ${responseAluno.status}`);
        }
        
        const resultadoAluno = await responseAluno.json();
        console.log('Dados brutos da API de alunos:', resultadoAluno);

        if (!resultadoAluno.status || !Array.isArray(resultadoAluno.alunos)) {
            console.error('Estrutura de dados inesperada da API de alunos');
            return;
        }

        const aluno = resultadoAluno.alunos.find(a => {
            console.log(`Comparando: ${a.matricula} com ${matriculaSelecionada}`);
            return String(a.matricula) === String(matriculaSelecionada);
        });
        
        console.log('Aluno encontrado:', aluno);
        
        if (!aluno) {
            document.getElementById("relato").textContent = "Aluno não encontrado";
            return;
        }

        // Preenche os dados do aluno
        document.getElementById("nome").value = aluno.nome || "";
        document.getElementById("matricula").value = aluno.matricula || "";

        if (aluno.data_nascimento) {
            document.getElementById("ano").value = formatarData(aluno.data_nascimento);
        }

        // Preenche turmas (se existirem)
        if (aluno.turmas?.length > 0) {
            const primeiraTurma = aluno.turmas[0];
            document.getElementById("turma").value = primeiraTurma.nome?.slice(-1) || "";
            document.getElementById("curso").value = primeiraTurma.curso || "";
            
            // Exibe todas as turmas no campo específico
            const turmasFormatadas = aluno.turmas.map(t => 
                `Turma: ${t.nome || 'N/A'}\nCurso: ${t.curso || 'N/A'}\nTurno: ${t.turno || 'N/A'}\n───────────────`
            ).join('\n');
            
            document.getElementById("listaTurmas").textContent = turmasFormatadas || "Sem dados de turma";
        }

        // 2. BUSCAR OCORRÊNCIAS
        console.log('Iniciando busca de ocorrências...');
        await buscarRelatoOcorrencia(aluno.matricula);

    } catch (error) {
        console.error("Erro fatal:", error);
        document.getElementById("relato").textContent = "Erro ao carregar dados do aluno";
    }
}

// Função para buscar ocorrências
// Função para buscar ocorrências
async function buscarRelatoOcorrencia(matricula) {
    try {
        console.log(`Buscando ocorrências para matrícula: ${matricula}`);
        
        const response = await fetch("http://10.107.134.37:8080/v1/registro-ocorrencias/ocorrencia");
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const resultado = await response.json();
        console.log('Dados brutos de ocorrências:', resultado);

        // Verificação do formato dos dados
        if (!resultado || !resultado.ocorrencia || !Array.isArray(resultado.ocorrencia)) {
            document.getElementById("relato").textContent = "Formato de dados inválido";
            return;
        }

        // Filtra ocorrências do aluno e remove duplicados
        const ocorrenciasUnicas = [];
        const textosVistos = new Set();
        
        resultado.ocorrencia.forEach(oc => {
            if (oc.alunos?.some(aluno => String(aluno.matricula) === String(matricula))) {
                const textoRelato = oc.relato?.trim() || 'Sem descrição da ocorrência';
                
                if (!textosVistos.has(textoRelato)) {
                    textosVistos.add(textoRelato);
                    ocorrenciasUnicas.push({
                        relato: textoRelato,
                        dataOcorrencia: oc.dataOcorrencia
                    });
                }
            }
        });

        console.log(`Ocorrências únicas encontradas: ${ocorrenciasUnicas.length}`);

        // Atualiza o histórico
        if (ocorrenciasUnicas.length === 0) {
            document.getElementById("relato").textContent = "Nenhuma ocorrência registrada para este aluno";
            return;
        }

        // Formatação simplificada (apenas relatos únicos)
        const relatosFormatados = ocorrenciasUnicas.map(oc => oc.relato).join('\n\n');

        document.getElementById("relato").textContent = relatosFormatados;

    } catch (error) {
        console.error("Erro ao buscar ocorrências:", error);
        document.getElementById("relato").textContent = "Erro ao carregar ocorrências";
    }
}
// Função para formatar data
function formatarData(dataString) {
    try {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    } catch {
        return 'Data inválida';
    }
}

// Evento do formulário
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const matricula = document.getElementById("matricula").value;
    window.location.href = `add_ocorrencia.html?matricula=${matricula}`;
});

// Inicia quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", init);