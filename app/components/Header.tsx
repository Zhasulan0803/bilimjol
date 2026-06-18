'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/auth';
import { Search, Bell, ChevronDown, LogOut, LayoutDashboard, BookOpen, Star, Zap } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [drop, setDrop] = useState(false);

  const planColors: Record<string,string> = { free:'#6B7280', basic:'#10B981', premium:'#7C3AED', vip:'#F97316' };
  const pc = user ? planColors[user.plan] : '#6B7280';

  return (
    <header style={{ background:'#fff', borderBottom:'2px solid #F3F4F6', position:'sticky', top:0, zIndex:100, boxShadow:'0 1px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth:1340, margin:'0 auto', padding:'0 20px', height:60, display:'flex', alignItems:'center', gap:16 }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#7C3AED,#EC4899)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, color:'#fff', fontSize:18 }}>Б</div>
          <span style={{ fontWeight:800, fontSize:20, background:'linear-gradient(135deg,#7C3AED,#EC4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>БілімЖол</span>
        </Link>

        <nav style={{ display:'flex', gap:2 }}>
          {[['/', 'Басты'], ['/courses', 'Курстар'], ['/pricing', 'Бағалар'], ['/dashboard/leaderboard', 'Рейтинг']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color:'#6B7280', fontSize:14, fontWeight:600, padding:'6px 12px', borderRadius:8 }}
              onMouseEnter={e => { e.currentTarget.style.background='#F5F3FF'; e.currentTarget.style.color='#7C3AED'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#6B7280'; }}
            >{label}</Link>
          ))}
        </nav>

        <div style={{ flex:1, maxWidth:480, position:'relative' }}>
          <Search size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF' }} />
          <input type="text" placeholder="Курс, пән іздеу..." style={{ width:'100%', height:38, paddingLeft:36, paddingRight:12, background:'#F9FAFB', border:'1.5px solid #E5E7EB', borderRadius:20, fontSize:13, outline:'none', transition:'border 0.2s' }}
            onFocus={e => e.target.style.borderColor='#7C3AED'} onBlur={e => e.target.style.borderColor='#E5E7EB'} />
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:10, marginLeft:'auto' }}>
          {isAuthenticated && user ? (
            <>
              {user.role === 'student' && (
                <div style={{ display:'flex', alignItems:'center', gap:6, background:'#FFF7ED', border:'1.5px solid #FED7AA', borderRadius:20, padding:'4px 12px' }}>
                  <Star size={13} color="#F97316" fill="#F97316" />
                  <span style={{ fontSize:13, fontWeight:700, color:'#C2410C' }}>{user.points.toLocaleString()}</span>
                </div>
              )}
              {user.role === 'student' && (
                <div style={{ display:'flex', alignItems:'center', gap:5, background:'#FEF3C7', border:'1.5px solid #FDE68A', borderRadius:20, padding:'4px 10px' }}>
                  <span style={{ fontSize:13 }}>🔥</span>
                  <span style={{ fontSize:13, fontWeight:700, color:'#92400E' }}>{user.streak}</span>
                </div>
              )}
              <Bell size={20} style={{ color:'#9CA3AF', cursor:'pointer' }} />
              <div style={{ position:'relative' }}>
                <button onClick={() => setDrop(!drop)} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', padding:'4px 8px', borderRadius:10 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:`linear-gradient(135deg,${pc},${pc}99)`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:15 }}>{user.name.slice(0,1)}</div>
                  <div style={{ textAlign:'left' }}>
                    <div style={{ color:'#111827', fontSize:13, fontWeight:700, lineHeight:1.2 }}>{user.name.split(' ')[0]}</div>
                    <div style={{ fontSize:11, color:pc, fontWeight:700 }}>{user.plan.toUpperCase()}</div>
                  </div>
                  <ChevronDown size={14} color="#9CA3AF" />
                </button>
                {drop && (
                  <div style={{ position:'absolute', right:0, top:'110%', background:'#fff', border:'1.5px solid #E5E7EB', borderRadius:12, minWidth:200, boxShadow:'0 8px 24px rgba(0,0,0,0.12)', zIndex:200, overflow:'hidden' }}>
                    <div style={{ padding:'12px 16px', borderBottom:'1px solid #F3F4F6', background:'linear-gradient(135deg,#F5F3FF,#FDF2F8)' }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{user.name}</div>
                      <div style={{ fontSize:12, color:'#6B7280' }}>{user.email}</div>
                    </div>
                    {[
                      { href:'/dashboard', icon:<LayoutDashboard size={15}/>, label:'Дашборд' },
                      { href:'/dashboard/courses', icon:<BookOpen size={15}/>, label:'Курстарым' },
                    ].map(item => (
                      <Link key={item.href} href={item.href} onClick={() => setDrop(false)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 16px', fontSize:14, color:'#374151', transition:'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background='#F9FAFB'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                        <span style={{ color:'#7C3AED' }}>{item.icon}</span>{item.label}
                      </Link>
                    ))}
                    <div style={{ borderTop:'1px solid #F3F4F6' }}>
                      <button onClick={() => { logout(); setDrop(false); }} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 16px', fontSize:14, color:'#EF4444', background:'none', border:'none', width:'100%', textAlign:'left', cursor:'pointer', fontFamily:'inherit' }}>
                        <LogOut size={15}/> Шығу
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" style={{ color:'#7C3AED', fontSize:14, fontWeight:700, padding:'8px 18px', border:'2px solid #7C3AED', borderRadius:8 }}>Кіру</Link>
              <Link href="/auth/register" style={{ background:'linear-gradient(135deg,#7C3AED,#EC4899)', color:'#fff', fontSize:14, fontWeight:700, padding:'8px 18px', borderRadius:8 }}>Тіркелу</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
