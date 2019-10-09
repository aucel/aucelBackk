var mongojs = require('mongojs');
var compare = require('tsscmp');

const db = mongojs('DatabaseVoter', [

    'voter'

]);

const url = '/login';

module.exports = app => {

    app.post(url, (req, res) => {

        db.voters.findOne({

            dni: req.body.voter.dni

        }, (err, voter) => {    

            let newvoter = voter;

            if(newvoter == null) {   
                res.status(401).json({ voter: newvoter });
            } else {

                if(!compare(newvoter.password, req.body.voter.password)) {
                    res.status(401).json({ voter: newvoter });
                } else {
                    res.status(200).json({ voter });
                }

            }

        });

    });

};