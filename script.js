// script.js
document.getElementById('procedure-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const NomeSobrenome = document.getElementById('NomeSobrenome').value;
    const procedimento = document.getElementById('procedimento').value;
    const info = document.getElementById('info').value;

    const data = {
        NomeSobrenome: NomeSobrenome,
        procedimento: procedimento,
        info: info
    };

    fetch('https://sheetdb.io/api/v1/9zrjjg56vl94e', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
        console.log('Dados enviados:', json);
        if (json.created === 1) {
            // Dados criados corretamente, agora buscamos a última linha
            const rowDataUrl = `https://sheetdb.io/api/v1/9zrjjg56vl94e`;
            return fetch(rowDataUrl)
                .then(response => response.json())
                .then(rowData => {
                    console.log('Dados da planilha:', rowData);
                    const lastRow = rowData[rowData.length - 1];
                    return lastRow;
                });
        } else {
            throw new Error('Erro ao criar dados');
        }
    })
    .then(lastRow => {
        if (lastRow) {
            const senha = lastRow['nº'];
            document.getElementById('response').innerText = `Formulário enviado com sucesso! Sua senha é: ${senha}`;
        } else {
            throw new Error('Dados da última linha não encontrados');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Houve um erro ao enviar o formulário. Tente novamente.';
    });
});