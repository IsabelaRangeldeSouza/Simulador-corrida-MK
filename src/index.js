const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANORABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}

const player2 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANORABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
}

const player3 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANORABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
}

const player4 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANORABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
}

const player5 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANORABILIDADE:4,
    PODER: 4,
    PONTOS: 0,
}

const player6 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANORABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
}

const players = [player1, player2, player3, player4, player5, player6]

function chooseTwoPlayers() {
    const index1 = Math.floor(Math.random() * players.length); // sorteia o primeiro índice

    let index2;
    do {
        index2 = Math.floor(Math.random() * players.length); // continua sorteando até ser diferente do primeiro
    } while (index2 === index1);

    const player1 = players[index1];
    const player2 = players[index2];

    return [player1, player2]; // retorna os dois jogadores como um array
}


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result
    
    switch (true) {
        case random < 0.33:
            result = 'Reta'
            break;
        case random < 0.66:
            result = 'Curva'
        default:
            result = 'Confronto'
    }

    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);    
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <=5; round++) {
        console.log(` Rodada ${round}`);

        // sortear bloco 
        let block = await getRandomBlock();
        console.log(`Bloco:${block}`);

        // rolar dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let totalTesteSkill1 = 0;
        let totalTesteSkill2 = 0;

        if (block == 'Reta') {
            totalTesteSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTesteSkill2 = diceResult2 + character2.VELOCIDADE;

           await logRollResult(
            character1.NOME,
            'velocidade',
             diceResult1,
             character1.VELOCIDADE);

           await logRollResult(
            character2.NOME,
            'velocidade',
             diceResult2,
             character2.VELOCIDADE);

        }

        if (block == 'Curva') {
            totalTesteSkill1 = diceResult1 + character1.MANORABILIDADE;
            totalTesteSkill2 = diceResult2 + character2.MANORABILIDADE;

            await logRollResult(
            character1.NOME,
            'manorabilidade',
             diceResult1,
             character1.MANORABILIDADE);

           await logRollResult(
            character2.NOME,
            'manorabilidade',
             diceResult2,
             character2.MANORABILIDADE);

        }

        if (block == 'Confronto') {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult1 + character2.PODER;

            console.log(`${character1.NOME} confrontou o ${character2.NOME}!`);

            await logRollResult(
            character1.NOME,
            'poder',
             diceResult1,
             character1.PODER);

           await logRollResult(
            character2.NOME,
            'poder',
             diceResult2,
             character2.PODER);


            if (powerResult1 > powerResult2 && character2.PONTOS > 0 ) {
                character2.PONTOS --;
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto`)
            
                // chance de usar item (50%)
                if (Math.random() < 0.5) {
                    let item = Math.random() < 0.5 ? 'casco' : 'bomba';
                    let dano = item === 'casco' ? 1 : 2;
                    character2.PONTOS = Math.max(0, character2.PONTOS - dano);
                    console.log(`${character1.NOME} usou um ${item}! ${character2.NOME} perdeu mais ${dano} ponto(s)!`);
                }

                // chance de ganhar turbo (30%)
                if (Math.random() < 0.3) {
                    character1.PONTOS++;
                    console.log(`${character1.NOME} ganhou um turbo! +1 ponto extra!`);
                     console.log(`${character1.NOME} marcou um ponto!`);
                }
                    
            }
          

            else if (powerResult2 > powerResult1 && character2.PONTOS > 0 ) {
                character1.PONTOS --;
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto`)
            
                 // chance de usar item (50%)
                if (Math.random() < 0.5) {
                    let item = Math.random() < 0.5 ? 'casco' : 'bomba';
                    let dano = item === 'casco' ? 1 : 2;
                    character1.PONTOS = Math.max(0, character1.PONTOS - dano);
                    console.log(`${character2.NOME} usou um ${item}! ${character1.NOME} perdeu mais ${dano} ponto(s)!`);
                }

                // chance de ganhar turbo (30%)
                if (Math.random() < 0.3) {
                    character2.PONTOS++;
                    console.log(`${character2.NOME} ganhou um turbo! +1 ponto extra!`);
                     console.log(`${character1.NOME} marcou um ponto!`);
                }
            
            }
     
            else {
            console.log(
                powerResult2 === powerResult1 ? 'Confronto empatado! Nenhum ponto foi perdido' : ''
            ); }
        }

        // Só verifica vencedor se NÃO for confronto
        if (block !== 'Confronto') {
            if (totalTesteSkill1 > totalTesteSkill2) {
                console.log(`${character1.NOME} marcou um ponto!`);
                character1.PONTOS++;
            } else if (totalTesteSkill2 > totalTesteSkill1) {
                console.log(`${character2.NOME} marcou um ponto!`);
                character2.PONTOS++;
            } else {
                console.log(`Empate na rodada! Ninguém marcou ponto.`);
            }
        }


        console.log('---------------------------------')

}
}

async function declareWinner(character1,character2) {
    console.log('Resultado final:');
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS)
        console.log(`\n ${character1.NOME} venceu a corrida! Parabéns ${character1.NOME}!!!`);
    else if (character2.PONTOS > character1.PONTOS)
        console.log(`\n ${character2.NOME} venceu a corrida! Parabéns ${character2.NOME}!!!`);
    else console.log('A corrida terminou em empate');
}



(async function main() {
    console.log('Iniciando corrida');
    const [player1, player2] = chooseTwoPlayers(); 
    console.log(`Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1,player2)
})()