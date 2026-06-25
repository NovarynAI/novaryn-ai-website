export const metadata = {
  title: "Novaryn — Independent game studio",
  description: "Novaryn is an independent software studio crafting deep football management games for iOS.",
};

const html = `
<style>@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

  :root{
    --bg:#0B0F0D;
    --bg-2:#111714;
    --bg-3:#0E1311;
    --line:rgba(232,237,230,.10);
    --line-strong:rgba(232,237,230,.18);
    --text:#E8EDE6;
    --muted:#8B968D;
    --accent:#FB7A2E;
    --accent-dim:rgba(251,122,46,.14);
    --pitch:rgba(232,237,230,.22);
    --display:"Saira Condensed",sans-serif;
    --body:"Inter",sans-serif;
    --mono:"IBM Plex Mono",monospace;
    --maxw:1200px;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{
    background:var(--bg);
    color:var(--text);
    font-family:var(--body);
    font-size:17px;
    line-height:1.65;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  a{color:inherit;text-decoration:none}
  ::selection{background:var(--accent);color:#0B0F0D}
  .wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px}

  .eyebrow{
    font-family:var(--mono);
    font-size:.72rem;
    letter-spacing:.24em;
    text-transform:uppercase;
    color:var(--accent);
    display:inline-flex;
    align-items:center;
    gap:.6em;
  }
  .eyebrow::before{content:"";width:18px;height:1px;background:var(--accent)}

  h1,h2,h3{font-family:var(--display);font-weight:700;text-transform:uppercase;line-height:.94;letter-spacing:.005em}

  /* ---------- NAV ---------- */
  header.nav{
    position:sticky;top:0;z-index:50;
    backdrop-filter:saturate(140%) blur(10px);
    background:rgba(11,15,13,.72);
    border-bottom:1px solid var(--line);
  }
  .nav-inner{display:flex;align-items:center;justify-content:space-between;height:64px}
  .brand{font-family:var(--display);font-weight:700;font-size:1.5rem;letter-spacing:.02em;display:flex;align-items:center;gap:.5rem}
  .brand .dot{width:8px;height:8px;border-radius:50%;background:var(--accent);display:inline-block}
  .nav-links{display:flex;gap:34px;align-items:center}
  .nav-links a{font-family:var(--mono);font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);transition:color .2s}
  .nav-links a:hover{color:var(--text)}
  .nav-cta{
    border:1px solid var(--line-strong);
    padding:9px 16px;border-radius:2px;
    font-family:var(--mono);font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;
    color:var(--text);transition:.2s;
  }
  .nav-cta:hover{background:var(--accent);color:#0B0F0D;border-color:var(--accent)}
  @media(max-width:760px){.nav-links a:not(.nav-cta){display:none}}

  /* ---------- HERO ---------- */
  .hero{padding:clamp(56px,9vw,108px) 0 clamp(40px,6vw,72px);position:relative}
  .hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(28px,5vw,72px);align-items:center}
  .hero-copy h1{
    font-size:clamp(2.7rem,6.6vw,5.4rem);
    margin:22px 0 0;
  }
  .hero-copy h1 .alt{color:var(--accent)}
  .hero-sub{color:var(--muted);font-size:1.08rem;max-width:46ch;margin-top:24px}
  .hero-sub b{color:var(--text);font-weight:600}
  .cta-row{display:flex;gap:14px;margin-top:34px;flex-wrap:wrap}
  .btn{
    font-family:var(--mono);font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;
    padding:14px 22px;border-radius:2px;transition:.2s;display:inline-flex;align-items:center;gap:.6em;
  }
  .btn-primary{background:var(--accent);color:#0B0F0D;font-weight:500}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px -10px var(--accent)}
  .btn-ghost{border:1px solid var(--line-strong);color:var(--text)}
  .btn-ghost:hover{border-color:var(--text)}

  /* ---------- TACTICS BOARD ---------- */
  .board{
    background:linear-gradient(165deg,#0f1613,#0a0e0c);
    border:1px solid var(--line-strong);
    border-radius:10px;
    padding:16px;
    position:relative;
    box-shadow:0 30px 80px -40px rgba(0,0,0,.8);
  }
  .board-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-family:var(--mono);font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .board-head .live{color:var(--accent);display:flex;align-items:center;gap:6px}
  .board-head .live::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 0 var(--accent);animation:pulse 2s infinite}
  @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(251,122,46,.6)}70%{box-shadow:0 0 0 7px rgba(251,122,46,0)}100%{box-shadow:0 0 0 0 rgba(251,122,46,0)}}
  .board svg{display:block;width:100%;height:auto}
  .node{transform-box:fill-box;transform-origin:center}
  .node-active{animation:bob 3.2s ease-in-out infinite}
  @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
  .lane{stroke-dasharray:5 7;animation:dash 1.6s linear infinite}
  @keyframes dash{to{stroke-dashoffset:-24}}

  /* ---------- STAT BAND ---------- */
  .band{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--bg-3)}
  .band-grid{display:grid;grid-template-columns:repeat(4,1fr)}
  .band-grid .cell{padding:26px 28px;border-left:1px solid var(--line)}
  .band-grid .cell:first-child{border-left:none}
  .cell .k{font-family:var(--mono);font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
  .cell .v{font-family:var(--display);font-weight:700;font-size:1.7rem;text-transform:uppercase;margin-top:6px}
  @media(max-width:760px){.band-grid{grid-template-columns:repeat(2,1fr)}.band-grid .cell:nth-child(3){border-left:none}.band-grid .cell:nth-child(odd){border-left:none}}

  /* ---------- SECTIONS ---------- */
  section.block{padding:clamp(72px,10vw,128px) 0}
  .lede{font-size:clamp(1.7rem,3.6vw,2.9rem);max-width:18ch}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,80px);align-items:start;margin-top:34px}
  .two-col p{color:var(--muted);margin-top:18px}
  .two-col p:first-child{margin-top:0}
  .two-col p b{color:var(--text);font-weight:600}
  @media(max-width:820px){.two-col{grid-template-columns:1fr;gap:18px}}

  /* ---------- GAME ---------- */
  #game{background:var(--bg-2);border-top:1px solid var(--line)}
  .game-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap}
  .game-head .lede{margin-top:18px}
  .badge{
    font-family:var(--mono);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;
    border:1px solid var(--accent);color:var(--accent);
    padding:10px 16px;border-radius:2px;white-space:nowrap;
  }
  .features{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line);border:1px solid var(--line);margin-top:48px}
  .feat{background:var(--bg-2);padding:34px 30px;transition:background .25s}
  .feat:hover{background:#141b17}
  .feat .num{font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;color:var(--accent)}
  .feat h3{font-size:1.55rem;margin:14px 0 12px}
  .feat p{color:var(--muted);font-size:.98rem}
  @media(max-width:760px){.features{grid-template-columns:1fr}}

  /* ---------- SUPPORT ---------- */
  .support-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,80px);align-items:center;margin-top:36px}
  .support-card{
    background:var(--bg-3);border:1px solid var(--line-strong);border-radius:10px;padding:36px;
  }
  .support-card .row{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid var(--line)}
  .support-card .row:last-of-type{border-bottom:none}
  .support-card .row .lbl{font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  .support-card .row a,.support-card .row span{font-weight:500;text-align:right}
  .support-card .row a:hover{color:var(--accent)}
  .support-card .op{margin-top:20px;padding-top:18px;border-top:1px solid var(--line-strong);font-size:.9rem;color:var(--muted);line-height:1.5}
  .support-card .op b{color:var(--text);font-weight:600}
  @media(max-width:820px){.support-grid{grid-template-columns:1fr;gap:24px}}

  /* ---------- FOOTER ---------- */
  footer{border-top:1px solid var(--line);padding:56px 0 40px}
  .foot-top{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap}
  .foot-links{display:flex;gap:28px;flex-wrap:wrap}
  .foot-links a{font-family:var(--mono);font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .foot-links a:hover{color:var(--text)}
  .legal-line{margin-top:32px;color:var(--muted);font-size:.92rem;max-width:64ch;line-height:1.55}
  .legal-line b{color:var(--text);font-weight:600}
  .foot-bottom{display:flex;justify-content:space-between;align-items:center;margin-top:28px;padding-top:24px;border-top:1px solid var(--line);flex-wrap:wrap;gap:12px}
  .foot-bottom span{font-family:var(--mono);font-size:.72rem;letter-spacing:.08em;color:var(--muted)}

  /* reveal */
  .reveal{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s ease}
  .reveal.in{opacity:1;transform:none}

  :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:2px}

  @media(prefers-reduced-motion:reduce){
    html{scroll-behavior:auto}
    *{animation:none!important;transition:none!important}
    .reveal{opacity:1;transform:none}
  }

.reveal{opacity:1;transform:none}
</style>

<!-- ============ NAV ============ -->
<header class="nav">
  <div class="wrap nav-inner">
    <a href="#top" class="brand">Novaryn<span class="dot"></span></a>
    <nav class="nav-links">
      <a href="#studio">Studio</a>
      <a href="#game">Game</a>
      <a href="#support">Support</a>
      <a href="#support" class="nav-cta">Contact</a>
    </nav>
  </div>
</header>

<main id="top">

  <!-- ============ HERO ============ -->
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy reveal">
        <span class="eyebrow">Independent software studio</span>
        <h1>Every match is<br>a thousand <span class="alt">decisions.</span></h1>
        <p class="hero-sub">
          <b>Novaryn</b> is an independent software studio crafting deep football
          management games for iOS. Our debut title, <b>Gaffer</b>, puts the whole
          club in your hands — tactics, transfers and matchday — coming to the
          App&nbsp;Store.
        </p>
        <div class="cta-row">
          <a href="#game" class="btn btn-primary">See the game →</a>
          <a href="#studio" class="btn btn-ghost">Meet the studio</a>
        </div>
      </div>

      <!-- SIGNATURE: tactics board -->
      <div class="board reveal" aria-hidden="true">
        <div class="board-head">
          <span>Formation · 4-3-3</span>
          <span class="live">Matchday</span>
        </div>
        <svg viewBox="0 0 300 420" role="img">
          <!-- pitch markings -->
          <g fill="none" stroke="var(--pitch)" stroke-width="1.4">
            <rect x="14" y="14" width="272" height="392" rx="3"/>
            <line x1="14" y1="210" x2="286" y2="210"/>
            <circle cx="150" cy="210" r="40"/>
            <circle cx="150" cy="210" r="2.4" fill="var(--pitch)" stroke="none"/>
            <rect x="74" y="14" width="152" height="62"/>
            <rect x="112" y="14" width="76" height="26"/>
            <circle cx="150" cy="56" r="2" fill="var(--pitch)" stroke="none"/>
            <path d="M118 76 A40 40 0 0 0 182 76"/>
            <rect x="74" y="344" width="152" height="62"/>
            <rect x="112" y="380" width="76" height="26"/>
            <circle cx="150" cy="364" r="2" fill="var(--pitch)" stroke="none"/>
            <path d="M118 344 A40 40 0 0 1 182 344"/>
          </g>

          <!-- passing lane: #4 -> #9 -->
          <line class="lane" x1="150" y1="250" x2="150" y2="92" stroke="var(--accent)" stroke-width="1.6"/>
          <circle r="3.4" fill="var(--accent)">
            <animateMotion dur="1.6s" repeatCount="indefinite" path="M150 250 L150 92"/>
          </circle>

          <!-- player nodes -->
          <g font-family="var(--mono)" font-size="11" font-weight="500" text-anchor="middle">
            <g class="node"><circle cx="150" cy="384" r="12" fill="#0E1311" stroke="var(--pitch)" stroke-width="1.4"/><text x="150" y="388" fill="var(--text)">1</text></g>
            <g class="node"><circle cx="252" cy="318" r="12" fill="#0E1311" stroke="var(--pitch)" stroke-width="1.4"/><text x="252" y="322" fill="var(--text)">2</text></g>
            <g class="node"><circle cx="196" cy="330" r="12" fill="#0E1311" stroke="var(--pitch)" stroke-width="1.4"/><text x="196" y="334" fill="var(--text)">5</text></g>
            <g class="node"><circle cx="104" cy="330" r="12" fill="#0E1311" stroke="var(--pitch)" stroke-width="1.4"/><text x="104" y="334" fill="var(--text)">6</text></g>
            <g class="node"><circle cx="48" cy="318" r="12" fill="#0E1311" stroke="var(--pitch)" stroke-width="1.4"/><text x="48" y="322" fill="var(--text)">3</text></g>
            <g class="node"><circle cx="216" cy="244" r="12" fill="#0E1311" stroke="var(--pitch)" stroke-width="1.4"/><text x="216" y="248" fill="var(--text)">8</text></g>
            <g class="node node-active"><circle cx="150" cy="262" r="12" fill="var(--accent)" stroke="none"/><text x="150" y="266" fill="#0B0F0D">4</text></g>
            <g class="node"><circle cx="84" cy="244" r="12" fill="#0E1311" stroke="var(--pitch)" stroke-width="1.4"/><text x="84" y="248" fill="var(--text)">10</text></g>
            <g class="node"><circle cx="244" cy="120" r="12" fill="#0E1311" stroke="var(--pitch)" stroke-width="1.4"/><text x="244" y="124" fill="var(--text)">7</text></g>
            <g class="node node-active"><circle cx="150" cy="80" r="12" fill="var(--accent)" stroke="none"/><text x="150" y="84" fill="#0B0F0D">9</text></g>
            <g class="node"><circle cx="56" cy="120" r="12" fill="#0E1311" stroke="var(--pitch)" stroke-width="1.4"/><text x="56" y="124" fill="var(--text)">11</text></g>
          </g>
        </svg>
      </div>
    </div>
  </section>

  <!-- ============ STAT BAND ============ -->
  <div class="band">
    <div class="wrap">
      <div class="band-grid">
        <div class="cell"><div class="k">Founded</div><div class="v">2026</div></div>
        <div class="cell"><div class="k">Based in</div><div class="v">İzmir, TR</div></div>
        <div class="cell"><div class="k">Platform</div><div class="v">iOS</div></div>
        <div class="cell"><div class="k">Status</div><div class="v">In&nbsp;dev</div></div>
      </div>
    </div>
  </div>

  <!-- ============ STUDIO ============ -->
  <section class="block" id="studio">
    <div class="wrap reveal">
      <span class="eyebrow">The studio</span>
      <h2 class="lede" style="margin-top:18px">A small team with a manager's eye for detail.</h2>
      <div class="two-col">
        <div>
          <p><b>Novaryn</b> is an independent software studio. We design and build
          simulation games — and right now, all of that obsession is going into
          one thing: football management, done properly, on a device you already
          carry everywhere.</p>
          <p>We care about the parts other games skip. The shape of a press. The
          way a transfer window quietly reshapes a season. The decision you make
          in the 78th minute that you'll still be thinking about on the bus home.</p>
        </div>
        <div>
          <p>Novaryn develops exclusively for Apple platforms, with our debut
          title launching on the App Store. Depth over flash, every time.</p>
          <p><b>Novaryn AI is a software brand operated by Arte Pazarlama
          E-Ticaret ve Dış Ticaret Ltd. Şti.</b></p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ GAME ============ -->
  <section class="block" id="game">
    <div class="wrap">
      <div class="game-head reveal">
        <div>
          <span class="eyebrow">The game · Gaffer</span>
          <h2 class="lede" style="margin-top:18px">Run the club.<br>All of it.</h2>
        </div>
        <span class="badge">Coming soon · App Store</span>
      </div>

      <div class="features reveal">
        <div class="feat">
          <div class="num">01 — Tactics</div>
          <h3>The tactics board</h3>
          <p>Set your shape, your press and your phases of play. Then watch it
          hold up — or fall apart — minute by minute on matchday.</p>
        </div>
        <div class="feat">
          <div class="num">02 — Squad</div>
          <h3>The transfer market</h3>
          <p>Scout, negotiate and build a squad that fits your idea of the game,
          not someone else's. Every signing is a bet on a season.</p>
        </div>
        <div class="feat">
          <div class="num">03 — Matchday</div>
          <h3>A living match engine</h3>
          <p>A simulation that reacts to your calls as they happen, with the
          touchline at your fingertips and substitutes that actually change the game.</p>
        </div>
        <div class="feat">
          <div class="num">04 — Career</div>
          <h3>Career mode</h3>
          <p>Take a club from where it is to where you believe it belongs.
          Seasons that remember what you did and clubs that remember why.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ SUPPORT ============ -->
  <section class="block" id="support">
    <div class="wrap">
      <div class="support-grid">
        <div class="reveal">
          <span class="eyebrow">Support</span>
          <h2 class="lede" style="margin-top:18px">Talk to a human.</h2>
          <p style="color:var(--muted);margin-top:20px;max-width:42ch">
            Questions about the game, press enquiries, or App&nbsp;Store and
            partnership matters — reach the studio directly. We read everything
            and reply, usually within two business days.
          </p>
        </div>
        <div class="support-card reveal">
          <div class="row">
            <span class="lbl">Brand</span><span>Novaryn AI</span>
          </div>
          <div class="row">
            <span class="lbl">Email</span><a href="mailto:hello@novaryn.ai">hello@novaryn.ai</a>
          </div>
          <div class="row">
            <span class="lbl">Website</span><a href="https://novaryn.ai">novaryn.ai</a>
          </div>
          <div class="row">
            <span class="lbl">Privacy</span><a href="/privacy">Privacy Policy</a>
          </div>
          <div class="op">Operated by <b>Arte Pazarlama E-Ticaret ve Dış Ticaret Ltd. Şti.</b></div>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- ============ FOOTER ============ -->
<footer>
  <div class="wrap">
    <div class="foot-top">
      <a href="#top" class="brand">Novaryn<span class="dot"></span></a>
      <nav class="foot-links">
        <a href="#studio">Studio</a>
        <a href="#game">Game</a>
        <a href="#support">Support</a>
        <a href="/privacy">Privacy</a>
        <a href="mailto:hello@novaryn.ai">Email</a>
      </nav>
    </div>
    <p class="legal-line"><b>Novaryn AI</b> is a software brand operated by
    <b>Arte Pazarlama E-Ticaret ve Dış Ticaret Ltd. Şti.</b></p>
    <div class="foot-bottom">
      <span>© 2026 Arte Pazarlama E-Ticaret ve Dış Ticaret Ltd. Şti.</span>
      <span>Built for iOS · novaryn.ai</span>
    </div>
  </div>
</footer>
`;

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
