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
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #2a2a2a;
  color: white;
  margin-top: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #2a2a2a;
  color: white;
  margin-top: 8px;
  resize: vertical;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 8px 0;
  cursor: pointer;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
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