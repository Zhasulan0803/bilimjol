'use client';
import { useState } from 'react';
import { COURSES, QUESTIONS } from '../../data/courses';
import { useAuthStore } from '../../store/auth';
import { CheckCircle, XCircle, Clock, Trophy, ArrowRight, RotateCcw } from 'lucide-react';

type Phase = 'select'|'test'|'result';

export default function Tests() {
  const { addPoints } = useAuthStore();
  const [phase, setPhase] = useState<Phase>('select');
  const [selectedCourse, setSelectedCourse] = useState<string|null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number|null>(null);
  const [showExpl, setShowExpl] = useState(false);
  const [startTime] = useState(Date.now());

  const coursesWithTests = COURSES.filter(c => QUESTIONS[c.id]);
  const questions = selectedCourse ? QUESTIONS[selectedCourse] || [] : [];
  const q = questions[current];
  const score = answers.filter((a, i) => a === questions[i]?.correct).length;

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExpl(true);
  };

  const next = () => {
    if (selected === null) return;
    setAnswers(prev => [...prev, selected]);
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExpl(false);
    } else {
      const pts = answers.filter((a,i)=>a===questions[i]?.correct).length * 10 + (selected===q?.correct?10:0);
      addPoints(pts);
      setPhase('result');
    }
  };

  const restart = () => {
    setPhase('select'); setSelectedCourse(null); setCurrent(0);
    setAnswers([]); setSelected(null); setShowExpl(false);
  };

  if (phase==='select') return (
    <div style={{ padding:'32px' }}>
      <h1 style={{ fontSize:24, fontWeight:900, marginBottom:4 }}>Тесттер 🎯</h1>
      <p style={{ color:'#6B7280', marginBottom:28 }}>Білімді тексер, ұпай жина!</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {coursesWithTests.map(c => (
          <button key={c.id} onClick={() => { setSelectedCourse(c.id); setPhase('test'); }}
            style={{ background:'#fff', border:`2px solid ${c.color}33`, borderRadius:16, padding:'20px', textAlign:'left', cursor:'pointer', transition:'all 0.2s', fontFamily:'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=c.color; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${c.color}22`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=c.color+'33'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
            <div style={{ fontSize:36, marginBottom:10 }}>{c.emoji}</div>
            <div style={{ fontWeight:800, fontSize:16, color:'#111827', marginBottom:4 }}>{c.title}</div>
            <div style={{ fontSize:13, color:'#6B7280', marginBottom:12 }}>{c.grade}-сынып · {QUESTIONS[c.id].length} сұрақ</div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ background:c.color, color:'#fff', fontSize:12, fontWeight:700, padding:'4px 12px', borderRadius:8 }}>Бастау →</div>
              <div style={{ fontSize:12, color:'#6B7280' }}>~{QUESTIONS[c.id].length * 2} мин</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  if (phase==='test' && q) {
    const course = COURSES.find(c=>c.id===selectedCourse);
    const progress = Math.round((current/questions.length)*100);
    return (
      <div style={{ padding:'32px', maxWidth:700, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#7C3AED' }}>{course?.emoji} {course?.title}</div>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:14, color:'#6B7280' }}>
            <Clock size={14}/> Сұрақ {current+1}/{questions.length}
          </div>
        </div>
        <div style={{ height:8, background:'#F3F4F6', borderRadius:4, marginBottom:28, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${progress}%`, background:`linear-gradient(90deg,${course?.color},${course?.color}88)`, borderRadius:4, transition:'width 0.4s' }}/>
        </div>
        <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:20, padding:'28px', marginBottom:16, boxShadow:'0 4px 16px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:12 }}>Сұрақ {current+1}</div>
          <h2 style={{ fontSize:18, fontWeight:800, color:'#111827', lineHeight:1.4, marginBottom:24 }}>{q.text}</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {q.options.map((opt: string, i: number) => {
              let bg = '#F9FAFB', border = '1.5px solid #E5E7EB', color = '#374151';
              if (selected !== null) {
                if (i === q.correct) { bg='#ECFDF5'; border='2px solid #10B981'; color='#065F46'; }
                else if (i === selected && selected !== q.correct) { bg='#FEF2F2'; border='2px solid #EF4444'; color='#991B1B'; }
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)}
                  style={{ background:bg, border, borderRadius:12, padding:'14px 16px', textAlign:'left', cursor:selected!==null?'default':'pointer', color, fontSize:15, fontWeight:500, display:'flex', alignItems:'center', gap:10, transition:'all 0.2s', fontFamily:'inherit' }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:selected!==null&&i===q.correct?'#10B981':selected===i&&selected!==q.correct?'#EF4444':'#E5E7EB', color:selected!==null?(i===q.correct||selected===i)?'#fff':'#6B7280':'#6B7280', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, flexShrink:0 }}>
                    {selected!==null&&i===q.correct?<CheckCircle size={16}/>:selected===i&&selected!==q.correct?<XCircle size={16}/>:['A','B','C','D'][i]}
                  </div>
                  {opt}
                </button>
              );
            })}
          </div>
          {showExpl && (
            <div style={{ marginTop:16, padding:'14px 16px', background:'#F5F3FF', border:'1.5px solid #DDD6FE', borderRadius:12 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#7C3AED', marginBottom:4 }}>💡 Түсіндірме</div>
              <div style={{ fontSize:14, color:'#374151' }}>{q.explanation}</div>
            </div>
          )}
        </div>
        {selected !== null && (
          <button onClick={next} style={{ width:'100%', padding:'14px', background:'linear-gradient(135deg,#7C3AED,#EC4899)', border:'none', borderRadius:12, color:'#fff', fontWeight:800, fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'inherit' }}>
            {current+1<questions.length?'Келесі сұрақ':'Нәтижені көру'} <ArrowRight size={18}/>
          </button>
        )}
      </div>
    );
  }

  if (phase==='result') {
    const finalScore = answers.filter((a,i)=>a===questions[i]?.correct).length;
    const pct = Math.round(finalScore/questions.length*100);
    const course = COURSES.find(c=>c.id===selectedCourse);
    return (
      <div style={{ padding:'32px', maxWidth:600, margin:'0 auto', textAlign:'center' }}>
        <div style={{ background:'linear-gradient(135deg,#7C3AED,#EC4899)', borderRadius:24, padding:'40px', marginBottom:24, color:'#fff' }}>
          <div style={{ fontSize:64, marginBottom:16 }}>{pct>=80?'🏆':pct>=60?'⭐':'💪'}</div>
          <div style={{ fontSize:32, fontWeight:900, marginBottom:8 }}>{pct}%</div>
          <div style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>{pct>=80?'Керемет нәтиже!':pct>=60?'Жақсы!':'Тағы жаттық!'}</div>
          <div style={{ fontSize:14, color:'#E9D5FF' }}>{finalScore}/{questions.length} дұрыс жауап · +{finalScore*10} XP</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
          <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'16px' }}>
            <div style={{ fontSize:24, fontWeight:900, color:'#111827' }}>{finalScore}/{questions.length}</div>
            <div style={{ fontSize:13, color:'#6B7280' }}>Дұрыс жауап</div>
          </div>
          <div style={{ background:'#fff', border:'1.5px solid #F3F4F6', borderRadius:16, padding:'16px' }}>
            <div style={{ fontSize:24, fontWeight:900, color:'#7C3AED' }}>+{finalScore*10}</div>
            <div style={{ fontSize:13, color:'#6B7280' }}>Ұпай жинадыңыз</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={restart} style={{ flex:1, padding:'14px', background:'#F5F3FF', border:'2px solid #7C3AED', borderRadius:12, color:'#7C3AED', fontWeight:700, fontSize:15, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'inherit' }}>
            <RotateCcw size={16}/> Қайтадан
          </button>
          <button onClick={restart} style={{ flex:1, padding:'14px', background:'linear-gradient(135deg,#7C3AED,#EC4899)', border:'none', borderRadius:12, color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:'inherit' }}>
            Басқа тест →
          </button>
        </div>
      </div>
    );
  }
  return null;
}
