'use client';
import { useAuthStore } from '../../store/auth';
import { COURSES } from '../../data/courses';
import CourseCard from '../../components/CourseCard';
import Link from 'next/link';
import { BookOpen, Plus } from 'lucide-react';

export default function MyCourses() {
  const { user } = useAuthStore();
  if (!user) return null;
  const enrolled = COURSES.filter(c => user.coursesEnrolled.includes(c.id));

  return (
    <div style={{padding:'32px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,marginBottom:4}}>Менің курстарым</h1>
          <p style={{color:'#6a6f73',fontSize:14}}>{enrolled.length} курсқа тіркелгенсіз</p>
        </div>
        <Link href="/courses" style={{display:'flex',alignItems:'center',gap:8,background:'#a435f0',color:'#fff',padding:'10px 20px',borderRadius:4,fontWeight:700,fontSize:14}}>
          <Plus size={16}/> Курс қосу
        </Link>
      </div>

      {enrolled.length > 0 ? (
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {enrolled.map(c=><CourseCard key={c.id} course={c} enrolled/>)}
        </div>
      ) : (
        <div style={{textAlign:'center',padding:'80px 0',color:'#6a6f73'}}>
          <BookOpen size={56} style={{marginBottom:16,opacity:.3}}/>
          <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>Курс жоқ</div>
          <div style={{fontSize:14,marginBottom:24}}>Алғашқы курсыңызды қосыңыз</div>
          <Link href="/courses" style={{background:'#a435f0',color:'#fff',padding:'12px 28px',borderRadius:4,fontWeight:700,fontSize:15}}>Курстарды қарау</Link>
        </div>
      )}
    </div>
  );
}
