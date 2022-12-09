

$(function () {
  smoothScroll();
  acciones();
  //toggleImageMain();
  const mediaScreen = () => {
    const media = window.matchMedia('(min-width: 768px)');
    const mediaQuery = (media) => {
      
       crearGlider();
      if (media.matches) {
        $(".seccion-apasionados, .seccion-innovadores, .seccion-visionarios").unbind('click');
      } else {
        $(".seccion-apasionados, .seccion-innovadores, .seccion-visionarios").click(
          function () {
            $(this).toggleClass("--active");
            $(this)
              .find(".seccion-nosotros__item__text")
              .toggleClass("animate__fadeInRight");
            $(this)
              .find(".seccion-nosotros__item__title")
              .toggleClass("animate__fadeInLeft");
          }
        );
      }
    };
    mediaQuery(media);
    media.addEventListener('change',mediaQuery);
  };
  mediaScreen();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".header").addClass("--active");
    } else {
      $(".header").removeClass("--active");
    }
  }
  );
});
const acciones = () => {
  $(".container-menu").click(function () {
    $("body").toggleClass("menu-open");
    $("#nav-icon3").toggleClass("open");
  });
  $(".seccion-formulario__form input, seccion-formulario__form textarea").focus(
    function () {
      $(this).parent().removeClass("error");
    }
  );
  
  $(".seccion-formulario__form .btn-enviar").on("click", function (e) {
    e.preventDefault();
    if (
      $("#Nombre").val() === "" ||
      $("#Empresa").val() === "" ||
      $("#Email").val() === "" ||
      $("#Telefono").val() === "" ||
      $("#Requerimiento").val() === ""
    ) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: "Validación",
        text: "Todos los campos son obligatorios",
        timer: 2500,
        position: "top-right",
        showConfirmButton: false,
      });
      // focus where is empty

      if ($("#Nombre").val() === "") {
        $("#Nombre").parent().addClass("error");
        return;
      }
      if ($("#Empresa").val() === "") {
        $("#Empresa").parent().addClass("error");
        return;
      }
      if ($("#Email").val() === "") {
        $("#Email").parent().addClass("error");
        return;
      }
      if ($("#Telefono").val() === "") {
        $("#Telefono").parent().addClass("error");
        return;
      }
      if ($("#Requerimiento").val() === "") {
        $("#Requerimiento").parent().addClass("error");
        return;
      }
    } else {
      enviarFormulario();
    }
  });
};

const toggleImageMain = () => {
  setInterval(() => {
    let random = Math.floor(Math.random() * 3);
    let imagenActiva = $(".seccion-impact__image.--active");
    let count = $(imagenActiva).attr("data-img");
    while (random === parseInt(count)) {
      random = Math.floor(Math.random() * 3);
    }
    if ($(".seccion-impact__image.--active").parent().hasClass("picture")) {
      $(".seccion-impact__image.--active").parent().removeClass("--active");
    }
    $(".seccion-impact__image.--active").removeClass("--active");
    $(`.seccion-impact__image[data-img="${random}"]`).addClass("--active");
    if (
      $(`.seccion-impact__image[data-img="${random}"]`)
        .parent()
        .hasClass("picture")
    ) {
      $(`.seccion-impact__image[data-img="${random}"]`)
        .parent()
        .addClass("--active");
    }
  }, 4000);
};

const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};
const enviarFormulario = () => {
  let nombre = $("#Nombre").val();
  let empresa = $("#Empresa").val();
  let email = $("#Email").val();
  let telefono = $("#Telefono").val();
  let requerimiento = $("#Requerimiento").val();
  let data = {
    nombre,
    empresa,
    email,
    telefono,
    requerimiento,
  };
  Swal.fire({
    title: "Cargando...",
  });
  Swal.showLoading();
  $.ajax({
    url: "./application/controllers/mailController.php",
    type: "POST",
    data: data,
    success: (response) => {
      response = JSON.parse(response);
      if (response.sent === true) {
        $("#Nombre").val("");
        $("#Empresa").val("");
        $("#Email").val("");
        $("#Telefono").val("");
        $("#Requerimiento").val("");
        Swal.fire({
          imageUrl: "./assets/images/177-envelope-mail-send-outline.gif",
          imageWidth: 150,
          imageHeight: 150,
          title: "Se ha enviado correctamente",
          text: "Hemos recibido tu mensaje, pronto nos pondremos en contacto contigo",
          timer: 2500,
        });
      } else if (response.sent === false) {
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error",
          text: response.message,
          timer: 2500,
        });
      }
    },
  });
};
function crearGlider(){
  return new Glider(document.querySelector(".glider-child"), {
    slidesToShow: 1,
    draggable: true,
    scrollLock: true,
    dots: ".dots",
    arrows: {
      prev: ".glider-prev",
      next: ".glider-next",
    },


    responsive: [

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          duration: 0.25,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          itemWidth: 100,
          duration: 0.25,
        },
      },
    ],

  });

}