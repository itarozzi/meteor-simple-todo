import { Accounts } from 'meteor/accounts-base';


Accounts.ui.config({
    // Configure the accounts UI to use usernames intead of email addresses
    passwordSignupFields: 'USERNAME_ONLY',
});


