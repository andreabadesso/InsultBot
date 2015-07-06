(function() {
    'use strict';
    var WebSocket = require('ws');

    var channels = [
        'lobby',
        'meta'
    ];

    var responses = {
        'pong': 'ping'
    };

    var ignoreNicknames = {
        'ponger': -1,
        '*': -1
    };

    var socketList = [];

    function setup(botname, room) {
        var ws = new WebSocket('wss://hack.chat/chat-ws', null, {
            rejectUnauthorized: false
        });

        ws.onopen = function() {
            ws.send(JSON.stringify(['join', room, botname]));
        };

        ws.onmessage = function(message) {
            var data = JSON.parse(message.data)
            console.log(data.nick + ' => ', data.text);

            if (!ignoreNicknames.hasOwnProperty(data.nick)) {
                if (responses.hasOwnProperty(data.text)) {
                    ws.send(JSON.stringify(['chat', responses[data.text]]))
                }
            }
        }

        ws.onclose = function() {
            console.log('Socket closed..');
        };

        socketList.push(ws);
    }

    channels.forEach(function(channel) {
        setup('ponger', channel);
    });

}());
