
let editor, selectieDreptunghi, selectieElipsa, selectieLinie, elementSelectat = null;
let culoare_linie_initiala, grosime_linie_initiala;
let culoare_fundal, culoare_linie, grosime_linie;
let mx = 0, my = 0, x1 = 0, y1 = 0;


let dreptunghi = {
    tipElement: 'rect',
    setareCoordonateElement: function (element, x1, y1, x2, y2) {
        element.setAttribute('x', Math.min(x1, x2));
        element.setAttribute('y', Math.min(y1, y2));
        element.setAttribute('width', Math.max(x1, x2) - Math.min(x1, x2));
        element.setAttribute('height', Math.max(y1, y2) - Math.min(y1, y2));

        element.setAttribute('fill', '#95B3D7');
        element.setAttribute('stroke', culoare_linie_initiala.value);
        element.setAttribute('stroke-width', grosime_linie_initiala.value);
    }
}

let elipsa = {
    tipElement: 'ellipse',
    setareCoordonateElement: function (element, x1, y1, x2, y2) {
        element.setAttribute('cx', (x1 + x2) / 2);
        element.setAttribute('cy', (y1 + y2) / 2);
        element.setAttribute('rx', (Math.max(x1, x2) - Math.min(x1, x2)) / 2);
        element.setAttribute('ry', (Math.max(y1, y2) - Math.min(y1, y2)) / 2);

        element.setAttribute('fill', '#95B3D7');
        element.setAttribute('stroke', culoare_linie_initiala.value);
        element.setAttribute('stroke-width', grosime_linie_initiala.value);
    }

}

let linie = {
    tipElement: 'line',
    setareCoordonateElement: function (element, x1, y1, x2, y2) {

        element.setAttribute('x1', x1);
        element.setAttribute('y1', y1);
        element.setAttribute('x2', x2);
        element.setAttribute('y2', y2);

        element.setAttribute('fill', '#95B3D7');
        element.setAttribute('stroke', culoare_linie_initiala.value);
        element.setAttribute('stroke-width', grosime_linie_initiala.value);
    }

}

let instrument = dreptunghi; //standard
let ok = -1; 

function mousedown(e) {

    if (e.button === 0) {

        x1 = mx;
        y1 = my;
        if (instrument.tipElement === "rect") {
            selectieDreptunghi.style.display = 'block';
            setareCoordonateSelectieDreptunghi(selectieDreptunghi, x1, y1, mx, my);
        }
        if (instrument.tipElement === "ellipse") {
            selectieElipsa.style.display = 'block';
            setareCoordonateSelectieElipsa(selectieElipsa, x1, y1, mx, my);
        }
        if (instrument.tipElement === "line") {
            selectieLinie.style.display = 'block';
            setareCoordonateSelectieLinie(selectieLinie, x1, y1, mx, my);
        }
    }
}

function mouseup(e) {
    if (e.button === 0) {
        if (instrument.tipElement === "rect") {
            selectieDreptunghi.style.display = 'none';
        }
        if (instrument.tipElement === "ellipse") {
            selectieElipsa.style.display = 'none';
        }

        if (instrument.tipElement === "line") {
            selectieLinie.style.display = 'none';
        }

        let element = document.createElementNS('http://www.w3.org/2000/svg', instrument.tipElement); 
        setareCoordonate(element, x1, y1, mx, my);
        document.querySelector('#elementeDesen').append(element);
        element.addEventListener('mousedown', selectareElement);
    }
}


function selectareElement(e) {

    if (e.button === 2) {
        elementSelectat = e.target;
      
        culoare_fundal.value = elementSelectat.getAttribute("fill");
        culoare_linie.value = elementSelectat.getAttribute("stroke");
        grosime_linie.value = elementSelectat.getAttribute("stroke-width");

        document.querySelector('#btnModifica').addEventListener('click', function (m) {
            elementSelectat.setAttribute('fill', culoare_fundal.value);
            elementSelectat.setAttribute('stroke', culoare_linie.value);
            elementSelectat.setAttribute('stroke-width', grosime_linie.value);
        });

        document.querySelector('#btnStergere').addEventListener('click', function (s) {
            elementSelectat.remove();
        });

        elementSelectat.addEventListener('mousedown', function (e) {
            if (e.button === 0) {
                ok = 1; //am selectat pentru a muta
                if (elementSelectat.tagName === 'rect') {

                    let a = Math.round(e.x - elementSelectat.getAttribute('x') - editor.getBoundingClientRect().x);
                    let b = Math.round(e.y - elementSelectat.getAttribute('y') - editor.getBoundingClientRect().y);

                    editor.addEventListener('mousemove', function (e) {
                        if (ok===1 && e.button === 0) {
                            elementSelectat.setAttribute('x', Math.round(e.x - editor.getBoundingClientRect().x - a ));
                            elementSelectat.setAttribute('y', Math.round(e.y - editor.getBoundingClientRect().y - b ));
                        }
                    });

                }

                if (elementSelectat.tagName === 'ellipse') {

                    let a = Math.round(e.x - elementSelectat.getAttribute('cx') - editor.getBoundingClientRect().x);
                    let b = Math.round(e.y - elementSelectat.getAttribute('cy') - editor.getBoundingClientRect().y);

                    editor.addEventListener('mousemove', function (e) {
                        if (ok===1 && e.button === 0) {
                            elementSelectat.setAttribute('cx', Math.round(e.x - editor.getBoundingClientRect().x - a));
                            elementSelectat.setAttribute('cy', Math.round(e.y - editor.getBoundingClientRect().y - b));
                        }
                    });
                }

                if (elementSelectat.tagName === 'line') {
                    let a = Math.round(e.x - elementSelectat.getAttribute('x1') - editor.getBoundingClientRect().x);
                    let b = Math.round(e.y - elementSelectat.getAttribute('y1') - editor.getBoundingClientRect().y);
                    let c = Math.round(e.x - elementSelectat.getAttribute('x2') - editor.getBoundingClientRect().x);
                    let d = Math.round(e.y - elementSelectat.getAttribute('y2') - editor.getBoundingClientRect().y);

                    editor.addEventListener('mousemove', function (e) {
                        if (ok===1 && e.button === 0) {
                            elementSelectat.setAttribute('x1', Math.round(e.x - editor.getBoundingClientRect().x - a));
                            elementSelectat.setAttribute('y1', Math.round(e.y - editor.getBoundingClientRect().y - b));
                            elementSelectat.setAttribute('x2', Math.round(e.x - editor.getBoundingClientRect().x - c));
                            elementSelectat.setAttribute('y2', Math.round(e.y - editor.getBoundingClientRect().y - d));
                        }
                    });

                }

                elementSelectat.addEventListener('mouseup', function (e) {
                    ok = -1; //am ajuns in locul unde voiam sa mut elementul selectat
                });
            }
        });
    }
}


function mousemove(e) {
    if (ok==-1) {

        mx = Math.round(e.x - editor.getBoundingClientRect().x);
        my = Math.round(e.y - editor.getBoundingClientRect().y);

        if (instrument.tipElement === "rect") {
            setareCoordonateSelectieDreptunghi(selectieDreptunghi, x1, y1, mx, my);
        }
        if (instrument.tipElement === "ellipse") {
            setareCoordonateSelectieElipsa(selectieElipsa, x1, y1, mx, my);
        }
        if (instrument.tipElement === "line") {
            setareCoordonateSelectieLinie(selectieLinie, x1, y1, mx, my);
        }
    }

}


function setareCoordonateSelectieDreptunghi(element, x1, y1, x2, y2) {

        element.setAttribute('x', Math.min(x1, x2));
        element.setAttribute('y', Math.min(y1, y2));
        element.setAttribute('width', Math.max(x1, x2) - Math.min(x1, x2));
        element.setAttribute('height', Math.max(y1, y2) - Math.min(y1, y2));
}

function setareCoordonateSelectieElipsa(element, x1, y1, x2, y2) {

    element.setAttribute('cx', (x1 + x2) / 2);
    element.setAttribute('cy', (y1 + y2) / 2);
    element.setAttribute('rx', (Math.max(x1, x2) - Math.min(x1, x2)) / 2);
    element.setAttribute('ry', (Math.max(y1, y2) - Math.min(y1, y2)) / 2);
}

function setareCoordonateSelectieLinie(element, x1, y1, x2, y2) {

    element.setAttribute("x1", x1);
    element.setAttribute("y1", y1);
    element.setAttribute("x2", x2);
    element.setAttribute("y2", y2);
}


function setareCoordonate(element, x1, y1, x2, y2) {
    instrument.setareCoordonateElement(element, x1, y1, x2, y2);
}

function clickRect() {
    instrument = dreptunghi;
}

function clickEllipse() {
    instrument = elipsa;
}

function clickLine() {
    instrument = linie;
}

function salvareSVG() {

    let svgText = document.querySelector('svg').outerHTML;
    svgText = svgText.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');

    var svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);

    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "export.svg";
    downloadLink.click();
}

function aplicatie() {
    editor = document.querySelector('#editor');

    culoare_linie_initiala = document.querySelector('#inputCuloareLinieInitiala');
    grosime_linie_initiala = document.querySelector('#inputGrosimeLinieInitiala');


    culoare_fundal = document.querySelector('#inputCuloare');
    culoare_linie = document.querySelector('#inputCuloareLinie');
    grosime_linie = document.querySelector('#inputGrosimeLinie');

    selectieDreptunghi = document.querySelector('#selectieDreptunghi');
    selectieElipsa = document.querySelector('#selectieElipsa');
    selectieLinie = document.querySelector('#selectieLinie');

    editor.addEventListener('mousedown', mousedown);
    editor.addEventListener('mouseup', mouseup);
    editor.addEventListener('mousemove', mousemove);


    editor.addEventListener('contextmenu', e => e.preventDefault());

    document.querySelector('#btnRect').addEventListener('click', clickRect);
    document.querySelector('#btnEllipse').addEventListener('click', clickEllipse);
    document.querySelector('#btnLine').addEventListener('click', clickLine);

    document.querySelector('#btnSalveaza').addEventListener('click', salvareSVG);

}
document.addEventListener('DOMContentLoaded', aplicatie);