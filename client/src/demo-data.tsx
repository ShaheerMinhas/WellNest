import cover1 from "./assets/cover-photos/cover1.jpg";

const user = {
    name: "John Doe",
    avatar: "https://avatar.iran.liara.run/public/49",
    cover: cover1
  };
  
  const tracker = {
    depression: 33,
    anxiety: 55,
  };
  

  const bdi_questions = [
    "How often do you feel sad or down in the dumps?",
    "Do you have a sense of hope for the future?",
    "How do you perceive your past achievements and failures?",
    "Are you able to find joy in activities you once enjoyed?",
    "How frequently do you experience feelings of guilt?",
    "Do you feel like you are being punished for something?",
    "How do you feel about yourself and your self-worth?",
    "Are you critical of yourself for your mistakes?",
    "Have you had thoughts about harming yourself?",
    "How often do you find yourself crying?",
    "Are you more easily irritated than you used to be?",
    "How has your interest in socializing with others changed?",
    "Do you find it difficult to make decisions?",
    "How do you feel about your physical appearance?",
    "Are you able to work as effectively as you did before?",
    "How has your sleep pattern changed recently?",
    "Do you feel more fatigued than usual?",
    "How has your appetite changed?",
    "Have you noticed any significant weight loss recently?",
    "Are you worried about your physical health?",
    "How has your interest in sexual activity changed?"
  ];

  const bai_questions = [
    "How often do you experience numbness or tingling?",
    "Do you frequently feel hot or overheated?",
    "How often do you feel wobbly in your legs?",
    "Are you able to relax easily?",
    "Do you often fear that the worst will happen?",
    "How frequently do you feel dizzy or lightheaded?",
    "Do you notice your heart pounding or racing often?",
    "How often do you feel unsteady?",
    "Do you frequently feel terrified or afraid?",
    "How often do you feel nervous?",
    "Have you experienced a feeling of choking recently?",
    "How often do your hands tremble?",
    "Do you feel shaky or unsteady often?",
    "How often do you fear losing control?",
    "Do you experience difficulty in breathing frequently?",
    "How often do you fear that you might die?",
    "Do you often feel scared?",
    "How frequently do you experience indigestion?",
    "Do you often feel faint or lightheaded?",
    "How often does your face feel flushed?",
    "Do you experience hot or cold sweats frequently?"
];
  

  export {user, tracker, bdi_questions, bai_questions}