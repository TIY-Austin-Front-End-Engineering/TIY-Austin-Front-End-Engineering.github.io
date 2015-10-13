'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;


Parse.initialize('qy4WDiTUAsyns9L817gjZdVf1aEQTetovh1yNDTk', 'xrkwhyHvS5Y9od0EWmN9hd0ssv28caF4YATtQaPJ');

var RegisterComponent = require('./components/RegisterComponent');
var NavigationComponent = require('./components/NavigationComponent');
var LoginComponent = require('./components/LoginComponent');
var QuizListComponent = require('./components/QuizListComponent');
var PostQuestionComponent = require('./components/PostQuestionComponent');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'dashboard': 'dashboard',
		'login': 'login',
		'register': 'register',
		'postQuestion': 'postQuestion',
		'quizResults': 'quizResults',
		'logout': 'logout'

	},
	home: function() {
		//ReactDOM.render(<HomeComponent />, app);
	},
	dashboard: function() {
		// ReactDOM.render(<DashboardComponent router={r} />, app);
	},
	login: function() {
		ReactDOM.render(<LoginComponent router={r} />, app);
	},
	register: function() {
		ReactDOM.render(<RegisterComponent router={r} />, app);
	},
	postQuestion: function() {
		ReactDOM.render(<PostQuestionComponent/>, app);
	},
	quizResults: function(id) {
		// ReactDOM.render(<QuizResultsComponent/>, app);
	},
	logOut: function() {
		Parse.User.logOut();
		this.navigate('home', {trigger: true} );
	}
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);
