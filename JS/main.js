// Carregar cargos da API
async function carregarCargos() {
  try {
    const resposta = await fetch("http://localhost:8080/v1/registro-ocorrencias/cargo");
    const respostaJson = await resposta.json();

    console.log("Resposta da API:", respostaJson);

    const cargos = respostaJson.cargos || [];

    const select = document.getElementById("cargo");

    cargos.forEach(cargo => {
      const option = document.createElement("option");
      option.value = cargo.id;
      option.textContent = cargo.nome;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar cargos:", error);
    alert("Não foi possível carregar os cargos.");
  }
}


// Enviar dados do formulário
document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const idEducador = parseInt(document.getElementById("id").value);
  const idCargo = parseInt(document.getElementById("cargo").value);

  if (isNaN(idEducador) || isNaN(idCargo)) {
    alert("ID do educador e cargo devem ser números válidos.");
    return;
  }

  const dados = {
    id: idEducador,
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    senha: document.getElementById("senha").value,
    palavra_chave: document.getElementById("keyword").value.trim(),
    id_cargo: idCargo
  };

  try {
    const resposta = await fetch("http://localhost:8080/v1/registro-ocorrencias/educador", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const data = await resposta.json();

    if (resposta.status === 201) {
      alert("Educador cadastrado com sucesso!");
      document.getElementById("cadastroForm").reset();
    } else {
      alert("Erro ao cadastrar: " + (data.message || "Verifique os dados e tente novamente."));
    }
  } catch (error) {
    console.error("Erro ao cadastrar educador:", error);
    alert("Erro ao conectar com a API.");
  }
});

// Executar carregamento ao abrir a página
carregarCargos();
