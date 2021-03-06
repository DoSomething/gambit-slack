'use strict';

const logger = require('heroku-logger');
const { GatewayClient } = require('@dosomething/gateway/server');

let client;

/**
 * @return {GatewayClient}
 */
module.exports.getClient = () => {
  if (!client) {
    client = GatewayClient.getNewInstance();
  }

  return client;
};

/**
 * @param {String} email
 * @return {Promise}
 */
module.exports.fetchUserByEmail = async (email) => {
  logger.debug('fetchUserByEmail', { email });

  const res = await module.exports.getClient().Northstar
    // A Gambit broadcast message request requires the mobile field.
    .Users.getByEmail(email, { include: 'mobile' });

  return res.data;
};
