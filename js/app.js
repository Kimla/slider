
function initSlider() {

    var form = document.getElementById("create-slider");
    var animation = document.getElementById("animation").value;
    var delay = document.getElementById("delay").value;

    form.classList.add("hide");

    Slider.init({
        'delay': delay,
        'targetId': "slider",
        'buttons': true,
        'animation': animation
    });
}
