const router = require('express').Router();
let Exercicio = require('../models/exercicio.model');

router.route('/').get((req, res) => {
    Exercicio.find()
        .then(exercicios => res.json(exercicios))
        .catch(err => res.status(400).json('Erro: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const novoExercicio = new Exercicio({
            username,
            description,
            duration,
            date,
        });

    novoExercicio.save()
        .then(() => res.json('Exercício adicionado!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Exercicio.findById(req.params.id)
        .then(exercicio => res.json(exercicio))
        .catch(err => res.status(400).json('Erro: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercicio.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercício deletado'))
        .catch(err => res.status(400).json('Erro: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercicio.findById(req.params.id)
        .then(exercicio => {
            exercicio.username = req.body.username;
            exercicio.description = req.body.description;
            exercicio.duration = Number(req.body.duration);
            exercicio.date = Date.parse(req.body.date);

            exercicio.save()
                .then(() => res.json('Exercício atualizado!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Erro: ' + err));

});

module.exports = router;
