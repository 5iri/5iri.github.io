function setupTerminal(){
  const output = document.getElementById('output');
  if(!output) return;

  // List of files to show for 'ls' command
  const files = [
    { name: 'about' },
    { name: 'blog' },
    { name: 'email' },
    { name: 'github' },
    { name: 'idea_bank' },
    { name: 'linkedin' },
    { name: 'notes' },
    { name: 'other' },
    { name: 'projects' },
    { name: 'twitter' }
  ];

  // Map filenames to their actual HTML URLs
  const fileLinks = {
    'about': '/aboutme.html',
    'blog': '/blog.html',
    'email': '/email.html',
    'github': '/github.html',
    'idea_bank': '/idea-bank.html',
    'linkedin': '/linkedin.html',
    'notes': '/notes.html',
    'other': '/other.html',
    'projects': '/Projects.html',
    'twitter' : '/twitter.html'
  };

  function print(text){
    const div = document.createElement('div');
    div.textContent = text;
    output.appendChild(div);
  }

  function handle(cmd){
    if(cmd === 'ls'){
      print(files.map(f => f.name).join('  '));
    } else if(cmd === 'help'){
      print('Available commands: ls, help, clear, open <filename>');
    } else if(cmd === 'clear'){
      output.innerHTML = '';
      addPrompt(); // Immediately add prompt after clear
      return; // Prevent double prompt
    } else if(cmd.startsWith('open ')) {
      const filename = cmd.slice(5).trim();
      const file = files.find(f => f.name === filename);
      if(file) {
        const url = fileLinks[filename];
        if(url) {
          window.location.href = url;
          print(`Opening ${url}...`);
        } else {
          print(`No web page mapped for: ${filename}`);
        }
      } else {
        print(`File not found: ${filename}`);
      }
    } else if(cmd){
      print(`Command not found: ${cmd}`);
    }
    addPrompt(); // Add prompt after handling any command except clear
    output.scrollTop = output.scrollHeight;
  }

  function addPrompt() {
    // Remove any existing prompt
    const oldPrompt = document.getElementById('prompt');
    if (oldPrompt) oldPrompt.remove();
    // Create new prompt
    const prompt = document.createElement('div');
    prompt.id = 'prompt';
    prompt.className = 'prompt-line';
    prompt.innerHTML = `<span class="segment user">5iri</span><span class="segment path">~</span><span class="dollar">$</span> <input id="terminal-input" type="text" autocomplete="off" />`;
    output.appendChild(prompt);
    // Focus input
    const input = prompt.querySelector('input');
    input.focus();
    input.addEventListener('keydown', e => {
      if(e.key === 'Enter'){
        const cmd = input.value.trim();
        const promptLine = document.createElement('div');
        promptLine.className = 'prompt-line';
        promptLine.innerHTML = `<span class="segment user">5iri</span><span class="segment path">~</span><span class="dollar">$</span> ${cmd}`;
        output.insertBefore(promptLine, prompt);
        handle(cmd);
      }
    });
  }

  addPrompt();
}