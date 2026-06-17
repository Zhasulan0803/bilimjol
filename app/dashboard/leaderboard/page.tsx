'use client';
import { useAuthStore } from '../../store/auth';
import { Trophy, Star, Medal } from 'lucide-react';

const TOP_STUDENTS = [
  { name:'Айгерім Сейтқали', grade:9, points:4820, plan:'premium', streak:12 },
  { name:'Бекзат Досов', grade:10, points:4310, plan:'vip', streak:8 },
  { name:'Мадина Асқарова', grade:8, points:3975, plan:'premium', streak:15 },
  { name:'Ерлан Нұрланов', grade:7, points:3640, plan:'basic', streak:5 },
  { name:'Зарина Әлиева', grade:6, points:3210, plan:'basic', streak:7 },
  { name:'Нұрбол Қасымов', grade:9, points:2980, plan:'premium', streak:3 },
  { name:'Айдана Серікова', grade:8, points:2760, plan:'basic', streak:9 },
  { name:'Темір Жаксыбеков', grade:10, points:2540, plan:'vip', streak:11 },
  { name:'Сауле Нурланова', grade:5, points:2310, plan:'free', streak:4 },
  { name:'Асыл Досжанов', grade:7, points:2100, plan:'basic', streak:6 },
];

export default function Leaderboard() {
  const { user } = useAuthStore();
  const planColors: Record<string,string> = { free:'#6a6f73', basic:'#1e6055', premium:'#a435f0', vip:'#f69c08' };

  return (
    <div style={{padding:'32px'}}>
      <h1 style={{fontSize:22,fontWeight:800,marginBottom:4}}>Рейтинг кестесі</h1>
      <p style={{color:'#6a6f73',fontSize:14,marginBottom:28}}>Бұл аптаның үздік оқушылары</p>

      {/* Top 3 podium */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:32,maxWidth:600}}>
        {[TOP_STUDENTS[1], TOP_STUDENTS[0], TOP_STUDENTS[2]].map((s,pos)=>{
          const realPos = pos===0?2:pos===1?1:3;
          const colors = ['#C0C0C0','#FFD700','#CD7F32'];
          const sizes = [80,96,80];
          return (
            <div key={s.name} style={{textAlign:'center',paddingTop:pos===1?0:20}}>
              <div style={{width:sizes[pos],height:sizes[pos],borderRadius:'50%',background:colors[pos],display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 8px',fontSize:24,fontWeight:800,color:'#fff',border:`4px solid ${colors[pos]}`,boxSizing:'border-box'}}>
                {s.name.slice(0,1)}
              </div>
              <div style={{fontWeight:700,fontSize:13}}>{s.name.split(' ')[0]}</div>
              <div style={{fontSize:12,color:'#6a6f73'}}>{s.grade}-сынып</div>
              <div style={{fontWeight:800,fontSize:15,color:colors[pos],marginTop:4}}>{s.points.toLocaleString()}</div>
              <div style={{fontSize:24,marginTop:2}}>{realPos===1?'🥇':realPos===2?'🥈':'🥉'}</div>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div style={{background:'#fff',border:'1px solid #d1d7dc',borderRadius:4,overflow:'hidden'}}>
        <div style={{padding:'14px 20px',borderBottom:'2px solid #d1d7dc',display:'grid',gridTemplateColumns:'48px 1fr 100px 80px 90px 90px',gap:8,fontSize:12,fontWeight:700,color:'#6a6f73',textTransform:'uppercase',letterSpacing:'.5px'}}>
          <div>#</div><div>Оқушы</div><div>Сынып</div><div>Жоспар</div><div>Жазба</div><div>Ұпай</div>
        </div>
        {TOP_STUDENTS.map((s,i)=>{
          const isMe = user?.name === s.name;
          return (
            <div key={i} style={{padding:'12px 20px',display:'grid',gridTemplateColumns:'48px 1fr 100px 80px 90px 90px',gap:8,alignItems:'center',background:isMe?'#f0e6ff':'transparent',borderBottom:'1px solid #f0f0f0'}}>
              <div style={{fontWeight:700,fontSize:16,color:i<3?['#FFD700','#C0C0C0','#CD7F32'][i]:'#6a6f73'}}>
                {i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:planColors[s.plan],display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:14,flexShrink:0}}>{s.name.slice(0,1)}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:14}}>{s.name}{isMe?' (Сіз)':''}</div>
                </div>
              </div>
              <div style={{fontSize:14,color:'#6a6f73'}}>{s.grade}-сынып</div>
              <div><span style={{background:planColors[s.plan]+'22',color:planColors[s.plan],fontSize:11,fontWeight:700,padding:'3px 8px',borderRadius:10}}>{s.plan.toUpperCase()}</span></div>
              <div style={{fontSize:14}}>🔥 {s.streak} күн</div>
              <div style={{fontWeight:800,fontSize:15,color:'#a435f0'}}>{s.points.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
