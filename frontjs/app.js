import io from 'socket.io-client';
import Vue from 'vue';

var app = new Vue({

  el: '#app',

  methods: {
    sendMessage: function () {
      this.socket.send({
        message: this.message,
        username: this.username
      });
      this.message = '';
    },
    joinChat: function () {
      this.socket = io('/', { query: 'username=' + this.username });
      this.socket.on('connect', (e) => {
        console.log(e);
        this.state = 2;
        console.log('connected');
      });
      this.socket.on('disconnect', () => {
        this.state = 1;
        console.log('disconnected');
      });
      this.socket.on('message', (message) => { this.messages.push(message); });
      this.socket.on('usersList', (message) => { this.users = message.users; });
    }
  },

  data: {
    state: 1,
    username: '',
    socket: null,
    message: '',
    messages: [],
    users: []
  }

});