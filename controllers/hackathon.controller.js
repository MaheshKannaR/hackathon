var HackathonService = require('../services/hackathon.service')

// Saving the context of this module inside the _the variable

_this = this

function parseDate(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
  }

// Async Controller function to get the To do List

exports.getHackathons = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
    
        var hackathons = await HackathonService.getHackathons({}, page, limit);

        for(var i=0;i<hackathons.docs.length;i++){
            console.log(hackathons.docs[i].endDate);
            console.log(parseDate(hackathons.docs[i].endDate));
            var endDate = parseDate(hackathons.docs[i].endDate);
            var startDate = parseDate(hackathons.docs[i].startDate);
            var currentDate = new Date();
            if(endDate >= currentDate && startDate <= currentDate){
                hackathons.docs[i].status = "1";
                //activ
            }
            else if(startDate > currentDate){
                hackathons.docs[i].status = "3";
                //comming soon
            }
            else{
                hackathons.docs[i].status = "2";
                //completed
            }
        }
        
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
        organiser: req.body.organiser,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        mob: req.body.mob
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