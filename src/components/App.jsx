import React, { Component } from 'react';
import { FeedbackOptions } from './Feedback/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';
import css from './Section/Section.module.css'; 
   
export class App extends Component {

  state = {
    good: 0, 
    neutral: 0,
    bad: 0
  } 

   leaveFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1, 
    }));
  }; 

  countTotalFeedback = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };

  countPositiveFeedbackPercentage = () => {
    return Math.round((this.state.good / this.countTotalFeedback()) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positiveFeedback = this.countPositiveFeedbackPercentage();

    return (
      <div className={css.feedback}>     
        <Section title='Please leave feedback'>
          <FeedbackOptions 
            options={Object.keys(this.state)}   
            onLeaveFeedback={this.leaveFeedback}
          />
        </Section>
        {total === 0 ? (
          <Notification message="There is no feedback"></Notification>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positiveFeedback}
          />
        )}
     </div>
    );
  } 
}