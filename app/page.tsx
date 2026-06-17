'use client';
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import { COURSES, SUBJECTS } from './data/courses';
import { PLANS } from './data/plans';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle, Zap, Trophy, BookOpen, Users, Star, Shield } from 'lucide-react';

export default function Home() {
  const [activeSubject, setActiveSubject] = useState<string|null>(null);
  const shown = COURSES.filter(c => !activeSubject || c.subject === activeSubject).slice(0, 8);

  return (
    <div>
      <Header />

      {/* Hero */}
      <section style={{ background:'linear-gradient(135deg,#1E1B4B 0%,#312E81 40%,#4C1D95 70%,#7C3AED 100%)', padding:'80px 24px', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:'rgba(236,72,153,0.15)', filter:'blur(60px)' }}/>
        <div style={{ position:'absolute', bottom:-50, left:-50, width:300, height:300, borderRadius:'50%', background:'rgba(124,58,237,0.2)', filter:'blur(40px)' }}/>
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:60, alignItems:'center' }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:20, padding:'6px 16px', marginBottom:24 }}>
                <span style={{ fontSize:14 }}>🇰🇿</span>
                <span style={{ color:'#E9D5FF', fontSize:13, fontWeight:600 }}>Қазақстанның №1 мектеп платформасы</span>
              </div>
              <h1 style={{ fontSize:52, fontWeight:900, color:'#fff', lineHeight:1.15, marginBottom:20 }}>
                5–10 сыныпқа<br/>
                <span style={{ background:'linear-gradient(135deg,#F9A8D4,#FCD34D)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>ақылды оқу</span><br/>
                платформасы
              </h1>
              <p style={{ fontSize:18, color:'#C4B5FD', marginBottom:36, lineHeight:1.7 }}>Математика, физика, химия — интерактивті сабақтар, ЖИ кеңесші және олимпиада дайындығы бір жерде.</p>
              <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:48 }}>
                <Link href="/auth/register" style={{ background:'linear-gradient(135deg,#EC4899,#F97316)', color:'#fff', padding:'16px 32px', borderRadius:12, fontWeight:800, fontSize:17, display:'flex', alignItems:'center', gap:8, boxShadow:'0 8px 24px rgba(236,72,153,0.4)' }}>
                  Тегін бастау <ArrowRight size={20}/>
                </Link>
                <Link href="/courses" style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', color:'#fff', padding:'16px 32px', borderRadius:12, fontWeight:700, fontSize:17, border:'1px solid rgba(255,255,255,0.2)' }}>
                  Курстарды қарау
                </Link>
              </div>
              <div style={{ display:'flex', gap:40, flexWrap:'wrap' }}>
                {[['12 000+','Оқушы'],['86','Курс'],['4 800+','Тапсырма'],['98%','Қанағаттану']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontSize:28, fontWeight:900, color:'#fff' }}>{n}</div>
                    <div style={{ fontSize:13, color:'#A78BFA' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card */}
            <div style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:20, padding:24 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#F9A8D4', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>🔥 Үздік курстар</div>
              {COURSES.filter(c=>c.isFree).slice(0,4).map(c => (
                <div key={c.id} style={{ display:'flex', gap:12, marginBottom:14, alignItems:'center', padding:'10px', borderRadius:12, background:'rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize:28, width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,0.1)', borderRadius:10, flexShrink:0 }}>{c.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'#fff', lineHeight:1.3 }}>{c.title}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:3 }}>
                      <Star size={10} fill="#FCD34D" color="#FCD34D"/>
                      <span style={{ fontSize:12, color:'#FCD34D', fontWeight:700 }}>{c.rating}</span>
                      <span style={{ fontSize:11, color:'#A78BFA' }}>({c.reviews})</span>
                    </div>
                  </div>
                  <span style={{ background:'#10B981', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:6 }}>ТЕГІН</span>
                </div>
              ))}
              <Link href="/courses" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:12, padding:'12px', background:'linear-gradient(135deg,#7C3AED,#EC4899)', borderRadius:12, color:'#fff', fontWeight:700, fontSize:14 }}>
                Барлық курстар <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section style={{ background:'#fff', padding:'56px 24px', borderBottom:'1px solid #F3F4F6' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <h2 style={{ fontSize:32, fontWeight:800, marginBottom:8 }}>Пәндер бойынша</h2>
            <p style={{ color:'#6B7280', fontSize:16 }}>Өз пәніңді таңда</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:12 }}>
            {SUBJECTS.map(s => (
              <button key={s.id} onClick={() => setActiveSubject(activeSubject===s.id?null:s.id)}
                style={{ background:activeSubject===s.id?s.color:'#fff', border:`2px solid ${activeSubject===s.id?s.color:'#E5E7EB'}`, borderRadius:16, padding:'16px 8px', textAlign:'center', cursor:'pointer', transition:'all 0.2s', transform:activeSubject===s.id?'scale(1.05)':'scale(1)' }}>
                <div style={{ fontSize:30, marginBottom:6 }}>{s.emoji}</div>
                <div style={{ fontSize:12, fontWeight:700, color:activeSubject===s.id?'#fff':'#374151' }}>{s.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section style={{ padding:'56px 24px', background:'#FAFAFA' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
            <h2 style={{ fontSize:28, fontWeight:800 }}>Танымал курстар</h2>
            <Link href="/courses" style={{ color:'#7C3AED', fontWeight:700, fontSize:14, display:'flex', alignItems:'center', gap:4 }}>Барлығы <ArrowRight size={16}/></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {shown.map(c => <CourseCard key={c.id} course={c}/>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background:'#fff', padding:'56px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontSize:32, fontWeight:800, marginBottom:8 }}>Неліктен БілімЖол?</h2>
            <p style={{ color:'#6B7280', fontSize:16 }}>Оқушыларға арнайы жасалған функциялар</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {[
              { icon:'🤖', color:'#7C3AED', bg:'#F5F3FF', title:'ЖИ-кеңесші', desc:'Кез келген сұрақты ЖИ-ге бер — қазақ тілінде жауап ал' },
              { icon:'🏆', color:'#F97316', bg:'#FFF7ED', title:'Олимпиада дайындық', desc:'Аудандық, облыстық, республикалық олимпиадаға арналған тапсырмалар' },
              { icon:'🎮', color:'#EC4899', bg:'#FDF2F8', title:'Геймификация', desc:'Деңгей көтер, жетістік ал, рейтингте өр — оқу ойынға айналады' },
              { icon:'📊', color:'#3B82F6', bg:'#EFF6FF', title:'Прогресс бақылау', desc:'Апталық, айлық нәтижелер графиктермен көрсетіледі' },
              { icon:'👨‍👩‍👧', color:'#10B981', bg:'#ECFDF5', title:'Ата-ана панелі', desc:'Баланың белсенділігін реал уақытта бақыла, есеп ал' },
              { icon:'🎓', color:'#F59E0B', bg:'#FFFBEB', title:'Сертификат', desc:'Курсты аяқтаған соң ресми сертификат — резюмеге қос' },
            ].map((f,i) => (
              <div key={i} style={{ background:f.bg, border:`1.5px solid ${f.color}22`, borderRadius:16, padding:'24px', display:'flex', gap:16, transition:'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform=''}>
                <div style={{ fontSize:36, flexShrink:0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:16, marginBottom:6, color:'#111827' }}>{f.title}</div>
                  <div style={{ fontSize:14, color:'#6B7280', lineHeight:1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background:'#FAFAFA', padding:'56px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <h2 style={{ fontSize:32, fontWeight:800, marginBottom:8 }}>Жоспарлар</h2>
            <p style={{ color:'#6B7280', fontSize:16 }}>Өз деңгейіңе сай жоспар таңда</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {PLANS.map(plan => (
              <div key={plan.id} style={{ border:`2px solid ${plan.popular?plan.color:'#E5E7EB'}`, borderRadius:16, padding:24, position:'relative', background:plan.popular?`linear-gradient(135deg,${plan.color}08,${plan.color}15)`:'#fff', transition:'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform=''}>
                {plan.popular && <div style={{ position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)', background:`linear-gradient(135deg,${plan.color},${plan.color}cc)`, color:'#fff', fontSize:11, fontWeight:700, padding:'4px 14px', borderRadius:10, whiteSpace:'nowrap' }}>⭐ ЕҢ ТАНЫМАЛ</div>}
                <div style={{ fontWeight:800, fontSize:20, color:plan.color, marginBottom:4 }}>{plan.nameKz}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:20 }}>
                  <span style={{ fontSize:34, fontWeight:900, color:'#111827' }}>{plan.price===0?'0':plan.price.toLocaleString()}</span>
                  <span style={{ fontSize:13, color:'#6B7280' }}>{plan.price===0?'тегін':'₸/ай'}</span>
                </div>
                <ul style={{ listStyle:'none', padding:0, marginBottom:20 }}>
                  {plan.features.slice(0,4).map((f,i) => (
                    <li key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, marginBottom:7, color:'#374151' }}>
                      <CheckCircle size={14} color={plan.color}/> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" style={{ display:'block', textAlign:'center', padding:'11px', borderRadius:10, background:plan.popular?`linear-gradient(135deg,${plan.color},${plan.color}cc)`:'transparent', color:plan.popular?'#fff':plan.color, border:`2px solid ${plan.color}`, fontWeight:700, fontSize:14 }}>
                  {plan.price===0?'Тегін бастау':'Таңдау'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'linear-gradient(135deg,#1E1B4B,#7C3AED)', padding:'80px 24px', textAlign:'center' }}>
        <h2 style={{ fontSize:40, fontWeight:900, color:'#fff', marginBottom:16 }}>Бүгіннен бастай бер!</h2>
        <p style={{ fontSize:17, color:'#C4B5FD', marginBottom:36 }}>Тіркелу тегін. Кредит картасы қажет емес.</p>
        <Link href="/auth/register" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'linear-gradient(135deg,#EC4899,#F97316)', color:'#fff', padding:'18px 48px', borderRadius:14, fontWeight:800, fontSize:19, boxShadow:'0 8px 32px rgba(236,72,153,0.4)' }}>
          Тіркелу — тегін <ArrowRight size={22}/>
        </Link>
      </section>

      <footer style={{ background:'#1E1B4B', padding:'28px 24px', textAlign:'center' }}>
        <p style={{ color:'#6B7280', fontSize:14 }}>© 2025 БілімЖол · Қазақстан · Барлық құқықтар қорғалған</p>
      </footer>
    </div>
  );
}
