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

    fetch('https://sheetdb.io/api/v1/YOUR_SHEETDB_API_KEY', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
        document.getElementById('response').innerText = `Formulário enviado com sucesso! Sua senha é: ${json.inserted_rows[0].password}`;
    })
    .catch(error => console.error('Error:', error));
});