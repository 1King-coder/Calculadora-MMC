const mmc_section = document.querySelector('.MMC')

const efetuar = mmc_section.getElementsByClassName('efetuar')[0]

const resultados = mmc_section.querySelector('h4')

const valoresComExp = mmc_section.querySelector('#valores-com-expoentes');

const valorComp = mmc_section.querySelector('#valor-completo');

const createTable = () => {
    return document.createElement('table');
};

const createThead = () => {
    return document.createElement('thead');
};

const createTr = () => {
    return document.createElement('tr');
};

const createTh = () => {
    return document.createElement('th');
};

const createTbody = () => {
    return document.createElement('tbody');
};

const createTd = () => {
    return document.createElement('td');
};

const ePrimo = (numero) => {
    let divisores = 0;

    for (let indice = 1; indice < numero-1; indice++) {
        if (numero % indice === 0) divisores++;
    };

    return divisores < 2;
};


const numerosPrimos = (numero) => {
    const numerosPrimos = []

    for (let indice = 2; indice < numero; indice++) {
        if (ePrimo(indice)) numerosPrimos.push(indice);
    };

    return numerosPrimos;
};


const calculaNumeroExpoentesMMC = (numero, numeroPrimo, resultado = 0) => {
    while (Math.round(numero / numeroPrimo) > 1) {
        resultado++;
        numero = Math.round(numero / numeroPrimo);
    };
    resultado++;

    return resultado;
};


const maiorNumero = (numeros) => {
    let maior = 0;
    for (numero of numeros) {
        if (numero > maior) maior = numero;
    };

    return maior;
};


function MMC(numeros) {
    Object.defineProperty(this, 'numeros', {
        configurable: true,
        enumerable: true,
        get: function() {
            for (let indice = 0; indice<numeros.length; indice++) {
                numeros[indice] = Number(numeros[indice])
            };
    
            return numeros;
        }
    });
};

MMC.prototype.valoresEmObjeto = function() {
    resultado = {};
    
    for (numeroEnviado of this.numeros) {
        if (ePrimo(numeroEnviado)) resultado[numeroEnviado] = 1;

        
        for (numeroPrimo of numerosPrimos(numeroEnviado)) {
            if (numeroEnviado % numeroPrimo === 0) {
                resultado[numeroPrimo] = calculaNumeroExpoentesMMC(numeroEnviado, numeroPrimo);
            };
        };   
    };

    return resultado;
};

MMC.prototype.valor = function() {
    total = 1;
    valoresEmObj = this.valoresEmObjeto()

    for (indice in valoresEmObj) {
        total *= indice**valoresEmObj[indice];
        
    };

    return total;
};

efetuar.addEventListener('click', () => {
    const numerosNode = mmc_section.querySelectorAll('.mmc-num');
    const numeros = [];
    
    numerosNode.forEach((e) => {
        if (e.value) numeros.push(Number(e.value));
    });

    if (numeros.length===0) {
        resultados.innerHTML = "";
        return;
    }

    const calculaMMC = new MMC(numeros);

    const resultadosEmObjeto = calculaMMC.valoresEmObjeto();

    function baseExpoente(thBase, thExpoente, tr, tHead){
        thBase.innerHTML = 'Base';
        tr.appendChild(thBase);

        thExpoente.innerHTML = 'Expoente';
        tr.appendChild(thExpoente);

        tHead.appendChild(tr);

        return tHead;

    };

    function adicionaNaTabela(table, item) {
        table.appendChild(item);
        resultados.appendChild(table);
    };

    function criaCorpo(tBody, tr, tdBase, tdExpoente, base, expoente) {
        tdBase.innerHTML = base;
        tr.appendChild(tdBase);
        
        tdExpoente.innerHTML = expoente;
        tr.appendChild(tdExpoente);

        tBody.appendChild(tr);

        return tBody;
    };

    function adicionaResultadoComExpoentes() {
        resultados.innerHTML = "";
        const tabela = createTable();

        adicionaNaTabela(
            tabela, baseExpoente(
            createTh(), createTh(),
            createTr(), createThead()
        ));

        for (valor in resultadosEmObjeto) {
            adicionaNaTabela(tabela, criaCorpo(
                createTbody(), createTr(),
                createTd(), createTd(),
                valor, resultadosEmObjeto[valor]
            ));
        };

    };
    if (valoresComExp.checked) adicionaResultadoComExpoentes();
    if (valorComp.checked) resultados.innerHTML = calculaMMC.valor();
    

});