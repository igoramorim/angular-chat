'use strict';

module.exports = function(app) {

let users = require('../controllers/userController');

app.route('/users')
   .get(users.list_all_users)
   .post(users.create_a_user);

app.route('/users/:usergId')
   .get(users.read_a_user)
   .put(users.update_a_user)
   .delete(users.delete_a_user);
};

