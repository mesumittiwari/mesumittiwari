const typingContainer = document.getElementById('typing-container');

// The sequence of commands and their corresponding outputs
const sequence = [
    {
        command: "whoami",
        output: "<span class='highlight'>Sumit Tiwari</span>"
    },
    {
        command: "role",
        output: "Software Engineer"
    },
    {
        command: "focus",
        output: "Turning complex problems into elegant solutions.\nSpecializing in C++ • DSA • AIML • WebDev"
    },
    {
        command: "skills",
        output: 
`C++            ████████████████████
DSA            █████████████████████
SQL            █████████████████
AIML           ███████████████
WebDev         ██████████████████
System Design  ████████████`
    },
    {
        command: "projects",
        output: 
`> AI Meeting Summarizer
> Craft.Resume
> Cold Email Generator`
    }
];

// Configuration for typing speed (in milliseconds)
const typingSpeed = 50; 
const pauseBeforeOutput = 300;
const pauseBeforeNextCommand = 800;

// Helper function to create a delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTerminal() {
    for (let i = 0; i < sequence.length; i++) {
        const step = sequence[i];
        
        // 1. Create the prompt line
        const promptLine = document.createElement('div');
        promptLine.className = 'prompt-line';
        
        const promptText = document.createElement('span');
        promptText.className = 'prompt';
        promptText.innerHTML = '~/sumit $ ';
        
        const commandText = document.createElement('span');
        commandText.className = 'command';
        
        promptLine.appendChild(promptText);
        promptLine.appendChild(commandText);
        typingContainer.appendChild(promptLine);

        // 2. Type out the command character by character
        for (let char of step.command) {
            commandText.innerHTML += char;
            await sleep(typingSpeed);
        }

        // 3. Pause briefly after typing the command
        await sleep(pauseBeforeOutput);

        // 4. Print the output instantly (like a real terminal)
        const outputLine = document.createElement('div');
        outputLine.className = 'output';
        outputLine.innerHTML = step.output;
        typingContainer.appendChild(outputLine);

        // Scroll to the bottom as new content is added
        document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;

        // 5. Pause before starting the next command
        await sleep(pauseBeforeNextCommand);
    }
    
    // Add the final empty prompt line for the blinking cursor to sit next to
    const finalPrompt = document.createElement('div');
    finalPrompt.className = 'prompt-line';
    finalPrompt.innerHTML = '<span class="prompt">~/sumit $ </span>';
    typingContainer.appendChild(finalPrompt);
    
    // Move the cursor into the final prompt
    const cursor = document.getElementById('cursor');
    finalPrompt.appendChild(cursor);
    
    document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
}

// Start the animation when the window loads
window.onload = () => {
    // Small initial delay before typing starts
    setTimeout(runTerminal, 1000);
};
