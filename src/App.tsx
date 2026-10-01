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
  const [isFetchingData, setIsFetchingData] = useState(false); // حالة جديدة لتحميل التقارير

  // ضع رابط Google Script الخاص بك هنا (تأكد أنه محدث بعد إضافة doGet)
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnmgpXPpYioWTVguMDDSPfURM-_fBI6LGSM9WC6D3OEZheo2F61n6Kca1YZyzZXT_zYg/exec";

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
      // إرسال البيانات إلى جوجل شيت
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(answers)
      });
      setStep(10);
    } catch (error) {
      console.error("خطأ في الإرسال:", error);
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- دالة جديدة لتسجيل دخول المشرف وجلب البيانات من جوجل شيت ---
  const handleAdminLogin = async () => {
    if (adminCode === 'AsA307') {
      setIsFetchingData(true);
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        
        // تحويل النصوص المدمجة بفواصل إلى مصفوفات (Arrays) لتعمل الإحصائيات بشكل سليم
        const arrayFields = ['priorities', 'futureVision', 'urgentProjects', 'sitesToDevelop', 'falajProposals', 'mustahActivities', 'futureProjects', 'museumContents', 'participationTypes', 'preferredTeams', 'mainChallenges'];
        
        const formattedData = data.map(row => {
          const newRow = { ...row };
          arrayFields.forEach(field => {
            if (typeof newRow[field] === 'string') {
              // إذا كان جوجل شيت يحفظها كنص مفصول بفاصلة، نقوم بتحويله إلى مصفوفة مجدداً
              newRow[field] = newRow[field].split(',').map(s => s.trim()).filter(Boolean);
            }
          });
          return newRow;
        });

        setAllSubmissions(formattedData);
        setStep(99);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        alert("حدث خطأ أثناء جلب البيانات من جوجل شيت. تأكد من إعداد دالة doGet.");
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
                {/* تم تعديل الزر هنا لاستدعاء دالة الجلب */}
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

          {/* الخطوات من 2 إلى 10 لم تتغير (قم بنسخها كما هي من الكود الخاص بك إذا لزم الأمر، سأختصرها للتركيز على التقارير) */}
          {/* ... الخطوة 2 إلى 9 ... */}
          {step > 1 && step < 10 && (
             <div className="space-y-6">
                <div className="bg-amber-50 p-4 rounded-xl text-amber-800 text-sm border border-amber-200">
                    <p>هذا الجزء مطابق تماماً للكود السابق الخاص بك ولم يتغير. (يرجى إبقاء كود الخطوات من 2 إلى 9 كما هو في نسختك).</p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep(step - 1)} className="w-1/3 bg-gray-100 font-bold py-3.5 rounded-xl">السابق</button>
                  <button onClick={step === 9 ? handleSubmit : nextStep} disabled={isSubmitting} className="w-2/3 bg-emerald-700 text-white font-bold py-3.5 rounded-xl">
                    {step === 9 ? (isSubmitting ? "جاري الإرسال..." : "إرسال") : "التالي"}
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

          {/* لوحة التقارير الأساسية (Step 99) */}
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

          {/* لوحة غرفة العمليات (Step 100) */}
          {/* ... الخطوة 100 تبقى كما هي بدون أي تغيير لأنها تقرأ من allSubmissions والذي أصبح يتحدث تلقائياً ... */}
          {step === 100 && (
             <div className="bg-amber-50 p-4 rounded-xl text-amber-800 text-sm border border-amber-200 mt-4">
                <p>غرفة العمليات ستعمل الآن وتتجاوب بشكل مباشر مع جميع البيانات التي تم جلبها من جوجل شيت. (يرجى إبقاء كود الخطوة 100 كما هو في نسختك الأصلية).</p>
                <div className="mt-4">
                  <button onClick={() => setStep(99)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    <i data-lucide="layout-dashboard" className="w-4 h-4"></i> العودة للإحصائيات العامة
                  </button>
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}