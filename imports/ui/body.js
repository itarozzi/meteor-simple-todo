import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';


// Assign static data
// Template.body.helpers({
//   tasks: [
//     { text: 'This is task 1' },
//     { text: 'This is task 2' },
//     { text: 'This is task 3' },
//   ],
// });


// Setup a new ReactiveDict and attach it to the body template instance when it is first created:
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

// Load data from Mongo DB
Template.body.helpers({
  tasks() {
      const instance = Template.instance();
      if (instance.state.get('hideCompleted')) {
          // If hide completed is checked, filter tasks
          return Tasks.find({ checked: { $ne: true } }, { sort: { text: 1 } });
      }
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { text: 1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();  
  },
});


Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
        text,
        createdAt: new Date(), // current time
        owner: Meteor.userId(),
        username: Meteor.user().username,
        
    });


    // Clear form
    target.text.value = '';
  },
    
  // Check box event changed
  'change .hide-completed input'(event, instance) {
      instance.state.set('hideCompleted', event.target.checked);
  },
    
});
