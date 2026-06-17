import { Course } from '../types';

export const COURSES: Course[] = [
  { id:'1', title:'Алгебра негіздері', subject:'math', grade:7, lessons:24, duration:'6 сағ', rating:4.9, reviews:312, students:1560, emoji:'🔢', color:'#7C3AED', instructor:'Нұрлан Әбенов', price:0, isFree:true, requiredPlan:'free', description:'Теңдеулер, теңсіздіктер және өрнектер.', progress:65, tags:['Базалық','Популярлы'] },
  { id:'2', title:'Геометрия', subject:'math', grade:8, lessons:28, duration:'7 сағ', rating:4.8, reviews:245, students:1120, emoji:'📐', color:'#3B82F6', instructor:'Зарина Досова', price:2900, isFree:false, requiredPlan:'basic', description:'Геометриялық фигуралар мен теоремалар.', progress:30, tags:['Орта','Теорема'] },
  { id:'3', title:'Квадрат теңдеулер', subject:'math', grade:8, lessons:26, duration:'7 сағ', rating:4.8, reviews:289, students:1320, emoji:'📊', color:'#EC4899', instructor:'Бекзат Омаров', price:2900, isFree:false, requiredPlan:'basic', description:'Квадрат теңдеулерді шешу тәсілдері.', progress:10, tags:['Маңызды','Тест бар'] },
  { id:'4', title:'Тригонометрия', subject:'math', grade:9, lessons:30, duration:'8 сағ', rating:4.7, reviews:198, students:890, emoji:'〽️', color:'#F97316', instructor:'Бекзат Омаров', price:4900, isFree:false, requiredPlan:'premium', description:'Тригонометриялық функциялар.', tags:['Күрделі','ҰБТ'] },
  { id:'5', title:'Механика', subject:'physics', grade:9, lessons:28, duration:'7 сағ', rating:4.6, reviews:176, students:780, emoji:'⚡', color:'#F59E0B', instructor:'Арман Серіков', price:4900, isFree:false, requiredPlan:'premium', description:'Кинематика, динамика.', tags:['Физика','Формулалар'] },
  { id:'6', title:'Электромагнетизм', subject:'physics', grade:10, lessons:32, duration:'9 сағ', rating:4.8, reviews:143, students:650, emoji:'🔌', color:'#06B6D4', instructor:'Арман Серіков', price:7900, isFree:false, requiredPlan:'vip', description:'Электр өрісі, индукция.', tags:['VIP','10-сынып'] },
  { id:'7', title:'Химиялық реакциялар', subject:'chemistry', grade:8, lessons:20, duration:'5 сағ', rating:4.5, reviews:134, students:720, emoji:'🧪', color:'#10B981', instructor:'Гүлнәр Жақсыбекова', price:2900, isFree:false, requiredPlan:'basic', description:'Химиялық теңдеулер.', tags:['Химия','Практика'] },
  { id:'8', title:'Жасушалар биологиясы', subject:'biology', grade:7, lessons:16, duration:'4 сағ', rating:4.4, reviews:112, students:680, emoji:'🔬', color:'#10B981', instructor:'Айнұр Бейсенова', price:0, isFree:true, requiredPlan:'free', description:'Жасуша құрылысы.', tags:['Тегін','Биология'] },
  { id:'9', title:'Қазақ тілі: сөз таптары', subject:'kazakh', grade:6, lessons:14, duration:'3 сағ', rating:4.6, reviews:198, students:1890, emoji:'📚', color:'#8B5CF6', instructor:'Мадина Қасымова', price:0, isFree:true, requiredPlan:'free', description:'Грамматика негіздері.', tags:['Тегін','Грамматика'] },
  { id:'10', title:'Қазақстан тарихы', subject:'history', grade:8, lessons:22, duration:'5 сағ', rating:4.5, reviews:167, students:1120, emoji:'🏛️', color:'#F97316', instructor:'Ерлан Нұрланов', price:2900, isFree:false, requiredPlan:'basic', description:'Тарихи оқиғалар.', tags:['Тарих','ҰБТ'] },
  { id:'11', title:'Ағылшын тілі A2', subject:'english', grade:6, lessons:36, duration:'10 сағ', rating:4.9, reviews:421, students:2100, emoji:'🌍', color:'#3B82F6', instructor:'Лаура Ким', price:4900, isFree:false, requiredPlan:'premium', description:'Grammar, vocabulary, speaking.', tags:['Популярлы','Сертификат'] },
  { id:'12', title:'Органикалық химия', subject:'chemistry', grade:10, lessons:34, duration:'10 сағ', rating:4.7, reviews:167, students:590, emoji:'⚗️', color:'#EC4899', instructor:'Гүлнәр Жақсыбекова', price:7900, isFree:false, requiredPlan:'vip', description:'Органикалық қосылыстар.', tags:['VIP','10-сынып'] },
];

export const SUBJECTS = [
  { id:'math', label:'Математика', emoji:'🔢', color:'#7C3AED', bg:'#F5F3FF' },
  { id:'physics', label:'Физика', emoji:'⚡', color:'#F59E0B', bg:'#FFFBEB' },
  { id:'chemistry', label:'Химия', emoji:'🧪', color:'#10B981', bg:'#ECFDF5' },
  { id:'biology', label:'Биология', emoji:'🔬', color:'#EF4444', bg:'#FEF2F2' },
  { id:'kazakh', label:'Қазақ тілі', emoji:'📚', color:'#8B5CF6', bg:'#F5F3FF' },
  { id:'history', label:'Тарих', emoji:'🏛️', color:'#F97316', bg:'#FFF7ED' },
  { id:'english', label:'Ағылшын', emoji:'🌍', color:'#3B82F6', bg:'#EFF6FF' },
];

export const GRADES = [5,6,7,8,9,10];

export const QUESTIONS: Record<string, any[]> = {
  '1': [
    { id:'q1', text:'2x + 6 = 14 теңдеуін шешіңіз', options:['x = 3','x = 4','x = 5','x = 6'], correct:1, explanation:'2x = 14 - 6 = 8, x = 4', points:10 },
    { id:'q2', text:'3x - 9 = 0 теңдеуін шешіңіз', options:['x = 2','x = 3','x = 4','x = 5'], correct:1, explanation:'3x = 9, x = 3', points:10 },
    { id:'q3', text:'x² = 25 теңдеуінің шешімі', options:['x = 5','x = ±5','x = -5','x = 25'], correct:1, explanation:'x = +5 немесе x = -5', points:15 },
    { id:'q4', text:'5x + 10 = 35 болса, x = ?', options:['x = 4','x = 5','x = 6','x = 7'], correct:1, explanation:'5x = 25, x = 5', points:10 },
    { id:'q5', text:'Теңдеу: 4(x - 2) = 12, x = ?', options:['x = 5','x = 4','x = 3','x = 6'], correct:0, explanation:'4x - 8 = 12, 4x = 20, x = 5', points:15 },
  ],
  '3': [
    { id:'q1', text:'x² - 5x + 6 = 0 теңдеуінің түбірлері', options:['x=1, x=6','x=2, x=3','x=-2, x=-3','x=1, x=5'], correct:1, explanation:'(x-2)(x-3)=0, x=2 немесе x=3', points:20 },
    { id:'q2', text:'Дискриминант формуласы: D = ?', options:['b²-4ac','b²+4ac','4ac-b²','2ac-b'], correct:0, explanation:'D = b² - 4ac', points:10 },
  ],
};
