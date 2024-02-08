const app = {
  currentStep: 0,
  stepHistory: [], // Keep track of step history for the back functionality
  steps: [{
      question: "Can I Park Here?", // Step 0
      answers: [{
          text: "Private Property",
          nextStep: 1
        },
        {
          text: "City Street",
          nextStep: 2
        }
      ]
    },

    // Step 1
    {
      question: "Only if you know the owners",
      answers: [

      ]
    },

    // Step 2
    {
      question: "Any Signs on the Block?",
      answers: [{
          text: "Yes",
          nextStep: 3
        },
        {
          text: "No",
          nextStep: 4
        }
      ]
    },

     // Step 3
    {
      question: "Sign Color",
      answers: [{
          text: "Red",
          nextStep: 5
        },
        {
          text: "Blue",
          nextStep: 6
        },
        {
          text: "Green_In Progress",
          
        },
        {
          text: "Yellow_In Progress",
          
        },
        {
          text: "White_In Progress",
          
        },
      ]
    },

    // Step 4
    {
      question: "No Signs_**In Progress**",
      answers: [

      ]
    },

    // Step 5
    {
      question: "Red Signs mean NO PARKING.",
      answers: [

      ]
    },

    // Step 6
    {
      question: "Does it have the Disabled Parking Symbol?",
      answers: [{
          text: "Yes",
          nextStep: 7
        },
        {
          text: "No",
          nextStep: 8
        }
      ]
    },

    // Step 7
    {
      question: "Only Vehicles with valid Disabled Plates, Tabs or Placards can park there.",
      answers: [{
          text: "I DO have a Disabled Placard, Plate or Tab",
          nextStep: 9
        },
        {
          text: "I don't have any of those.",
          nextStep: 10
        },
        {
          text: "My Placard is expired",
          nextStep: 10
        }
      ]
    },

    // Step 8
    {
      question: "You must Pay to Park.",
      answers: [{
          text: "How do I pay?",
          nextStep: 11
        },
        {
          text: "Am I exempt from Paying?",
          nextStep: 12
        }
      ]
    },

    // Step 9
    {
      question: "You can legally park in this spot.",
      answers: [

      ]
    },

    // Step 10
    {
      question: "You're vehicle can be Towed if you park there.",
      answers: []
    },

    // Step 11
    {
      question: [
        "You can pay by..."
      ],
      answers: [{
          text: "Pay with Coins or Card at the Pay Station"
        },
        {
          text: "Pay with the Pay by Phone App"
        },
        {
          text: "Pay by Calling the number on the sign"
        }
      ]

    },
    
    // Step 12
    {
      question: [
        "Do you have..."
      ],
      answers: [{
          text: "Valid Disabled Placard, Tabs, or Plates.",
          nextStep: 13
        },
        {
          text: "Exempt Plates [XMT].",
          nextStep: 13
        },
        {
          text: "A valid SDOT service permit displayed.",
          nextStep: 13
        },
        {
          text: "A GIG car carshare vehicle.",
          nextStep: 13
        },
        {
          text: "None of these apply to me",
          nextStep: 8
        }
      ]

    },
    
    // Step 13
    {
      question: "You can park without paying.",
      answers: [
      ]
    },


    // Add more steps according to your logic map
  ],

  displayStep: function(stepIndex) {
    const step = this.steps[stepIndex];
    document.getElementById('question').textContent = step.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    step.answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.textContent = answer.text;
      btn.classList.add('answer-btn');
      btn.onclick = () => this.displayStep(answer.nextStep);
      answersDiv.appendChild(btn);
    });

    // Show the restart button if we're past the first step
    document.getElementById('restart-btn').style.display = stepIndex > 0 ? 'block' : 'none';

    // Handle back button visibility and functionality
    const backButton = document.getElementById('back-btn');
    if (this.stepHistory.length > 0) {
      backButton.style.display = 'block';
      backButton.onclick = () => {
        this.stepHistory.pop(); // Remove the current step
        const previousStep = this.stepHistory.pop(); // Get the previous step
        if (previousStep !== undefined) {
          this.displayStep(previousStep);
        }
      };
    } else {
      backButton.style.display = 'none';
    }

    // Update step history
    this.stepHistory.push(stepIndex);
  },

  start: function() {
    this.displayStep(this.currentStep);
  }
};

// Restart functionality
document.getElementById('restart-btn').addEventListener('click', () => {
  app.start(); // Reset to the first step
});

document.addEventListener('DOMContentLoaded', () => app.start());
