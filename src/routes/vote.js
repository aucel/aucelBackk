var mongojs = require('mongojs');
var compare = require('tsscmp');

const dbVoter = mongojs('DatabaseVoter', [ 'voter' ]);
const dbCandidate = mongojs('DatabaseCandidates', [ 'candidate' ]);

const url = '/vote';

module.exports = app => {

    app.post(url, (req, res) => {

        dbVoter.voters.findOne({
            _id: mongojs.ObjectId(req.body.voter.id)
        }, (err, voter) => {    

            let newvoter = voter;

            if(newvoter == null) { 
                res.status(401).json({ voter: newvoter });
            } else {

                dbVoter.voters.findAndModify({

                    query: {_id: mongojs.ObjectId(newvoter._id)},
                    update: { $set: { isVote: true } },
                    new: true
                    
                }, (err, voter, lastErrorObject) => {  

                    if(voter != null) {

                        dbCandidate.candidates.findOne({
                            _id: mongojs.ObjectId(req.body.candidate.id)
                        }, (err, candidate) => {    

                            let newcandidate = candidate;
                
                            if(newcandidate == null) {  
                                res.status(401).json({ voter: newcandidate });
                            } else {

                                dbCandidate.candidates.findAndModify({
                
                                    query: {_id: mongojs.ObjectId(newcandidate._id)},
                                    update: { $inc: { cantidadVotos: 1 } },
                                    new: true
                                    
                                }, (err, voter, lastErrorObject) => {
                                    res.status(200).end();
                                });
                
                            }
                
                        });

                    }

                });

            }

        });
        
    });

};