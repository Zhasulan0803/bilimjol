'use client';
import Header from '../components/Header';
import { PLANS } from '../data/plans';
import { useAuthStore } from '../store/auth';
import { CheckCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ALL_FEATURES = [
  'Тегін курстар (3)','Базалық тесттер','Прогресс бақылау',
  '5-7 сынып курстары','Тест жауаптары','Email қолдау',
  '8-9 сынып курстары','Олимпиада тапсырмалары','ЖИ-кеңесші','Сертификат',
  '10-сынып курстары','Жеке мұғаліммен сессия','Жеке оқу жоспары',
  'Ата-ана есебі','ҰБТ дайындық','24/7 қолдау',
];
const PLAN_FEATURES: Record<string,string[]> = {
  free: ALL_FEATURES.slice(0,3),
  basic: ALL_FEATURES.slice(0,6),
  premium: ALL_FEATURES.slice(0,10),
  vip: ALL_FEATURES,
};

export default function PricingPage() {
  const { user, isAuthenticated, updatePlan } = useAuthStore();
  const router = useRouter();
  const [buying, setBuying] = useState<string|null>(null);

  const handleSelect = (planId: string) => {
    if (!isAuthenticated) { router.push('/auth/register'); return; }
    setBuying(planId);
    setTimeout(() => { updatePlan(planId as any); setBuying(null); router.push('/dashboard'); }, 1200);
  };

  return (
    <div>
      <Header />
      <div style={{background:'#1c1d1f',padding:'56px 24px',textAlign:'center'}}>
        <h1 style={{fontSize:36,fontWeight:800,color:'#fff',marginBottom:12}}>Жоспарыңды таңда</h1>
        <p style={{fontSize:16,color:'#9fa4a8',maxWidth:480,margin:'0 auto'}}>Өз деңгейіңе сай жоспар — бірінші ай кері қайтарылатын кепілдікпен</p>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'48px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:56}}>
          {PLANS.map(plan => {
            const isCurrent = user?.plan === plan.id;
            const isLoading = buying === plan.id;
            return (
              <div key={plan.id} style={{border:`2px solid ${plan.popular?'#a435f0':'#d1d7dc'}`,borderRadius:4,padding:24,position:'relative',background:'#fff'}}>
                {plan.popular&&<div style={{position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',background:'#a435f0',color:'#fff',fontSize:11,fontWeight:700,padding:'4px 14px',borderRadius:10,whiteSpace:'nowrap'}}>⭐ ЕҢ ТАНЫМАЛ</div>}
                {isCurrent&&<div style={{position:'absolute',top:-14,right:16,background:'#1e6055',color:'#fff',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:10}}>Қазіргі</div>}
                <div style={{fontWeight:800,fontSize:20,color:plan.color,marginBottom:4}}>{plan.nameKz}</div>
                <div style={{display:'flex',alignItems:'baseline',gap:4,marginBottom:20}}>
                  <span style={{fontSize:36,fontWeight:800,color:'#1c1d1f'}}>{plan.price===0?'0':plan.price.toLocaleString()}</span>
                  <span style={{fontSize:14,color:'#6a6f73'}}>{plan.price===0?'тегін':`₸/${plan.period}`}</span>
                </div>
                <ul style={{listStyle:'none',padding:0,marginBottom:24}}>
                  {plan.features.map((f,i)=>(
                    <li key={i} style={{display:'flex',gap:8,fontSize:13,marginBottom:8,color:'#1c1d1f',alignItems:'flex-start'}}>
                      <CheckCircle size={15} color={plan.color} style={{flexShrink:0,marginTop:1}}/>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={()=>handleSelect(plan.id)} disabled={isCurrent||isLoading}
                  style={{width:'100%',padding:'12px',borderRadius:4,fontWeight:700,fontSize:15,cursor:isCurrent?'default':'pointer',background:isCurrent?'#f7f9fa':plan.popular?'#a435f0':'transparent',color:isCurrent?'#6a6f73':plan.popular?'#fff':'#a435f0',border:`2px solid ${isCurrent?'#d1d7dc':'#a435f0'}`,fontFamily:'inherit'}}>
                  {isLoading?'Жүктелуде...':isCurrent?'✓ Белсенді':plan.price===0?'Тегін бастау':'Сатып алу'}
                </button>
              </div>
            );
          })}
        </div>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Толық салыстыру</h2>
        <div style={{background:'#fff',border:'1px solid #d1d7dc',borderRadius:4,overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f7f9fa',borderBottom:'2px solid #d1d7dc'}}>
                <th style={{textAlign:'left',padding:'14px 20px',fontSize:14,fontWeight:700,width:'40%'}}>Функциялар</th>
                {PLANS.map(p=><th key={p.id} style={{textAlign:'center',padding:'14px 12px',fontSize:14,fontWeight:700,color:p.color}}>{p.nameKz}</th>)}
              </tr>
            </thead>
            <tbody>
              {ALL_FEATURES.map((feat,i)=>(
                <tr key={i} style={{borderBottom:'1px solid #f0f0f0'}}>
                  <td style={{padding:'12px 20px',fontSize:14,color:'#1c1d1f'}}>{feat}</td>
                  {PLANS.map(p=>(
                    <td key={p.id} style={{textAlign:'center',padding:'12px'}}>
                      {PLAN_FEATURES[p.id].includes(feat)?<CheckCircle size={18} color={p.color}/>:<X size={18} color="#d1d7dc"/>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
