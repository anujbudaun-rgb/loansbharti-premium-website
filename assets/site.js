document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.querySelector('.menu-toggle'), menu=document.querySelector('.mobile-menu');
 if(toggle&&menu) toggle.addEventListener('click',()=>{menu.classList.toggle('open');toggle.setAttribute('aria-expanded',menu.classList.contains('open')?'true':'false')});
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const amount=document.getElementById('calcAmount'), rate=document.getElementById('calcRate'), years=document.getElementById('calcYears');
 function calculate(){
  if(!amount||!rate||!years)return;
  const p=Number(amount.value)||0, r=(Number(rate.value)||0)/1200, n=(Number(years.value)||1)*12;
  const emi=r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  const fmt=v=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(Math.max(0,v));
  const out=document.getElementById('calcEmi'); if(out)out.textContent=fmt(emi);
  const amtOut=document.getElementById('calcAmountOut');if(amtOut)amtOut.textContent=fmt(p);
  const rateOut=document.getElementById('calcRateOut');if(rateOut)rateOut.textContent=(Number(rate.value)||0).toFixed(1)+'%';
  const yearOut=document.getElementById('calcYearsOut');if(yearOut)yearOut.textContent=years.value+' years';
  const totalOut=document.getElementById('calcTotal');if(totalOut)totalOut.textContent=fmt(emi*n);
  const intOut=document.getElementById('calcInterest');if(intOut)intOut.textContent=fmt(emi*n-p);
 }
 [amount,rate,years].forEach(el=>el&&el.addEventListener('input',calculate));calculate();
 document.querySelectorAll('form[data-lead-form]').forEach(form=>{
  form.addEventListener('submit',e=>{
   e.preventDefault();
   const data=Object.fromEntries(new FormData(form).entries());
   const subject=encodeURIComponent('New LoansBharti enquiry - '+(data.name||'Website lead'));
   const body=encodeURIComponent('New enquiry from LoansBharti website\\n\\n'+Object.entries(data).map(([k,v])=>k+': '+v).join('\\n'));
   const msg=form.querySelector('.form-message');if(msg){msg.style.display='block';msg.textContent='Your email app will open to send this enquiry. Please press Send to complete submission.'}
   window.location.href='mailto:care@loansbharti.com?subject='+subject+'&body='+body;
  });
 });
});
