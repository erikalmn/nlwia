import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const title = document.querySelector("#title")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (
      (title.textContent = "URL Inválida"),
      (content.textContent = "O vídeo não é um short!")
    )
  }

  // Como o split() vai retornar um array, a variável já pode ser definida a partir da sua respectiva posição.
  // [nome_var1, nome_var2] = const.split("/")

  const [_, params] = videoURL.split("/shorts/") // _ para indicar que não me interessa a variável de posição 0.
  const [videoID] = params.split("?si") // Apenas a variável de posição 0 me interessa, então não é necessário nomear as seguintes.
  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID)
  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })
  content.textContent = summary.data.result
})
