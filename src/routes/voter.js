var mongojs = require('mongojs');

const model = 'voter'

const db = mongojs('DatabaseVoter', [

    model

]);

const url = '/' + model

module.exports = app => {

    app.get(url, (req, res) => {

        db.voters.find((err, voter) =>{
            res.json({ voter });
        });

    });

    app.post(url, (req, res) => {

        db.voters.findOne({

            dni: req.body.voter.dni

        }, (err, voter) => {

            let newVoter = voter;

            if(voter != null) {

                res.json({ voter: newVoter });

            } else {

                newVoter = {

                    dni: req.body.voter.dni,
                    name: req.body.voter.name || 'voter: name',
                    lastname: req.body.voter.lastname  || 'voter: lastname',
                    email: req.body.voter.email  || 'voter: email',
                    emailConfirm: false,
                    password: req.body.voter.password  || 'voter: password',
                    passwordConfirm: false,
                    isVote: false
                    
                };

                db.voters.insert(newVoter, (err, voter) => {
                    res.json({ voter });
                });

            }

            

        })

    });

    app.delete(url + '/:dni', (req, res) => {

        db.voters.remove({

            _id: mongojs.ObjectId(req.params.dni)

        }, (err, response) => {

            res.json({ response });

        });

    });

    app.delete(url, (req, res) => {

        var bulk = db.voters.initializeUnorderedBulkOp();
        bulk.find({}).remove();

        bulk.execute(function (err, response) { 
            res.status(200).json(response); 
        });

    });

};