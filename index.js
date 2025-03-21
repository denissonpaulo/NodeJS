 
//index.js
(async () => {
    const database = require('./db');
    const Produto = require('./produto');
 
 
    try {
        const resultado = await database.sync();
        console.log(resultado);

        
        const resultadoCreate = await Produto.create({
            nome: 'Placa mãe Asus i9',
            preco: 788.90,
            descricao: 'PLC 8 slots DDR5 + i9 + Cooler'
        })
        console.log(resultadoCreate);
        

        const produtos = await Produto.findAll();
        console.log(produtos);

        const produto = await Produto.findByPk(1);
        console.log(produto);
        
      

    } catch (error) {
        console.log(error);
    }
})();