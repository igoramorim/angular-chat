'use strict';

exports.list_all_users = function(req, res) {
  res.json({ hello: 'list_all_users' });
};

exports.create_a_user = function(req, res) {
  res.json({ hello: 'create_a_user' });
};

exports.read_a_user = function(req, res) {
  res.json({ hello: 'read_a_user' });
};

exports.update_a_user = function(req, res) {
  res.json({ hello: 'update_a_user' });
};

exports.delete_a_user = function(req, res) {
  res.json({ hello: 'delete_a_user' });
};
