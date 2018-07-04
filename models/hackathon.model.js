var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var HackathonSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    org: String,
    organiser: String,
    teamsize: String,
    startDate: String,
    endDate: String,
    mob: String
})

HackathonSchema.plugin(mongoosePaginate)
const Hackathon = mongoose.model('Hackathon', HackathonSchema)

module.exports = Hackathon;