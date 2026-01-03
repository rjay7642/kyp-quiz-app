const clsQuestions = [
  {
    question: "Which is the correct sentence?",
    options: ["Rohan never fails", "Rohan fails never"],
    correctIndex: 0
  },
  {
    question: "I never ______ coffee.",
    options: ["Deinks", "Drink", "Drinking"],
    correctIndex: 1
  },
  {
    question: "Which is the correct sentence?",
    options: [
      "I always eat vegetable and fruits.",
      "I eat vegetables and always fruits."
    ],
    correctIndex: 0
  },
  {
    question: "___________ is my mobile and that is yours on the shelf over there.",
    options: ["This", "These"],
    correctIndex: 0
  },
  {
    question: "They _________ finished the job.",
    options: ["Has", "Have"],
    correctIndex: 1
  },
  {
    question: "__________ people come from that hotel.",
    options: ["That", "Those"],
    correctIndex: 1
  },
  {
    question: "Which sentence shows frequency?",
    options: [
      "Our teacher is not late for her class.",
      "Our teacher is late for her class.",
      "Our teacher is never late for her class.",
      "Our teacher is coming late for her class."
    ],
    correctIndex: 2
  },
  {
    question: "But I want to be a professional dancer and make a big name.",
    options: [
      "पर मुझे व्यावसायिक नर्तकी / नर्तक बनना था और बड़ा नाम कमाना था।",
      "पर मुझे व्यावसायिक नर्तकी / नर्तक नहीं बनना है और ना ही बड़ा नाम कमाना है।",
      "पर मुझे व्यावसायिक नर्तकी / नर्तक कब बनना है और कहाँ बड़ा नाम कमाना है।",
      "पर मुझे व्यावसायिक नर्तकी / नर्तक बनना है और बड़ा नाम कमाना है।"
    ],
    correctIndex: 3
  },
  {
    question: "__________ people come from that hotel.",
    options: ["That", "Those"],
    correctIndex: 1
  },
  {
    question: "Good students always _____ their homework.",
    options: ["Do", "Does", "Doing"],
    correctIndex: 0
  },
  {
    question: "Mr. Saha is the _______ man today because he won the lottery.",
    options: ["More happy", "Happiest", "Happy"],
    correctIndex: 1
  },
  {
    question: "What __________ they doing when you came in?",
    options: ["Was", "Are", "Were"],
    correctIndex: 2
  },
  {
    question: "You are such a good friend Reena, you always say the right thing.",
    options: [
      "You are such a good friend Reena, you always say the right thing.",
      "You were such a good friend Reena, you always said the right thing.",
      "You are such a good right friend Reena, you always say the thing.",
      "You are such a good friend Reena, you will be always saying the right thing."
    ],
    correctIndex: 0
  },
  {
    question: "Don’t ______ during the lesson.",
    options: ["Talk", "Talks", "Talking"],
    correctIndex: 0
  },
  {
    question: "Some books are called magazines and they are published at regular intervals of time.",
    options: [
      "कुछ पुस्तकों को आवधिक पत्र कहा जाता है और वे कभी-कभी प्रकाशित होते हैं।",
      "कुछ पुस्तकों को विज्ञान पत्र कहा जाता है और वे नियमित अवधि में प्रकाशित होते हैं।",
      "कुछ पुस्तकों को आवधिक पत्र कहा जाता है और वे नियमित अवधि में प्रकाशित नहीं होते हैं।",
      "कुछ पुस्तकों को पत्रिका कहा जाता है और वे नियमित अवधि में प्रकाशित होती हैं।"
    ],
    correctIndex: 3
  },
  {
    question: "Ann ______ to work for this company.",
    options: ["Would like", "Likes"],
    correctIndex: 0
  },
  {
    question: "Mr. Saha is the _______ man today because he won the lottery.",
    options: ["More happy", "Happiest", "Happy"],
    correctIndex: 1
  },
  {
    question: "He said he might ______ for Delhi on Saturday.",
    options: ["Left", "Leaves", "Leave"],
    correctIndex: 2
  },
  {
    question: "Mike ______ children very much.",
    options: ["Would like", "Likes"],
    correctIndex: 1
  },
  {
    question: "Tell me ______ you coming to the party.",
    options: ["Are", "Is", "Am"],
    correctIndex: 0
  },
  {
    question: "Anita _____ tennis very well.",
    options: ["Play", "Played", "Plays"],
    correctIndex: 2
  },
  {
    question: "___________ is my mobile and that is yours on the shelf over there.",
    options: ["This", "These"],
    correctIndex: 0
  },
  {
    question: "______ night the factory was closed so he came home.",
    options: ["That", "Those", "These"],
    correctIndex: 0
  },
  {
    question: "इसलिए हमें कल दोपहर के बाद कुछ बारिश दिखने की संभावना है।",
    options: [
      "Therefore it was unlikely that we will see some showers in the latter part of tomorrow.",
      "Therefore it is likely that they will see some showers in the latter part of tomorrow.",
      "Therefore it is likely that we will see some showers in the latter part of tomorrow.",
      "Therefore it is likely that we will see some latter showers in the part of tomorrow."
    ],
    correctIndex: 2
  },
  {
    question: "You shouldn’t ________ called him a fool.",
    options: ["Has", "Have", "Having"],
    correctIndex: 1
  },
  {
    question: "You are such a good friend Reena, you always say the right thing.",
    options: [
      "You are such a good friend Reena, you always say the right thing.",
      "You were such a good friend Reena, you always said the right thing.",
      "You are such a good right friend Reena, you always say the thing.",
      "You are such a good friend Reena, you will be always saying the right thing."
    ],
    correctIndex: 0
  },
  {
    question: "I _________ like to watch T.V there is a good film on.",
    options: ["Was", "Would", "Want"],
    correctIndex: 1
  },
  {
    question: "Where _____ they go yesterday?",
    options: ["Does", "Did", "Do"],
    correctIndex: 1
  },
  {
    question: "A sparrow lives in a nest.",
    options: [
      "A sparrow lives in a nest.",
      "A sparrow lived in a nest.",
      "Sparrows live in a nest.",
      "A sparrow living in a nest."
    ],
    correctIndex: 0
  },
  {
    question: "What __________ you do every Sunday?",
    options: ["Does", "Did", "Do"],
    correctIndex: 2
  },
  {
    question: "I _____ fruit juice very much.",
    options: ["Like", "Liked", "Liking"],
    correctIndex: 0
  },
  {
    question: "My mother ____ a new dress to go to grandma’s birthday.",
    options: ["Likes", "Would like"],
    correctIndex: 1
  },
  {
    question: "Mohan is not such a _______ student.",
    options: ["Better", "Bad", "More bad"],
    correctIndex: 1
  },
  {
    question: "My friend Amita ____________ sports.",
    options: ["loves", "loves", "Love"],
    correctIndex: 0
  },
  {
    question: "Don’t ______ football in the yard.",
    options: ["Play", "Plays", "Played"],
    correctIndex: 0
  },
  {
    question: "Our state's climate is changing so quickly and unpredictably.",
    options: [
      "Our unpredictable state has climate that is changing so quickly.",
      "Our state's climate was changing so quickly and unpredictably.",
      "Our state and it's changing climate is so quick and unpredictable.",
      "Our state's climate is changing so quickly and unpredictably."
    ],
    correctIndex: 3
  },
  {
    question: "He is _______ player in the team.",
    options: ["Best", "The best", "More Best"],
    correctIndex: 1
  },
  {
    question: "I know that if I have done it well, you will give me work again.",
    options: [
      "मुझे मालूम है कि अगर मैंने वह काम अच्छा किया है तो आप मुझे फिर से नहीं काम देंगे।",
      "मुझे मालूम है कि अगर मैंने वह काम अच्छा किया है तो आप मुझे फिर से काम देंगे।",
      "मुझे मालूम है कि अगर मैंने वह काम अच्छा नहीं किया है तो आप मुझे फिर से काम देंगे।",
      "मुझे मालूम है कि अगर मैंने वह काम नहीं किया तो आप मुझे फिर से काम नहीं देंगे।"
    ],
    correctIndex: 1
  },
  {
    question: "There was a rainbow seen in the spray near the falls.",
    options: [
      "झरने के पास के पानी में इंद्रधनुष दिखाई दे रहा है।",
      "झरने के पास के फव्वारे में इंद्रधनुष दिखाई दे रहे होंगे।",
      "झरने के पास के फव्वारे में धनुष दिखाई दे रहा था।",
      "झरने के पास के फव्वारे में इंद्रधनुष दिखाई दे रहा था।"
    ],
    correctIndex: 3
  },
  {
    question: "________ classroom was empty in summer vacation.",
    options: ["This", "These"],
    correctIndex: 0
  },
  {
    question: "They __________ a cat and a dog.",
    options: ["Has", "Have", "Having"],
    correctIndex: 1
  },
  {
    question: "What __________ she do in her free time?",
    options: ["Do", "Does", "Done"],
    correctIndex: 1
  },
  {
    question: "______ your teeth.",
    options: ["Brushing", "Brush", "Brushed"],
    correctIndex: 1
  },
  {
    question: "They are both nice girls but I think Suman is ____ of the two.",
    options: ["Nice", "Most nicer", "The nicer"],
    correctIndex: 2
  },
  {
    question: "My car is ______ expensive thing I have never bought.",
    options: ["More", "The most", "The more"],
    correctIndex: 1
  },
  {
    question: "You ____ dancing, don’t you?",
    options: ["Would like", "Like"],
    correctIndex: 1
  },
  {
    question: "A kettle is on the table.",
    options: [
      "A kettle is on the table.",
      "A kettle is in the table.",
      "A table is on the kettle.",
      "A kettle is of the table."
    ],
    correctIndex: 0
  },
  {
    question: "____ your homework.",
    options: ["Do", "Doing", "Does"],
    correctIndex: 0
  },
  {
    question: "My suitcase is ___________ than your suitcase.",
    options: ["Large", "Larger", "Largest"],
    correctIndex: 1
  },
  {
    question: "It ________ at 9:00 in the evening.",
    options: ["Closes", "Closing", "Close"],
    correctIndex: 0
  },
  {
    question: "Which sentence is correct?",
    options: [
      "She listens to classical rarely music",
      "She rarely listens to classical music"
    ],
    correctIndex: 1
  },
  {
    question: "She ___________ playing tennis.",
    options: ["Would like", "Likes"],
    correctIndex: 1
  },
  {
    question: "Which is the correct sentence?",
    options: [
      "We always watch television in the evening",
      "We watch television in always the evening"
    ],
    correctIndex: 0
  },
  {
    question: "The swimming pool ________ at 7:00 PM in the morning.",
    options: ["Opens", "Opening", "Open"],
    correctIndex: 0
  },
  {
    question: "She has never __________ something like that before.",
    options: ["Done", "Doing", "Did"],
    correctIndex: 0
  },
  {
    question: "How much __________ it?",
    options: ["Is", "Are", "Am"],
    correctIndex: 0
  },
  {
    question: "My students __________ a little English.",
    options: ["Spoken", "Speak", "Speaks"],
    correctIndex: 1
  },
  {
    question: "Don’t _______ the animals in the zoo.",
    options: ["Feed", "Feeding", "Fed"],
    correctIndex: 0
  },
  {
    question: "You __________ riding non-stop for hours so you must be very tired.",
    options: ["Have been", "Having been", "Has been"],
    correctIndex: 0
  },
  {
    question: "______ you like to go to the cinema?",
    options: ["Why", "Would", "Want", "Wants"],
    correctIndex: 1
  },
  {
    question: "I never knew that the loss of green cover is because of soil erosion.",
    options: [
      "मुझे यह बात पता ही नहीं थी कि मिट्टी के बह जाने से हरियाली का नाश हो सकता है।",
      "मुझे यह बात पता ही नहीं थी कि मिट्टी के बह जाने से हरियाली का नाश होने वाला था।",
      "मुझे यह बात पता ही नहीं थी कि मिट्टी के बह जाने से हरे पेड़-पौधों का नाश होता है।",
      "मुझे यह बात पता ही नहीं थी कि मिट्टी के बह जाने से हरे पेड़-पौधों का नाश होने वाला है।"
    ],
    correctIndex: 2
  },
  {
    question: "________ bottle over there is empty.",
    options: ["This", "That"],
    correctIndex: 1
  },
  {
    question: "They are not going to the _________ hotel.",
    options: ["Big", "Bigger", "More Biggest"],
    correctIndex: 1
  },
  {
    question: "Which is the correct sentence?",
    options: [
      "Nadini helps her daughter with never her homework.",
      "Nadini never helps her daughter with her homework."
    ],
    correctIndex: 1
  },
  {
    question: "She was _____ than I expected.",
    options: ["Friends", "Friendlier", "More friendlier"],
    correctIndex: 1
  },
  {
    question: "What will be the theme of your new story - tragedy, horror or fantasy?",
    options: [
      "What will have been the theme of your new story?",
      "What will be the theme of your new story?",
      "What was the theme of your new story?",
      "What will be the theme of your story?"
    ],
    correctIndex: 1
  },
  {
    question: "Don’t _______ in this lake.",
    options: ["Swimming", "Swim", "Swims"],
    correctIndex: 1
  },
  {
    question: "The students ______ standing up for the anthem.",
    options: ["Am", "Be", "Are"],
    correctIndex: 2
  },
  {
    question: "My parents _____ in a very small flat.",
    options: ["Lived", "Lives", "Live"],
    correctIndex: 2
  },
  {
    question: "I’m going to ______ for a new place to live next month.",
    options: ["Look", "Looking", "Looked", "Snowing"],
    correctIndex: 0
  },
  {
    question: "These colours are the ________ I have ever seen!",
    options: ["Not amazing", "Less amazing", "Most amazing"],
    correctIndex: 2
  },
  {
    question: "______ the answer quickly.",
    options: ["Writing", "Write", "Writes"],
    correctIndex: 1
  },
  {
    question: "They ____ help you.",
    options: ["Was", "Will", "Want"],
    correctIndex: 1
  },
  {
    question: "The Olympic games ____ place every four years.",
    options: ["Taking", "Takes", "Take"],
    correctIndex: 1
  },
  {
    question: "Somebody must ______ taken my cellphone.",
    options: ["Has", "Have", "Was"],
    correctIndex: 1
  },
  {
    question: "How often should you reschedule meetings?",
    options: [
      "Very often as you should respect only your time",
      "Rarely as you should respect other’s time too",
      "Never as you should stick to your schedule"
    ],
    correctIndex: 1
  }
];



