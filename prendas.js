/* =========================================================
   CALENDÁRIO DE ADVENTO — CONTEÚDO DE CADA DIA
   É só este ficheiro que precisas de editar.

   Campos de cada dia:
   - titulo:    nome da prenda (só aparece no fim)
   - tipo:      "fisica"  -> mostra a adivinha + onde procurar e pede a
                             palavra secreta escrita na etiqueta da prenda
                "bilhete" -> mostra o bilhete na própria app
                "vale"    -> mostra o vale na própria app
                "jogo"    -> mostra o link e/ou a imagem do jogo
   - adivinha:  (fisica) uma dica sobre O QUE é a prenda
   - pista:     (fisica) ONDE a escondeste  <-- PREENCHER
   - codigo:    (fisica) palavra que escreves na etiqueta da prenda
                (maiúsculas e acentos não contam)
   - mensagem:  a razão (o teu bilhetinho)
   - detalhe:   (bilhete/vale/jogo) o texto do bilhete ou vale
   - imagem:    (opcional) foto, ex: "img/jogo.jpg"
   - link:      (opcional) ex: link do jogo
   - emoji:     o emoji da prenda (aparece quando ela é revelada)
   ========================================================= */

const CONFIG = {
  ano: 2026,
  assinatura: "Com amor, a tua namorada",
  // Para testares tudo antes de dezembro: abre o site com ?teste=renas-voadoras-2026
  codigoTeste: "renas-voadoras-2026",
};

const ONDE = "Onde escondeste esta prenda? (preencher)";

/* Familiar de cada dia (pela ordem dos dias 1 a 24).
   Aparece na raspadinha e fica na porta quando o dia está feito.
   Quanto mais antepassado, mais morto 💀 */
const FAMILIA = [
  ["a tua prima", "👧"],                   // 1
  ["o teu primo", "👦"],                   // 2
  ["a tua mãe", "👩"],                     // 3
  ["o teu pai", "👨"],                     // 4
  ["o teu avô", "👴"],                     // 5
  ["a tua avó", "👵"],                     // 6
  ["a tua madrinha", "👩‍🦰"],             // 7
  ["a tua tia", "👱‍♀️"],                 // 8
  ["o teu tio", "🧔"],                     // 9
  ["o teu padrinho", "👨‍🦳"],             // 10
  ["a tua bisavó", "🧟‍♀️"],              // 11 já cheira um bocadinho
  ["a tua trisavó", "👻"],                 // 12 já só assombra
  ["a tua tetravó", "💀"],                 // 13 só osso
  ["a tua pentavó", "⚱️"],                 // 14 já é pó
  ["o teu primo em segundo grau", "🧑‍🦱"], // 15
  ["a tua prima em segundo grau", "👩‍🦱"], // 16
  ["a tua afilhada", "🧚‍♀️"],            // 17
  ["o teu sobrinho", "🧒"],                // 18
  ["a tua irmã", "💁‍♀️"],                // 19
  ["a tua cunhada", "🙋‍♀️"],             // 20
  ["a tua nora", "👰‍♀️"],                // 21
  ["o teu sogro", "🧓"],                   // 22
  ["o teu genro", "🤵"],                   // 23
  ["a tua filha", "👶"],                   // 24
];

const PRENDAS = [
  { dia: 1, titulo: "Tablete de Chocolate Milka (Árvore de Natal)", tipo: "fisica",
    adivinha: "Para começar com o pé direito: é roxa, é doce e veste-se de árvore de Natal.",
    pista: ONDE, codigo: "milka", emoji: "🍫",
    mensagem: "O Natal começa hoje, e nada diz Natal como chocolate em forma de árvore. Esta era impossível de falhar." },

  { dia: 2, titulo: "Kit de Limpeza para o Telemóvel", tipo: "fisica",
    adivinha: "Há alguém lá em casa que é tratado como realeza… e não sou eu 👑📱",
    pista: ONDE, codigo: "realeza", emoji: "📱",
    mensagem: "Andas completamente obcecado com o telemóvel novo, sempre a limpá-lo e a tratá-lo como se fosse da realeza. Então pronto, Sua Majestade merece um kit de limpeza à altura." },

  { dia: 3, titulo: "Meias Médias Nike Cushioned", tipo: "fisica",
    adivinha: "Andam sempre aos pares, vivem nos teus pés e tu tens poucas.",
    pista: ONDE, codigo: "pares", emoji: "🧦",
    mensagem: "Porque tens poucas e andas sempre à procura de um par. Agora já não há desculpa!" },

  { dia: 4, titulo: "Raspadinha", tipo: "fisica",
    adivinha: "Hoje a sorte está do teu lado… só precisas de uma moeda.",
    pista: ONDE, codigo: "sorte", emoji: "🍀",
    mensagem: "Porque gostas tanto de apostas. Se sair o prémio grande, lembra-te de quem ta deu 😏" },

  { dia: 5, titulo: "Twix Branco", tipo: "fisica",
    adivinha: "Vem sempre em dupla e hoje vestiu-se de branco.",
    pista: ONDE, codigo: "dupla", emoji: "🤍",
    mensagem: "O teu chocolate preferido. Um para ti e… se calhar o outro é para mim?" },

  { dia: 6, titulo: "Vale: Ida obrigatória a um jogo do Xu", tipo: "vale",
    detalhe: "Vale por: 1 presença garantida na bancada num jogo à tua escolha. Inclui apoio incondicional, gritos da bancada e nenhuma queixa do frio.",
    emoji: "⚽",
    mensagem: "Sei o quanto gostas que eu vá ver os jogos da tua equipa. Este vale é a promessa de que vou estar lá, sem desculpas." },

  { dia: 7, titulo: "3 Gorros", tipo: "fisica",
    adivinha: "O frio chegou, e hoje a tua cabeça vai ficar quentinha. Uma vez não, três vezes.",
    pista: ONDE, codigo: "quentinho", emoji: "🧢",
    mensagem: "Precisavas de gorros, por isso vieram logo três. Um para cada dia em que te esqueces do outro." },

  { dia: 8, titulo: "Papinhas de Fruta", tipo: "fisica",
    adivinha: "São de bebé, mas tu és viciado nelas.",
    pista: ONDE, codigo: "papinha", emoji: "🍎",
    mensagem: "Porque és oficialmente viciado em papinhas de fruta e eu acho isso adorável. Aqui está um stock novo." },

  { dia: 9, titulo: "Copo de Whiskey Personalizado", tipo: "fisica",
    adivinha: "Tem o teu nome e serve para a tua bebida preferida. Gelo opcional.",
    pista: ONDE, codigo: "whiskey", emoji: "🥃",
    mensagem: "A tua bebida preferida merecia um copo só teu. Saúde! 🥂" },

  { dia: 10, titulo: "Balança", tipo: "fisica",
    adivinha: "Diz sempre a verdade, mesmo quando não queres ouvir.",
    pista: ONDE, codigo: "equilibrio", emoji: "⚖️",
    mensagem: "Estás a fazer dieta e a balança lá de casa não funciona bem. Tenho muito orgulho no teu esforço, e agora vais poder ver os resultados a sério." },

  { dia: 11, titulo: "Barras Proteicas de Cacau", tipo: "fisica",
    adivinha: "Sabe a pequeno-almoço nosso, mas ajuda a dieta.",
    pista: ONDE, codigo: "proteina", emoji: "💪",
    mensagem: "Para a dieta, e são da marca dos nossos cereais preferidos. Saudável e com sabor a nós." },

  { dia: 12, titulo: "T-shirt Preta", tipo: "fisica",
    adivinha: "É básica, combina com tudo e (incrivelmente) tu não tens uma.",
    pista: ONDE, codigo: "basico", emoji: "🖤",
    mensagem: "O básico essencial que faltava no teu armário. Fica bem com tudo, tal como tu." },

  { dia: 13, titulo: "Vale: Jantar feito por mim", tipo: "vale",
    detalhe: "Vale por: 1 refeição caseira, cozinhada por mim, com o menu à tua escolha. Inclui sobremesa e a loiça fica por minha conta.",
    emoji: "🍝",
    mensagem: "Porque quero cozinhar para ti. Escolhe o dia e o menu, que a chef trata do resto." },

  { dia: 14, titulo: "Pulseira (igual à da menina do 3.º ano)", tipo: "fisica",
    adivinha: "Lembras-te de um presente de uma aluna pequenina que não te servia?",
    pista: ONDE, codigo: "terceiroano", emoji: "📿",
    mensagem: "Uma menina do 3.º ano fez-te uma pulseira, mas não te servia e fiquei eu com ela. Por isso fiz-te uma igual, para agora termos as duas." },

  { dia: 15, titulo: "Carteira", tipo: "fisica",
    adivinha: "Vive no teu bolso e a tua já está a pedir reforma.",
    pista: ONDE, codigo: "bolso", emoji: "👛",
    mensagem: "Porque precisavas de uma nova. Que nunca esteja vazia!" },

  { dia: 16, titulo: "Funko Pop do Thor", tipo: "fisica",
    adivinha: "Pequenino, cabeçudo e com um martelo. Faltam só 24 horas…",
    pista: ONDE, codigo: "martelo", emoji: "⚡",
    mensagem: "Porque adoramos ver filmes da Marvel juntos. É o aquecimento para amanhã 😉" },

  { dia: 17, titulo: "T-shirt Marvel (Matchy)", tipo: "fisica",
    adivinha: "Hoje é dia de estreia! E hoje vamos combinar… literalmente.",
    pista: ONDE, codigo: "matchy", emoji: "🦸",
    mensagem: "Hoje vamos ver o novo filme da Marvel e eu queria que fôssemos a combinar. Veste-a, que eu visto a minha!" },

  { dia: 18, titulo: "Raspadinha", tipo: "fisica",
    adivinha: "A sorte bateu à porta outra vez. Será hoje?",
    pista: ONDE, codigo: "jackpot", emoji: "🎰",
    mensagem: "Mais uma, porque gostas muito de apostas. À segunda é de vez!" },

  { dia: 19, titulo: "Camisola do Óscar Tacuara", tipo: "fisica",
    adivinha: "Tem um número nas costas e o nome do teu jogador preferido.",
    pista: ONDE, codigo: "tacuara", emoji: "👕",
    mensagem: "É o teu jogador de futebol preferido. Agora podes vestir a camisola dele." },

  { dia: 20, titulo: "Christmas Game", tipo: "jogo",
    detalhe: "Um jogo criado por mim, só para nós. (Link ou foto do jogo em breve!)",
    link: "", imagem: "",
    emoji: "🎲",
    mensagem: "Somos obcecados por jogos de tabuleiro e jogos online, por isso criei um só nosso, para jogarmos os dois ou com a família." },

  { dia: 21, titulo: "Hoodie Cinza", tipo: "fisica",
    adivinha: "É quentinho, tem capuz e eu provavelmente vou roubá-lo.",
    pista: ONDE, codigo: "capuz", emoji: "🩶",
    mensagem: "Porque precisavas. E porque sabes que eu também a vou usar 🙈" },

  { dia: 22, titulo: "Porta-chaves Pinky Promise", tipo: "fisica",
    adivinha: "Usamos para tudo e só precisa de um dedo mindinho.",
    pista: ONDE, codigo: "mindinho", emoji: "🤙",
    mensagem: "Porque fazemos pinky promises para tudo. Esta é para levares sempre contigo, junto às chaves." },

  { dia: 23, titulo: "Colar e Pulseira de Aço Inoxidável", tipo: "fisica",
    adivinha: "Brilha, não enferruja e vai ficar-te muito bem.",
    pista: ONDE, codigo: "brilho", emoji: "💎",
    mensagem: "Não há uma razão especial, só achei que te ia ficar muito bem. E às vezes não é preciso razão nenhuma 💛" },

  { dia: 24, titulo: "Candlelight Concert: Imagine Dragons & Coldplay", tipo: "bilhete",
    detalhe: "Porto · 13 de fevereiro · 19:30\nAdmite 2 pessoas",
    imagem: "",
    emoji: "🕯️",
    mensagem: "Andas a chatear-me há imenso tempo para irmos a este concerto no Porto e eu dizia sempre que não… Pois é: vamos! Feliz Natal ❤️" },
];
