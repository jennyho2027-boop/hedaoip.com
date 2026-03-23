"use client";
import { useState, useRef, useEffect } from "react";

const ALL_SECS = [
  // ── 第一阶段 ──
  {stage:1,n:"基础身份",i:"👤",f:[
    {k:"name",l:"姓名/花名",t:"text"},{k:"age_range",l:"年龄段",t:"sel",o:["25-30","30-35","35-40","40-45","45-50","50+"]},
    {k:"city",l:"所在城市",t:"text"},{k:"years",l:"从业年限",t:"text"},{k:"company",l:"公司/团队",t:"text"},
    {k:"title_rank",l:"职级/荣誉",t:"text"},{k:"focus_area",l:"专注领域",t:"mc",o:["年金","重疾","高端医疗","资产保全","教育金","养老规划","企业团险","其他"]},
    {k:"one_liner",l:"一句话介绍自己",t:"ta"}]},
  {stage:1,n:"客户画像",i:"🎯",f:[
    {k:"client_profile",l:"主要服务的客户",t:"ta"},{k:"client_top3",l:"客户关心的问题Top3",t:"ta"},
    {k:"client_reject5",l:"客户拒绝理由Top5",t:"ta"},{k:"ideal_client",l:"理想客户群体",t:"ta"}]},
  {stage:1,n:"平台运营",i:"📱",f:[
    {k:"platforms",l:"运营哪些平台",t:"mc",o:["朋友圈","抖音","小红书","视频号","公众号","快手","知乎","其他"]},
    {k:"followers",l:"粉丝量和互动",t:"ta"},{k:"post_freq",l:"发内容频率",t:"ta"},{k:"content_bottleneck",l:"最大内容瓶颈",t:"ta"}]},
  {stage:1,n:"对标账号",i:"🔍",f:[
    {k:"benchmark_accounts",l:"欣赏的5-10个同行账号",t:"ta"},{k:"benchmark_good",l:"好在哪里",t:"ta"},{k:"benchmark_diff",l:"想做出什么不同",t:"ta"}]},
  {stage:1,n:"语言风格",i:"✍️",f:[
    {k:"sample_posts",l:"满意的10-15条朋友圈文案",t:"ta"},
    {k:"tone_pref",l:"表达偏好",t:"mc",o:["温暖","犀利","专业","幽默","文艺","真诚朴实","理性分析","感性共情"]},
    {k:"emoji_pref",l:"常用emoji",t:"text"},{k:"tone_ban",l:"绝不用的表达",t:"ta"}]},
  {stage:1,n:"产品服务",i:"💼",f:[
    {k:"current_products",l:"主推产品及权益",t:"ta"},{k:"short_term_product",l:"半年内重点产品",t:"ta"},{k:"long_term_product",l:"长期产品线",t:"ta"}]},
  {stage:1,n:"兴趣生活",i:"🌿",f:[
    {k:"hobbies",l:"兴趣爱好",t:"ta"},{k:"recent_reading",l:"最近在读的书",t:"ta"},{k:"fav_books_movies",l:"喜欢的书/电影/偶像及原因",t:"ta"}]},
  // 第一阶段补充
  {stage:1,n:"补充记录",i:"📝",isSup:true,supKey:"s1_x"},

  // ── 第二阶段 ──
  {stage:2,n:"故事清单",i:"📖",tip:"故事是最珍贵的数字资产。每类建议3-8个，写得越多数字外脑越强。真实比完美重要。",f:[
    {k:"story_growth",l:"① 成长故事线",t:"ta"},{k:"story_highlight",l:"② 高光故事（建议5-8个）",t:"ta"},
    {k:"story_valley",l:"③ 低谷故事（建议5-8个）",t:"ta"},{k:"story_intimate",l:"④ 亲密关系故事（3-5个）",t:"ta"},
    {k:"story_fun",l:"⑤ 有趣/反差故事（3-5个）",t:"ta"},{k:"story_claim",l:"⑥ 理赔故事（3-5个）",t:"ta"},
    {k:"story_value",l:"⑦ 附加值故事（3-5个）",t:"ta"},{k:"story_deal",l:"⑧ 成交故事（5-8个）",t:"ta"}]},
  {stage:2,n:"历史素材",i:"🗂️",f:[
    {k:"hist_moments",l:"① 过往朋友圈素材",t:"ta"},{k:"hist_articles",l:"② 公众号文章",t:"ta"},
    {k:"hist_videos",l:"③ 视频号/抖音内容",t:"ta"},{k:"hist_courses",l:"④ 课程/课件",t:"ta"},{k:"hist_others_view",l:"⑤ 别人眼中的你",t:"ta"}]},
  {stage:2,n:"对标深度",i:"📊",f:[
    {k:"benchmark_viral",l:"对标账号50条爆款文案",t:"ta"},{k:"benchmark_sales",l:"营销型内容",t:"ta"},
    {k:"benchmark_values",l:"价值观同频点",t:"ta"},{k:"benchmark_human",l:"人性层面为什么吸引人",t:"ta"}]},
  {stage:2,n:"深度人设",i:"🪞",f:[
    {k:"why_insurance",l:"为什么入行",t:"ta"},{k:"hardest_time",l:"最艰难的经历",t:"ta"},
    {k:"touching_words",l:"客户最感动你的话",t:"ta"},{k:"self_vs_others",l:"别人眼中vs自己眼中",t:"ta"},
    {k:"proudest_identity",l:"最骄傲的身份",t:"text"},{k:"good_with",l:"擅长经营哪类人群",t:"ta"},{k:"bad_with",l:"不擅长和谁打交道",t:"ta"}]},
  {stage:2,n:"口语风格",i:"🎙️",f:[
    {k:"more_posts",l:"补充朋友圈至20-30条",t:"ta"},{k:"oral_samples",l:"口播/语音转文字",t:"ta"},{k:"oral_style",l:"口头禅方言特色",t:"ta"}]},
  {stage:2,n:"知识成长",i:"🎓",f:[
    {k:"courses_learned",l:"学过的课程",t:"ta"},{k:"personality_tests",l:"心理测试结果",t:"ta"},{k:"communities",l:"社群商会圈子",t:"ta"}]},
  {stage:2,n:"人脉圈层",i:"🤝",f:[
    {k:"circle",l:"朋友圈子和贵人",t:"ta"},{k:"biggest_influence",l:"谁影响你最大",t:"ta"},{k:"influence_circle",l:"最有影响力的圈子",t:"ta"}]},
  {stage:2,n:"补充记录",i:"📝",isSup:true,supKey:"s2_x"},

  // ── 第三阶段 ──
  {stage:3,n:"人生愿景",i:"🌟",f:[
    {k:"vision_5y",l:"5年后的你",t:"ta"},{k:"vision_10y",l:"10年后",t:"ta"},{k:"vision_20y",l:"20年后30年后",t:"ta"},
    {k:"ultimate_dream",l:"终极梦想",t:"ta"},{k:"ideal_family",l:"崇尚的家庭生活",t:"ta"},
    {k:"ideal_relationship",l:"理想的两性关系",t:"ta"},{k:"biz_vision",l:"商业版图和规划",t:"ta"},{k:"sacrifice",l:"愿意为梦想付出什么",t:"ta"}]},
  {stage:3,n:"深层自我",i:"🔮",f:[
    {k:"talent",l:"最大的天赋",t:"ta"},{k:"ability_boundary",l:"能力边界",t:"ta"},{k:"dissatisfied",l:"最不满意自己什么",t:"ta"},
    {k:"biggest_fear",l:"最大的恐惧",t:"ta"},{k:"three_words",l:"三个词形容自己",t:"text"},{k:"motto",l:"人生座右铭",t:"ta"},{k:"mission",l:"人生使命",t:"ta"}]},
  {stage:3,n:"世界观",i:"🌍",f:[
    {k:"world_view",l:"对世界的态度",t:"ta"},{k:"accept_imperfect",l:"能接受的不完美",t:"ta"},
    {k:"cannot_stand",l:"绝不能忍受的事",t:"ta"},{k:"anger_trigger",l:"让你愤怒的现象",t:"ta"},
    {k:"define_success",l:"成功的定义",t:"ta"},{k:"define_freedom",l:"自由的理解",t:"ta"},
    {k:"core_belief",l:"核心理念",t:"ta"},{k:"most_important",l:"人活着最重要的是",t:"ta"}]},
  {stage:3,n:"人生合伙人",i:"💫",f:[
    {k:"ideal_partner",l:"理想的人生合伙人",t:"ta"},{k:"relationship_value",l:"最看重的品质",t:"ta"},{k:"partner_boundary",l:"内容呈现程度",t:"ta"}]},
  {stage:3,n:"AI与商业",i:"🧠",f:[
    {k:"ai_view",l:"怎么理解AI",t:"ta"},{k:"ip_view",l:"个人品牌/数字资产",t:"ta"},{k:"opc_view",l:"一人公司/私域",t:"ta"},
    {k:"sales_view",l:"好的销售是什么",t:"ta"},{k:"ai_boundary",l:"AI能做/不能做",t:"ta"},{k:"ai_disclosure",l:"让客户知道用AI吗",t:"ta"}]},
  {stage:3,n:"选择决策",i:"⚖️",f:[
    {k:"decision_logic",l:"重大决定的逻辑",t:"ta"},{k:"top3_choices",l:"最重要的三个选择",t:"ta"},
    {k:"client_criteria",l:"选择客户的标准",t:"ta"},{k:"rejected_opps",l:"拒绝过什么机会",t:"ta"}]},
  {stage:3,n:"能量场域",i:"✨",f:[
    {k:"resonance_words",l:"共振关键词",t:"mc",o:["觉醒","心力能量","修行","智慧","情感","女性成长","女性商业","故事资产","数字资产","生命能量","AI+IP","降本增效","女性沙龙"]},
    {k:"resonance_custom",l:"补充关键词",t:"text"},{k:"core_energy",l:"想传递的核心能量",t:"ta"},{k:"vibe",l:"别人靠近你的感受",t:"ta"}]},
  {stage:3,n:"补充记录",i:"📝",isSup:true,supKey:"s3_x"},
];

const TIERS = [
  { id:1, maxStage:1, title:"AI+IP闭门课体验课学员", color:"#6B8F71", note:"第一阶段",
    up:{emoji:"🚀",head:"想要真正「好用」的专属数字外脑？",body:"基础采集让AI初步了解你。要真正还原你的风格和故事，需要更深度的喂养。",hl:"「高净值保险IP俱乐部」成员获得深度采集+13个专属定制智能体，从「能用」升级到「好用」。",cta:"了解高净值保险IP俱乐部 →",sub:"名额有限，仅限高绩效保险人"}},
  { id:2, maxStage:2, title:"高净值保险IP俱乐部成员", color:"#8B6F47", note:"第一+第二阶段",
    up:{emoji:"👑",head:"准备好拥有「有灵魂」的数字外脑？",body:"你的数字外脑已经很好用。但顶级个人品牌需要灵魂层面的共鸣。",hl:"我们的联盟成员将获得灵魂级采集+一对一深度共创+AI+IP新商业思维体系，让数字外脑真正拥有你的灵魂。",cta:"申请加入我们 →",sub:"需审核申请 · 择优录取",gate:true}},
  { id:3, maxStage:3, title:"合道IP联盟成员/合伙人", color:"#7B5EA7", note:"全部三阶段 · 灵魂级", gate:true,
    up:{emoji:"🌟",head:"你已拥有行业最深度的数字外脑",body:"恭喜完成全部采集。你的数字外脑已拥有灵魂。",hl:"作为我们的联盟成员，邀你一起共创AI+IP新商业思维，共建「保险新营销商学院」，重新定义行业未来。",cta:"开启共创之旅 →",sub:"期待与你一起改变保险行业",final:true}}
];

const STAGE_NAMES = {1:"第一阶段·基础画像",2:"第二阶段·故事资产",3:"第三阶段·灵魂对话"};
const STAGE_COLORS = {1:"#6B8F71",2:"#8B6F47",3:"#7B5EA7"};

function getSecsForTier(tierId) {
  const tier = TIERS.find(t => t.id === tierId);
  return ALL_SECS.filter(s => s.stage <= tier.maxStage);
}

function cntFilled(data, secs) {
  let total = 0, filled = 0;
  secs.forEach(sec => {
    if (sec.isSup) { total++; if (data[sec.supKey] && String(data[sec.supKey]).trim()) filled++; }
    else { sec.f.forEach(fd => { total++; const v = data[fd.k]; if (fd.t === "mc") { if (v && v.length) filled++; } else if (v && String(v).trim()) filled++; }); }
  });
  return { total, filled };
}

function makeReport(data, tierId) {
  const tier = TIERS.find(t => t.id === tierId);
  const secs = getSecsForTier(tierId);
  const c = cntFilled(data, secs);
  let r = "══════════════════════════════════════\n  合道 · 个人IP知识库采集报告\n  AI+IP 个人品牌数字外脑\n══════════════════════════════════════\n";
  r += "提交时间：" + new Date().toLocaleString("zh-CN") + "\n";
  if (data.name) r += "客户：" + data.name + "\n";
  r += "层级：" + tier.title + "\n";
  r += "范围：" + tier.note + "\n";
  r += "完成：" + c.filled + "/" + c.total + "（" + Math.round(c.filled / c.total * 100) + "%）\n";
  r += "══════════════════════════════════════\n\n";
  let curStage = 0;
  secs.forEach(sec => {
    if (sec.stage !== curStage) { curStage = sec.stage; r += "\n━━━ " + STAGE_NAMES[curStage] + " ━━━\n\n"; }
    if (sec.isSup) {
      const sv = data[sec.supKey];
      r += "【📝 补充】\n" + (sv && String(sv).trim() ? sv : "无") + "\n\n";
    } else {
      r += "【" + sec.i + " " + sec.n + "】\n";
      sec.f.forEach(fd => {
        const v = data[fd.k]; let d = "（未填写）";
        if (fd.t === "mc" && v && v.length) d = v.join("、");
        else if (v && String(v).trim()) d = String(v);
        r += "\n▸ " + fd.l + "\n" + d + "\n";
      });
      r += "\n";
    }
  });
  r += "══════════════════════════════════════\n© 广州德森文化传播有限公司 · 合道IP联盟\n══════════════════════════════════════\n";
  return r;
}

function Chip({label, on, onClick, color}) {
  return <button onClick={onClick} style={{padding:"4px 11px",borderRadius:14,fontSize:11,cursor:"pointer",border:on?"2px solid "+color:"1.5px solid #D5CCBF",background:on?color:"transparent",color:on?"#FFF":"#5B4A3F",fontFamily:"inherit"}}>{label}</button>;
}

function FieldInput({field, value, onChange, color}) {
  const b = {width:"100%",padding:"7px 11px",borderRadius:7,border:"1.5px solid #D5CCBF",background:"#FDFCFA",fontSize:13,fontFamily:"inherit",color:"#3A322A",outline:"none",resize:"vertical",boxSizing:"border-box"};
  if (field.t==="mc") { const s=value||[]; return <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{field.o.map(o=><Chip key={o} label={o} on={s.includes(o)} color={color} onClick={()=>s.includes(o)?onChange(s.filter(x=>x!==o)):onChange([...s,o])}/>)}</div>; }
  if (field.t==="sel") return <select value={value||""} onChange={e=>onChange(e.target.value)} style={{...b,cursor:"pointer"}}><option value="">请选择</option>{field.o.map(o=><option key={o} value={o}>{o}</option>)}</select>;
  if (field.t==="ta") return <textarea value={value||""} onChange={e=>onChange(e.target.value)} rows={3} style={b}/>;
  return <input type="text" value={value||""} onChange={e=>onChange(e.target.value)} style={b}/>;
}

export default function App() {
  const [data, setData] = useState({});
  const [page, setPage] = useState("intro");
  const [tierId, setTierId] = useState(1);
  const [secIdx, setSecIdx] = useState(0);
  const [report, setReport] = useState("");
  const ref = useRef(null);
  const go = () => ref.current?.scrollIntoView({behavior:"smooth"});
  const upd = (k,v) => setData(p => ({...p,[k]:v}));

  useEffect(()=>{try{const saved=localStorage.getItem("ipc8");if(saved)setData(JSON.parse(saved))}catch(e){}},[]);
  useEffect(()=>{const t=setTimeout(()=>{if(Object.keys(data).length)try{localStorage.setItem("ipc8",JSON.stringify(data))}catch(e){}},1000);return()=>clearTimeout(t)},[data]);

  const ft = "'Noto Serif SC',Georgia,serif";
  const brand = <div style={{textAlign:"center",padding:8,fontSize:7,color:"#A09585",borderTop:"1px solid #E8E0D5",marginTop:12}}>© 广州德森文化传播有限公司 · 合道IP联盟</div>;
  const [sending, setSending] = useState(false);
  const [sendOk, setSendOk] = useState(false);
  const HOOK = "https://open.feishu.cn/open-apis/bot/v2/hook/b7f811a6-f473-4f5d-ab46-995283cbd27d";
  async function doSubmit() {
    const r = makeReport(data, tierId);
    setReport(r);
    const tier = TIERS.find(t => t.id === tierId);
    setSending(true); setSendOk(false);
    try {
      const res = await fetch(HOOK, {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ msg_type:"text", content:{ text: "📋 新采集报告提交\n客户：" + (data.name||"未知") + "\n层级：" + tier.title + "\n\n" + r }})
      });
      if (res.ok) setSendOk(true); else setSendOk(false);
    } catch(e) { setSendOk(false); }
    setSending(false); setPage("done"); go();
  }

  // ── DONE ──
  if (page === "done") {
    const tier = TIERS.find(t=>t.id===tierId);
    const u = tier.up;
    return (
      <div ref={ref} style={{fontFamily:ft,color:"#3A322A",maxWidth:500,margin:"0 auto",padding:"0 16px 16px"}}>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet"/>
        <div style={{textAlign:"center",padding:"28px 0 8px"}}>
          <div style={{fontSize:44}}>{sendOk ? "✅" : "📤"}</div>
          <h2 style={{fontSize:17,fontWeight:900}}>{sendOk ? "采集报告提交成功！" : "报告已生成"}</h2>
          <p style={{fontSize:11,color:sendOk?"#6B8F71":"#8B7355",marginTop:4}}>{sendOk ? "已自动发送至定制团队，我们将尽快为你打造专属数字外脑" : "正在发送中，如未成功请点击下方重新发送"}</p>
          <p style={{fontSize:9,color:"#A09585",marginTop:2}}>{tier.title} · {tier.note}</p>
        </div>
        {!sendOk && <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
          <button onClick={doSubmit} disabled={sending} style={{padding:"8px 16px",borderRadius:9,border:"none",background:"#5B4A3F",color:"#FFF",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:600,opacity:sending?0.6:1}}>{sending ? "发送中..." : "🔄 重新发送"}</button>
        </div>}
        <div style={{margin:"12px 0",padding:"16px",borderRadius:14,background:"linear-gradient(165deg,"+tier.color+"0D,transparent)",border:u.gate?"1.5px solid "+tier.color+"30":"1px solid #E8E0D5"}}>
          <div style={{fontSize:26,textAlign:"center",marginBottom:6}}>{u.emoji}</div>
          <div style={{fontSize:14,fontWeight:700,textAlign:"center",lineHeight:1.4,marginBottom:8}}>{u.head}</div>
          <div style={{fontSize:11,color:"#5B4A3F",lineHeight:1.7,marginBottom:6}}>{u.body}</div>
          <div style={{fontSize:11,color:tier.color,fontWeight:600,lineHeight:1.7,padding:"8px 12px",borderRadius:8,background:"rgba(255,255,255,0.5)",marginBottom:8}}>{u.hl}</div>
          {u.gate&&<div style={{textAlign:"center",marginBottom:6}}><span style={{fontSize:8,padding:"2px 8px",borderRadius:8,background:"#7B5EA720",color:"#7B5EA7",fontWeight:600}}>需审核 · 择优录取</span></div>}
          <button onClick={()=>alert("请联系您的专属顾问了解详情")} style={{width:"100%",padding:"10px",borderRadius:10,border:"none",background:"linear-gradient(135deg,"+tier.color+",#5B4A3F)",color:"#FFF",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{u.cta}</button>
          <div style={{textAlign:"center",fontSize:9,color:"#A09585",marginTop:6}}>{u.sub}</div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center"}}>
          <button onClick={()=>{setPage("fill");go()}} style={{padding:"6px 12px",borderRadius:7,border:"1.5px solid #D5CCBF",background:"transparent",color:"#8B7355",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>继续编辑</button>
          <button onClick={()=>{setPage("select");go()}} style={{padding:"6px 12px",borderRadius:7,border:"1.5px solid #D5CCBF",background:"transparent",color:"#8B7355",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>切换身份</button>
        </div>
        {brand}
      </div>
    );
  }

  // ── INTRO ──
  if (page === "intro") {
    return (
      <div ref={ref} style={{fontFamily:ft,color:"#3A322A",maxWidth:500,margin:"0 auto",padding:"0 16px 16px"}}>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet"/>
        <div style={{textAlign:"center",padding:"20px 0 4px"}}>
          <div style={{display:"inline-block",padding:"4px 16px",borderRadius:16,background:"linear-gradient(135deg,#5B4A3F,#7B5EA7)",color:"#FFF",fontSize:10,fontWeight:700,letterSpacing:3}}>合道 · HEDAO</div>
          <div style={{fontSize:8,letterSpacing:4,color:"#8B7355",marginTop:8}}>AI+IP 个人品牌数字外脑 · 内容营销系统</div>
          <h1 style={{fontSize:19,fontWeight:900,letterSpacing:2,margin:"4px 0"}}>个人IP知识库采集</h1>
        </div>
        <div style={{margin:"12px 0",padding:"14px",borderRadius:12,background:"#FDFCFA",border:"1px solid #E8E0D5"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#7B5EA7",marginBottom:4}}>🏛 关于高净值保险IP俱乐部 & 合道IP联盟</div>
          <div style={{fontSize:11,color:"#5B4A3F",lineHeight:1.8}}>我们立志成为大湾区保险行业故事营销头部。我们坚信<b>故事营销是最顶级的营销</b>，同步拥抱AI，让AI解放生产力、高效积累数字资产。AI赋能我们拥有更多分身和数字助理，完成来到这个世界最有价值的积累——属于我们自己的文化理念与传家宝。</div>
        </div>
        <div style={{margin:"8px 0",padding:"14px",borderRadius:12,background:"linear-gradient(165deg,rgba(107,143,113,0.05),rgba(123,94,167,0.05))",border:"1px solid #E8E0D5"}}>
          <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>你即将打造的，是未来最贵的数字资产</div>
          <div style={{fontSize:11,color:"#5B4A3F",lineHeight:1.8}}>AI时代，掌握个人品牌就是掌握商业命脉。无论是拓客、积累人脉、还是成为影响力中心——你写下的每一个字都在为「数字外脑」注入灵魂，回报不可估量。</div>
        </div>
        <div style={{padding:"8px 14px",borderRadius:9,background:"#8B6F470A",border:"1px solid #8B6F4720",marginBottom:12}}>
          <div style={{fontSize:10,color:"#5B4A3F",lineHeight:1.7}}>💡 自动保存随时继续 · 故事越多外脑越强 · 真实比完美重要 · 填完一键提交</div>
        </div>
        <button onClick={()=>{setPage("select");go()}} style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#6B8F71,#5B4A3F)",color:"#FFF",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>选择身份 · 开始采集 →</button>
        {brand}
      </div>
    );
  }

  // ── SELECT ──
  if (page === "select") {
    return (
      <div ref={ref} style={{fontFamily:ft,color:"#3A322A",maxWidth:500,margin:"0 auto",padding:"0 16px 16px"}}>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet"/>
        <div style={{textAlign:"center",padding:"16px 0 4px"}}>
          <div style={{fontSize:8,letterSpacing:3,color:"#8B7355"}}>合道 · 数字外脑</div>
          <h2 style={{fontSize:16,fontWeight:900,marginTop:3}}>请选择你的成员身份</h2>
          <p style={{fontSize:10,color:"#A09585",marginTop:3}}>不同身份包含不同深度的采集内容</p>
        </div>
        {TIERS.map(tier => {
          const secs = getSecsForTier(tier.id);
          const c = cntFilled(data, secs);
          const pct = c.total > 0 ? Math.round(c.filled/c.total*100) : 0;
          return (
            <button key={tier.id} onClick={()=>{setTierId(tier.id);setSecIdx(0);setPage("fill");go()}} style={{display:"block",width:"100%",padding:"14px",marginBottom:8,borderRadius:12,border:"1.5px solid "+tier.color+"25",background:"#FDFCFA",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <div style={{width:36,height:36,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",background:tier.color+"12",color:tier.color,fontSize:16,fontWeight:900,flexShrink:0}}>{tier.id}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:tier.color}}>{tier.title}</div>
                  <div style={{fontSize:10,color:"#5B4A3F",marginTop:2}}>采集范围：{tier.note}</div>
                  <div style={{fontSize:9,marginTop:3,color:tier.color,fontWeight:600,display:"flex",gap:4,alignItems:"center"}}>
                    共 {secs.length} 个采集模块
                    {tier.gate&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:5,background:"#7B5EA718",color:"#7B5EA7",fontWeight:600}}>需申请</span>}
                  </div>
                </div>
              </div>
              <div style={{marginTop:6,display:"flex",alignItems:"center",gap:6}}>
                <div style={{flex:1,height:3,borderRadius:2,background:"#E8E0D5"}}><div style={{height:3,borderRadius:2,background:tier.color,width:pct+"%"}}/></div>
                <span style={{fontSize:9,color:tier.color,fontWeight:600}}>{pct}%</span>
              </div>
            </button>
          );
        })}
        <button onClick={()=>{setPage("intro");go()}} style={{display:"block",width:"100%",padding:"8px",borderRadius:7,border:"1.5px solid #D5CCBF",background:"transparent",color:"#8B7355",cursor:"pointer",fontSize:11,fontFamily:"inherit",textAlign:"center"}}>← 首页</button>
        {brand}
      </div>
    );
  }

  // ── FILL ──
  const tier = TIERS.find(t=>t.id===tierId);
  const secs = getSecsForTier(tierId);
  const curSec = secs[secIdx] || secs[0];
  const c = cntFilled(data, secs);
  const stageColor = STAGE_COLORS[curSec.stage] || tier.color;

  return (
    <div ref={ref} style={{fontFamily:ft,color:"#3A322A",maxWidth:540,margin:"0 auto",paddingBottom:48}}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet"/>
      <div style={{display:"flex",alignItems:"center",padding:"7px 14px",borderBottom:"1px solid #D5CCBF",gap:6}}>
        <button onClick={()=>{setPage("select");go()}} style={{border:"none",background:"none",cursor:"pointer",fontSize:12,color:"#8B7355",fontFamily:"inherit"}}>← 返回</button>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:7,color:"#A09585"}}>{tier.title}</div>
          <div style={{fontSize:10,fontWeight:700,color:stageColor}}>{STAGE_NAMES[curSec.stage]}</div>
        </div>
        <span style={{fontSize:9,color:tier.color,fontWeight:600}}>{c.filled}/{c.total}</span>
      </div>
      <div style={{padding:"0 14px",marginTop:4}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{flex:1,height:3,borderRadius:2,background:"#E8E0D5"}}><div style={{height:3,borderRadius:2,background:tier.color,width:(c.total>0?Math.round(c.filled/c.total*100):0)+"%"}}/></div>
          <span style={{fontSize:8,color:tier.color,fontWeight:600}}>{c.total>0?Math.round(c.filled/c.total*100):0}%</span>
        </div>
      </div>

      {/* Section tabs with stage dividers */}
      <div style={{display:"flex",overflowX:"auto",borderBottom:"1px solid #D5CCBF",marginTop:4,scrollbarWidth:"none"}}>
        {secs.map((sec,idx) => {
          const showDivider = idx > 0 && sec.stage !== secs[idx-1].stage;
          return (
            <div key={idx} style={{display:"flex",flexShrink:0}}>
              {showDivider && <div style={{width:2,background:STAGE_COLORS[sec.stage]+"40",margin:"4px 1px"}}/>}
              <button onClick={()=>{setSecIdx(idx);go()}} style={{
                flexShrink:0,padding:"5px 7px",border:"none",cursor:"pointer",
                background:idx===secIdx?"rgba(253,252,250,0.6)":"transparent",
                borderBottom:idx===secIdx?"2px solid "+STAGE_COLORS[sec.stage]:"2px solid transparent",
                fontFamily:"inherit",textAlign:"center"
              }}>
                <div style={{fontSize:12}}>{sec.i}</div>
                <div style={{fontSize:6,color:idx===secIdx?STAGE_COLORS[sec.stage]:"#A09585",whiteSpace:"nowrap"}}>{sec.n}</div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div style={{padding:"10px 14px 16px"}}>
        {/* Stage badge */}
        <div style={{marginBottom:8}}>
          <span style={{fontSize:8,padding:"2px 7px",borderRadius:6,background:stageColor+"12",color:stageColor,fontWeight:600}}>{STAGE_NAMES[curSec.stage]}</span>
        </div>

        {curSec.isSup ? (
          <>
            <div style={{fontSize:14,fontWeight:700,color:stageColor}}>📝 补充记录</div>
            <div style={{height:2,width:24,background:stageColor,margin:"3px 0 8px"}}/>
            <div style={{fontSize:10,color:"#8B7355",marginBottom:8,lineHeight:1.5}}>想到什么写什么，都是你数字资产的一部分。</div>
            <textarea value={data[curSec.supKey]||""} onChange={e=>{upd(curSec.supKey,e.target.value);upd(curSec.supKey+"_t",new Date().toLocaleString("zh-CN"))}} rows={6} style={{width:"100%",padding:"8px 11px",borderRadius:7,border:"1.5px solid #D5CCBF",background:"#FDFCFA",fontSize:13,fontFamily:"inherit",color:"#3A322A",outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
            {data[curSec.supKey+"_t"]&&<div style={{fontSize:8,color:"#A09585",marginTop:3}}>最后记录：{data[curSec.supKey+"_t"]}</div>}
          </>
        ) : (
          <>
            <div style={{fontSize:14,fontWeight:700,color:stageColor}}>{curSec.i} {curSec.n}</div>
            <div style={{height:2,width:24,background:stageColor,margin:"3px 0 8px"}}/>
            {curSec.tip&&<div style={{padding:"7px 10px",borderRadius:7,marginBottom:10,background:stageColor+"08",border:"1px solid "+stageColor+"15",fontSize:10,color:"#5B4A3F",lineHeight:1.6}}>💡 {curSec.tip}</div>}
            {curSec.f.map(field=>(
              <div key={field.k} style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:11,fontWeight:600,color:"#5B4A3F",marginBottom:3,lineHeight:1.4}}>{field.l}</label>
                <FieldInput field={field} value={data[field.k]} onChange={v=>upd(field.k,v)} color={stageColor}/>
              </div>
            ))}
          </>
        )}

        <div style={{display:"flex",justifyContent:"space-between",marginTop:14,gap:8}}>
          {secIdx > 0 ? (
            <button onClick={()=>{setSecIdx(secIdx-1);go()}} style={{padding:"7px 12px",borderRadius:7,border:"1.5px solid #D5CCBF",background:"transparent",color:"#8B7355",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>← 上一节</button>
          ) : <div/>}
          {secIdx < secs.length - 1 ? (
            <button onClick={()=>{setSecIdx(secIdx+1);go()}} style={{padding:"7px 12px",borderRadius:7,border:"none",background:stageColor,color:"#FFF",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>下一节 →</button>
          ) : (
            <button onClick={doSubmit} disabled={sending} style={{padding:"9px 16px",borderRadius:9,border:"none",background:"linear-gradient(135deg,"+tier.color+",#5B4A3F)",color:"#FFF",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:700,opacity:sending?0.6:1}}>{sending?"发送中...":"✅ 提交完整报告"}</button>
          )}
        </div>
      </div>

      <div style={{padding:"5px 14px",borderTop:"1px solid #D5CCBF",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:8,color:"#A09585"}}>总进度 <b style={{color:tier.color}}>{c.filled}/{c.total}</b></span>
        <button onClick={doSubmit} disabled={sending} style={{padding:"4px 10px",borderRadius:5,border:"none",background:"#5B4A3F",color:"#FFF",cursor:"pointer",fontSize:8,fontFamily:"inherit",fontWeight:600,opacity:sending?0.6:1}}>{sending?"...":"✅ 提交"}</button>
      </div>
      <div style={{textAlign:"center",padding:3,fontSize:6,color:"#A09585"}}>© 广州德森文化传播有限公司 · 合道IP联盟</div>
    </div>
  );
}
