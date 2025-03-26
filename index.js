const { where } = require('sequelize');

 
//index.js
(async () => {
    const database = require('./db');
    const Produto = require('./produto');
    const http = require('http'); // Inclua o módulo HTTP, código teste para redenrizar no html o resultado da consulta
 
    try {
        const resultado = await database.sync();
        console.log(resultado);

        
        //CREATE
        const resultadoCreate = await Produto.create({
            nome: 'Placa mãe Asus i9',
            preco: 788.90,
            descricao: 'PLC 8 slots DDR5 + i9 + Cooler'
        })
        console.log(resultadoCreate);
        
        //READ
        const produtos = await Produto.findAll();
        console.log(produtos);

        const produto = await Produto.findByPk(1);
        console.log(produto);

        /*

        //UPDATE
        const produto = await Produto.findByPk(1);
        //console.log(produto);
        produto.nome = "Mouse Top";
        
        const resultadoSave = await produto.save();
        console.log(resultadoSave);

        //DELETAR
        //assim
        //Produto.destroy({where: {id: 5}});

        //ou assim
        const produto = await Produto.findByPk(1);
        produto.destroy();
        
        */

        http.createServer(async (req, res) => {
            if (req.url === '/produtos') {
                try {
                    const produtos = await Produto.findAll();
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(produtos)); // Envia os dados como JSON
                } catch (error) {
                    console.error('Erro ao buscar produtos:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Erro ao buscar produtos' }));
                } 
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Bem-vindo à API de produtos!');
            } 
        }).listen(3000, () => console.log('Servidor rodando na porta 3000'));
       

    } catch (error) {
        console.log(error);
    }
})();