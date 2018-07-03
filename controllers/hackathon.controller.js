var HackathonService = require('../services/hackathon.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getHackathons = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
    
        var hackathons = await HackathonService.getHackathons({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: hackathons, message: "Succesfully hackathons Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createHackathon = async function(req, res, next){

    // Req.Body contains the form submit values

    var hackathon = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        status: req.body.status,
        org: req.body.org,
        organizer: req.body.organizer
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdHackathon = await HackathonService.createHackathon(hackathon);
        return res.status(200).json({status: 200, data: createdHackathon, message: "Succesfully Created hackathon"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "hackathon Creation was Unsuccesfull"})
    }
}