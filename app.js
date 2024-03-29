// Could've put in the HTML file, mainly here to show that app.js loaded properly.
$('#head').text('NPC Character Database');
$('#header').append('<p id="headSub"></p>')
$('#headSub').text('An updateable resource for DM\'s to help manage NPCs')
$('#foot').html(`This website is not affiliated with Wizards of the Coast or the Dungeons and Dragons franchise.<br>This content does not fall under WotC's OGL and is not sourced from the Systems Reference Document.`);

// Gets all NPCs in the database
function getAllChars(){
    $('#container').empty();
    $.get('http://localhost:3000/api/chars', (data)=>{
        console.log(data);
        for (let i=0;i<data.length;i++){
            // Loops over return data and populates divs inside the container for each NPC
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
            // Sets event listener on each NPC name that will call getCharById and load the individual NPC
            $(`#header${i}`).on('click', ()=>{
                searchTerm = $(`#header${i}`).text();
                console.log('Search for:' + searchTerm);
                getCharById(searchTerm);
            })
            $(`#header${i}`).css("cursor", "pointer");
        }
    })
}

// Gets a specific NPC from the database
function getCharById(str) {
    $('#container').empty();
    $.get(`http://localhost:3000/api/chars/${str}/`, (data) =>{
        // Checks the data returned and builds a div within the container to display NPC info
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

// Adds an NPC to the database
function addChar(obj) {
    console.log('function addChar', obj);
    let strObj = JSON.stringify(obj);
    $('#container').empty();
    $.post({url: 'http://localhost:3000/api/chars', contentType: 'application/json', data: strObj}, (data)=>{
        // Post request to database, displays the NPC information as confirmation of being added
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
// Event listener for "Search" button on page
$('#searchButton').on('click', ()=>{
    searchTerm = $('#searchField').val().toString();
    console.log('Search for:' + searchTerm);
    getCharById(searchTerm);  //<-- Passes info to the function
});
// Event listener to retrieve all NPCs
$('#allButton').on('click', getAllChars);
// Event listener for NPC creation on page
$('#createButton').on('click', ()=>{
    // Grabs all the info from the input fields to pass to the function
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
// Defaults to display all characters on loading page
getAllChars();