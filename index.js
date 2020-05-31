document.addEventListener('DOMContentLoaded', ()=>{

  'use strict';

  let svgContainer = document.getElementById('svg-container'),
      avatar       = document.getElementById('avatar'),
      svgText      = document.getElementById('svg_text-text');

  let form      = document.getElementById('options'),
      inputs    = form.querySelectorAll('input, select');

  inputs.forEach( input => {

    input.addEventListener('input', (e) => {

      if(input.tagName == 'SELECT') {
        for(let option of input.options) {
          if(document.getElementById(`${input.id}-${option.value}`) === null) continue;
          document.getElementById(`${input.id}-${option.value}`).classList.add('hidden')
        };

          if(document.getElementById(`${input.id}-${input.value}`) !== null) {

            let svgElem     = document.getElementById(`${input.id}-${input.value}`),
                pickColor   = input.nextElementSibling.value,
                colorTarget = (svgElem.children[0].tagName == 'line' || svgElem.children[0].tagName == 'path') ? 'stroke' : 'fill';

            // Show & Paint
            svgElem.classList.remove('hidden');
            svgElem.setAttribute(colorTarget, pickColor);

          }

      } else if (input.tagName == 'INPUT') {

        if(input.getAttribute('type') == 'color') {

          let svgElem     = document.getElementById(`${input.previousElementSibling.id}-${input.previousElementSibling.value}`),
              colorTarget = (svgElem.children[0].tagName == 'line' || svgElem.children[0].tagName == 'path') ? 'stroke' : 'fill';

          if(svgElem !== null) { svgElem.setAttribute(colorTarget, input.value); }

          if(input.previousElementSibling.getAttribute('type') == 'text') {
            document.getElementById(`${input.previousElementSibling.id}-text`).setAttribute('fill', input.value);
          }

        } else if(input.getAttribute('type') == 'text') {
          if(!(input.value.length > 20 )) svgText.textContent = input.value;
        }

      }

    });
  });

  let mouseDown = false;
  let shiftX, shiftY;

  let scale     = 1,
      scaleView = document.getElementById('avatar-scale');

  svgContainer.addEventListener('mousedown', (e)=>{
    let props = avatar.getBoundingClientRect();

    mouseDown = true;

    shiftX = e.pageX - props.left;
    shiftY = e.pageY - props.top;
  });

  svgContainer.addEventListener('mouseup', (e)=>{ mouseDown = false; });
  svgContainer.addEventListener('mousemove', (e)=>{

    let props = avatar.getBoundingClientRect();

    if(mouseDown) {
      avatar.style.left = e.x - shiftX;
      avatar.style.top  = e.y - shiftY;
    }
  });
  svgContainer.addEventListener('wheel', (e)=>{

    if(e.deltaY < 0 && scale <= 2) {
      scale += 0.05;
      avatar.style.transform = `scale(${scale})`;
    } else if(e.deltaY > 0  && scale >= .3){
      scale -= 0.05;
      avatar.style.transform = `scale(${scale})`;
    }

    scaleView.textContent = scale.toFixed(2);

  });

});
