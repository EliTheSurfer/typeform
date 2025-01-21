import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

type FormSection = 'profile' | 'organization' | 'technical' | 'suggestions';

type FormData = {
  profile: {
    companyName: string;
    industry: string;
    employeeCount: string;
    yearFounded: string;
  };
  // Other sections will be added later
};

const QuestionnaireForm = () => {
  const [currentSection, setCurrentSection] = useState<FormSection>('profile');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    profile: {
      companyName: '',
      industry: '',
      employeeCount: '',
      yearFounded: '',
    },
  });

  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const questions = [
    {
      id: 'companyName',
      question: "Quel est le nom de votre entreprise ?",
      component: (
        <Input
          id="companyName"
          type="text"
          value={formData.profile.companyName}
          onChange={(e) => handleInputChange('profile', 'companyName', e.target.value)}
          placeholder="Entrez le nom de votre entreprise"
        />
      )
    },
    {
      id: 'industry',
      question: "Dans quel secteur d'activité opérez-vous ?",
      component: (
        <Input
          id="industry"
          type="text"
          value={formData.profile.industry}
          onChange={(e) => handleInputChange('profile', 'industry', e.target.value)}
          placeholder="Ex: Technologies, Santé, Commerce..."
        />
      )
    },
    // ... other questions
  ];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <PageContainer>
      <ProgressBar width={(currentQuestionIndex / (questions.length - 1)) * 100} />
      
      <ContentContainer>
        <QuestionContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          key={currentQuestionIndex}
        >
          <QuestionNumber>
            {currentQuestionIndex + 1}/{questions.length}
          </QuestionNumber>
          
          <Question>{questions[currentQuestionIndex].question}</Question>
          
          <AnswerContainer>
            {questions[currentQuestionIndex].component}
          </AnswerContainer>
        </QuestionContainer>

        <NavigationContainer>
          <NavigationButton 
            variant="secondary" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            ←
          </NavigationButton>
          <NavigationButton 
            variant="primary" 
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Entrée ↵
          </NavigationButton>
        </NavigationContainer>
      </ContentContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
`;

const ProgressBar = styled.div<{ width: number }>`
  height: 3px;
  background: linear-gradient(90deg, #3f51b5 ${props => props.width}%, rgba(255,255,255,0.1) 0%);
  transition: background 0.3s ease;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const QuestionContainer = styled(motion.div)`
  width: 100%;
  text-align: center;
`;

const QuestionNumber = styled.div`
  font-size: 0.9rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 2rem;
`;

const Question = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  line-height: 1.3;
`;

const AnswerContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255,255,255,0.1);
  color: white;
  font-size: 1.5rem;
  padding: 1rem 0;
  text-align: center;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-bottom-color: #3f51b5;
  }
  
  &::placeholder {
    color: rgba(255,255,255,0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255,255,255,0.1);
  color: white;
  font-size: 1.5rem;
  padding: 1rem 0;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  option {
    background: #1a1a1a;
    color: white;
  }
  
  &:focus {
    outline: none;
    border-bottom-color: #3f51b5;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
`;

const NavigationButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' ? '#3f51b5' : 'transparent'};
  color: white;
  border: ${props => props.variant === 'secondary' ? '1px solid rgba(255,255,255,0.2)' : 'none'};
  padding: ${props => props.variant === 'primary' ? '1rem 2rem' : '1rem'};
  border-radius: 50px;
  font-size: ${props => props.variant === 'primary' ? '1rem' : '1.5rem'};
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#4a5cc9' : 'rgba(255,255,255,0.1)'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default QuestionnaireForm; 