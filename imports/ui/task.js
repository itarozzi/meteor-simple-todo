import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({
    'click .toggle-checked'() {
        // set the checked property to the opposite of its current value
        Meteor.call('tasks.setChecked', this._id, !this.checked);
// Replace DB direct access with methods
//        Tasks.update(this._id, {
//            $set: { checked: ! this.checked},
//        });
    },
    'click .delete'() {
        Meteor.call('tasks.remove', this._id);
// Replace DB direct access with methods        
//        Tasks.remove(this._id);    
    },
});
    