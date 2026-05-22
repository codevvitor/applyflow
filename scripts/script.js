const botao = document.getElementById("btnAnalisar")

function mostrarAlerta(mensagem) {
  document.getElementById("alerta").innerText = mensagem
  document.getElementById("alerta").style.display = "block"
}

botao.addEventListener("click", function() {
  const vaga = document.getElementById("vaga").value
  const curriculo = document.getElementById("curriculo").value
  if (vaga === "") {
    mostrarAlerta("Preencha a descrição da vaga!")
    return
  }
  if (curriculo === "") {
    mostrarAlerta("Preencha a descrição do seu currículo!")
    return
  }
  analisarCurriculo(vaga, curriculo)
})

async function analisarCurriculo(vaga, curriculo) {
  botao.innerText = "Analisando..."
  botao.disabled = true
  document.getElementById("alerta").style.display = "none"
  document.getElementById("progressBar").style.display = "block"
  document.getElementById("progressFill").style.width = "30%"
  try {
    const resposta = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCpJmzl288HxTYYpL4XUaHLhIVK0ljgyoo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Reescreva o currículo abaixo para a vaga descrita.\n\nVAGA:\n" + vaga + "\n\nCURRÍCULO:\n" + curriculo
          }]
        }]
      })
    })
    const dados = await resposta.json()
    const texto = dados.candidates[0].content.parts[0].text
    document.getElementById("progressFill").style.width = "100%"
    document.getElementById("resultado").innerText = texto
    botao.innerText = "Analisar"
    botao.disabled = false
  } catch (erro) {
    document.getElementById("progressFill").style.width = "100%"
    botao.innerText = "Analisar"
    botao.disabled = false
    mostrarAlerta("Erro ao conectar com a IA. Tente novamente.")
  }
}