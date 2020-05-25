document.addEventListener('DOMContentLoaded', ()=>{

  'use strict';



  let form      = document.getElementById('options'),
      inputs    = form.querySelectorAll('input, select');

  let closeBtn  =  form.querySelector('#closeOptions');

  inputs.forEach( input => {

    input.addEventListener('change', e => {

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
});
