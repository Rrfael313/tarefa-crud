
// Endpoint da API CrudCrud
// Substitua pelo seu endpoint gerado no CrudCrud
const API_URL = "https://crudcrud.com/api/SEU-CODIGO/clientes";

// Elementos HTML
const formulario = document.getElementById("formCadastro");
const listaClientes = document.getElementById("listaClientes");

// Buscar e exibir clientes (GET)
async function buscarClientes() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar clientes");
        }

        const clientes = await resposta.json();

        console.log("Clientes encontrados:", clientes);

        listaClientes.innerHTML = "";

        clientes.forEach(cliente => {
            const li = document.createElement("li");

            const informacoes = document.createElement("span");
            informacoes.textContent =
                `${cliente.nome} - ${cliente.email}`;

            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.classList.add("btn-excluir");

            botaoExcluir.addEventListener("click", () => {
                excluirCliente(cliente._id);
            });

            li.appendChild(informacoes);
            li.appendChild(botaoExcluir);

            listaClientes.appendChild(li);
        });

    } catch (erro) {
        console.error("Erro:", erro);
    }
}

// Cadastrar cliente (POST)
formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    const cliente = {
        nome: nome,
        email: email
    };

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar cliente");
        }

        console.log("Cliente cadastrado com sucesso!");

        formulario.reset();

        // Atualizar lista
        buscarClientes();

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        alert("Não foi possível cadastrar o cliente.");
    }
});

// Excluir cliente (DELETE)
async function excluirCliente(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir cliente");
        }

        console.log("Cliente excluído com sucesso!");

        // Atualizar lista
        buscarClientes();

    } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Não foi possível excluir o cliente.");
    }
}

// Carregar clientes ao abrir a página
buscarClientes();
