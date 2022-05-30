
/**
 * 1. khi click vào btn 1
 * màn 1 display -> none
 * màn 2 display -> block
 */

/**
 * 2. khi click vào btn 2
 * màn 1 display -> block
 * màn 2 display -> none
 */

function showScreen() {
    document.getElementById('hide-detail').style.display = 'none';
    document.getElementById('show-detail').style.display = 'flex';
}

function hideScreen() {
    document.getElementById('hide-detail').style.display = 'flex';
    document.getElementById('show-detail').style.display = 'none';
}

document.getElementById("btn-open").addEventListener('click', showScreen);
document.getElementById("btn-close").addEventListener('click', hideScreen);

