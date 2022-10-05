const scriptURL = 'https://script.google.com/macros/s/AKfycbx-7zmDH_4EZMNV9wmhddY8QU3oWGfQCT3BS_xu6dzY2HGWgrjRepTqWMvDBx7ccHOceQ/exec';
const form = document.forms['submit-form'];
const formClass = form.className;
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const spinnerForm = document.querySelector('.spinner-border');
const divReplayForm = document.querySelector('#replayForm');
const divReplayFormClass = divReplayForm.className;
var language = document.getElementsByTagName("html")[0].getAttribute("lang");

// window.onload = ()=>{
//   loadPageBar();
// }

// const loadPageBar = ()=>{
//   var bar = document.querySelector('.progress-bar');
//   let loadFun;
//   let i = 0;
//   loadFun = setInterval(()=>{
//     i++;
//     bar.style.width = i+'%';
//     bar.ariaValueNow = i;
//     bar.innerHTML = i+'%';
//     if (i == 100){
//       document.querySelector(".progress").style.display = 'none';
//       clearInterval(loadFun);
//       loadFun = null;
//       let page = document.querySelector('.container-fluid');
//       page.className = "container-fluid";
//     }
//   }, 20)
  
// };

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const displayForm = () => {
  form.className = formClass;
  form.reset();
  divReplayForm.className = 'd-none';
  const alertPlaceholder = document.querySelector('.alert');
  alertPlaceholder.querySelector('button').click();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let spinnerClass = spinnerForm.className;
  form.className = 'd-none';
  spinnerForm.className = spinnerClass.replace("d-none", "");
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      alert('Thanks for contacting me. I will answer promptly. Good day! ☺', 'success');
      spinnerForm.className = spinnerClass + ' d-none';
      divReplayForm.className = divReplayFormClass.replace("d-none", "");
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert('Oops, something went wrong. Please try again', 'danger');
      form.reset();
      spinnerForm.className = spinnerClass + ' d-none';
      divReplayForm.className = divReplayFormClass.replace("d-none", "");
    })
  
})
