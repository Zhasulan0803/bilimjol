'use client';
import { useState } from 'react';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import { COURSES, SUBJECTS, GRADES } from '../data/courses';
import { Search, Filter } from 'lucide-react';

export default function CoursesPage() {
  const [grade, setGrade] = useState<number|null>(null);
  const [subject, setSubject] = useState<string|null>(null);
  const [search, setSearch] = useState('');
  const [free, setFree] = useState(false);

  const filtered = COURSES.filter(c => {
    if (grade && c.grade !== grade) return false;
    if (subject && c.subject !== subject) return false;
    if (free && !c.isFree) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <Header />
      <div style={{background:'#1c1d1f',padding:'40px 24px'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <h1 style={{fontSize:30,fontWeight:800,color:'#fff',marginBottom:8}}>Барлық курстар</h1>
          <p style={{color:'#9fa4a8',marginBottom:20}}>5–10 сыныпқа арналған {COURSES.length} курс</p>
          <div style={{position:'relative',maxWidth:500}}>
            <Search size={16} style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#6a6f73'}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Курс іздеу..."
              style={{width:'100%',height:44,paddingLeft:42,paddingRight:14,border:'none',borderRadius:4,fontSize:15,outline:'none',boxSizing:'border-box'}}/>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'32px 24px',display:'grid',gridTemplateColumns:'220px 1fr',gap:28}}>
        {/* Sidebar filters */}
        <aside>
          <div style={{background:'#fff',border:'1px solid #d1d7dc',borderRadius:4,padding:'20px',marginBottom:16}}>
            <h3 style={{fontWeight:800,fontSize:15,marginBottom:14,display:'flex',alignItems:'center',gap:8}}><Filter size={16}/>Сүзгілер</h3>
            <label style={{display:'flex',alignItems:'center',gap:8,fontSize:14,cursor:'pointer',marginBottom:16}}>
              <input type="checkbox" checked={free} onChange={e=>setFree(e.target.checked)} style={{cursor:'pointer'}}/>
              Тек тегін курстар
            </label>
            <div style={{fontWeight:700,fontSize:13,color:'#6a6f73',marginBottom:8,textTransform:'uppercase',letterSpacing:'.5px'}}>Сынып</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:20}}>
              {GRADES.map(g=>(
                <button key={g} onClick={()=>setGrade(grade===g?null:g)}
                  style={{padding:'4px 12px',borderRadius:20,border:`1px solid ${grade===g?'#a435f0':'#d1d7dc'}`,background:grade===g?'#a435f0':'transparent',color:grade===g?'#fff':'#1c1d1f',fontSize:12,fontWeight:600,cursor:'pointer'}}>
                  {g}
                </button>
              ))}
            </div>
            <div style={{fontWeight:700,fontSize:13,color:'#6a6f73',marginBottom:8,textTransform:'uppercase',letterSpacing:'.5px'}}>Пән</div>
            {SUBJECTS.map(s=>(
              <button key={s.id} onClick={()=>setSubject(subject===s.id?null:s.id)}
                style={{display:'flex',alignItems:'center',gap:8,width:'100%',padding:'8px 10px',borderRadius:4,border:'none',background:subject===s.id?s.color+'18':'transparent',color:subject===s.id?s.color:'#1c1d1f',fontSize:14,cursor:'pointer',marginBottom:2,textAlign:'left',fontFamily:'inherit'}}>
                <span style={{fontSize:18}}>{s.emoji}</span>{s.label}
              </button>
            ))}
          </div>
          {(grade||subject||free)&&(
            <button onClick={()=>{setGrade(null);setSubject(null);setFree(false);}}
              style={{width:'100%',padding:'8px',border:'1px solid #d1d7dc',borderRadius:4,background:'transparent',color:'#6a6f73',fontSize:14,cursor:'pointer',fontFamily:'inherit'}}>
              Сүзгілерді тазарту
            </button>
          )}
        </aside>

        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
            <span style={{fontSize:14,color:'#6a6f73'}}>{filtered.length} курс табылды</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {filtered.map(c=><CourseCard key={c.id} course={c}/>)}
          </div>
          {filtered.length===0&&(
            <div style={{textAlign:'center',padding:'60px 0',color:'#6a6f73'}}>
              <div style={{fontSize:48,marginBottom:12}}>🔍</div>
              <div style={{fontSize:16,fontWeight:700}}>Нәтиже табылмады</div>
              <div style={{fontSize:14,marginTop:4}}>Сүзгілерді өзгертіп көріңіз</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
