// ========================================
// Comportamentos e interacoes do portfolio
// ========================================
// Hero: campo de fluxo + espirais; "TL" se forma ao passar no nome
const isEnglish=document.documentElement.lang==='en';
const nm=document.getElementById('name'),cv=document.getElementById('cv'),cx=cv.getContext('2d'),off=document.createElement('canvas');
let W,H,P=[],T=[],form=0,want=0,mx=-999,my=-999,t=0,tt;let C=[];
function setParticlePalette(){const light=document.documentElement.dataset.theme==='light';C=light?['#1d4ed8','#15803d','#be123c','#0e7490']:['#60a5fa','#4ade80','#fb7185','#67e8f9'];P.forEach((p,i)=>p.c=C[i%C.length])}
function mk(){setParticlePalette();W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;off.width=W;off.height=H;const o=off.getContext('2d'),fs=Math.min(H*.6,W*.55);
o.clearRect(0,0,W,H);o.font='800 '+fs+'px Unbounded, sans-serif';o.textAlign='center';o.textBaseline='middle';o.fillStyle=C[0];o.fillText('TL',W*(W>820?.72:.5),H*.52);
const d=o.getImageData(0,0,W,H).data;T=[];const st=W>820?4:5;for(let y=0;y<H;y+=st)for(let x=0;x<W;x+=st)if(d[(y*W+x)*4+3]>128)T.push([x,y]);
T.sort(()=>Math.random()-.5);const n=Math.min(1400,W<=820?Math.max(220,W*H/2000|0):Math.max(700,W*H/900|0));
P=Array.from({length:n},(_,i)=>{const x=Math.random()*W,y=Math.random()*H;return{x,y,px:x,py:y,vx:0,vy:0,c:C[i%4],tg:T.length?T[i%T.length]:null}})}
mk();addEventListener('resize',mk);if(document.fonts)document.fonts.load('800 100px Unbounded').then(mk);
const V=[0,1,2];
function fl(x,y){const a=Math.sin(x*.0028+t*.3)*2+Math.cos(y*.0035-t*.25)*2;let vx=Math.cos(a),vy=Math.sin(a);
V.forEach(i=>{const dx=x-W*(.5+.4*Math.sin(t*.2+i*2.1)),dy=y-H*(.5+.35*Math.cos(t*.17+i*1.7)),d=Math.hypot(dx,dy)+1,s=Math.min(2.2,240/d)*(i%2?-1:1);vx+=-dy/d*s;vy+=dx/d*s});return[vx,vy]}
function on(v){want=v;document.getElementById('hint').style.opacity=v?0:''}
nm.addEventListener('mouseenter',()=>on(1));nm.addEventListener('mouseleave',()=>on(0));
nm.addEventListener('touchstart',()=>{on(1);clearTimeout(tt);tt=setTimeout(()=>on(0),3000)},{passive:true});
document.getElementById('hero').addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
document.getElementById('hero').addEventListener('mouseleave',()=>{mx=my=-999});
function fr(){requestAnimationFrame(fr);if(scrollY>H*1.1)return;t+=.016;form+=(want-form)*.045;
cx.clearRect(0,0,W,H);cx.globalCompositeOperation='source-over';cx.lineWidth=1.2+form*.8;
P.forEach(p=>{p.px=p.x;p.py=p.y;const[fx,fy]=fl(p.x,p.y);p.vx=p.vx*.9+fx*.24*(1-form);p.vy=p.vy*.9+fy*.24*(1-form);
if(p.tg&&form>.01){p.vx+=(p.tg[0]-p.x)*.014*form+(Math.random()-.5)*.25*form;p.vy+=(p.tg[1]-p.y)*.014*form+(Math.random()-.5)*.25*form}
const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);if(d<170){const f=(1-d/170)*.9*(1-form*.7);p.vx+=-dy/d*f;p.vy+=dx/d*f}
p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
if(Math.abs(p.x-p.px)>50||Math.abs(p.y-p.py)>50){p.px=p.x;p.py=p.y}
cx.strokeStyle=p.c;cx.globalAlpha=.82+form*.18;cx.beginPath();cx.moveTo(p.px,p.py);cx.lineTo(p.x,p.y);cx.stroke()});
if(form>.01){P.forEach(p=>{if(!p.tg)return;cx.fillStyle=p.c;cx.globalAlpha=form*.8;cx.beginPath();cx.arc(p.tg[0],p.tg[1],1.2,0,Math.PI*2);cx.fill()})}
cx.globalAlpha=1}fr();
// Roles
const rl=isEnglish?['Sales Supervisor','Data Analyst','Full-Stack Developer','Team Leader']:['Sales Supervisor','Data Analyst','Desenvolvedor Full-Stack','Líder de Equipes'];let ri=0,ci=0,del=false;const re=document.getElementById('role');
(function ty(){const t=rl[ri];ci+=del?-1:1;re.textContent=t.slice(0,ci);let s=del?35:75;if(!del&&ci===t.length){del=true;s=1400}else if(del&&ci===0){del=false;ri=(ri+1)%rl.length;s=300}setTimeout(ty,s)})();
// Contadores
document.querySelectorAll('[data-n]').forEach(el=>{const n=+el.dataset.n;let v=0;const t=setInterval(()=>{v++;el.textContent=v+(n>9?'+':'');if(v>=n)clearInterval(t)},1400/n)});
// Filtro
document.getElementById('flt').onclick=e=>{const f=e.target.dataset.f;if(!f)return;document.querySelectorAll('#flt button').forEach(b=>b.classList.toggle('on',b===e.target));document.querySelectorAll('#pg .card').forEach(c=>c.style.display=(f==='all'||c.dataset.k===f)?'':'none')};
// Kanban
const names=isEnglish?[['#142','5k Business Cards','Maria'],['#143','2x1 Banner','South Store'],['#144','Stickers','João'],['#145','Flyers','Studio V'],['#146','Banners','Auto Mix'],['#147','Promotional Items','R Clinic']]:[['#142','Cartão 5k','Maria'],['#143','Banner 2x1','Loja Sul'],['#144','Adesivos','João'],['#145','Folders','Studio V'],['#146','Lonas','Auto Mix'],['#147','Brindes','Clínica R']];
let K=names.map((n,i)=>({n,c:i<3?0:i<5?1:2}));const cols=document.getElementById('cols'),tn=isEnglish?['To do','Production','Review','Done']:['A fazer','Produção','Revisão','Entregue'],ts=document.getElementById('toast');
function rk(){cols.innerHTML=tn.map((t,i)=>`<div class="col c${i+1}"><h4>${t}</h4>${K.map((k,j)=>k.c===i?`<div class="kc" data-j="${j}">${k.n[1]}<small>${k.n[0]} · ${k.n[2]}</small></div>`:'').join('')}</div>`).join('')}
function mv(j){const k=K[j];k.c=(k.c+1)%4;if(k.c===3){ts.textContent=isEnglish?'✉ Customer '+k.n[2]+' notified: order '+k.n[0]+' is ready':'✉ Cliente '+k.n[2]+' notificado: pedido '+k.n[0]+' pronto';stk=Math.max(30,stk-6)}else if(k.c===0){stk=Math.min(98,stk+12);ts.innerHTML='&nbsp;'}
document.getElementById('stk').textContent=(isEnglish?'stock: ':'estoque: ')+stk+'%';document.getElementById('sb').style.width=stk+'%';rk()}
let stk=84;rk();cols.onclick=e=>{const c=e.target.closest('.kc');if(c){mv(+c.dataset.j);hold=Date.now()+6000}};let hold=0;
setInterval(()=>{if(Date.now()>hold)mv(Math.random()*K.length|0)},1900);
// Skills
const hard=isEnglish?[
 ['Python','Data analysis and automation scripts to clean and combine operational data.'],['JavaScript','Dynamic interfaces, dashboards, and web systems, including a production kanban.'],['HTML/CSS','Real-world landing pages with responsive layouts and animations.'],['SQL','Queries for business indicators and management reports.'],['Git/GitHub','Version control across projects and public repositories.'],['Power BI','Dashboards for sales funnels, bottlenecks, and executive KPIs.'],['Excel','Repair, inventory, and KPI tracking across three retail locations.'],['Back-end','Business rules, permissions, and notifications for internal systems.'],['Technical Support','End-to-end troubleshooting and technical support.'],['Documentation','Guides and training materials for a network of 55+ franchises.']
]:[['Python','Automação e análise de dados: scripts para limpar e cruzar dados operacionais.'],['JavaScript','Interfaces dinâmicas, dashboards e sistemas web, como o kanban de produção.'],['HTML/CSS','Landing pages reais, responsivas e com animações.'],['SQL','Consultas para indicadores e relatórios gerenciais.'],['Git/GitHub','Versionamento de todos os projetos e repositórios públicos.'],['Power BI','Dashboards de funil de atendimento, gargalos e KPIs para a diretoria.'],['Excel','Controle de reparos, estoque e KPIs de 3 filiais no varejo.'],['Back-end','Regras de negócio, permissões e notificações no sistema interno.'],['Suporte N1/N2','Diagnóstico de falhas e ciclo completo de suporte técnico.'],['Documentação','Guias e treinamentos que padronizaram uma rede de 55+ franquias.']];
const soft=isEnglish?[
 ['Leadership','Leading the sales team while aligning strategy and people development.'],['Communication','Explaining technical issues clearly to users and company leadership.'],['Analytical Thinking','Data-driven decisions and KPI presentations to company leadership.'],['Problem Solving','Root-cause analysis to reduce rework and response times.'],['Training','Practical training and operational documentation for teams.'],['Organization','Structuring operational workflows and routines.'],['Collaboration','Working across customer service, sales, and production.'],['Adaptability','From technical support to management and software development.']
]:[['Liderança','Supervisão do time comercial, alinhando estratégia e desenvolvimento de pessoas.'],['Comunicação','Tradução de problemas técnicos em linguagem clara para usuários e diretoria.'],['Visão analítica','Decisões baseadas em KPIs apresentadas ao conselho de diretoria.'],['Resolução de problemas','Análise de causa raiz para reduzir retrabalho e tempo de resposta.'],['Didática','Treinamentos direcionados e documentação operacional para equipes.'],['Organização','Estruturação de fluxos e rotinas operacionais.'],['Colaboração','Atuação entre atendimento, vendas e produção.'],['Adaptabilidade','Do suporte técnico à gestão e ao desenvolvimento.']];
const sk=document.getElementById('sk'),pr=document.getElementById('proof');
function rsk(t){const a=t==='hard'?hard:soft;sk.className='sk '+t;sk.innerHTML=a.map((s,i)=>`<div class="chip" data-i="${i}">${s[0]}</div>`).join('');pr.innerHTML=`<b>→</b> ${isEnglish?'Select a skill to see it in action.':'Selecione uma habilidade.'}`;sk._a=a}
sk.onclick=e=>{const c=e.target.closest('.chip');if(!c)return;sk.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===c));const s=sk._a[+c.dataset.i];pr.innerHTML=`<b>${s[0]}</b> — ${s[1]}`};
document.querySelector('.tabs').onclick=e=>{const t=e.target.dataset.t;if(!t)return;document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b===e.target));rsk(t)};rsk('hard');
const mr=(a,c)=>{const h=a.map(x=>`<span><b style="color:var(--${c})">◆</b> ${x}</span>`).join('');return h+h+h+h};
document.getElementById('mq1').innerHTML=mr(isEnglish?['Python','JavaScript','SQL','Power BI','Excel','Git/GitHub','HTML','CSS','Back-end','Technical Support','Documentation']:['Python','JavaScript','SQL','Power BI','Excel','Git/GitHub','HTML','CSS','Back-end','Suporte N1/N2','Documentação'],'bl');
document.getElementById('mq2').innerHTML=mr(isEnglish?['Leadership','Communication','Analytical Thinking','Problem Solving','Training','Organization','Collaboration','Adaptability']:['Liderança','Comunicação','Visão analítica','Resolução de problemas','Didática','Organização','Colaboração','Adaptabilidade'],'gr');
// Tema
const tg=document.getElementById('tg'),rt=document.documentElement;
function th(v){
  rt.dataset.theme=v;
  setParticlePalette();
  const light=v==='light';
  tg.setAttribute('aria-label',isEnglish?(light?'Switch to dark theme':'Switch to light theme'):(light?'Ativar tema escuro':'Ativar tema claro'));
  tg.setAttribute('title',isEnglish?(light?'Switch to dark theme':'Switch to light theme'):(light?'Ativar tema escuro':'Ativar tema claro'));
  tg.innerHTML=light
    ?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>'
    :'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>';
}
let sv;try{sv=localStorage.getItem('th')}catch(e){}
th(sv||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'));
tg.onclick=()=>{const v=rt.dataset.theme==='dark'?'light':'dark';th(v);try{localStorage.setItem('th',v)}catch(e){}};
// Timeline
const tl=isEnglish?[
 ['Sales Supervisor','Bazzar Gráfica Expressa','Mar 2026 – Present',['Leading the sales team and improving performance.','Using data analysis to support decisions in executive meetings (KPIs).','Creating and implementing systems and optimizing processes.']],
 ['Commercial Assistant','Bazzar Gráfica Expressa','Nov 2024 – Feb 2026',['Excel and Power BI dashboards.','Identifying process failures and reducing rework.','Documentation and team training.']],
 ['Support Assistant','Bazzar Gráfica Expressa','Jan – Nov 2024',['In-person and digital support.','Ticket tracking and resolution.','Guidance on internal workflows.']],
 ['Commercial Manager','Bred Capas · Pelotas','Apr 2022 – Nov 2023',['KPIs across three locations using Excel and Power BI.','Management reports.','Developing and implementing sales processes and training for 55+ franchise locations.']],
 ['Technical Support','Bred Capas · Pelotas','Sep 2021 – Apr 2022',['Hardware and software troubleshooting and maintenance.','Root-cause analysis.','Repair data tracking.']]
]:[['Supervisor de Vendas','Bazzar Gráfica Expressa','Mar 2026 – hoje',['Liderança do time comercial e a evolução de desempenho','Analise de dados para tomadas de decisões em reuniões com a diretoria (KPIs)','Criação e implantação de sistemas e otimização de processos']],['Assistente Comercial','Bazzar Gráfica Expressa','Nov 2024 – Fev 2026',['Dashboards em Excel e Power BI','Diagnóstico de falhas e redução de retrabalho','Documentação e treinamentos']],['Assistente de Suporte','Bazzar Gráfica Expressa','Jan – Nov 2024',['Suporte presencial e digital','Registro e resolução de chamados','Orientação sobre fluxos internos']],['Gerente Comercial','Bred Capas · Pelotas','Abr 2022 – Nov 2023',['KPIs de 3 filiais com Excel e Power BI','Relatórios gerenciais','Elaboração e implantação de processos de vendas e treinamentos para 55+ franquias']],['Suporte Técnico','Bred Capas · Pelotas','Set 2021 – Abr 2022',['Diagnóstico e manutenção de hardware e software','Análise de causa raiz','Controle de dados de reparo']]];
const te=document.getElementById('tl');te.innerHTML=tl.map((t,i)=>`<div class="ti${i?'':' open'}"><div class="d">${t[2]}</div><h3>${t[0]} <span style="color:var(--mu);font-weight:400;font-size:.85rem">· ${t[1]}</span></h3><ul>${t[3].map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('');
te.onclick=e=>{const i=e.target.closest('.ti');if(i)i.classList.toggle('open')};
// Reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.08});document.querySelectorAll('.rv').forEach(r=>io.observe(r));

// Progresso da página
const secs=isEnglish?[['hero','Home'],['projetos','Projects'],['stack','Skills'],['trilha','Experience'],['contato','Contact']]:[['hero','Início'],['projetos','Projetos'],['stack','Skills'],['trilha','Trajetória'],['contato','Contato']],dots=document.getElementById('dots');
dots.innerHTML=secs.map(x=>`<a href="#${x[0]}"><span>${x[1]}</span></a>`).join('');
const pb=document.getElementById('pbar'),tp=document.getElementById('top'),rg=document.getElementById('ring'),hw=document.querySelector('.hw'),tle=document.getElementById('tl');
tp.onclick=()=>scrollTo({top:0,behavior:'smooth'});
function sc(){const m=document.documentElement.scrollHeight-innerHeight,p=m>0?scrollY/m:0;pb.style.width=p*100+'%';rg.style.strokeDashoffset=125.7*(1-p);tp.classList.toggle('show',scrollY>400);
let cur=0;secs.forEach((x,i)=>{if(document.getElementById(x[0]).getBoundingClientRect().top<innerHeight*.4)cur=i});
dots.querySelectorAll('a').forEach((a,i)=>a.classList.toggle('on',i===cur));document.querySelectorAll('nav div a').forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+secs[cur][0]));
const k=Math.min(1,scrollY/(innerHeight*.7));hw.style.opacity=1-k;hw.style.transform='translateY('+scrollY*.25+'px)';
const r=tle.getBoundingClientRect();tle.style.setProperty('--p',Math.max(0,Math.min(100,(innerHeight*.6-r.top)/r.height*100))+'%');
tle.querySelectorAll('.ti').forEach(i=>i.classList.toggle('pass',i.getBoundingClientRect().top<innerHeight*.6))}
addEventListener('scroll',sc,{passive:true});sc();
