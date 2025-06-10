// Carregar cargos da API
async function carregarCargos() {
  try {
    const resposta = await fetch("http://10.107.134.33:8080/v1/registro-ocorrencias/cargo");
    const respostaJson = await resposta.json(); //Volta o json 

    console.log("Resposta da API:", respostaJson);

    const cargos = respostaJson.cargos || []; //Cria uma variável que guarda todos os dados dos cargos que o json retornar

    const selecao = document.getElementById("cargo");

    cargos.forEach(cargo => {
      const option = document.createElement("option");
      option.value = cargo.id; //O valor do options será o id dos cargos que o json enviar
      option.textContent = cargo.nome; //O texto do options será o nome dos cargos que o json enviar
      selecao.appendChild(option);  //Adiciona o options na caixa de seleção
    });
  } catch (error) {
    console.error("Erro ao carregar cargos:");
    console.error("Erro ao carregar cargos:", error);
    alert("Não foi possível carregar os cargos.");
  }
}


// Enviar dados do formulário
//Submit -> ação de enviar um formulário e validar os dados antes de enviar
document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
  event.preventDefault(); 

  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const idCargo = parseInt(document.getElementById("cargo").value);

  console.log(idCargo)

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
    palavra_chave: document.getElementById("keyword").value,
    id_cargo: idCargo
  };

  try {
    const resposta = await fetch("http://10.107.134.33:8080/v1/registro-ocorrencias/educador", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
  
    const data = await resposta.json();
  
    console.log("Resposta do servidor:", data);
  
    if (resposta.status === 201) {
      alert("Educador cadastrado com sucesso!");
      document.getElementById("cadastroForm").reset();
    } else {
      alert("Erro ao cadastrar: " + (data.message || "Verifique os dados e tente novamente."));
    }
  
  } catch (error) {
    console.error("Erro ao cadastrar educador:", error);
    alert("Não foi possível conectar com o servidor.");
  }
  
})
// Executar carregamento ao abrir a página
carregarCargos();
