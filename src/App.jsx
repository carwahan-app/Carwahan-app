import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { useState, useEffect } from "react";

const COMMISSION = 10;
const GMAPS_KEY = "AIzaSyDTlMUgmnQjhFUZ-ogwmUy6DUfBsU4KO-c";

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  en: {
    appName:"CarWahan", tagline:"India's trusted ride-sharing",
    passenger:"I'm a Passenger", passengerSub:"Find a ride",
    driver:"I'm a Driver", driverSub:"Offer a ride",
    admin:"Admin Panel", adminSub:"Commission & earnings",
    search:"Search", from:"From", to:"To", date:"Date", seats:"Seats",
    popularRoutes:"Popular Routes", ridesFound:"rides found",
    bookNow:"Pay & Book 💳", perSeat:"per seat",
    paymentTitle:"Payment", payMethod:"Choose Payment Method",
    upi:"UPI / GPay / PhonePe", card:"Debit / Credit Card", netbank:"Net Banking",
    processing:"Processing payment...", paySuccess:"Payment Successful!",
    confirmSeat:"Confirm Seat 🎉", seatConfirmed:"Seat Confirmed!",
    driverNotified:"✅ Driver has been notified!", passengerNotified:"✅ Passenger booking confirmed!",
    rateYourRide:"Rate Your Ride", rateDriver:"Rate the Driver", ratePassenger:"Rate the Passenger",
    submitRating:"Submit Rating", ratingThanks:"Thanks for rating!",
    shareLocation:"Share Live Location", whatsappShare:"Send on WhatsApp",
    locationSent:"WhatsApp opened! Send the message.",
    bankTitle:"Link Bank Account", bankSave:"Save Bank Account", bankLinked:"Bank Account Linked!",
    verifyTitle:"Driver Verification", verifyStart:"Start Verification", verifyDone:"Documents Submitted!",
    rides:"Rides", offer:"Offer", earnings:"Earnings", verify:"Verify",
    overview:"Overview", transactions:"Transactions", bank:"Bank", settings:"Settings",
    postRide:"Post Ride 🚀", back:"← Back", done:"Done",
    tripFrom:"Trip from", paying:"Paying", youGet:"You get",
    platformFee:"Platform fee", totalEarned:"Total Earned",
    bookings:"Bookings", activeDrivers:"Active Drivers", rate:"Rate",
    pending:"Pending", verified:"Verified", hsrp:"HSRP Number Plate",
    dl:"Driving Licence", aadhar:"Aadhar Card", carPhoto:"Car Photo",
    next:"Next →", prev:"← Back", submit:"Submit ✓",
    shareBtn:"📍 Share Location",
  },
  hi: {
    appName:"CarWahan", tagline:"भारत का भरोसेमंद राइड-शेयरिंग",
    passenger:"मैं Passenger हूँ", passengerSub:"राइड ढूंढनी है",
    driver:"मैं Driver हूँ", driverSub:"राइड ऑफर करनी है",
    admin:"Admin Panel", adminSub:"कमीशन और कमाई",
    search:"खोजो", from:"कहाँ से", to:"कहाँ तक", date:"तारीख", seats:"सीटें",
    popularRoutes:"लोकप्रिय रास्ते", ridesFound:"राइड मिलीं",
    bookNow:"भुगतान करें & बुक करें 💳", perSeat:"प्रति सीट",
    paymentTitle:"भुगतान", payMethod:"भुगतान का तरीका चुनें",
    upi:"UPI / GPay / PhonePe", card:"डेबिट / क्रेडिट कार्ड", netbank:"नेट बैंकिंग",
    processing:"भुगतान हो रहा है...", paySuccess:"भुगतान सफल!",
    confirmSeat:"सीट पक्की करें 🎉", seatConfirmed:"सीट पक्की हो गई!",
    driverNotified:"✅ Driver को सूचना भेज दी गई!", passengerNotified:"✅ Passenger की बुकिंग पक्की!",
    rateYourRide:"राइड को रेट करें", rateDriver:"Driver को रेट करें", ratePassenger:"Passenger को रेट करें",
    submitRating:"रेटिंग दें", ratingThanks:"रेटिंग के लिए धन्यवाद!",
    shareLocation:"लाइव लोकेशन शेयर करें", whatsappShare:"WhatsApp पर भेजें",
    locationSent:"WhatsApp खुल गया! मैसेज भेजें।",
    bankTitle:"बैंक खाता जोड़ें", bankSave:"बैंक खाता सेव करें", bankLinked:"बैंक खाता जुड़ गया!",
    verifyTitle:"Driver सत्यापन", verifyStart:"सत्यापन शुरू करें", verifyDone:"दस्तावेज जमा हो गए!",
    rides:"राइड्स", offer:"ऑफर", earnings:"कमाई", verify:"सत्यापन",
    overview:"सारांश", transactions:"लेनदेन", bank:"बैंक", settings:"सेटिंग्स",
    postRide:"राइड पोस्ट करें 🚀", back:"← वापस", done:"हो गया",
    tripFrom:"से यात्रा", paying:"भुगतान", youGet:"आपको मिलेगा",
    platformFee:"प्लेटफॉर्म शुल्क", totalEarned:"कुल कमाई",
    bookings:"बुकिंग्स", activeDrivers:"सक्रिय ड्राइवर", rate:"दर",
    pending:"लंबित", verified:"सत्यापित", hsrp:"HSRP नंबर प्लेट",
    dl:"ड्राइविंग लाइसेंस", aadhar:"आधार कार्ड", carPhoto:"गाड़ी की फोटो",
    next:"आगे →", prev:"← वापस", submit:"जमा करें ✓",
    shareBtn:"📍 लोकेशन शेयर करें", 
 },
  hin: {
    appName:"CarWahan", tagline:"India ka apna ride-sharing",
    passenger:"Passenger hoon", passengerSub:"Ride dhundni hai",
    driver:"Driver hoon", driverSub:"Ride offer karni hai",
    admin:"Admin Panel", adminSub:"Commission & kamaai",
    search:"Khojo", from:"Kahan se", to:"Kahan tak", date:"Tarikh", seats:"Seats",
    popularRoutes:"Popular Routes", ridesFound:"rides mili",
    bookNow:"Pay & Book karo 💳", perSeat:"per seat",
    paymentTitle:"Payment", payMethod:"Payment method chuno",
    upi:"UPI / GPay / PhonePe", card:"Debit / Credit Card", netbank:"Net Banking",
    processing:"Payment ho rahi hai...", paySuccess:"Payment Successful!",
    confirmSeat:"Seat Confirm Karo 🎉", seatConfirmed:"Seat Confirm Ho Gayi!",
    driverNotified:"✅ Driver ko notification mil gayi!", passengerNotified:"✅ Passenger ki booking confirm!",
    rateYourRide:"Ride ko rate karo", rateDriver:"Driver ko rate karo", ratePassenger:"Passenger ko rate karo",
    submitRating:"Rating do", ratingThanks:"Rating ke liye shukriya!",
    shareLocation:"Live Location share karo", whatsappShare:"WhatsApp par bhejo",
    locationSent:"WhatsApp khul gaya! Message bhejo.",
    bankTitle:"Bank account jodo", bankSave:"Bank account save karo", bankLinked:"Bank account jud gaya!",
    verifyTitle:"Driver Verification", verifyStart:"Verification shuru karo", verifyDone:"Documents submit ho gaye!",
    rides:"Rides", offer:"Offer", earnings:"Kamaai", verify:"Verify",
    overview:"Overview", transactions:"Transactions", bank:"Bank", settings:"Settings",
    postRide:"Ride Post Karo 🚀", back:"← Wapas", done:"Done",
    tripFrom:"Trip se", paying:"Pay kar rahe ho", youGet:"Aapko milega",
    platformFee:"Platform fee", totalEarned:"Total Kamaai",
    bookings:"Bookings", activeDrivers:"Active Drivers", rate:"Rate",
    pending:"Pending", verified:"Verified", hsrp:"HSRP Number Plate",
    dl:"Driving Licence", aadhar:"Aadhar Card", carPhoto:"Gaadi ki Photo",
    next:"Aage →", prev:"← Wapas", submit:"Submit Karo ✓",
    shareBtn:"📍 Location Share Karo",
  }
};

const C = {  
  primary:"#E8441A", primaryDark:"#C73A14", primaryLight:"#FFF0EB",
  accent:"#1A1A2E", accentLight:"#2D2D4E",
  success:"#22C55E", warning:"#F59E0B", purple:"#8B5CF6",
  bg:"#F7F6F3", card:"#FFFFFF", text:"#1A1A2E", muted:"#6B7280", border:"#E5E7EB",
};

function calc(price, seats=1) {
  const gross = price*seats, commission = Math.round(gross*COMMISSION/100);
  return { gross, commission, driverEarns: gross-commission };
}

const mockRides = [
  { id:1, driver:"Rahul Sharma", avatar:"RS", from:"Delhi", to:"Jaipur", date:"15 Jun", time:"7:00 AM", seats:3, price:450, rating:4.8, totalRatings:42, trips:42, car:"Maruti Swift", carColor:"#4A90D9", verified:true, lat1:28.6139,lng1:77.2090,lat2:26.9124,lng2:75.7873 },
  { id:2, driver:"Priya Mehta",  avatar:"PM", from:"Delhi", to:"Jaipur", date:"15 Jun", time:"9:30 AM", seats:2, price:400, rating:4.9, totalRatings:87, trips:87, car:"Honda City",  carColor:"#E74C3C", verified:true, lat1:28.6139,lng1:77.2090,lat2:26.9124,lng2:75.7873 },
  { id:3, driver:"Amit Kumar",   avatar:"AK", from:"Delhi", to:"Agra",   date:"15 Jun", time:"6:00 AM", seats:1, price:300, rating:4.6, totalRatings:23, trips:23, car:"Hyundai Creta",carColor:"#27AE60",verified:false,lat1:28.6139,lng1:77.2090,lat2:27.1767,lng2:78.0081 },
];

// ── STYLES ────────────────────────────────────────────────────────────────────
const overlay = { position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1000 };
const sheet   = { background:C.card,borderRadius:"24px 24px 0 0",padding:"22px 20px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto" };
const inp     = { width:"100%",border:`1.5px solid ${C.border}`,borderRadius:12,padding:"12px",fontSize:14,outline:"none",boxSizing:"border-box" };
const lbl     = { fontSize:13,fontWeight:600,display:"block",marginBottom:6,color:C.text };
const btnP    = { width:"100%",padding:14,background:C.primary,border:"none",borderRadius:12,color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer",display:"block" };     
// ── STARS ────────────────────────────────────────────────────────────────────
function Stars({ rating, size=16 }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i<=Math.round(rating)?"#F59E0B":"#D1D5DB", fontSize:size }}>★</span>
      ))}
    </span>
  );
}

// ── NOTIFICATION TOAST ────────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:C.accent,color:"#fff",padding:"12px 24px",borderRadius:16,fontSize:14,fontWeight:600,zIndex:2000,boxShadow:"0 4px 20px rgba(0,0,0,0.3)",maxWidth:320,textAlign:"center" }}>
      {msg}
    </div>
  );
}

// ── RATING MODAL ──────────────────────────────────────────────────────────────
function RatingModal({ t, forRole, name, onClose }) {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [done, setDone] = useState(false);

  if (done) return (
    <div style={overlay}>
      <div style={{ ...sheet, textAlign:"center", padding:"32px 20px" }}>
        <div style={{ fontSize:52, marginBottom:10 }}>🌟</div>
        <div style={{ fontWeight:800, fontSize:20, marginBottom:6 }}>{t.ratingThanks}</div>
        <div style={{ color:C.muted, fontSize:14, marginBottom:20 }}>Aapne {stars} star diye {name} ko</div>
        <button onClick={onClose} style={btnP}>{t.done}</button>
      </div>
    </div>
  );
    return (
    <div style={overlay}>
      <div style={sheet}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
          <div style={{ fontWeight:800,fontSize:17 }}>{forRole==="driver"?t.rateDriver:t.ratePassenger}</div>
          <button onClick={onClose} style={{ background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.muted }}>✕</button>
        </div>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ width:64,height:64,borderRadius:"50%",background:C.primary,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:800,margin:"0 auto 10px" }}>
            {name.split(" ").map(n=>n[0]).join("").slice(0,2)}
          </div>
          <div style={{ fontWeight:700, fontSize:16 }}>{name}</div>
        </div>
        <div style={{ display:"flex",justifyContent:"center",gap:8,marginBottom:16 }}>
          {[1,2,3,4,5].map(i => (
            <span key={i} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)} onClick={()=>setStars(i)}
              style={{ fontSize:40,cursor:"pointer",color: (hover||stars)>=i?"#F59E0B":"#D1D5DB",transition:"color 0.1s" }}>★</span>
          ))}
        </div>
        {stars>0 && <div style={{ textAlign:"center",marginBottom:14,fontWeight:600,color:["","😤","😕","😐","😊","🤩"][stars]!==undefined?C.text:C.text }}>
          {["","Bahut bura 😤","Theek nahi 😕","Average 😐","Accha tha 😊","Zabardast! 🤩"][stars]}
        </div>}
        <div style={{ marginBottom:16 }}>
          <label style={lbl}>Comment (optional)</label>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Apna experience batao..."
            style={{ ...inp, height:80, resize:"none", fontFamily:"inherit" }} />
        </div>
        <button onClick={() => stars>0 && setDone(true)} style={{ ...btnP, opacity:stars>0?1:0.4 }}>{t.submitRating}</button>
      </div>
    </div>
  );
}
// ── PAYMENT MODAL ─────────────────────────────────────────────────────────────
function PaymentModal({ t, ride, onSuccess, onClose }) {
  const [step, setStep] = useState("method");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ num:"",expiry:"",cvv:"",name:"" });
  const { gross, commission, driverEarns } = calc(ride.price);

  const pay = () => { setStep("processing"); setTimeout(()=>setStep("done"),2500); };

  if (step==="processing") return (
    <div style={overlay}><div style={sheet}>
      <div style={{ textAlign:"center",padding:"32px 0" }}>
        <div style={{ fontSize:48,marginBottom:12 }}>⏳</div>
        <div style={{ fontWeight:700,fontSize:16 }}>{t.processing}</div>
        <div style={{ marginTop:20,height:4,background:C.border,borderRadius:4,overflow:"hidden" }}>
          <div style={{ height:"100%",background:C.primary,borderRadius:4,width:"100%",animation:"none",transition:"width 2.5s linear" }} />
        </div>
      </div>
    </div></div>
  );
  if (step==="done") return (
    <div style={overlay}><div style={sheet}>
      <div style={{ textAlign:"center",padding:"20px 0" }}>
        <div style={{ fontSize:56,marginBottom:10 }}>✅</div>
        <div style={{ fontWeight:800,fontSize:20,marginBottom:4 }}>{t.paySuccess}</div>
        <div style={{ color:C.muted,fontSize:14,marginBottom:20 }}>₹{gross} deduct ho gaye</div>
        <div style={{ background:"#F0FDF4",borderRadius:12,padding:14,marginBottom:16,textAlign:"left" }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
            <span style={{ fontSize:13,color:C.muted }}>{t.paying}</span><span style={{ fontWeight:700 }}>₹{gross}</span>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
            <span style={{ fontSize:13,color:C.muted }}>{t.platformFee} ({COMMISSION}%)</span><span style={{ fontWeight:700,color:C.primary }}>₹{commission}</span>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between" }}>
            <span style={{ fontSize:13,color:C.muted }}>Txn ID</span><span style={{ fontWeight:700,fontSize:12 }}>CW{Date.now().toString().slice(-8)}</span>
          </div>
        </div>
        <div style={{ background:"#EFF6FF",borderRadius:12,padding:12,marginBottom:16 }}>
          <div style={{ fontWeight:600,fontSize:13,color:"#1D4ED8" }}>{t.driverNotified}</div>
        </div>
        <button onClick={onSuccess} style={btnP}>{t.confirmSeat}</button>
      </div>
    </div></div>
  );
        return (
    <div style={overlay}><div style={sheet}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
        <div style={{ fontWeight:800,fontSize:17 }}>💳 {t.paymentTitle}</div>
        <button onClick={onClose} style={{ background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.muted }}>✕</button>
      </div>
      <div style={{ background:"linear-gradient(135deg,#FFF0EB,#FFE4D6)",border:`1px solid ${C.primary}33`,borderRadius:14,padding:"12px 16px",marginBottom:16 }}>
        {[[t.paying,`₹${gross}`,C.text],[`${t.platformFee} (${COMMISSION}%)`,`-₹${commission}`,C.primary],[t.youGet,`₹${driverEarns}`,C.success]].map(([l,v,col],i) => (
          <div key={i} style={{ display:"flex",justifyContent:"space-between",marginBottom:i<2?6:0,borderTop:i===2?`1px solid ${C.border}`:undefined,paddingTop:i===2?6:0 }}>
            <span style={{ color:C.muted,fontSize:13 }}>{l}</span>
            <span style={{ fontWeight:800,fontSize:13,color:col }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ fontWeight:700,fontSize:14,marginBottom:12 }}>{t.payMethod}</div>
      {step==="method" && (
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {[[t.upi,"📱","upi"],[t.card,"💳","card"],[t.netbank,"🏦","nb"]].map(([label,icon,id]) => (
            <button key={id} onClick={() => id==="nb"?pay():setStep(id)}
              style={{ padding:"14px 16px",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:14,cursor:"pointer",display:"flex",gap:14,alignItems:"center",textAlign:"left" }}>
              <span style={{ fontSize:26 }}>{icon}</span>
              <span style={{ fontWeight:700,fontSize:14 }}>{label}</span>
            </button>
          ))}
        </div>
      )}
      {step==="upi" && (
        <div>
          <label style={lbl}>UPI ID</label>
          <input value={upi} onChange={e=>setUpi(e.target.value)} placeholder="yourname@upi" style={{ ...inp,marginBottom:12 }} />
          <div style={{ display:"flex",gap:8,marginBottom:16 }}>
            {["GPay","PhonePe","Paytm","BHIM"].map(a => (
              <button key={a} onClick={()=>setUpi(a+"@upi")} style={{ flex:1,padding:"9px 4px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,fontSize:11,fontWeight:600,cursor:"pointer" }}>{a}</button>
            ))}
          </div>
          <button onClick={pay} style={{ ...btnP,opacity:upi?1:0.5 }}>₹{gross} Pay Karo</button>
        </div>
      )}
      {step==="card" && (
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div><label style={lbl}>Card Number</label><input value={card.num} onChange={e=>setCard({...card,num:e.target.value.replace(/\D/g,"").slice(0,16)})} placeholder="1234 5678 9012 3456" style={inp} /></div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            <div><label style={lbl}>Expiry</label><input value={card.expiry} onChange={e=>setCard({...card,expiry:e.target.value})} placeholder="MM/YY" style={inp} /></div>
            <div><label style={lbl}>CVV</label><input value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value.slice(0,3)})} placeholder="123" type="password" style={inp} /></div>
          </div>
          <div><label style={lbl}>Name on Card</label><input value={card.name} onChange={e=>setCard({...card,name:e.target.value})} placeholder="Rahul Sharma" style={inp} /></div>
          <button onClick={pay} style={{ ...btnP,opacity:card.num.length===16&&card.cvv.length===3?1:0.5 }}>₹{gross} Pay Karo 🔒</button>   
                    </div>
      )}
    </div></div>
  );
}
// ── LOCATION MODAL ────────────────────────────────────────────────────────────
function LocationModal({ t, userName, onClose }) {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const send = () => {
    if (!phone) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude: la, longitude: lo } = pos.coords;
        const msg = `🚗 *CarWahan - Live Location*\n\n${userName} apni location share kar raha/rahi hai:\n📍 https://www.google.com/maps?q=${la},${lo}\n\n_CarWahan se bheja gaya_`;
        window.open(`https://wa.me/91${phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`,"_blank");
      }, () => {
        const msg = `🚗 *CarWahan*\n\n${userName} apni trip share kar raha/rahi hai!\n_CarWahan se bheja gaya_`;
        window.open(`https://wa.me/91${phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`,"_blank");
      });
    }
    setSent(true);
  };
  return (
    <div style={overlay}><div style={sheet}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
        <div style={{ fontWeight:800,fontSize:17 }}>📍 {t.shareLocation}</div>
        <button onClick={onClose} style={{ background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.muted }}>✕</button>
      </div>
      {!sent ? <>
        <div style={{ background:"#F0FDF4",borderRadius:12,padding:12,marginBottom:16 }}>
          <div style={{ fontSize:13,color:"#166534" }}>📱 Google Maps link WhatsApp par jayegi</div>
        </div>
        <label style={lbl}>WhatsApp Number</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="9876543210" style={{ ...inp,marginBottom:16 }} type="tel" maxLength={10} />
        <button onClick={send} style={{ ...btnP,background:"#25D366",opacity:phone.length===10?1:0.5 }}>{t.whatsappShare}</button>
      </> : (
        <div style={{ textAlign:"center",padding:"20px 0" }}>
          <div style={{ fontSize:48,marginBottom:10 }}>✅</div>
          <div style={{ fontWeight:700,fontSize:16,marginBottom:16 }}>{t.locationSent}</div>
          <button onClick={onClose} style={btnP}>{t.done}</button>
        </div>
      )}
    </div></div>
  );
}
// ── BANK MODAL ────────────────────────────────────────────────────────────────
function BankModal({ t, onClose }) {
  const [form, setForm] = useState({ name:"",account:"",ifsc:"",bank:"" });
  const [saved, setSaved] = useState(false);
  if (saved) return (
    <div style={overlay}><div style={sheet}>
      <div style={{ textAlign:"center",padding:"20px 0" }}>
        <div style={{ fontSize:52,marginBottom:10 }}>🏦</div>
        <div style={{ fontWeight:800,fontSize:18,marginBottom:6 }}>{t.bankLinked}</div>
        <div style={{ background:"#F0FDF4",borderRadius:12,padding:14,marginBottom:20,textAlign:"left" }}>
          <div style={{ fontWeight:600 }}>{form.bank}</div>
          <div style={{ color:C.muted,fontSize:12 }}>A/C: ****{form.account.slice(-4)} · IFSC: {form.ifsc}</div>
        </div>
        <button onClick={onClose} style={btnP}>{t.done}</button>
      </div>
    </div></div>
  );
  return (
    <div style={overlay}><div style={sheet}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
        <div style={{ fontWeight:800,fontSize:17 }}>🏦 {t.bankTitle}</div>
        <button onClick={onClose} style={{ background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.muted }}>✕</button>
      </div>
      <div style={{ background:C.primaryLight,borderRadius:12,padding:12,marginBottom:16 }}>
        <div style={{ fontSize:12,color:C.primaryDark,fontWeight:600 }}>💰 {COMMISSION}% commission seedha aapke account mein</div>
      </div>
      {[["name","Account Holder Name","Rahul Sharma"],["account","Account Number","1234567890"],["ifsc","IFSC Code","SBIN0001234"],["bank","Bank Name","State Bank of India"]].map(([key,label,ph]) => (
        <div key={key} style={{ marginBottom:12 }}>
          <label style={lbl}>{label}</label>
          <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={ph} style={inp} />
        </div>
      ))}
      <button onClick={() => form.name&&form.account&&form.ifsc?setSaved(true):null} style={{ ...btnP,marginTop:4,opacity:form.name&&form.account&&form.ifsc?1:0.5 }}>{t.bankSave}</button>
    </div></div>
  );
}
// ── VERIFY MODAL ──────────────────────────────────────────────────────────────
function VerifyModal({ t, onClose }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ hsrp:"",dl:"",aadhar:"" });
  const [uploads, setUploads] = useState({ hsrp:false,dl:false,aadhar:false,car:false });
  const [done, setDone] = useState(false);
  if (done) return (
    <div style={overlay}><div style={sheet}>
      <div style={{ textAlign:"center",padding:"20px 0" }}>
        <div style={{ fontSize:52,marginBottom:10 }}>🎉</div>
        <div style={{ fontWeight:800,fontSize:18,marginBottom:6 }}>{t.verifyDone}</div>
        <div style={{ color:C.muted,fontSize:13,marginBottom:16 }}>24-48 ghante mein verify hoga · SMS aayega</div>
        <button onClick={onClose} style={btnP}>{t.done}</button>
      </div>
    </div></div>
  );
  const steps = [
    { title:`🚗 ${t.hsrp}`, body: <>
      <div style={{ background:"#FFF7ED",border:`1px solid #FED7AA`,borderRadius:12,padding:12,marginBottom:14 }}>
        <div style={{ fontSize:12,color:"#C2410C",fontWeight:600 }}>⚠️ HSRP plate mandatory hai — bina iske reject hoga</div>
      </div>
      <label style={lbl}>Vehicle Registration Number</label>
      <input value={data.hsrp} onChange={e=>setData({...data,hsrp:e.target.value.toUpperCase()})} placeholder="DL01AB1234" style={{ ...inp,fontFamily:"monospace",letterSpacing:2,fontSize:16,fontWeight:700,marginBottom:14 }} />
      <label style={lbl}>HSRP Plate Photo</label>
      <UpBox done={uploads.hsrp} onUp={()=>setUploads({...uploads,hsrp:true})} label="HSRP plate clear photo" />
    </> },
    { title:`🪪 ${t.dl}`, body: <>
      <label style={lbl}>DL Number</label>
      <input value={data.dl} onChange={e=>setData({...data,dl:e.target.value.toUpperCase()})} placeholder="DL0420110012345" style={{ ...inp,fontFamily:"monospace",marginBottom:14 }} />
      <label style={lbl}>DL Front Photo</label>
      <UpBox done={uploads.dl} onUp={()=>setUploads({...uploads,dl:true})} label="DL front side" />
    </> },
    { title:`🆔 ${t.aadhar}`, body: <>
      <label style={lbl}>Aadhar Number</label>
      <input value={data.aadhar} onChange={e=>setData({...data,aadhar:e.target.value.replace(/\D/g,"").slice(0,12)})} placeholder="1234 5678 9012" style={{ ...inp,fontFamily:"monospace",letterSpacing:2,marginBottom:14 }} />
      <label style={lbl}>Aadhar Card Photo</label>
      <UpBox done={uploads.aadhar} onUp={()=>setUploads({...uploads,aadhar:true})} label="Aadhar front" />
      <div style={{ background:"#F0F9FF",borderRadius:12,padding:12,marginTop:12 }}>
        <div style={{ fontSize:12,color:"#0369A1" }}>🔒 Data encrypted rahega. CarWahan kabhi share nahi karega.</div>
      </div>
    </> },
    { title:`🚙 ${t.carPhoto}`, body: <>
      <label style={lbl}>Car Model</label>
      <input placeholder="Maruti Swift 2022" style={{ ...inp,marginBottom:12 }} />
      <label style={lbl}>Car Photo (HSRP plate visible)</label>
      <UpBox done={uploads.car} onUp={()=>setUploads({...uploads,car:true})} label="Car with number plate" />
    </> },
  ];
         return (
    <div style={overlay}><div style={sheet}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
        <div style={{ fontWeight:800,fontSize:16 }}>{steps[step].title}</div>
        <button onClick={onClose} style={{ background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.muted }}>✕</button>
      </div>
      <div style={{ display:"flex",gap:6,marginBottom:18 }}>
        {steps.map((_,i) => <div key={i} style={{ flex:1,height:4,borderRadius:4,background:i<=step?C.primary:C.border }} />)}
      </div>
      {steps[step].body}
      <div style={{ display:"flex",gap:10,marginTop:16 }}>
        {step>0 && <button onClick={()=>setStep(step-1)} style={{ flex:1,padding:14,background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,fontWeight:700,cursor:"pointer" }}>{t.prev}</button>}
        <button onClick={()=>step<steps.length-1?setStep(step+1):setDone(true)}
          style={{ flex:2,padding:14,background:C.primary,border:"none",borderRadius:12,color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer" }}>
          {step<steps.length-1?t.next:t.submit}
        </button>
      </div>
    </div></div>
  );
}

function UpBox({ done, onUp, label }) {
  return (
    <div onClick={onUp} style={{ border:`2px dashed ${done?C.success:C.border}`,borderRadius:12,padding:16,textAlign:"center",cursor:"pointer",background:done?"#F0FDF4":C.bg }}>
      {done ? <div style={{ color:C.success,fontWeight:700 }}>✅ {label} uploaded</div>
             : <><div style={{ fontSize:28,marginBottom:4 }}>📷</div><div style={{ fontSize:13,color:C.muted }}>{label}</div></>}
    </div>
  );
}

// ── MINI MAP ──────────────────────────────────────────────────────────────────
function MiniMap({ from, to }) {
  return (
    <div style={{ background:"linear-gradient(90deg,#e8f4f8,#d1eaf5)",borderRadius:12,padding:"9px 14px",display:"flex",gap:8,alignItems:"center" }}>
      <span style={{ fontSize:16 }}>📍</span>
      <span style={{ fontSize:12,color:C.muted,flex:1 }}>{from} → {to}</span>
      <a href={`https://www.google.com/maps/dir/${encodeURIComponent(from)}/${encodeURIComponent(to)}`} target="_blank" rel="noreferrer"
        style={{ fontSize:12,color:C.primary,fontWeight:700,textDecoration:"none",background:C.primaryLight,padding:"5px 12px",borderRadius:20 }}>Maps ↗</a>
    </div>
  );
}

// ── LANGUAGE SWITCHER ─────────────────────────────────────────────────────────
function LangBar({ lang, setLang }) {
  return (
    <div style={{ display:"flex",gap:4 }}>
      {[["en","EN"],["hi","हि"],["hin","HIN"]].map(([l,label]) => (
        <button key={l} onClick={()=>setLang(l)}
          style={{ padding:"5px 10px",borderRadius:20,border:"none",background:lang===l?C.primary:"rgba(255,255,255,0.15)",color:lang===l?"#fff":"rgba(255,255,255,0.7)",fontWeight:700,fontSize:11,cursor:"pointer" }}>
          {label}
        </button>
      ))}
    </div>
  );
                      }   
// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function CarWahanApp() {
  const [lang, setLang] = useState("hin");
  const t = T[lang];
  const [role, setRole] = useState(null);
  const [searchDone, setSearchDone] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [bookingDone, setBookingDone] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [toast, setToast] = useState(null);
  const [driverTab, setDriverTab] = useState("rides");
  const [adminTab, setAdminTab] = useState("overview");
  const [offerStep, setOfferStep] = useState("form");
  const [searchForm, setSearchForm] = useState({ from:"Delhi", to:"Jaipur", date:"15 Jun", seats:1 });
  const [offerForm, setOfferForm] = useState({ from:"", to:"", date:"", time:"", seats:"3", price:"" });
  const [driverRatings, setDriverRatings] = useState({ 1:4.8, 2:4.9, 3:4.6 });
  const reset = () => { setRole(null); setSearchDone(false); setSelectedRide(null); setBookingDone(false); setShowPayment(false); setShowRating(false); setOfferStep("form"); };
  // ── LANDING ────────────────────────────────────────────────────────────────
  if (!role) return (
    <div style={{ minHeight:"100vh",background:C.accent,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'Segoe UI',sans-serif" }}>
      <div style={{ position:"absolute",top:20,right:20 }}><LangBar lang={lang} setLang={setLang} /></div>
      <div style={{ textAlign:"center",marginBottom:40 }}>
        <div style={{ fontSize:52,marginBottom:6 }}>🚗</div>
        <h1 style={{ color:"#fff",fontSize:40,fontWeight:900,margin:0,letterSpacing:-2 }}>Car<span style={{ color:C.primary }}>Wahan</span></h1>
        <p style={{ color:"#888",fontSize:13,margin:"6px 0 0" }}>{t.tagline}</p>
      </div>
      <div style={{ width:"100%",maxWidth:360 }}>
        {[
          { r:"passenger",icon:"🧳",title:t.passenger,sub:t.passengerSub },
          { r:"driver",icon:"🚙",title:t.driver,sub:t.driverSub },
          { r:"admin",icon:"🏢",title:t.admin,sub:t.adminSub },
        ].map(({ r,icon,title,sub }) => (
          <button key={r} onClick={()=>setRole(r)}
            style={{ width:"100%",padding:"16px 20px",background:r==="passenger"?C.primary:r==="driver"?"transparent":"#ffffff18",border:r==="driver"?`2px solid ${C.primary}`:"2px solid transparent",borderRadius:16,color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",marginBottom:12,display:"flex",alignItems:"center",gap:14 }}>
            <span style={{ fontSize:28 }}>{icon}</span>
            <div style={{ textAlign:"left" }}><div>{title}</div><div style={{ fontSize:12,fontWeight:400,opacity:0.75 }}>{sub}</div></div>
          </button>
        ))}
      </div>
    </div>
  );
             // ── BOOKING DONE ───────────────────────────────────────────────────────────
  if (role==="passenger" && bookingDone && selectedRide) return (
    <div style={{ minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      {toast && <Toast msg={toast} onDone={()=>setToast(null)} />}
      <div style={{ background:C.card,borderRadius:24,padding:28,maxWidth:400,width:"100%",boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ textAlign:"center",marginBottom:20 }}>
          <div style={{ fontSize:56,marginBottom:8 }}>🎉</div>
          <h2 style={{ fontWeight:800,fontSize:22,margin:"0 0 6px" }}>{t.seatConfirmed}</h2>
          <p style={{ color:C.muted,fontSize:14,margin:0 }}>Payment done · Seat pakki</p>
        </div>
        <div style={{ background:"#EFF6FF",borderRadius:12,padding:12,marginBottom:14 }}>
          <div style={{ fontWeight:600,fontSize:13,color:"#1D4ED8" }}>{t.driverNotified}</div>
        </div>
        <div style={{ background:C.primaryLight,borderRadius:16,padding:18,marginBottom:16 }}>
          {[["Route",`${selectedRide.from} → ${selectedRide.to}`],["Driver",selectedRide.driver],["Time",`${selectedRide.date} · ${selectedRide.time}`],["Paid",`₹${selectedRide.price}`]].map(([k,v],i) => (
            <div key={i} style={{ display:"flex",justifyContent:"space-between",marginBottom:i<3?8:0 }}>
              <span style={{ color:C.muted,fontSize:13 }}>{k}</span><span style={{ fontWeight:700,fontSize:14 }}>{v}</span>
            </div>
          ))}
        </div>
        <MiniMap from={selectedRide.from} to={selectedRide.to} />
        {/* Rating */}
        <div style={{ background:C.bg,borderRadius:14,padding:14,marginTop:14,marginBottom:14 }}>
          <div style={{ fontWeight:700,fontSize:13,marginBottom:8 }}>⭐ {t.rateDriver}: {selectedRide.driver}</div>
          <div style={{ display:"flex",gap:4,marginBottom:8 }}>
            <Stars rating={selectedRide.rating} size={20} />
            <span style={{ fontWeight:700,fontSize:14,marginLeft:4 }}>{selectedRide.rating}</span>
            <span style={{ color:C.muted,fontSize:12,alignSelf:"center" }}>({selectedRide.totalRatings} ratings)</span>
          </div>
          <button onClick={()=>setShowRating(true)} style={{ ...btnP,padding:"10px 16px",fontSize:13 }}>{t.rateDriver} ⭐</button>
        </div>

        <button onClick={()=>setShowLocation(true)} style={{ ...btnP,background:"#25D366",marginBottom:10 }}>📍 {t.whatsappShare}</button>
        <button onClick={reset} style={{ ...btnP,background:C.accent }}>{t.back}</button>
      </div>
      {showRating && <RatingModal t={t} forRole="driver" name={selectedRide.driver} onClose={()=>setShowRating(false)} />}
      {showLocation && <LocationModal t={t} userName="Passenger" onClose={()=>setShowLocation(false)} />}
    </div>
  );
  // ── RIDE DETAIL ────────────────────────────────────────────────────────────
  if (role==="passenger" && selectedRide) return (
    <div style={{ minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',sans-serif" }}>
      <div style={{ background:C.accent,padding:"20px 20px 28px",color:"#fff" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <button onClick={()=>setSelectedRide(null)} style={{ background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer" }}>←</button>
          <LangBar lang={lang} setLang={setLang} />
        </div>
        <h2 style={{ margin:"8px 0 4px",fontSize:20,fontWeight:800 }}>{selectedRide.from} → {selectedRide.to}</h2>
        <p style={{ margin:0,opacity:0.7,fontSize:13 }}>{selectedRide.date} · {selectedRide.time}</p>
      </div>
      <div style={{ padding:"16px 16px 100px" }}>
        <MiniMap from={selectedRide.from} to={selectedRide.to} />
        <div style={{ background:C.card,borderRadius:20,padding:20,boxShadow:"0 2px 12px rgba(0,0,0,0.07)",marginTop:14,marginBottom:14 }}>
          <div style={{ display:"flex",gap:14,alignItems:"center",marginBottom:14 }}>
            <div style={{ width:52,height:52,borderRadius:"50%",background:selectedRide.carColor,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16 }}>{selectedRide.avatar}</div>
            <div>
              <div style={{ fontWeight:800,fontSize:16 }}>{selectedRide.driver}</div>
              <div style={{ color:C.muted,fontSize:13 }}>{selectedRide.car} · {selectedRide.trips} trips</div>
              <div style={{ display:"flex",gap:6,alignItems:"center",marginTop:4 }}>
                <Stars rating={selectedRide.rating} size={14} />
                <span style={{ fontWeight:700,fontSize:14 }}>{selectedRide.rating}</span>
                <span style={{ color:C.muted,fontSize:12 }}>({selectedRide.totalRatings})</span>
                {selectedRide.verified && <span style={{ background:"#DCFCE7",color:"#166534",fontSize:10,padding:"2px 8px",borderRadius:20 }}>✓ {t.verified}</span>}
              </div>
            </div>
          </div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            {[["💺",t.seats,`${selectedRide.seats} available`],["⏱️","Duration","~5h 20m"],["🚗","Car",selectedRide.car],["💰","Price",`₹${selectedRide.price}/${t.perSeat}`]].map(([icon,label,val],i) => (
              <div key={i} style={{ background:C.bg,borderRadius:12,padding:"11px 14px" }}>
                <div style={{ fontSize:18,marginBottom:3 }}>{icon}</div>
                <div style={{ fontSize:11,color:C.muted }}>{label}</div>
                <div style={{ fontWeight:700,fontSize:13 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:"linear-gradient(135deg,#FFF0EB,#FFE4D6)",border:`1px solid ${C.primary}33`,borderRadius:14,padding:"12px 16px" }}>
          {[[t.paying,`₹${calc(selectedRide.price).gross}`,C.text],[`${t.platformFee} (${COMMISSION}%)`,`-₹${calc(selectedRide.price).commission}`,C.primary],[t.youGet,`₹${calc(selectedRide.price).driverEarns}`,C.success]].map(([l,v,col],i) => (
            <div key={i} style={{ display:"flex",justifyContent:"space-between",marginBottom:i<2?6:0 }}>
              <span style={{ color:C.muted,fontSize:13 }}>{l}</span><span style={{ fontWeight:800,fontSize:13,color:col }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position:"fixed",bottom:0,left:0,right:0,padding:"14px 20px",background:C.card,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div>
          <div style={{ fontSize:26,fontWeight:900,color:C.primary }}>₹{selectedRide.price}</div>
          <div style={{ fontSize:11,color:C.muted }}>{t.perSeat} · {COMMISSION}% fee</div>
        </div>
        <button onClick={()=>setShowPayment(true)} style={{ padding:"13px 28px",background:C.primary,border:"none",borderRadius:12,color:"#fff",fontWeight:700,fontSize:16,cursor:"pointer" }}>{t.bookNow}</button>
      </div>
      {showPayment && <PaymentModal t={t} ride={selectedRide} onSuccess={()=>{setShowPayment(false);setBookingDone(true);setToast(t.passengerNotified);}} onClose={()=>setShowPayment(false)} />}
    </div>
  );
  // ── PASSENGER HOME ─────────────────────────────────────────────────────────
  if (role==="passenger") return (
    <div style={{ minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',sans-serif" }}>
      {toast && <Toast msg={toast} onDone={()=>setToast(null)} />}
      <div style={{ background:C.accent,padding:"20px 20px 28px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
          <div><h1 style={{ color:"#fff",margin:0,fontSize:22,fontWeight:900 }}>🚗 {t.appName}</h1><p style={{ color:"#666",margin:0,fontSize:12 }}>{t.tagline}</p></div>
          <div style={{ display:"flex",gap:6,flexDirection:"column",alignItems:"flex-end" }}>
            <LangBar lang={lang} setLang={setLang} />
            <div style={{ display:"flex",gap:6 }}>
              <button onClick={()=>setShowLocation(true)} style={{ background:"#25D366",border:"none",color:"#fff",padding:"6px 12px",borderRadius:20,cursor:"pointer",fontSize:11,fontWeight:600 }}>📍</button>
              <button onClick={reset} style={{ background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",padding:"6px 12px",borderRadius:20,cursor:"pointer",fontSize:11 }}>⇄</button>
            </div>
          </div>
        </div>
        <div style={{ background:C.card,borderRadius:20,padding:16 }}>
          <div style={{ display:"flex",gap:8,marginBottom:10 }}>
            <div style={{ flex:1 }}>
              <label style={{ fontSize:11,color:C.muted,display:"block",marginBottom:4 }}>{t.from}</label>
              <input value={searchForm.from} onChange={e=>setSearchForm({...searchForm,from:e.target.value})} style={{ width:"100%",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,fontWeight:600,outline:"none",boxSizing:"border-box" }} />
            </div>
            <button onClick={()=>setSearchForm({...searchForm,from:searchForm.to,to:searchForm.from})} style={{ alignSelf:"flex-end",marginBottom:1,background:C.primaryLight,border:"none",borderRadius:8,padding:"10px 11px",cursor:"pointer",fontSize:16 }}>⇄</button>
            <div style={{ flex:1 }}>
              <label style={{ fontSize:11,color:C.muted,display:"block",marginBottom:4 }}>{t.to}</label>
              <input value={searchForm.to} onChange={e=>setSearchForm({...searchForm,to:e.target.value})} style={{ width:"100%",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,fontWeight:600,outline:"none",boxSizing:"border-box" }} />
            </div>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            <input value={searchForm.date} onChange={e=>setSearchForm({...searchForm,date:e.target.value})} style={{ flex:2,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,outline:"none" }} />
            <select value={searchForm.seats} onChange={e=>setSearchForm({...searchForm,seats:e.target.value})} style={{ width:64,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 8px",fontSize:14,outline:"none" }}>
              {[1,2,3,4].map(n=><option key={n}>{n}</option>)}
            </select>
            <button onClick={()=>setSearchDone(true)} style={{ flex:1,background:C.primary,border:"none",borderRadius:10,color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14 }}>{t.search}</button>
          </div>
        </div>
      </div>
                <div style={{ padding:"14px 16px 32px" }}>
        {!searchDone ? (
          <div>
            <p style={{ fontSize:13,fontWeight:700,margin:"0 0 12px" }}>{t.popularRoutes}</p>
            {[{from:"Delhi",to:"Jaipur",price:400,time:"5h 20m"},{from:"Mumbai",to:"Pune",price:230,time:"2h 45m"},{from:"Bangalore",to:"Mysore",price:180,time:"2h 30m"}].map((r,i) => (
              <div key={i} onClick={()=>{setSearchForm({...searchForm,from:r.from,to:r.to});setSearchDone(true);}} style={{ background:C.card,borderRadius:16,padding:"14px 16px",marginBottom:10,cursor:"pointer",boxShadow:"0 1px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                  <div><div style={{ fontWeight:700,fontSize:15 }}>{r.from} → {r.to}</div><div style={{ color:C.muted,fontSize:13 }}>{r.time} · From ₹{r.price}</div></div>
                  <span style={{ color:C.primary,fontSize:18 }}>→</span>
                </div>
                <MiniMap from={r.from} to={r.to} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:14 }}>
              <p style={{ fontWeight:700,fontSize:15,margin:0 }}>{mockRides.length} {t.ridesFound}</p>
              <span style={{ color:C.muted,fontSize:13 }}>{searchForm.from} → {searchForm.to}</span>
            </div>
            {mockRides.map(ride => (
              <div key={ride.id} onClick={()=>setSelectedRide(ride)} style={{ background:C.card,borderRadius:20,padding:18,marginBottom:14,cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
                  <div style={{ display:"flex",gap:12,alignItems:"center" }}>
                    <div style={{ width:44,height:44,borderRadius:"50%",background:ride.carColor,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14 }}>{ride.avatar}</div>
                    <div>
                      <div style={{ fontWeight:700,fontSize:15 }}>{ride.driver}</div>
                      <div style={{ display:"flex",gap:4,alignItems:"center",marginTop:2 }}>
                        <Stars rating={ride.rating} size={12} />
                        <span style={{ fontWeight:700,fontSize:13 }}>{ride.rating}</span>
                        <span style={{ color:C.muted,fontSize:11 }}>({ride.totalRatings})</span>
                        {ride.verified && <span style={{ background:"#DCFCE7",color:"#166534",fontSize:10,padding:"1px 6px",borderRadius:20 }}>✓</span>}
                      </div>
                      <div style={{ color:C.muted,fontSize:12 }}>{ride.car} · {ride.time}</div>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:22,fontWeight:900,color:C.primary }}>₹{ride.price}</div>
                    <div style={{ fontSize:10,color:C.muted }}>{t.perSeat}</div>
                  </div>
                </div>
                <MiniMap from={ride.from} to={ride.to} />
                <div style={{ display:"flex",gap:4,alignItems:"center",marginTop:10 }}>
                  {Array.from({length:ride.seats}).map((_,i)=><span key={i} style={{ fontSize:14 }}>💺</span>)}
                  <span style={{ color:C.muted,fontSize:12,marginLeft:4 }}>{ride.seats} seats</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showLocation && <LocationModal t={t} userName="Passenger" onClose={()=>setShowLocation(false)} />}
    </div>
  );
        // ── ADMIN ──────────────────────────────────────────────────────────────────
  if (role==="admin") return (
    <div style={{ minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',sans-serif" }}>
      <div style={{ background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,padding:"20px 20px 24px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
          <div><h1 style={{ color:"#fff",margin:0,fontSize:20,fontWeight:900 }}>🏢 {t.appName} Admin</h1><p style={{ color:"#888",margin:0,fontSize:12 }}>{t.adminSub}</p></div>
          <div style={{ display:"flex",gap:8,flexDirection:"column",alignItems:"flex-end" }}>
            <LangBar lang={lang} setLang={setLang} />
            <button onClick={reset} style={{ background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",padding:"6px 12px",borderRadius:20,cursor:"pointer",fontSize:11 }}>{t.back}</button>
          </div>
        </div>
      </div>
      <div style={{ display:"flex",background:C.card,padding:"0 12px",borderBottom:`1px solid ${C.border}` }}>
        {[[t.overview,"overview"],[t.transactions,"transactions"],[t.bank,"bank"],[t.settings,"settings"]].map(([l,tab]) => (
          <button key={tab} onClick={()=>setAdminTab(tab)} style={{ flex:1,padding:"13px 0",border:"none",background:"none",borderBottom:adminTab===tab?`3px solid ${C.primary}`:"3px solid transparent",color:adminTab===tab?C.primary:C.muted,fontWeight:adminTab===tab?700:500,fontSize:11,cursor:"pointer" }}>{l}</button>
        ))}
      </div>
      <div style={{ padding:16 }}>
        {adminTab==="overview" && <>
          <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryDark})`,borderRadius:20,padding:24,marginBottom:16,color:"#fff" }}>
            <div style={{ fontSize:12,opacity:0.8,marginBottom:4 }}>{t.totalEarned}</div>
            <div style={{ fontSize:40,fontWeight:900 }}>₹57,860</div>
            <div style={{ fontSize:12,opacity:0.75,marginTop:4 }}>1,284 {t.bookings} · {COMMISSION}% commission each</div>
            <div style={{ background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"10px 16px",marginTop:14 }}>
              <span style={{ fontSize:13 }}>Is mahine: </span><span style={{ fontWeight:800,fontSize:16 }}>₹12,340</span>
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            {[["🎟️","1,284",t.bookings,C.purple],["📊","₹45","Avg/booking",C.warning],["🚗","342",t.activeDrivers,C.success],["⚙️","10%",t.rate,C.primary]].map(([icon,val,label,col],i) => (
              <div key={i} style={{ background:C.card,borderRadius:16,padding:16,textAlign:"center",boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize:26,marginBottom:6 }}>{icon}</div>
                <div style={{ fontSize:20,fontWeight:800,color:col }}>{val}</div>
                <div style={{ fontSize:11,color:C.muted }}>{label}</div>
              </div>
            ))}
          </div>
        </>}
        {adminTab==="transactions" && <>
          <h3 style={{ fontSize:15,fontWeight:700,margin:"0 0 14px" }}>{t.transactions}</h3>
          {[{route:"Delhi→Jaipur",p:"Neha G.",d:"Rahul S.",amt:450,comm:45,time:"2h ago"},{route:"Mumbai→Pune",p:"Ravi K.",d:"Sonal M.",amt:250,comm:25,time:"4h ago"},{route:"Bangalore→Mysore",p:"Aisha T.",d:"Dev P.",amt:200,comm:20,time:"6h ago"}].map((tx,i) => (
            <div key={i} style={{ background:C.card,borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                <div><div style={{ fontWeight:700,fontSize:14 }}>{tx.route}</div><div style={{ color:C.muted,fontSize:12 }}>{tx.time}</div></div>
                <div style={{ textAlign:"right" }}><div style={{ fontWeight:800,color:C.primary }}>+₹{tx.comm}</div><div style={{ fontSize:11,color:C.muted }}>commission</div></div>
              </div>
              <div style={{ display:"flex",justifyContent:"space-between",background:C.bg,borderRadius:10,padding:"8px 12px" }}>
                <span style={{ fontSize:12 }}>👤 {tx.p}</span><span style={{ fontSize:12,color:C.muted }}>₹{tx.amt}</span><span style={{ fontSize:12 }}>🚗 {tx.d}</span>
              </div>
            </div>
          ))}
        </>}
        {adminTab==="bank" && <>
          <div style={{ background:C.card,borderRadius:20,padding:20,boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bg,borderRadius:12,padding:14,marginBottom:14 }}>
              <div><div style={{ fontWeight:700,fontSize:18,color:C.primary }}>₹3,200</div><div style={{ fontSize:12,color:C.muted }}>Available to withdraw</div></div>
              <button onClick={()=>setShowBank(true)} style={{ padding:"10px 18px",background:C.primary,border:"none",borderRadius:12,color:"#fff",fontWeight:700,cursor:"pointer" }}>Nikalo</button>
            </div>
            <button onClick={()=>setShowBank(true)} style={{ ...btnP,background:C.accent }}>🏦 {t.bankTitle}</button>
          </div>
        </>}
        {adminTab==="settings" && <div style={{ background:C.card,borderRadius:20,padding:20,boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ textAlign:"center",padding:"10px 0 20px" }}>
            <div style={{ fontSize:40,fontWeight:900,color:C.primary }}>10%</div>
            <div style={{ color:C.muted,fontSize:14 }}>Platform commission rate</div>
          </div>
          <div style={{ background:"#FFFBEB",borderRadius:12,padding:12 }}>
            <div style={{ fontSize:12,color:"#92400E" }}>Rate change karne ke liye code line 3 mein COMMISSION update karo</div>
          </div>
        </div>}
      </div>
      {showBank && <BankModal t={t} onClose={()=>setShowBank(false)} />}
    </div>
  );
         // ── DRIVER ─────────────────────────────────────────────────────────────────
  if (role==="driver") {
    if (offerStep==="success") return (
      <div style={{ minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
        <div style={{ background:C.card,borderRadius:24,padding:28,maxWidth:400,width:"100%",textAlign:"center",boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize:56,marginBottom:10 }}>🚀</div>
          <h2 style={{ fontWeight:800,fontSize:20,margin:"0 0 6px" }}>Ride Live Ho Gayi!</h2>
          <p style={{ color:C.muted,fontSize:14,marginBottom:16 }}>Passengers ab book kar sakte hain</p>
          <MiniMap from={offerForm.from||"Delhi"} to={offerForm.to||"Jaipur"} />
          <div style={{ background:"#EFF6FF",borderRadius:12,padding:12,marginTop:14,marginBottom:14 }}>
            <div style={{ fontWeight:600,fontSize:13,color:"#1D4ED8" }}>{t.passengerNotified}</div>
          </div>
          <button onClick={()=>setShowLocation(true)} style={{ ...btnP,background:"#25D366",marginBottom:10 }}>📍 {t.shareBtn}</button>
          <button onClick={()=>{setOfferStep("form");setDriverTab("rides");}} style={{ ...btnP,background:C.accent }}>Dashboard Dekho</button>
        </div>
        {showLocation && <LocationModal t={t} userName="Driver" onClose={()=>setShowLocation(false)} />}
      </div>
    );
    return (
      <div style={{ minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',sans-serif" }}>
        {toast && <Toast msg={toast} onDone={()=>setToast(null)} />}
        <div style={{ background:C.accent,padding:"20px 20px 22px" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div><h1 style={{ color:"#fff",margin:0,fontSize:20,fontWeight:900 }}>🚗 {t.appName} Driver</h1><p style={{ color:"#666",margin:0,fontSize:12 }}>Dashboard</p></div>
            <div style={{ display:"flex",gap:6,flexDirection:"column",alignItems:"flex-end" }}>
              <LangBar lang={lang} setLang={setLang} />
              <div style={{ display:"flex",gap:6 }}>
                <button onClick={()=>setShowLocation(true)} style={{ background:"#25D366",border:"none",color:"#fff",padding:"6px 10px",borderRadius:20,cursor:"pointer",fontSize:11,fontWeight:600 }}>📍</button>
                <button onClick={reset} style={{ background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",padding:"6px 10px",borderRadius:20,cursor:"pointer",fontSize:11 }}>⇄</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display:"flex",background:C.card,padding:"0 8px",borderBottom:`1px solid ${C.border}` }}>
          {[[t.rides,"rides"],[t.offer,"offer"],[t.earnings,"earnings"],[t.verify,"verify"]].map(([l,tab]) => (
            <button key={tab} onClick={()=>setDriverTab(tab)} style={{ flex:1,padding:"13px 0",border:"none",background:"none",borderBottom:driverTab===tab?`3px solid ${C.primary}`:"3px solid transparent",color:driverTab===tab?C.primary:C.muted,fontWeight:driverTab===tab?700:500,fontSize:12,cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        <div style={{ padding:16 }}>
          {driverTab==="rides" && (
            [
              { id:1,from:"Delhi",to:"Jaipur",date:"15 Jun",time:"7:00 AM",seats:3,booked:1,price:450,passengers:[{name:"Neha G.",avatar:"NG",rating:4.5}] },
              { id:2,from:"Jaipur",to:"Delhi",date:"18 Jun",time:"8:00 AM",seats:3,booked:0,price:450,passengers:[] },
            ].map(ride => {
              const { commission, driverEarns } = calc(ride.price, ride.booked);
              return (
                <div key={ride.id} style={{ background:C.card,borderRadius:20,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:12 }}>
                    <div><div style={{ fontWeight:800,fontSize:16 }}>{ride.from} → {ride.to}</div><div style={{ color:C.muted,fontSize:13 }}>{ride.date} · {ride.time}</div></div>
                    <span style={{ background:ride.booked>0?"#DCFCE7":C.primaryLight,color:ride.booked>0?"#166534":C.primary,fontSize:12,padding:"4px 10px",borderRadius:20,fontWeight:600 }}>
                      {ride.booked>0?`${ride.booked} booked`:"Waiting"}
                    </span>
                  </div>
                  <MiniMap from={ride.from} to={ride.to} />
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:12 }}>
                    {[["Seats",`${ride.booked}/${ride.seats}`,C.text],["Gross",`₹${ride.price*ride.booked}`,C.text],["Aapko",ride.booked>0?`₹${driverEarns}`:"₹0",C.success]].map(([l,v,col],i) => (
                      <div key={i} style={{ background:C.bg,borderRadius:12,padding:"10px",textAlign:"center" }}>
                        <div style={{ fontSize:14,fontWeight:800,color:col }}>{v}</div>
                        <div style={{ fontSize:10,color:C.muted }}>{l}</div>
                      </div>
                    ))}
                  </div>   
                            {ride.booked>0 && <div style={{ background:"#FFFBEB",borderRadius:10,padding:"8px 12px",marginTop:10,fontSize:12,color:"#92400E" }}>⚠️ CarWahan ₹{commission} commission kaatega</div>}
                  {ride.passengers.map((p,i) => (
                    <div key={i} style={{ background:C.bg,borderRadius:12,padding:"10px 14px",marginTop:10 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                        <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                          <div style={{ width:36,height:36,borderRadius:"50%",background:C.primary,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700 }}>{p.avatar}</div>
                          <div>
                            <div style={{ fontWeight:600,fontSize:14 }}>{p.name}</div>
                            <div style={{ display:"flex",gap:4,alignItems:"center" }}><Stars rating={p.rating} size={11} /><span style={{ fontSize:11,color:C.muted }}>{p.rating}</span></div>
                          </div>
                        </div>
                        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                          <span style={{ background:"#DCFCE7",color:"#166534",fontSize:11,padding:"3px 10px",borderRadius:20 }}>✓ Paid</span>
                          <button onClick={()=>setShowRating(true)} style={{ background:C.primaryLight,border:"none",color:C.primary,padding:"5px 10px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer" }}>Rate ⭐</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
          {driverTab==="offer" && (
            <div style={{ background:C.card,borderRadius:20,padding:20,boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
              {[["from",t.from,"🟢","Delhi"],["to",t.to,"🔴","Jaipur"]].map(([key,label,icon,ph]) => (
                <div key={key} style={{ marginBottom:12 }}>
                  <label style={lbl}>{label}</label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14 }}>{icon}</span>
                    <input value={offerForm[key]} onChange={e=>setOfferForm({...offerForm,[key]:e.target.value})} placeholder={ph} style={{ ...inp,paddingLeft:36 }} />
                  </div>
                </div>
              ))}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                {[["date",t.date,"15 Jun"],["time","Samay","7:00 AM"]].map(([key,label,ph]) => (
                  <div key={key}><label style={lbl}>{label}</label><input value={offerForm[key]} onChange={e=>setOfferForm({...offerForm,[key]:e.target.value})} placeholder={ph} style={inp} /></div>
                ))}
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16 }}>
                <div><label style={lbl}>{t.seats}</label>
                  <select value={offerForm.seats} onChange={e=>setOfferForm({...offerForm,seats:e.target.value})} style={{ ...inp,padding:"11px 12px" }}>
                    {[1,2,3,4].map(n=><option key={n}>{n}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Price/seat (₹)</label><input value={offerForm.price} onChange={e=>setOfferForm({...offerForm,price:e.target.value})} placeholder="450" style={inp} /></div>
              </div>
              {offerForm.price && parseInt(offerForm.price)>0 && (
                <div style={{ background:"linear-gradient(135deg,#FFF0EB,#FFE4D6)",border:`1px solid ${C.primary}33`,borderRadius:14,padding:"12px 16px",marginBottom:16 }}>
                  {[[t.paying,`₹${calc(parseInt(offerForm.price),parseInt(offerForm.seats)||1).gross}`,C.text],[`${t.platformFee} (${COMMISSION}%)`,`-₹${calc(parseInt(offerForm.price),parseInt(offerForm.seats)||1).commission}`,C.primary],[t.youGet,`₹${calc(parseInt(offerForm.price),parseInt(offerForm.seats)||1).driverEarns}`,C.success]].map(([l,v,col],i) => (
                    <div key={i} style={{ display:"flex",justifyContent:"space-between",marginBottom:i<2?6:0 }}>
                      <span style={{ color:C.muted,fontSize:13 }}>{l}</span><span style={{ fontWeight:800,fontSize:13,color:col }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
                       <button onClick={()=>offerForm.from&&offerForm.to&&offerForm.price?setOfferStep("success"):null} style={{ ...btnP,opacity:offerForm.from&&offerForm.to&&offerForm.price?1:0.5 }}>{t.postRide}</button>
            </div>
          )}
          {driverTab==="earnings" && (
            <div>
              <div style={{ background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,borderRadius:20,padding:20,marginBottom:16,color:"#fff" }}>
                <div style={{ fontSize:12,opacity:0.7 }}>Is mahine ki kamaai</div>
                <div style={{ fontSize:36,fontWeight:900 }}>₹4,860</div>
                <div style={{ fontSize:12,opacity:0.7,marginTop:4 }}>Gross ₹5,400 · CarWahan ₹540 commission</div>
              </div>
              <div style={{ background:C.card,borderRadius:20,padding:20,boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ fontWeight:700,fontSize:14,marginBottom:14 }}>Recent Trips</div>
                {[{route:"Delhi→Jaipur",date:"10 Jun",gross:450,p:1},{route:"Delhi→Agra",date:"7 Jun",gross:600,p:2},{route:"Jaipur→Delhi",date:"2 Jun",gross:900,p:2}].map((tp,i) => {
                  const { commission, driverEarns } = calc(tp.gross/tp.p, tp.p);
                  return (
                    <div key={i} style={{ borderBottom:i<2?`1px solid ${C.border}`:"none",paddingBottom:12,marginBottom:12 }}>
                      <div style={{ display:"flex",justifyContent:"space-between" }}>
                        <div><div style={{ fontWeight:600,fontSize:14 }}>{tp.route}</div><div style={{ color:C.muted,fontSize:12 }}>{tp.date} · {tp.p}p</div></div>
                        <div style={{ textAlign:"right" }}><div style={{ fontWeight:800,fontSize:15,color:C.success }}>+₹{driverEarns}</div><div style={{ fontSize:10,color:C.muted }}>−₹{commission} fee</div></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {driverTab==="verify" && (
            <div style={{ background:C.card,borderRadius:20,padding:20,boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
              <div style={{ textAlign:"center",marginBottom:20 }}>
                <div style={{ fontSize:48,marginBottom:8 }}>🔐</div>
                <div style={{ fontWeight:800,fontSize:18 }}>{t.verifyTitle}</div>
                <div style={{ color:C.muted,fontSize:13,marginTop:4 }}>Verified drivers ko zyada bookings milti hain</div>
              </div>
              {[["🚗",t.hsrp,"Mandatory"],["🪪",t.dl,"Valid DL"],["🆔",t.aadhar,"Address proof"],["📸",t.carPhoto,"HSRP ke saath"]].map(([icon,label,sub],i) => (
                <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bg,borderRadius:14,padding:"14px 16px",marginBottom:10 }}>
                  <div style={{ display:"flex",gap:12,alignItems:"center" }}>
                    <span style={{ fontSize:24 }}>{icon}</span>
                    <div><div style={{ fontWeight:700,fontSize:14 }}>{label}</div><div style={{ fontSize:12,color:C.muted }}>{sub}</div></div>
                  </div>
                  <span style={{ background:"#FFF7ED",color:"#C2410C",fontSize:11,padding:"3px 10px",borderRadius:20,fontWeight:600 }}>{t.pending}</span>
                </div>
              ))}
              <button onClick={()=>setShowVerify(true)} style={{ ...btnP,marginTop:8 }}>{t.verifyStart}</button>
            </div>
          )}
        </div>
        {showLocation && <LocationModal t={t} userName="Driver" onClose={()=>setShowLocation(false)} />}
        {showVerify && <VerifyModal t={t} onClose={()=>setShowVerify(false)} />}
        {showRating && <RatingModal t={t} forRole="passenger" name="Neha G." onClose={()=>setShowRating(false)} />}
      </div>
    );
  }
  return null;
} 
