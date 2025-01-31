import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

type FormSection = 'profile' | 'organization' | 'technical' | 'suggestions';

type FormData = {
  profile: {
    nameAndSurname: string;
    sector: string;
    role: string;
    companySize: string;
    teamLeadership: string;
    teamCount: string;
    biggestSlowdown: string;
  };
  organization: {
    technicalObstacles: string;
    organizationalObstacles: string;
    managementPractices: string[];
    desiredSkills: string[];
    mostImportantSkill: string;
    reflectionFrequency: string;
    organizationalIssues: string[];
    topThreeIssues: string[];
    impactLevel: string;
    impactComment: string;
    objectives: {
      costReduction: number;
      stakeholderSatisfaction: number;
      employeeSatisfaction: number;
      processOptimization: number;
      companyGrowth: number;
      other: string;
    };
  };
  technical: {
    recurringTasks: string;
    tools: string[];
    technicalObjectives: string[];
    mainTechnicalObjective: string;
    systemInteroperability: string;
    interoperabilityComment: string;
    recurringErrors: string;
  };
  suggestions: {
    triedSolutions: string;
    whatWasTried: string;
    improvements: string;
  };
};

const QuestionnaireForm = () => {
  const [currentSection, setCurrentSection] = useState<FormSection>('profile');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    profile: {
      nameAndSurname: '',
      sector: '',
      role: '',
      companySize: '',
      teamLeadership: '',
      teamCount: '',
      biggestSlowdown: '',
    },
    organization: {
      technicalObstacles: '',
      organizationalObstacles: '',
      managementPractices: [],
      desiredSkills: [],
      mostImportantSkill: '',
      reflectionFrequency: '',
      organizationalIssues: [],
      topThreeIssues: [],
      impactLevel: '',
      impactComment: '',
      objectives: {
        costReduction: 0,
        stakeholderSatisfaction: 0,
        employeeSatisfaction: 0,
        processOptimization: 0,
        companyGrowth: 0,
        other: '',
      },
    },
    technical: {
      recurringTasks: '',
      tools: [],
      technicalObjectives: [],
      mainTechnicalObjective: '',
      systemInteroperability: '',
      interoperabilityComment: '',
      recurringErrors: '',
    },
    suggestions: {
      triedSolutions: '',
      whatWasTried: '',
      improvements: '',
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

  const handleCheckboxChange = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].includes(value) ? prev[section][field].filter(item => item !== value) : [...prev[section][field], value],
      },
    }));
  };

  const questions = [
    // Profile Section
    {
      id: 'nameAndSurname',
      section: 'profile',
      question: "Nom & prénom (facultatif)",
      component: (
        <Input
          type="text"
          value={formData.profile.nameAndSurname}
          onChange={(e) => handleInputChange('profile', 'nameAndSurname', e.target.value)}
          placeholder="Votre nom et prénom"
        />
      )
    },
    {
      id: 'sector',
      section: 'profile',
      question: "Dans quel secteur évolue votre entreprise ?",
      component: (
        <Select
          value={formData.profile.sector}
          onChange={(e) => handleInputChange('profile', 'sector', e.target.value)}
        >
          <option value="">Sélectionnez un secteur</option>
          <option value="Industrie">Industrie</option>
          <option value="Services">Services</option>
          <option value="Tech">Tech</option>
          <option value="Collectivité">Collectivité</option>
          <option value="Autre">Autre</option>
        </Select>
      )
    },
    {
      id: 'role',
      section: 'profile',
      question: "Quelle est votre fonction dans l'entreprise ?",
      component: (
        <Input
          type="text"
          value={formData.profile.role}
          onChange={(e) => handleInputChange('profile', 'role', e.target.value)}
          placeholder="Votre fonction"
        />
      )
    },
    {
      id: 'companySize',
      section: 'profile',
      question: "Quelle est la taille de votre entreprise ?",
      component: (
        <Select
          value={formData.profile.companySize}
          onChange={(e) => handleInputChange('profile', 'companySize', e.target.value)}
        >
          <option value="">Sélectionnez une taille</option>
          <option value="<50">Moins de 50 employés</option>
          <option value="50-200">Entre 50 et 200 employés</option>
          <option value=">200">Plus de 200 employés</option>
        </Select>
      )
    },
    {
      id: 'teamLeadership',
      section: 'profile',
      question: "Êtes-vous en charge d'une ou plusieurs équipes ?",
      component: (
        <div>
          <Select
            value={formData.profile.teamLeadership}
            onChange={(e) => handleInputChange('profile', 'teamLeadership', e.target.value)}
          >
            <option value="">Sélectionnez une réponse</option>
            <option value="one">Oui, une</option>
            <option value="multiple">Oui, plusieurs</option>
            <option value="no">Non</option>
          </Select>
          {formData.profile.teamLeadership === 'multiple' && (
            <Input
              type="text"
              value={formData.profile.teamCount}
              onChange={(e) => handleInputChange('profile', 'teamCount', e.target.value)}
              placeholder="Combien d'équipes ?"
            />
          )}
        </div>
      )
    },
    // Organization Section
    {
      id: 'technicalObstacles',
      section: 'organization',
      question: "Sur le plan technique, quels sont vos principaux freins à l'efficacité ?",
      component: (
        <TextArea
          value={formData.organization.technicalObstacles}
          onChange={(e) => handleInputChange('organization', 'technicalObstacles', e.target.value)}
          placeholder="Décrivez vos freins techniques"
        />
      )
    },
    {
      id: 'organizationalObstacles',
      section: 'organization',
      question: "Sur le plan organisationnel, quels sont vos principaux freins à l'efficacité ?",
      component: (
        <TextArea
          value={formData.organization.organizationalObstacles}
          onChange={(e) => handleInputChange('organization', 'organizationalObstacles', e.target.value)}
          placeholder="Décrivez vos freins organisationnels"
        />
      )
    },
    {
      id: 'managementPractices',
      section: 'organization',
      question: "Quelles sont vos pratiques de gestion actuelles ?",
      component: (
        <div>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.organization.managementPractices.includes('Agile')}
              onChange={() => handleCheckboxChange('organization', 'managementPractices', 'Agile')}
            />
            Agile
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.organization.managementPractices.includes('Scrum')}
              onChange={() => handleCheckboxChange('organization', 'managementPractices', 'Scrum')}
            />
            Scrum
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.organization.managementPractices.includes('Kanban')}
              onChange={() => handleCheckboxChange('organization', 'managementPractices', 'Kanban')}
            />
            Kanban
          </CheckboxLabel>
        </div>
      )
    },
    {
      id: 'desiredSkills',
      section: 'organization',
      question: "Si vous deviez améliorer des compétences ou pratiques managériales dans votre organisation, lesquelles choisiriez-vous ?",
      component: (
        <div>
          {[
            'Renforcer l\'écoute et la communication',
            'Réduire les silos entre les personnes ou équipes',
            'Améliorer la délégation et l\'autonomie des équipes',
            'Savoir prioriser les tâches',
            'Gérer les conflits efficacement',
            'Renforcer la cohésion d\'équipe',
            'Favoriser l\'innovation'
          ].map(skill => (
            <CheckboxLabel key={skill}>
              <Checkbox
                type="checkbox"
                checked={formData.organization.desiredSkills.includes(skill)}
                onChange={() => handleCheckboxChange('organization', 'desiredSkills', skill)}
              />
              {skill}
            </CheckboxLabel>
          ))}
        </div>
      )
    },
    {
      id: 'mostImportantSkill',
      section: 'organization',
      question: "Mentionnez la plus importante selon vous",
      component: (
        <Select
          value={formData.organization.mostImportantSkill}
          onChange={(e) => handleInputChange('organization', 'mostImportantSkill', e.target.value)}
        >
          <option value="">Sélectionnez la compétence la plus importante</option>
          {formData.organization.desiredSkills.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </Select>
      )
    },
    {
      id: 'reflectionFrequency',
      section: 'organization',
      question: "À quelle fréquence prenez-vous le temps de réfléchir avec vos équipes sur la vision, les objectifs ou les méthodes de travail ?",
      component: (
        <RadioGroup>
          {[
            ['regular', 'Régulièrement (au moins une fois par mois)'],
            ['occasional', 'Occasionnellement (1-2 fois par trimestre)'],
            ['rare', 'Rarement (au-delà de 6 mois)']
          ].map(([value, label]) => (
            <CheckboxLabel key={value}>
              <input
                type="radio"
                name="reflectionFrequency"
                value={value}
                checked={formData.organization.reflectionFrequency === value}
                onChange={(e) => handleInputChange('organization', 'reflectionFrequency', e.target.value)}
              />
              {label}
            </CheckboxLabel>
          ))}
        </RadioGroup>
      )
    },
    {
      id: 'organizationalIssues',
      section: 'organization',
      question: "Quels sont les dysfonctionnements organisationnels que vous observez le plus dans votre entreprise ?",
      component: (
        <div>
          {[
            'Projets en retard',
            'Taux de turnover élevé',
            'Trop de réunions improductives',
            'Conflits ou tensions fréquentes',
            'Manque d\'innovation dans les pratiques',
            'Manque de communication entre les équipes'
          ].map(issue => (
            <CheckboxLabel key={issue}>
              <Checkbox
                type="checkbox"
                checked={formData.organization.organizationalIssues.includes(issue)}
                onChange={() => handleCheckboxChange('organization', 'organizationalIssues', issue)}
              />
              {issue}
            </CheckboxLabel>
          ))}
        </div>
      )
    },
    {
      id: 'topThreeIssues',
      section: 'organization',
      question: "Classez les 3 plus importants",
      component: (
        <div>
          {[1, 2, 3].map(priority => (
            <div key={priority}>
              <label>Priorité {priority}</label>
              <Select
                value={formData.organization.topThreeIssues[priority - 1] || ''}
                onChange={(e) => {
                  const newTopThree = [...formData.organization.topThreeIssues];
                  newTopThree[priority - 1] = e.target.value;
                  handleInputChange('organization', 'topThreeIssues', newTopThree);
                }}
              >
                <option value="">Sélectionnez un problème</option>
                {formData.organization.organizationalIssues.map(issue => (
                  <option key={issue} value={issue}>{issue}</option>
                ))}
              </Select>
            </div>
          ))}
        </div>
      )
    },
    // Technical Section
    {
      id: 'recurringTasks',
      section: 'technical',
      question: "Quelles sont les tâches récurrentes qui vous prennent le plus de temps ou qui vous causent le plus de frustration ?",
      component: (
        <TextArea
          value={formData.technical.recurringTasks}
          onChange={(e) => handleInputChange('technical', 'recurringTasks', e.target.value)}
          placeholder="Décrivez vos tâches récurrentes..."
        />
      )
    },
    {
      id: 'tools',
      section: 'technical',
      question: "Quels outils ou logiciels utilisez-vous actuellement ?",
      component: (
        <div>
          {[
            'Outils bureautiques (Excel, Word, etc.)',
            'Outils collaboratifs (Teams, Slack, etc.)',
            'Gestion de projet (Jira, Trello, etc.)',
            'CRM (Salesforce, HubSpot, etc.)',
            'Gestion comptable (Sage, QuickBooks, etc.)',
            'Automatisation/IA (Zapier, ChatGPT, etc.)'
          ].map(tool => (
            <CheckboxLabel key={tool}>
              <Checkbox
                type="checkbox"
                checked={formData.technical.tools.includes(tool)}
                onChange={() => handleCheckboxChange('technical', 'tools', tool)}
              />
              {tool}
            </CheckboxLabel>
          ))}
        </div>
      )
    },
    // Suggestions Section
    {
      id: 'triedSolutions',
      section: 'suggestions',
      question: "Avez-vous essayé des choses qui n'ont pas fonctionné ?",
      component: (
        <RadioGroup>
          {[
            ['yes', 'Oui'],
            ['no', 'Non']
          ].map(([value, label]) => (
            <CheckboxLabel key={value}>
              <input
                type="radio"
                name="triedSolutions"
                value={value}
                checked={formData.suggestions.triedSolutions === value}
                onChange={(e) => handleInputChange('suggestions', 'triedSolutions', e.target.value)}
              />
              {label}
            </CheckboxLabel>
          ))}
        </RadioGroup>
      )
    },
    {
      id: 'whatWasTried',
      section: 'suggestions',
      question: "Qu'avez-vous tenté ?",
      component: (
        <TextArea
          value={formData.suggestions.whatWasTried}
          onChange={(e) => handleInputChange('suggestions', 'whatWasTried', e.target.value)}
          placeholder="Décrivez ce que vous avez essayé..."
          disabled={formData.suggestions.triedSolutions !== 'yes'}
        />
      )
    },
    {
      id: 'improvements',
      section: 'suggestions',
      question: "Pour finir, si vous aviez un conseil ou une idée pour améliorer votre organisation sur le plan technique ou organisationnel, quel seraient-ils ?",
      component: (
        <TextArea
          value={formData.suggestions.improvements}
          onChange={(e) => handleInputChange('suggestions', 'improvements', e.target.value)}
          placeholder="Partagez vos suggestions..."
        />
      )
    }
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
          transition={{ duration: 0.5 }}
          key={currentQuestionIndex}
        >
          <QuestionNumber>
            Question {currentQuestionIndex + 1} sur {questions.length}
          </QuestionNumber>
          
          <Question>{questions[currentQuestionIndex].question}</Question>
          
          <AnswerContainer>
            {questions[currentQuestionIndex].component}
          </AnswerContainer>

          <NavigationContainer>
            <NavigationButton
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Précédent
            </NavigationButton>
            <NavigationButton
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Suivant
            </NavigationButton>
          </NavigationContainer>
        </QuestionContainer>
      </ContentContainer>

      <ProgressIndicator>
        {questions.map((_, index) => (
          <ProgressDot key={index} active={index === currentQuestionIndex} />
        ))}
      </ProgressIndicator>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
  }
`;

const ProgressBar = styled.div<{ width: number }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: ${props => props.width}%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transition: width 0.3s ease;
  z-index: 10;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 4rem auto;
  padding: 2rem;
`;

const QuestionContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const QuestionNumber = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const Question = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1.4;
  background: linear-gradient(90deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AnswerContainer = styled.div`
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em;

  &:focus {
    outline: none;
    border-color: #3498db;
    background-color: rgba(255, 255, 255, 0.1);
  }

  option {
    background: #2d2d2d;
    color: white;
    padding: 1rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }
`;

const Checkbox = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  margin-right: 1rem;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:checked {
    background: #3498db;
    border-color: #3498db;
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    color: white;
    font-size: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  gap: 1rem;
`;

const NavigationButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.disabled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(52, 152, 219, 0.8)'};
  color: white;

  &:hover:not(:disabled) {
    background: #3498db;
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ProgressIndicator = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
`;

const ProgressDot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#3498db' : 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.3s ease;
`;

export default QuestionnaireForm;