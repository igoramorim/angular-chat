'use strict';

exports.list_all_messages = function(req, res) {
  res.json({ hello: 'list_all_messages' });
};

exports.create_a_message = function(req, res) {
  res.json({ hello: 'create_a_message' });
};

exports.read_a_message = function(req, res) {
  res.json({ hello: 'read_a_message' });
};

exports.update_a_message = function(req, res) {
  res.json({ hello: 'update_a_message' });
};

exports.delete_a_message = function(req, res) {
  res.json({ hello: 'delete_a_message' });
};
