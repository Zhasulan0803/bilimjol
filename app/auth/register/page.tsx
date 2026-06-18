'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const [form, setForm] = useState({ name:'', email:'', password:'', grade:7 });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name||!form.email||!form.password) { setError('Барлық өрістерді толтырыңыз'); return; }
    if (form.password.length<6) { setError('Пароль кемінде 6 таңба'); return; }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Қате'); setLoading(false); return; }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (authError) { setError('Кіру қатесі'); setLoading(false); return; }

      window.location.href = '/dashboard';
    } catch {
      setError('Сервер қатесі');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#1E1B4B,#7C3AED,#EC4899)', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}>
      <div style={{ width:'100%', maxWidth:440 }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, marginBottom:28, justifyContent:'center' }}>
          <div style={{ width:38, height:38, borderRadius:10, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:900, fontSize:19 }}>Б</div>
          <span style={{ fontWeight:900, fontSize:21, color:'#fff' }}>БілімЖол</span>
        </Link>
        <div style={{ background:'#fff', borderRadius:24, padding:'36px', boxShadow:'0 24px 64px rgba(0,0,0,0.3)' }}>
          <h1 style={{ fontSize:24, fontWeight:900, marginBottom:4 }}>Тіркелу</h1>
          <p style={{ fontSize:14, color:'#6B7280', marginBottom:24 }}>Тегін аккаунт ашыңыз</p>

          {error && <div style={{ background:'#FEF2F2', border:'1.5px solid #FECACA', borderRadius:10, padding:'10px 14px', fontSize:13, color:'#DC2626', marginBottom:16 }}>{error}</div>}

          {[{label:'Аты-жөні',key:'name',type:'text',ph:'Айгерім Сейтқали'},{label:'Email',key:'email',type:'email',ph:'email@example.com'}].map(f=>(
            <div key={f.key} style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontWeight:700, fontSize:14, marginBottom:6 }}>{f.label}</label>
              <input type={f.type} value={(form as any)[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.ph}
                style={{ width:'100%', height:46, padding:'0 14px', border:'2px solid #E5E7EB', borderRadius:12, fontSize:15, outline:'none', boxSizing:'border-box' }}
                onFocus={e=>e.target.style.borderColor='#7C3AED'} onBlur={e=>e.target.style.borderColor='#E5E7EB'}/>
            </div>
          ))}

          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontWeight:700, fontSize:14, marginBottom:6 }}>Сыныбыңыз</label>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {[5,6,7,8,9,10].map(g=>(
                <button key={g} onClick={()=>setForm(p=>({...p,grade:g}))}
                  style={{ padding:'8px 16px', borderRadius:10, border:`2px solid ${form.grade===g?'#7C3AED':'#E5E7EB'}`, background:form.grade===g?'#7C3AED':'transparent', color:form.grade===g?'#fff':'#374151', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom:24 }}>
            <label style={{ display:'block', fontWeight:700, fontSize:14, marginBottom:6 }}>Пароль</label>
            <div style={{ position:'relative' }}>
              <input type={showPw?'text':'password'} value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} placeholder="Кемінде 6 таңба"
                style={{ width:'100%', height:46, padding:'0 44px 0 14px', border:'2px solid #E5E7EB', borderRadius:12, fontSize:15, outline:'none', boxSizing:'border-box' }}
                onFocus={e=>e.target.style.borderColor='#7C3AED'} onBlur={e=>e.target.style.borderColor='#E5E7EB'}/>
              <button onClick={()=>setShowPw(!showPw)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9CA3AF' }}>
                {showPw?<EyeOff size={18}/>:<Eye size={18}/>}
              </button>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={loading}
            style={{ width:'100%', height:50, background:loading?'#DDD6FE':'linear-gradient(135deg,#7C3AED,#EC4899)', color:'#fff', border:'none', borderRadius:12, fontWeight:800, fontSize:16, cursor:loading?'not-allowed':'pointer', fontFamily:'inherit' }}>
            {loading?'Жүктелуде...':'Тіркелу — тегін →'}
          </button>

          <div style={{ display:'flex', gap:16, marginTop:20, justifyContent:'center', flexWrap:'wrap' }}>
            {['Тегін тіркелу','Кредит картасы жоқ','Деректер қауіпсіз'].map(t=>(
              <div key={t} style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#6B7280' }}>
                <CheckCircle size={13} color="#10B981"/>{t}
              </div>
            ))}
          </div>

          <p style={{ textAlign:'center', fontSize:14, color:'#6B7280', marginTop:16 }}>
            Аккаунтыңыз бар ма? <Link href="/auth/login" style={{ color:'#7C3AED', fontWeight:700 }}>Кіру</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
