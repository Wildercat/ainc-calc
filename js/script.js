var val1 = 0;
var val2 = 0;
var oper = '';
var working = '';
var readout = mkTag('div', 'col border rounded display-4', 'Display', 'height: 100px');

var app = document.getElementById('app');

function mkTag(tag, clss, id, style) {
    let html = document.createElement(tag);
    html.setAttribute('class', clss);
    html.setAttribute('id', id);
    html.setAttribute('style', style);
    html.textContent = id;
    return html;
}


function operate() {
    switch (oper) {
        case '+': return val1 + val2;
        case '-': return val1 - val2;
        case '*': return val1 * val2;
        case '/': return val1 / val2;
    }
}

function updReadout() {
    document.getElementById('Display').textContent = working;
}
// function that accepts an object and concats its valu to display/working
function displayCat(obj) {
    working += obj.valu;
    updReadout();
}

//  if val1 is empty, moves working value to val1, resets working value
function nextInput() {
    if (val1 == 0) {
        val1 = parseFloat(working);
    } else if (val1 != 0) { // if val1 isn't empty, move working value to val2
        val2 = parseFloat(working);
    }
    working = '';

    if (val1 != 0 && val2 != 0) {
        working = operate();
        val1 = working;
        val2 = 0;
    }
    console.log({ val1, val2, working });
    updReadout();


}

class Button {
    constructor(valu, html) {
        // this.disp = disp;
        this.valu = valu;
        this.html = html;
    }


}


// class OperBtn extends Button {
//     constructor(disp, valu) {
//         super(disp, valu);
//     }
// }
// function for making buttons
function mkFuncButton(valu, disp) {
    tempBtn = new Button(
        valu,
        mkTag('div', 'col border rounded display-4', disp, 'height: 100px')
    )
    tempBtn.html.addEventListener('click', function () {
        oper = valu;
        nextInput();
    });
    return tempBtn.html;
}
// for input buttons, onclick function just grabs the current obj and sends it to displayCat
// maybe?
function reset() {
    val1 = 0;
    val2 = 0;
    oper = '';
}

function init() {
    // reset
    app.innerHTML = '';

    // make number button objects
    let inputTags = [];
    let inputList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.']
    for (let i = 0; i < inputList.length; i++) {
        let numBtn = new Button(
            inputList[i],
            mkTag('div', 'col border rounded display-4', inputList[i], 'height: 100px')
        );

        numBtn.html.addEventListener('click', function () {
            displayCat(numBtn);
        });
        inputTags.push(numBtn.html);

    }





    let eqBtn = new Button(
        '=',
        mkTag('div', 'col border rounded display-4', '=', 'height: 100px')
    );
    eqBtn.html.addEventListener('click', function () {
        nextInput();
        reset();
    })
    

    let clrBtn = new Button(
        'C',
        mkTag('div', 'col border rounded display-4', 'C', 'height: 100px')
    );
    clrBtn.html.addEventListener('click', reset);
    
    let calcGrid = [];
    calcGrid.push([readout]);
    calcGrid.push([clrBtn.html, mkFuncButton('/', '÷')]);
    calcGrid.push([inputTags[7], inputTags[8], inputTags[9], mkFuncButton('*', 'x')]);
    calcGrid.push([inputTags[4], inputTags[5], inputTags[6], mkFuncButton('-', '-')]);
    calcGrid.push([inputTags[1], inputTags[2], inputTags[3], mkFuncButton('+', '+')]);
    calcGrid.push([inputTags[0], inputTags[10], eqBtn.html]);

    for (let i = 0; i < calcGrid.length; i++) {
        let row = mkTag('div', 'row', '', '');
        for (let j = 0; j < calcGrid[i].length; j++) {
            row.appendChild(calcGrid[i][j]);
        }
        app.appendChild(row);
    }


    // appending
    // for (let i = 0; i < inputTags.length; i++) {
    //     app.appendChild(inputTags[i]);
    // }
    // app.appendChild(mkFuncButton('+', '+'))
    // app.appendChild(mkFuncButton('-', '-'))
    // app.appendChild(mkFuncButton('*', 'x'))
    // app.appendChild(mkFuncButton('/', '÷'))
    // app.appendChild(eqBtn.html);
    // app.appendChild(clrBtn.html);
}

init();