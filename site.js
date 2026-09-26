
(function(){
  var phone = "5511948464947";
  var msgs = {
    "wa-nav": "Olá! Gostaria de solicitar um orçamento para meu evento.",
    "wa-hero": "Olá! Gostaria de solicitar um orçamento para meu evento.",
    "wa-sobre": "Olá! Vi o site e quero saber mais sobre as composições gastronômicas.",
    "wa-bio": "Olá, Andressa! Gostaria de conversar sobre o meu evento.",
    "wa-final": "Olá! Quero levar a Andressa para o meu evento — pode me passar uma proposta?",
    "wa-foot": "Olá! Vim pelo site e gostaria de mais informações."
  };
  Object.keys(msgs).forEach(function(id){
    var el = document.getElementById(id);
    if(el){ el.href = "https://wa.me/" + phone + "?text=" + encodeURIComponent(msgs[id]); }
  });
  var floatEl = document.getElementById("wa-float");
  if(floatEl){ floatEl.href = "https://wa.me/" + phone + "?text=" + encodeURIComponent(msgs["wa-hero"]); }

  // scroll reveal
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!reduced && "IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, {threshold:0.15});
    document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("in"); });
  }

  // light 3D tilt on hero + cards
  if(!reduced && window.matchMedia("(hover: hover)").matches){
    var tiltHero = document.getElementById("tilt-hero");
    if(tiltHero){
      tiltHero.addEventListener("mousemove", function(e){
        var r = tiltHero.getBoundingClientRect();
        var x = (e.clientX - r.left)/r.width - 0.5;
        var y = (e.clientY - r.top)/r.height - 0.5;
        tiltHero.style.transform = "rotateY(" + (x*8) + "deg) rotateX(" + (-y*8) + "deg)";
      });
      tiltHero.addEventListener("mouseleave", function(){ tiltHero.style.transform = "rotateY(0deg) rotateX(0deg)"; });
    }
    document.querySelectorAll("[data-tilt]").forEach(function(card){
      card.addEventListener("mousemove", function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left)/r.width - 0.5;
        var y = (e.clientY - r.top)/r.height - 0.5;
        card.style.transform = "rotateY(" + (x*6) + "deg) rotateX(" + (-y*6) + "deg)";
      });
      card.addEventListener("mouseleave", function(){ card.style.transform = "rotateY(0deg) rotateX(0deg)"; });
    });
  }
})();
