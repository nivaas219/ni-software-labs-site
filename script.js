const tools = [
{id:'playground',name:'HTML / CSS / JS Playground',category:'Code',icon:'〈/〉',tone:'purple',desc:'Write code and preview your page live.',type:'playground'},
{id:'json',name:'JSON Formatter',category:'Data',icon:'{}',tone:'cyan',desc:'Format, validate, and minify JSON.',type:'json'},
{id:'text',name:'Text Toolkit',category:'Text',icon:'T',tone:'blue',desc:'Count words, characters, and lines.',type:'text'},
{id:'base64',name:'Base64 Encoder',category:'Security',icon:'64',tone:'purple',desc:'Encode or decode Base64 text.',type:'base64'},
{id:'url',name:'URL Encoder',category:'Code',icon:'↗',tone:'blue',desc:'Encode and decode URL components.',type:'url'},
{id:'password',name:'Password Generator',category:'Security',icon:'♙',tone:'cyan',desc:'Create strong random passwords locally.',type:'password'},
{id:'colors',name:'Color Studio',category:'Design',icon:'◉',tone:'pink',desc:'Explore colors and copy HEX values.',type:'colors'},
{id:'markdown',name:'Markdown Preview',category:'Text',icon:'▤',tone:'purple',desc:'Preview basic Markdown in the browser.',type:'markdown'},
{id:'uuid',name:'UUID Generator',category:'Code',icon:'⌗',tone:'blue',desc:'Generate random UUID identifiers.',type:'uuid'},
{id:'timestamp',name:'Timestamp Converter',category:'Data',icon:'◷',tone:'cyan',desc:'Convert Unix timestamps and dates.',type:'timestamp'},
{id:'regex',name:'Regex Tester',category:'Code',icon:'.*',tone:'purple',desc:'Test a regular expression against text.',type:'regex'},
{id:'gradient',name:'CSS Gradient Builder',category:'Design',icon:'◒',tone:'pink',desc:'Build a gradient and copy its CSS.',type:'gradient'},
{id:'lorem',name:'Lorem Ipsum',category:'Text',icon:'¶',tone:'blue',desc:'Generate placeholder copy instantly.',type:'lorem'},
{id:'case',name:'Case Converter',category:'Text',icon:'Aa',tone:'cyan',desc:'Switch text between common cases.',type:'case'},
{id:'escape',name:'HTML Entity Encoder',category:'Code',icon:'&lt;',tone:'purple',desc:'Escape or unescape HTML characters.',type:'escape'},
{id:'hash',name:'SHA-256 Hash',category:'Security',icon:'#',tone:'blue',desc:'Hash text with browser Web Crypto.',type:'hash'},
{id:'jwt',name:'JWT Decoder',category:'Security',icon:'◈',tone:'cyan',desc:'Inspect JWT header and payload locally.',type:'jwt'},
{id:'diff',name:'Text Diff Checker',category:'Text',icon:'±',tone:'pink',desc:'Compare two blocks of text line by line.',type:'diff'},
{id:'number',name:'Number Base Converter',category:'Data',icon:'01',tone:'blue',desc:'Convert decimal, binary, hex, and octal.',type:'number'},
{id:'image',name:'Image Compressor',category:'Design',icon:'▧',tone:'purple',desc:'Resize and export an image in your browser.',type:'image'},
{id:'vocab',name:'English Vocabulary Builder',category:'Text',icon:'Aa',tone:'cyan',desc:'Generate English words, meanings, and examples.',type:'vocab'},
{id:'summarizer',name:'Text Summarizer',category:'Text',icon:'≋',tone:'purple',desc:'Create a concise extractive summary locally.',type:'summarizer'},
{id:'quiz',name:'Study Questions Generator',category:'Text',icon:'?',tone:'blue',desc:'Turn notes into review questions.',type:'quiz'},
{id:'sql',name:'SQL Formatter',category:'Code',icon:'▤',tone:'pink',desc:'Format common SQL keywords and clauses.',type:'sql'},
{id:'cron',name:'Cron Helper',category:'Code',icon:'◷',tone:'cyan',desc:'Explain common cron schedule fields.',type:'cron'},
{id:'contrast',name:'Color Contrast Checker',category:'Design',icon:'◐',tone:'blue',desc:'Estimate contrast ratio for accessible UI.',type:'contrast'},
{id:'csv',name:'CSV to JSON',category:'Data',icon:'⇄',tone:'purple',desc:'Convert simple CSV data into JSON.',type:'csv'},
{id:'http',name:'HTTP Status Guide',category:'Code',icon:'↔',tone:'cyan',desc:'Look up common HTTP response codes.',type:'http'},
{id:'snippet',name:'Code Snippet Notes',category:'Code',icon:'⌘',tone:'pink',desc:'Draft and copy reusable code notes.',type:'snippet'} 
];
const grid=document.getElementById('toolGrid'), search=document.getElementById('globalSearch'), count=document.getElementById('toolCount'), empty=document.getElementById('emptyState');
let activeCategory='All', showAll=false;
function renderTools(){const q=(search?.value||'').trim().toLowerCase();let filtered=tools.filter(t=>(activeCategory==='All'||t.category===activeCategory)&&`${t.name} ${t.desc} ${t.category}`.toLowerCase().includes(q));if(!showAll&&activeCategory==='All'&&!q)filtered=filtered.slice(0,10);grid.innerHTML=filtered.map(t=>`<article class="tool-card" tabindex="0" role="button" data-tool="${t.id}" aria-label="Open ${t.name}"><span class="tool-icon ${t.tone}">${t.icon}</span><div class="tool-copy"><h3>${t.name}</h3><p>${t.desc}</p></div><span class="tool-arrow">↗</span></article>`).join('');count.textContent=`${filtered.length} ${filtered.length===1?'tool':'tools'}`;empty.hidden=filtered.length!==0;}
renderTools();
document.getElementById('categoryRow').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('selected',c===b));showAll=true;renderTools();});
search.addEventListener('input',()=>{showAll=true;renderTools()});
document.getElementById('showAll').addEventListener('click',()=>{showAll=!showAll;document.getElementById('showAll').textContent=showAll?'Show featured ↑':'View all tools ↗';renderTools();document.getElementById('tools').scrollIntoView({behavior:'smooth'});});
grid.addEventListener('click',e=>{const card=e.target.closest('[data-tool]');if(card)openTool(card.dataset.tool)});
grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-tool]')){e.preventDefault();openTool(e.target.dataset.tool)}});
document.getElementById('themeToggle').addEventListener('click',()=>document.body.classList.toggle('light'));
document.getElementById('mobileMenu').addEventListener('click',()=>document.getElementById('mainNav').classList.toggle('open'));
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('mainNav').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
const modal=document.getElementById('maintenanceModal');function dismissMaintenance(){modal.style.display='none'}document.getElementById('dismissMaintenance').addEventListener('click',dismissMaintenance);document.getElementById('dismissX').addEventListener('click',dismissMaintenance);
const toast=document.getElementById('toast');let toastTimer;function notify(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2300)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const toolModal=document.getElementById('toolModal'), toolBody=document.getElementById('toolBody');
function field(label,id,value='',placeholder=''){return `<div class="tool-field"><label for="${id}">${label}</label><textarea id="${id}" placeholder="${placeholder}">${esc(value)}</textarea></div>`}
function inputField(label,id,value='',type='text'){return `<div class="tool-field"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${esc(value)}"></div>`}
function action(label,fn='runTool()'){return `<button class="button" type="button" onclick="${fn}">${label}</button>`}
function openTool(id){const t=tools.find(x=>x.id===id);if(!t)return;document.getElementById('toolModalTitle').textContent=t.name;document.getElementById('toolModalCategory').textContent=t.category.toUpperCase();let html='';
switch(t.type){
case'playground':html=`<p class="tool-help">This playground runs HTML/CSS/JS in a sandboxed preview. Do not paste code you don't trust.</p><div class="tool-layout"><div>${field('HTML','playHtml','<h1>Hello, builder!</h1>\\n<p>Your preview appears here.</p>')} ${field('CSS','playCss','body{font-family:Arial;padding:24px;color:#202947} h1{color:#7149e8}')}</div><div>${field('JavaScript','playJs','document.querySelector("h1").addEventListener("click",()=>alert("It works!"));')}<button class="button" onclick="runPlayground()">Run preview →</button><iframe class="tool-preview" id="playPreview" sandbox="allow-scripts"></iframe></div></div>`;break;
case'json':html=`${field('JSON input','jsonInput','{\\n  "name": "NI Software Labs",\\n  "status": "building"\\n}')}<button class="button" onclick="runTool()">Format JSON</button><button class="button button-ghost" onclick="runJsonMinify()">Minify</button><div class="tool-field"><label>Output</label><div class="tool-output" id="jsonOutput">Output will appear here.</div></div>`;break;
case'text':html=`${field('Your text','textInput','Build something useful today.')}<div class="tool-output" id="textOutput">Type or edit text to see stats.</div><button class="button" onclick="runTool()">Analyze text</button>`;break;
case'base64':html=`${field('Input text','baseInput','Hello from NI Software Labs')}<button class="button" onclick="runBase64('encode')">Encode</button><button class="button button-ghost" onclick="runBase64('decode')">Decode</button><div class="tool-output" id="baseOutput"></div>`;break;
case'url':html=`${field('Input','urlInput','Hello world & welcome!')}<button class="button" onclick="runUrl('encode')">Encode</button><button class="button button-ghost" onclick="runUrl('decode')">Decode</button><div class="tool-output" id="urlOutput"></div>`;break;
case'password':html=`<div class="tool-layout">${inputField('Length (8–128)','passLength','20','number')}<div class="tool-field"><label for="passSymbols">Include symbols</label><select id="passSymbols"><option value="yes">Yes</option><option value="no">No</option></select></div></div><button class="button" onclick="runPassword()">Generate password</button><div class="tool-output" id="passOutput"></div><p class="tool-help">Generated locally in this browser. Save it only in a secure password manager.</p>`;break;
case'colors':html=`<div class="tool-layout"><div class="tool-field"><label for="colorPick">Choose a color</label><input id="colorPick" type="color" value="#8055ff" oninput="updateColor()"></div>${inputField('HEX value','colorHex','#8055ff')}</div><div id="colorSwatch" style="height:130px;border-radius:14px;background:#8055ff;margin:10px 0;border:1px solid var(--line)"></div><button class="button" onclick="copyValue(document.getElementById('colorHex').value)">Copy HEX</button>`;break;
case'markdown':html=`${field('Markdown','mdInput','# Hello, builder!\\n\\nWrite **bold text**, *italic text*, and lists:\\n\\n- One\\n- Two')}<button class="button" onclick="runMarkdown()">Preview</button><div class="tool-field"><label>Preview</label><div class="tool-output" id="mdOutput"></div></div><p class="tool-help">Safe basic preview: raw HTML is escaped before Markdown formatting.</p>`;break;
case'uuid':html=`<button class="button" onclick="runUUID()">Generate UUID</button><div class="tool-output" id="uuidOutput"></div><button class="button button-ghost" onclick="copyValue(document.getElementById('uuidOutput').textContent)">Copy</button>`;break;
case'timestamp':html=`${inputField('Unix timestamp (seconds)','timestampInput',Math.floor(Date.now()/1000),'number')}<button class="button" onclick="runTimestamp('date')">Convert to date</button>${inputField('Date/time (ISO accepted)','dateInput',new Date().toISOString())}<button class="button button-ghost" onclick="runTimestamp('timestamp')">Convert to timestamp</button><div class="tool-output" id="timestampOutput"></div>`;break;
case'regex':html=`${inputField('Regular expression','regexPattern','[A-Z]+')} ${inputField('Flags','regexFlags','g')} ${field('Test text','regexText','NI Labs makes building fun.')}<button class="button" onclick="runRegex()">Test expression</button><div class="tool-output" id="regexOutput"></div>`;break;
case'gradient':html=`<div class="tool-layout">${inputField('First color','gradA','#7c3cff')} ${inputField('Second color','gradB','#12d9f5')}</div><div class="tool-field"><label for="gradAngle">Angle: <span id="gradAngleValue">120</span>°</label><input id="gradAngle" type="range" min="0" max="360" value="120" oninput="updateGradient()"></div><div id="gradPreview" style="height:130px;border-radius:14px;background:linear-gradient(120deg,#7c3cff,#12d9f5);border:1px solid var(--line)"></div><div class="tool-output" id="gradOutput">background: linear-gradient(120deg, #7c3cff, #12d9f5);</div><button class="button" onclick="copyValue(document.getElementById('gradOutput').textContent)">Copy CSS</button>`;break;
case'lorem':html=`<div class="tool-field"><label for="loremCount">Paragraphs</label><select id="loremCount"><option>1</option><option selected>3</option><option>5</option><option>8</option></select></div><button class="button" onclick="runLorem()">Generate text</button><div class="tool-output" id="loremOutput"></div><button class="button button-ghost" onclick="copyValue(document.getElementById('loremOutput').textContent)">Copy text</button>`;break;
case'case':html=`${field('Input text','caseInput','Make your next idea real.')}<button class="button" onclick="runCase('upper')">UPPERCASE</button><button class="button" onclick="runCase('lower')">lowercase</button><button class="button button-ghost" onclick="runCase('title')">Title Case</button><button class="button button-ghost" onclick="runCase('sentence')">Sentence case</button><div class="tool-output" id="caseOutput"></div>`;break;
case'escape':html=`${field('Input','escapeInput','<h1>Hello & welcome</h1>')}<button class="button" onclick="runEscape('escape')">Escape HTML</button><button class="button button-ghost" onclick="runEscape('unescape')">Unescape HTML</button><div class="tool-output" id="escapeOutput"></div>`;break;
case'hash':html=`${field('Text to hash','hashInput','Hash this text')}<button class="button" onclick="runHash()">Create SHA-256 hash</button><div class="tool-output" id="hashOutput"></div><p class="tool-help">This is a hash utility, not password storage or a password-hashing scheme.</p>`;break;
case'jwt':html=`${field('JWT token','jwtInput','Paste a three-part JWT here')}<button class="button" onclick="runJWT()">Decode token</button><div class="tool-field"><label>Decoded content</label><div class="tool-output" id="jwtOutput"></div></div><p class="tool-help">Decoding does not verify a signature or prove the token is authentic. Never share live secrets.</p>`;break;
case'diff':html=`<div class="tool-layout">${field('Original text','diffA','Line one\\nLine two\\nOld line')}${field('New text','diffB','Line one\\nLine two\\nNew line')}</div><button class="button" onclick="runDiff()">Compare lines</button><div class="tool-output" id="diffOutput"></div><p class="tool-help">Simple line-by-line comparison; not a full Git diff algorithm.</p>`;break;
case'number':html=`${inputField('Number','numberInput','255','number')}<div class="tool-field"><label for="numberBase">Input base</label><select id="numberBase"><option value="10">Decimal</option><option value="2">Binary</option><option value="16">Hexadecimal</option><option value="8">Octal</option></select></div><button class="button" onclick="runNumber()">Convert</button><div class="tool-output" id="numberOutput"></div>`;break;
case'image':html=`<div class="tool-field"><label for="imageFile">Choose an image</label><input id="imageFile" type="file" accept="image/*"></div><div class="tool-layout"><div class="tool-field"><label for="imageQuality">JPEG quality: <span id="imageQualityValue">80</span>%</label><input id="imageQuality" type="range" min="20" max="100" value="80" oninput="document.getElementById('imageQualityValue').textContent=this.value"></div>${inputField('Max width (px)','imageWidth','1600','number')}</div><button class="button" onclick="runImage()">Compress / export JPEG</button><div id="imageOutput" class="tool-output">Choose an image to begin. Processing stays in your browser.</div>`;break;
case'vocab':html=`<div class="tool-field"><label for="vocabLevel">Level</label><select id="vocabLevel"><option>Everyday</option><option>Academic</option><option>Advanced</option></select></div><button class="button" onclick="runVocab()">Generate a word</button><div class="tool-output" id="vocabOutput">Choose a level and generate a word.</div><p class="tool-help">Offline sample vocabulary set; not a live dictionary.</p>`;break;
case'summarizer':html=`${field('Paste your text','summaryInput','Paste notes or an article here to create a short extractive summary.')}<div class="tool-field"><label for="summarySentences">Summary length</label><select id="summarySentences"><option value="2">Very short</option><option value="3" selected>Balanced</option><option value="5">Detailed</option></select></div><button class="button" onclick="runSummarizer()">Summarize text</button><div class="tool-output" id="summaryOutput"></div><p class="tool-help">This is a local extractive summary helper, not a generative AI model. Review the result for context and accuracy.</p>`;break;
case'quiz':html=`${field('Study notes or topic','quizInput','Photosynthesis is the process by which green plants use sunlight to synthesize food from carbon dioxide and water. Chlorophyll absorbs light energy. Oxygen is released as a by-product.')}<button class="button" onclick="runQuiz()">Generate review questions</button><div class="tool-output" id="quizOutput"></div><p class="tool-help">Questions are generated with simple local heuristics. They are prompts for revision, not verified exam questions.</p>`;break;
case'sql':html=`${field('SQL query','sqlInput','select id,name from users where active=1 order by name;')}<button class="button" onclick="runSQL()">Format SQL</button><div class="tool-output" id="sqlOutput"></div>`;break;
case'cron':html=`${inputField('Cron expression','cronInput','*/15 * * * *')}<button class="button" onclick="runCron()">Explain schedule</button><div class="tool-output" id="cronOutput"></div><p class="tool-help">Basic helper for common five-field cron syntax; confirm with your target scheduler.</p>`;break;
case'contrast':html=`<div class="tool-layout"><div class="tool-field"><label for="contrastFg">Text color</label><input type="color" id="contrastFg" value="#ffffff"></div><div class="tool-field"><label for="contrastBg">Background color</label><input type="color" id="contrastBg" value="#10172b"></div></div><button class="button" onclick="runContrast()">Check contrast</button><div class="tool-output" id="contrastOutput"></div>`;break;
case'csv':html=`${field('CSV input','csvInput','name,role\\nNivaas,Developer\\nNI Labs,Project')}<button class="button" onclick="runCSV()">Convert to JSON</button><div class="tool-output" id="csvOutput"></div>`;break;
case'http':html=`${inputField('HTTP status code','httpInput','404','number')}<button class="button" onclick="runHTTP()">Explain status</button><div class="tool-output" id="httpOutput"></div>`;break;
case'snippet':html=`${inputField('Snippet title','snippetTitle','Useful JavaScript snippet')}${field('Code / notes','snippetInput','const greeting = name => \`Hello, \${name}!\`;')}<button class="button" onclick="copyValue(document.getElementById('snippetInput').value)">Copy snippet</button><button class="button button-ghost" onclick="saveSnippet()">Save in this browser</button><div class="tool-output" id="snippetOutput"></div><p class="tool-help">Saved snippets stay in this browser's local storage.</p>`;break;
}

toolBody.innerHTML=html;toolModal.hidden=false;document.body.style.overflow='hidden';}
function closeTool(){toolModal.hidden=true;document.body.style.overflow=''}document.getElementById('closeTool').addEventListener('click',closeTool);toolModal.addEventListener('click',e=>{if(e.target===toolModal)closeTool()});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeTool();dismissMaintenance()}});
function copyValue(s){if(!s)return notify('Nothing to copy yet');navigator.clipboard?.writeText(s).then(()=>notify('Copied to clipboard')).catch(()=>notify('Clipboard access unavailable — select and copy manually'))}
function runTool(){const el=document.getElementById('jsonInput');if(el){try{document.getElementById('jsonOutput').textContent=JSON.stringify(JSON.parse(el.value),null,2)}catch(e){document.getElementById('jsonOutput').textContent='Invalid JSON: '+e.message}return}const tx=document.getElementById('textInput');if(tx){const s=tx.value;document.getElementById('textOutput').textContent=`Words: ${(s.trim().match(/\S+/g)||[]).length}\nCharacters: ${s.length}\nCharacters (no spaces): ${s.replace(/\s/g,'').length}\nLines: ${s? s.split(/\r\n|\r|\n/).length:0}\nSentences (approx.): ${(s.match(/[.!?]+/g)||[]).length}`}}
function runJsonMinify(){try{document.getElementById('jsonOutput').textContent=JSON.stringify(JSON.parse(document.getElementById('jsonInput').value))}catch(e){document.getElementById('jsonOutput').textContent='Invalid JSON: '+e.message}}
function runBase64(mode){const s=document.getElementById('baseInput').value;try{document.getElementById('baseOutput').textContent=mode==='encode'?btoa(unescape(encodeURIComponent(s))):decodeURIComponent(escape(atob(s.trim())))}catch(e){document.getElementById('baseOutput').textContent='Could not process input: '+e.message}}
function runUrl(mode){const s=document.getElementById('urlInput').value;try{document.getElementById('urlOutput').textContent=mode==='encode'?encodeURIComponent(s):decodeURIComponent(s)}catch(e){document.getElementById('urlOutput').textContent='Invalid encoded input: '+e.message}}
function runPassword(){const len=Math.max(8,Math.min(128,Number(document.getElementById('passLength').value)||20));let chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';if(document.getElementById('passSymbols').value==='yes')chars+='!@#$%^&*()-_=+[]{}?';const bytes=new Uint32Array(len);crypto.getRandomValues(bytes);document.getElementById('passOutput').textContent=Array.from(bytes,b=>chars[b%chars.length]).join('')}
function updateColor(){const c=document.getElementById('colorPick').value;document.getElementById('colorHex').value=c;document.getElementById('colorSwatch').style.background=c}
function runMarkdown(){let s=esc(document.getElementById('mdInput').value);s=s.replace(/^### (.*)$/gm,'<h3>$1</h3>').replace(/^## (.*)$/gm,'<h2>$1</h2>').replace(/^# (.*)$/gm,'<h1>$1</h1>').replace(/\*\*(.*?)\*\*/g,'<b>$1</b>').replace(/\*(.*?)\*/g,'<i>$1</i>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/^- (.*)$/gm,'• $1').replace(/\n/g,'<br>');document.getElementById('mdOutput').innerHTML=s}
function runUUID(){document.getElementById('uuidOutput').textContent=crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c==='x'?r:(r&3|8)).toString(16)})}
function runTimestamp(mode){const out=document.getElementById('timestampOutput');if(mode==='date'){const n=Number(document.getElementById('timestampInput').value);const d=new Date(n*1000);out.textContent=Number.isFinite(n)&&!isNaN(d)?d.toISOString():'Enter a valid Unix timestamp.'}else{const d=new Date(document.getElementById('dateInput').value);out.textContent=isNaN(d)?'Enter a valid date.':`Seconds: ${Math.floor(d.getTime()/1000)}\nMilliseconds: ${d.getTime()}`}}
function runRegex(){try{const re=new RegExp(document.getElementById('regexPattern').value,document.getElementById('regexFlags').value);const s=document.getElementById('regexText').value;const matches=s.match(re);document.getElementById('regexOutput').textContent=matches?`Matches (${matches.length}):\n${matches.join('\n')}`:'No matches found.'}catch(e){document.getElementById('regexOutput').textContent='Regex error: '+e.message}}
function updateGradient(){const a=document.getElementById('gradA').value,b=document.getElementById('gradB').value,ang=document.getElementById('gradAngle').value,css=`background: linear-gradient(${ang}deg, ${a}, ${b});`;document.getElementById('gradAngleValue').textContent=ang;document.getElementById('gradPreview').style.background=`linear-gradient(${ang}deg,${a},${b})`;document.getElementById('gradOutput').textContent=css}
function runLorem(){const paras=Number(document.getElementById('loremCount').value);const base='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae lorem a justo fermentum tempor. Sed at purus non nibh maximus feugiat. Curabitur posuere sem sed mi consequat, non pretium neque consequat.';document.getElementById('loremOutput').textContent=Array.from({length:paras},()=>base).join('\n\n')}
function runCase(mode){let s=document.getElementById('caseInput').value;if(mode==='upper')s=s.toUpperCase();if(mode==='lower')s=s.toLowerCase();if(mode==='title')s=s.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());if(mode==='sentence')s=s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g,c=>c.toUpperCase());document.getElementById('caseOutput').textContent=s}
function runEscape(mode){const s=document.getElementById('escapeInput').value;document.getElementById('escapeOutput').textContent=mode==='escape'?esc(s):s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&')}
async function runHash(){const s=document.getElementById('hashInput').value;if(!crypto.subtle){document.getElementById('hashOutput').textContent='Web Crypto unavailable in this context. Try localhost or HTTPS.';return}const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));document.getElementById('hashOutput').textContent=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('')}
function runJWT(){try{const parts=document.getElementById('jwtInput').value.trim().split('.');if(parts.length!==3)throw Error('A JWT normally contains three dot-separated parts.');const decode=s=>JSON.stringify(JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/'))))),null,2);document.getElementById('jwtOutput').textContent='HEADER\n'+decode(parts[0])+'\n\nPAYLOAD\n'+decode(parts[1])+'\n\nSignature: not verified.'}catch(e){document.getElementById('jwtOutput').textContent='Could not decode token: '+e.message}}
function runDiff(){const a=document.getElementById('diffA').value.split('\n'),b=document.getElementById('diffB').value.split('\n'),out=[];for(let i=0;i<Math.max(a.length,b.length);i++){if(a[i]===b[i])out.push('  '+(a[i]??''));else{if(a[i]!==undefined)out.push('- '+a[i]);if(b[i]!==undefined)out.push('+ '+b[i])}}document.getElementById('diffOutput').textContent=out.join('\n')}
function runNumber(){const base=Number(document.getElementById('numberBase').value),n=parseInt(document.getElementById('numberInput').value,base);document.getElementById('numberOutput').textContent=Number.isNaN(n)?'Enter a valid number for the selected base.':`Decimal: ${n}\nBinary: ${n.toString(2)}\nOctal: ${n.toString(8)}\nHexadecimal: ${n.toString(16).toUpperCase()}`}
function runPlayground(){const html=document.getElementById('playHtml').value,css=document.getElementById('playCss').value,js=document.getElementById('playJs').value;const doc=`<!doctype html><html><head><meta charset="utf-8"><style>${css.replace(/<\/style/gi,'')}</style></head><body>${html.replace(/<\/body/gi,'')}<script>${js.replace(/<\/script/gi,'')}<\/script></body></html>`;document.getElementById('playPreview').srcdoc=doc}
async function runImage(){const f=document.getElementById('imageFile').files[0];const out=document.getElementById('imageOutput');if(!f){out.textContent='Choose an image first.';return}const url=URL.createObjectURL(f),img=new Image();img.onload=()=>{const max=Math.max(100,Number(document.getElementById('imageWidth').value)||1600),scale=Math.min(1,max/img.width),canvas=document.createElement('canvas');canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);canvas.toBlob(blob=>{if(!blob){out.textContent='Could not export this image.';URL.revokeObjectURL(url);return}const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='ni-labs-compressed.jpg';link.textContent='Download compressed JPEG';out.innerHTML=`Original: ${f.name} (${Math.round(f.size/1024)} KB)\nOutput: ${canvas.width} × ${canvas.height} (${Math.round(blob.size/1024)} KB)\n`;out.appendChild(document.createElement('br'));out.appendChild(link);URL.revokeObjectURL(url)},'image/jpeg',Number(document.getElementById('imageQuality').value)/100)};img.onerror=()=>{out.textContent='Could not load this image.';URL.revokeObjectURL(url)};img.src=url}

// Access gate: this is a front-end preview gate only, not secure authorization.
// The access code is visible in client-side source; use server-side auth for real private access.
const ACCESS_CODE = 'NIgA66Xb29';
const accessGate = document.getElementById('accessGate');
if (sessionStorage.getItem('niLabsPreviewUnlocked') === 'yes') accessGate.classList.add('unlocked');
document.getElementById('accessForm').addEventListener('submit', e => {
  e.preventDefault();
  const entered = document.getElementById('accessCode').value;
  if (entered === ACCESS_CODE) {
    sessionStorage.setItem('niLabsPreviewUnlocked', 'yes');
    accessGate.classList.add('unlocked');
    document.getElementById('gateError').textContent = '';
    notify('Access granted — welcome to the lab.');
  } else {
    document.getElementById('gateError').textContent = 'Access code not recognized. Please try again.';
    document.getElementById('accessCode').value = '';
    document.getElementById('accessCode').focus();
  }
});
document.getElementById('toggleCode').addEventListener('click', () => {
  const input = document.getElementById('accessCode'), btn = document.getElementById('toggleCode');
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
});
const profileDefaults = {name:'',role:'Beginner',language:'English',reduceMotion:false,compactCards:false};
function loadProfile(){
  let p={...profileDefaults};try{p={...p,...JSON.parse(localStorage.getItem('niLabsProfile')||'{}')}}catch(e){}
  document.getElementById('profileName').value=p.name||'';
  document.getElementById('profileRole').value=p.role||'Beginner';
  document.getElementById('profileLanguage').value=p.language||'English';
  document.getElementById('reduceMotion').checked=!!p.reduceMotion;
  document.getElementById('compactCards').checked=!!p.compactCards;
  document.body.classList.toggle('reduce-motion',!!p.reduceMotion);
  document.body.classList.toggle('compact-tools',!!p.compactCards);
}
loadProfile();
document.getElementById('profileForm').addEventListener('submit',e=>{
  e.preventDefault();saveProfile();document.getElementById('profileStatus').textContent='Preferences saved in this browser.';notify('Profile preferences saved.');
});
function saveProfile(){
  const p={name:document.getElementById('profileName').value.trim(),role:document.getElementById('profileRole').value,language:document.getElementById('profileLanguage').value,reduceMotion:document.getElementById('reduceMotion').checked,compactCards:document.getElementById('compactCards').checked};
  localStorage.setItem('niLabsProfile',JSON.stringify(p));document.body.classList.toggle('reduce-motion',p.reduceMotion);document.body.classList.toggle('compact-tools',p.compactCards);
}
document.getElementById('reduceMotion').addEventListener('change',saveProfile);
document.getElementById('compactCards').addEventListener('change',saveProfile);
function runVocab(){
 const bank={
 'Everyday':[['curious','eager to know or learn something','I am curious about how this app works.'],['reliable','able to be trusted','A reliable tool saves time.'],['improve','to make something better','Practice helps improve your English.'],['confident','believing in your ability','She felt confident during the presentation.']],
 'Academic':[['analyze','examine something carefully','Analyze the results before drawing a conclusion.'],['significant','important or large enough to matter','The experiment showed a significant change.'],['interpret','explain the meaning of information','Interpret the graph in your own words.'],['evidence','information that supports a claim','Use evidence to support your answer.']],
 'Advanced':[['meticulous','showing great attention to detail','The engineer performed a meticulous code review.'],['ubiquitous','present or found everywhere','Cloud services are ubiquitous in modern software.'],['pragmatic','focused on practical results','We chose a pragmatic solution for the prototype.'],['resilient','able to recover quickly from difficulty','A resilient system handles failures gracefully.']]
 };
 const level=document.getElementById('vocabLevel').value, arr=bank[level], w=arr[Math.floor(Math.random()*arr.length)];
 document.getElementById('vocabOutput').textContent=`WORD: ${w[0]}\\nMEANING: ${w[1]}\\nEXAMPLE: ${w[2]}\\n\\nYOUR TURN: Write one sentence using "${w[0]}".`;
}
function runSummarizer(){
 const text=document.getElementById('summaryInput').value.trim(), n=Number(document.getElementById('summarySentences').value);
 if(!text){document.getElementById('summaryOutput').textContent='Paste some text first.';return}
 const sentences=text.match(/[^.!?]+[.!?]?/g)||[text];
 const words=text.toLowerCase().match(/[a-z0-9']+/g)||[], freq={};
 words.forEach(w=>{if(w.length>3)freq[w]=(freq[w]||0)+1});
 const scored=sentences.map((s,i)=>({s:s.trim(),i,score:(s.toLowerCase().match(/[a-z0-9']+/g)||[]).reduce((a,w)=>a+(freq[w]||0),0)}));
 const chosen=scored.slice().sort((a,b)=>b.score-a.score).slice(0,Math.min(n,scored.length)).sort((a,b)=>a.i-b.i);
 document.getElementById('summaryOutput').textContent=chosen.map(x=>x.s).join(' ');
}
function runQuiz(){
 const s=document.getElementById('quizInput').value.trim();if(!s){document.getElementById('quizOutput').textContent='Add notes or a topic first.';return}
 const sentences=(s.match(/[^.!?]+[.!?]?/g)||[s]).map(x=>x.trim()).filter(Boolean);
 const keywords=(s.match(/\b[A-Z][a-z]{3,}\b|\b[a-z]{5,}\b/g)||[]).filter((w,i,a)=>a.findIndex(x=>x.toLowerCase()===w.toLowerCase())===i).slice(0,6);
 const qs=[];
 if(sentences[0])qs.push('1. Summarize the main idea in your own words.');
 keywords.slice(0,4).forEach((w,i)=>qs.push(`${qs.length+1}. What does "${w}" mean in this context?`));
 if(sentences.length>1)qs.push(`${qs.length+1}. How are the main points connected?`);
 qs.push(`${qs.length+1}. Write one practical example or application of this topic.`);
 document.getElementById('quizOutput').textContent=qs.join('\\n');
}
function runSQL(){
 let s=document.getElementById('sqlInput').value.trim();
 const keywords=['select','from','where','left join','right join','inner join','outer join','join','on','group by','order by','having','limit','offset','values','set','returning','union','and','or'];
 keywords.sort((a,b)=>b.length-a.length).forEach(k=>{const re=new RegExp('\\\\b'+k.replace(/\\s+/g,'\\\\s+')+'\\\\b','ig');s=s.replace(re,'\\n'+k.toUpperCase())});
 s=s.replace(/\\s*,\\s*/g,', ').replace(/\\n\\s*/g,'\\n').trim().replace(/^\\n/,'');
 document.getElementById('sqlOutput').textContent=s;
}
function runCron(){
 const s=document.getElementById('cronInput').value.trim().split(/\\s+/), out=document.getElementById('cronOutput');
 if(s.length!==5){out.textContent='Enter five fields: minute hour day-of-month month day-of-week.';return}
 const names=['Minute','Hour','Day of month','Month','Day of week'];
 out.textContent=s.map((v,i)=>`${names[i]}: ${v==='*'?'every '+names[i].toLowerCase():v.startsWith('*/')?'every '+v.slice(2)+' '+names[i].toLowerCase()+' units':v}`).join('\\n')+'\\n\\nCheck this schedule in your actual cron environment before using it.';
}
function hexRgb(h){const n=parseInt(h.slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255]}
function luminance(rgb){const a=rgb.map(v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*a[0]+.7152*a[1]+.0722*a[2]}
function runContrast(){const fg=luminance(hexRgb(document.getElementById('contrastFg').value)),bg=luminance(hexRgb(document.getElementById('contrastBg').value)),ratio=(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);document.getElementById('contrastOutput').textContent=`Contrast ratio: ${ratio.toFixed(2)}:1\\nWCAG AA normal text (4.5:1): ${ratio>=4.5?'PASS':'FAIL'}\\nWCAG AA large text (3:1): ${ratio>=3?'PASS':'FAIL'}`}
function runCSV(){
 const rows=document.getElementById('csvInput').value.trim().split(/\\r?\\n/);if(rows.length<2){document.getElementById('csvOutput').textContent='Include a header row and at least one data row.';return}
 const parse=r=>r.split(',').map(x=>x.trim());const headers=parse(rows[0]);const result=rows.slice(1).map(row=>{const vals=parse(row),obj={};headers.forEach((h,i)=>obj[h]=vals[i]??'');return obj});
 document.getElementById('csvOutput').textContent=JSON.stringify(result,null,2);
}
function runHTTP(){
 const n=Number(document.getElementById('httpInput').value), guide={200:'OK — request succeeded.',201:'Created — a resource was created.',204:'No Content — success with no response body.',301:'Moved Permanently — permanent redirect.',302:'Found — temporary redirect.',304:'Not Modified — cached response can be reused.',400:'Bad Request — request could not be understood.',401:'Unauthorized — authentication is required or invalid.',403:'Forbidden — server refuses the request.',404:'Not Found — resource does not exist at this URL.',409:'Conflict — request conflicts with current resource state.',422:'Unprocessable Content — validation or semantic issue.',429:'Too Many Requests — rate limit may apply.',500:'Internal Server Error — unexpected server failure.',502:'Bad Gateway — invalid upstream response.',503:'Service Unavailable — server is temporarily unavailable.',504:'Gateway Timeout — upstream server did not respond in time.'};
 document.getElementById('httpOutput').textContent=guide[n]||'No built-in note for this code. Check the relevant HTTP specification or API documentation.';
}
function saveSnippet(){const arr=JSON.parse(localStorage.getItem('niLabsSnippets')||'[]');arr.push({title:document.getElementById('snippetTitle').value,code:document.getElementById('snippetInput').value,created:new Date().toISOString()});localStorage.setItem('niLabsSnippets',JSON.stringify(arr.slice(-30)));document.getElementById('snippetOutput').textContent=`Saved locally. ${Math.min(arr.length,30)} snippet(s) kept in this browser.`;notify('Snippet saved locally.')}

document.getElementById('ideaForm').addEventListener('submit',e=>{e.preventDefault();const email=document.getElementById('ideaEmail').value,idea=document.getElementById('ideaText').value;location.href=`mailto:hello@nisoftwarelabs.example?subject=${encodeURIComponent('NI Software Labs — Feature Idea')}&body=${encodeURIComponent('From: '+email+'\n\nIdea:\n'+idea+'\n\nNote: Please replace hello@nisoftwarelabs.example in script.js with a real inbox before launch.')}`;notify('Opening your email app…')});
