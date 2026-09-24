
const MOM_PHONE='14439703084';
const MOM_PHONE_DISPLAY='443-970-3084';
const MOM_EMAIL='Rubivasquezde1980@gmail.com';
let currentLang='en';
function setLanguage(lang){
  currentLang=lang;
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-en][data-es]').forEach(el=>{el.textContent=el.dataset[lang]});
  document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{
    const map=lang==='es'?el.getAttribute('data-es-placeholder'):el.getAttribute('data-en-placeholder');
    if(map) el.placeholder=map;
  });
  document.querySelectorAll('option[data-en-option]').forEach(o=>o.textContent=lang==='es'?o.dataset.esOption:o.dataset.enOption);
  document.getElementById('langBtn').textContent=lang==='en'?'ES · Español':'EN · English';
  document.getElementById('langBtn').setAttribute('aria-label',lang==='en'?'Switch to Spanish':'Cambiar a inglés');
}
setLanguage('en');
document.getElementById('langBtn').addEventListener('click',()=>setLanguage(currentLang==='en'?'es':'en'));
document.getElementById('year').textContent=new Date().getFullYear();
function v(id){return document.getElementById(id).value.trim()}
function bookingBody(){
 const labels=currentLang==='es'?{req:'Hola Rubi, me gustaría solicitar una cotización de limpieza.',name:'Nombre',phone:'Teléfono',home:'Casa',service:'Servicio',date:'Fecha preferida',notes:'Notas'}:{req:'Hi Rubi, I’d like to request a cleaning quote.',name:'Name',phone:'Phone',home:'Home',service:'Service',date:'Preferred date',notes:'Notes'};
 return `${labels.req}

${labels.name}: ${v('name')||'-'}
${labels.phone}: ${v('phone')||'-'}
${labels.home}: ${v('beds')} bedroom(s), ${v('baths')} bathroom(s)
${labels.service}: ${document.getElementById('service').value}
${labels.date}: ${v('date')||'-'}
${labels.notes}: ${v('notes')||'-'}`;
}
document.getElementById('textBooking').addEventListener('click',()=>{window.location.href='sms:'+MOM_PHONE+'&body='+encodeURIComponent(bookingBody())});
document.getElementById('emailBooking').addEventListener('click',()=>{const subject=currentLang==='es'?'Solicitud de cotización de limpieza':'Cleaning Quote Request';window.location.href='mailto:'+MOM_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(bookingBody())});
document.getElementById('applyBtn').addEventListener('click',()=>{
 const age=Number(v('appAge'));
 if(!age || age<18){alert(currentLang==='es'?'Los solicitantes deben tener 18 años o más.':'Applicants must be 18 or older.');return;}
 const name=v('appName'),phone=v('appPhone'),availability=v('appAvailability'),experience=v('appExperience');
 const subject=currentLang==='es'?`Solicitud de empleo - ${name||'Solicitante'}`:`Rubi's Gleam Team Job Application - ${name||'Applicant'}`;
 const intro=currentLang==='es'?'Hola Rubi, estoy solicitando unirme a Rubi's Gleam Team.':'Hi Rubi, I am applying to join Rubi's Gleam Team.';
 const body=`${intro}

Name / Nombre: ${name||'-'}
Phone / Teléfono: ${phone||'-'}
Age / Edad: ${age}
Availability / Disponibilidad: ${availability||'-'}
Experience / Experiencia: ${experience||'-'}`;
 window.location.href='mailto:'+MOM_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
});
