var mongojs = require('mongojs');

const model = 'candidate'

const db = mongojs('DatabaseCandidates', [

    model

]);

const url = '/' + model

module.exports = app => {

    app.get(url, (req, res) => {

        db.candidates.find((err, candidates) =>{

            res.json({
                candidates
            });

        });

    });

    app.post(url, (req, res) => {

        db.candidates.findOne({

            partido: req.body.candidate.partido

        }, (err, candidate) => {

            let newCandidate = candidate;

            if(candidate != null) {

                res.json({
                    candidate: newCandidate
                });

            } else {

                newCandidate = {

                    dni: req.body.candidate.dni || 123456,
                    partido: req.body.candidate.partido || '',
                    presidente: req.body.candidate.presidente || 'presidente: candidate',
                    vicepresidente: req.body.candidate.vicepresidente || 'partido: vicepresidente',
                    cantidadVotos: 0
                    
                };

                db.candidates.insert(newCandidate, (err, candidate) => {
        
                    res.json({
                        candidate
                    });
        
                });

            }

            

        })

    });

    app.delete(url + '/:presidente', (req, res) => {

        db.candidates.remove({

            _id: mongojs.ObjectId(req.params.presidente)

        }, (err, response) => {

            res.json({
                response
            });

        });

    });

};