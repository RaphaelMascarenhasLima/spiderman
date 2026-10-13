const CHARACTERS = [
  { id: 'miles',  name: 'Miles Morales',      universe: 'Terra-1610',  desc: 'O Aranha do Brooklyn. Veias de energia bioelétrica correndo sob a máscara — cada passo dele é um grafite em movimento.', c1: '#ff2e6c', c2: '#8b2cf5', img: 'assets/images/miles.jpeg' },
  { id: 'gwen',   name: 'Gwen Stacy',         universe: 'Terra-65',    desc: 'A Aranha de outra dimensão. Entre perdas e escolhas difíceis, Gwen aprendeu a carregar sua própria máscara.', c1: '#ff6fb0', c2: '#00d9ff', img: 'assets/images/gwenstacy.jpg' },
  { id: 'peterb', name: 'Peter B. Parker',    universe: 'Terra-616B',  desc: 'O Aranha que já viu de tudo. Experiência, humor e uma nova chance de voltar a ser herói.', c1: '#3b5bff', c2: '#ff3b3b', img: 'assets/images/peterbparker.jpg' },
  { id: 'noir',   name: 'Aranha Noir',        universe: 'Terra-90214', desc: 'O Aranha das sombras. Um herói moldado pela escuridão, pela investigação e por uma justiça sem rodeios.', c1: '#c9c9c9', c2: '#2a2a33', img: 'assets/images/aranha_noir.jpg' },
  { id: 'peni',   name: 'Peni Parker',        universe: 'Terra-14512', desc: 'A piloto do SP//dr. Uma jovem conectada ao seu robô, lutando para proteger sua dimensão.', c1: '#ff3b3b', c2: '#ffd23f', img: 'assets/images/peniparker.webp' },
  { id: 'ham',    name: 'Homem-Aranha Porco', universe: 'Terra-8311',  desc: 'O Aranha mais imprevisível. Poderes, humor e uma lógica de desenho animado que desafia qualquer regra.', c1: '#ffd23f', c2: '#ff2e6c', img: 'assets/images/porco_aranha.webp' },
  { id: 'miguel', name: "MIguel O'Hara",      universe: 'Terra-928',   desc: 'O Aranha do futuro. Força, velocidade e uma obsessão por manter o equilíbrio do multiverso.', c1: '#ff8a3b', c2: '#00d9ff', img: 'assets/images/Miguel.webp' }
];

/* =========================================================
   CLASSES TAILWIND REUTILIZADAS
========================================================= */

const EASE = 'ease-[cubic-bezier(.2,.85,.25,1)]';

const CLS = {
  card: `group absolute top-1/2 left-1/2 w-[190px] h-[270px] -mt-[135px] -ml-[95px]
    max-[560px]:w-[150px] max-[560px]:h-[220px] max-[560px]:-mt-[110px] max-[560px]:-ml-[75px]
    rounded-[14px] [transform-style:preserve-3d] will-change-transform select-none
    transition-[transform,filter,opacity] duration-[550ms] ${EASE}
    data-[active=false]:brightness-[.55] data-[active=false]:saturate-[.75]
    data-[active=false]:hover:brightness-[.8] data-[active=false]:hover:saturate-100
    data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none`,

  cardFace: `absolute inset-0 rounded-[14px] overflow-hidden border-[1.5px] border-paper/[.14]
    bg-[linear-gradient(155deg,var(--c1)_0%,var(--c2)_55%,#0a0a12_100%)]
    shadow-[0_20px_50px_-18px_rgba(0,0,0,.7)]
    group-data-[active=true]:border-paper/[.55]
    group-data-[active=true]:shadow-[0_30px_70px_-20px_rgba(0,0,0,.8),0_0_0_1px_rgba(242,240,234,.08),0_0_40px_-6px_var(--c1)]
    before:absolute before:inset-0 before:z-[2] before:bg-[radial-gradient(circle,rgba(8,8,13,.5)_1px,transparent_1.1px)] before:bg-[length:5px_5px] before:mix-blend-multiply before:opacity-50
    after:absolute after:inset-x-0 after:bottom-0 after:h-[55%] after:z-[2] after:bg-[linear-gradient(180deg,transparent,rgba(8,8,13,.92))]`,

  cardGlow: 'absolute -inset-[30%] z-0 opacity-[.55] blur-[18px] bg-[radial-gradient(circle_at_50%_30%,var(--c1),transparent_60%)]',
  cardImg: 'absolute inset-0 w-full h-full object-cover object-[center_15%] z-[1]',
  cardInfo: 'absolute inset-x-0 bottom-0 z-[3] px-3.5 pt-3.5 pb-4',
  cardName: 'font-display text-[15px] tracking-[.3px] leading-none',
  cardUniverse: 'text-[9.5px] font-bold tracking-[.6px] uppercase text-[color:var(--c1)] mt-[5px]',

  dot: `w-[7px] h-[7px] rounded-full border-0 p-0 bg-paper/20 cursor-pointer
    transition-all duration-[250ms]
    data-[active=true]:w-5 data-[active=true]:rounded-[4px] data-[active=true]:bg-paper`,

  rcard: `group relative aspect-[3/4] rounded-xl overflow-hidden border-[1.5px] border-paper/[.14]
    bg-[linear-gradient(160deg,var(--rc1),var(--rc2)_60%,#0a0a12_100%)]
    cursor-pointer rotate-[var(--tilt)]
    transition-[transform,border-color] duration-[400ms] ${EASE}
    hover:rotate-0 hover:-translate-y-2 hover:border-paper/50
    before:absolute before:inset-0 before:z-[1] before:bg-[radial-gradient(circle,rgba(8,8,13,.45)_1px,transparent_1.1px)] before:bg-[length:5px_5px] before:mix-blend-multiply before:opacity-50`,

  rcardImg: `absolute inset-0 w-full h-full object-cover object-[center_15%] z-0
    transition-transform duration-[450ms] ${EASE} group-hover:scale-[1.06]`,

  rcardDesc: `text-[11.5px] leading-[1.5] text-paper/[.65] max-h-0 opacity-0 overflow-hidden
    transition-[max-height,opacity,margin-top] duration-[400ms]
    group-hover:max-h-[90px] group-hover:opacity-100 group-hover:mt-2`,

  rule: `group relative grid grid-cols-[110px_1fr] gap-7 items-start py-[34px]
    border-t border-paper/[.14] last:border-b hover:bg-paper/[.02]`,

  scene: `group relative flex-none w-[min(78vw,420px)] aspect-[16/10] rounded-[14px] overflow-hidden
    border-[1.5px] border-paper/[.14] snap-start cursor-pointer origin-center
    bg-[linear-gradient(155deg,var(--sc1),var(--sc2)_60%,#08080d_100%)]
    transition-[transform,border-color,box-shadow] duration-[400ms] delay-[120ms] ease-[cubic-bezier(.34,1.35,.4,1)]
    hover:scale-[1.32] hover:z-10 hover:border-paper/75
    hover:shadow-[0_40px_90px_-20px_rgba(0,0,0,.85),0_0_55px_-12px_var(--sc1)]
    before:absolute before:inset-0 before:z-[1] before:pointer-events-none before:bg-[repeating-linear-gradient(115deg,rgba(255,255,255,.04)_0_2px,transparent_2px_12px)]
    after:absolute after:inset-0 after:z-[1] after:pointer-events-none after:bg-[linear-gradient(180deg,transparent_30%,rgba(8,8,13,.9))]`,

  sceneMedia: `absolute inset-0 w-full h-full object-cover object-center block z-0
    transition-transform duration-[600ms] ${EASE} group-hover:scale-[1.06]`,

  sceneTag: `absolute top-4 left-4 z-[2] text-[10px] font-bold tracking-[.6px] uppercase text-white/75
    border border-white/35 px-2.5 py-1 rounded-full
    transition-[transform,background,border-color] duration-[350ms]
    group-hover:-translate-y-[3px] group-hover:bg-ink/35 group-hover:border-white/65`,

  sceneQuote: `absolute inset-x-5 bottom-5 z-[2] font-display text-[clamp(18px,2.4vw,24px)] leading-[1.15] text-white
    transition-transform duration-[400ms] delay-[120ms] ${EASE} group-hover:-translate-y-1`,

  portal: `absolute w-[230px] h-[310px] rounded-lg overflow-hidden border-[1.5px] border-paper/[.18]
    bg-[linear-gradient(160deg,var(--pc1),var(--pc2))]
    shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)]
    transition-transform duration-500 ${EASE}
    before:absolute before:inset-0 before:rounded-lg before:z-[1] before:bg-[repeating-linear-gradient(115deg,rgba(255,255,255,.05)_0_2px,transparent_2px_10px)]
    after:absolute after:inset-x-0 after:bottom-0 after:h-[45%] after:z-[1] after:bg-[linear-gradient(180deg,transparent,rgba(8,8,13,.85))]`
};

// posição de cada portal (base + hover do grupo)
const PORTAL_SLOTS = [
  '-translate-x-10 translate-y-2.5 -rotate-[5deg] z-[1] group-hover:-translate-x-[96px] group-hover:-translate-y-1.5 group-hover:-rotate-[8deg]',
  '-translate-y-2 z-[2] group-hover:-translate-y-[26px] group-hover:scale-105',
  'translate-x-10 translate-y-2.5 rotate-[5deg] z-[1] group-hover:translate-x-[96px] group-hover:-translate-y-1.5 group-hover:rotate-[8deg]'
];

/* =========================================================
   PERSONAGENS (CARROSSEL)
========================================================= */

let activeIndex = 0;

const track = document.getElementById('track');
const dotsWrap = document.getElementById('dots');
const selName = document.getElementById('selName');
const selUniverse = document.getElementById('selUniverse');
const selDesc = document.getElementById('selDesc');
const selectedInfo = document.getElementById('selectedInfo');
const stage = document.getElementById('stage');

function buildCards(){
  track.innerHTML = '';

  CHARACTERS.forEach((ch, i) => {
    const card = document.createElement('div');
    card.className = CLS.card;
    card.dataset.index = i;
    card.dataset.active = 'false';
    card.dataset.hidden = 'false';
    card.style.setProperty('--c1', ch.c1);
    card.style.setProperty('--c2', ch.c2);

    card.innerHTML = `
      <div class="${CLS.cardFace}">
        <div class="${CLS.cardGlow}"></div>
        <img src="${ch.img}" alt="${ch.name}" class="${CLS.cardImg}">
        <div class="${CLS.cardInfo}">
          <div class="${CLS.cardName}">${ch.name}</div>
          <div class="${CLS.cardUniverse}">${ch.universe}</div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      if(i !== activeIndex) setActive(i);
    });

    track.appendChild(card);
  });

  dotsWrap.innerHTML = '';
  CHARACTERS.forEach((ch, i) => {
    const d = document.createElement('button');
    d.className = CLS.dot;
    d.dataset.active = 'false';
    d.setAttribute('aria-label', ch.name);
    d.addEventListener('click', () => setActive(i));
    dotsWrap.appendChild(d);
  });
}

function layoutCards(){
  const n = CHARACTERS.length;

  [...track.children].forEach((card, i) => {
    let offset = i - activeIndex;
    if(offset > n / 2) offset -= n;
    if(offset < -n / 2) offset += n;

    const abs = Math.abs(offset);

    card.dataset.active = String(offset === 0);
    card.dataset.hidden = String(abs > 3);

    const x = offset * 148;
    const y = offset === 0 ? -8 : abs * 6;
    const z = -abs * 130;
    const rotY = offset * -32;
    const scale = offset === 0 ? 1.18 : Math.max(0.62, 1 - abs * 0.16);

    card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
    card.style.zIndex = 100 - abs;
  });
}

function updateInfo(animate = true){
  const ch = CHARACTERS[activeIndex];

  selectedInfo.style.setProperty('--sel-color', ch.c1);

  if(animate){
    selectedInfo.style.opacity = 0;
    selectedInfo.style.transform = 'translateY(6px)';
    selectedInfo.style.transition = 'opacity .25s ease, transform .25s ease';
  }

  setTimeout(() => {
    selName.textContent = ch.name;
    selUniverse.textContent = ch.universe;
    selDesc.textContent = ch.desc;
    selectedInfo.style.opacity = 1;
    selectedInfo.style.transform = 'translateY(0)';
  }, animate ? 140 : 0);

  [...dotsWrap.children].forEach((d, i) => {
    d.dataset.active = String(i === activeIndex);
  });
}

function setActive(i){
  const n = CHARACTERS.length;
  activeIndex = ((i % n) + n) % n;
  layoutCards();
  updateInfo();
}

document.getElementById('prevBtn').addEventListener('click', () => setActive(activeIndex - 1));
document.getElementById('nextBtn').addEventListener('click', () => setActive(activeIndex + 1));

document.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowLeft')  setActive(activeIndex - 1);
  if(e.key === 'ArrowRight') setActive(activeIndex + 1);
});

/* =========================================================
   DRAG / TOUCH
========================================================= */

let isDown = false;
let startX = 0;
let dragged = 0;

function pointerDown(x){ isDown = true; startX = x; dragged = 0; }
function pointerMove(x){ if(isDown) dragged = x - startX; }
function pointerUp(){
  if(!isDown) return;
  isDown = false;

  const threshold = 40;
  if(dragged > threshold)       setActive(activeIndex - 1);
  else if(dragged < -threshold) setActive(activeIndex + 1);

  dragged = 0;
}

stage.addEventListener('mousedown', e => pointerDown(e.clientX));
window.addEventListener('mousemove', e => pointerMove(e.clientX));
window.addEventListener('mouseup', pointerUp);

stage.addEventListener('touchstart', e => pointerDown(e.touches[0].clientX), { passive: true });
stage.addEventListener('touchmove',  e => pointerMove(e.touches[0].clientX), { passive: true });
stage.addEventListener('touchend', pointerUp);

/* =========================================================
   REGRAS
========================================================= */

const RULES = [
  { color: '#ff2e6c', title: 'Toda Terra tem seu Aranha.', desc: 'Não existe dimensão sem um herói correspondente — a picada sempre encontra alguém.' },
  { color: '#00d9ff', title: 'Encontros entre dimensões geram instabilidade.', desc: 'Quando dois Aranhas de universos diferentes se cruzam, o tecido do multiverso treme.' },
  { color: '#ffd23f', title: 'Toda escolha tem um preço.', desc: 'Romper as regras do multiverso para salvar alguém sempre custa mais do que parece.' },
  { color: '#8b2cf5', title: 'A origem muda, a promessa não.', desc: 'Cidade, traje e rosto mudam de dimensão pra dimensão — o compromisso com proteger, nunca.' },
  { color: '#ff3b3b', title: 'Nenhum universo se sustenta sozinho.', desc: 'É a soma de todas as Terras — e de todos os Aranhas — que mantém o Aranhaverso de pé.' }
];

function buildRules(){
  const list = document.getElementById('rulesList');
  if(!list) return;

  list.innerHTML = '';

  RULES.forEach((r, i) => {
    const el = document.createElement('div');
    el.className = CLS.rule;
    el.style.setProperty('--rc', r.color);

    el.innerHTML = `
      <div class="font-display text-[clamp(38px,5vw,56px)] leading-none opacity-90 text-[color:var(--rc)] [-webkit-text-stroke:1px_var(--rc)] transition-transform duration-300 group-hover:-skew-x-6">
        ${String(i + 1).padStart(2, '0')}
      </div>
      <div class="pt-1.5">
        <div class="font-display text-[clamp(19px,2.4vw,26px)] tracking-[.2px]">${r.title}</div>
        <p class="mt-2 text-[13.5px] leading-[1.65] text-paper/[.58] max-w-[600px]">${r.desc}</p>
      </div>
    `;

    list.appendChild(el);
  });
}

/* =========================================================
   CENAS
========================================================= */

const SCENES = [
  { tag: 'O Salto de Fé', quote: 'Qualquer um pode usar a máscara.', c1: '#ff2e6c', c2: '#3b0d24', media: 'assets/videos/saltodefé.mp4', mediaType: 'video' },
  { tag: 'Os Aranhas', quote: 'Miles conhece outras versões do Homem-Aranha e descobre que não está sozinho.', c1: '#ff6fb0', c2: '#3a0a28', media: 'assets/videos/encontroaranhas2.mp4', mediaType: 'video' },
  { tag: 'Miles e Gwen', quote: 'Entre dimensões e sentimentos, Miles e Gwen compartilham um momento longe de todas as regras.', c1: '#00d9ff', c2: '#062633', media: 'assets/videos/milesegwen.mp4', mediaType: 'video' },
  { tag: 'Correndo Contra o Aranhaverso', quote: 'Miles contra centenas de Homens-Aranha.', c1: '#ff8a3b', c2: '#3a1c06', media: 'assets/videos/milesfugindodosaranhas.mp4', mediaType: 'video' },
  { tag: 'O Outro Miles', quote: 'E se o Homem-Aranha fosse o Prowler?', c1: '#8b2cf5', c2: '#1c0a33', media: 'assets/videos/milesprowler.mp4', mediaType: 'video' }
];

function sceneMediaHTML(s){
  if(!s.media) return '';

  if(s.mediaType === 'video'){
    return `<video class="${CLS.sceneMedia}" src="${s.media}" muted loop playsinline preload="metadata"></video>`;
  }

  return `<img class="${CLS.sceneMedia}" src="${s.media}" alt="${s.tag}">`;
}

function buildScenes(){
  const sceneTrack = document.getElementById('scenesTrack');
  if(!sceneTrack) return;

  sceneTrack.innerHTML = '';

  SCENES.forEach(s => {
    const el = document.createElement('div');
    el.className = CLS.scene;
    el.style.setProperty('--sc1', s.c1);
    el.style.setProperty('--sc2', s.c2);

    el.innerHTML = `
      ${sceneMediaHTML(s)}
      <span class="${CLS.sceneTag}">${s.tag}</span>
      <div class="${CLS.sceneQuote}">${s.quote}</div>
    `;

    const video = el.querySelector('video');

    if(video){
      el.addEventListener('mouseenter', async () => {
        video.currentTime = 0;
        video.muted = false;
        video.volume = 1;

        try {
          await video.play();
        } catch(error) {
          console.log('Áudio automático bloqueado pelo navegador.');
          video.muted = true;
          try { await video.play(); } catch(error) {}
        }
      });

      el.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
        video.volume = 0;
      });
    }

    sceneTrack.appendChild(el);
  });
}

/* =========================================================
   PORTAIS
========================================================= */

const PORTALS = [
  { tag: 'Terra-65',   c1: '#00d9ff', c2: '#08080d', img: 'assets/images/terra_65.jpeg' },
  { tag: 'Terra-1610', c1: '#ff2e6c', c2: '#3b0d24', img: 'assets/images/terra_1610.webp' },
  { tag: 'Terra-928',  c1: '#3b5bff', c2: '#0a1a3a', img: 'assets/images/terra_928.webp' }
];

function buildPortals(){
  const stack = document.getElementById('portalStack');
  if(!stack) return;

  stack.innerHTML = '';

  PORTALS.slice(0, 3).forEach((p, i) => {
    const el = document.createElement('div');
    el.className = `${CLS.portal} ${PORTAL_SLOTS[i]}`;
    el.style.setProperty('--pc1', p.c1);
    el.style.setProperty('--pc2', p.c2);

    el.innerHTML = `
      ${p.img ? `<img src="${p.img}" alt="${p.tag}" class="absolute inset-0 w-full h-full object-cover z-0">` : ''}
      <span class="absolute left-3.5 bottom-3.5 z-[2] font-display text-xs tracking-[.5px] text-white/90">${p.tag}</span>
    `;

    stack.appendChild(el);
  });
}

/* =========================================================
   ROSTER
========================================================= */

const TILTS = ['-1.4deg', '1deg', '-.8deg', '1.6deg'];

function buildRoster(){
  const grid = document.getElementById('rosterGrid');
  if(!grid) return;

  grid.innerHTML = '';

  CHARACTERS.forEach((ch, i) => {
    const el = document.createElement('div');
    el.className = CLS.rcard;
    el.style.setProperty('--rc1', ch.c1);
    el.style.setProperty('--rc2', ch.c2);
    el.style.setProperty('--tilt', TILTS[i % 4]);

    el.innerHTML = `
      <span class="absolute top-3 right-3 z-[3] font-display text-[11px] text-paper/[.35]">#${ch.id}</span>

      <img src="${ch.img}" alt="${ch.name}" class="${CLS.rcardImg}">

      <div class="absolute inset-0 z-[2] bg-[linear-gradient(180deg,transparent_40%,rgba(8,8,13,.95))]"></div>

      <div class="absolute inset-x-0 bottom-0 z-[3] p-3.5">
        <div class="text-[9px] font-bold tracking-[.6px] uppercase text-[color:var(--rc1)]">${ch.universe}</div>
        <div class="font-display text-base mt-1 leading-[1.05]">${ch.name}</div>
        <p class="${CLS.rcardDesc}">${ch.desc}</p>
      </div>
    `;

    grid.appendChild(el);
  });
}

/* =========================================================
   INIT
========================================================= */

buildCards();
layoutCards();
updateInfo(false);
buildRoster();
buildPortals();
buildRules();
buildScenes();

window.addEventListener('resize', layoutCards);

document.getElementById('exploreAgainBtn')?.addEventListener('click', () => setActive(0));