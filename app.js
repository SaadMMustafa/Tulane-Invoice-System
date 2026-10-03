import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, orderBy, runTransaction, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const ADMIN_EMAIL = "amnytalmhdy@gmail.com";
const LOGO_DATA = "data:image/png;base64,...";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDZYhg8Fmc-ZKfFE5_RbtW84fBOrNSetLM",
  authDomain: "tulane-invoice-system.firebaseapp.com",
  projectId: "tulane-invoice-system",
  storageBucket: "tulane-invoice-system.firebasestorage.app",
  messagingSenderId: "1055111748634",
  appId: "1:1055111748634:web:32a4c79b9e9ec4d275c5a3"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, orderBy, runTransaction, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const ADMIN_EMAIL = "amnytalmhdy@gmail.com";
const LOGO_DATA = "data:image/png;base64,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";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDZYhg8fC9f1QwZJ0QxJp1BvW84fBOrNSetLM",
  authDomain: "tulane-invoice-system.firebaseapp.com",
  projectId: "tulane-invoice-system",
  storageBucket: "tulane-invoice-system.firebasestorage.app",
  messagingSenderId: "1055111748634",
  appId: "1:1055111748634:web:32a4c79b9e9ec4d275c5a3"
};

const DEMO_MODE = Object.values(FIREBASE_CONFIG).some(v => String(v).includes("YOUR_"));
const state = { user:null, demo:DEMO_MODE, settings:null, products:[], customers:[], invoices:[], editingInvoiceId:null, charts:{}, inlineAddContext:null, access:null };
const DEFAULT_SETTINGS = {
  businessName:"TULANE", businessSubtitle:"د/ أمنية المهدي", businessPhone:"", businessEmail:"", businessAddress:"", taxNumber:"",
  invoicePrefix:"INV-", nextNumber:1, currency:"ج.م", footerNote:"شكرًا لتعاملك معنا. نتمنى لك تجربة جميلة.",
  showLogo:true, showBusinessName:true, showBusinessSubtitle:true, showBusinessPhone:true, showBusinessEmail:true, showBusinessAddress:true, showTaxNumber:true,
  showInvoiceTitle:true, showInvoiceNumber:true, showCustomerName:true, showCustomerPhone:true, showIssueDate:true, showDueDate:true, showPaymentStatus:true,
  showPaymentMethod:true, showPaidAmount:false, showColumnProduct:true, showColumnQty:true, showColumnPrice:true, showColumnTotal:true,
  showSubtotal:true, showSummaryDiscount:true, showSummaryTax:true, showSummaryShipping:true, showFinalTotal:true, showRemaining:true, showNotesPrint:true, showFooterNote:true,
  enableCustomers:true, enableInventory:true, enableDiscounts:true, enableTax:true, enableShipping:true, enableNotes:true,
  memberNavDashboard:true, memberNavInvoices:true, memberNavProducts:true, memberNavCustomers:true, memberNavReports:true,
  memberStatTotalSales:true, memberStatPaid:true, memberStatRemaining:true, memberStatMonthSales:true, memberStatInvoiceCount:true, memberStatCustomerCount:true, memberStatProductCount:true, memberStatAverageInvoice:true,
  memberDashboardSalesChart:true, memberDashboardRecentInvoices:true, memberDashboardTopProducts:true, memberDashboardStockAlerts:true,
  memberReportSales:true, memberReportPayment:true, memberReportProducts:true, memberReportCustomers:true,
  memberReportStatSales:true, memberReportStatPaid:true, memberReportStatRemaining:true, memberReportStatAverage:true
};

const $ = id => document.getElementById(id);
const money = n => `${Number(n||0).toLocaleString('ar-EG',{minimumFractionDigits:2,maximumFractionDigits:2})} ${state.settings?.currency||'ج.م'}`;
const localDate = d => d ? new Date(d).toISOString().slice(0,10) : new Date().toISOString().slice(0,10);
const uid = () => Math.random().toString(36).slice(2)+Date.now().toString(36);
const escapeHtml = v => String(v ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const statusLabel = s => s==='paid'?'مدفوعة':s==='partial'?'جزئيًا':'غير مدفوعة';
const statusClass = s => s==='paid'?'status-paid':s==='partial'?'status-partial':'status-unpaid';

let fb = {};
if (!state.demo) {
  const app = initializeApp(FIREBASE_CONFIG);
  fb.auth = getAuth(app);
  fb.db = getFirestore(app);
  fb.provider = new GoogleAuthProvider();
}

function setLogoImages() {
  document.querySelectorAll('img[alt="TULANE"],img[alt="logo"]').forEach(img=>img.src=LOGO_DATA);
  $('favicon').href=LOGO_DATA;
}
function toast(message,type='success') {
  const el=document.createElement('div'); el.className=`toast ${type}`; el.textContent=message;
  $('toast-container').appendChild(el); setTimeout(()=>el.remove(),3000);
}
function showScreen(id) {
  ['loading-screen','auth-screen','app'].forEach(x=>$(x).classList.add('hidden'));
  $(id).classList.remove('hidden');
}
function openModal(id){$(id).classList.remove('hidden')}
function closeModal(id){$(id).classList.add('hidden')}
function userRoot(){return `users/${state.user.uid}`}
function col(name){return collection(fb.db, name)}
function dref(name,id){return doc(fb.db, `${name}/${id}`)}
function appSettingsRef(){return doc(fb.db,'appConfig/settings')}
function invoiceCounterRef(){return doc(fb.db,'appConfig/invoiceCounter')}
function accessRef(uid=state.user?.uid){return doc(fb.db,`accessRequests/${uid}`)}
function isMember(user=state.user){return !!user && !isAdmin(user)}
function memberVisible(key){return isAdmin() || !!state.settings?.[key]}
function canManageSharedData(){return !!state.access?.approved}
function canEditSharedData(){return isAdmin()}
function demoKey(name){return `tulane_demo_${name}`}
function demoRead(name){return JSON.parse(localStorage.getItem(demoKey(name))||'[]')}
function demoWrite(name,data){localStorage.setItem(demoKey(name),JSON.stringify(data))}
function mergeSettings(s){return {...DEFAULT_SETTINGS,...(s||{})}}
function isAdmin(user=state.user){return String(user?.email||'').toLowerCase()===ADMIN_EMAIL.toLowerCase()}
async function ensureAccess(user){
  if(state.demo){state.access={approved:true,role:'admin',status:'approved'};return state.access}
  const ref=accessRef(user.uid);
  const snap=await getDoc(ref);
  if(isAdmin(user)){
    const payload={uid:user.uid,email:user.email||'',displayName:user.displayName||'',photoURL:user.photoURL||'',role:'admin',status:'approved',approved:true,updatedAt:serverTimestamp()};
    if(!snap.exists()||snap.data().status!=='approved')await setDoc(ref,{...payload,createdAt:snap.exists()?snap.data().createdAt||serverTimestamp():serverTimestamp()},{merge:true});
    state.access={approved:true,role:'admin',status:'approved'};return state.access;
  }
  if(!snap.exists()){
    await setDoc(ref,{uid:user.uid,email:user.email||'',displayName:user.displayName||'',photoURL:user.photoURL||'',role:'member',status:'pending',approved:false,createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
    state.access={approved:false,status:'pending',role:'member'};return state.access;
  }
  const data=snap.data()||{};
  state.access={approved:data.approved===true||data.status==='approved',status:data.status||'pending',role:data.role||'member'};return state.access;
}
function showApprovalScreen(access){
  $('approval-screen').classList.remove('hidden');
  $('approval-email').textContent=state.user?.email||'';
  const pending=access?.status!=='rejected';
  $('approval-title').textContent=pending?'الحساب في انتظار موافقة المدير':'تم رفض طلب الدخول';
  $('approval-message').textContent=pending?'تم تسجيل طلب دخولك بنجاح. سيظهر لك النظام بعد موافقة مدير الحساب.':'تم رفض طلب الدخول لهذا الحساب. راجع مدير النظام إذا كان الرفض غير مقصود.';
}
async function enterApprovedApp(user){state.user=user;state.access={approved:true,role:isAdmin(user)?'admin':'member',status:'approved'};showScreen('app');$('profile-name').textContent=user.displayName||'المستخدم';if(user.photoURL)$('profile-avatar').innerHTML=`<img src="${user.photoURL}" style="width:30px;height:30px;border-radius:50%;object-fit:cover">`;await loadAll();}
async function handleAuthenticatedUser(user){
  if(!user){state.user=null;showScreen('auth-screen');return;}
  try{state.user=user;const access=await ensureAccess(user);if(access.approved){await enterApprovedApp(user)}else showApprovalScreen(access)}
  catch(e){console.error(e);showScreen('auth-screen');toast(e.message||'تعذر التحقق من صلاحية الدخول.','error')}
}

async function migrateLegacyDataIfNeeded(){
  if(state.demo||!isAdmin())return;
  try{
    const oldBase=`users/${state.user.uid}`;
    const [globalSnap,sharedProducts,sharedCustomers,sharedInvoices,oldSettings,oldProducts,oldCustomers,oldInvoices]=await Promise.all([
      getDoc(appSettingsRef()),
      getDocs(collection(fb.db,'products')),
      getDocs(collection(fb.db,'customers')),
      getDocs(collection(fb.db,'invoices')),
      getDoc(doc(fb.db,`${oldBase}/settings/app`)),
      getDocs(collection(fb.db,`${oldBase}/products`)),
      getDocs(collection(fb.db,`${oldBase}/customers`)),
      getDocs(collection(fb.db,`${oldBase}/invoices`))
    ]);
    if(!globalSnap.exists()&&oldSettings.exists())await setDoc(appSettingsRef(),oldSettings.data(),{merge:true});
    if(sharedProducts.empty&&sharedCustomers.empty&&sharedInvoices.empty&&(!oldProducts.empty||!oldCustomers.empty||!oldInvoices.empty)){
      const jobs=[];
      oldProducts.forEach(d=>jobs.push(setDoc(doc(fb.db,`products/${d.id}`),{...d.data(),legacyOwnerUid:state.user.uid},{merge:true})));
      oldCustomers.forEach(d=>jobs.push(setDoc(doc(fb.db,`customers/${d.id}`),{...d.data(),legacyOwnerUid:state.user.uid},{merge:true})));
      oldInvoices.forEach(d=>jobs.push(setDoc(doc(fb.db,`invoices/${d.id}`),{...d.data(),legacyOwnerUid:state.user.uid,createdByUid:d.data().createdByUid||state.user.uid,createdByName:d.data().createdByName||state.user.displayName||state.user.email||'المدير'},{merge:true})));
      await Promise.all(jobs);
    }
  }catch(e){console.warn('Legacy migration skipped:',e.message)}
}

async function loadAll(){
  state.settings=mergeSettings(null);
  await migrateLegacyDataIfNeeded(); state.products=[]; state.customers=[]; state.invoices=[];
  if(state.demo){
    state.settings=mergeSettings(JSON.parse(localStorage.getItem(demoKey('settings'))||'null'));
    state.products=demoRead('products'); state.customers=demoRead('customers'); state.invoices=demoRead('invoices');
  }else{
    const [setSnap,counterSnap,pSnap,cSnap,iSnap] = await Promise.all([
      getDoc(appSettingsRef()),
      getDoc(invoiceCounterRef()),
      getDocs(query(col('products'),orderBy('name'))),
      getDocs(query(col('customers'),orderBy('name'))),
      getDocs(query(col('invoices'),orderBy('createdAt','desc')))
    ]);
    const globalSettings=mergeSettings(setSnap.exists()?setSnap.data():null);
    state.settings=mergeSettings({...globalSettings,nextNumber:counterSnap.exists()?Number(counterSnap.data()?.nextNumber||globalSettings.nextNumber||1):globalSettings.nextNumber});
    state.products=pSnap.docs.map(d=>({id:d.id,...d.data()}));
    state.customers=cSnap.docs.map(d=>({id:d.id,...d.data()}));
    state.invoices=iSnap.docs.map(d=>({id:d.id,...d.data()}));
  }
  applySettingsUI(); renderAll();
}
async function saveSettingsToDb(){
  if(state.demo){localStorage.setItem(demoKey('settings'),JSON.stringify(state.settings));return;}
  await setDoc(appSettingsRef(),{...state.settings,updatedAt:serverTimestamp(),updatedBy:state.user?.uid||''},{merge:true});
  await setDoc(invoiceCounterRef(),{nextNumber:Math.max(1,Number(state.settings.nextNumber||1)),updatedAt:serverTimestamp(),updatedBy:state.user?.uid||''},{merge:true});
}

function applySettingsUI(){
  const s=state.settings;
  $('set-business-name').value=s.businessName||'';$('set-business-subtitle').value=s.businessSubtitle||'';
  $('set-business-phone').value=s.businessPhone||'';$('set-business-email').value=s.businessEmail||'';$('set-business-address').value=s.businessAddress||'';$('set-tax-number').value=s.taxNumber||'';
  $('set-invoice-prefix').value=s.invoicePrefix||'INV-';$('set-next-number').value=s.nextNumber||1;$('set-currency').value=s.currency||'ج.م';$('set-footer-note').value=s.footerNote||'';
  const toggles=[
    ['toggle-logo','showLogo'],['toggle-business-name','showBusinessName'],['toggle-business-subtitle','showBusinessSubtitle'],['toggle-invoice-title','showInvoiceTitle'],['toggle-invoice-number','showInvoiceNumber'],
    ['toggle-business-phone','showBusinessPhone'],['toggle-business-email','showBusinessEmail'],['toggle-business-address','showBusinessAddress'],['toggle-tax-number','showTaxNumber'],
    ['toggle-customer-name','showCustomerName'],['toggle-customer-phone','showCustomerPhone'],['toggle-issue-date','showIssueDate'],['toggle-due-date','showDueDate'],['toggle-payment-status','showPaymentStatus'],['toggle-payment-method','showPaymentMethod'],['toggle-paid-amount','showPaidAmount'],
    ['toggle-column-product','showColumnProduct'],['toggle-column-qty','showColumnQty'],['toggle-column-price','showColumnPrice'],['toggle-column-total','showColumnTotal'],
    ['toggle-subtotal','showSubtotal'],['toggle-summary-discount','showSummaryDiscount'],['toggle-summary-tax','showSummaryTax'],['toggle-summary-shipping','showSummaryShipping'],['toggle-final-total','showFinalTotal'],['toggle-remaining','showRemaining'],['toggle-notes-print','showNotesPrint'],['toggle-footer-note','showFooterNote'],
    ['toggle-customers','enableCustomers'],['toggle-inventory','enableInventory'],['toggle-discounts','enableDiscounts'],['toggle-tax','enableTax'],['toggle-shipping','enableShipping'],['toggle-notes','enableNotes']
  ];
  toggles.forEach(([a,b])=>{const el=$(a);if(el)el.checked=!!s[b]});
  const visibilityToggles=[
    ['toggle-member-dashboard','memberNavDashboard'],['toggle-member-invoices','memberNavInvoices'],['toggle-member-products','memberNavProducts'],['toggle-member-customers','memberNavCustomers'],['toggle-member-reports','memberNavReports'],
    ['toggle-member-stat-total-sales','memberStatTotalSales'],['toggle-member-stat-paid','memberStatPaid'],['toggle-member-stat-remaining','memberStatRemaining'],['toggle-member-stat-month-sales','memberStatMonthSales'],['toggle-member-stat-invoice-count','memberStatInvoiceCount'],['toggle-member-stat-customer-count','memberStatCustomerCount'],['toggle-member-stat-product-count','memberStatProductCount'],['toggle-member-stat-average','memberStatAverageInvoice'],
    ['toggle-member-dashboard-sales','memberDashboardSalesChart'],['toggle-member-dashboard-recent','memberDashboardRecentInvoices'],['toggle-member-dashboard-top-products','memberDashboardTopProducts'],['toggle-member-dashboard-stock','memberDashboardStockAlerts'],
    ['toggle-member-report-sales','memberReportSales'],['toggle-member-report-payment','memberReportPayment'],['toggle-member-report-products','memberReportProducts'],['toggle-member-report-customers','memberReportCustomers'],['toggle-member-report-stat-sales','memberReportStatSales'],['toggle-member-report-stat-paid','memberReportStatPaid'],['toggle-member-report-stat-remaining','memberReportStatRemaining'],['toggle-member-report-stat-average','memberReportStatAverage']
  ];
  visibilityToggles.forEach(([a,b])=>{const el=$(a);if(el)el.checked=!!s[b]});
  $('settings-logo').src=LOGO_DATA;
  document.querySelectorAll('[data-view]').forEach(el=>{
    const v=el.dataset.view;
    if(!isMember()) return;
    const map={dashboard:'memberNavDashboard',invoices:'memberNavInvoices',products:'memberNavProducts',customers:'memberNavCustomers',reports:'memberNavReports'};
    if(map[v] && !s[map[v]]) el.classList.add('hidden');
  });
  const customerNav=document.querySelector('.nav-item[data-view="customers"]');if(customerNav)customerNav.style.display=s.enableCustomers && (!isMember() || s.memberNavCustomers)?'flex':'none';
  const productsNav=document.querySelector('.nav-item[data-view="products"]');if(productsNav)productsNav.style.display=(!isMember() || s.memberNavProducts)?'flex':'none';
  const invoicesNav=document.querySelector('.nav-item[data-view="invoices"]');if(invoicesNav)invoicesNav.style.display=(!isMember() || s.memberNavInvoices)?'flex':'none';
  const reportsNav=document.querySelector('.nav-item[data-view="reports"]');if(reportsNav)reportsNav.style.display=(!isMember() || s.memberNavReports)?'flex':'none';
  const dashNav=document.querySelector('.nav-item[data-view="dashboard"]');if(dashNav)dashNav.style.display=(!isMember() || s.memberNavDashboard)?'flex':'none';
  const settingsNav=document.querySelector('.nav-item[data-view="settings"]');if(settingsNav)settingsNav.style.display=isAdmin()?'flex':'none';
  const adminPanel=$('admin-access-panel');if(adminPanel)adminPanel.classList.toggle('hidden',!isAdmin());
  const memberVisibilityPanel=$('member-visibility-panel');if(memberVisibilityPanel)memberVisibilityPanel.classList.toggle('hidden',!isAdmin());
  const settingsSave=$('save-settings');if(settingsSave)settingsSave.classList.toggle('hidden',!isAdmin());
  const settingsForms=document.querySelectorAll('#view-settings .admin-settings-only');settingsForms.forEach(el=>el.classList.toggle('hidden',!isAdmin()));
  applyConditionalInvoiceFields();
  if(isAdmin())loadAccessRequests();
}

function renderAll(){renderDashboard();renderInvoices();renderProducts();renderCustomers();renderReports();prepareInvoiceForm();}

function statCard(label,value,note,icon){return `<div class="stat-card"><div class="stat-top"><span class="stat-label">${label}</span><span class="stat-icon">${icon}</span></div><div class="stat-value">${value}</div><div class="stat-note">${note||''}</div></div>`}
function inRange(invoice,from,to){const d=String(invoice.date||'').slice(0,10);return (!from||d>=from)&&(!to||d<=to)}
function renderDashboard(){
  const inv=state.invoices.slice();
  const total=inv.reduce((a,b)=>a+Number(b.total||0),0);
  const paid=inv.reduce((a,b)=>a+Number(b.paid||0),0);
  const remaining=Math.max(0,total-paid);
  const thisMonth=inv.filter(i=>String(i.date||'').slice(0,7)===localDate().slice(0,7)).reduce((a,b)=>a+Number(b.total||0),0);
  const avg=inv.length?total/inv.length:0;
  const stats=[
    ['memberStatTotalSales','إجمالي المبيعات',money(total),`${inv.length} فاتورة`,'↗'],
    ['memberStatPaid','المدفوع',money(paid),'إجمالي التحصيل','✓'],
    ['memberStatRemaining','المتبقي',money(remaining),'مبالغ مستحقة','◌'],
    ['memberStatMonthSales','مبيعات الشهر',money(thisMonth),'الشهر الحالي','◷'],
    ['memberStatInvoiceCount','عدد الفواتير',inv.length,'الفواتير المحفوظة','▤'],
    ['memberStatCustomerCount','عدد العملاء',state.customers.length,'قاعدة العملاء','◎'],
    ['memberStatProductCount','عدد المنتجات',state.products.length,'كتالوج المنتجات','◈'],
    ['memberStatAverageInvoice','متوسط الفاتورة',money(avg),'متوسط قيمة البيع','⌁']
  ];
  $('dashboard-stats').innerHTML=stats.filter(x=>memberVisible(x[0])).map(x=>statCard(x[1],x[2],x[3],x[4])).join('');

  const recent=inv.slice(0,5);
  $('recent-invoices').innerHTML=memberVisible('memberDashboardRecentInvoices') ? (recent.length?recent.map(i=>`<div class="mini-item"><div class="mini-main"><span class="mini-badge">${String(i.number||'').slice(-4)}</span><div><div class="mini-title">${escapeHtml(i.customerName||'عميل نقدي')}</div><div class="mini-sub">${escapeHtml(i.number||'')} • ${escapeHtml(i.date||'')}</div></div></div><div class="mini-amount">${money(i.total)}</div></div>`).join(''):`<div class="empty-state">لا توجد فواتير بعد.</div>`) : `<div class="empty-state">تم إخفاء هذه البيانات بواسطة مدير النظام.</div>`;

  const productSales={};
  inv.forEach(i=>(i.items||[]).forEach(it=>{
    const key=it.productId||it.name;
    if(!productSales[key])productSales[key]={name:it.name,qty:0,total:0};
    productSales[key].qty+=Number(it.qty||0); productSales[key].total+=Number(it.lineTotal||0);
  }));
  const tops=Object.values(productSales).sort((a,b)=>b.qty-a.qty).slice(0,5), max=Math.max(1,...tops.map(x=>x.qty));
  $('top-products').innerHTML=memberVisible('memberDashboardTopProducts') ? (tops.length?tops.map((x,n)=>`<div class="rank-row"><span class="rank-num">0${n+1}</span><div><div class="rank-name">${escapeHtml(x.name)}</div><div class="rank-bar"><span style="width:${(x.qty/max)*100}%"></span></div></div><span class="rank-value">${x.qty} قطعة</span></div>`).join(''):`<div class="empty-state">لا توجد بيانات كافية.</div>`) : `<div class="empty-state">تم إخفاء هذه البيانات بواسطة مدير النظام.</div>`;

  const alerts=state.settings.enableInventory?state.products.filter(p=>Number(p.stock||0)<=Number(p.lowStock||0)).sort((a,b)=>Number(a.stock)-Number(b.stock)).slice(0,5):[];
  $('stock-alerts').innerHTML=memberVisible('memberDashboardStockAlerts') ? (state.settings.enableInventory?(alerts.length?alerts.map(p=>`<div class="mini-item"><div class="mini-main"><span class="mini-badge">!</span><div><div class="mini-title">${escapeHtml(p.name)}</div><div class="mini-sub">الحد ${p.lowStock||0}</div></div></div><div class="mini-amount" style="color:${Number(p.stock)<=0?'#c55757':'#b17b32'}">${p.stock||0} قطعة</div></div>`).join(''):`<div class="empty-state">المخزون جيد حاليًا.</div>`):`<div class="empty-state">إدارة المخزون متوقفة من الإعدادات.</div>`) : `<div class="empty-state">تم إخفاء هذه البيانات بواسطة مدير النظام.</div>`;
  const salesPanel=document.querySelector('#sales-chart')?.closest('.chart-panel');if(salesPanel)salesPanel.classList.toggle('hidden',!memberVisible('memberDashboardSalesChart'));
  const recentPanel=document.querySelector('#recent-invoices')?.closest('.panel');if(recentPanel&&memberVisible('memberDashboardRecentInvoices'))recentPanel.classList.remove('hidden');else if(recentPanel)recentPanel.classList.add('hidden');
  const topPanel=document.querySelector('#top-products')?.closest('.panel');if(topPanel&&memberVisible('memberDashboardTopProducts'))topPanel.classList.remove('hidden');else if(topPanel)topPanel.classList.add('hidden');
  const stockPanel=document.querySelector('#stock-alerts')?.closest('.panel');if(stockPanel&&memberVisible('memberDashboardStockAlerts'))stockPanel.classList.remove('hidden');else if(stockPanel)stockPanel.classList.add('hidden');
  if(memberVisible('memberDashboardSalesChart'))drawSalesChart(Number($('sales-period').value||7),'sales-chart');
}
function drawSalesChart(days,canvasId){
  const end=new Date(),labels=[],vals=[];
  for(let i=days-1;i>=0;i--){const d=new Date(end);d.setDate(end.getDate()-i);const key=localDate(d);labels.push(d.toLocaleDateString('ar-EG',{day:'numeric',month:'short'}));vals.push(state.invoices.filter(x=>String(x.date||'')===key).reduce((a,b)=>a+Number(b.total||0),0));}
  const ctx=$(canvasId); if(!ctx)return;
  if(state.charts[canvasId])state.charts[canvasId].destroy();
  state.charts[canvasId]=new Chart(ctx,{type:'line',data:{labels,datasets:[{label:'المبيعات',data:vals,borderColor:'#5e9f5c',backgroundColor:'rgba(130,200,126,.17)',fill:true,tension:.35,pointRadius:3,pointBackgroundColor:'#5e9f5c'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:v=>Number(v).toLocaleString('ar-EG')}},x:{grid:{display:false}}}}});
}

function invoiceNumberPreview(){const prefix=state.settings.invoicePrefix||'INV-';const next=Number(state.settings.nextNumber||1);return `${prefix}${String(next).padStart(4,'0')}`}
function prepareInvoiceForm(existing=null){
  state.editingInvoiceId=existing?.id||null;
  $('invoice-form-title').textContent=existing?'تعديل الفاتورة':'فاتورة جديدة';
  $('invoice-date').value=existing?.date||localDate();
  $('invoice-due-date').value=existing?.dueDate||localDate();
  $('invoice-payment-status').value=existing?.paymentStatus||'paid';
  $('invoice-payment-method').value=existing?.paymentMethod||'cash';
  $('invoice-paid').value=existing?.paid??0;
  $('invoice-discount-type').value=existing?.discountType||'fixed';
  $('invoice-discount').value=existing?.discountRaw??0;
  $('invoice-tax').value=existing?.taxRate??0;
  $('invoice-shipping').value=existing?.shipping??0;
  $('invoice-notes').value=existing?.notes||'';
  populateCustomerSelect(existing?.customerId||'');
  $('invoice-items').innerHTML='';
  const items=existing?.items?.length?existing.items.map(it=>({id:uid(),productId:it.productId||'',name:it.name||'',qty:Number(it.qty||1),price:Number(it.price||0)})):[{id:uid(),productId:'',name:'',qty:1,price:0}];
  items.forEach(addItemRow);
  updateInvoiceTotals();
  $('invoice-number-pill').textContent=existing?.number||invoiceNumberPreview();
  applyConditionalInvoiceFields();
}
function populateCustomerSelect(selected=''){
  const el=$('invoice-customer');
  el.innerHTML=`<option value="">عميل نقدي / بدون تسجيل</option>`+(state.customers.map(c=>`<option value="${c.id}">${escapeHtml(c.name)}${c.phone?' • '+escapeHtml(c.phone):''}</option>`).join(''));
  el.value=selected;
}
function productOptions(selected=''){return `<option value="">اختر منتجًا…</option>`+state.products.map(p=>`<option value="${p.id}" ${p.id===selected?'selected':''}>${escapeHtml(p.name)}${p.code?' • '+escapeHtml(p.code):''}</option>`).join('')}
function addOrSetProductRow(productId,price){
  const rows=[...document.querySelectorAll('#invoice-items .item-row')];
  const empty=rows.find(r=>!r.querySelector('.item-product').value);
  if(empty){empty.querySelector('.item-product').value=productId;empty.querySelector('.item-price').value=price??0;updateRowTotal(empty);updateInvoiceTotals();return;}
  addItemRow({productId,qty:1,price:price??0});
}
function addItemRow(item={}){
  const row=document.createElement('div');row.className='item-row';row.dataset.id=item.id||uid();
  row.innerHTML=`<select class="input item-product">${productOptions(item.productId)}</select><input class="input item-qty" type="number" min="1" step="1" value="${item.qty||1}"><input class="input item-price" type="number" min="0" step="0.01" value="${item.price||0}"><input class="input line-total" type="text" value="0" readonly><button type="button" class="remove-line" title="حذف">×</button>`;
  $('invoice-items').appendChild(row);
  if(item.productId){const prod=state.products.find(p=>p.id===item.productId);if(prod&&!item.price)row.querySelector('.item-price').value=prod.price||0}
  updateRowTotal(row);
  row.addEventListener('input',()=>{updateRowTotal(row);updateInvoiceTotals()});
  row.querySelector('.item-product').addEventListener('change',e=>{const p=state.products.find(x=>x.id===e.target.value);if(p)row.querySelector('.item-price').value=p.price||0;updateRowTotal(row);updateInvoiceTotals()});
  row.querySelector('.remove-line').addEventListener('click',()=>{row.remove();if(!$('invoice-items').children.length)addItemRow();updateInvoiceTotals()});
}
function updateRowTotal(row){const q=Number(row.querySelector('.item-qty').value||0),p=Number(row.querySelector('.item-price').value||0);row.querySelector('.line-total').value=(q*p).toFixed(2)}
function collectItems(){
  return [...document.querySelectorAll('#invoice-items .item-row')].map(row=>{
    const productId=row.querySelector('.item-product').value,p=state.products.find(x=>x.id===productId);
    const qty=Math.max(0,Number(row.querySelector('.item-qty').value||0)),price=Math.max(0,Number(row.querySelector('.item-price').value||0));
    return {productId,name:p?.name||row.querySelector('.item-product').selectedOptions[0]?.textContent||'منتج غير محدد',qty,price,lineTotal:qty*price};
  }).filter(x=>x.qty>0&&x.price>=0&&x.productId)
}
function calcInvoice(){
  const items=collectItems(),subtotal=items.reduce((a,b)=>a+b.lineTotal,0);
  const discountRaw=Math.max(0,Number($('invoice-discount').value||0));
  const discount=$('invoice-discount-type').value==='percent'?subtotal*discountRaw/100:Math.min(discountRaw,subtotal);
  const taxable=Math.max(0,subtotal-discount);
  const tax=state.settings.enableTax?taxable*Math.max(0,Number($('invoice-tax').value||0))/100:0;
  const shipping=state.settings.enableShipping?Math.max(0,Number($('invoice-shipping').value||0)):0;
  const total=taxable+tax+shipping;
  const paid=$('invoice-payment-status').value==='paid'?total:Math.min(Math.max(0,Number($('invoice-paid').value||0)),total);
  return {items,subtotal,discount,discountRaw,tax,taxRate:Number($('invoice-tax').value||0),shipping,total,paid,remaining:total-paid};
}
function updateInvoiceTotals(){renderInvoicePreview(calcInvoice())}
function renderInvoicePreview(t=calcInvoice()){
  const customer=state.customers.find(c=>c.id===$('invoice-customer').value);
  const number=state.editingInvoiceId?(state.invoices.find(i=>i.id===state.editingInvoiceId)?.number||invoiceNumberPreview()):invoiceNumberPreview();
  const s=state.settings;
  const visible=(key)=>s[key]!==false;
  const columns=[
    visible('showColumnProduct')?'<th>المنتج</th>':'',
    visible('showColumnQty')?'<th>الكمية</th>':'',
    visible('showColumnPrice')?'<th>السعر</th>':'',
    visible('showColumnTotal')?'<th>الإجمالي</th>':''
  ].join('');
  const cellCount=[s.showColumnProduct,s.showColumnQty,s.showColumnPrice,s.showColumnTotal].filter(x=>x!==false).length||1;
  const rows=t.items.length?t.items.map(it=>`<tr>${visible('showColumnProduct')?`<td>${escapeHtml(it.name)}</td>`:''}${visible('showColumnQty')?`<td>${it.qty}</td>`:''}${visible('showColumnPrice')?`<td>${Number(it.price).toFixed(2)}</td>`:''}${visible('showColumnTotal')?`<td>${Number(it.lineTotal).toFixed(2)}</td>`:''}</tr>`).join(''):`<tr><td colspan="${cellCount}" style="text-align:center;color:#8a978e">أضف منتجًا إلى الفاتورة</td></tr>`;
  const brandMeta=[
    visible('showBusinessName')?`<h2>${escapeHtml(s.businessName||'TULANE')}</h2>`:'',
    visible('showBusinessSubtitle')&&s.businessSubtitle?`<span class="invoice-subtitle">${escapeHtml(s.businessSubtitle)}</span>`:'',
    visible('showBusinessPhone')&&s.businessPhone?`<span>${escapeHtml(s.businessPhone)}</span>`:'',
    visible('showBusinessEmail')&&s.businessEmail?`<span>${escapeHtml(s.businessEmail)}</span>`:'',
    visible('showBusinessAddress')&&s.businessAddress?`<span>${escapeHtml(s.businessAddress)}</span>`:'',
    visible('showTaxNumber')&&s.taxNumber?`<span>الرقم الضريبي: ${escapeHtml(s.taxNumber)}</span>`:''
  ].join('');
  const titleLeft=visible('showInvoiceTitle')?'<h1>فاتورة بيع</h1>':'';
  const titleRight=[
    visible('showInvoiceNumber')?`<span class="invoice-no">${escapeHtml(number)}</span>`:'',
    visible('showIssueDate')?`<span class="invoice-issue-date">تاريخ الإصدار: ${escapeHtml($('invoice-date').value||localDate())}</span>`:''
  ].join('');
  const customerBox=[
    visible('showCustomerName')?`<div>العميل<strong>${escapeHtml(customer?.name||'عميل نقدي / بدون تسجيل')}</strong></div>`:'',
    visible('showCustomerPhone')?`<div>الهاتف<strong>${escapeHtml(customer?.phone||'—')}</strong></div>`:'',
    visible('showDueDate')?`<div>الاستحقاق<strong>${escapeHtml($('invoice-due-date').value||'—')}</strong></div>`:'',
    visible('showPaymentStatus')?`<div>الدفع<strong><span class="status-mini ${statusClass($('invoice-payment-status').value)}">${statusLabel($('invoice-payment-status').value)}</span></strong></div>`:'',
    visible('showPaymentMethod')?`<div>طريقة الدفع<strong>${escapeHtml(paymentMethodLabel($('invoice-payment-method').value))}</strong></div>`:'',
    visible('showPaidAmount')?`<div>المدفوع<strong>${money(t.paid)}</strong></div>`:''
  ].join('');
  const totals=[
    visible('showSubtotal')?`<div><span>الإجمالي الفرعي</span><strong>${money(t.subtotal)}</strong></div>`:'',
    s.enableDiscounts&&visible('showSummaryDiscount')?`<div><span>الخصم</span><strong>-${money(t.discount)}</strong></div>`:'',
    s.enableTax&&visible('showSummaryTax')?`<div><span>الضريبة (${t.taxRate}%)</span><strong>${money(t.tax)}</strong></div>`:'',
    s.enableShipping&&visible('showSummaryShipping')?`<div><span>شحن / إضافي</span><strong>${money(t.shipping)}</strong></div>`:'',
    visible('showFinalTotal')?`<div class="grand"><span>الإجمالي النهائي</span><strong>${money(t.total)}</strong></div>`:'',
    visible('showRemaining')?`<div><span>المتبقي</span><strong>${money(t.remaining)}</strong></div>`:''
  ].join('');
  const footerParts=[];
  if(s.enableNotes&&visible('showNotesPrint')&&$('invoice-notes').value)footerParts.push(`<strong>ملاحظات:</strong> ${escapeHtml($('invoice-notes').value)}`);
  if(visible('showFooterNote')&&s.footerNote)footerParts.push(escapeHtml(s.footerNote));
  const footer=footerParts.length?`<div class="invoice-footer">${footerParts.join('<br>')}</div>`:'';
  $('invoice-preview').innerHTML=`
    <div class="invoice-brand">${s.showLogo?`<img src="${LOGO_DATA}" class="invoice-logo">`:''}<div class="invoice-meta">${brandMeta}</div></div>
    <div class="invoice-title"><div>${titleLeft}</div><div class="invoice-title-meta">${titleRight}</div></div>
    <div class="invoice-customer-box">${customerBox}</div>
    <table class="invoice-table"><thead><tr>${columns}</tr></thead><tbody>${rows}</tbody></table>
    <div class="invoice-totals">${totals}</div>
    ${footer}
  </div>`;
}
function paymentMethodLabel(v){return ({cash:'نقدي',card:'بطاقة',bank:'تحويل بنكي',wallet:'محفظة إلكترونية',other:'أخرى'})[v]||'—'}

function applyConditionalInvoiceFields(){
  const s=state.settings;
  const map=[['invoice-discount-type','enableDiscounts'],['invoice-discount','enableDiscounts'],['invoice-tax','enableTax'],['invoice-shipping','enableShipping'],['invoice-notes','enableNotes']];
  map.forEach(([id,key])=>{const l=$(id)?.closest('label');if(l)l.style.display=s[key]?'flex':'none'});
}

function stockDeltas(oldItems,newItems){
  const m={};
  (oldItems||[]).forEach(it=>{if(it.productId)m[it.productId]=(m[it.productId]||0)-Number(it.qty||0)});
  (newItems||[]).forEach(it=>{if(it.productId)m[it.productId]=(m[it.productId]||0)+Number(it.qty||0)});
  return m;
}
function adjustDemoStock(oldItems,newItems){
  if(!state.settings.enableInventory)return;
  const d=stockDeltas(oldItems,newItems);
  state.products=state.products.map(p=>d[p.id]?{...p,stock:Math.max(0,Number(p.stock||0)-d[p.id])}:p);
  demoWrite('products',state.products);
}

async function saveInvoice(){
  if(!canManageSharedData())return toast('لا تملك صلاحية استخدام النظام.','error');
  if(state.editingInvoiceId&&!canEditSharedData())return toast('تعديل الفواتير المحفوظة متاح للمدير فقط.','error');
  try{
    const t=calcInvoice();
    if(!t.items.length)return toast('أضف منتجًا واحدًا على الأقل.','error');
    const customer=state.customers.find(c=>c.id===$('invoice-customer').value);
    const base={createdByUid:state.user?.uid||'',createdByName:state.user?.displayName||state.user?.email||'مستخدم',date:$('invoice-date').value||localDate(),dueDate:$('invoice-due-date').value||'',customerId:customer?.id||'',customerName:customer?.name||'عميل نقدي / بدون تسجيل',paymentStatus:$('invoice-payment-status').value,paymentMethod:$('invoice-payment-method').value,paid:t.paid,notes:$('invoice-notes').value||'',items:t.items,subtotal:t.subtotal,discount:t.discount,discountRaw:t.discountRaw,discountType:$('invoice-discount-type').value,tax:t.tax,taxRate:t.taxRate,shipping:t.shipping,total:t.total,updatedAt:Date.now()};
    if(state.demo){
      if(state.editingInvoiceId){
        const old=state.invoices.find(i=>i.id===state.editingInvoiceId),idx=state.invoices.findIndex(i=>i.id===state.editingInvoiceId);
        state.invoices[idx]={...old,...base}; demoWrite('invoices',state.invoices); adjustDemoStock(old?.items||[],t.items);
      }else{
        base.id=uid();base.number=invoiceNumberPreview();base.createdAt=Date.now();state.invoices.unshift(base);state.settings.nextNumber=Number(state.settings.nextNumber||1)+1;
        demoWrite('invoices',state.invoices);demoWrite('settings',state.settings);adjustDemoStock([],t.items);
      }
    }else{
      if(state.editingInvoiceId){
        const ref=dref('invoices',state.editingInvoiceId);
        await runTransaction(fb.db,async tx=>{
          const oldSnap=await tx.get(ref);if(!oldSnap.exists())throw new Error('الفاتورة غير موجودة');
          const old=oldSnap.data(),deltas=stockDeltas(old.items||[],t.items);
          for(const [pid,delta] of Object.entries(deltas)){
            if(!delta||!state.settings.enableInventory)continue;
            const pr=doc(fb.db,`products/${pid}`);const snap=await tx.get(pr);
            if(snap.exists())tx.update(pr,{stock:Math.max(0,Number(snap.data().stock||0)-delta)});
          }
          tx.update(ref,{...base,updatedAt:serverTimestamp()});
        });
      }else{
        const settingsRef=appSettingsRef(),counterRef=invoiceCounterRef(),invoiceRef=doc(col('invoices'));
        await runTransaction(fb.db,async tx=>{
          const [ss,cs]=await Promise.all([tx.get(settingsRef),tx.get(counterRef)]);
          const s=mergeSettings(ss.exists()?ss.data():state.settings);
          const nextNumber=cs.exists()?Number(cs.data()?.nextNumber||s.nextNumber||1):Number(s.nextNumber||1);
          const number=`${s.invoicePrefix||'INV-'}${String(nextNumber).padStart(4,'0')}`;
          tx.set(invoiceRef,{...base,number,createdAt:serverTimestamp()});
          tx.set(counterRef,{nextNumber:nextNumber+1,updatedAt:serverTimestamp(),updatedBy:state.user?.uid||''},{merge:true});
          if(isAdmin())tx.set(settingsRef,{...s,nextNumber:nextNumber+1,updatedAt:serverTimestamp(),updatedBy:state.user?.uid||''},{merge:true});
          if(s.enableInventory){
            const changes=stockDeltas([],t.items);
            for(const [pid,delta] of Object.entries(changes)){
              const pr=doc(fb.db,`products/${pid}`),snap=await tx.get(pr);
              if(snap.exists())tx.update(pr,{stock:Math.max(0,Number(snap.data().stock||0)-delta)});
            }
          }
        });
      }
    }
    toast(state.editingInvoiceId?'تم تحديث الفاتورة بنجاح.':'تم حفظ الفاتورة بنجاح.');
    state.editingInvoiceId=null; await loadAll(); switchView(isMember()&&!state.settings.memberNavInvoices?'dashboard':'invoices');
  }catch(e){console.error(e);toast(e.message||'تعذر حفظ الفاتورة.','error')}
}

function renderInvoices(){
  const search=$('invoice-search')?.value?.trim().toLowerCase()||'',from=$('invoice-from')?.value||'',to=$('invoice-to')?.value||'',status=$('invoice-status-filter')?.value||'';
  const list=state.invoices.filter(i=>(!search||String(i.number||'').toLowerCase().includes(search)||String(i.customerName||'').toLowerCase().includes(search))&&inRange(i,from,to)&&(!status||i.paymentStatus===status));
  $('invoices-table').innerHTML=list.map(i=>`<tr><td><strong>${escapeHtml(i.number||'—')}</strong></td><td>${escapeHtml(i.customerName||'عميل نقدي')}</td><td>${escapeHtml(i.date||'—')}</td><td>${money(i.total)}</td><td><span class="status-mini ${statusClass(i.paymentStatus)}">${statusLabel(i.paymentStatus)}</span></td><td><div class="row-actions"><button class="table-btn" data-action="view-invoice" data-id="${i.id}">فتح</button>${isAdmin()?'<button class="table-btn" data-action="edit-invoice" data-id="${i.id}">تعديل</button>':''}<button class="table-btn" data-action="pdf-invoice" data-id="${i.id}">PDF</button>${isAdmin()?'<button class="table-btn danger" data-action="delete-invoice" data-id="${i.id}">حذف</button>':''}</div></td></tr>`).join('');
  $('invoices-empty').classList.toggle('hidden',!!list.length);
}
function renderProducts(){
  const search=$('product-search')?.value?.trim().toLowerCase()||'',cat=$('product-category-filter')?.value||'';
  const cats=[...new Set(state.products.map(p=>p.category).filter(Boolean))];
  $('product-category-filter').innerHTML=`<option value="">كل التصنيفات</option>`+cats.map(c=>`<option ${c===cat?'selected':''} value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  const list=state.products.filter(p=>(!search||String(p.name||'').toLowerCase().includes(search)||String(p.code||'').toLowerCase().includes(search))&&(!cat||p.category===cat));
  $('products-table').innerHTML=list.map(p=>`<tr><td><strong>${escapeHtml(p.name)}</strong></td><td>${escapeHtml(p.code||'—')}</td><td>${escapeHtml(p.category||'—')}</td><td>${money(p.price)}</td><td>${state.settings.enableInventory?`<span style="color:${Number(p.stock)<=Number(p.lowStock||0)?'#b06a37':'#487d53'}">${p.stock??0}</span>`:'—'}</td><td><div class="row-actions">${isAdmin()?`<button class="table-btn" data-action="edit-product" data-id="${p.id}">تعديل</button><button class="table-btn danger" data-action="delete-product" data-id="${p.id}">حذف</button>`:''}</div></td></tr>`).join('');
  $('products-empty').classList.toggle('hidden',!!list.length);
  $('product-stats').innerHTML=[
    statCard('عدد المنتجات',state.products.length,'في الكتالوج','◈'),
    statCard('قيمة المخزون',money(state.products.reduce((a,p)=>a+Number(p.stock||0)*Number(p.price||0),0)),state.settings.enableInventory?'تقديري':'متوقف','▣'),
    statCard('منخفض المخزون',state.settings.enableInventory?state.products.filter(p=>Number(p.stock||0)<=Number(p.lowStock||0)).length:'—',state.settings.enableInventory?'تحتاج متابعة':'متوقف','!')
  ].join('');
}
function renderCustomers(){
  if(!state.settings.enableCustomers)return;
  const search=$('customer-search')?.value?.trim().toLowerCase()||'';
  const list=state.customers.filter(c=>!search||String(c.name||'').toLowerCase().includes(search)||String(c.phone||'').toLowerCase().includes(search));
  const stats={};
  state.invoices.forEach(i=>{if(i.customerId){if(!stats[i.customerId])stats[i.customerId]={count:0,total:0};stats[i.customerId].count++;stats[i.customerId].total+=Number(i.total||0)}});
  $('customers-table').innerHTML=list.map(c=>`<tr><td><strong>${escapeHtml(c.name)}</strong></td><td>${escapeHtml(c.phone||'—')}</td><td>${escapeHtml(c.email||'—')}</td><td>${stats[c.id]?.count||0}</td><td>${money(stats[c.id]?.total||0)}</td><td><div class="row-actions">${isAdmin()?`<button class="table-btn" data-action="edit-customer" data-id="${c.id}">تعديل</button><button class="table-btn danger" data-action="delete-customer" data-id="${c.id}">حذف</button>`:''}</div></td></tr>`).join('');
  $('customers-empty').classList.toggle('hidden',!!list.length);
}
function renderReports(){
  const from=$('report-from')?.value||'',to=$('report-to')?.value||'',inv=state.invoices.filter(i=>inRange(i,from,to));
  const total=inv.reduce((a,b)=>a+Number(b.total||0),0),paid=inv.reduce((a,b)=>a+Number(b.paid||0),0);
  const reportCards=[
    ['memberReportStatSales','المبيعات',money(total),`${inv.length} فاتورة`,'↗'],
    ['memberReportStatPaid','المحصّل',money(paid),'داخل الفترة','✓'],
    ['memberReportStatRemaining','المتبقي',money(Math.max(0,total-paid)),'مستحق','◌'],
    ['memberReportStatAverage','متوسط الفاتورة',money(inv.length?total/inv.length:0),'لكل فاتورة','⌁']
  ];
  $('report-stats').innerHTML=reportCards.filter(x=>memberVisible(x[0])).map(x=>statCard(x[1],x[2],x[3],x[4])).join('') || `<div class="empty-state">تم إخفاء إحصائيات التقارير بواسطة مدير النظام.</div>`;
  const reportSalesPanel=$('report-sales-chart')?.closest('.panel');if(reportSalesPanel)reportSalesPanel.classList.toggle('hidden',!memberVisible('memberReportSales'));
  const paymentPanel=$('payment-chart')?.closest('.panel');if(paymentPanel)paymentPanel.classList.toggle('hidden',!memberVisible('memberReportPayment'));
  const productsPanel=$('report-products')?.closest('.panel');if(productsPanel)productsPanel.classList.toggle('hidden',!memberVisible('memberReportProducts'));
  const customersPanel=$('report-customers')?.closest('.panel');if(customersPanel)customersPanel.classList.toggle('hidden',!memberVisible('memberReportCustomers'));
  const start=from?new Date(from):new Date(Date.now()-29*86400000),end=to?new Date(to):new Date(),labels=[],vals=[];
  for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1)){const key=localDate(d);labels.push(d.toLocaleDateString('ar-EG',{day:'numeric',month:'short'}));vals.push(inv.filter(i=>String(i.date||'')===key).reduce((a,b)=>a+Number(b.total||0),0));}
  const c=$('report-sales-chart');if(state.charts.reportSales)state.charts.reportSales.destroy();
  if(memberVisible('memberReportSales'))state.charts.reportSales=new Chart(c,{type:'bar',data:{labels,datasets:[{label:'المبيعات',data:vals,backgroundColor:'rgba(130,200,126,.65)',borderRadius:8}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:v=>Number(v).toLocaleString('ar-EG')}},x:{grid:{display:false}}}}});
  const sc={paid:0,unpaid:0,partial:0};inv.forEach(i=>sc[i.paymentStatus||'unpaid']++);
  const pc=$('payment-chart');if(state.charts.payment)state.charts.payment.destroy();
  if(memberVisible('memberReportPayment'))state.charts.payment=new Chart(pc,{type:'doughnut',data:{labels:['مدفوعة','غير مدفوعة','جزئيًا'],datasets:[{data:[sc.paid,sc.unpaid,sc.partial],backgroundColor:['#73bd7b','#d98a74','#d9b765'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});
  const prod={};inv.forEach(i=>(i.items||[]).forEach(it=>{const k=it.productId||it.name;if(!prod[k])prod[k]={name:it.name,qty:0,total:0};prod[k].qty+=Number(it.qty||0);prod[k].total+=Number(it.lineTotal||0)}));
  $('report-products').innerHTML=Object.values(prod).sort((a,b)=>b.total-a.total).slice(0,8).map((x,n)=>`<div class="mini-item"><div class="mini-main"><span class="mini-badge">${n+1}</span><div><div class="mini-title">${escapeHtml(x.name)}</div><div class="mini-sub">${x.qty} قطعة</div></div></div><div class="mini-amount">${money(x.total)}</div></div>`).join('')||`<div class="empty-state">لا توجد بيانات.</div>`;
  const cs={};inv.forEach(i=>{if(i.customerId){if(!cs[i.customerId])cs[i.customerId]={name:i.customerName,total:0,count:0};cs[i.customerId].total+=Number(i.total||0);cs[i.customerId].count++}});
  $('report-customers').innerHTML=Object.values(cs).sort((a,b)=>b.total-a.total).slice(0,8).map((x,n)=>`<div class="mini-item"><div class="mini-main"><span class="mini-badge">${n+1}</span><div><div class="mini-title">${escapeHtml(x.name)}</div><div class="mini-sub">${x.count} فواتير</div></div></div><div class="mini-amount">${money(x.total)}</div></div>`).join('')||`<div class="empty-state">لا توجد بيانات.</div>`;
}

async function saveProduct(e){
  e.preventDefault();
  const id=$('product-id').value;
  if(id&&!canEditSharedData())return toast('تعديل المنتجات متاح للمدير فقط.','error');
  const data={createdByUid:state.user?.uid||'',createdByName:state.user?.displayName||state.user?.email||'مستخدم',name:$('product-name').value.trim(),code:$('product-code').value.trim(),category:$('product-category').value.trim(),price:Number($('product-price').value||0),stock:Number($('product-stock').value||0),lowStock:Number($('product-low-stock').value||0),notes:$('product-notes').value.trim(),updatedAt:Date.now()};
  if(!data.name)return toast('اكتب اسم المنتج.','error');
  if(!canManageSharedData())return toast('لا تملك صلاحية إضافة المنتجات.','error');
  const inline=state.inlineAddContext?.type==='product'&&!id;
  try{
    let createdId=id;
    if(state.demo){
      if(id)state.products=state.products.map(p=>p.id===id?{...p,...data}:p);else{data.id=uid();createdId=data.id;state.products.push(data)}demoWrite('products',state.products)
    }else{
      if(id)await updateDoc(dref('products',id),data);else{const ref=await addDoc(col('products'),{...data,createdAt:serverTimestamp()});createdId=ref.id}
    }
    closeModal('product-modal');e.target.reset();await loadAll();
    if(inline&&createdId){
      const p=state.products.find(x=>x.id===createdId);addOrSetProductRow(createdId,p?.price??data.price);state.inlineAddContext=null;
    }
    toast(id?'تم تحديث المنتج.':'تم حفظ المنتج.');
  }catch(err){console.error(err);toast(err.message||'تعذر حفظ المنتج.','error')}
}

function editProduct(id){if(!canEditSharedData())return toast('تعديل المنتجات متاح للمدير فقط.','error');const p=state.products.find(x=>x.id===id);if(!p)return;$('product-modal-title').textContent='تعديل منتج';$('product-id').value=id;$('product-name').value=p.name||'';$('product-code').value=p.code||'';$('product-category').value=p.category||'';$('product-price').value=p.price??0;$('product-stock').value=p.stock??0;$('product-low-stock').value=p.lowStock??5;$('product-notes').value=p.notes||'';openModal('product-modal')}
async function deleteProduct(id){if(!canEditSharedData())return toast('حذف المنتجات متاح للمدير فقط.','error');if(!confirm('حذف المنتج؟'))return;try{if(state.demo){state.products=state.products.filter(p=>p.id!==id);demoWrite('products',state.products)}else await deleteDoc(dref('products',id));await loadAll();toast('تم حذف المنتج.')}catch(e){toast(e.message||'تعذر حذف المنتج.','error')}}
async function saveCustomer(e){
  e.preventDefault();if(!state.settings.enableCustomers)return;
  const id=$('customer-id').value;
  if(id&&!canEditSharedData())return toast('تعديل العملاء متاح للمدير فقط.','error');
  const data={createdByUid:state.user?.uid||'',createdByName:state.user?.displayName||state.user?.email||'مستخدم',name:$('customer-name').value.trim(),phone:$('customer-phone').value.trim(),email:$('customer-email').value.trim(),address:$('customer-address').value.trim(),notes:$('customer-notes').value.trim(),updatedAt:Date.now()};
  if(!data.name)return toast('اكتب اسم العميل.','error');
  if(!canManageSharedData())return toast('لا تملك صلاحية إضافة العملاء.','error');
  const inline=state.inlineAddContext?.type==='customer'&&!id;
  try{
    let createdId=id;
    if(state.demo){if(id)state.customers=state.customers.map(c=>c.id===id?{...c,...data}:c);else{data.id=uid();createdId=data.id;state.customers.push(data)}demoWrite('customers',state.customers)}
    else{if(id)await updateDoc(dref('customers',id),data);else{const ref=await addDoc(col('customers'),{...data,createdAt:serverTimestamp()});createdId=ref.id}}
    closeModal('customer-modal');e.target.reset();await loadAll();
    if(inline&&createdId){populateCustomerSelect(createdId);updateInvoiceTotals();state.inlineAddContext=null;}
    toast(id?'تم تحديث العميل.':'تم حفظ العميل.');
  }catch(err){toast(err.message||'تعذر حفظ العميل.','error')}
}

function editCustomer(id){if(!canEditSharedData())return toast('تعديل العملاء متاح للمدير فقط.','error');const c=state.customers.find(x=>x.id===id);if(!c)return;$('customer-modal-title').textContent='تعديل عميل';$('customer-id').value=id;$('customer-name').value=c.name||'';$('customer-phone').value=c.phone||'';$('customer-email').value=c.email||'';$('customer-address').value=c.address||'';$('customer-notes').value=c.notes||'';openModal('customer-modal')}
async function deleteCustomer(id){if(!canEditSharedData())return toast('حذف العملاء متاح للمدير فقط.','error');if(state.invoices.some(i=>i.customerId===id))return toast('لا يمكن حذف عميل مرتبط بفواتير محفوظة.','error');if(!confirm('حذف العميل؟'))return;try{if(state.demo){state.customers=state.customers.filter(c=>c.id!==id);demoWrite('customers',state.customers)}else await deleteDoc(dref('customers',id));await loadAll();toast('تم حذف العميل.')}catch(e){toast(e.message||'تعذر حذف العميل.','error')}}

function switchView(view){
  if(isMember()&&view==='settings')return toast('الإعدادات متاحة لمدير النظام فقط.','error');
  const map={dashboard:'memberNavDashboard',invoices:'memberNavInvoices',products:'memberNavProducts',customers:'memberNavCustomers',reports:'memberNavReports'};
  if(isMember()&&map[view]&&!state.settings?.[map[view]])return toast('هذه الصفحة مخفية بواسطة مدير النظام.','error');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const target=$(`view-${view}`);if(!target)return;target.classList.add('active');
  document.querySelectorAll('.nav-item[data-view]').forEach(n=>n.classList.toggle('active',n.dataset.view===view));
  const titles={dashboard:'لوحة التحكم','new-invoice':'فاتورة جديدة',invoices:'الفواتير',products:'المنتجات',customers:'العملاء',reports:'الإحصائيات والتقارير',settings:'الإعدادات'};$('page-title').textContent=titles[view]||'TULANE';
  if(view==='dashboard')renderDashboard();if(view==='invoices')renderInvoices();if(view==='products')renderProducts();if(view==='customers')renderCustomers();if(view==='reports')renderReports();
  if(view==='new-invoice'&&!state.editingInvoiceId)prepareInvoiceForm();
  $('sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});
}

async function exportInvoicePdf(invoice){
  try{
    if(invoice){
      state.editingInvoiceId=invoice.id;populateCustomerSelect(invoice.customerId||'');$('invoice-date').value=invoice.date||localDate();$('invoice-due-date').value=invoice.dueDate||'';$('invoice-payment-status').value=invoice.paymentStatus||'paid';$('invoice-paid').value=invoice.paid??0;$('invoice-payment-method').value=invoice.paymentMethod||'cash';$('invoice-discount-type').value=invoice.discountType||'fixed';$('invoice-discount').value=invoice.discountRaw??0;$('invoice-tax').value=invoice.taxRate??0;$('invoice-shipping').value=invoice.shipping??0;$('invoice-notes').value=invoice.notes||'';$('invoice-items').innerHTML='';(invoice.items||[]).forEach(it=>addItemRow({...it,id:uid()}));updateInvoiceTotals();
    }
    const target=$('invoice-preview');
    const sourceSections={brand:target.querySelector('.invoice-brand'),title:target.querySelector('.invoice-title'),customer:target.querySelector('.invoice-customer-box'),table:target.querySelector('.invoice-table'),totals:target.querySelector('.invoice-totals'),footer:target.querySelector('.invoice-footer')};
    const workspace=document.createElement('div');workspace.className='pdf-export-workspace';document.body.appendChild(workspace);
    const pages=[];const PAGE_H=1123;const PAD=48;const MAX_H=PAGE_H-(PAD*2);
    const makePage=()=>{const page=document.createElement('div');page.className='pdf-page';const inner=document.createElement('div');inner.className='pdf-page-inner';page.appendChild(inner);workspace.appendChild(page);pages.push({page,inner});return inner};
    const appendHeader=(inner)=>{
      [sourceSections.brand,sourceSections.title,sourceSections.customer].forEach(sec=>{if(sec)inner.appendChild(sec.cloneNode(true))});
    };
    let inner=makePage();appendHeader(inner);
    const makeTable=()=>{const t=document.createElement('table');t.className='invoice-table';const thead=sourceSections.table?.querySelector('thead')?.cloneNode(true);if(thead)t.appendChild(thead);t.appendChild(document.createElement('tbody'));inner.appendChild(t);return t;};
    let table=makeTable();
    const rows=[...(sourceSections.table?.querySelectorAll('tbody tr')||[])];
    for(const originalRow of rows){
      const row=originalRow.cloneNode(true);const body=table.querySelector('tbody');body.appendChild(row);
      if(inner.scrollHeight>MAX_H){body.removeChild(row);inner.removeChild(table);inner=makePage();appendHeader(inner);table=makeTable();table.querySelector('tbody').appendChild(row);
        if(inner.scrollHeight>MAX_H){toast('يوجد نص طويل جدًا لا يمكن احتواؤه في صفحة PDF واحدة.','error');break;}
      }
    }
    const totals=sourceSections.totals?.cloneNode(true);const footer=sourceSections.footer?.cloneNode(true);
    const block=document.createElement('div');block.className='pdf-last-block';if(totals)block.appendChild(totals);if(footer)block.appendChild(footer);inner.appendChild(block);
    if(inner.scrollHeight>MAX_H){inner.removeChild(block);inner=makePage();block.className='pdf-last-block';if(totals)block.appendChild(totals);if(footer)block.appendChild(footer);inner.appendChild(block);}
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const {jsPDF}=window.jspdf;const pdf=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
    for(let i=0;i<pages.length;i++){
      const canvas=await html2canvas(pages[i].page,{scale:2,backgroundColor:'#ffffff',useCORS:true,logging:false,windowWidth:794});
      if(i>0)pdf.addPage();pdf.addImage(canvas.toDataURL('image/jpeg',.96),'JPEG',0,0,210,297);
    }
    pdf.save(`${invoice?.number||invoiceNumberPreview()}.pdf`);workspace.remove();toast('تم تصدير ملف PDF بدون تقطيع صفوف الفاتورة.');
  }catch(e){console.error(e);document.querySelector('.pdf-export-workspace')?.remove();toast(e.message||'تعذر تصدير PDF.','error')}
}

async function exportJson(){const data={settings:state.settings,products:state.products,customers:state.customers,invoices:state.invoices,exportedAt:new Date().toISOString()};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`tulane-backup-${localDate()}.json`;a.click();URL.revokeObjectURL(a.href)}
async function importJson(file){try{const data=JSON.parse(await file.text());if(!confirm('استيراد البيانات سيستبدل بيانات المعاينة الحالية. متابعة؟'))return;if(!state.demo)return toast('الاستيراد داخل Firebase غير مفعّل في هذه النسخة الأولى. استخدم تصدير JSON كنسخة احتياطية.','error');state.settings=mergeSettings(data.settings);state.products=data.products||[];state.customers=data.customers||[];state.invoices=data.invoices||[];demoWrite('settings',state.settings);demoWrite('products',state.products);demoWrite('customers',state.customers);demoWrite('invoices',state.invoices);await loadAll();toast('تم استيراد البيانات.')}catch(e){toast('ملف JSON غير صالح.','error')}}

async function loadAccessRequests(){
  const panel=$('admin-access-panel');if(!panel||!isAdmin()||state.demo)return;
  try{
    const snap=await getDocs(collection(fb.db,'accessRequests'));
    const list=snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>{const av=a.createdAt?.seconds||0,bv=b.createdAt?.seconds||0;return bv-av;});
    const pending=list.filter(x=>x.status==='pending');
    $('access-requests-table').innerHTML=list.map(x=>`<tr><td><strong>${escapeHtml(x.displayName||'بدون اسم')}</strong></td><td>${escapeHtml(x.email||'—')}</td><td><span class="status-mini ${x.status==='approved'?'status-paid':x.status==='rejected'?'status-unpaid':'status-partial'}">${x.status==='approved'?'مقبول':x.status==='rejected'?'مرفوض':'معلّق'}</span></td><td>${escapeHtml(formatTimestamp(x.createdAt))}</td><td><div class="row-actions">${x.status==='pending'?`<button class="table-btn" data-access="approve" data-id="${x.id}">موافقة</button><button class="table-btn danger" data-access="reject" data-id="${x.id}">رفض</button>`:`<button class="table-btn" data-access="reset" data-id="${x.id}">إرجاع معلّق</button>`}</div></td></tr>`).join('');
    $('access-requests-empty').classList.toggle('hidden',!!list.length);
    const title=document.querySelector('#admin-access-panel .panel-head p');if(title)title.textContent=`طلبات الدخول: ${pending.length} معلّقة`;
  }catch(e){console.error(e);toast(e.message||'تعذر تحميل طلبات الدخول.','error')}
}
function formatTimestamp(v){if(!v)return'—';const d=v.toDate?v.toDate():new Date(v);return isNaN(d)?'—':d.toLocaleDateString('ar-EG',{year:'numeric',month:'2-digit',day:'2-digit'})}
async function setAccessStatus(id,status){if(!isAdmin()||state.demo)return;try{await setDoc(doc(fb.db,`accessRequests/${id}`),{status,approved:status==='approved',role:status==='approved'?'member':'member',updatedAt:serverTimestamp()},{merge:true});await loadAccessRequests();toast(status==='approved'?'تمت الموافقة على المستخدم.':status==='rejected'?'تم رفض طلب الدخول.':'تمت إعادة الطلب للمراجعة.')}catch(e){toast(e.message||'تعذر تحديث الطلب.','error')}}
function bindEvents(){
  document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',()=>switchView(el.dataset.view)));
  $('quick-invoice').addEventListener('click',()=>switchView('new-invoice'));$('menu-toggle').addEventListener('click',()=>$('sidebar').classList.toggle('open'));
  $('logout-btn').addEventListener('click',async()=>{if(state.demo){state.user=null;showScreen('auth-screen');return}await signOut(fb.auth)});
  $('approval-logout').addEventListener('click',async()=>{if(state.demo){showScreen('auth-screen');return}await signOut(fb.auth)});
  $('google-login').addEventListener('click',async()=>{if(state.demo){state.user={uid:'demo-user',displayName:'وضع المعاينة',email:'demo@example.com',photoURL:''};showScreen('app');await loadAll();toast('تم الدخول بوضع المعاينة.');return}try{await signInWithPopup(fb.auth,fb.provider)}catch(e){try{await signInWithRedirect(fb.auth,fb.provider)}catch(err){toast(err.message||'تعذر تسجيل الدخول.','error')}}});
  $('add-line-item').addEventListener('click',()=>addItemRow());$('quick-add-product').addEventListener('click',()=>{state.inlineAddContext={type:'product'};$('product-modal-title').textContent='إضافة منتج';$('product-form').reset();$('product-id').value='';openModal('product-modal')});
  $('quick-add-customer').addEventListener('click',()=>{if(!state.settings.enableCustomers)return toast('إدارة العملاء متوقفة من الإعدادات.','error');state.inlineAddContext={type:'customer'};$('customer-modal-title').textContent='إضافة عميل';$('customer-form').reset();$('customer-id').value='';openModal('customer-modal')});
  $('save-invoice').addEventListener('click',saveInvoice);$('invoice-reset').addEventListener('click',()=>{state.editingInvoiceId=null;switchView('dashboard')});$('export-current-pdf').addEventListener('click',()=>exportInvoicePdf(state.editingInvoiceId?state.invoices.find(i=>i.id===state.editingInvoiceId):null));
  ['invoice-customer','invoice-date','invoice-due-date','invoice-payment-status','invoice-payment-method','invoice-paid','invoice-discount-type','invoice-discount','invoice-tax','invoice-shipping','invoice-notes'].forEach(id=>$(id).addEventListener('input',()=>{applyConditionalInvoiceFields();updateInvoiceTotals()}));
  ['invoice-search','invoice-from','invoice-to','invoice-status-filter'].forEach(id=>$(id).addEventListener('input',renderInvoices));['product-search','product-category-filter'].forEach(id=>$(id).addEventListener('input',renderProducts));$('customer-search').addEventListener('input',renderCustomers);$('sales-period').addEventListener('change',()=>drawSalesChart(Number($('sales-period').value),'sales-chart'));['report-from','report-to'].forEach(id=>$(id).addEventListener('change',renderReports));
  $('add-product-open').addEventListener('click',()=>{state.inlineAddContext=null;$('product-modal-title').textContent='إضافة منتج';$('product-form').reset();$('product-id').value='';openModal('product-modal')});$('product-form').addEventListener('submit',saveProduct);
  $('add-customer-open').addEventListener('click',()=>{if(!state.settings.enableCustomers)return toast('إدارة العملاء متوقفة من الإعدادات.','error');state.inlineAddContext=null;$('customer-modal-title').textContent='إضافة عميل';$('customer-form').reset();$('customer-id').value='';openModal('customer-modal')});$('customer-form').addEventListener('submit',saveCustomer);
  document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',()=>{state.inlineAddContext=null;closeModal(el.dataset.close)}));document.querySelectorAll('.modal-backdrop').forEach(el=>el.addEventListener('click',e=>{if(e.target===el){state.inlineAddContext=null;closeModal(el.id)}}));
  $('invoices-table').addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const id=b.dataset.id,act=b.dataset.action,i=state.invoices.find(x=>x.id===id);if(act==='view-invoice'||act==='edit-invoice'){prepareInvoiceForm(i);switchView('new-invoice')}if(act==='pdf-invoice')await exportInvoicePdf(i);if(act==='delete-invoice'){if(!isAdmin())return toast('حذف الفواتير متاح للمدير فقط.','error');if(!confirm('حذف الفاتورة؟'))return;try{if(state.demo){state.invoices=state.invoices.filter(x=>x.id!==id);demoWrite('invoices',state.invoices)}else await deleteDoc(dref('invoices',id));await loadAll();toast('تم حذف الفاتورة.')}catch(err){toast(err.message||'تعذر حذف الفاتورة.','error')}}});
  $('products-table').addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const id=b.dataset.id;if(b.dataset.action==='edit-product')editProduct(id);else if(b.dataset.action==='delete-product')deleteProduct(id)});$('customers-table').addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const id=b.dataset.id;if(b.dataset.action==='edit-customer')editCustomer(id);else if(b.dataset.action==='delete-customer')deleteCustomer(id)});
  $('save-settings').addEventListener('click',async()=>{if(!isAdmin())return toast('إعدادات النظام متاحة للمدير فقط.','error');try{state.settings=mergeSettings({...state.settings,businessName:$('set-business-name').value.trim(),businessSubtitle:$('set-business-subtitle').value.trim(),businessPhone:$('set-business-phone').value.trim(),businessEmail:$('set-business-email').value.trim(),businessAddress:$('set-business-address').value.trim(),taxNumber:$('set-tax-number').value.trim(),invoicePrefix:$('set-invoice-prefix').value.trim()||'INV-',nextNumber:Math.max(1,Number($('set-next-number').value||1)),currency:$('set-currency').value.trim()||'ج.م',footerNote:$('set-footer-note').value.trim(),showLogo:$('toggle-logo').checked,showBusinessName:$('toggle-business-name').checked,showBusinessSubtitle:$('toggle-business-subtitle').checked,showBusinessPhone:$('toggle-business-phone').checked,showBusinessEmail:$('toggle-business-email').checked,showBusinessAddress:$('toggle-business-address').checked,showTaxNumber:$('toggle-tax-number').checked,showInvoiceTitle:$('toggle-invoice-title').checked,showInvoiceNumber:$('toggle-invoice-number').checked,showCustomerName:$('toggle-customer-name').checked,showCustomerPhone:$('toggle-customer-phone').checked,showIssueDate:$('toggle-issue-date').checked,showDueDate:$('toggle-due-date').checked,showPaymentStatus:$('toggle-payment-status').checked,showPaymentMethod:$('toggle-payment-method').checked,showPaidAmount:$('toggle-paid-amount').checked,showColumnProduct:$('toggle-column-product').checked,showColumnQty:$('toggle-column-qty').checked,showColumnPrice:$('toggle-column-price').checked,showColumnTotal:$('toggle-column-total').checked,showSubtotal:$('toggle-subtotal').checked,showSummaryDiscount:$('toggle-summary-discount').checked,showSummaryTax:$('toggle-summary-tax').checked,showSummaryShipping:$('toggle-summary-shipping').checked,showFinalTotal:$('toggle-final-total').checked,showRemaining:$('toggle-remaining').checked,showNotesPrint:$('toggle-notes-print').checked,showFooterNote:$('toggle-footer-note').checked,enableCustomers:$('toggle-customers').checked,enableInventory:$('toggle-inventory').checked,enableDiscounts:$('toggle-discounts').checked,enableTax:$('toggle-tax').checked,enableShipping:$('toggle-shipping').checked,enableNotes:$('toggle-notes').checked,memberNavDashboard:$('toggle-member-dashboard').checked,memberNavInvoices:$('toggle-member-invoices').checked,memberNavProducts:$('toggle-member-products').checked,memberNavCustomers:$('toggle-member-customers').checked,memberNavReports:$('toggle-member-reports').checked,memberStatTotalSales:$('toggle-member-stat-total-sales').checked,memberStatPaid:$('toggle-member-stat-paid').checked,memberStatRemaining:$('toggle-member-stat-remaining').checked,memberStatMonthSales:$('toggle-member-stat-month-sales').checked,memberStatInvoiceCount:$('toggle-member-stat-invoice-count').checked,memberStatCustomerCount:$('toggle-member-stat-customer-count').checked,memberStatProductCount:$('toggle-member-stat-product-count').checked,memberStatAverageInvoice:$('toggle-member-stat-average').checked,memberDashboardSalesChart:$('toggle-member-dashboard-sales').checked,memberDashboardRecentInvoices:$('toggle-member-dashboard-recent').checked,memberDashboardTopProducts:$('toggle-member-dashboard-top-products').checked,memberDashboardStockAlerts:$('toggle-member-dashboard-stock').checked,memberReportSales:$('toggle-member-report-sales').checked,memberReportPayment:$('toggle-member-report-payment').checked,memberReportProducts:$('toggle-member-report-products').checked,memberReportCustomers:$('toggle-member-report-customers').checked,memberReportStatSales:$('toggle-member-report-stat-sales').checked,memberReportStatPaid:$('toggle-member-report-stat-paid').checked,memberReportStatRemaining:$('toggle-member-report-stat-remaining').checked,memberReportStatAverage:$('toggle-member-report-stat-average').checked});await saveSettingsToDb();applySettingsUI();updateInvoiceTotals();toast('تم حفظ الإعدادات.')}catch(e){toast(e.message||'تعذر حفظ الإعدادات.','error')}});
  $('export-json').addEventListener('click',exportJson);$('import-json').addEventListener('click',()=>$('import-file').click());$('import-file').addEventListener('change',e=>e.target.files[0]&&importJson(e.target.files[0]));$('clear-local').addEventListener('click',()=>{if(!state.demo)return toast('هذه الأداة تعمل فقط في وضع المعاينة.','error');if(confirm('سيتم حذف بيانات المعاينة من هذا المتصفح. هل أنت متأكد؟')){['settings','products','customers','invoices'].forEach(k=>localStorage.removeItem(demoKey(k)));location.reload()}});
  $('profile-btn').addEventListener('click',()=>{if(state.user?.photoURL){$('profile-avatar').innerHTML=`<img src="${state.user.photoURL}" style="width:30px;height:30px;border-radius:50%;object-fit:cover">`}else $('profile-avatar').textContent=(state.user?.displayName||'T').charAt(0).toUpperCase();$('profile-name').textContent=state.user?.displayName||'المستخدم'});
  $('refresh-access-requests')?.addEventListener('click',loadAccessRequests);$('access-requests-table')?.addEventListener('click',async e=>{const b=e.target.closest('button[data-access]');if(!b)return;const id=b.dataset.id,act=b.dataset.access;await setAccessStatus(id,act==='approve'?'approved':act==='reject'?'rejected':'pending')});
}

async function boot(){
  setLogoImages();bindEvents();
  try{
    if(state.demo){showScreen('auth-screen');$('demo-login-note').classList.remove('hidden')}
    else{
      await getRedirectResult(fb.auth);
      onAuthStateChanged(fb.auth,handleAuthenticatedUser);
    }
  }catch(e){console.error(e);showScreen('auth-screen');toast('تعذر تشغيل النظام. راجع إعدادات Firebase.','error')}
}

boot();
