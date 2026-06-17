import { PlanInfo } from '../types';

export const PLANS: PlanInfo[] = [
  { id:'free', name:'Free', nameKz:'Тегін', price:0, period:'ай', color:'#6B7280', bg:'#F9FAFB', features:['3 тегін курс','Базалық тесттер','Прогресс бақылау','Қоғамдық форум'] },
  { id:'basic', name:'Basic', nameKz:'Базалық', price:2900, period:'ай', color:'#10B981', bg:'#ECFDF5', features:['Барлық тегін курстар','5-7 сынып курстары','Тест жауаптары','Email қолдау','Прогресс бақылау'] },
  { id:'premium', name:'Premium', nameKz:'Премиум', price:4900, period:'ай', color:'#7C3AED', bg:'#F5F3FF', popular:true, features:['Basic барлығы','8-9 сынып курстары','Олимпиада тапсырмалары','ЖИ-кеңесші','Сертификат','Басымдықты қолдау'] },
  { id:'vip', name:'VIP', nameKz:'ВИП', price:7900, period:'ай', color:'#F97316', bg:'#FFF7ED', features:['Premium барлығы','10-сынып курстары','Жеке мұғаліммен сессия','Жеке оқу жоспары','Ата-ана есебі','24/7 қолдау','ҰБТ дайындық'] },
];
