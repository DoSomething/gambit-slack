'use strict';

const logger = require('heroku-logger');

const mediaUrl = 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/dirt-dave-and-gill.jpg';

function isDirectMessageFromUser(message) {
  // Is this a direct message?
  if (message.channel[0] !== 'D') return false;

  // Ignore threaded messages.
  if (message.reply_to) return false;

  // Is this from a bot?
  if (message.bot_id || message.subtype === 'bot_message') {
    return false;
  }

  if (!message.text) return false;

  return true;
}

function parseMessage(message) {
  logger.debug('slack message received', message);
  /* eslint-disable no-param-reassign */
  message.command = message.text.toLowerCase().trim();
  if (message.command === 'photo') {
    message.mediaUrl = mediaUrl;
  }
  const params = message.text.split(' ');
  if (params[0].toLowerCase() === 'broadcast') {
    message.command = 'broadcast';
    message.broadcastId = params[1];
  }
  if (params[0].toLowerCase() === 'signup') {
    message.command = 'signup';
    message.campaignId = params[1];
  }
  /* eslint-enable no-param-reassign */
}

module.exports = {
  isDirectMessageFromUser,
  parseMessage,
};