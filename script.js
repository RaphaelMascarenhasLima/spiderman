const CHARACTERS = [
  {
    id: 'miles',
    name: 'Miles Morales',
    universe: 'Terra-1610',
    desc: 'O Aranha do Brooklyn. Veias de energia bioelétrica correndo sob a máscara — cada passo dele é um grafite em movimento.',
    c1: '#ff2e6c',
    c2: '#8b2cf5',
    img: 'assets/images/miles.jpeg'
  },
  {
    id: 'gwen',
    name: 'Gwen Stacy',
    universe: 'Terra-65',
    desc: 'A Aranha de outra dimensão. Entre perdas e escolhas difíceis, Gwen aprendeu a carregar sua própria máscara.',
    c1: '#ff6fb0',
    c2: '#00d9ff',
    img: 'assets/images/gwenstacy.jpg'
  },
  {
    id: 'peterb',
    name: 'Peter B. Parker',
    universe: 'Terra-616B',
    desc: 'O Aranha que já viu de tudo. Experiência, humor e uma nova chance de voltar a ser herói.',
    c1: '#3b5bff',
    c2: '#ff3b3b',
    img: 'assets/images/peterbparker.jpg'
  },
  {
    id: 'noir',
    name: 'Aranha Noir',
    universe: 'Terra-90214',
    desc: 'O Aranha das sombras. Um herói moldado pela escuridão, pela investigação e por uma justiça sem rodeios.',
    c1: '#c9c9c9',
    c2: '#2a2a33',
    img: 'assets/images/aranha_noir.jpg'
  },
  {
    id: 'peni',
    name: 'Peni Parker',
    universe: 'Terra-14512',
    desc: 'A piloto do SP//dr. Uma jovem conectada ao seu robô, lutando para proteger sua dimensão.',
    c1: '#ff3b3b',
    c2: '#ffd23f',
    img: 'assets/images/peniparker.webp'
  },
  {
    id: 'ham',
    name: 'Homem-Aranha Porco',
    universe: 'Terra-8311',
    desc: 'O Aranha mais imprevisível. Poderes, humor e uma lógica de desenho animado que desafia qualquer regra.',
    c1: '#ffd23f',
    c2: '#ff2e6c',
    img: 'assets/images/porco_aranha.webp'
  },
  {
    id: 'miguel',
    name: 'MIguel O\'Hara',
    universe: 'Terra-928',
    desc: 'O Aranha do futuro. Força, velocidade e uma obsessão por manter o equilíbrio do multiverso.',
    c1: '#ff8a3b',
    c2: '#00d9ff',
    img: 'assets/images/Miguel.webp'
  }
];


/* =========================================================
   PERSONAGENS
========================================================= */

function characterArt(ch, className){
  return `
    <img
      src="${ch.img}"
      alt="${ch.name}"
      class="${className}">
  `;
}


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

    card.className = 'card';

    card.dataset.index = i;

    card.style.setProperty('--c1', ch.c1);
    card.style.setProperty('--c2', ch.c2);

    card.innerHTML = `
      <div class="card__face">

        <div class="card__glow"></div>

        ${characterArt(ch, 'card__silhouette')}

        <div class="card__info">

          <div class="card__name">
            ${ch.name}
          </div>

          <div class="card__universe">
            ${ch.universe}
          </div>

        </div>

      </div>
    `;

    card.addEventListener('click', () => {

      if(parseInt(card.dataset.index) !== activeIndex){

        setActive(
          parseInt(card.dataset.index)
        );

      }

    });

    track.appendChild(card);

  });


  dotsWrap.innerHTML = '';

  CHARACTERS.forEach((_, i) => {

    const d = document.createElement('button');

    d.addEventListener('click', () => {
      setActive(i);
    });

    dotsWrap.appendChild(d);

  });

}


function layoutCards(){

  const n = CHARACTERS.length;

  const cards = [...track.children];

  cards.forEach((card, i) => {

    let offset = i - activeIndex;

    if(offset > n / 2){
      offset -= n;
    }

    if(offset < -n / 2){
      offset += n;
    }

    const abs = Math.abs(offset);

    card.classList.toggle(
      'card--active',
      offset === 0
    );

    if(abs > 3){

      card.classList.add(
        'card--hidden'
      );

    }else{

      card.classList.remove(
        'card--hidden'
      );

    }

    const xSpacing = 148;

    const x = offset * xSpacing;

    const z = -Math.abs(offset) * 130;

    const rotY = offset * -32;

    const scale =
      offset === 0
        ? 1.18
        : Math.max(0.62, 1 - abs * 0.16);

    const y =
      offset === 0
        ? -8
        : abs * 6;

    card.style.transform =
      `translate3d(${x}px, ${y}px, ${z}px)
       rotateY(${rotY}deg)
       scale(${scale})`;

    card.style.zIndex =
      100 - abs;

  });

}


function updateInfo(animate = true){

  const ch = CHARACTERS[activeIndex];

  selectedInfo.style.setProperty(
    '--sel-color',
    ch.c1
  );

  if(animate){

    selectedInfo.style.opacity = 0;

    selectedInfo.style.transform =
      'translateY(6px)';

    selectedInfo.style.transition =
      'opacity .25s ease, transform .25s ease';

  }

  setTimeout(() => {

    selName.textContent = ch.name;

    selUniverse.textContent =
      ch.universe;

    selDesc.textContent =
      ch.desc;

    selectedInfo.style.opacity = 1;

    selectedInfo.style.transform =
      'translateY(0)';

  }, animate ? 140 : 0);


  [...dotsWrap.children].forEach((d, i) => {

    d.classList.toggle(
      'is-active',
      i === activeIndex
    );

  });

}


function setActive(i){

  const n = CHARACTERS.length;

  activeIndex =
    ((i % n) + n) % n;

  layoutCards();

  updateInfo();

}


document
  .getElementById('prevBtn')
  .addEventListener(
    'click',
    () => setActive(activeIndex - 1)
  );


document
  .getElementById('nextBtn')
  .addEventListener(
    'click',
    () => setActive(activeIndex + 1)
  );


document.addEventListener(
  'keydown',
  (e) => {

    if(e.key === 'ArrowLeft'){
      setActive(activeIndex - 1);
    }

    if(e.key === 'ArrowRight'){
      setActive(activeIndex + 1);
    }

  }
);


/* =========================================================
   DRAG / TOUCH
========================================================= */

let isDown = false;

let startX = 0;

let dragged = 0;


function pointerDown(x){

  isDown = true;

  startX = x;

  dragged = 0;

}


function pointerMove(x){

  if(!isDown) return;

  dragged = x - startX;

}


function pointerUp(){

  if(!isDown) return;

  isDown = false;

  const threshold = 40;

  if(dragged > threshold){

    setActive(activeIndex - 1);

  }else if(dragged < -threshold){

    setActive(activeIndex + 1);

  }

  dragged = 0;

}


stage.addEventListener(
  'mousedown',
  e => pointerDown(e.clientX)
);


window.addEventListener(
  'mousemove',
  e => pointerMove(e.clientX)
);


window.addEventListener(
  'mouseup',
  pointerUp
);


stage.addEventListener(
  'touchstart',
  e => pointerDown(e.touches[0].clientX),
  { passive: true }
);


stage.addEventListener(
  'touchmove',
  e => pointerMove(e.touches[0].clientX),
  { passive: true }
);


stage.addEventListener(
  'touchend',
  pointerUp
);


/* =========================================================
   REGRAS
========================================================= */

const RULES = [

  {
    color: 'var(--pink)',
    title: 'Toda Terra tem seu Aranha.',
    desc: 'Não existe dimensão sem um herói correspondente — a picada sempre encontra alguém.'
  },

  {
    color: 'var(--blue)',
    title: 'Encontros entre dimensões geram instabilidade.',
    desc: 'Quando dois Aranhas de universos diferentes se cruzam, o tecido do multiverso treme.'
  },

  {
    color: 'var(--yellow)',
    title: 'Toda escolha tem um preço.',
    desc: 'Romper as regras do multiverso para salvar alguém sempre custa mais do que parece.'
  },

  {
    color: 'var(--purple)',
    title: 'A origem muda, a promessa não.',
    desc: 'Cidade, traje e rosto mudam de dimensão pra dimensão — o compromisso com proteger, nunca.'
  },

  {
    color: 'var(--red)',
    title: 'Nenhum universo se sustenta sozinho.',
    desc: 'É a soma de todas as Terras — e de todos os Aranhas — que mantém o Aranhaverso de pé.'
  }

];


function buildRules(){

  const list =
    document.getElementById('rulesList');

  if(!list) return;

  list.innerHTML = '';

  RULES.forEach((r, i) => {

    const el =
      document.createElement('div');

    el.className =
      'rule-row';

    el.style.setProperty(
      '--rc',
      r.color
    );

    el.innerHTML = `

      <div class="rule-row__num">
        ${String(i + 1).padStart(2, '0')}
      </div>

      <div class="rule-row__body">

        <div class="rule-row__title">
          ${r.title}
        </div>

        <p class="rule-row__desc">
          ${r.desc}
        </p>

      </div>

    `;

    list.appendChild(el);

  });

}


/* =========================================================
   CENAS
========================================================= */

const SCENES = [

  {
    tag: 'O Salto de Fé',
    quote: 'Qualquer um pode usar a máscara.',
    c1: '#ff2e6c',
    c2: '#3b0d24',
    media: 'assets/videos/saltodefé.mp4',
    mediaType: 'video'
  },

  {
    tag: 'Os Aranhas',
    quote: 'Miles conhece outras versões do Homem-Aranha e descobre que não está sozinho.',
    c1: '#ff6fb0',
    c2: '#3a0a28',
    media: 'assets/videos/encontroaranhas2.mp4',
    mediaType: 'video'
  },

  {
    tag: 'Miles e Gwen',
    quote: 'Entre dimensões e sentimentos, Miles e Gwen compartilham um momento longe de todas as regras.',
    c1: '#00d9ff',
    c2: '#062633',
    media: 'assets/videos/milesegwen.mp4',
    mediaType: 'video'
  },

  {
    tag: 'Correndo Contra o Aranhaverso',
    quote: 'Miles contra centenas de Homens-Aranha.',
    c1: '#ff8a3b',
    c2: '#3a1c06',
    media: 'assets/videos/milesfugindodosaranhas.mp4',
    mediaType: 'video'
  },

  {
    tag: 'O Outro Miles',
    quote: 'E se o Homem-Aranha fosse o Prowler?',
    c1: '#8b2cf5',
    c2: '#1c0a33',
    media: 'assets/videos/milesprowler.mp4',
    mediaType: 'video'
  }

];


function sceneMediaHTML(s){

  if(!s.media){
    return '';
  }


  if(s.mediaType === 'video'){

    return `
      <video
        class="scene-card__media"
        src="${s.media}"
        muted
        loop
        playsinline
        preload="metadata">
      </video>
    `;

  }


  return `
    <img
      class="scene-card__media"
      src="${s.media}"
      alt="${s.tag}">
  `;

}


function buildScenes(){

  const track =
    document.getElementById('scenesTrack');

  if(!track) return;

  track.innerHTML = '';


  SCENES.forEach(s => {

    const el =
      document.createElement('div');

    el.className =
      'scene-card';

    el.style.setProperty(
      '--sc1',
      s.c1
    );

    el.style.setProperty(
      '--sc2',
      s.c2
    );


    el.innerHTML = `

      ${sceneMediaHTML(s)}

      <span class="scene-card__tag">
        ${s.tag}
      </span>

      <div class="scene-card__quote">
        ${s.quote}
      </div>

    `;


    const video =
      el.querySelector('video');


    if(video){

      el.addEventListener(
        'mouseenter',
        async () => {

          el.classList.add(
            'is-hovered'
          );

          video.currentTime = 0;

          video.muted = false;

          video.volume = 1;


          try {

            await video.play();

          } catch(error) {

            console.log(
              'Áudio automático bloqueado pelo navegador.'
            );

            video.muted = true;

            try {

              await video.play();

            } catch(error) {}

          }

        }
      );


      el.addEventListener(
        'mouseleave',
        () => {

          el.classList.remove(
            'is-hovered'
          );

          video.pause();

          video.currentTime = 0;

          video.muted = true;

          video.volume = 0;

        }
      );

    }


    track.appendChild(el);

  });

}


/* =========================================================
   PORTAIS
========================================================= */

const PORTALS = [

  {
    tag: 'Terra-65',
    c1: '#00d9ff',
    c2: '#08080d',
    img: 'assets/images/terra_65.jpeg'
  },

  {
    tag: 'Terra-1610',
    c1: '#ff2e6c',
    c2: '#3b0d24',
    img: 'assets/images/terra_1610.webp'
  },

  {
    tag: 'Terra-928',
    c1: '#3b5bff',
    c2: '#0a1a3a',
    img: 'assets/images/terra_928.webp'
  }

];


function buildPortals(){

  const stack =
    document.getElementById('portalStack');

  if(!stack) return;

  stack.innerHTML = '';

  const slots = [
    'a',
    'b',
    'c'
  ];


  PORTALS
    .slice(0, 3)
    .forEach((p, i) => {

      const el =
        document.createElement('div');

      el.className =
        `portal portal--${slots[i]}`;

      el.style.setProperty(
        '--pc1',
        p.c1
      );

      el.style.setProperty(
        '--pc2',
        p.c2
      );


      el.innerHTML = `

        ${
          p.img
            ? `
              <img
                src="${p.img}"
                alt="${p.tag}"
                class="portal__img">
            `
            : ''
        }

        <span class="portal__tag">
          ${p.tag}
        </span>

      `;


      stack.appendChild(el);

    });

}


/* =========================================================
   ROSTER
========================================================= */

function buildRoster(){

  const grid =
    document.getElementById('rosterGrid');

  if(!grid) return;

  grid.innerHTML = '';


  CHARACTERS.forEach(ch => {

    const el =
      document.createElement('div');

    el.className =
      'rcard';

    el.style.setProperty(
      '--rc1',
      ch.c1
    );

    el.style.setProperty(
      '--rc2',
      ch.c2
    );


    el.innerHTML = `

      <span class="rcard__corner">
        #${ch.id}
      </span>

      ${characterArt(
        ch,
        'rcard__silhouette'
      )}

      <div class="rcard__shade"></div>

      <div class="rcard__body">

        <div class="rcard__universe">
          ${ch.universe}
        </div>

        <div class="rcard__name">
          ${ch.name}
        </div>

        <p class="rcard__desc">
          ${ch.desc}
        </p>

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

window.addEventListener(
  'resize',
  layoutCards
);


document
  .getElementById('exploreAgainBtn')
  ?.addEventListener(
    'click',
    () => {
      setActive(0);
    }
  );