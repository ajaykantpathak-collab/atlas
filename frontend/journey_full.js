const { chromium } = require('playwright');
const fs = require('fs');
const SHOTS='D:/platform/screenshots/journey/';
const LOG=SHOTS+'journey_log.txt';
const log=s=>{console.log(s);fs.appendFileSync(LOG,s+'\n');};
(async()=>{
 const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:1440,height:900}});
 const pg=await ctx.newPage();
 const shot=async n=>pg.screenshot({path:SHOTS+n+'.png'}).catch(()=>{});
 pg.on('response',r=>{if(r.status()>=500)log('HTTP '+r.status()+' '+r.url().slice(-70));});
 // signup fresh
 await pg.goto('http://localhost/signup',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(2000);
 await pg.locator('button:has-text("Student")').first().click();
 await pg.locator('input[type="text"]').first().fill('Audit Student');
 const em='audit'+Date.now()+'@test.in';
 await pg.locator('input[type="email"]').first().fill(em);
 await pg.locator('input[type="password"]').first().fill('Test@12345');
 await pg.locator('button:has-text("CBSE")').first().click();
 await pg.locator('select').first().selectOption({label:'Class 10'});
 await pg.locator('button[type="submit"]').first().click();
 await pg.waitForTimeout(6000);
 log('== signed up '+em+' -> '+pg.url());
 // onboarding: click through 5 steps
 for(let i=0;i<6;i++){
   const t=(await pg.locator('body').innerText()).slice(0,120).replace(/\n+/g,' | ');
   log('onboarding step: '+t);
   await shot('20_onboard_'+i);
   const btn=pg.locator('button:has-text("Get Started"),button:has-text("Next"),button:has-text("Continue"),button:has-text("Done"),button:has-text("Finish"),a:has-text("Skip")').first();
   if(!(await btn.count()))break;
   await btn.click(); await pg.waitForTimeout(2500);
   if(!pg.url().includes('onboarding'))break;
 }
 await shot('21_after_onboard'); log('post-onboarding: '+pg.url());
 await ctx.storageState({path:SHOTS+'auth.json'});
 // dashboard
 await pg.goto('http://localhost/dashboard',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(4000);
 await shot('22_dashboard');
 log('dashboard: '+((await pg.locator('body').innerText()).slice(0,250).replace(/\n+/g,' | ')));
 await b.close();
})().catch(e=>{log('FATAL '+e.message.slice(0,300));process.exit(1);});
