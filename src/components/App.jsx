import { useState } from 'react';
import { FeedbackOptions } from './Feedback/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';
import css from './Section/Section.module.css'; 
   
export const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackNames = ["good", "neutral", "bad"];
  

 const countTotalFeedback = () => {
   return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  const handleLeaveFeedback = option => {
    option === 'good' && setGood( prevState => prevState + 1);
    option === 'neutral' && setNeutral(neutral + 1);
  option === 'bad' && setBad(bad + 1 );

  };

  return (
  
      <div className={css.feedback}>     
        <Section title='Please leave feedback'>
          <FeedbackOptions 
             options={feedbackNames} 
          onLeaveFeedback={handleLeaveFeedback}
          />
        </Section>
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback"></Notification>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
     </div> 
  
  );
};