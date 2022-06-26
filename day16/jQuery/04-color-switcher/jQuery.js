const btnSwitch = $('.switch');


$(document).ready(function () {
    btnSwitch.on('click', () => {
        let color1 = randomNumber()
        let color2 = randomNumber()
        let color3 = randomNumber()
        const colorString = `rgb(${color1}, ${color2}, ${color3})`;

        console.log(colorString);
        $('body').css('background-color', colorString)
        $('.color').text(colorString)
    })
});




const randomNumber = () => {
    // radom -> 0 - 0.999
    return Math.floor(Math.random() * 256)
}
