import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './body.html';


// Assign static data
// Template.body.helpers({
//   tasks: [
//     { text: 'This is task 1' },
//     { text: 'This is task 2' },
//     { text: 'This is task 3' },
//   ],
// });


// Load data from Mongo DB
Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});
