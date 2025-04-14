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
  // Adicione outros times e jogadores conforme desejar
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

// Função para iniciar o jogo
document.getElementById('start-game').addEventListener('click', () => {
  coachName = document.getElementById('coach-name').value.trim();
  
  if (coachName === '') {
    alert('Por favor, insira seu nome de técnico!');
    return;
  }
  
  startGame();
});

// Função para começar o jogo com time aleatório
function startGame() {
  team = teams[Math.floor(Math.random() * teams.length)];
  
  coachInfo.textContent = `Técnico: ${coachName}`;
  teamName.textContent = `${team.emoji} ${team.name}`;
  teamDivision.textContent = `Divisão: ${team.division}`;
  
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
}

// Função para exibir todos os times e jogos
document.getElementById('view-squad').addEventListener('click', () => {
  displayTeams();
  gameScreen.classList.add('hidden');
  teamsScreen.classList.remove('hidden');
});

// Exibe os times e suas informações
function displayTeams() {
  teamsList.innerHTML = '';
  teams.forEach(team => {
    let teamDiv = document.createElement('div');
    teamDiv.innerHTML = `${team.emoji} ${team.name} - Divisão ${team.division}`;
    teamsList.appendChild(teamDiv);
  });
}

// Voltar para a tela do jogo
document.getElementById('back-to-game').addEventListener('click', () => {
  teamsScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
});

// Função para avançar a rodada
document.getElementById('advance-round').addEventListener('click', () => {
  const result = playMatch();
  output.innerHTML = result;
});

// Simula uma partida e retorna o resultado
function playMatch() {
  const opponent = teams[Math.floor(Math.random() * teams.length)];
  const teamScore = Math.floor(Math.random() * 5);
  const opponentScore = Math.floor(Math.random() * 5);

  let result = `<strong>${team.name}</strong> (${teamScore}) x (${opponentScore}) <strong>${opponent.name}</strong><br>`;

  if (teamScore > opponentScore) {
    result += 'Você venceu!';
    team.points += 3;
  } else if (teamScore < opponentScore) {
    result += 'Você perdeu!';
  } else {
    result += 'Empate!';
    team.points += 1;
  }

  team.matches += 1;
  return result;
}

// Exibir instruções
instructionsBtn.addEventListener('click', () => {
  instructionsScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
});

// Fechar tela de instruções
closeInstructionsBtn.addEventListener('click', () => {
  instructionsScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
});

// Resetar o jogo
document.getElementById('reset-game').addEventListener('click', () => {
  startScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
  coachName = '';
  team = {};
  document.getElementById('coach-name').value = '';
  output.innerHTML = '';
});
