import React, { Component, useState } from 'react';
export default class extends React.Component {
	handleAnswerOptionClick = (key) => {
		console.log("sending id response : " + key);

	}

	render(){
		return (
			<div className='app'>
						<div className='question-section'>
							<div className='question-count'>
								<span>Question </span>
							</div>
							<div className='question-text'>{this.props.question.questionText}</div>
						</div>
						<div className='answer-section'>
							{
								this.props.question.answerOptions.map((answerOption, index) => (
									<button 
										key = {index}
										onClick={() => this.props.submit(index/** question id  */)}
									>
										{answerOption.answerText}
									</button>
								))
							}
						</div> 
			</div>
		);
	}
}
