$(function () {

    const initScreen = document.getElementById('init_screen');
    const showScreen = document.getElementById('show_screen');
    const videoBoard = document.getElementById('video_board');
    const textBoard = document.getElementById('text_board');
    const controlPanel = document.getElementById('control_panel');

    // Set init state
    showScreen.style.display = 'none';
    videoBoard.style.display = '';
    textBoard.style.display = 'none';
    controlPanel.style.display = 'none';

    // Select Show Screen
    $('#select_show_btn').on('click', function(e){
        initScreen.style.display = 'none';
        showScreen.style.display = '';
    });

    // Select control panel
    $('#select_control_btn').on('click', function(e){
        initScreen.style.display = 'none';
        controlPanel.style.display = '';
    });

    let socket = io();

    // Change video clip
    $('#change_video').on('click', function(e){
        e.preventDefault(); // prevents page reloading
        socket.emit('change video');
    });
    socket.on('change video', function(msg){
        console.log('change video');

        videoBoard.style.display = '';
        textBoard.style.display = 'none';

        videoBoard.src = 'video2.webm';
        videoBoard.load();
        videoBoard.play();
    });

    let slideText = document.getElementById('slide_text');

    // Change text
    $('#change_text').on('click', function(e){
        e.preventDefault(); // prevents page reloading

        let customText = document.getElementById('customize_text').value;
        socket.emit('change text', customText);
    });
    socket.on('change text', function(customText){
        console.log('change text');

        slideText.innerText = customText;

        // Init Animation
        slideText.style.animation = '';
        slideText.classList.remove("slide_text");
        slideText.offsetWidth;
        slideText.classList.add("slide_text");
        slideText.style.animation = 'flowing 10s ease';

        videoBoard.style.display = 'none';
        textBoard.style.display = '';
    });
});