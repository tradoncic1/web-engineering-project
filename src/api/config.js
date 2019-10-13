var mongojs = require('mongojs')
var url = "mongodb+srv://admin:admin@cluster0-kmxav.gcp.mongodb.net/test?retryWrites=true&w=majority";

var db = mongojs(url, ['users', 'teams', 'tasks', 'taskList', 'projects', 'projectList']);