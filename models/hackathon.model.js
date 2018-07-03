var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var HackathonSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String,
    org: String,
    organizer: String
})

HackathonSchema.plugin(mongoosePaginate)
const Hackathon = mongoose.model('Hackathon', HackathonSchema)

module.exports = Hackathon;