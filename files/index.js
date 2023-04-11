const chatscript = require('./chatscript');
const db = require('../postgres/queries');

const inworld = require('./inworld');


//import { InworldClient, InworldPacket, status, } from '@inworld/nodejs-sdk';
const iw = require ('@inworld/nodejs-sdk');
const status = iw.status;


const {startSession} = require ("./inworld");

//const {log, parseRequest, handleError, handleRequest} = require("../util")




module.exports = function (io) { //, ioclient) {
    //var db = require('../controller/adaptor/mongodb.js');
    ///var async = require("async");
    //var mongoose = require("mongoose");
    //var CONFIG = require('../config/config');
    
    //var push = require('../model/pushNotification2.js')(io);
    //var timezone = require('moment-timezone');

    /*
    async function sendInworld() {
        const client = await startSession('testes', undefined);
        await client.connection.sendText('hello');
        //var connection = inworld.newConnection("testes"); 
        // Send your message to a character.
        // Otherwise connection will be managed automatically by SDK.
        //await connection.open();
        // You can check if the connection is open or not in case of configuration.connection.autoReconnect = false.
        //connection.isActive();
        // Send text message.
        //const sendPacket = connection.sendText("yo");
        //const sendPacket = await connection.sendText('Hello');
        // Close connection.
        //connection.close();
    }*/
    //sendInworld();
    /*async function sendIw() {
        await inworld.newConnection("testes"); 
    }*/
    
    /*async function startIw() {
        var user = "testes";
        var session = undefined;
        var client = await startSession(user, session);
        var sessionInfo = {sessionId: client.session};
        console.log('Session started: ', sessionInfo);
        //res.end(JSON.stringify(sessionInfo));
    }

    console.log('set up session');
    startIw();*/

    async function sendIw(user, message, sessionID=undefined) {  
        console.log("send message to inworld = " + message);

        return new Promise(async function(resolve, reject) {
            const client = await startSession(user, sessionID);
            var return_message = ""; // can be multiple messages combined together
            console.log("user=" + user + " sessionID=" + sessionID);
            client.setMessageCallback((msg) => {
                msg.sessionId = client.sessionID;
                if(msg.text) {
                    console.log(msg.text);
                    var txt = msg.text.text;
                    return_message += txt;
                    // we'll resolve this and close the connection only if NOT terminated in comma
                    //if (txt[txt.length-1] != ",") {

                        
                }
        
                if (msg.isInteractionEnd()) {
                    //res.end(JSON.stringify(msg));
                    console.log('close connection for user=' + user);
                    client.connection.close();               
                    resolve(return_message);  // return the msg text
                }
            });

            if (client.connection)
                await client.connection.sendText(message);
            else
                console.log('could not get session');
            
        });
    }

    /*console.log('try it once?');
    sendIw("testes","What's happening?")
                            .catch(function(e) {
                            console.log("e occurred during sendIw");
                            console.log(e);
                        })
                        .then( (iwresp) => {
                            console.log("inworld response = " + iwresp);
                            //chat.emit("emit-message", {username: "anybot", msgtext: iwresp, oobstring: oob_resp});  // send it to the angular client
                    
                            console.log('got response=' + iwresp);
                
    });*/
    

    async function sendMessage(username, oob, msgtext) {
        if (msgtext=="")
            msgtext = "[ ]"; // do this in order for chatscript to log empty input

        // wow it doesn't know what the fuck localhost is but "127.0.0.1" did the trick
        chatscript.callCs(username, oob, msgtext)
            .catch(function(e) {
                console.log("e occurred during callCs");
                console.log(e);
                //bot.say("Sorry, can you repeat?");
            })
            .then( (res) => {
            //console.log(resp);
                // separate oob from the msg response
                var resp = res;
                var oob_resp = "";
                var oob_start = res.indexOf("[");
                if(oob_start != -1) {
                    var oob_end = res.indexOf("]");
                    //var oob_res = JSON.parse(res.substring(oob_start + 1, oob_end));
                    oob_resp = res.substring(oob_start + 1, oob_end);
                    resp = res.substring(oob_end + 1);
                    console.log('oob='+  oob_resp);
                }

                // if there are parts of the oob that we need to store in the database parse that now


                
                // now call inworld if deemed necessary
                //if (process.env.USE_INWORLD=="true" && oob_resp.includes("iw")) {
                if (process.env.USE_INWORLD=="true" && true) {
                    console.log("resp=" + resp + " but see what inworld comes up with");
                    sendIw(username, msgtext)
                        .catch(function(e) {
                        console.log("e occurred during sendIw");
                        console.log(e);
                    })
                    .then( (iwresp) => {
                        console.log("inworld response=" + iwresp);
                        if (iwresp != "") {
                            console.log('emit inworld resp: ' + resp + ' oob_resp: ' + oob_resp);

                            //chat.emit("emit-message", {username: "anybot", msgtext: iwresp, oobstring: oob_resp});  // send it to the angular client
                            chat.emit("emit-message-" + username, {msgtext: iwresp, oobstring: oob_resp});  // send it to the angular client
                
                            console.log('now add user msg to database');
                            //msgToDatabase(userid, false, user, msgtext, iwresp);
                            msgToDatabase(username, false, msgtext, iwresp);
                        }
                        
                    });

                } else {
                    // not using inworld so return message and update database

                    console.log('emit (without inworld) resp: ' + resp + ' oob_resp: ' + oob_resp + ' username: ' + username);
                    // send both msg part and oob part back to the front end
                    //chat.emit("emit-message", {username: "anybot", msgtext: resp, oobstring: oob_resp});  // send it to the angular client
                    chat.emit("emit-message-" + username, {msgtext: resp, oobstring: oob_resp});  // send it to the angular client
                

                    console.log('now add user msg to database');
                    msgToDatabase(username, false, msgtext, resp);
                }


            })
        ;
    }



    async function msgToDatabase(username, isbot, msgtext, botmsgtext) {
        // do we bother to update database
        if (process.env.USE_DATABASE=="false") {
            console.log('database turned off. abort');
            return;
        }
            
        if (!username) {
            console.log('Error: No username for msgToDatabase!!');
            return;
        }
        
        //console.log('proceed with database update because USE_DATABASE=' + process.env.USE_DATABASE);
        //if (msgtext.charAt(0)=='~')
        //    return;  // indicates the result of a :why
        if (msgtext) {
            if (msgtext.charAt(0)==':') {
                console.log('abort msgToDatabase');
                return; // no need to record system commands such as ":why"
            }
            
            if (msgtext=="refresh" || msgtext=="refresh clear") {
                msgtext = "";  // in order to record the botmsgtext only
            }
        }
        
        console.log('For username=' + username + ' write to database message=' + msgtext + '. First get id');

        db.getUserIDFromName(username)
            .catch(function(e) {
                console.log("e occurred");
                console.log(e);
            })
            .then( (res) => {
                var id = res[0];
                console.log('returned from getUserIDFromName with id=' + id + '. now add to chathistory');

                        // add user msg to chathistory
                        db.createMsg(id, isbot, msgtext)
                        .catch(function(e) {
                            console.log("e occurred");
                            console.log(e);
                        })
                        .then( (res) => {

                            console.log('returned from createMsg with res=' + res + '. Now add bot msg to database');
                            // add bot msg to chathistory
                            //db.createMsg(userid, true, "bot", botmsgtext)
                            db.createMsg(id, true, botmsgtext)
                                .catch(function(e) {
                                    console.log("e occurred");
                                    console.log(e);
                                })
                                .then( (res) => {
                                    console.log('returned from createMsg for id=' + id + ' with res=' + res);
                                })
                            ;
                        })
                        ;

            })
        ;


    }
    
    var usernames = {};
    var rooms = [];
    //var chatRooms = [];
    //var notifyRooms = [];
    
  
  
    // var chat = io.of('/chat');
    var chat = io.of('/chat');


    //chat.on('connection', function (socket) {
    chat.on('connection', function (socket) {  
        console.log('new connection');
        //chat.emit('done-create-room', 'okkk');


        socket.on('create room', (message) => {  
            var username = message.username;
            //var msg = message.msgtext;
            var msg = "refresh clear";
            console.log('create room for user=' + username + ' msg=' + msg);   //just testing sockets connection to web frontend -Robert
            //oob = JSON.stringify(oob);
            oob = null;
            //username = "rob---2806";

            

            // skip sending message to cs maybe?
            if (process.env.USE_DATABASE!="false") {
                //db.createUser(username, "mtestes@arelarge.com")
                db.createUser(username)
                    .catch(function(e) {
                        console.log("e occurred");
                        console.log(e);
                    })
                    .then( (id) => {
                        console.log('returned from createUser with id=' + id);
                        //oob_resp += ' i' + id;  // frontend needs to know the id to store it and include in messages

                                //console.log('resp: ' + resp + ' oob_resp: ' + oob_resp);
                                // send both msg part and oob part back to the front end
                        chat.emit("done-create-room-" + username); //, {userid: id});  // send it to the angular client
                        //sendMessage(id, username, oob, msg);
                    })
                ;
            } else {
                // not updating database so just emit the response to frontend
                var arbitrary_id = 100 + Math.floor(Math.random() * 100);
                chat.emit("done-create-room-" + username); //, {userid: arbitrary_id});  // send it to the angular client
                // when database is disabled we have to send this message, since it won't get called otherwise, 
                // since the front end never receives chat history query
                sendMessage(username, oob, msg);

            }
            console.log('completed create room for ' + username + ' and userid ' + arbitrary_id);

        });


        


       //val = "rob---10671fear1tell me a joke";
       
        /*const trysocket = ioclient("localhost:1024", {
            reconnectionDelayMax: 10000,
            query: {
                "puts": val
            }
        });*/
        
        // open a client socket to send message to chatscript and receive reply
        //var client = ioclient.connect("http://localhost:1024", {reconnect: true});
        


        console.log("started the client");


     
        socket.on('new-message', (message) => {  
            console.log("incoming message"); //:" + message);
            //chat.emit('emit-message', 'emit chat to everyone');
            
            oob = null;
            //username = message.username;
            //var userid = message.userid;
            var msgtext = message.msgtext;
            var username = message.username;
            console.log("username=" + username + " msgtext:" + msgtext);

            /*
            db.getUserNameFromID(userid)
                .catch(function(e) {
                    console.log("e occurred");
                    console.log(e);
                })
                .then( (id) => {
                    console.log('returned from createUser with new id=' + id);
                    oobresp += ' i' + id;  // frontend needs to know the id to store it and include in messages
                })
            ;*/
            //var username = "testes";

            sendMessage(username, oob, msgtext);


            // delete chathistory when input is ':reset'
            if (msgtext==':reset' && process.env.USE_DATABASE!=="false") {

                if (process.env.USE_DATABASE!=="false") {
                    console.log('first get id for username=' + username);
    
                        db.getUserIDFromName(username)
                            .catch(function(e) {
                                console.log("e occurred");
                                console.log(e);
                            })
                            .then( (res) => {
                                var id = res[0];
                                console.log('returned from getUser with new id=' + id + '. now delete chathistory');

                                db.deleteChatHistory(id)
                                    .catch(function(e) {
                                        console.log("e occurred");
                                        console.log(e);
                                    })
                                    .then( (res) => {
                                        console.log('returned from deleteChatHistory');
                                    })
                                ;


                            })
                        ;
    
                }

                
            }
            
            ;
            //chat.in('5b3dd2d42358e01132fbf0da').emit('emit-message', 'emit chat to user only');
        }); 


        
        
        socket.on('chathistory', (request) => {  
            if (process.env.USE_DATABASE=="false")
                return;
            //var id = request.id;
            var username = request.username;
            var limit_size = request.limit;
            var skip_size = request.skip;
            console.log("incoming chathistory request for username=" + username + " limit=" + limit_size + " skip=" + skip_size); //:" + message);

            if (username) {
                if (process.env.USE_DATABASE!=="false") {
                    console.log('first get id for username=' + username);

                    db.getUserIDFromName(username)
                        .catch(function(e) {
                            console.log("e occurred");
                            console.log(e);
                        })
                        .then( (res) => {
                            var id = res[0];
                            console.log('returned from getUserIDFromName with id=' + id + '. now perform chathistory request');

                            db.getChatHistory(id, limit_size, skip_size)
                                .catch(function(e) {
                                    console.log("e occurred");
                                    console.log(e);
                                })
                                .then( (res) => {

                                    console.log('returned from getChatHistory with res=' + res);
                                    chat.emit('chathistoryresults-' + username, {data: res});
                                })
                            ;
                        })
                    ;

                }
            }

            

        });


        socket.on('delete-user', function (data) {
            console.log('delete-user');
            //var id = data.userid;
            var username = data.username;
            if (username) {
                if (process.env.USE_DATABASE!=="false") {
                    console.log('first get id for username=' + username);

                    db.getUserIDFromName(username)
                        .catch(function(e) {
                            console.log("e occurred");
                            console.log(e);
                        })
                        .then( (res) => {
                            var id = res[0];
                            console.log('returned from getUser with new id=' + id);

                            console.log('drop chathistory for userid=' + id);
                            db.dropChatHistory(id)
                                .catch(function(e) {
                                    console.log("e occurred");
                                    console.log(e);
                                })
                                .then( (res) => {
                                    console.log('returned from dropChatHistory');
                                })
                        })
                    ;

                }
            }
            
        });

        socket.on('disconnect', function (data) {
        // console.log("disconnect******",data);
            var groupid = data.groupid;
            if (typeof groupid != undefined) {
                socket.leave(groupid);
            }
        });


    });

    //sendMessage('testes','testes',null,'your name is?');

};



