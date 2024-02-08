const app = {
    currentStep: 0,
    steps: [
        { 
            question: "Can I Park Here?", // Step 0
            answers: [
                 {text: "Private Property", nextStep: 1 },
                 {text: "City Street", nextStep: 2 }
            ]
        },
        {
            question: "Only if you know the owners", // Step 1
            answers: [
            	
            ]
        },
        {
            question: "Any Signs on the Block?", // Step 2
            answers: [
                { text: "Yes", nextStep: 3 },
                { text: "No", nextStep: 4 }
            ]
        },
        {
            question: "Sign Color", // Step 3
            answers: [
                { text: "Red", nextStep: 5 },
                { text: "Blue", nextStep: 6 },
                { text: "Green", nextStep: 7 },
                { text: "Yellow", nextStep: 8 },
                { text: "White", nextStep: 9 },
            ]
        },
        {
            question: "No Signs_**In Progress**", // Step 4
            answers: [
                
            ]
        },
        {
            question: "Red Signs mean NO PARKING.", // Step 5
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
