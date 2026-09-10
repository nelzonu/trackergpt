const WEBAPP_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE';

document.getElementById('date').valueAsDate = new Date();

async function saveExpense(){
 const payload={
   date:date.value,
   amount:amount.value,
   category:category.value,
   notes:notes.value
 };

 await fetch(WEBAPP_URL,{
   method:'POST',
   mode:'cors',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(payload)
 });

 loadHistory();
 notes.value='';
 amount.value='';
}

async function loadHistory(){
 const res = await fetch(WEBAPP_URL);
 const data = await res.json();

 localStorage.setItem('history',JSON.stringify(data));
 render(data);
}

function filterHistory(){
 const month=document.getElementById('monthFilter').value;
 const data=JSON.parse(localStorage.getItem('history')||'[]');

 if(!month){render(data);return;}

 render(data.filter(x=>x.date.startsWith(month)));
}

function render(data){
 history.innerHTML=data.reverse().map(x=>
 `<div class="card">
 <b>Rp ${Number(x.amount).toLocaleString('id-ID')}</b><br>
 ${x.category}<br>
 ${x.date}<br>
 ${x.notes||''}
 </div>`
 ).join('');
}

loadHistory();
