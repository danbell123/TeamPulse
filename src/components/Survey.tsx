'use client';

import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/survey-core.min.css';
import { ContrastDarkPanelless } from 'survey-core/themes';

const surveyJson = {
  elements: [
    {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    },
    {
      name: "Email",
      title: "Enter your email:",
      type: "text"
    },
    {
      name: "Department",
      title: "Enter your department:",
      type: "dropdown",
      choices: ["accounting", "marketing", "sales", "it", "management"]
    },
    {
      name: "Satisfaction", // fixed typo: "Satifaction" → "Satisfaction"
      title: "How satisfied are you with the current work environment?",
      type: "rating"
    },
    {
      name: "Workload",
      title: "How do you feel about your current workload?",
      type: "rating"
    },
    {
      name: "ManagerRating",
      title: "How would you rate your manager?",
      type: "rating"
    },
    {
      name: "Suggestions",
      title: "Do you have any suggestions for improvement?",
      type: "text"
    }
  ]
};

export default function SurveyComponent() {
  const survey = new Model(surveyJson);
  survey.applyTheme(ContrastDarkPanelless);

  survey.onComplete.add(async (sender) => {
    const result = sender.data;
  
    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  

  return(
    <div className='h-full'>
        <Survey model={survey}/>
    </div>
  );
}
