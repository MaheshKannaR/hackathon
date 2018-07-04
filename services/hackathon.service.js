var Hackathon = require('../models/hackathon.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getHackathons = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var hackathons = await Hackathon.paginate(query, options)
        
        // Return the todod list that was retured by the mongoose promise
        return hackathons;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating hackathons')
    }
}


exports.createHackathon = async function(hackathon){
    
    // Creating a new Mongoose Object by using the new keyword
    var hackathon = new Hackathon({
        title: hackathon.title,
        description: hackathon.description,
        date: hackathon.date,
        status: hackathon.status,
        org: hackathon.org,
        organiser: hackathon.organiser,
        startDate: hackathon.startDate,
        endDate: hackathon.endDate,
        mob: hackathon.mob
    })

    try{

        // Saving the Todo 
        var savedHackathon = await hackathon.save()

        return savedHackathon;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Hackathon")
    }
}