// Listagem dos times e jogadores
const teams = [
  {
    name: 'Flamengo',
    emoji: '🇧🇷',
    division: '1',
    players: ['Gabigol', 'Arrascaeta', 'Everton Ribeiro', 'Bruno Henrique'],
    points: 0,
    matches: 0
  },
  {
    name: 'São Paulo',
    emoji: '🇧🇷',
    division: '1',
    players: ['Calleri', 'Igor Gomes', 'Patrick', 'Reinaldo'],
    points: 0,
    matches: 0
  },
  {
    name: 'Palmeiras',
    emoji: '🇧🇷',
    division: '1',
    players: ['Rony', 'Dudu', 'Gustavo Gómez', 'Veiga'],
    points: 0,
    matches: 0
  },
  {
    name: 'Vasco',
    emoji: '🇧🇷',
    division: '1',
    players: ['German Cano', 'Talles Magno', 'Leandro Castán', 'Pikachu'],
    points: 0,
    matches: 0
  },
  // Adicione mais times se quiser
];

// Variáveis do jogo
let coachName = '';
let team = {};
let gameScreen = document.getElementById('game-screen');
let startScreen = document.getElementById('start-screen');
let coachInfo = document.getElementById('coach-info');
let teamName = document.getElementById('team-name');
let teamDivision = document.getElementById('team-division');
let output = document.getElementById('output');
let teamsScreen = document.getElementById('teams-screen');
let teamsList = document.getElementById('teams-list');
let instructionsScreen = document.getElementById('instructions-screen');
let instructionsBtn = document.getElementById('view-instructions');
let closeInstructionsBtn = document.getElementById('close-instructions');
let marketScreen = document.getElementById('market-screen');
let marketList = document.getElementById('market-list');

// Iniciar o jogo
document.getElementById('start-game').addEventListener('click', () => {
  coachName = document.getElementById('coach-name').value.trim();
  if (coachName === '') {
    alert('Por favor, insira seu nome de técnico!');
    return;
  }
  startGame();
});

function startGame() {
  team = teams[Math.floor(Math.random() * teams.length)];
  coachInfo.textContent = `Técnico: ${coachName}`;
  teamName.textContent = `${team.emoji} ${team.name}`;
  teamDivision.textContent = `Divisão: ${team.division}`;
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
}

// Ver elenco dos times
document.getElementById('view-squad').addEventListener('click', () => {
  displayTeams();
  gameScreen.classList.add('hidden');
  teamsScreen.classList.remove('hidden');
});

function displayTeams() {
  teamsList.innerHTML = '';
  teams.forEach(team => {
    let teamDiv = document.createElement('div');
    teamDiv.innerHTML = `<strong>${team.emoji} ${team.name}</strong> - Divisão ${team.division}<br>Jogadores: ${team.players.join(', ')}`;
    teamsList.appendChild(teamDiv);
  });
}

// Voltar para o jogo
document.getElementById('back-to-game').addEventListener('click', () => {
  teamsScreen.classList.add('hidden');
  marketScreen.classList.add('hidden');
  instructionsScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
});

// Avançar rodada
document.getElementById('advance-round').addEventListener('click', () => {
  const result = playMatch();
  output.innerHTML = result;
});

function playMatch() {
  const opponent = teams[Math.floor(Math.random() * teams.length)];
  const teamScore = Math.floor(Math.random() * 5);
  const opponentScore = Math.floor(Math.random() * 5);

  team.goalsFor = (team.goalsFor || 0) + teamScore;
  team.goalsAgainst = (team.goalsAgainst || 0) + opponentScore;
  team.matches += 1;

  opponent.goalsFor = (opponent.goalsFor || 0) + opponentScore;
  opponent.goalsAgainst = (opponent.goalsAgainst || 0) + teamScore;
  opponent.matches += 1;

  let result = `<strong>${team.name}</strong> (${teamScore}) x (${opponentScore}) <strong>${opponent.name}</strong><br>`;

  if (teamScore > opponentScore) {
    result += 'Você venceu!';
    team.points += 3;
  } else if (teamScore < opponentScore) {
    result += 'Você perdeu!';
    opponent.points += 3;
  } else {
    result += 'Empate!';
    team.points += 1;
    opponent.points += 1;
  }

  return result;
}

// Instruções
instructionsBtn.addEventListener('click', () => {
  instructionsScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
});

closeInstructionsBtn.addEventListener('click', () => {
  instructionsScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
});

// Resetar jogo
document.getElementById('reset-game').addEventListener('click', () => {
  startScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
  coachName = '';
  team = {};
  document.getElementById('coach-name').value = '';
  output.innerHTML = '';
});

// Classificação
document.getElementById('view-standings').addEventListener('click', () => {
  let standingsHtml = '<h3>Classificação</h3>';
  const divisions = ['1', '2', '3', '4'];

  divisions.forEach(div => {
    let teamsInDiv = teams.filter(t => t.division === div);
    teamsInDiv.sort((a, b) => {
      const sgA = (a.goalsFor || 0) - (a.goalsAgainst || 0);
      const sgB = (b.goalsFor || 0) - (b.goalsAgainst || 0);
      return b.points - a.points || sgB - sgA;
    });

    if (teamsInDiv.length > 0) {
      standingsHtml += `<h4>Divisão ${div}</h4><table><tr><th>Time</th><th>Pts</th><th>J</th><th>GM</th><th>GS</th><th>SG</th></tr>`;
      teamsInDiv.forEach(t => {
        const gm = t.goalsFor || 0;
        const gs = t.goalsAgainst || 0;
        const sg = gm - gs;
        standingsHtml += `<tr><td>${t.emoji} ${t.name}</td><td>${t.points}</td><td>${t.matches}</td><td>${gm}</td><td>${gs}</td><td>${sg}</td></tr>`;
      });
      standingsHtml += `</table><br>`;
    }
  });

  output.innerHTML = standingsHtml;
});

// Rodada em tempo real
document.getElementById("real-time-round").addEventListener("click", simularRodadaEmTempoReal);

function simularRodadaEmTempoReal() {
  const jogos = [];
  const intervalo = 2000;

  for (let i = 0; i < teams.length; i += 2) {
    jogos.push({
      timeA: teams[i],
      timeB: teams[i + 1],
      golsA: 0,
      golsB: 0,
      eventos: [],
    });
  }

  jogos.forEach(jogo => {
    const totalEventos = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < totalEventos; i++) {
      const tipo = Math.random();
      const quem = Math.random() < 0.5 ? 'A' : 'B';
      const jogador = gerarNomeJogador();

      if (tipo < 0.5) {
        jogo.eventos.push({ tipo: 'gol', time: quem, jogador });
      } else if (tipo < 0.8) {
        const cor = Math.random() < 0.7 ? 'amarelo' : 'vermelho';
        jogo.eventos.push({ tipo: 'cartao', time: quem, cor, jogador });
      } else {
        jogo.eventos.push({ tipo: 'penalti', time: quem });
      }
    }
  });

  let jogoAtual = 0;
  let eventoAtual = 0;
  output.innerHTML = "<h3>🔴 A rodada começou! Tempo real ao vivo...</h3>";

  const loop = setInterval(() => {
    if (jogoAtual >= jogos.length) {
      clearInterval(loop);
      output.innerHTML += "<br><strong>✅ Rodada encerrada!</strong>";
      return;
    }

    const jogo = jogos[jogoAtual];
    const evento = jogo.eventos[eventoAtual];

    if (!evento) {
      output.innerHTML += `<br><strong>🏁 Fim do jogo:</strong> ${jogo.timeA.name} ${jogo.golsA} x ${jogo.golsB} ${jogo.timeB.name}<br>`;
      jogoAtual++;
      eventoAtual = 0;
      return;
    }

    const time = evento.time === 'A' ? jogo.timeA : jogo.timeB;

    if (evento.tipo === 'gol') {
      if (evento.time === 'A') jogo.golsA++;
      else jogo.golsB++;
      output.innerHTML += `<br>⚽️ Gol do ${time.emoji} <strong>${time.name}</strong> - ${evento.jogador}`;
    }

    if (evento.tipo === 'cartao') {
      const cor = evento.cor === 'amarelo' ? '🟨' : '🟥';
      output.innerHTML += `<br>${cor} Cartão ${evento.cor} para ${evento.jogador} (${time.name})`;
    }

    if (evento.tipo === 'penalti') {
      const cobrador = gerarNomeJogador();
      const gol = Math.random() < 0.8;
      if (gol) {
        if (evento.time === 'A') jogo.golsA++;
        else jogo.golsB++;
        output.innerHTML += `<br>🚨 Pênalti para ${time.name}! ${cobrador} bateu e ⚽️ GOOOL!`;
      } else {
        output.innerHTML += `<br>🚨 Pênalti para ${time.name}! ${cobrador} bateu e ❌ PERDEU!`;
      }
    }

    eventoAtual++;
  }, intervalo);
}

// Mercado de jogadores
document.getElementById('open-market').addEventListener('click', () => {
  gameScreen.classList.add('hidden');
  marketScreen.classList.remove('hidden');
  mostrarMercado();
});

function mostrarMercado() {
  marketList.innerHTML = '<h3>Jogadores Disponíveis</h3>';
  const jogadores = [];

  teams.forEach(t => {
    if (t.name !== team.name) {
      t.players.forEach(j => {
        jogadores.push({ nome: j, origem: t.name });
      });
    }
  });

  jogadores.slice(0, 10).forEach(jogador => {
    let div = document.createElement('div');
    div.innerHTML = `${jogador.nome} (${jogador.origem}) <button onclick="comprarJogador('${jogador.nome}', '${jogador.origem}')">Comprar</button>`;
    marketList.appendChild(div);
  });
}

function comprarJogador(nome, origem) {
  const origemTime = teams.find(t => t.name === origem);
  const index = origemTime.players.indexOf(nome);

  if (index > -1) {
    origemTime.players.splice(index, 1);
    team.players.push(nome);
    alert(`${nome} contratado pelo ${team.name}!`);
    mostrarMercado();
  }
}

function gerarNomeJogador() {
  const nomes = ["João", "Pedro", "Carlos", "Lucas", "Rafael", "André", "Felipe", "Matheus", "Bruno", "Tiago"];
  const sobrenomes = ["Silva", "Souza", "Oliveira", "Santos", "Costa", "Almeida", "Lima", "Araújo", "Pereira", "Rocha"];
  return `${nomes[Math.floor(Math.random() * nomes.length)]} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`;
}
