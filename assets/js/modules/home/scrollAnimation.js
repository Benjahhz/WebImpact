const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
    triggerOnce: true
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Add class to element when it is 50% visible
    if (entry.isIntersecting) {
        entry.target.classList.add("--active");
        $(entry.target).find('.seccion-nosotros__item__title').addClass('animate__animated animate__fadeInLeft animate__faster');
        $(entry.target).find('.seccion-nosotros__item__text').addClass('animate__animated animate__fadeInRight animate__faster');
        $(entry.target).find('.desarrollo__item').eq(0).find('.desarrollo__item__image').addClass('animate__animated animate__fadeInLeft animate__normal');
        $(entry.target).find('.desarrollo__item').eq(1).find('.desarrollo__item__image').addClass('animate__animated animate__fadeInRight animate__normal');
        setTimeout(() => {
          $(entry.target).find('.desarrollo__item__image').eq(0).removeClass('animate__animated animate__fadeInLeft animate__normal');
          $(entry.target).find('.desarrollo__item__image').eq(1).removeClass('animate__animated animate__fadeInRight animate__normal');    
          $(entry.target).find('.desarrollo__item__image').addClass('--active');      
        }, 1500);
        
        observer.unobserve(entry.target);
    }
  });
},options);
const targets = document.querySelectorAll(".section");
targets.forEach((target) => observer.observe(target));
