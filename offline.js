'use strict';
(()=>{
 const status=document.getElementById('offline-status'),install=document.getElementById('install-app'),update=document.getElementById('update-app');
 let promptEvent=null,registration=null,ready=false,installError=false;
 function render(){
  if(location.protocol==='file:'){status.textContent='Offline PC copy · keep this folder together';return;}
  status.textContent=ready?(navigator.onLine?'Ready for offline use on this device':'Offline · using your saved app'):installError?'Offline setup unavailable · use the PC download':navigator.onLine?'Preparing offline copy…':'Offline copy is not ready on this device';
 }
 function showUpdate(worker){update.hidden=false;update.onclick=()=>{update.disabled=true;worker.postMessage({type:'ACTIVATE_UPDATE'});};}
 let reloadOnChange=false;
 navigator.serviceWorker?.addEventListener('controllerchange',()=>{if(reloadOnChange)location.reload();});
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;install.hidden=false;});
 install.onclick=async()=>{if(!promptEvent)return;await promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;install.hidden=true;};
 window.addEventListener('appinstalled',()=>{install.hidden=true;toast('Forma installed on this device');});
 document.getElementById('offline-help').onclick=()=>modal(`<p class="eyebrow">TAKE YOUR STUDIO WITH YOU</p><h2>Use Forma without internet.</h2><p><strong>On this device:</strong> open the app online and wait until the top bar says “Ready for offline use.” On iPhone or iPad, use Safari’s Share menu → Add to Home Screen, then open the new icon online once and check that it is ready. On Android or desktop, use Install app when offered, or your browser’s install menu.</p><p>Then open the same URL or Home Screen icon without internet. You can edit, save, review selected files, and export handoffs offline. Your browser can remove cached data, so export project and change-plan backups.</p><p><strong>On your PC:</strong> use Download for PC, extract the entire ZIP, and open index.html in Chrome, Edge, or Firefox. Keep the files together. No installation or internet is needed for this copy.</p><p>Each device keeps its own saves. Export a project or change plan, transfer the file, and open it on the other device. Media must be selected again. Unreal assets and live game testing still happen on your Unreal PC.</p><p><a href="forma-github-pages.zip" download>Download GitHub copy (online)</a> · <a href="GITHUB_PAGES.md" download>GitHub Pages instructions</a> · <a href="OFFLINE.md" download>Offline instructions</a></p>`);
 window.addEventListener('online',render);window.addEventListener('offline',render);
 if(location.protocol==='file:'){document.querySelector('.pc-download').hidden=true;render();return;}
 if(!('serviceWorker' in navigator)||!window.isSecureContext){installError=true;render();return;}
 async function checkOffline(worker){
  if(!worker)return;const channel=new MessageChannel();const result=new Promise(resolve=>{const timer=setTimeout(()=>resolve(false),10000);channel.port1.onmessage=e=>{clearTimeout(timer);channel.port1.close();resolve(e.data?.ready===true);};});
  worker.postMessage({type:'OFFLINE_STATUS'},[channel.port2]);ready=await result;render();
 }
 navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(async r=>{
  registration=r;if(r.waiting){reloadOnChange=true;showUpdate(r.waiting);}
  r.addEventListener('updatefound',()=>{const worker=r.installing;if(!worker)return;worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller){reloadOnChange=true;showUpdate(worker);}if(worker.state==='redundant'&&!ready){installError=true;render();}});});
  const active=await navigator.serviceWorker.ready;await checkOffline(active.active);
 }).catch(()=>{installError=true;render();});
 render();
})();
