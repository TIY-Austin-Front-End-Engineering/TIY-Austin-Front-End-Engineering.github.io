//component will allow the teacher to create a new quiz with a new quiz id
var React = require('react');
var Backbone = require('backbone');
var PostQuestionComponent = require('./PostQuestionComponent');
var QuizModel = require('../models/QuizModel');
var EditQuizComponent = require('./EditQuizComponent');
var Moment = require('moment');


module.exports = React.createClass({
	getInitialState: function(){
		return(
			{
				feedbackElement:null
			}
		);
	},
	render:function(){
		var today = Moment().format('YYYY-MM-DD')
		return(
			<div className="row create-quiz-container">
				<div className="instructions five columns">
					<h3>Instructions</h3>
					<hr />
					<ul>
						<li> - Write a quiz title.</li>
						<li> - Select a start time and date.</li>
						<li> - Select an end time and date.</li>
						<li> - Click Create Quiz button to save!</li>
					</ul>
				</div>
				<div className="create-quiz seven columns">
					<h3>Create Quiz</h3>
					<hr />
					<form onSubmit={this.onSubmit}>
						<label htmlFor="create-quiz-title">Title</label>
						<input className="u-full-width" type="text" ref="quizName" id="create-quiz-title"placeholder="Quiz Title"/>
						<label htmlFor="start-date">Start Date and Time</label>
						<input className="u-full-width" type="date" ref="dateToStart" id="start-date" placeholder="date to starts" value={today} />
						<input type="time" ref="timeToStart" />
						<label htmlFor="start-time">End Date and Time</label>
						<input className="u-full-width" type="date" ref="dateToExpire" id="start-time" placeholder="date to expire" />
						<input type="time" ref="timeToExpire" /><br />
						<button >Create Quiz</button>
						<h2>{this.state.feedbackElement}</h2>
					</form>
				</div>
			</div>

		);

	},
	onSubmit: function(e){
		//grabbing the name and id of new quiz and passing it through to edit quiZ

		e.preventDefault();
		var newQuiz = new QuizModel({
			quizTitle: this.refs.quizName.value,
			startTime: new Date(this.refs.dateToStart.value),
			expireTime: new Date(this.refs.dateToExpire.value),
			startTime: new Date(this.refs.dateToStart.value+'T'+this.refs.timeToStart.value+':00'),
			totalQuestion: 0
		});
		console.log(this.refs.dateToStart.value);
		if(!this.refs.dateToStart.value && !this.refs.dateToExpire.value)
		{
			this.setState({feedbackElement: 'Please add a Starting Date and an Expiration Date'});
		}
		else if(!this.refs.dateToStart.value)
		{
			this.setState({feedbackElement: 'Please add a Starting Date'});
		}
		else if(!this.refs.dateToExpire.value){
			this.setState({feedbackElement: 'Please add an Expiration Date'});
		}
//////////////////////////////////////////////////////////////////////////
//THIS WILL BE OBSOLETE ONCE WE GET THE TIME AND DATE CONCATENATED ////////
///////////////////////////////////////////////////////////////////////////
		else if(!this.refs.timeToStart.value){
			this.setState({feedbackElement: 'Please add a Starting Time'});
		}
		else if(!this.refs.timeToExpire.value){
			this.setState({feedbackElement: 'Please add an Expiration Time'});
		}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
		else
		{
			newQuiz.save({
				success: (u) => {
					this.props.router.navigate('#editQuiz/'+newQuiz.id, {trigger: true});
				}			
			});
				
		}
	}
});
