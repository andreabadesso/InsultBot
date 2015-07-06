(function() {
    'use strict';
    var WebSocket = require('ws');

    var channels = [
        'lobby',
        'meta'
    ];

    var insults = [
        'You lift your leg on trees, you dirty hideous potato sucker who likes to fry up the cat litter munching bird brain and the imprudent prick. ',
        'Go drool on somebody else, you moronic squealing goat defiler who has delusions about being the moldy sock devouring bible-thumper and the inbred Rush Limbaugh wannabe. ',
        'You dream of beating horny toads, you stringy two bit butthead who comes on to the dweeby penile colonist and the reeking disease. ',
        'You lift your leg on trees, you airheaded abysmal homicidal clown who loves the sniveling bible-thumper and the belligerent frog molester. ',
        'You will marry a stinking putrid freak who is jealous of the arrogant harlet and the masturbating bile. ',
        'Get down and kiss my feet you hideous arrogant screwball who flies over the immoral cockroach and the dandruff licking hampster eater. ',
        'If nothing else, you are a racist miserable sheep who bows down to the rancid bigot and the stinking dildo.',
        'Get away from me you nipply rancid bigot who drives for the airheaded crackhead and the snot loving hairy-assed. ',
        'You defile goats, you belligerent fascist maggot lover who shares the port-a-pottie with the raving snotbox and the stinking gang banger. ',
        'The residents of Maine find you to be a pathetic crap eating cheeseball who drives for the necropheliac salad for brains and the snot loving goblin. ',
        'Everybody thinks you are a teletubbie rubbing airheaded cockroach who is jealous of the utterly friendless cerebral penis and the desperate hermaphrodite. ',
        'You eat your own snot, you nipply yodelling cheeseball who drives for the worthless freak and the ragged dog. ',
        'Bang your head against the wall, you putrid loincloth chomping cum dumpster who gropes the disease ridden pickle barrel and the flatulating piece of crap. ',
        'You abuse donkeys, you rotting disease ridden pus hole who eats the earwax of the teletubbie rubbing numskull and the dirty maggot lover. ',
        'Go defile a rock, you moldy sock devouring mildew gulping dumbass who pukes on the snot loving cerebral penis and the masturbating nipple. ',
        'Thy currish plume-plucked idiot, and I do believe, induced by current circumstances, that thou art a villain, cunt. hath a dread-bolted baggage. ',
        'Thy gorbellied dismal-dreaming bum-bailey hath a pox-marked pigeon-egg. ',
        'Thy rank toad-spotted gudgeon hath a elf-skinned maggot-pie. ',
        'Thou art a mammering guts-griping pigeon-egg. ',
        'Thou art a weedy rough-hewn moldwarp. ',
        'Thy dankish hasty-witted haggard hath a rump-fed mammet. ',
        'Thou art a wayward reeling-ripe moldwarp. ',
        'Thy froward knotty-pated lout hath a ill-nurtured giglet. ',
        'Thy artless rump-fed death-token hath a milk-livered vassal. ',
        'Thy reeky clay-brained vassal hath a toad-spotted mammet. ',
        'I think you might have something wrong with your brain. Why are you trying to be all cyberbully on me. Do you really think anyone cares about you. You talk to people like they are trash. Why would you want to come off like that. Does it make you feel tough? Are you trying to make up for having a small smelly dick? You need to see a shrink. Have fun going through life wondering why people don\'t like you. I\'ll give you a hint though, you try to make others feel like ****. But you have failed on me. I know what you are. See, the thing is, I\'m a nice guy. You on the other hand can\'t control your stupidity. You really don\'t even realize that you are a jerk ,do you? When your older maybe you can look back on times like this and see that you where unnecessarily rude to people you don\'t know. Right now you think you are being cleaver and it is just a fun time. Keep treating people like you do and see where you end up. You can not compete with my intellect so I warn you to give up before you embarrass yourself further..'
    ];

    var ignoreNicknames = {
        'Mr. Walters': -1,
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
            console.log('Message... ');
            var randomIndex = parseInt(Math.random(1, 10) * insults.length, 10);
            var insult = insults[randomIndex];
            var data = JSON.parse(message.data)

            if (!ignoreNicknames.hasOwnProperty(data.nick)) {
                if (data.nick !== botname && data.nick !== '*') {
                    ws.send(JSON.stringify(['chat', '$\\small\\red{\\text{@' + data.nick + ': ' + insult + '}}$']));
                }

                var timeout = setTimeout(function() {
                    delete ignoreNicknames[data.nick];
                }, 4000);

                ignoreNicknames[data.nick] = timeout;
            } else {
                clearTimeout(ignoreNicknames[data.nick]);
                var timeout = setTimeout(function() {
                    delete ignoreNicknames[data.nick];
                }, 4000);

                ignoreNicknames[data.nick] = timeout;
                console.log('skipping..');
            }
        }

        ws.onclose = function() {
            console.log('Socket closed..');
        };

        socketList.push(ws);
    }

    channels.forEach(function(channel) {
        setup('Mr. Walters', channel);
    });

}());
