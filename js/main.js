$(document).ready(function ($) {
  //Dinamicno mjenjanje Navbar SRC image i active class na osnovu hover-a

  $(".nav__img").mouseenter(function () {
    $(this).parent().addClass("active");
    $(this).parent().next().removeClass("active");
    if ($(this).hasClass("nav__img--prev")) {
      $(this).attr("src", "assets/arrow-blue-left.png");
      $(this)
        .parent()
        .next()
        .children()
        .attr("src", "assets/arrow-gray-right.png");
    }
  });

  $(".nav__img").mouseleave(function () {
    if ($(this).hasClass("nav__img--prev")) {
      $(this).parent().removeClass("active");
      $(this).parent().next().addClass("active");
      $(this).attr("src", "assets/arrow-gray-left.png");
      $(this)
        .parent()
        .next()
        .children()
        .attr("src", "assets/arrow-blue-right.png");
    }
  });

  //Glavna logika slidera je obrunta jer je u CSS za oba slidera dodan style "direction: rtl;"

  const moveSliderToNextOrPrevious = function (
    sliderBox,
    sliderArray,
    firstElement,
    lastElement,
    whichButtonIsClicked
  ) {
    const firstImageWidth = $(sliderArray).first().children("img").outerWidth();
    const lastImageWidth = $(sliderArray).last().children("img").outerWidth();

    if (whichButtonIsClicked === "next") {
      let moveSliderVar = firstImageWidth * -1;
      // varijabala koja služi da se slider pomjera u lijevo za velicinu slike koja dolazi
      let moveSliderToRightOrLeft =
        parseInt($(sliderBox).css("left")) - lastImageWidth;
      $(sliderBox).animate({ left: moveSliderToRightOrLeft }, 400, function () {
        //pomjera prvu sliku u lijevo, a zadnju sliku u slideru na prvo mjesto (obrnuto zbog CCS "direction:rtl;")
        $(firstElement).before($(lastElement));

        //pomjera slider u pocetnu poziciju kako nebi otisao lijevo van vidokruga
        $(sliderBox).css({ left: moveSliderVar, marginRight: moveSliderVar });
      });
    } else if (whichButtonIsClicked === "prev") {
      let moveSliderVar = firstImageWidth * -1;
      // varijabala koja služi da se slider pomjera u desno za velicinu slike koja dolazi
      let moveSliderToRightOrLeft =
        parseInt($(sliderBox).css("left")) + firstImageWidth;
      //pomjera slider u desno za velicinu slike koja dolazi na prvo mjesto

      $(sliderBox).animate({ left: moveSliderToRightOrLeft }, 400, function () {
        //pomjera prvu sliku u desno, a iduca slika po redu ide na prvo mjesto (obrnuto zbog CCS "direction:rtl;")
        $(lastElement).after($(firstElement));

        //pomjera slider u pocetnu poziciju kako nebi otisao lijevo van viewporta

        $(sliderBox).css({ left: moveSliderVar, marginRight: moveSliderVar });
      });
    }
  };

  //Init glavne logike slidera

  $(".nav button").on("click", function () {
    let whichButtonIsClicked = $(this).data("nav");
    moveSliderToNextOrPrevious(
      ".slider__first--ul",
      ".slider__first--ul li",
      ".slider__first--ul li:first",
      ".slider__first--ul li:last",
      whichButtonIsClicked
    );
    moveSliderToNextOrPrevious(
      ".slider__second--ul",
      ".slider__second--ul li",
      ".slider__second--ul li:first",
      ".slider__second--ul li:last",
      whichButtonIsClicked
    );
  });
});
