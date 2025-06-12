document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ocorrenciaForm');
    const mensagemDiv = document.getElementById('mensagem');

    // Configuração dos endpoints
    const API_BASE_URL = 'https://localhost:8080/v1/registro-ocorrencias/tipo';
    const endpoints = {
        BRIGA: {
            GRAVE: `${API_BASE_URL}/briga/grave`,
            LEVE: `${API_BASE_URL}/briga/leve`
        },
        REGRA: {
            GRAVE: `${API_BASE_URL}/regras/grave`,
            LEVE: `${API_BASE_URL}/regras/leve`
        },
        ATIVIDADE: {
            GRAVE: `${API_BASE_URL}/atividades/grave`,
            LEVE: `${API_BASE_URL}/atividades/leve`
        },
        COMPORTAMENTO: {
            GRAVE: `${API_BASE_URL}/comportamento/grave`,
            LEVE: `${API_BASE_URL}/comportamento/leve`
        }
    };

    form.addEventListener('submit', handleSubmit);

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = getFormData();
            validateFormData(formData);
            
            const endpoint = getEndpoint(formData.tipo, formData.gravidade);
            const responseData = await registerOccurrence(endpoint, formData);
            
            showSuccessMessage(responseData);
            form.reset();
            
        } catch (error) {
            handleError(error);
        }
    }

    function getFormData() {
        return {
            tipo: document.getElementById('tipoOcorrencia').value,
            gravidade: document.getElementById('gravidade').value,
            descricao: document.getElementById('historico').value,
            quantidade: document.getElementById('quantidade').value || 1
        };
    }

    function validateFormData({ tipo, gravidade, descricao }) {
        if (!tipo || !gravidade || !descricao) {
            throw new Error('Preencha todos os campos obrigatórios');
        }
    }

    function getEndpoint(tipo, gravidade) {
        const endpoint = endpoints[tipo]?.[gravidade];
        if (!endpoint) throw new Error('Combinação tipo/gravidade não encontrada');
        return endpoint;
    }

    async function registerOccurrence(endpoint, { descricao, quantidade }) {
        const payload = {
            descricao,
            quantidade: parseInt(quantidade),
            dataRegistro: new Date().toISOString()
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro na requisição');
        }

        return await response.json();
    }

    function showSuccessMessage(data) {
        const message = data.id 
            ? `Registrado com sucesso! ID: ${data.id}`
            : 'Ocorrência registrada com sucesso!';
        
        mostrarMensagem(message, 'sucesso');
    }

    function handleError(error) {
        console.error('Erro:', error);
        mostrarMensagem(error.message, 'erro');
    }

    function mostrarMensagem(texto, tipo) {
        mensagemDiv.textContent = texto;
        mensagemDiv.className = tipo;
        setTimeout(() => mensagemDiv.textContent = '', 5000);
    }
});