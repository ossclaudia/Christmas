/* =========================================================
   XUDVENTO — CONTEÚDO DE CADA DIA
   É só este ficheiro que precisas de editar.

   ⚠️ Este ficheiro é público (qualquer pessoa com o link do site o pode ler),
   por isso as prendas físicas NÃO têm o nome aqui: a app só diz
   "open a tua prima" e ele procura o embrulho com essa etiqueta.
   ========================================================= */

const CONFIG = {
  ano: 2026,
  // Para testares tudo antes de dezembro: abre o site com ?teste=renas-voadoras-2026
  codigoTeste: "renas-voadoras-2026",
  // Data e hora do concerto (para a contagem decrescente depois do dia 24). Em fevereiro Portugal está em UTC+0.
  concerto: "2027-02-13T19:30:00Z",
};

/* A frase de cada dia da semana (0 = domingo, 1 = segunda, ... 6 = sábado).
   cor = cor da porta e do cartão; texto (opcional) = cor das letras se a cor for clara */
const SEMANA = {
  1: { frase: "It's fucking Shit from shein that made me think of you Monday", cor: "#b8686d" },
  2: { frase: "It's fucking Style Tuesday",                                    cor: "#b98a2c" },
  3: { frase: "It's fucking I didn't have money for more Wednesday",           cor: "#1f6b50" },
  4: { frase: "It's fucking date Thursday",                                    cor: "#c3392c" },
  5: { frase: "It's fucking Personalized Friday",                              cor: "#2c5f7c" },
  6: { frase: "It's fucking U kinda need it Saturday",                         cor: "#a6452a" },
  0: { frase: "It's fucking Fat Sunday",                                       cor: "#8f2f3a" },
};

/* Familiar de cada dia (dias 1 a 24, por ordem): [nome, emoji de reserva, boneco desenhado em bonecos.js].
   Aparece na raspadinha, na app e nas etiquetas dos embrulhos.
   Quanto mais antepassado, mais morto 💀 */
const FAMILIA = [
  ["a tua prima", "👧", "prima"],                   // 1
  ["o teu primo", "👦", "primo"],                   // 2
  ["a tua mãe", "👩", "mae"],                     // 3
  ["o teu pai", "👨", "pai"],                     // 4
  ["o teu avô", "👴", "avo"],                     // 5
  ["a tua avó", "👵", "avoa"],                     // 6
  ["a tua madrinha", "👩‍🦰", "madrinha"],             // 7
  ["a tua tia", "👱‍♀️", "tia"],                 // 8
  ["o teu tio", "🧔", "tio"],                     // 9
  ["o teu padrinho", "👨‍🦳", "padrinho"],             // 10
  ["a tua bisavó", "🧟‍♀️", "bisavo"],              // 11 já cheira um bocadinho
  ["a tua trisavó", "👻", "trisavo"],                 // 12 já só assombra
  ["a tua tetravó", "💀", "tetravo"],                 // 13 só osso
  ["a tua pentavó", "⚱️", "pentavo"],                 // 14 já é pó
  ["o teu primo em segundo grau", "🧑‍🦱", "primo2"], // 15
  ["a tua prima em segundo grau", "👩‍🦱", "prima2"], // 16
  ["a tua afilhada", "🧚‍♀️", "afilhada"],            // 17
  ["o teu sobrinho", "🧒", "sobrinho"],                // 18
  ["a tua irmã", "💁‍♀️", "irma"],                // 19
  ["a tua cunhada", "🙋‍♀️", "cunhada"],             // 20
  ["a tua nora", "👰‍♀️", "nora"],                // 21
  ["o teu sogro", "🧓", "sogro"],                   // 22
  ["o teu genro", "🤵", "genro"],                   // 23
  ["o teu bisavô", "🎅", "bisavoNatal"],                  // 24 vestido de Pai Natal
];

/* Prendas de cada dia.
   - tipo "fisica":  a app diz "open <familiar>" e ele abre o embrulho com essa etiqueta
   - tipo "vale" / "bilhete": a app mostra o vale ou o bilhete
   - imagem / link (opcional, em qualquer dia): mostra uma foto e/ou um botão com link */
const PRENDAS = [
  { dia: 1,  tipo: "fisica" },
  { dia: 2,  tipo: "vale", titulo: "Ida obrigatória a um jogo do Xu",
    detalhe: "Vale por: 1 presença garantida na bancada num jogo à tua escolha. Inclui apoio incondicional, silêncio na bancada e nenhuma queixa das horas do jogo." },
  { dia: 3,  tipo: "fisica" },
  { dia: 4,  tipo: "fisica" },
  { dia: 5,  tipo: "fisica" },
  { dia: 6,  tipo: "fisica" },
  { dia: 7,  tipo: "fisica" },
  { dia: 8,  tipo: "fisica" },
  { dia: 9,  tipo: "fisica" },
  { dia: 10, tipo: "fisica" },
  { dia: 11, tipo: "fisica" },
  { dia: 12, tipo: "fisica" },
  { dia: 13, tipo: "fisica" },
  { dia: 14, tipo: "fisica" },
  { dia: 15, tipo: "fisica" },
  { dia: 16, tipo: "vale", titulo: "Jantar feito por mim",
    detalhe: "Vale por: 1 refeição caseira, cozinhada por mim, com o menu à tua escolha. Inclui sobremesa e a loiça fica por minha conta." },
  { dia: 17, tipo: "fisica" },
  { dia: 18, tipo: "fisica", imagem: "", link: "" },
  { dia: 19, tipo: "fisica" },
  { dia: 20, tipo: "fisica" },
  { dia: 21, tipo: "fisica" },
  { dia: 22, tipo: "fisica" },
  { dia: 23, tipo: "fisica" },
  { dia: 24, tipo: "bilhete", titulo: "Candlelight Concert: Imagine Dragons & Coldplay",
    detalhe: "Porto · 13 de fevereiro · 19:30\nAdmite 2 pessoas" },
];
