const router = require('express').Router();
let Usuario = require('../models/usuario.model');

router.route('/').get((req,res)=> {
    Usuario.find()
        .then(usuarios => res.json(usuarios))
        .catch(err => res.status(400).json('Erro: ' + err));
});

router.route('/add').post((req,res)=> {
    const username = req.body.username;

    const novoUsuario = new Usuario({username});

    novoUsuario.save()
        .then(() => res.json('Usuário adicionado!'))
        .catch(err => res.status(400).json('Erro: ' + err));
});

module.exports = router;
