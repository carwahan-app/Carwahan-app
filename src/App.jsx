m.from&&offerForm.to&&offerForm.price?setOfferStep("success"):null} style={{ ...btnP,opacity:offerForm.from&&offerForm.to&&offerForm.price?1:0.5 }}>{t.postRide}</button>
            </div>
          )}

          {driverTab==="earnings" && (
            <div>
              <div style={{ background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,borderRadius:20,padding:20,marginBottom:16,color:"#fff" }}>
                <div style={{ fontSize:12,opacity:0.7 }}>Is mahine ki kamaai</div>
                <div style={{ fontSize:36,fontWeight:900 }}>â‚¹4,860</div>
                <div style={{ fontSize:12,opacity:0.7,marginTop:4 }}>Gross â‚¹5,400 Â· CarWahan â‚¹540 commission</div>
              </div>
              <div style={{ background:C.card,borderRadius:20,padding:20,boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ fontWeight:700,fontSize:14,marginBottom:14 }}>Recent Trips</div>
                {[{route:"Delhiâ†’Jaipur",date:"10 Jun",gross:450,p:1},{route:"Delhiâ†’Agra",date:"7 Jun",gross:600,p:2},{route:"Jaipurâ†’Delhi",date:"2 Jun",gross:900,p:2}].map((tp,i) => {
                  const { commission, driverEarns } = calc(tp.gross/tp.p, tp.p);
                  return (
                    <div key={i} style={{ borderBottom:i<2?`1px solid ${C.border}`:"none",paddingBottom:12,marginBottom:12 }}>
                      <div style={{ display:"flex",justifyContent:"space-between" }}>
                        <div><div style={{ fontWeight:600,fontSize:14 }}>{tp.route}</div><div style={{ color:C.muted,fontSize:12 }}>{tp.date} Â· {tp.p}p</div></div>
                        <div style={{ textAlign:"right" }}><div style={{ fontWeight:800,fontSize:15,color:C.success }}>+â‚¹{driverEarns}</div><div style={{ fontSize:10,color:C.muted }}>âˆ’â‚¹{commission} fee</div></div>
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
                <div style={{ fontSize:48,marginBottom:8 }}>ðŸ”</div>
                <div style={{ fontWeight:800,fontSize:18 }}>{t.verifyTitle}</div>
                <div style={{ color:C.muted,fontSize:13,marginTop:4 }}>Verified drivers ko zyada bookings milti hain</div>
              </div>
              {[["ðŸš—",t.hsrp,"Mandatory"],["ðŸªª",t.dl,"Valid DL"],["ðŸ†”",t.aadhar,"Address proof"],["ðŸ“¸",t.carPhoto,"HSRP ke saath"]].map(([icon,label,sub],i) => (
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
