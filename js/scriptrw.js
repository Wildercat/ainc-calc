var val1 = 0;
var val2 = 0;
var oper = '+';
var working = '0';

var app = document.getElementById('app');

function p() {
    console.log({ val1, oper, working });
}

function mkTag(tag, clss, id, style) {
    let html = document.createElement(tag);
    html.setAttribute('class', clss);
    html.setAttribute('id', id);
    html.setAttribute('style', style);
    html.textContent = id;
    return html;
}

function updReadout(d) {
    if (d.length > 12) {
        len = d.length - 12;
        d = d.slice(len);
    }
    document.getElementById('Display').textContent = d;
}

function operate() {
    switch (oper) {
        case '+':
            val1 = val1 + parseFloat(working);
            break;
        case '-':
            val1 = val1 - parseFloat(working);
            break;
        case 'x':
            val1 = val1 * parseFloat(working);
            break;
        case '÷':
            val1 = val1 / parseFloat(working);
            break;
        default:
            val1 = parseFloat(working);
    }
}

class Button {
    constructor(valu) {
        this.valu = valu;
        this.html = mkTag('div', 'col border rounded display-4', valu, 'height: 100px');
    }
}

class inputBtn extends Button {
    constructor(valu, html) {
        super(valu, html);
        this.html.addEventListener('click', function () {
            working += valu;
            updReadout(working);
            p()
        });
    }
}

class fncBtn extends Button {
    constructor(valu, html) {
        super(valu, html);
        this.html.addEventListener('click', function () {
            operate();
            oper = valu;
            // console.log(oper);
            // if (val1 === 0) {
            //     val1 = parseFloat(working);
            // }
            updReadout(val1 + valu);
            working = '0';
            p();
        });
    }
}

function init() {
    // reset
    app.innerHTML = '';

    let inputTags = [];
    let inputList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.']
    for (let i = 0; i < inputList.length; i++) {
        inputTags.push(new inputBtn(
            inputList[i]
        ).html);
    }
    let eqbtn = new Button('=');
    eqbtn.html.addEventListener('click', function () {
        operate();
        // p();
        updReadout(val1.toString());
        working = '0';
        p();
    })

    let clrbtn = new Button('c');
    clrbtn.html.addEventListener('click', function () {
        val1 = 0;
        oper = '+';
        working = '0';
        updReadout('');
        p();
    })

    let calcGrid = [];
    calcGrid.push([mkTag('div', 'col border rounded display-4', 'Display', 'height: 100px')]);
    calcGrid.push([clrbtn.html, new fncBtn('÷').html]);
    calcGrid.push([inputTags[7], inputTags[8], inputTags[9], new fncBtn('x').html]);
    calcGrid.push([inputTags[4], inputTags[5], inputTags[6], new fncBtn('-').html]);
    calcGrid.push([inputTags[1], inputTags[2], inputTags[3], new fncBtn('+').html]);
    calcGrid.push([inputTags[0], inputTags[10], eqbtn.html]);

    for (let i = 0; i < calcGrid.length; i++) {
        let row = mkTag('div', 'row', '', '');
        for (let j = 0; j < calcGrid[i].length; j++) {
            row.appendChild(calcGrid[i][j]);
        }
        app.appendChild(row);
    }
}

init();