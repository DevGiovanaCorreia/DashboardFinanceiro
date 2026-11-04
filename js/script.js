
const descricao = document.querySelector('#descricao');
const categoria = document.querySelector('#categoria');
const valor = document.querySelector('#valor');
const data = document.querySelector('#data');
const btnSalvar = document.querySelector('#btnSalvar');


const totalEntrada = document.querySelector('#entrada');
const totalSaida = document.querySelector('#saida');
const saldoAtual = document.querySelector('#entradaSaida');


const tabela = document.querySelector('#tabelaMovimentacoes');


let movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];


btnSalvar.addEventListener('click', () => {

    const tipo = document.querySelector('input[name="tipoRegistro"]:checked');

    
    if (!tipo || !descricao.value.trim() || !categoria.value || !valor.value || !data.value) {
        alert('Preencha todos os campos!');
        return;
    }

    if (Number(valor.value) <= 0) {
        alert('O valor deve ser maior que zero!');
        return;
    }

    
    const movimentacao = {
        tipo: tipo.value,
        descricao: descricao.value.trim(),
        categoria: categoria.value,
        valor: Number(valor.value),
        data: data.value
    };


    movimentacoes.push(movimentacao);

    
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));

    atualizarResumo();
    atualizarTabela();

    
    descricao.value = '';
    categoria.value = '';
    valor.value = '';
    data.value = '';
    tipo.checked = false;

    alert('Movimentação adicionada com sucesso!');
});



function atualizarResumo() {

    let entrada = 0;
    let saida = 0;

    movimentacoes.forEach(function (movimentacao) {

        if (movimentacao.tipo === 'entrada') {
            entrada += movimentacao.valor;
        } else {
            saida += movimentacao.valor;
        }

    });

    const saldo = entrada - saida;

    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    totalEntrada.value = formatarMoeda(entrada);
    totalSaida.value = formatarMoeda(saida);
    saldoAtual.value = formatarMoeda(saldo);
}



function atualizarTabela() {

    tabela.innerHTML = '';

    movimentacoes.forEach(function (movimentacao) {

        const linha = document.createElement('tr');

        const dataFormatada = new Date(movimentacao.data + 'T00:00:00').toLocaleDateString('pt-BR');

        const valorFormatado = movimentacao.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        linha.innerHTML = `
            <td>${dataFormatada}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>${valorFormatado}</td>
        `;

        linha.cells[1].textContent = movimentacao.descricao;
        linha.cells[2].textContent = movimentacao.categoria;
        linha.cells[3].textContent = movimentacao.tipo;

        tabela.appendChild(linha);

    });
}


atualizarResumo();
atualizarTabela();
