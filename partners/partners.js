var API_BASE="https://codes.visago.dev";var currentPartner=null;
var urlParams=new URLSearchParams(window.location.search);
var refParam=urlParams.get("ref");
if(refParam){document.getElementById("appReferredBy").value=refParam}
function switchTab(t){document.querySelectorAll(".dash-tab").forEach(function(el){el.classList.remove("active")});document.querySelectorAll(".tab-content").forEach(function(el){el.classList.remove("active")});event.target.classList.add("active");document.getElementById("tab-"+t).classList.add("active");if(t==="leaderboard")loadLeaderboard();if(t==="materials")loadMaterials()}
async function submitApplication(){
    var name=document.getElementById("appName").value.trim();var email=document.getElementById("appEmail").value.trim();
    var partnerType=document.getElementById("appType").value;var platform=document.getElementById("appPlatform").value.trim();
    var audienceSize=document.getElementById("appAudience").value;var website=document.getElementById("appWebsite").value.trim();
    var message=document.getElementById("appMessage").value.trim();var referredBy=document.getElementById("appReferredBy").value.trim();
    var errorEl=document.getElementById("appError");var btn=document.getElementById("submitAppBtn");
    errorEl.textContent="";
    if(!name||!email||!partnerType){errorEl.textContent="Please fill in name, email, and partner type.";return}
    if(!email.includes("@")||!email.includes(".")){errorEl.textContent="Please enter a valid email.";return}
    btn.disabled=true;btn.textContent="Submitting...";
    try{var res=await fetch(API_BASE+"/partner/apply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name,email:email,partner_type:partnerType,platform:platform,audience_size:audienceSize,website:website,message:message,referred_by:referredBy})});
    var data=await res.json();if(data.status==="ok"){document.getElementById("applicationForm").style.display="none";document.getElementById("applicationSuccess").style.display="block"}else{errorEl.textContent=data.message||"Something went wrong."}}catch(e){errorEl.textContent="Connection error. Try again."}
    btn.disabled=false;btn.textContent="Submit Application"}
function showLogin(){document.getElementById("landingPage").classList.add("hidden");document.getElementById("loginSection").classList.add("active");document.getElementById("dashboard").classList.remove("active")}
function showLanding(){document.getElementById("landingPage").classList.remove("hidden");document.getElementById("loginSection").classList.remove("active");document.getElementById("dashboard").classList.remove("active")}
function showDashboard(){document.getElementById("landingPage").classList.add("hidden");document.getElementById("loginSection").classList.remove("active");document.getElementById("dashboard").classList.add("active");document.getElementById("partnerName").textContent=currentPartner.partner_name;document.getElementById("referralLink").textContent="visago.dev/r/"+currentPartner.id;document.getElementById("inviteLink").textContent="visago.dev/partners/?ref="+currentPartner.id}
async function login(){var partnerId=document.getElementById("partnerId").value.trim().toLowerCase();var pin=document.getElementById("partnerPin").value.trim();var errorEl=document.getElementById("loginError");var btn=document.getElementById("loginBtn");errorEl.textContent="";btn.disabled=true;btn.textContent="Signing in...";
try{var res=await fetch(API_BASE+"/partner/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({partner_id:partnerId,pin:pin})});var data=await res.json();if(data.status==="ok"){currentPartner={id:partnerId,pin:pin,...data.partner};showDashboard();loadStats()}else{errorEl.textContent=data.message||"Invalid credentials."}}catch(e){errorEl.textContent="Connection error."}
btn.disabled=false;btn.textContent="Sign In"}
function logout(){currentPartner=null;document.getElementById("partnerId").value="";document.getElementById("partnerPin").value="";showLanding()}
function copyLink(){navigator.clipboard.writeText("https://visago.dev/r/"+currentPartner.id).then(function(){var b=document.querySelector(".copy-btn");b.textContent="Copied!";setTimeout(function(){b.textContent="Copy Link"},2000)})}
function copyInvite(){navigator.clipboard.writeText("https://visago.dev/partners/?ref="+currentPartner.id).then(function(){var b=document.querySelector(".invite-copy");b.textContent="Copied!";setTimeout(function(){b.textContent="Copy"},2000)})}
async function loadStats(){try{var res=await fetch(API_BASE+"/partner/stats",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({partner_id:currentPartner.id,pin:currentPartner.pin})});var data=await res.json();if(data.status!=="ok")return;
document.getElementById("totalClicks").textContent=(data.partner.total_clicks||0).toLocaleString();
var mt=data.current_month.total||0;var pt=data.previous_month.total||0;document.getElementById("monthClicks").textContent=mt.toLocaleString();
if(pt>0){var ch=Math.round(((mt-pt)/pt)*100);var ce=document.getElementById("monthChange");ce.textContent=(ch>=0?"+":"")+ch+"% vs last month";ce.className="stat-change "+(ch>=0?"up":"down")}
document.getElementById("totalConversions").textContent=data.conversions.total||0;
var tc=data.partner.total_clicks||0;if(tc>0){document.getElementById("conversionRate").textContent=((data.conversions.total/tc)*100).toFixed(1)+"% rate"}
var e=data.conversions.total_commission||0;document.getElementById("totalEarnings").textContent="$"+e.toFixed(2);
var pe=data.conversions.pending_payout||0;if(pe>0){document.getElementById("pendingPayout").textContent="$"+pe.toFixed(2)+" pending"}
document.getElementById("partnersReferred").textContent=data.partner.partners_referred||0;
document.getElementById("androidClicks").textContent=data.current_month.android||0;
document.getElementById("iosClicks").textContent=data.current_month.ios||0;
document.getElementById("desktopClicks").textContent=data.current_month.desktop||0;
renderClickChart(data.current_month.days||{},data.previous_month.days||{});renderConversions(data.conversions.recent||[])
}catch(e){console.error("Stats error:",e)}}
function loadMaterials(){var g=document.getElementById("materialGrid");var id=currentPartner.id;var name=encodeURIComponent(currentPartner.partner_name);var code=currentPartner.promo_code||"";var base="/materials/";var q="?ref="+id+"&name="+name+(code?"&code="+encodeURIComponent(code):"");
g.innerHTML='<p style="font-size:13px;color:var(--orange);font-weight:600;margin-bottom:12px;grid-column:1/-1">PRINT MATERIALS (light background, ink-friendly)</p><div class="material-card" onclick="window.open(\''+base+'poster.html'+q+'\',\'_blank\')"><div class="mat-icon">📋</div><h4>A4 Poster</h4><p>Print-ready poster with QR code and referral code.</p><a href="'+base+'poster.html'+q+'" target="_blank">Open &rarr;</a></div><div class="material-card" onclick="window.open(\''+base+'desk-card.html'+q+'\',\'_blank\')"><div class="mat-icon">🪧</div><h4>Desk Card</h4><p>Tent card for reception desks and counters.</p><a href="'+base+'desk-card.html'+q+'" target="_blank">Open &rarr;</a></div><div class="material-card" onclick="window.open(\''+base+'sticker.html'+q+'\',\'_blank\')"><div class="mat-icon">🏷️</div><h4>Sticker Sheet</h4><p>4 circular stickers per page. Cut and stick.</p><a href="'+base+'sticker.html'+q+'" target="_blank">Open &rarr;</a></div><p style="font-size:13px;color:var(--orange);font-weight:600;margin-bottom:12px;margin-top:16px;grid-column:1/-1">DIGITAL MATERIALS (dark background, for screens)</p><div class="material-card" onclick="window.open(\''+base+'social.html'+q+'\',\'_blank\')"><div class="mat-icon">📱</div><h4>Social Media Cards</h4><p>Instagram feed post + story template with your QR.</p><a href="'+base+'social.html'+q+'" target="_blank">Open &rarr;</a></div><p style="font-size:13px;color:var(--orange);font-weight:600;margin-bottom:12px;margin-top:16px;grid-column:1/-1">EMAIL TEMPLATES &amp; CAPTIONS</p><div class="material-card" onclick="window.open(\''+base+'emails.html'+q+'\',\'_blank\')"><div class="mat-icon">✉️</div><h4>Email Templates</h4><p>Agency, hostel, insurance, co-work, and social captions with your code.</p><a href="'+base+'emails.html'+q+'" target="_blank">Open &rarr;</a></div>'}
async function loadLeaderboard(){var el=document.getElementById("leaderboardList");el.innerHTML='<div class="conv-empty">Loading...</div>';
try{var res=await fetch(API_BASE+"/leaderboard");var data=await res.json();if(data.status!=="ok")return;
if(data.leaderboard.length===0){el.innerHTML='<div class="conv-empty">No partners yet. Be the first!</div>';return}
el.innerHTML=data.leaderboard.map(function(p,i){var rank=i+1;var rc=rank<=1?"gold":rank<=2?"silver":rank<=3?"bronze":"normal";
return '<div class="lb-row"><div class="lb-rank '+rc+'">'+rank+'</div><div class="lb-name">'+p.name+'<div class="lb-type">'+p.type+'</div></div><div class="lb-clicks">'+p.clicks+' clicks</div></div>'}).join("")
}catch(e){el.innerHTML='<div class="conv-empty">Could not load leaderboard.</div>'}}
function renderClickChart(cd,pd){var el=document.getElementById("clickChart");var today=new Date();var days=[];for(var i=13;i>=0;i--){var d=new Date(today);d.setDate(d.getDate()-i);var k=d.toISOString().split("T")[0];var l=d.toLocaleDateString("en",{month:"short",day:"numeric"});days.push({key:k,label:l,clicks:cd[k]||pd[k]||0})}
var mx=Math.max.apply(null,days.map(function(d){return d.clicks}).concat([1]));el.innerHTML=days.map(function(d){return '<div class="chart-bar-row"><div class="chart-bar-label">'+d.label+'</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:'+(d.clicks/mx*100)+'%"></div></div><div class="chart-bar-value">'+d.clicks+'</div></div>'}).join("")}
function renderConversions(r){var el=document.getElementById("conversionsTable");if(r.length===0){el.innerHTML='<div class="conv-empty">No conversions yet. Share your referral link!</div>';return}
el.innerHTML='<table class="conv-table"><thead><tr><th>Date</th><th>Plan</th><th>Revenue</th><th>Commission</th></tr></thead><tbody>'+r.map(function(c){return '<tr><td>'+c.date+'</td><td>'+c.plan+'</td><td>$'+(c.revenue||0).toFixed(2)+'</td><td>$'+(c.commission||0).toFixed(2)+'</td></tr>'}).join("")+'</tbody></table>'}
document.getElementById("partnerPin").addEventListener("keyup",function(e){if(e.key==="Enter")login()});
document.getElementById("partnerId").addEventListener("keyup",function(e){if(e.key==="Enter")document.getElementById("partnerPin").focus()});
