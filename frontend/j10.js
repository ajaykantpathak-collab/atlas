const { chromium } = require('playwright');
const fs=require('fs');
const SHOTS='D:/platform/screenshots/journey/';
const LOG=SHOTS+'journey_log.txt';
const log=s=>{console.log(s);fs.appendFileSync(LOG,s+'\n');};
(async()=>{
 const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:1440,height:900},storageState:SHOTS+'auth.json'});
 const pg=await ctx.newPage();
 const shot=async n=>pg.screenshot({path:SHOTS+n+'.png'}).catch(()=>{});
 // Hindi toggle on dashboard
 await pg.goto('http://localhost/dashboard',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(5000);
 const hi=pg.locator('text=/^HI$|हिं|हि/').first();
 if(await hi.count()){await hi.click();await pg.waitForTimeout(2500);await shot('60_hindi');
  log('hindi: '+((await pg.locator('body').innerText()).slice(0,150).replace(/\n+/g,' | ')));}
 else log('no hindi toggle found');
 // chapter test
 await pg.goto('http://localhost/chapter-test?subject=physics&class=10',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(6000);
 await shot('61_chapter_test');
 log('chtest: '+((await pg.locator('body').innerText()).slice(0,220).replace(/\n+/g,' | ')));
 // exam-prep start
 await pg.goto('http://localhost/exam-prep',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(4000);
 const sb=pg.locator('button:has-text("Start"),a:has-text("Start"),button:has-text("Begin"),text=/Class 10/').first();
 if(await sb.count()){await sb.click().catch(()=>{});await pg.waitForTimeout(6000);await shot('62_preboard');
  log('preboard: '+((await pg.locator('body').innerText()).slice(0,220).replace(/\n+/g,' | ')));}
 await b.close();
})().catch(e=>{log('FATAL '+e.message.slice(0,250));process.exit(1);});
