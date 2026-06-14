import{useState,useEffect}from"react";
const COMMISSION=10;
const T={en:{appName:"CarWahan",tagline:"India's trusted ride-sharing",passenger:"I'm a Passenger",passengerSub:"Find a ride",driver:"I'm a Driver",driverSub:"Offer a ride",admin:"Admin Panel",adminSub:"Commission & earnings",search:"Search",from:"From",to:"To",date:"Date",seats:"Seats",popularRoutes:"Popular Routes",ridesFound:"rides found",bookNow:"Pay & Book 💳",perSeat:"per seat",paymentTitle:"Payment",payMethod:"Choose Payment Method",upi:"UPI / GPay / PhonePe",card:"Debit / Credit Card",netbank:"Net Banking",processing:"Processing...",paySuccess:"Payment Successful!",confirmSeat:"Confirm Seat 🎉",seatConfirmed:"Seat Confirmed!",driverNotified:"✅ Driver notified!",passengerNotified:"✅ Booking confirmed!",rateDriver:"Rate the Driver",ratePassenger:"Rate the Passenger",submitRating:"Submit Rating",ratingThanks:"Thanks for rating!",shareLocation:"Share Live Location",whatsappShare:"Send on WhatsApp",locationSent:"WhatsApp opened!",bankTitle:"Link Bank Account",bankSave:"Save Bank Account",bankLinked:"Bank Account Linked!",verifyTitle:"Driver Verification",verifyStart:"Start Verification",verifyDone:"Documents Submitted!",rides:"Rides",offer:"Offer",earnings:"Earnings",verify:"Verify",overview:"Overview",transactions:"Transactions",bank:"Bank",settings:"Settings",postRide:"Post Ride 🚀",back:"← Back",done:"Done",paying:"Paying",youGet:"You get",platformFee:"Platform fee",totalEarned:"Total Earned",bookings:"Bookings",activeDrivers:"Active Drivers",rate:"Rate",pending:"Pending",verified:"Verified",hsrp:"HSRP Number Plate",dl:"Driving Licence",aadhar:"Aadhar Card",carPhoto:"Car Photo",next:"Next →",prev:"← Back",submit:"Submit ✓",shareBtn:"📍 Share Location"},hi:{appName:"CarWahan",tagline:"भारत का भरोसेमंद राइड-शेयरिंग",passenger:"मैं Passenger हूँ",passengerSub:"राइड ढूंढनी है",driver:"मैं Driver हूँ",driverSub:"राइड ऑफर करनी है",admin:"Admin Panel",adminSub:"कमीशन और कमाई",search:"खोजो",from:"कहाँ से",to:"कहाँ तक",date:"तारीख",seats:"सीटें",popularRoutes:"लोकप्रिय रास्ते",ridesFound:"राइड मिलीं",bookNow:"भुगतान करें 💳",perSeat:"प्रति सीट",paymentTitle:"भुगतान",payMethod:"तरीका चुनें",upi:"UPI / GPay / PhonePe",card:"डेबिट / क्रेडिट कार्ड",netbank:"नेट बैंकिंग",processing:"हो रहा है...",paySuccess:"भुगतान सफल!",confirmSeat:"सीट पक्की करें 🎉",seatConfirmed:"सीट पक्की!",driverNotified:"✅ Driver को सूचना!",passengerNotified:"✅ बुकिंग पक्की!",rateDriver:"Driver को रेट करें",ratePassenger:"Passenger को रेट करें",submitRating:"रेटिंग दें",ratingThanks:"धन्यवाद!",shareLocation:"लोकेशन शेयर करें",whatsappShare:"WhatsApp पर भेजें",locationSent:"WhatsApp खुल गया!",bankTitle:"बैंक खाता जोड़ें",bankSave:"सेव करें",bankLinked:"जुड़ गया!",verifyTitle:"सत्यापन",verifyStart:"शुरू करें",verifyDone:"जमा हो गए!",rides:"राइड्स",offer:"ऑफर",earnings:"कमाई",verify:"सत्यापन",overview:"सारांश",transactions:"लेनदेन",bank:"बैंक",settings:"सेटिंग्स",postRide:"पोस्ट करें 🚀",back:"← वापस",done:"हो गया",paying:"भुगतान",youGet:"मिलेगा",platformFee:"शुल्क",totalEarned:"कुल कमाई",bookings:"बुकिंग्स",activeDrivers:"ड्राइवर",rate:"दर",pending:"लंबित",verified:"सत्यापित",hsrp:"HSRP प्लेट",dl:"लाइसेंस",aadhar:"आधार",carPhoto:"फोटो",next:"आगे →",prev:"← वापस",submit:"जमा करें",shareBtn:"📍 शेयर करें"},hin:{appName:"CarWahan",tagline:"India ka apna ride-sharing",passenger:"Passenger hoon",passengerSub:"Ride dhundni hai",driver:"Driver hoon",driverSub:"Ride offer karni hai",admin:"Admin Panel",adminSub:"Commission & kamaai",search:"Khojo",from:"Kahan se",to:"Kahan tak",date:"Tarikh",seats:"Seats",popularRoutes:"Popular Routes",ridesFound:"rides mili",bookNow:"Pay & Book 💳",perSeat:"per seat",paymentTitle:"Payment",payMethod:"Method chuno",upi:"UPI / GPay / PhonePe",card:"Debit / Credit Card",netbank:"Net Banking",processing:"Ho raha hai...",paySuccess:"Payment Successful!",confirmSeat:"Seat Confirm Karo 🎉",seatConfirmed:"Seat Confirm!",driverNotified:"✅ Driver ko notification!",passengerNotified:"✅ Booking confirm!",rateDriver:"Driver ko rate karo",ratePassenger:"Passenger ko rate karo",submitRating:"Rating do",ratingThanks:"Shukriya!",shareLocation:"Location share karo",whatsappShare:"WhatsApp par bhejo",locationSent:"WhatsApp khul gaya!",bankTitle:"Bank jodo",bankSave:"Save karo",bankLinked:"Jud gaya!",verifyTitle:"Verification",verifyStart:"Shuru karo",verifyDone:"Submit ho gaye!",rides:"Rides",offer:"Offer",earnings:"Kamaai",verify:"Verify",overview:"Overview",transactions:"Transactions",bank:"Bank",settings:"Settings",postRide:"Post Karo 🚀",back:"← Wapas",done:"Done",paying:"Pay",youGet:"Milega",platformFee:"Platform fee",totalEarned:"Total Kamaai",bookings:"Bookings",activeDrivers:"Drivers",rate:"Rate",pending:"Pending",verified:"Verified",hsrp:"HSRP Plate",dl:"Driving Licence",aadhar:"Aadhar Card",carPhoto:"Car Photo",next:"Aage →",prev:"← Wapas",submit:"Submit",shareBtn:"📍 Share karo"}};
const mockRides=[{id:1,driver:"Rahul Sharma",avatar:"RS",from:"Delhi",to:"Jaipur",date:"15 Jun",time:"7:00 AM",seats:3,price:450,rating:4.8,totalRatings:42,car:"Maruti Swift",carColor:"#4A90D9",verified:true},{id:2,driver:"Priya Mehta",avatar:"PM",from:"Delhi",to:"Jaipur",date:"15 Jun",time:"9:30 AM",seats:2,price:400,rating:4.9,totalRatings:87,car:"Honda City",carColor:"#E74C3C",verified:true},{id:3,driver:"Amit Kumar",avatar:"AK",from:"Delhi",to:"Agra",date:"15 Jun",time:"6:00 AM",seats:1,price:300,rating:4.6,totalRatings:23,car:"Hyundai Creta",carColor:"#27AE60",verified:false}];
function calc(p,s=1){const g=p*s,c=Math.round(g*COMMISSION/100);return{gross:g,commission:c,driverEarns:g-c};}
const ov={position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1000};
const sh={background:"#fff",borderRadius:"24px 24px 0 0",padding:"22px 20px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"};
const inp={width:"100%",border:"1.5px solid #E5E7EB",borderRadius:12,padding:"12px",fontSize:14,outline:"none",boxSizing:"border-box"};
const lbl={fontSize:13,fontWeight:600,display:"block",marginBottom:6};
const btn={width:"100%",padding:14,background:"#E8441A",border:"none",borderRadius:12,color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer",display:"block"};
function Stars({rating,size=16}){return <span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=Math.round(rating)?"#F59E0B":"#D1D5DB",fontSize:size}}>★</span>)}</span>;}
function Toast({msg,onDone}){useEffect(()=>{const t=setTimeout(onDone,3000);return()=>clearTimeout(t);},[]);return <div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:"#1A1A2E",color:"#fff",padding:"12px 24px",borderRadius:16,fontSize:14,fontWeight:600,zIndex:2000}}>{msg}</div>;}
function LangBar({lang,setLang}){return <div style={{display:"flex",gap:4}}>{[["en","EN"],["hi","हि"],["hin","HIN"]].map(([l,label])=><button key={l} onClick={()=>setLang(l)} style={{padding:"5px 10px",borderRadius:20,border:"none",background:lang===l?"#E8441A":"rgba(255,255,255,0.2)",color:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}}>{label}</button>)}</div>;}
function MiniMap({from,to}){return <div style={{background:"linear-gradient(90deg,#e8f4f8,#d1eaf5)",borderRadius:12,padding:"9px 14px",display:"flex",gap:8,alignItems:"center"}}><span>📍</span><span style={{fontSize:12,color:"#6B7280",flex:1}}>{from} → {to}</span><a href={`https://www.google.com/maps/dir/${encodeURIComponent(from)}/${encodeURIComponent(to)}`} target="_blank" rel="noreferrer" style={{fontSize:12,color:"#E8441A",fontWeight:700,textDecoration:"none",background:"#FFF0EB",padding:"5px 12px",borderRadius:20}}>Maps ↗</a></div>;}

export default function App(){
  const [lang,setLang]=useState("hin");
  const t=T[lang];
  const [role,setRole]=useState(null);
  const [searchDone,setSearchDone]=useState(false);
  const [ride,setRide]=useState(null);
  const [booked,setBooked]=useState(false);
  const [showPay,setShowPay]=useState(false);
  const [showLoc,setShowLoc]=useState(false);
  const [showBank,setShowBank]=useState(false);
  const [showVerify,setShowVerify]=useState(false);
  const [showRate,setShowRate]=useState(false);
  const [toast,setToast]=useState(null);
  const [dtab,setDtab]=useState("rides");
  const [atab,setAtab]=useState("overview");
  const [oStep,setOStep]=useState("form");
  const [sf,setSf]=useState({from:"Delhi",to:"Jaipur",date:"15 Jun",seats:1});
  const [of,setOf]=useState({from:"",to:"",date:"",time:"",seats:"3",price:""});
  const [phone,setPhone]=useState("");
  const [stars,setStars]=useState(0);
  const [upi,setUpi]=useState("");
  const [payStep,setPayStep]=useState("method");
  const [bank,setBank]=useState({name:"",acc:"",ifsc:""});
  const [verifyStep,setVerifyStep]=useState(0);
  const reset=()=>{setRole(null);setSearchDone(false);setRide(null);setBooked(false);setShowPay(false);setOStep("form");setPayStep("method");setVerifyStep(0);};

  // ── HOME SCREEN ──
  if(!role)return(
    <div style={{minHeight:"100vh",background:"#1A1A2E",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{position:"absolute",top:20,right:20}}><LangBar lang={lang} setLang={setLang}/></div>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{fontSize:52}}>🚗</div>
        <h1 style={{color:"#fff",fontSize:40,fontWeight:900,margin:0}}>Car<span style={{color:"#E8441A"}}>Wahan</span></h1>
        <p style={{color:"#888",fontSize:13,margin:"6px 0 0"}}>{t.tagline}</p>
      </div>
      <div style={{width:"100%",maxWidth:360}}>
        {[{r:"passenger",icon:"🧳",title:t.passenger,sub:t.passengerSub},{r:"driver",icon:"🚙",title:t.driver,sub:t.driverSub},{r:"admin",icon:"🏢",title:t.admin,sub:t.adminSub}].map(({r,icon,title,sub})=>(
          <button key={r} onClick={()=>setRole(r)} style={{width:"100%",padding:"16px 20px",background:r==="passenger"?"#E8441A":r==="driver"?"transparent":"#ffffff18",border:r==="driver"?"2px solid #E8441A":"2px solid transparent",borderRadius:16,color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",marginBottom:12,display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:28}}>{icon}</span>
            <div style={{textAlign:"left"}}><div>{title}</div><div style={{fontSize:12,fontWeight:400,opacity:0.75}}>{sub}</div></div>
          </button>
        ))}
      </div>
    </div>
  );

  // ── PASSENGER: BOOKED SCREEN ──
  if(role==="passenger"&&booked&&ride)return(
    <div style={{minHeight:"100vh",background:"#F7F6F3",fontFamily:"'Segoe UI',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      <div style={{background:"#fff",borderRadius:24,padding:28,maxWidth:400,width:"100%",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
        <div style={{textAlign:"center",marginBottom:16}}><div style={{fontSize:56}}>🎉</div><h2 style={{fontWeight:800,fontSize:22,margin:"0 0 6px"}}>{t.seatConfirmed}</h2></div>
        <div style={{background:"#EFF6FF",borderRadius:12,padding:12,marginBottom:14}}><div style={{fontWeight:600,fontSize:13,color:"#1D4ED8"}}>{t.driverNotified}</div></div>
        <MiniMap from={ride.from} to={ride.to}/>
        <div style={{background:"#F7F6F3",borderRadius:14,padding:14,marginTop:14,marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>⭐ {t.rateDriver}</div>
          <div style={{display:"flex",gap:6,marginBottom:8}}>{[1,2,3,4,5].map(i=><span key={i} onClick={()=>setStars(i)} style={{fontSize:32,cursor:"pointer",color:stars>=i?"#F59E0B":"#D1D5DB"}}>★</span>)}</div>
          {stars>0&&<div style={{textAlign:"center",marginBottom:8}}>{["","😤","😕","😐","😊","🤩"][stars]}</div>}
          {stars>0&&<button onClick={()=>{setShowRate(false);setToast(t.ratingThanks);}} style={{...btn,padding:"10px",fontSize:13}}>{t.submitRating}</button>}
        </div>
        <button onClick={()=>setShowLoc(true)} style={{...btn,background:"#25D366",marginBottom:10}}>📍 {t.whatsappShare}</button>
        <button onClick={reset} style={{...btn,background:"#1A1A2E"}}>{t.back}</button>
      </div>
      {showLoc&&<div style={ov}><div style={sh}><div style={{fontWeight:800,fontSize:17,marginBottom:16}}>📍 {t.shareLocation}</div><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="9876543210" style={{...inp,marginBottom:16}} type="tel"/><button onClick={()=>{const msg=`🚗 CarWahan\nPassenger apni trip share kar raha hai!\n_CarWahan se bheja gaya_`;window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`,"_blank");setShowLoc(false);}} style={{...btn,background:"#25D366"}}>{t.whatsappShare}</button></div></div>}
    </div>
  );

  // ── PASSENGER: RIDE DETAIL ──
  if(role==="passenger"&&ride)return(
    <div style={{minHeight:"100vh",background:"#F7F6F3",fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{background:"#1A1A2E",padding:"20px 20px 28px",color:"#fff"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <button onClick={()=>setRide(null)} style={{background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer"}}>←</button>
          <LangBar lang={lang} setLang={setLang}/>
        </div>
        <h2 style={{margin:"8px 0 4px",fontSize:20,fontWeight:800}}>{ride.from} → {ride.to}</h2>
        <p style={{margin:0,opacity:0.7,fontSize:13}}>{ride.date} · {ride.time}</p>
      </div>
      <div style={{padding:"16px 16px 100px"}}>
        <MiniMap from={ride.from} to={ride.to}/>
        <div style={{background:"#fff",borderRadius:20,padding:20,marginTop:14,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
          <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:14}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:ride.carColor,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16}}>{ride.avatar}</div>
            <div>
              <div style={{fontWeight:800,fontSize:16}}>{ride.driver}</div>
              <div style={{color:"#6B7280",fontSize:13}}>{ride.car}</div>
              <div style={{display:"flex",gap:6,alignItems:"center",marginTop:4}}><Stars rating={ride.rating} size={14}/><span style={{fontWeight:700}}>{ride.rating}</span><span style={{color:"#6B7280",fontSize:12}}>({ride.totalRatings})</span>{ride.verified&&<span style={{background:"#DCFCE7",color:"#166534",fontSize:10,padding:"2px 8px",borderRadius:20}}>✓ {t.verified}</span>}</div>
            </div>
          </div>
          <div style={{background:"linear-gradient(135deg,#FFF0EB,#FFE4D6)",borderRadius:14,padding:"12px 16px"}}>
            {[[t.paying,`₹${calc(ride.price).gross}`],[`${t.platformFee} (${COMMISSION}%)`,`-₹${calc(ride.price).commission}`],[t.youGet,`₹${calc(ride.price).driverEarns}`]].map(([l,v],i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:i<2?6:0}}><span style={{color:"#6B7280",fontSize:13}}>{l}</span><span style={{fontWeight:800,fontSize:13}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"14px 20px",background:"#fff",borderTop:"1px solid #E5E7EB",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:26,fontWeight:900,color:"#E8441A"}}>₹{ride.price}</div><div style={{fontSize:11,color:"#6B7280"}}>{t.perSeat}</div></div>
        <button onClick={()=>setShowPay(true)} style={{padding:"13px 28px",background:"#E8441A",border:"none",borderRadius:12,color:"#fff",fontWeight:700,fontSize:16,cursor:"pointer"}}>{t.bookNow}</button>
      </div>
      {showPay&&<div style={ov}><div style={sh}>
        <div style={{fontWeight:800,fontSize:17,marginBottom:16}}>💳 {t.paymentTitle}</div>
        {payStep==="method"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[[t.upi,"📱","upi"],[t.card,"💳","card"],[t.netbank,"🏦","nb"]].map(([label,icon,id])=>(
            <button key={id} onClick={()=>id==="nb"?setPayStep("done"):setPayStep(id)} style={{padding:"14px 16px",background:"#F7F6F3",border:"1.5px solid #E5E7EB",borderRadius:14,cursor:"pointer",display:"flex",gap:14,alignItems:"center"}}>
              <span style={{fontSize:26}}>{icon}</span><span style={{fontWeight:700,fontSize:14}}>{label}</span>
            </button>
          ))}
        </div>}
        {payStep==="upi"&&<div>
          <label style={lbl}>UPI ID</label>
          <input value={upi} onChange={e=>setUpi(e.target.value)} placeholder="yourname@upi" style={{...inp,marginBottom:12}}/>
          <div style={{display:"flex",gap:8,marginBottom:16}}>{["GPay","PhonePe","Paytm","BHIM"].map(a=><button key={a} onClick={()=>setUpi(a+"@upi")} style={{flex:1,padding:"9px 4px",background:"#F7F6F3",border:"1px solid #E5E7EB",borderRadius:10,fontSize:11,fontWeight:600,cursor:"pointer"}}>{a}</button>)}</div>
          <button onClick={()=>setPayStep("done")} style={{...btn,opacity:upi?1:0.5}}>₹{calc(ride.price).gross} Pay Karo</button>
        </div>}
        {payStep==="card"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div><label style={lbl}>Card Number</label><input placeholder="1234 5678 9012 3456" style={inp}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><label style={lbl}>Expiry</label><input placeholder="MM/YY" style={inp}/></div>
            <div><label style={lbl}>CVV</label><input placeholder="123" type="password" style={inp}/></div>
          </div>
          <button onClick={()=>setPayStep("done")} style={btn}>Pay Karo 🔒</button>
        </div>}
        {payStep==="done"&&<div style={{textAlign:"center",padding:"20px 0"}}>
          <div style={{fontSize:56,marginBottom:10}}>✅</div>
          <div style={{fontWeight:800,fontSize:20,marginBottom:16}}>{t.paySuccess}</div>
          <div style={{background:"#EFF6FF",borderRadius:12,padding:12,marginBottom:16}}><div style={{fontWeight:600,fontSize:13,color:"#1D4ED8"}}>{t.driverNotified}</div></div>
          <button onClick={()=>{setShowPay(false);setBooked(true);setToast(t.passengerNotified);}} style={btn}>{t.confirmSeat}</button>
        </div>}
      </div></div>}
    </div>
  );

  // ── PASSENGER: SEARCH SCREEN ──
  if(role==="passenger")return(
    <div style={{minHeight:"100vh",background:"#F7F6F3",fontFamily:"'Segoe UI',sans-serif"}}>
      {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      <div style={{background:"#1A1A2E",padding:"20px 20px 28px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h1 style={{color:"#fff",margin:0,fontSize:22,fontWeight:900}}>🚗 {t.appName}</h1>
          <div style={{display:"flex",gap:6,flexDirection:"column",alignItems:"flex-end"}}>
            <LangBar lang={lang} setLang={setLang}/>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setShowLoc(true)} style={{background:"#25D366",border:"none",color:"#fff",padding:"6px 12px",borderRadius:20,cursor:"pointer",fontSize:11}}>📍</button>
              <button onClick={reset} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",padding:"6px 12px",borderRadius:20,cursor:"pointer",fontSize:11}}>⇄</button>
            </div>
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:20,padding:16}}>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <div style={{flex:1}}>
              <label style={{fontSize:11,color:"#6B7280",display:"block",marginBottom:4}}>{t.from}</label>
              <input value={sf.from} onChange={e=>setSf({...sf,from:e.target.value})} style={{width:"100%",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"10px 12px",fontSize:14,fontWeight:6
