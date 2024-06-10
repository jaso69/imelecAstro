try{
  const resol = document.querySelector('#respuesta')
  const preg = document.querySelector('#pregunta')
  const loading = document.querySelector('#wait')
  const pregunta = document.querySelector('#pregunta');
  const boton = document.querySelector('#boton')
  let prompt = {}
  let question = ''
  //let message = []
  let url;
  
  
  boton.addEventListener('click', (event) => {
      event.preventDefault();
      if(resol) resol.innerHTML = ''
      const p = String(pregunta.value)
      if(p.length < 1) return
      resol.value = ''
      question = p
      preg.innerHTML = question 
      pregunta.value = ''
      prompt = {prompt: p}
      //message.push(prompt)
      loading.classList.remove('hidden')
      url = 'https://jaweb.es:3000/api/imelec?prompt=' + p
      Nuevo(prompt)
  })
  
  
  const respuesta = (resp) => {
      loading.classList.add('hidden')
      //preg.innerHTML = question + ' ' + '?'
      if(resp.message){
          resol.innerHTML = resp.message;
      } else {
          resol.innerHTML = 'Lamentamos no poder responder en este momento, pruebe en unos minutos.'
      }
  
  }
  
  const inicio = () => {
      resol.innerHTML = '¡Hola! Soy <span class="font-semibold text-yellow-400">Cloe</span>, el asistente virtual de Imelec Electricidad. ¿En qué puedo ayudarte hoy?'
  }
  
  async function Nuevo (prompt){
      const data = await fetch( url, 
          {   method: 'POST',
              mode: 'cors',
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify( prompt ) 
          })
      const resp = await data.json()
      respuesta(resp)
  }
  
  inicio()
}
catch{
  location.reload();
}
