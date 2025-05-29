// Carregar cargos da API
async function carregarCargos() {
  try {
    const resposta = await fetch("http://10.107.144.19:8080/v1/registro-ocorrencias/cargo");
    const cargos = await resposta.json();

    const select = document.getElementById("cargo");
    cargos.forEach(cargo => {
      const option = document.createElement("option");
      option.value = cargo.id;
      option.textContent = cargo.nome;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar cargos:");
    alert("Não foi possível carregar os cargos.");
  }
}

// Enviar dados do formulário
document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  const dados = {
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    senha: senha,
    id_cargo: parseInt(document.getElementById("cargo").value)
  };

  try {
    const resposta = await fetch("http://10.107.144.19:8080/v1/registro-ocorrencias/educador", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const data = await resposta.json();

    if (data.status_code === 201) {
      alert("Educador cadastrado com sucesso!");
      document.getElementById("cadastroForm").reset();
    } else {
      alert("Erro ao cadastrar: " + data.message);
    }
  } catch (error) {
    console.error("Erro ao cadastrar educador:", error);
    alert("Erro ao conectar com a API.");
  }
});

// Executar carregamento ao abrir a página
carregarCargos();
