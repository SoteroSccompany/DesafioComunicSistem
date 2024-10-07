const http = require('http');
const axios = require('axios');

// Função para buscar os serviços ativos do Consul
async function getConsulServices() {
    try {
        const response = await axios.get('http://consulserver01:8500/v1/catalog/services');
        return response.data;
    } catch (error) {
        console.error('Erro ao consultar o Consul:', error);
        return {};
    }
}

// Função para gerar a página HTML com os serviços ativos
async function generateHtml() {
    const services = await getConsulServices();
    let html = `
    <html>
    <head>
      <title>Serviços Ativos - Consul</title>
    </head>
    <body>
      <h1>Serviços Ativos no Consul</h1>
      <ul>
  `;

    for (const service in services) {
        console.log(service);
        html += `<li>${service}</li>`;
    }

    html += `
      </ul>
    </body>
    </html>
  `;

    return html;
}

// Criação do servidor HTTP
http.createServer(async (req, res) => {
    if (req.url === '/') {
        const html = await generateHtml();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Página não encontrada</h1>');
    }
}).listen(8081, () => {
    console.log('Servidor rodando na porta 8080');
});
