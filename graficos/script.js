const url = 'https://raw.githubusercontent.com/kevinlzrs/API1/refs/heads/main/preferencias.json';

const ctx = document.getElementById('grafico').getContext('2d');

let rotulosX = ["Minecraft", "GTAV", "FIFA18", "TheLastOfUs", "GodOfWar", "Midnight", "GTASA"];
let valores = [0, 0, 0, 0, 0, 0, 0];

// Criação do gráfico usando Chart.js
let grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: rotulosX,
        datasets: [{
            label: '#jogo Preferido',
            data: valores,
            backgroundColor: [ // Cores para cada barra
                            '#00BFFF',  
                            '#A52A2A', 
                            '#4B0082', 
                            '#3CB371', 
                            '#8B4513', 
                            '#FFB6C1', 
                            '#3498DB'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' // Posiciona a legenda no lado direito
            },
            tooltip: {
                enabled: true // Habilita a exibição de tooltips
            },
            datalabels: {
                anchor: 'end', // Posiciona o valor no topo da barra
                align: 'top',
                color: '#fff', // Define a cor do valor exibido
                font: {
                    weight: 'bold' // Define a fonte como negrito
                },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(2); // Calcula a porcentagem
                    return `${value}\n(${percent}%)`; // Exibe o valor e a porcentagem em linhas separadas
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true, // Exibe o título do eixo Xinecraft
                    text: 'jogos que mais jogo', // Texto do título do eixo X
                    color: '#DC143C', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    color:'#fff',
                }
            },
            y: {
                beginAtZero: true, // Começa o eixo Y no zero
                max: 18,
                title: {
                    display: true, // Exibe o título do eixo Yinecraft
                    text: 'Quantidade de pontos', // Texto do título do eixo Y
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    stepSize: 1 // Incremento de 1 no eixo Y
                }
            }
        }
    },
    plugins: [ChartDataLabels] // Plugin para exibir valores acima das colunas
});

// Função para buscar dados e atualizar o gráfico
function atualizarGrafico() {
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            valores[0] = resp.Minecraft;
            valores[1] = resp.GTAV;
            valores[2] = resp.FIFA18;
            valores[3] = resp.TheLastOfUs;
            valores[4] = resp.GodOfWar;
            valores[5] = resp.Midnight;
            valores[6] = resp.GTASA;

            // Atualiza o gráfico com os novos valores
            grafico.update();
            exibirFraseInformativa(valores);
        })
        .catch(erro => {
            alert("ERRO: " + erro); // Exibe um alerta em caso de erro
        });
}

// Chama a função de atualização a cada 5 segundos
setInterval(atualizarGrafico, 3000);

// Função para exibir frase informativa
function exibirFraseInformativa(url) {
    const informacaoDiv = document.getElementById('informacao');
    informacaoDiv.innerHTML = `
    <p>Essas são as minhas preferências em Jogos. <br>
    <p>Tais como <strong>Minecraft</strong>, <strong>GTAV</strong> e <strong>GodOfWar</strong> são os jogos que mais despertam meu interesse com um total de <span>${valores[0]}</span>, <span>${valores[4]}</span> e <span>${valores[6]}</span> pontos de interesse respectivamente, pois oferecem a oportunidade de mergulhar nos aspectos físicos e históricos de um fato..</p>
    <p>Além disso, <strong>FIFA18</strong> com <span>${valores[2]}</span> pontos, também é um dos jogos de destaque. Por outro lado, matérias como <strong>TheLastOfUs</strong> com <span>${valores[3]}</span> pontos, <strong>GTAV</strong> com <span>${valores[1]}</span> pontos e especialmente <strong>Midnight</strong> com <span>${valores[5]}</span> pontos despertam menos meu interesse.</p>
    `;
}
