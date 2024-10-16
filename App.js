document.getElementById('copyResult').addEventListener('click', function() {
  const resultText = document.getElementById('result').textContent;
  navigator.clipboard.writeText(resultText)
    .then(() => {
      alert('Resultado copiado para a área de transferência!');
    })
    .catch(erro => {
      console.error('Erro ao copiar o texto: ', erro);
    });
});

document.getElementById('convert-btn').addEventListener('click', function(){
    const amount = document.getElementById('amount').value
    const fromCurrency = document.getElementById('from-currency').value
    const toCurrency = document.getElementById('to-currency').value
    const apiKey = 'cb91d3a29c9ee6c8bd733deb'
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const rate = data.conversion_rate;
      const result = (amount * rate).toFixed(2);
      if (verificationAmount(amount)){
        removeHiddenClassById('result');
        removeHiddenClassById('copyResult')
        document.getElementById("result").textContent = `Resultado: ${result} ${toCurrency}`;
      }
    })
    .catch(error => {
      console.error("Erro ao buscar taxas de câmbio:", error);
      document.getElementById("result").textContent = "Erro ao converter.";
    });
})

function verificationAmount(value){
  if (!value || value <= 0){
    alert('É necessário adicionar um número para conversão')
    console.error('número não informado ou abaixo de 0.')
    return false
  }
  return true
}

function removeHiddenClassById(id){
    const myDiv = document.getElementById(id);
    myDiv.classList.toggle('hidden');
}



