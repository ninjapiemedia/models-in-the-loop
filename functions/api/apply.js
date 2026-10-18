// Cloudflare Pages Function. Required binding: APPLICATIONS_BUCKET (private R2 bucket).
// Optional secrets: RESEND_API_KEY, NOTIFY_EMAIL, FROM_EMAIL. Set all three to enable alerts.
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});
const clean=(v,max=2000)=>String(v||'').trim().slice(0,max);
export async function onRequestPost({request,env}){
 if(!env.APPLICATIONS_BUCKET)return json({error:'Applications are not yet configured. Please contact collab@modelsintheloop.com.'},503);
 const length=Number(request.headers.get('content-length')||0);if(length>23*1024*1024)return json({error:'Upload exceeds the size limit.'},413);
 let form;try{form=await request.formData()}catch{return json({error:'Invalid application data.'},400)}
 const name=clean(form.get('fullName'),120),email=clean(form.get('email'),254),phone=clean(form.get('phone'),40),city=clean(form.get('city'),120),age=Number(form.get('age')),social=clean(form.get('social'),250),about=clean(form.get('about'));
 if(!name||!email||!phone||!city||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!Number.isInteger(age)||age<18||age>100||form.get('ageConsent')!=='on'||form.get('privacyConsent')!=='on')return json({error:'Please complete the required fields and consents. Applicants must be 18 or older.'},400);
 const photos=form.getAll('photos').filter(f=>f instanceof File);if(photos.length<2||photos.length>5)return json({error:'Please upload 2–5 photos.'},400);
 const allowed=['image/jpeg','image/png','image/webp'];if(photos.some(f=>!allowed.includes(f.type)||f.size>5*1024*1024||f.size===0)||photos.reduce((s,f)=>s+f.size,0)>20*1024*1024)return json({error:'Unsupported photo type or size.'},400);
 // Check file magic bytes, not just browser-supplied MIME types.
 for(const f of photos){const b=new Uint8Array(await f.slice(0,12).arrayBuffer());const ok=f.type==='image/jpeg'?b[0]===255&&b[1]===216&&b[2]===255:f.type==='image/png'?b.slice(0,8).join(',')==='137,80,78,71,13,10,26,10':String.fromCharCode(...b.slice(0,4))==='RIFF'&&String.fromCharCode(...b.slice(8,12))==='WEBP';if(!ok)return json({error:'A photo does not match its file type.'},400)}
 const id=crypto.randomUUID(),prefix=`applications/${new Date().toISOString().slice(0,10)}/${id}`;const record={id,submittedAt:new Date().toISOString(),name,email,phone,city,age,social,about,consents:{adult:true,privacy:true,likenessLicenseGranted:false},photos:[]};
 try{for(let i=0;i<photos.length;i++){const f=photos[i],ext=f.type==='image/jpeg'?'jpg':f.type==='image/png'?'png':'webp',key=`${prefix}/photo-${i+1}.${ext}`;await env.APPLICATIONS_BUCKET.put(key,await f.arrayBuffer(),{httpMetadata:{contentType:f.type},customMetadata:{applicationId:id}});record.photos.push({key,size:f.size,type:f.type})}await env.APPLICATIONS_BUCKET.put(`${prefix}/application.json`,JSON.stringify(record),{httpMetadata:{contentType:'application/json'}})}catch{return json({error:'Unable to save your application. Please try again.'},500)}
 if(env.RESEND_API_KEY&&env.NOTIFY_EMAIL&&env.FROM_EMAIL){try{await fetch('https://api.resend.com/emails',{method:'POST',headers:{authorization:`Bearer ${env.RESEND_API_KEY}`,'content-type':'application/json'},body:JSON.stringify({from:env.FROM_EMAIL,to:[env.NOTIFY_EMAIL],subject:`New model application: ${name}`,text:`A new application was received.\nID: ${id}\nName: ${name}\nEmail: ${email}\nCity: ${city}\nPhotos are stored privately in R2; do not send public links.\nReview using your secured Cloudflare dashboard.`})})}catch(e){console.error('Notification failure',e)}}
 return json({ok:true,id},201)
}
