document.addEventListener('DOMContentLoaded', ()=>{

  'use strict';

  let svgContainer = document.getElementById('svg-container');

  let form      = document.getElementById('options'),
      inputs    = form.querySelectorAll('input, select');

  let closeBtn  =  form.querySelector('#closeOptions');

  inputs.forEach( input => {

    input.addEventListener('input', e => {

      if(input.tagName == 'SELECT') {
        for(let option of input.options) {
          if(document.getElementById(`${input.id}-${option.value}`) === null) continue;
          document.getElementById(`${input.id}-${option.value}`).classList.add('hidden')
        };

          if(document.getElementById(`${input.id}-${input.value}`) !== null) {
            document.getElementById(`${input.id}-${input.value}`).classList.remove('hidden');
            document.getElementById(`${input.id}-${input.value}`).setAttribute('fill', input.nextElementSibling.value);
          }

      } else if (input.tagName == 'INPUT') {
        if(input.getAttribute('type') == 'color' && document.getElementById(`${input.previousElementSibling.id}-${input.previousElementSibling.value}`) !== null) {
          document.getElementById(`${input.previousElementSibling.id}-${input.previousElementSibling.value}`).setAttribute('fill', input.value);
        }
      }


    });
  });

  let mouseDown = false;
  let shiftX, shiftY;


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

});
