'use client';
import { Course } from '../types';
import Link from 'next/link';
import { Star, Users, Clock, Lock, BookOpen } from 'lucide-react';

interface Props { course: Course; enrolled?: boolean; }

export default function CourseCard({ course, enrolled }: Props) {
  return (
    <Link href={`/courses/${course.id}`} style={{ textDecoration:'none', display:'block' }}>
      <div style={{ border:'1.5px solid #F3F4F6', borderRadius:16, overflow:'hidden', background:'#fff', transition:'all 0.2s', cursor:'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 32px ${course.color}22`; e.currentTarget.style.borderColor=course.color+'44'; }}
        onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor='#F3F4F6'; }}>
        <div style={{ height:120, background:`linear-gradient(135deg,${course.color}15,${course.color}30)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:52, position:'relative' }}>
          {course.emoji}
          <div style={{ position:'absolute', top:10, left:10, display:'flex', gap:4, flexWrap:'wrap' }}>
            {course.tags.slice(0,1).map(t => (
              <span key={t} style={{ background:course.color, color:'#fff', fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:6 }}>{t}</span>
            ))}
          </div>
          {!course.isFree && (
            <div style={{ position:'absolute', top:10, right:10, background:'rgba(0,0,0,0.7)', color:'#fff', borderRadius:6, padding:'2px 7px', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', gap:3 }}>
              <Lock size={9}/> {course.requiredPlan.toUpperCase()}
            </div>
          )}
          {course.isFree && (
            <div style={{ position:'absolute', top:10, right:10, background:'#10B981', color:'#fff', borderRadius:6, padding:'2px 7px', fontSize:10, fontWeight:700 }}>ТЕГІН</div>
          )}
        </div>
        <div style={{ padding:'14px' }}>
          <div style={{ display:'flex', gap:6, marginBottom:6 }}>
            <span style={{ fontSize:11, fontWeight:700, background:course.color+'18', color:course.color, padding:'2px 7px', borderRadius:6 }}>{course.grade}-сынып</span>
          </div>
          <h3 style={{ fontSize:14, fontWeight:700, color:'#111827', marginBottom:4, lineHeight:1.3, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{course.title}</h3>
          <p style={{ fontSize:12, color:'#9CA3AF', marginBottom:8 }}>{course.instructor}</p>
          <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:8 }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#D97706' }}>{course.rating}</span>
            {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s<=Math.round(course.rating)?'#F59E0B':'none'} color={s<=Math.round(course.rating)?'#F59E0B':'#D1D5DB'}/>)}
            <span style={{ fontSize:11, color:'#9CA3AF' }}>({course.reviews})</span>
          </div>
          <div style={{ display:'flex', gap:10, fontSize:11, color:'#9CA3AF', marginBottom:10 }}>
            <span style={{ display:'flex', alignItems:'center', gap:3 }}><Clock size={11}/>{course.duration}</span>
            <span style={{ display:'flex', alignItems:'center', gap:3 }}><BookOpen size={11}/>{course.lessons} сабақ</span>
            <span style={{ display:'flex', alignItems:'center', gap:3 }}><Users size={11}/>{course.students.toLocaleString()}</span>
          </div>
          {enrolled && course.progress !== undefined ? (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:4 }}>
                <span style={{ color:'#6B7280' }}>Прогресс</span>
                <span style={{ fontWeight:700, color:course.color }}>{course.progress}%</span>
              </div>
              <div style={{ height:6, background:'#F3F4F6', borderRadius:3, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${course.progress}%`, background:`linear-gradient(90deg,${course.color},${course.color}99)`, borderRadius:3, transition:'width 0.5s' }}/>
              </div>
            </div>
          ) : (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:16, fontWeight:800, color:course.isFree?'#10B981':'#111827' }}>{course.isFree?'Тегін':`${course.price.toLocaleString()} ₸`}</span>
              <div style={{ background:course.color, color:'#fff', fontSize:12, fontWeight:600, padding:'4px 10px', borderRadius:8 }}>Бастау →</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
