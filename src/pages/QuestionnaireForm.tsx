import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import profileIllustration from '../assets/profile.svg';
import organizationIllustration from '../assets/organization.svg';
import technicalIllustration from '../assets/technical.svg';
import suggestionsIllustration from '../assets/suggestions.svg';

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

// Move all styled components here, before the QuestionnaireForm component
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #FFF0F0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; // Smooth scrolling on iOS
`;

const ProgressBar = styled.div<{ width: number }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: ${props => props.width}%;
  background: linear-gradient(90deg, #E88B8B, #D35F5F);
  transition: width 0.3s ease;
  z-index: 10;
`;

const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0;
    align-items: flex-start;
  }
`;

const QuestionContainer = styled(motion.div)`
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  margin: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  background: white;
  position: relative;
  flex: 1;

  @media (max-width: 768px) {
    padding: 1.5rem;
    padding-top: 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, #FFE5E5 0%, white 100%);
    z-index: 0;
    border-radius: 32px 32px 0 0;

    @media (max-width: 768px) {
      border-radius: 0;
      height: 150px;
    }
  }
`;

const Question = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #4A2B29;
  margin: 1.5rem 0;
  line-height: 1.3;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
`;

const AnswerContainer = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 1.5rem;
  flex: 1;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(232, 139, 139, 0.2);
  border-radius: 16px;
  color: #4A2B29;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 12px;
  }

  &:focus {
    outline: none;
    border-color: #E88B8B;
    background: white;
    box-shadow: 0 0 0 4px rgba(232, 139, 139, 0.1);
  }

  &::placeholder {
    color: rgba(74, 43, 41, 0.4);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(232, 139, 139, 0.2);
  border-radius: 16px;
  color: #4A2B29;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #E88B8B;
    background: white;
    box-shadow: 0 0 0 4px rgba(232, 139, 139, 0.1);
  }

  option {
    background: white;
    color: #4A2B29;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(232, 139, 139, 0.2);
  border-radius: 16px;
  color: #4A2B29;
  font-size: 1.1rem;
  resize: vertical;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #E88B8B;
    background: white;
    box-shadow: 0 0 0 4px rgba(232, 139, 139, 0.1);
  }

  &::placeholder {
    color: rgba(74, 43, 41, 0.4);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin: 0.75rem 0;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(232, 139, 139, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.25rem;
  color: #4A2B29;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  &:hover {
    background: rgba(232, 139, 139, 0.1);
    transform: translateY(-2px);
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

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  background: ${props => props.variant === 'primary' ? 
    'linear-gradient(135deg, #E88B8B, #D35F5F)' : 
    'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.variant === 'primary' ? 'white' : '#4A2B29'};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
    flex: 1;
    margin: 0 0.5rem;
    white-space: nowrap;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuestionNumber = styled.div`
  font-size: 0.9rem;
  color: #E88B8B;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;
  z-index: 1;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2.5rem;
  background: white;
  border-top: 1px solid rgba(232, 139, 139, 0.1);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    position: sticky;
    bottom: 0;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
  }
`;

// Add a global style to remove default margins and padding
const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const PriorityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PriorityItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PriorityLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #E88B8B;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #E88B8B;
    border-radius: 50%;
  }
`;

const PrioritySelect = styled(Select)`
  background: white;
  border: 2px solid rgba(232, 139, 139, 0.2);
  transition: all 0.3s ease;

  &:focus {
    border-color: #E88B8B;
    box-shadow: 0 0 0 4px rgba(232, 139, 139, 0.1);
  }
`;

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
    <GlobalStyle>
      <PageContainer>
        <ProgressBar width={(currentQuestionIndex / (questions.length - 1)) * 100} />
        <ContentContainer>
          <AnimatePresence mode="wait">
            <QuestionContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100 
              }}
              key={currentQuestionIndex}
            >
              <QuestionContent>
                <QuestionNumber>
                  Question {currentQuestionIndex + 1} sur {questions.length}
                </QuestionNumber>
                
                <Question>{questions[currentQuestionIndex].question}</Question>
                
                <AnswerContainer>
                  {questions[currentQuestionIndex].component}
                </AnswerContainer>
              </QuestionContent>

              <NavigationContainer>
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  variant="secondary"
                >
                  ← Précédent
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1}
                  variant="primary"
                >
                  Suivant →
                </Button>
              </NavigationContainer>
            </QuestionContainer>
          </AnimatePresence>
        </ContentContainer>
      </PageContainer>
    </GlobalStyle>
  );
};

const getSectionIllustration = (section: FormSection) => {
  switch (section) {
    case 'profile':
      return profileIllustration;
    case 'organization':
      return organizationIllustration;
    case 'technical':
      return technicalIllustration;
    case 'suggestions':
      return suggestionsIllustration;
    default:
      return profileIllustration;
  }
};

export default QuestionnaireForm;