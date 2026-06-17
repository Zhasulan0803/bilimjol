'use client';
import { useAuthStore } from '../store/auth';
import { COURSES } from '../data/courses';
import Link from 'next/link';
import { BookOpen, Trophy, Star, TrendingUp, Zap, Target, Users, DollarSign, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const weekData = [
  {day:'Дс',min:45},{day:'Сс',min:60},{day:'Ср',min:30},{day:'Бс',min:90},{day:'Жм',min:50},{day:'Сб',min:120},{day:'Жс',min:40},
];
const scoreData = [
  {w:'1-ап',s:62},{w:'2-ап',s:70},{w:'3-ап',s:68},{w:'4-ап',s:81},{w:'5-ап',s:88},{w:'6-ап',s:85},
];
const adminMonths = [
  {m:'Қаң',u:320},{m:'Ақп',u:480},{m:'Нау',u:620},{m:'Сәу',u:890},{m:'Мам',u:1200},{m:'Мау',u:1560},
];
const pieData = [
  {name:'Free',val:50,color:'#9CA3AF'},{name:'Basic',val:25,color:'#10B981'},{name:'Premium',val:18,color:'#7C3AED'},{name:'VIP',val:7,color:'#F97316'},
];

function StatCard({ label, value, icon, color, bg, change }: any) {
  return (
    <div style={{ background:'#fff', border:`1.5px solid ${color}22`, borderRadius:16, padding:'20px', display:'flex', gap:14, alignItems:'flex-start' }}>
      <div style={{ width:48, height:48, background:bg, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:26, fontWeight:900, color:'#111827' }}>{value}</div>
        <div style={{ fontSize:13, color:'#6B7280' }}>{label}</div>
      </div>
      {change && <span style={{ fontSize:12, fontWeight:700, color:'#10B981', background:'#ECFDF5', padding:'3px 8px', borderRadius:8, marginTop:4 }}>{change}</span>}
    </div>
  );
}

function StudentDashboard() {
  const { user } = useAuthStore();
  if (!user) return null;
  const enrolled = COURSES.filter(c => user.coursesEnrolled.includes(c.id));

  return (
    <div style={{ padding:'32px' }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:26, fontWeight:900, marginBottom:4 }}>Сәлем, {user.name.split(' ')[0]}! 👋</h1>
        <p style={{ color:'#6B7280', fontSize:15 }}>Бүгін де оқуды жалғастырайық!</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:28 }}>
        <StatCard label="Жалпы ұпай" value={user.points.toLocaleString()} icon={<Star size={24} color="#F59E0B" fill="#F59E0B"/>} color="#F59E0B" bg="#FFFBEB"/>
        <StatCard label="Деңгей" value={`Lv.${user.level}`} icon={<Zap size={24} color="#7C3AED"/>} color="#7C3AED" bg="#F5F3FF"/>
        <StatCard label="Тіркелген курс" value={enrolled.length} icon={<BookOpen size={24} color="#3B82F6"/>} color="#3B82F6" bg="#EFF6FF"/>
        <StatCard label="🔥 Streak" value={`${user.streak} күн`} icon={<Trophy size={24} color="#EC4899"/>} color="#EC4899" bg="#FDF2F8"/>
      </div>

      {/* Plan upgrade banner */}
      {user.plan==='free' && (
        <div style={{ background:'linear-gradient(135deg,#7C3AED,#EC4899)', borderRadius:16, padding:'20px 24px', marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          <div>
            <div style={{ fontWeight:800, color:'#fff', fontSize:16, marginBottom:4 }}>🚀 Premiumға өт — барлық курстар ашылады!</div>
            <div style={{ fontSize:13, color:'#E9D5FF' }}>ЖИ кеңесші, олимпиада тапсырмалары, сертификат — бір жерде</div>
          </div>
          <Link href="/pricing" style={{ background:'#fff', color:'#7C3AED', padding:'10px 24px', borderRadius:10, fontWeight:800, fontSize:14, whiteSpace:'nowrap', flexShrink:0 }}>Жаңарту →</Link>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:24 }}>
        <div>
          {/* Charts */}
          <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'20px', marginBottom:20 }}>
            <h2 style={{ fontWeight:800, fontSize:16, marginBottom:4 }}>Апталық белсенділік</h2>
            <p style={{ fontSize:13, color:'#6B7280', marginBottom:16 }}>Оқуға жұмсалған уақыт (минут)</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                <XAxis dataKey="day" tick={{fontSize:12}}/>
                <YAxis tick={{fontSize:12}}/>
                <Tooltip contentStyle={{borderRadius:8,border:'none',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}/>
                <Bar dataKey="min" fill="url(#barGrad)" radius={[6,6,0,0]}/>
                <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#EC4899"/></linearGradient></defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'20px' }}>
            <h2 style={{ fontWeight:800, fontSize:16, marginBottom:4 }}>Тест нәтижелері</h2>
            <p style={{ fontSize:13, color:'#6B7280', marginBottom:16 }}>6 аптадағы жетістік (%)</p>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                <XAxis dataKey="w" tick={{fontSize:11}}/>
                <YAxis domain={[50,100]} tick={{fontSize:11}}/>
                <Tooltip contentStyle={{borderRadius:8,border:'none',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}/>
                <Line type="monotone" dataKey="s" stroke="#7C3AED" strokeWidth={3} dot={{fill:'#EC4899',r:4}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Continue courses */}
          <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'20px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <h2 style={{ fontWeight:800, fontSize:15 }}>Жалғастыру</h2>
              <Link href="/dashboard/courses" style={{ fontSize:12, color:'#7C3AED', fontWeight:700 }}>Барлығы →</Link>
            </div>
            {enrolled.slice(0,3).map(c => (
              <Link key={c.id} href={`/courses/${c.id}`} style={{ display:'flex', gap:10, marginBottom:14, textDecoration:'none' }}>
                <div style={{ fontSize:24, width:44, height:44, background:c.color+'18', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{c.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'#111827', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.title}</div>
                  <div style={{ height:5, background:'#F3F4F6', borderRadius:3, marginTop:6, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${c.progress||0}%`, background:`linear-gradient(90deg,${c.color},${c.color}88)`, borderRadius:3 }}/>
                  </div>
                  <div style={{ fontSize:11, color:'#9CA3AF', marginTop:2 }}>{c.progress||0}%</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Streak card */}
          <div style={{ background:'linear-gradient(135deg,#1E1B4B,#312E81)', borderRadius:16, padding:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <span style={{ fontSize:28 }}>🔥</span>
              <div style={{ fontWeight:800, fontSize:16, color:'#fff' }}>{user.streak} күн қатарынан!</div>
            </div>
            <p style={{ fontSize:13, color:'#A78BFA', marginBottom:14 }}>Апталық жазбаны сақта — 50 бонус XP!</p>
            <div style={{ display:'flex', gap:5 }}>
              {['Дс','Сс','Ср','Бс','Жм','Сб','Жс'].map((d,i) => (
                <div key={d} style={{ flex:1, textAlign:'center' }}>
                  <div style={{ width:'100%', aspectRatio:'1', borderRadius:'50%', background:i<user.streak%7?'linear-gradient(135deg,#7C3AED,#EC4899)':'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#fff', marginBottom:2 }}>
                    {i<user.streak%7?'✓':''}
                  </div>
                  <div style={{ fontSize:9, color:'#7C6FAE' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'16px' }}>
            <h2 style={{ fontWeight:800, fontSize:11, marginBottom:12, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.5px' }}>Жылдам өту</h2>
            {[
              { href:'/dashboard/tests', label:'Тест тапсыру', emoji:'🎯', color:'#7C3AED' },
              { href:'/dashboard/ai-chat', label:'ЖИ кеңесші', emoji:'🤖', color:'#EC4899' },
              { href:'/dashboard/leaderboard', label:'Рейтинг', emoji:'🏆', color:'#F97316' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:10, marginBottom:4, textDecoration:'none', transition:'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background='#F9FAFB'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                <span style={{ fontSize:20 }}>{item.emoji}</span>
                <span style={{ fontSize:14, fontWeight:600, color:'#374151' }}>{item.label}</span>
                <ArrowRight size={14} color="#9CA3AF" style={{ marginLeft:'auto' }}/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div style={{ padding:'32px' }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:26, fontWeight:900, marginBottom:4 }}>Админ панелі ⚙️</h1>
        <p style={{ color:'#6B7280', fontSize:15 }}>Платформаның жалпы жай-күйі</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        <StatCard label="Жалпы оқушы" value="12 450" icon={<Users size={24} color="#3B82F6"/>} color="#3B82F6" bg="#EFF6FF" change="+12%"/>
        <StatCard label="Ай кірісі" value="1.8М ₸" icon={<DollarSign size={24} color="#10B981"/>} color="#10B981" bg="#ECFDF5" change="+24%"/>
        <StatCard label="Белсенді курс" value="86" icon={<BookOpen size={24} color="#7C3AED"/>} color="#7C3AED" bg="#F5F3FF" change="+4"/>
        <StatCard label="Орт. рейтинг" value="4.7 ★" icon={<Star size={24} color="#F59E0B" fill="#F59E0B"/>} color="#F59E0B" bg="#FFFBEB" change="+0.1"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
        <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'20px' }}>
          <h2 style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>Оқушылар өсімі</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={adminMonths}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="m" tick={{fontSize:12}}/>
              <YAxis tick={{fontSize:12}}/>
              <Tooltip contentStyle={{borderRadius:8,border:'none'}}/>
              <Bar dataKey="u" fill="url(#adminGrad)" radius={[6,6,0,0]}/>
              <defs><linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'20px' }}>
          <h2 style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>Жоспарлар бөлінуі</h2>
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <PieChart width={160} height={160}>
              <Pie data={pieData} cx={75} cy={75} innerRadius={45} outerRadius={70} dataKey="val">
                {pieData.map((e,i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
            </PieChart>
            <div style={{ flex:1 }}>
              {pieData.map(p => (
                <div key={p.name} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                  <div style={{ width:10, height:10, borderRadius:'50%', background:p.color, flexShrink:0 }}/>
                  <span style={{ fontSize:13, flex:1 }}>{p.name}</span>
                  <span style={{ fontWeight:700, fontSize:13 }}>{p.val}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'20px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <h2 style={{ fontWeight:800, fontSize:16 }}>Соңғы тіркелгендер</h2>
          <Link href="/dashboard/admin/users" style={{ fontSize:13, color:'#7C3AED', fontWeight:700 }}>Барлығы →</Link>
        </div>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14 }}>
          <thead>
            <tr style={{ borderBottom:'2px solid #F3F4F6' }}>
              {['Аты-жөні','Email','Сыныбы','Жоспар','Тіркелген'].map(h => (
                <th key={h} style={{ textAlign:'left', padding:'8px 12px', fontSize:12, fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {name:'Айгерім Сейтқали',email:'a.seit@mail.kz',grade:'9',plan:'premium',date:'2025-06-10'},
              {name:'Бекзат Досов',email:'bekzat@mail.kz',grade:'10',plan:'vip',date:'2025-06-09'},
              {name:'Мадина Асқарова',email:'m.ask@mail.kz',grade:'8',plan:'basic',date:'2025-06-08'},
              {name:'Ерлан Нұрланов',email:'erlan@mail.kz',grade:'7',plan:'free',date:'2025-06-07'},
            ].map((u,i) => {
              const pc2: Record<string,string> = {free:'#6B7280',basic:'#10B981',premium:'#7C3AED',vip:'#F97316'};
              return (
                <tr key={i} style={{ borderBottom:'1px solid #F9FAFB' }} onMouseEnter={e=>e.currentTarget.style.background='#F9FAFB'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'10px 12px', fontWeight:600 }}>{u.name}</td>
                  <td style={{ padding:'10px 12px', color:'#6B7280' }}>{u.email}</td>
                  <td style={{ padding:'10px 12px' }}>{u.grade}-сынып</td>
                  <td style={{ padding:'10px 12px' }}><span style={{ background:pc2[u.plan]+'22', color:pc2[u.plan], fontSize:11, fontWeight:700, padding:'3px 8px', borderRadius:8 }}>{u.plan.toUpperCase()}</span></td>
                  <td style={{ padding:'10px 12px', color:'#6B7280' }}>{u.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ParentDashboard() {
  const { user, users } = useAuthStore();
  const child = users.find(u => u.id === user?.childId);
  const enrolled = COURSES.filter(c => child?.coursesEnrolled.includes(c.id));
  return (
    <div style={{ padding:'32px' }}>
      <h1 style={{ fontSize:26, fontWeight:900, marginBottom:4 }}>Ата-ана панелі 👨‍👩‍👧</h1>
      <p style={{ color:'#6B7280', fontSize:15, marginBottom:28 }}>Баланың оқу жетістіктері</p>
      {child ? (
        <>
          <div style={{ background:'linear-gradient(135deg,#7C3AED,#EC4899)', borderRadius:16, padding:'24px', marginBottom:24, display:'flex', gap:20, alignItems:'center' }}>
            <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:26 }}>{child.name.slice(0,1)}</div>
            <div>
              <div style={{ fontWeight:800, fontSize:20, color:'#fff' }}>{child.name}</div>
              <div style={{ color:'#E9D5FF', fontSize:14 }}>{child.grade}-сынып · Деңгей {child.level} · 🔥 {child.streak} күн streak</div>
              <div style={{ display:'flex', gap:8, marginTop:8 }}>
                {child.badges.map((b,i) => <span key={i} style={{ fontSize:20 }}>{b}</span>)}
              </div>
            </div>
            <div style={{ marginLeft:'auto', textAlign:'center' }}>
              <div style={{ fontSize:32, fontWeight:900, color:'#fff' }}>{child.points.toLocaleString()}</div>
              <div style={{ color:'#E9D5FF', fontSize:13 }}>Жалпы ұпай</div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
            <StatCard label="Тіркелген курс" value={enrolled.length} icon={<BookOpen size={22} color="#3B82F6"/>} color="#3B82F6" bg="#EFF6FF"/>
            <StatCard label="Streak" value={`${child.streak} күн`} icon={<span style={{fontSize:22}}>🔥</span>} color="#F97316" bg="#FFF7ED"/>
            <StatCard label="XP" value={child.xp} icon={<Zap size={22} color="#7C3AED"/>} color="#7C3AED" bg="#F5F3FF"/>
          </div>
          <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'20px' }}>
            <h2 style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>Тіркелген курстар</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {enrolled.map(c => (
                <div key={c.id} style={{ display:'flex', gap:12, padding:'12px', border:'1.5px solid #F3F4F6', borderRadius:12, alignItems:'center' }}>
                  <div style={{ fontSize:28, width:44, height:44, background:c.color+'18', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{c.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:13 }}>{c.title}</div>
                    <div style={{ height:5, background:'#F3F4F6', borderRadius:3, marginTop:6, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${c.progress||0}%`, background:c.color, borderRadius:3 }}/>
                    </div>
                    <div style={{ fontSize:11, color:'#9CA3AF', marginTop:2 }}>{c.progress||0}% аяқталды</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : <div style={{ textAlign:'center', padding:'60px', color:'#6B7280' }}>Бала аккаунты табылмады</div>}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  if (!user) return null;
  if (user.role==='admin') return <AdminDashboard/>;
  if (user.role==='parent') return <ParentDashboard/>;
  return <StudentDashboard/>;
}
