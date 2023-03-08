// $('#header').append('<h1 id="head"></h1>');
$('#head').text('NPC Character Database');
$('#header').append('<p id="headSub"></p>')
$('#headSub').text('An updateable resource for DM\'s to help manage NPCs')
$('#foot').html(`This website is not affiliated with Wizards of the Coast or the Dungeons and Dragons franchise.<br>This content does not fall under WotC's OGL and is not sourced from the Systems Reference Document.`);

function getAllChars(){
    $('#container').empty();
    $.get('http://localhost:3000/api/chars', (data)=>{
        console.log(data);
        for (let i=0;i<data.length;i++){
            const id = data[i].id;
            const name = data[i].name;
            const race = data[i].race;
            const clas = data[i].job;
            const hp = data[i].hp;
            const bg = data[i].background;
            const type = data[i].npc_type;
            $('#container').append(`<div id='subText${i}'></div>`);
            $(`#subText${i}`).append(`<h1 id='header${i}'></h1>`);
            $(`#header${i}`).text(`${name}`);
            $(`#subText${i}`).append(`<p id='extraText${i}'></p>`);
            $(`#extraText${i}`).html(`Race: ${race}<br>Class: ${clas}<br>Hit Points: ${hp}<br>Background: ${bg}<br>NPC Type: ${type}<br>ID: ${id}`);
            $(`#subText${i}`).css("margin-bottom", "20px");
            $(`#subText${i}`).css("font-family", "Arial");
            $(`#subText${i}`).css("border-style", "solid");
            $(`#subText${i}`).css("border-width", "2px");
            $(`#subText${i}`).css("border-color", "black");
            $(`#subText${i}`).css("border-radius", "10px");
            $(`#subText${i}`).css("background-color", "cadetblue");
            $(`#header${i}`).css("color", "Ivory");
            $(`#header${i}`).css("margin-bottom", "2px");
            $(`#extraText${i}`).css("margin-top", "5px");
        }
    })
}

function getCharById(str) {
    $('#container').empty();
    $.get(`http://localhost:3000/api/chars/${str}/`, (data) =>{
        console.log(data);
        const id = data[0].id;
        const name = data[0].name;
        const race = data[0].race;
        const clas = data[0].job;
        const hp = data[0].hp;
        const bg = data[0].background;
        const type = data[0].npc_type;
        $('#container').append(`<div id='subText'></div>`);
        $(`#subText`).append(`<h1 id='header1'></h1>`);
        $(`#header1`).text(`${name}`);
        $(`#subText`).append(`<p id='extraText'></p>`);
        $(`#extraText`).html(`Race: ${race}<br>Class: ${clas}<br>Hit Points: ${hp}<br>Background: ${bg}<br>NPC Type: ${type}<br>ID: ${id}`);
        $(`#subText`).css("margin-bottom", "20px");
        $(`#subText`).css("font-family", "Arial");
        $(`#subText`).css("border-style", "solid");
        $(`#subText`).css("border-width", "2px");
        $(`#subText`).css("border-color", "black");
        $(`#subText`).css("border-radius", "10px");
        $(`#subText`).css("background-color", "cadetblue");
        $(`#header1`).css("color", "Ivory");
        $(`#header1`).css("margin-bottom", "2px");
        $(`#extraText`).css("margin-top", "5px");
    })
}

function addChar(obj) {
    console.log('function addChar', obj);
    let strObj = JSON.stringify(obj);
    $('#container').empty();
    $.post({url: 'http://localhost:3000/api/chars', contentType: 'application/json', data: strObj}, (data)=>{
        console.log(data);
        const id = data.id;
        const name = data.name;
        const race = data.race;
        const clas = data.job;
        const hp = data.hp;
        const bg = data.background;
        const type = data.npc_type;
        $('#container').append(`<div id='subText'></div>`);
        $('#subText').append(`<h3 id="congrats"></h3>`);
        $('#congrats').text('Congratulations! You have added:');
        $('#congrats').css("color", "lightcyan");
        $(`#subText`).append(`<h1 id='header1'></h1>`);
        $(`#header1`).text(`${name}`);
        $(`#subText`).append(`<p id='extraText'></p>`);
        $(`#extraText`).html(`Race: ${race}<br>Class: ${clas}<br>Hit Points: ${hp}<br>Background: ${bg}<br>NPC Type: ${type}<br>ID: ${id}`);
        $(`#subText`).css("margin-bottom", "20px");
        $(`#subText`).css("font-family", "Arial");
        $(`#subText`).css("border-style", "solid");
        $(`#subText`).css("border-width", "2px");
        $(`#subText`).css("border-color", "black");
        $(`#subText`).css("border-radius", "10px");
        $(`#subText`).css("background-color", "cadetblue");
        $(`#header1`).css("color", "Ivory");
        $(`#header1`).css("margin-bottom", "2px");
        $(`#extraText`).css("margin-top", "5px");
    },)
}


let searchTerm;

$('#searchButton').on('click', ()=>{
    searchTerm = $('#searchField').val().toString();
    console.log('Search for:' + searchTerm);
    getCharById(searchTerm);
});

$('#allButton').on('click', getAllChars);

$('#createButton').on('click', ()=>{
    const name = $('#createName').val();
    const race = $('#createRace').val();
    const job = $('#createClass').val();
    const hitPoints = $('#createHp').val();
    const background = $('#createBg').val();
    const npcType = $('#createType').val();
    const hp = parseInt(hitPoints);
    const charObj = { name, race, job, hp, background, npcType };
    console.log(charObj);
    addChar(charObj);
})