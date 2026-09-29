(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
  const passingTrain = document.querySelector('.train-approach img');
  const rideImage = document.querySelector('.ride-picture img');
  let ticking = false;
  const paintScroll = () => {
    ticking = false;
    if (reduced) return;
    if (passingTrain) {
      const host = passingTrain.closest('.train-approach');
      const r = host.getBoundingClientRect();
      const p = clamp((-r.top) / Math.max(1,r.height),0,1);
      const shift = Math.round((p - .35) * 150);
      passingTrain.style.transform = 'translate3d(' + shift + 'px,0,0) scale(1.08)';
    }
    if (rideImage) {
      const host = rideImage.closest('.ride');
      const r = host.getBoundingClientRect();
      const p = clamp((innerHeight-r.top) / Math.max(1,innerHeight+r.height),0,1);
      rideImage.style.transform = 'translate3d(' + Math.round((p-.5)*-28) + 'px,0,0) scale(1.035)';
    }
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(paintScroll); }
  }, {passive:true});
  paintScroll();

  const animated = document.querySelectorAll('.price,.borrowing,.generations,.story-photo-break');
  if (!reduced && 'IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          reveal.unobserve(entry.target);
        }
      });
    }, {threshold:.14,rootMargin:'0px 0px 40px 0px'});
    animated.forEach(el => reveal.observe(el));
  } else {
    animated.forEach(el => el.classList.add('in-view'));
  }

  const fundStory = document.getElementById('fund-story');
  const fundSteps = [...document.querySelectorAll('[data-fund-step]')];
  if (fundStory && fundSteps.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if (visible[0]) fundStory.dataset.step = visible[0].target.dataset.fundStep;
    }, {threshold:[.2,.5,.8],rootMargin:'-15% 0px -20% 0px'});
    fundSteps.forEach(step=>obs.observe(step));
  }

  const moneyStage = document.querySelector('.money-stage');
  const moneyTotal = document.querySelector('[data-money-total]');
  const moneySteps = [...document.querySelectorAll('[data-money-step]')];
  const moneyTotals = {1:'26.4%',2:'61.2%',3:'84.0%',4:'100%'};
  if (moneyStage && moneySteps.length) {
    const activateMoney = step => {
      const n = Number(step.dataset.moneyStep || 1);
      moneyStage.dataset.stage = String(n);
      if (moneyTotal) moneyTotal.textContent = moneyTotals[n] || '26.4%';
      moneySteps.forEach(s=>s.classList.toggle('is-active',s===step));
    };
    activateMoney(moneySteps[0]);
    if ('IntersectionObserver' in window && !reduced) {
      const obs = new IntersectionObserver(entries => {
        const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
        if (visible[0]) activateMoney(visible[0].target);
      }, {threshold:[.35,.6],rootMargin:'-22% 0px -28% 0px'});
      moneySteps.forEach(step=>obs.observe(step));
    } else {
      moneyStage.dataset.stage='4'; if(moneyTotal) moneyTotal.textContent='100%'; moneySteps.forEach(s=>s.classList.add('is-active'));
    }
  }

  const ageData = [
    {age:'20대',labels:['금융기관 대출','임대보증금 승계','금융기관 예금'],values:[34.8,15.3,15.1],colors:['#587481','#9d8a72','#aeb8ae'],insight:'20대는 대출과 임대보증금 승계가 큰 비중을 차지했다.'},
    {age:'30대',labels:['금융기관 대출','부동산 처분대금','금융기관 예금'],values:[40.3,18.5,14.2],colors:['#587481','#748476','#aeb8ae'],insight:'30대는 금융기관 대출 40.3%. 전 연령대에서 대출 의존이 가장 높았다.'},
    {age:'40대',labels:['부동산 처분대금','금융기관 대출','금융기관 예금'],values:[37.7,25.5,14.7],colors:['#748476','#587481','#aeb8ae'],insight:'40대부터 흐름이 뒤집힌다. 기존 부동산을 처분한 돈이 가장 큰 자금원이 된다.'},
    {age:'50대',labels:['부동산 처분대금','금융기관 예금','금융기관 대출'],values:[43.0,19.9,14.6],colors:['#748476','#aeb8ae','#587481'],insight:'50대는 부동산 처분대금이 43.0%. 보유 자산의 힘이 더 커진다.'},
    {age:'60대 이상',labels:['부동산 처분대금','금융기관 예금','임대보증금 승계'],values:[51.9,21.3,7.3],colors:['#748476','#aeb8ae','#9d8a72'],insight:'60대 이상은 집 살 돈의 절반 이상을 기존 부동산 처분으로 마련했다.'}
  ];
  const ageName = document.querySelector('[data-age-name]');
  const ageInsight = document.querySelector('[data-age-insight]');
  const ageLabels = [...document.querySelectorAll('[data-age-label]')];
  const ageBars = [...document.querySelectorAll('[data-age-bar]')];
  const ageValues = [...document.querySelectorAll('[data-age-value]')];
  const ageSteps = [...document.querySelectorAll('[data-age-index]')];
  const paintAge = index => {
    const d = ageData[index] || ageData[0];
    if (ageName) ageName.textContent=d.age;
    if (ageInsight) ageInsight.textContent=d.insight;
    ageLabels.forEach((el,i)=>{el.textContent=d.labels[i] || '';});
    ageValues.forEach((el,i)=>{el.textContent=(d.values[i] ?? 0).toFixed(1)+'%';});
    ageBars.forEach((el,i)=>{el.style.width=((d.values[i] ?? 0)/55*100)+'%';el.style.background=d.colors[i] || '#587481';});
    ageSteps.forEach((el,i)=>el.classList.toggle('is-active',i===index));
  };
  if (ageSteps.length) {
    paintAge(0);
    if ('IntersectionObserver' in window && !reduced) {
      const obs = new IntersectionObserver(entries => {
        const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
        if (visible[0]) paintAge(Number(visible[0].target.dataset.ageIndex || 0));
      }, {threshold:[.35,.6],rootMargin:'-22% 0px -28% 0px'});
      ageSteps.forEach(step=>obs.observe(step));
    } else {
      paintAge(4);
    }
  }

  if (window.parent !== window) {
    let lastHeight=0;
    const reportHeight=()=>{
      const height=Math.ceil(document.documentElement.scrollHeight);
      if(Math.abs(height-lastHeight)>1){lastHeight=height;window.parent.postMessage({type:'bank-of-parents-height',height},'*');}
    };
    if('ResizeObserver' in window)new ResizeObserver(reportHeight).observe(document.documentElement);
    addEventListener('load',reportHeight);
    document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',reportHeight));
    reportHeight();
  }
})();