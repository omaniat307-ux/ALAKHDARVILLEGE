import React, { useState, useEffect } from 'react';

export default function GreenVillageSurvey() {
  const [step, setStep] = useState(1);
  const [adminCode, setAdminCode] = useState('');
  const [answers, setAnswers] = useState({
    name: '', phone: '', priorities: [], futureVision: [], urgentProjects: [], urgentSite1: '',
    urgentSite2: '', urgentSite3: '', sitesToDevelop: [], falajProposals: [], mustahActivities: [],
    futureProjects: [], museumContents: [], hasHistoricalItems: '', historicalDetails: '',
    participationTypes: [], wantToJoinTeam: '', preferredTeams: [], impactProject: '', ideaName: '',
    ideaDesc: '', ideaLocation: '', ideaBenefit: '', mainChallenges: [], preservationIdea: '', additionalNotes: ''
  });
  
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

  // ⚠️ استبدل هذا الرابط بالرابط الجديد الخاص بك بعد النشر
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyyNB8ULfbGX9ikoSN0m1VaXqh3stQfueTEk6UXkBaienpj4eJdDO3E2NOPqV_X6tEBNA/exec";

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [step]);

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxToggle = (key, item, maxLimit) => {
    const currentList = answers[key] || [];
    if (currentList.includes(item)) {
      updateAnswer(key, currentList.filter(i => i !== item));
    } else {
      if (currentList.length < maxLimit) {
        updateAnswer(key, [...currentList, item]);
      } else {
        alert(`عذراً، الحد الأقصى المسموح به هو ${maxLimit} عناصر.`);
      }
    }
  };

  const validateStep = () => {
    switch (step) {
      case 2:
        if (answers.priorities.length === 0) { alert("يرجى اختيار الجوانب التي ينبغي أن يركز عليها المشروع (س 3)."); return false; }
        if (answers.futureVision.length === 0) { alert("يرجى اختيار الصورة المستقبلية للقرية (س 4)."); return false; }
        break;
      case 3:
        if (answers.urgentProjects.length === 0) { alert("يرجى اختيار مشروعات التحسين السريع (س 5)."); return false; }
        break;
      case 4:
        if (answers.sitesToDevelop.length === 0) { alert("يرجى اختيار المواقع التي ينبغي تطويرها (س 7)."); return false; }
        break;
      case 5:
        if (answers.falajProposals.length === 0) { alert("يرجى اختيار مقترحات تطوير الفلج والسككة (س 8)."); return false; }
        break;
      case 6:
        if (answers.mustahActivities.length === 0) { alert("يرجى اختيار أنشطة المصطاح والساحات العامة (س 9)."); return false; }
        break;
      case 7:
        if (answers.futureProjects.length === 0) { alert("يرجى اختيار المشروعات المستقبلية (س 10)."); return false; }
        if (answers.museumContents.length === 0) { alert("يرجى اختيار محتويات متحف القرية (س 11)."); return false; }
        if (!answers.hasHistoricalItems) { alert("يرجى الإجابة على السؤال رقم 12 (المقتنيات التاريخية)."); return false; }
        break;
      case 8:
        if (answers.participationTypes.length === 0) { alert("يرجى اختيار نوع المشاركة المجتمعية (س 13)."); return false; }
        if (!answers.wantToJoinTeam) { alert("يرجى الإجابة على السؤال رقم 14 (الانضمام لفرق المشروع)."); return false; }
        if (answers.preferredTeams.length === 0) { alert("يرجى اختيار الفريق المفضل للمشاركة (س 15)."); return false; }
        break;
      case 9:
        if (answers.mainChallenges.length === 0) { alert("يرجى اختيار أبرز تحديات المشروع (س 18)."); return false; }
        break;
      default:
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(answers)
      });
      setStep(10);
    } catch (error) {
      console.error("خطأ في الإرسال:", error);
      alert("حدث خطأ أثناء الإرسال، تأكد من الاتصال بالإنترنت و جرب مرة أخرى.");
      setStep(10);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogin = async () => {
    if (adminCode === 'AsA307') {
      setIsFetchingData(true);
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "GET",
          redirect: "follow"
        });
        
        const rawText = await response.text();
        
        let data;
        try {
          data = JSON.parse(rawText);
        } catch (parseError) {
          console.error("البيانات المستلمة ليست JSON صالح:", rawText);
          alert("الرابط لا يُرجع بيانات صحيحة. يرجى التأكد من إعدادات دالة doGet في جوجل شيت.");
          setIsFetchingData(false);
          return;
        }

        if (data.error) {
          console.error("خطأ من جوجل شيت:", data.error);
          alert("حدث خطأ داخل جوجل شيت: " + data.error);
          setIsFetchingData(false);
          return;
        }
        
        const arrayFields = ['priorities', 'futureVision', 'urgentProjects', 'sitesToDevelop', 'falajProposals', 'mustahActivities', 'futureProjects', 'museumContents', 'participationTypes', 'preferredTeams', 'mainChallenges'];
        
        const formattedData = data.map(row => {
          const newRow = { ...row };
          arrayFields.forEach(field => {
            if (typeof newRow[field] === 'string') {
              newRow[field] = newRow[field].split(',').map(s => s.trim()).filter(Boolean);
            }
          });
          return newRow;
        });

        setAllSubmissions(formattedData);
        setStep(99);
      } catch (error) {
        console.error("خطأ في الاتصال:", error);
        alert("فشل الاتصال بجوجل شيت. تحقق من الرابط أو اتصال الإنترنت أو سياسة الحماية في المتصفح.");
      } finally {
        setIsFetchingData(false);
      }
    } else {
      alert("الرمز غير صحيح.");
    }
  };

  const getStatCounts = (key) => {
    const counts = {};
    let totalVotes = 0;
    allSubmissions.forEach(sub => {
      const val = sub[key];
      if (Array.isArray(val)) {
        val.forEach(item => {
          if (item) {
            counts[item] = (counts[item] || 0) + 1;
            totalVotes++;
          }
        });
      } else if (val) {
        counts[val] = (counts[val] || 0) + 1;
        totalVotes++;
      }
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return { sorted, totalVotes };
  };

  const exportToCSV = () => {
    if (allSubmissions.length === 0) { alert("لا توجد بيانات لتصديرها."); return; }
    const headersMap = {
      name: 'الاسم', phone: 'الهاتف', priorities: 'أولويات المشروع', futureVision: 'الصورة المستقبلية',
      urgentProjects: 'مشروعات التحسين السريع', urgentSite1: 'موقع عاجل 1', urgentSite2: 'موقع عاجل 2', urgentSite3: 'موقع عاجل 3',
      sitesToDevelop: 'المواقع المراد تطويرها', falajProposals: 'مقترحات الفلج والسكة', mustahActivities: 'أنشطة المصطاح والساحات',
      futureProjects: 'المشروعات المستقبلية', museumContents: 'محتويات المتحف', hasHistoricalItems: 'المساهمة بمقتنيات',
      historicalDetails: 'تفاصيل المقتنيات', participationTypes: 'نوع المشاركة', wantToJoinTeam: 'الرغبة بالانضمام لفرق',
      preferredTeams: 'الفرق المفضلة', impactProject: 'المشروع الأهم', ideaName: 'اسم الفكرة', ideaDesc: 'وصف الفكرة',
      ideaLocation: 'موقع الفكرة', ideaBenefit: 'فائدة الفكرة', mainChallenges: 'أبرز التحديات', preservationIdea: 'مقترح استدامة المشروعات',
      additionalNotes: 'ملاحظات إضافية'
    };
    const keys = Object.keys(answers);
    let csvContent = keys.map(k => `"${headersMap[k] || k}"`).join(",") + "\n";
    allSubmissions.forEach(sub => {
      const row = keys.map(key => {
        let val = sub[key];
        if (Array.isArray(val)) val = val.join(" - ");
        if (val) return `"${String(val).replace(/"/g, '""')}"`;
        return '""';
      });
      csvContent += row.join(",") + "\n";
    });
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `نتائج_استبانة_الأخضر_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTopItem = (key) => {
    const { sorted } = getStatCounts(key);
    return sorted.length > 0 ? sorted[0][0] : "قيد الانتظار";
  };

  const getMuseumFeasibility = () => {
    if (allSubmissions.length === 0) return 0;
    const wantsMuseum = allSubmissions.filter(s => s.futureProjects?.includes("إنشاء متحف خاص بالقرية"));
    if (wantsMuseum.length === 0) return 0;
    const hasItems = wantsMuseum.filter(s => s.hasHistoricalItems?.includes("نعم"));
    return Math.round((hasItems.length / wantsMuseum.length) * 100);
  };

  const getHRGap = () => {
    if (allSubmissions.length === 0) return { ratio: 0, text: "لا توجد بيانات" };
    const volunteers = allSubmissions.filter(s => s.wantToJoinTeam && s.wantToJoinTeam.includes("نعم")).length;
    const ratio = Math.round((volunteers / allSubmissions.length) * 100);
    return { ratio, count: volunteers };
  };

  const getTopChallengeMitigation = () => {
    const topChallenge = getTopItem('mainChallenges');
    let mitigation = "يتطلب دراسة مستفيضة وحلول إبداعية.";
    if (topChallenge.includes("تمويل")) mitigation = "البدء الفوري بتشكيل فريق لجمع الدعم، والتواصل مع الداعمين والشركات قبل إطلاق أي مشروع مكلف.";
    if (topChallenge.includes("موافقات")) mitigation = "تشكيل فريق علاقات عامة لتخليص المعاملات الحكومية مبكراً لتجنب تعطل العمل.";
    if (topChallenge.includes("صيانة")) mitigation = "فرض رسوم رمزية أو استقطاع جزء من الميزانية لإنشاء (صندوق صيانة) مستدام.";
    if (topChallenge.includes("مشاركة")) mitigation = "تكثيف الحملات الإعلامية داخل القرية وتكريم المبادرين الأوائل لتحفيز البقية.";
    return { challenge: topChallenge, mitigation };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 text-gray-800 font-sans p-4 md:p-8" dir="rtl">
      <div className={`mx-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 ${step >= 99 ? 'max-w-6xl' : 'max-w-3xl'}`}>
        
        {step < 99 && (
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 p-6 md:p-8 text-white text-center relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600/50 mb-3 shadow-inner">
              <i data-lucide="trees" className="w-6 h-6 text-emerald-200"></i>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>استبانة أهالي قرية الأخضر</h1>
            <p className="text-emerald-100 text-sm md:text-base font-medium" style={{ fontFamily: 'Cairo, sans-serif' }}>معًا نصنع قرية أجمل ونحفظ هويتها</p>
            {step < 10 && (
              <div className="w-full bg-emerald-900/40 h-2.5 rounded-full mt-6 overflow-hidden p-0.5">
                <div className="bg-amber-400 h-full transition-all duration-500 rounded-full shadow-sm" style={{ width: `${(step / 9) * 100}%` }}></div>
              </div>
            )}
          </div>
        )}

        <div className={`p-6 ${step >= 99 ? 'md:p-8' : 'md:p-10'} font-sans`}>

          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center gap-2 w-full">
                  <i data-lucide="lock" className="w-4 h-4 text-emerald-700 shrink-0"></i>
                  <input type="password" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} placeholder="أدخل رمز لوحة الإحصائيات (للمشرفين)..." className="w-full p-2.5 text-sm rounded-xl border border-gray-300 bg-white outline-none focus:border-emerald-600 font-sans" />
                </div>
                <button onClick={handleAdminLogin} disabled={isFetchingData} className="w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shrink-0 font-sans flex justify-center items-center gap-2 disabled:opacity-70">
                  {isFetchingData ? (
                    <><i data-lucide="loader-2" className="w-4 h-4 animate-spin"></i> جاري التحميل...</>
                  ) : (
                    "دخول التقارير"
                  )}
                </button>
              </div>
              <div className="bg-emerald-50 border-r-4 border-emerald-600 p-4 rounded-xl text-sm text-emerald-900 leading-relaxed flex items-start gap-3">
                <i data-lucide="info" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"></i>
                <p>انطلاقًا من أهمية مشاركة أهالي قرية الأخضر في رسم مستقبل قريتهم، ندعوكم للمساهمة بآرائكم وأفكاركم لتطوير وتجميل القرية.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><i data-lucide="user" className="w-4 h-4 text-emerald-600"></i> 1. الاسم (اختياري)</label>
                  <input type="text" value={answers.name} onChange={(e) => updateAnswer('name', e.target.value)} placeholder="ادخل اسمك..." className="w-full p-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50 font-sans" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><i data-lucide="phone" className="w-4 h-4 text-emerald-600"></i> 2. رقم الهاتف (اختياري)</label>
                  <input type="text" value={answers.phone} onChange={(e) => updateAnswer('phone', e.target.value)} placeholder="ادخل رقم هاتفك..." className="w-full p-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50 font-sans" />
                </div>
              </div>
              <button onClick={nextStep} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-sans">
                <span>التالي: أولويات تطوير القرية</span> <i data-lucide="arrow-left" className="w-5 h-5"></i>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100">
                <h3 className="text-base font-bold text-emerald-900">3. ما أهم الجوانب التي ينبغي أن يركز عليها المشروع؟ </h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 4 ({answers.priorities.length}/4)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["تحسين المظهر العام للقرية", "المحافظة على الهوية التراثية والعمرانية", "تطوير المرافق والخدمات العامة", "إبراز المكانة العلمية والثقافية للقرية", "تنشيط الحركة السياحية", "دعم المشروعات الصغيرة للأهالي", "تطوير المواقع التاريخية", "تحسين الممرات والإنارة والتشجير", "المحافظة على الفلج والمزارع والبيئة الطبيعية", "تنظيم الفعاليات الاجتماعية والثقافية"].map((item, idx) => {
                  const isSelected = answers.priorities.includes(item);
                  return (
                    <div key={idx} onClick={() => handleCheckboxToggle('priorities', item, 4)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                      <span className="text-sm font-medium">{item}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100 mb-3">
                  <h3 className="text-base font-bold text-emerald-900">4. ما الصورة التي تتمنى أن تكون عليها قرية الأخضر مستقبلًا؟ </h3>
                  <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 3 ({answers.futureVision.length}/3)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["قرية جميلة ومنظمة ونظيفة", "وجهة سياحية وتراثية", "قرية محافظة على هويتها وأصالتها", "بيئة جاذبة للمشروعات الشبابية والمجتمعية", "مركز للفعاليات الثقافية والاجتماعية", "نموذجًا للقرى العُمانية المتطورة والمستدامة"].map((item, idx) => {
                    const isSelected = answers.futureVision.includes(item);
                    return (
                      <div key={idx} onClick={() => handleCheckboxToggle('futureVision', item, 3)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                        <span className="text-sm font-medium">{item}</span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(1)} className="w-1/3 bg-gray-100 font-bold py-3.5 rounded-xl">السابق</button>
                <button onClick={nextStep} className="w-2/3 bg-emerald-700 text-white font-bold py-3.5 rounded-xl">التالي</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100">
                <h3 className="text-base font-bold text-emerald-900">5. ما أهم المشروعات التي ينبغي البدء بها؟ </h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 4 ({answers.urgentProjects.length}/4)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["صبغ وتحسين واجهات البيوت القديمة", "تركيب الإنارة بالطاقة الشمسية", "تحسين إنارة الطرق والممرات", "تنظيف وتأهيل الساحات والمواقع العامة", "رصف وتحسين الممرات الداخلية", "التشجير وزراعة النباتات المحلية", "تجميل مداخل القرية", "تركيب لوحات إرشادية وتعريفية", "توفير الجلسات وأماكن الاستراحة", "إزالة المشوهات البصرية", "تحسين مواقف المركبات", "تجميل مواقع الحاويات والنفايات"].map((item, idx) => {
                  const isSelected = answers.urgentProjects.includes(item);
                  return (
                    <div key={idx} onClick={() => handleCheckboxToggle('urgentProjects', item, 4)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                      <span className="text-sm font-medium">{item}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-4 space-y-3">
                <h3 className="text-base font-bold text-emerald-900">6. ما المواقع التي ترى أنها تحتاج إلى تدخل عاجل؟ </h3>
                <input type="text" value={answers.urgentSite1} onChange={(e) => updateAnswer('urgentSite1', e.target.value)} placeholder="الموقع الأول..." className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-sans" />
                <input type="text" value={answers.urgentSite2} onChange={(e) => updateAnswer('urgentSite2', e.target.value)} placeholder="الموقع الثاني..." className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-sans" />
                <input type="text" value={answers.urgentSite3} onChange={(e) => updateAnswer('urgentSite3', e.target.value)} placeholder="الموقع الثالث..." className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-sans" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(2)} className="w-1/3 bg-gray-100 font-bold py-3.5 rounded-xl">السابق</button>
                <button onClick={nextStep} className="w-2/3 bg-emerald-700 text-white font-bold py-3.5 rounded-xl">التالي</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100">
                <h3 className="text-base font-bold text-emerald-900">7. ما أهم المواقع التي ينبغي تطويرها؟ </h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 3 ({answers.sitesToDevelop.length}/3)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["منطقة الفلج", "حافة الفلج", "سكة القرية", "القلعة", "المصطاح الحدري", "ميدان الرماية التقليدية", "المساجد والمباني القديمة", "مداخل القرية", "المزارع والنخيل", "الساحات العامة"].map((item, idx) => {
                  const isSelected = answers.sitesToDevelop.includes(item);
                  return (
                    <div key={idx} onClick={() => handleCheckboxToggle('sitesToDevelop', item, 3)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                      <span className="text-sm font-medium">{item}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(3)} className="w-1/3 bg-gray-100 font-bold py-3.5 rounded-xl">السابق</button>
                <button onClick={nextStep} className="w-2/3 bg-emerald-700 text-white font-bold py-3.5 rounded-xl">التالي</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100">
                <h3 className="text-base font-bold text-emerald-900">8. ما أهم المقترحات لتطوير منطقة الفلج وسكة القرية؟ </h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 4 ({answers.falajProposals.length}/4)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["تنظيف وتأهيل مسار الفلج", "إنشاء ممشى آمن", "تحسين أرضية سكة القرية", "تركيب إنارة تراثية أو شمسية", "إضافة جلسات واستراحات", "التشجير وزراعة النباتات المحلية", "ترميم الواجهات المطلة على السكة", "وضع لوحات تحكي تاريخ القرية", "إنشاء نقاط جميلة للتصوير", "تخصيص مواقع للحرف والمنتجات المحلية", "إنشاء أكشاك أو مقاهٍ صغيرة", "المحافظة على طبيعة المكان وتقليل الإنشاءات"].map((item, idx) => {
                  const isSelected = answers.falajProposals.includes(item);
                  return (
                    <div key={idx} onClick={() => handleCheckboxToggle('falajProposals', item, 4)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                      <span className="text-sm font-medium">{item}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(4)} className="w-1/3 bg-gray-100 font-bold py-3.5 rounded-xl">السابق</button>
                <button onClick={nextStep} className="w-2/3 bg-emerald-700 text-white font-bold py-3.5 rounded-xl">التالي</button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100">
                <h3 className="text-base font-bold text-emerald-900">9. أنشطة المصطاح والساحات العامة؟ </h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 3 ({answers.mustahActivities.length}/3)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["ملتقيات الأهالي", "الأمسيات الثقافية والشعرية", "الأسواق الموسمية", "معارض المنتجات المحلية", "فعاليات الأطفال والأسر", "عروض الحرف التقليدية", "المناسبات الوطنية والاجتماعية", "الفعاليات الشبابية والرياضية", "المهرجانات والاحتفالات التراثية"].map((item, idx) => {
                  const isSelected = answers.mustahActivities.includes(item);
                  return (
                    <div key={idx} onClick={() => handleCheckboxToggle('mustahActivities', item, 3)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                      <span className="text-sm font-medium">{item}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(5)} className="w-1/3 bg-gray-100 font-bold py-3.5 rounded-xl">السابق</button>
                <button onClick={nextStep} className="w-2/3 bg-emerald-700 text-white font-bold py-3.5 rounded-xl">التالي</button>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100">
                <h3 className="text-base font-bold text-emerald-900">10. المشروعات المستقبلية؟ </h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 4 ({answers.futureProjects.length}/4)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["إنشاء متحف خاص بالقرية", "إنشاء مقهى سياحي بطابع تراثي", "إقامة أكشاك للمنتجات المحلية", "إنشاء سوق للحرف والصناعات التقليدية", "إقامة نُزل تراثي صغير", "تنظيم مسارات سياحية داخل القرية", "إنشاء مركز لاستقبال الزوار", "تنظيم مهرجان سنوي للقرية", "دعم مشروعات الأسر المنتجة"].map((item, idx) => {
                  const isSelected = answers.futureProjects.includes(item);
                  return (
                    <div key={idx} onClick={() => handleCheckboxToggle('futureProjects', item, 4)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                      <span className="text-sm font-medium">{item}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100 mb-3">
                  <h3 className="text-base font-bold text-emerald-900">11. محتويات متحف القرية؟ </h3>
                  <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 4 ({answers.museumContents.length}/4)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["المخطوطات والوثائق القديمة", "الصور التاريخية للقرية وأهاليها", "تاريخ العلماء والشخصيات البارزة", "الأدوات الزراعية القديمة", "تاريخ الفلج والزراعة", "صناعة النسيج", "الحرف والصناعات التقليدية", "الملابس والمقتنيات القديمة", "القصص والروايات الشعبية", "تسجيلات كبار السن", "ركن تفاعلي للأطفال والزوار"].map((item, idx) => {
                    const isSelected = answers.museumContents.includes(item);
                    return (
                      <div key={idx} onClick={() => handleCheckboxToggle('museumContents', item, 4)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                        <span className="text-sm font-medium">{item}</span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                <h3 className="text-base font-bold text-emerald-900">12. مساهمة بصور أو وثائق تاريخية؟ </h3>
                <div className="space-y-2">
                  {["نعم، ويمكنني المساهمة بها.", "نعم، وأرغب في التواصل لمعرفة آلية التوثيق.", "لا يوجد لدي حاليًا."].map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                      <input type="radio" name="hasHistoricalItems" checked={answers.hasHistoricalItems === opt} onChange={() => updateAnswer('hasHistoricalItems', opt)} className="text-emerald-600" />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                <textarea rows="2" value={answers.historicalDetails} onChange={(e) => updateAnswer('historicalDetails', e.target.value)} placeholder="نوع المقتنيات، إن وجدت (اختياري)..." className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 mt-2 font-sans"></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(6)} className="w-1/3 bg-gray-100 font-bold py-3.5 rounded-xl">السابق</button>
                <button onClick={nextStep} className="w-2/3 bg-emerald-700 text-white font-bold py-3.5 rounded-xl">التالي</button>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100">
                <h3 className="text-base font-bold text-emerald-900">13. نوع المشاركة التطوعية؟ </h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 3 ({answers.participationTypes.length}/3)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["تقديم الأفكار والمقترحات", "المشاركة في العمل التطوعي", "المشاركة في النظافة والتشجير", "المشاركة في اللجان وفرق العمل", "تقديم خبرات هندسية أو فنية", "التصوير والتوثيق", "جمع المعلومات التاريخية", "التواصل مع الجهات الداعمة", "تقديم دعم مالي أو عيني"].map((item, idx) => {
                  const isSelected = answers.participationTypes.includes(item);
                  return (
                    <div key={idx} onClick={() => handleCheckboxToggle('participationTypes', item, 3)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                      <span className="text-sm font-medium">{item}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-4 space-y-3">
                <h3 className="text-base font-bold text-emerald-900">14. الرغبة في الانضمام إلى الفرق؟ </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["نعم.", "ربما، حسب طبيعة المهمة والوقت.", "أفضل المشاركة عند تنفيذ مبادرات محددة.", "لا أستطيع المشاركة حاليًا."].map((opt, idx) => {
                    const isSelected = answers.wantToJoinTeam === opt;
                    return (
                      <div key={idx} onClick={() => updateAnswer('wantToJoinTeam', opt)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between shadow-sm ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200 hover:border-emerald-300'}`}>
                        <span className="text-sm font-medium">{opt}</span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-emerald-600 text-white scale-110' : 'bg-gray-100 text-transparent border border-gray-300'}`}>
                          <i data-lucide="check" className="w-3.5 h-3.5"></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center bg-emerald-50/80 p-4 rounded-xl border border-emerald-100 mb-3">
                  <h3 className="text-base font-bold text-emerald-900">15. الفريق المفضل؟ </h3>
                  <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">اختر 2 ({answers.preferredTeams.length}/2)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["فريق التخطيط وجمع الأفكار", "فريق التراث والتوثيق", "فريق التصميم والتجميل", "فريق العمل التطوعي", "فريق الفعاليات والأنشطة", "فريق الإعلام والتواصل", "فريق الدعم والشراكات", "فريق المتابعة والصيانة"].map((item, idx) => {
                    const isSelected = answers.preferredTeams.includes(item);
                    return (
                      <div key={idx} onClick={() => handleCheckboxToggle('preferredTeams', item, 2)} className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-gray-200'}`}>
                        <span className="text-sm font-medium">{item}</span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(7)} className="w-1/3 bg-gray-100 font-bold py-3.5 rounded-xl">السابق</button>
                <button onClick={nextStep} className="w-2/3 bg-emerald-700 text-white font-bold py-3.5 rounded-xl">التالي: الأفكار والمقترحات</button>
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-emerald-900 border-b pb-2 flex items-center gap-2">
                <i data-lucide="lightbulb" className="w-5 h-5 text-amber-500"></i> الأفكار والمقترحات والمحافظة على المشروعات
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">16. المشروع الأهم لإحداث أثر إيجابي؟ </label>
                  <textarea rows="2" value={answers.impactProject} onChange={(e) => updateAnswer('impactProject', e.target.value)} placeholder="اكتب إجابتك هنا..." className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 font-sans"></textarea>
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-3">
                  <label className="block text-sm font-bold text-emerald-900">17. فكرتك المقترحة </label>
                  <input type="text" value={answers.ideaName} onChange={(e) => updateAnswer('ideaName', e.target.value)} placeholder="اسم الفكرة..." className="w-full p-3 rounded-xl border border-gray-200 bg-white font-sans" />
                  <textarea rows="2" value={answers.ideaDesc} onChange={(e) => updateAnswer('ideaDesc', e.target.value)} placeholder="وصف مختصر للفكرة..." className="w-full p-3 rounded-xl border border-gray-200 bg-white font-sans"></textarea>
                  <input type="text" value={answers.ideaLocation} onChange={(e) => updateAnswer('ideaLocation', e.target.value)} placeholder="الموقع المقترح لتنفيذها..." className="w-full p-3 rounded-xl border border-gray-200 bg-white font-sans" />
                  <textarea rows="2" value={answers.ideaBenefit} onChange={(e) => updateAnswer('ideaBenefit', e.target.value)} placeholder="الفائدة المتوقعة منها..." className="w-full p-3 rounded-xl border border-gray-200 bg-white font-sans"></textarea>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">18. أبرز تحديين قد يواجهان تنفيذ المشروع؟ </label>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">اختر 2 ({answers.mainChallenges.length}/2)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["ضعف التمويل", "صعوبة الحصول على الموافقات", "اختلاف الآراء حول الأولويات", "ضعف المشاركة المجتمعية", "عدم وضوح المسؤوليات", "ملكية بعض المواقع", "صعوبة صيانة المشروعات", "عدم المحافظة على الهوية التراثية"].map((item, idx) => {
                      const isSelected = answers.mainChallenges.includes(item);
                      return (
                        <div key={idx} onClick={() => handleCheckboxToggle('mainChallenges', item, 2)} className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-sm ${isSelected ? 'bg-emerald-50 border-emerald-600' : 'bg-white border-gray-200'}`}>
                          <span>{item}</span>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'}`}><i data-lucide="check" className="w-3 h-3"></i></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">19. اقتراحك للمحافظة على المشروعات بعد تنفيذها؟ </label>
                  <textarea rows="2" value={answers.preservationIdea} onChange={(e) => updateAnswer('preservationIdea', e.target.value)} placeholder="اكتب مقترحك..." className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 font-sans"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">20. ملاحظات إضافية </label>
                  <textarea rows="2" value={answers.additionalNotes} onChange={(e) => updateAnswer('additionalNotes', e.target.value)} placeholder="ملاحظاتك..." className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 font-sans"></textarea>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(8)} className="w-1/3 bg-gray-100 font-bold py-3.5 rounded-xl">السابق</button>
                <button onClick={handleSubmit} disabled={isSubmitting} className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
                  <i data-lucide="send" className="w-5 h-5"></i>
                  {isSubmitting ? "جاري الإرسال..." : "إرسال الاستبانة"}
                </button>
              </div>
            </div>
          )}

          {step === 10 && (
            <div className="text-center py-10 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <i data-lucide="check-circle-2" className="w-10 h-10"></i>
              </div>
              <h2 className="text-2xl font-bold text-emerald-900">شكرًا لمشاركتكم الثمينة!</h2>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                نشكر لكم وقتكم ومساهمتكم في رسم مستقبل قرية الأخضر. تم تسجيل إجاباتكم بنجاح في جدول البيانات لدراستها وترتيب أولوياتها.
              </p>
              <div className="pt-4">
                <button onClick={() => window.location.reload()} className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 mx-auto font-sans">
                  <i data-lucide="rotate-ccw" className="w-4 h-4"></i> إرسال رد جديد
                </button>
              </div>
            </div>
          )}

          {step === 99 && (
            <div className="space-y-8 animate-fadeIn font-sans">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-emerald-900 tracking-tight flex items-center gap-2.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    <i data-lucide="bar-chart-2" className="w-7 h-7 text-emerald-600 shrink-0"></i>
                    لوحة التقارير الإحصائية المتقدمة
                  </h2>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Cairo, sans-serif' }}>تحليل تفاعلي للبيانات المُستلمة من جوجل شيت</p>
                </div>
                
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button onClick={() => setStep(100)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    <i data-lucide="brain-circuit" className="w-4 h-4"></i> التحليل الذكي للقرارات
                  </button>
                  <button onClick={exportToCSV} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    <i data-lucide="download" className="w-4 h-4"></i> إكسل
                  </button>
                  <button onClick={() => { setStep(1); setAdminCode(''); setAllSubmissions([]); }} className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    <i data-lucide="arrow-right" className="w-4 h-4"></i> خروج
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-emerald-100 font-medium">إجمالي الاستجابات</span>
                    <i data-lucide="users" className="w-5 h-5 text-emerald-200"></i>
                  </div>
                  <div className="text-3xl font-bold">{allSubmissions.length}</div>
                </div>
                <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white p-5 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-teal-100 font-medium">متطوعون مستعدون</span>
                    <i data-lucide="user-check" className="w-5 h-5 text-teal-200"></i>
                  </div>
                  <div className="text-3xl font-bold">{allSubmissions.filter(s => s.wantToJoinTeam && s.wantToJoinTeam.includes("نعم")).length}</div>
                </div>
                <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white p-5 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-amber-100 font-medium">لديهم مقتنيات تاريخية</span>
                    <i data-lucide="archive" className="w-5 h-5 text-amber-200"></i>
                  </div>
                  <div className="text-3xl font-bold">{allSubmissions.filter(s => s.hasHistoricalItems && s.hasHistoricalItems.includes("نعم")).length}</div>
                </div>
              </div>

              {allSubmissions.length === 0 ? (
                <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl border border-dashed" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  <i data-lucide="pie-chart" className="w-12 h-12 mx-auto mb-2 opacity-50"></i>
                  <p className="font-medium">لا توجد ردود مسجلة في ملف الإكسل.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {[
                    { title: "الأولويات للمشروع", key: "priorities" },
                    { title: "مشروعات التحسين السريع", key: "urgentProjects" },
                    { title: "المواقع المراد تطويرها", key: "sitesToDevelop" },
                    { title: "تطوير الفلج والسكة", key: "falajProposals" },
                    { title: "المشروعات المستقبلية", key: "futureProjects" },
                    { title: "التحديات المحتملة", key: "mainChallenges" }
                  ].map((section, idx) => {
                    const { sorted, totalVotes } = getStatCounts(section.key);
                    return (
                      <div key={idx} className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
                        <h4 className="font-bold text-sm text-emerald-900 border-b pb-2 flex items-center justify-between">
                          <span>{section.title}</span>
                          <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">{totalVotes} صوت</span>
                        </h4>
                        {sorted.length === 0 ? ( <p className="text-xs text-gray-400 py-2">لا بيانات.</p> ) : (
                          <div className="space-y-2.5">
                            {sorted.map(([item, count], i) => {
                              const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                              return (
                                <div key={i} className="text-xs space-y-1 bg-white p-2.5 rounded-xl border">
                                  <div className="flex justify-between font-semibold text-gray-700">
                                    <span className="truncate max-w-[75%]" title={item}>{item}</span>
                                    <span className="text-emerald-700 font-bold">{count} ({percentage}%)</span>
                                  </div>
                                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {step === 100 && (
            <div className="space-y-8 animate-fadeIn font-sans">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-blue-900 tracking-tight flex items-center gap-2.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    <div className="bg-blue-100 p-2 rounded-lg"><i data-lucide="brain-circuit" className="w-7 h-7 text-blue-600 shrink-0"></i></div>
                    غرفة عمليات اتخاذ القرار
                  </h2>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Cairo, sans-serif' }}>تحليل متقاطع للبيانات لاستخراج التوصيات وصناعة القرارات</p>
                </div>
                
                <button onClick={() => setStep(99)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  <i data-lucide="layout-dashboard" className="w-4 h-4"></i> العودة للإحصائيات العامة
                </button>
              </div>

              {allSubmissions.length === 0 ? (
                <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl border border-dashed" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  <i data-lucide="inbox" className="w-12 h-12 mx-auto mb-2 opacity-50"></i>
                  <p className="font-medium">لا توجد بيانات كافية لاستخراج التوصيات.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  
                  {/* 1. المكاسب السريعة */}
                  <div className="bg-amber-50/50 border border-amber-200 p-6 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-amber-100 p-2.5 rounded-full"><i data-lucide="zap" className="w-5 h-5 text-amber-600"></i></div>
                      <h3 className="font-bold text-amber-900 text-lg">مصفوفة "المكاسب السريعة"</h3>
                    </div>
                    <p className="text-xs text-amber-700/80 mb-5 leading-relaxed">التحرك الأول الذي سيلاحظه الأهالي فوراً لرفع الروح المعنوية، مبني على التقاطع بين (أهم موقع + أهم تحسين).</p>
                    
                    <div className="bg-white p-4 rounded-2xl border border-amber-100 space-y-3">
                      <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">الموقع ذو الأولوية القصوى:</span>
                        <span className="font-bold text-amber-800 bg-amber-100 px-2 py-1 rounded-md">{getTopItem('sitesToDevelop')}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">مشروع التحسين الأكثر طلباً:</span>
                        <span className="font-bold text-amber-800 bg-amber-100 px-2 py-1 rounded-md">{getTopItem('urgentProjects')}</span>
                      </div>
                      <div className="pt-2">
                        <span className="block text-xs text-amber-600 font-bold mb-1"><i data-lucide="target" className="w-3 h-3 inline mr-1"></i> القرار المقترح:</span>
                        <p className="text-sm font-bold text-gray-800">
                          البدء فوراً بـ ( {getTopItem('urgentProjects')} ) وتحديداً في منطقة ( {getTopItem('sitesToDevelop')} ).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. مؤشر إنشاء المتحف */}
                  <div className="bg-blue-50/50 border border-blue-200 p-6 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 p-2.5 rounded-full"><i data-lucide="landmark" className="w-5 h-5 text-blue-600"></i></div>
                      <h3 className="font-bold text-blue-900 text-lg">دراسة جدوى "المتحف"</h3>
                    </div>
                    <p className="text-xs text-blue-700/80 mb-5 leading-relaxed">يقيس نسبة من يطالب بإنشاء متحف ويمتلك فعلياً مقتنيات للمساهمة بها لضمان عدم بناء متحف فارغ.</p>
                    
                    <div className="bg-white p-5 rounded-2xl border border-blue-100 text-center">
                      <div className="relative w-32 h-32 mx-auto flex items-center justify-center rounded-full border-8 border-gray-100 mb-3">
                        <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent border-r-transparent" style={{ transform: `rotate(${(getMuseumFeasibility() * 3.6) - 135}deg)`, transition: '1s ease-out' }}></div>
                        <span className="text-3xl font-bold text-blue-900">{getMuseumFeasibility()}%</span>
                      </div>
                      {getMuseumFeasibility() > 40 ? (
                        <div className="bg-emerald-100 text-emerald-800 p-2.5 rounded-xl text-sm font-bold mt-2">
                          توصية: الإقبال ممتاز. ابدأ بتشكيل لجنة استلام وتوثيق المقتنيات.
                        </div>
                      ) : (
                        <div className="bg-amber-100 text-amber-800 p-2.5 rounded-xl text-sm font-bold mt-2">
                          توصية: المحتوى المتوفر قليل. يُنصح بتأجيل بناء المتحف وعمل (معرض مؤقت) حالياً.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3. فجوة الموارد البشرية */}
                  <div className="bg-emerald-50/50 border border-emerald-200 p-6 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-emerald-100 p-2.5 rounded-full"><i data-lucide="users-2" className="w-5 h-5 text-emerald-600"></i></div>
                      <h3 className="font-bold text-emerald-900 text-lg">استعداد الموارد البشرية</h3>
                    </div>
                    <p className="text-xs text-emerald-700/80 mb-5 leading-relaxed">نسبة المشاركين المستعدين للعمل الفعلي في لجان وفرق المشروع مقارنة بإجمالي المطالبين بالتطوير.</p>
                    
                    <div className="bg-white p-5 rounded-2xl border border-emerald-100 flex items-center gap-6">
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1 font-bold text-gray-700">
                            <span>متطوعون محتملون</span>
                            <span>{getHRGap().count} من {allSubmissions.length}</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${getHRGap().ratio}%` }}></div>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                          {getHRGap().ratio > 30 ? "✔️ هناك رغبة قوية للتطوع. ابدأ بتوزيع المهام فوراً قبل فقدان الحماس." : "⚠️ الاعتمادية منخفضة. معظم المشاركين يفضلون التنظير على العمل. ركز على مشروعات المقاولات الخارجية حالياً."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4. خريطة المخاطر */}
                  <div className="bg-rose-50/50 border border-rose-200 p-6 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-rose-100 p-2.5 rounded-full"><i data-lucide="alert-triangle" className="w-5 h-5 text-rose-600"></i></div>
                      <h3 className="font-bold text-rose-900 text-lg">خريطة إدارة المخاطر</h3>
                    </div>
                    <p className="text-xs text-rose-700/80 mb-5 leading-relaxed">تحليل لأكبر تحدٍ يتوقعه الأهالي، مع التوصية الاستباقية لتجاوز هذه العقبة.</p>
                    
                    <div className="bg-white p-4 rounded-2xl border border-rose-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                      <div className="mr-3">
                        <h4 className="text-xs font-bold text-gray-500 mb-1">الخطر المتوقع الأول:</h4>
                        <p className="text-lg font-bold text-rose-800 mb-3">{getTopChallengeMitigation().challenge}</p>
                        
                        <h4 className="text-xs font-bold text-gray-500 mb-1">استراتيجية الحل الاستباقية:</h4>
                        <p className="text-sm font-medium text-gray-700 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                          {getTopChallengeMitigation().mitigation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 5. بنك الأفكار النوعية */}
                  <div className="col-span-1 lg:col-span-2 bg-indigo-50/50 border border-indigo-200 p-6 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-indigo-100 p-2.5 rounded-full"><i data-lucide="lightbulb" className="w-5 h-5 text-indigo-600"></i></div>
                      <h3 className="font-bold text-indigo-900 text-lg">بنك الأفكار النوعية (المبادرات الخاصة)</h3>
                    </div>
                    <p className="text-xs text-indigo-700/80 mb-5 leading-relaxed">أحدث الأفكار المخصصة التي اقترحها الأهالي خارج الصندوق للتقييم والتنفيذ.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {allSubmissions.filter(s => s.ideaName && s.ideaName.trim() !== "").slice(-6).reverse().map((sub, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow relative">
                          <span className="absolute top-3 left-3 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">فكرة</span>
                          <h4 className="font-bold text-gray-800 mb-2 pl-12">{sub.ideaName}</h4>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2" title={sub.ideaDesc}>{sub.ideaDesc}</p>
                          <div className="text-xs space-y-1.5 text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                            <div className="flex items-start gap-1.5"><i data-lucide="map-pin" className="w-3.5 h-3.5 shrink-0 text-indigo-400 mt-0.5"></i> <span className="line-clamp-1">{sub.ideaLocation || "غير محدد"}</span></div>
                            <div className="flex items-start gap-1.5"><i data-lucide="trending-up" className="w-3.5 h-3.5 shrink-0 text-emerald-500 mt-0.5"></i> <span className="line-clamp-1 font-medium text-emerald-700">{sub.ideaBenefit || "غير محدد"}</span></div>
                          </div>
                        </div>
                      ))}
                      {allSubmissions.filter(s => s.ideaName && s.ideaName.trim() !== "").length === 0 && (
                        <p className="text-sm text-gray-500 py-4 col-span-full text-center">لا توجد أفكار نوعية مسجلة بعد.</p>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}