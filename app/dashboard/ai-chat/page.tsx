'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

interface Msg { role:'user'|'assistant'; content:string; }

const SUGGESTIONS = [
  'x² - 5x + 6 = 0 теңдеуін шеш',
  'Пифагор теоремасын түсіндір',
  'Кинематика дегеніміз не?',
  'Химиялық байланыс түрлері',
  'ҰБТ-ға қалай дайындалу керек?',
];

export default function AIChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role:'assistant', content:'Сәлем! Мен БілімЖол ЖИ кеңесшісімін 🤖\n\nМатематика, физика, химия, биология немесе кез келген пән бойынша сұрақ қой — қазақ тілінде жауап берем!\n\nНе білгің келеді?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  const send = async (text?: string) => {
    const q = text || input.trim();
    if (!q || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role:'user', content:q }]);
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-6',
          max_tokens:1000,
          system:'Сен БілімЖол платформасының оқу көмекшісісің. Қазақстан мектеп оқушыларына (5-10 сынып) математика, физика, химия, биология, қазақ тілі, тарих пәндері бойынша көмектесесің. Барлық жауаптарды қазақ тілінде бер. Жауаптарды қысқа, түсінікті және мысалдармен бер. Формулаларды көрсет. Ынталандыр және мақта.',
          messages:[...messages, { role:'user', content:q }].map(m=>({ role:m.role, content:m.content }))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Кешіріңіз, жауап ала алмадым.';
      setMessages(prev => [...prev, { role:'assistant', content:reply }]);
    } catch {
      setMessages(prev => [...prev, { role:'assistant', content:'Интернет байланысын тексеріңіз немесе кейінірек қайталаңыз.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ height:'100vh', display:'flex', flexDirection:'column', background:'#F8F7FF' }}>
      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#7C3AED,#EC4899)', padding:'16px 24px', display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:12, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Bot size={22} color="#fff"/>
        </div>
        <div>
          <div style={{ fontWeight:800, fontSize:16, color:'#fff' }}>ЖИ Кеңесші</div>
          <div style={{ fontSize:12, color:'#E9D5FF' }}>Кез келген пән бойынша сұрақ қой</div>
        </div>
        <button onClick={() => setMessages([{ role:'assistant', content:'Жаңа сұхбат бастадық! Не білгің келеді?' }])}
          style={{ marginLeft:'auto', background:'rgba(255,255,255,0.15)', border:'none', borderRadius:8, padding:'6px 12px', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600 }}>
          <RefreshCw size={14}/> Тазалау
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'24px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display:'flex', gap:12, marginBottom:20, flexDirection:m.role==='user'?'row-reverse':'row' }}>
            <div style={{ width:36, height:36, borderRadius:10, background:m.role==='user'?'linear-gradient(135deg,#7C3AED,#EC4899)':'linear-gradient(135deg,#1E1B4B,#312E81)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {m.role==='user' ? <User size={18} color="#fff"/> : <Bot size={18} color="#A78BFA"/>}
            </div>
            <div style={{ maxWidth:'72%', background:m.role==='user'?'linear-gradient(135deg,#7C3AED,#EC4899)':'#fff', border:m.role==='assistant'?'1.5px solid #F3F4F6':'none', borderRadius:m.role==='user'?'16px 4px 16px 16px':'4px 16px 16px 16px', padding:'12px 16px', color:m.role==='user'?'#fff':'#111827', fontSize:14, lineHeight:1.65, whiteSpace:'pre-wrap', boxShadow:m.role==='assistant'?'0 2px 8px rgba(0,0,0,0.06)':'none' }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:'flex', gap:12, marginBottom:20 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#1E1B4B,#312E81)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Bot size={18} color="#A78BFA"/>
            </div>
            <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:'4px 16px 16px 16px', padding:'14px 18px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display:'flex', gap:6 }}>
                {[0,1,2].map(i => <div key={i} style={{ width:8, height:8, borderRadius:'50%', background:'#7C3AED', animation:`bounce 1s ${i*0.15}s infinite` }}/>)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div style={{ padding:'0 24px 12px', display:'flex', gap:8, flexWrap:'wrap' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)} style={{ background:'#fff', border:'1.5px solid #E9D5FF', borderRadius:20, padding:'6px 14px', fontSize:13, color:'#7C3AED', cursor:'pointer', fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
              <Sparkles size={12}/> {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding:'12px 24px 20px', background:'#fff', borderTop:'1.5px solid #F3F4F6' }}>
        <div style={{ display:'flex', gap:10, background:'#F9FAFB', border:'2px solid #E5E7EB', borderRadius:16, padding:'8px 8px 8px 16px', transition:'border 0.2s' }}
          onFocusCapture={e => e.currentTarget.style.borderColor='#7C3AED'}
          onBlurCapture={e => e.currentTarget.style.borderColor='#E5E7EB'}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && !e.shiftKey && send()}
            placeholder="Сұрағыңды жаз... (математика, физика, химия...)" style={{ flex:1, border:'none', background:'transparent', fontSize:14, outline:'none', color:'#111827' }}/>
          <button onClick={() => send()} disabled={!input.trim()||loading}
            style={{ width:40, height:40, borderRadius:10, background:input.trim()&&!loading?'linear-gradient(135deg,#7C3AED,#EC4899)':'#E5E7EB', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:input.trim()&&!loading?'pointer':'not-allowed', transition:'all 0.2s' }}>
            <Send size={17} color={input.trim()&&!loading?'#fff':'#9CA3AF'}/>
          </button>
        </div>
        <p style={{ fontSize:11, color:'#9CA3AF', textAlign:'center', marginTop:8 }}>ЖИ кеңесші Claude API арқылы жұмыс істейді</p>
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}
