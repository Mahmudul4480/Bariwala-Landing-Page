import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  Camera, 
  Check, 
  X, 
  AlertTriangle, 
  ArrowRight, 
  Building2, 
  Lock,
  Phone,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  User,
  Star,
  Calculator,
  Wrench,
  ShieldAlert,
  Database,
  UserCheck,
  Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import high-quality generated assets representing the Bangladeshi context
import heroImg from './assets/images/bangladesh_modern_apartment_1782801047070.jpg';
import landlordImg from './assets/images/bangladeshi_landlord_trust_1782801064683.jpg';

interface Lead {
  id: string;
  name: string;
  phone: string;
  unitCount: number;
  timestamp: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  role: string;
  quote: string;
  stars: number;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Form step flow
  const [formStep, setFormStep] = useState(1);

  // Form input states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [unitCount, setUnitCount] = useState('');
  
  // Validation errors state
  const [errors, setErrors] = useState<{ name?: string; phone?: string; unitCount?: string }>({});

  // Lead counter (for social proof / high-converting CRO smoke test)
  const [leadCount, setLeadCount] = useState(148);

  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQs Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "মতিউর রহমান",
      location: "উত্তরা, ঢাকা",
      role: "সম্মানিত বাড়িওয়ালা (১০টি ফ্ল্যাট)",
      quote: "Rentora দিয়ে এখন প্রতিটি ফ্ল্যাটের ভাড়া এবং এডভান্সের হিসাব একদম আঙুলের ডগায় থাকে। ভাড়াটিয়ার সাথে কোনো ভুল বোঝাবুঝি বা খাতা হারিয়ে যাওয়ার টেনশন আর একদমই নেই!",
      stars: 5
    },
    {
      id: 2,
      name: "ডা. কামরুল হাসান",
      location: "ধানমণ্ডি, ঢাকা",
      role: "অ্যাপার্টমেন্ট ওনার (৬টি ফ্ল্যাট)",
      quote: "হাসপাতালে ব্যস্ত ডিউটি সামলে ভাড়া আদায়ের তাগাদা দেওয়া আমার জন্য খুবই কঠিন ছিল। Rentora-র অটো-রিমাইন্ডার এখন ভদ্র ভাষায় এই কাজটি নিমিষেই করে দেয়, এটি একটি লাইফসেভার!",
      stars: 5
    },
    {
      id: 3,
      name: "শাহানা বেগম",
      location: "হালিশহর, চট্টগ্রাম",
      role: "বাড়িওয়ালা ও প্রোপার্টি ম্যানেজার",
      quote: "ভাড়াটিয়ার ভোটার আইডি কার্ড আর চুক্তিপত্রের কপি এখন ক্লাউডে সম্পূর্ণ সুরক্ষিত ও সংরক্ষিত থাকে। ছবিসহ ড্যামেজ ট্র্যাকিং ফিচারটি থাকায় ফ্ল্যাট ছাড়ার সময় ক্ষতিপূরণ কাটার শতভাগ জেনুইন প্রমাণ আমার হাতে থাকে।",
      stars: 5
    },
    {
      id: 4,
      name: "মোঃ আরিফুল ইসলাম",
      location: "খুলনা সদর, খুলনা",
      role: "ল্যান্ডলর্ড (১২টি ইউনিট)",
      quote: "অত্যন্ত চমৎকার ও সহজ ইন্টারফেস! আমাদের মতো বয়স্ক মানুষেরাও খুব সহজে এটি ব্যবহার করতে পারে। সাবস্ক্রিপশন ফি আমাদের জন্য অনেক সাশ্রয়ী। প্রথম সেটআপ সার্ভিসও ছিল অসাধারণ!",
      stars: 5
    }
  ];

  const faqs: FaqItem[] = [
    {
      id: 1,
      question: "Rentora-তে আমার তথ্য কতটা সুরক্ষিত থাকবে?",
      answer: "Rentora আপনার ব্যক্তিগত ও ভাড়া সংক্রান্ত সকল তথ্য সুরক্ষিত ক্লাউড সার্ভারে এনক্রিপ্ট করে রাখে। আপনার অনুমতি ছাড়া এই তথ্য অন্য কেউ দেখতে পারবে না। আমরা আন্তর্জাতিক ডেটা সিকিউরিটি স্ট্যান্ডার্ড মেনে চলি।"
    },
    {
      id: 2,
      question: "আমি কি যেকোনো সময় সাবস্ক্রিপশন বাতিল করতে পারব?",
      answer: "হ্যাঁ, যেকোনো সময় আপনি আমাদের সাবস্ক্রিপশন বাতিল করতে পারবেন। আমাদের কোনো দীর্ঘমেয়াদী বা জটিল লক-ইন চুক্তি নেই। আপনি যত মাস ব্যবহার করবেন, শুধুমাত্র তত মাসের ফি প্রদান করবেন।"
    },
    {
      id: 3,
      question: "সেটআপ ও ইনস্টলেশন কিভাবে সম্পন্ন করা হয়?",
      answer: "আপনার বুকিং স্লট নিশ্চিত হওয়ার পর, আমাদের একজন টেকনিক্যাল এক্সপার্ট সরাসরি আপনার সাথে যোগাযোগ করবেন। আমরা সম্পূর্ণ ফ্রিতে আপনার প্রথম ডেটা এন্ট্রি, ভাড়াটিয়ার তালিকা এবং প্রাথমিক সেটআপ সম্পন্ন করে দেবো যেন আপনি সহজে ব্যবহার করতে পারেন।"
    },
    {
      id: 4,
      question: "অটো-হোয়াটসঅ্যাপ রিমাইন্ডার কিভাবে কাজ করে?",
      answer: "অ্যাপের মাধ্যমে আপনি প্রতিটি ইউনিটের ভাড়া আদায়ের নির্দিষ্ট ডেট সেট করতে পারবেন। নির্ধারিত দিনে ভাড়া পরিশোধ না হলে, অ্যাপের জেনারেট বাটনে ক্লিক করলে ভদ্র ও সম্মানজনক ভাষায় একটি রিমাইন্ডার মেসেজ সরাসরি ভাড়াটিয়ার হোয়াটসঅ্যাপ নম্বরে প্রেরিত হবে।"
    },
    {
      id: 5,
      question: "প্রাইসিং মডেলটি বিস্তারিত জানতে চাই",
      answer: "আমাদের ডিল অত্যন্ত পরিষ্কার ও স্বচ্ছ। কোনো লুকানো চার্জ নেই। আপনি প্রথমবার ৩,০০০ টাকা এককালীন সেটআপ ও ইনস্টলেশন ফি প্রদান করবেন এবং এরপর প্রতি মাসে শুধুমাত্র ১,০০০ টাকা সাবস্ক্রিপশন ফি প্রদান করবেন। এটি আপনার সম্পূর্ণ প্রপার্টি সুরক্ষায় প্রতিদিন মাত্র ৩৩ টাকা!"
    }
  ];

  useEffect(() => {
    const storedLeads = localStorage.getItem('rentora_leads');
    if (storedLeads) {
      try {
        const parsed = JSON.parse(storedLeads) as Lead[];
        setLeadCount(148 + parsed.length);
      } catch (e) {
        console.error(e);
      }
    }

    // Auto rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Next / Prev carousel handlers
  const handleNextTestimonial = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Move to step 2 after validating step 1
  const handleNextStep = () => {
    const stepErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      stepErrors.name = 'আপনার নাম অত্যন্ত আবশ্যক';
    }
    
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!phone.trim()) {
      stepErrors.phone = 'মোবাইল নম্বর অত্যন্ত আবশ্যক';
    } else if (!phoneRegex.test(phone.replace(/[\s-]+/g, ''))) {
      stepErrors.phone = 'সঠিক বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)';
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...stepErrors }));
      return;
    }

    setErrors(prev => ({ ...prev, name: undefined, phone: undefined }));
    setFormStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalErrors: { unitCount?: string } = {};
    
    if (!unitCount) {
      finalErrors.unitCount = 'ফ্ল্যাট বা ইউনিটের সংখ্যা উল্লেখ করুন';
    } else {
      const num = parseInt(unitCount);
      if (isNaN(num) || num <= 0) {
        finalErrors.unitCount = 'দয়া করে একটি সঠিক সংখ্যা লিখুন';
      }
    }

    if (Object.keys(finalErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...finalErrors }));
      return;
    }

    setErrors({});

    // Real persistence of the smoke test lead
    const newLead: Lead = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      phone: phone.trim(),
      unitCount: parseInt(unitCount),
      timestamp: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem('rentora_leads');
      const list = stored ? (JSON.parse(stored) as Lead[]) : [];
      list.push(newLead);
      localStorage.setItem('rentora_leads', JSON.stringify(list));
      setLeadCount(148 + list.length);
    } catch (e) {
      console.error(e);
    }

    setIsFormOpen(false);
    setIsSuccessOpen(true);
    setFormStep(1); // Reset to step 1 for future opens
    
    // Reset fields
    setName('');
    setPhone('');
    setUnitCount('');
  };

  const openBookingModal = () => {
    setFormStep(1);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-800">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-blue-900 flex items-center justify-center shadow-md">
              <Home className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-blue-950 flex items-center gap-1.5">
                Rentora
              </span>
              <p className="text-[10px] text-slate-500 tracking-wider uppercase font-medium">নিশ্চিন্ত ও নিরাপদ বাড়িভাড়া হিসাব</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>এই সপ্তাহে {leadCount} জন বাড়িওয়ালা বুক করেছেন</span>
            </div>
            <button 
              onClick={openBookingModal}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base px-5 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer"
            >
              আপনার বাড়ির জন্য বুক করুন
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:py-24 overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text side */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-900/50 backdrop-blur-sm border border-blue-700/60 rounded-full px-3.5 py-1.5 text-xs text-emerald-300 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>ডিজিটাল বাংলাদেশ গড়তে বাড়িওয়ালাদের বিশ্বস্ত ডিজিটাল পার্টনার</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              মুখে মুখে বা খাতায় আর কত? এবার বাড়িভাড়ার হিসাব রাখুন <span className="text-emerald-400 block sm:inline">নিশ্চিন্তে ও নিরাপদে!</span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              ভাড়াটিয়ার ডকুমেন্ট সংরক্ষণ, অটোমেটেড হোয়াটসঅ্যাপ রিমাইন্ডার এবং ডিজিটাল রসিদ—সবকিছু এখন একটি অ্যাপেই।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full py-2">
              <div className="flex items-center space-x-2.5 text-blue-100">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-sm font-medium">এনআইডি ও চুক্তিপত্র ক্লাউড ব্যাকআপ</span>
              </div>
              <div className="flex items-center space-x-2.5 text-blue-100">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-sm font-medium">অটোমেটেড হোয়াটসঅ্যাপ রিমাইন্ডার</span>
              </div>
              <div className="flex items-center space-x-2.5 text-blue-100">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-sm font-medium">ড্যামেজ ট্র্যাক করতে ছবি আপলোড</span>
              </div>
              <div className="flex items-center space-x-2.5 text-blue-100">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-sm font-medium">বাংলায় সহজ ইন্টারফেস ও সরাসরি ডেমো</span>
              </div>
            </div>

            <div className="w-full sm:w-auto pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={openBookingModal}
                className="pulse-glow w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer"
              >
                <span>আপনার বাড়ির জন্য বুক করুন</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              
              <div className="text-xs text-blue-200/90 text-center sm:text-left">
                <p className="font-semibold flex items-center justify-center sm:justify-start gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" /> ৩০০০ BDT সেটআপ ও ১০০০ BDT/মাস
                </p>
                <p>কোনো অগ্রিম পেমেন্ট ছাড়াই মাত্র ২ মিনিটে বুকিং স্লট নিন</p>
              </div>
            </div>
          </div>

          {/* Hero visual image side */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur-lg opacity-35 animate-pulse-slow"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              
              <img 
                src={heroImg} 
                alt="Modern premium apartment building in Dhaka Bangladesh" 
                className="w-full h-64 object-cover sm:h-80"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Interactive Mockup Stats inside Hero */}
              <div className="p-5 space-y-3 bg-slate-950/95 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-bold text-sm">হাজী আশরাফুল ভিলা (উত্তরা, ঢাকা)</h4>
                    <p className="text-[10px] text-slate-400">মোট ১০টি ইউনিটের রিয়েল-টাইম হিসাব</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-semibold uppercase">সক্রিয় ড্যাশবোর্ড</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">চলতি মাসের ভাড়া আদায়</span>
                    <span className="text-emerald-400 font-bold text-sm">১,২০,০০০ BDT</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">বকেয়া রিমাইন্ডার</span>
                    <span className="text-rose-400 font-bold text-sm">২টি ইউনিটে ডিউ</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECURITY & TRUST STRIP */}
      <section className="bg-slate-900 border-y border-slate-800 text-white relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Item 1: Encrypted Data */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-800/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">১০০% এনক্রিপ্টেড ডাটা</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  আপনার সকল ব্যক্তিগত হিসাব ও ভাড়াটিয়ার তথ্য সুরক্ষিত ক্লাউড সার্ভারে সম্পূর্ণ এনক্রিপ্টেড থাকে।
                </p>
              </div>
            </div>

            {/* Item 2: Reliable Support */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-800/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">২৪/৭ ডেডিকেটেড বাংলা সাপোর্ট</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  যেকোনো জিজ্ঞাসায় বা অ্যাপ বুঝতে অসুবিধা হলে আমাদের বাংলাভাষী টিম সর্বদা আপনার সেবায় নিয়োজিত।
                </p>
              </div>
            </div>

            {/* Item 3: Verified Tenants */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-800/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">ভেরিফাইড ভাড়াটিয়া ট্র্যাকিং</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  ভাড়াটিয়ার ভোটার আইডি (NID) এবং পূর্ববর্তী ভাড়ার চুক্তিনামা নিরাপদে ক্লাউড সার্ভারে সোর্স ব্যাকআপ রাখুন।
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PAIN POINTS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block mb-2">বাস্তব সমস্যা</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 leading-snug">
              বাঙালি বাড়িওয়ালাদের ৩টি প্রধান টেনশন—যার সমাধান আছে আমাদের কাছে:
            </h2>
            <div className="w-20 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-slate-50 hover:bg-white hover:shadow-xl rounded-2xl p-8 border border-slate-100 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">সমস্যা ০১</span>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">হিসাব ও এডভান্সের গড়মিল</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  "মুখে মুখে হিসাব রাখায় বা খাতা হারিয়ে যাওয়ায় ভাড়াটিয়ার সাথে ভুল বোঝাবুঝি বা সম্পর্ক নষ্ট হওয়ার ভয়।"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs text-blue-900 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                Rentora সমাধান: ২-সেকেন্ডে অটোমেটিক ডিজিটাল রসিদ
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 hover:bg-white hover:shadow-xl rounded-2xl p-8 border border-slate-100 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">সমস্যা ০২</span>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">ফ্ল্যাটের ক্ষতিসাধন</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  "চলে যাওয়ার সময় দেয়াল, টাইলস বা ফিটিংস নষ্ট করা। ক্ষতিপূরণ দাবি করার অকাট্য প্রমাণের অভাব।"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs text-blue-900 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Rentora সমাধান: ছবিসহ ড্যামেজ হিস্ট্রি সেভ সিস্টেম
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 hover:bg-white hover:shadow-xl rounded-2xl p-8 border border-slate-100 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">সমস্যা ০৩</span>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">ভারা ফাঁকি ও হয়রানি</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  "ভাড়া বাকি রেখে হঠাৎ চলে যাওয়া কিংবা ভাড়া চাইতে গেলে স্থানীয় প্রভাবশালীদের ভয় দেখানো।"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs text-blue-900 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Rentora সমাধান: সুরক্ষিত হোয়াটসঅ্যাপ রিমাইন্ডার
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FEATURES & BENEFITS SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block mb-2">ফিচার ও সুবিধা</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-950">
              কেন Rentora ব্যবহার করবেন?
            </h2>
            <div className="w-20 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Features content column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Point 1 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-950 mb-1.5">ডিজিটাল রসিদ ও অটো-রিমাইন্ডার</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    মুখের কথা নয়, ভাড়া আদায়ের পর ভাড়াটিয়ার হোয়াটসঅ্যাপে চলে যাবে ডিজিটাল রসিদ এবং ডিউ থাকলে ভদ্র ভাষায় অটো-রিমাইন্ডার।
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-950 mb-1.5">ডকুমেন্ট ও চুক্তিপত্র সংরক্ষণ</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    ভাড়াটিয়ার এনআইডি (NID), ছবি এবং ভাড়ার ডিড কপি থাকবে ক্লাউডে সম্পূর্ণ সুরক্ষিত। যেকোনো সময় এক ক্লিকেই অ্যাক্সেস।
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-950 mb-1.5">ছবিসহ ড্যামেজ ট্র্যাকিং</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    ভাড়া দেওয়ার সময় এবং চলে যাওয়ার সময়ের ঘরের ছবি অ্যাপে আপলোড করে রাখুন। ক্ষতিপূরণ কাটার থাকবে শতভাগ জেনুইন প্রমাণ।
                  </p>
                </div>
              </div>

            </div>

            {/* Landlord Trust Image representation column */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xl space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3">
                  <img 
                    src={landlordImg} 
                    alt="Smiling trusted Bangladeshi homeowner/landlord holding key chain" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent flex items-end p-5">
                    <p className="text-white font-bold text-base sm:text-lg leading-snug">
                      "Rentora ব্যবহারের পর থেকে খাতা-কলম ঝেড়ে ফেলে শান্তিতে রাতে ঘুমাতে পারি।"
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 py-1">
                  <div>
                    <h5 className="font-bold text-blue-950 text-sm">হাজী আমিনুল ইসলাম</h5>
                    <p className="text-xs text-slate-500">ঢাকা উত্তরের ৫টি ফ্ল্যাটের সম্মানিত মালিক</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ভেরিফাইড রিভিউ</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* NEW SECTION: TESTIMONIALS CAROUSEL */}
      <section className="py-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block mb-2">সম্মানিত গ্রাহকদের মতামত</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-950">
              বাড়িওয়ালারা আমাদের নিয়ে যা বলছেন
            </h2>
            <div className="w-20 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Testimonial Box */}
          <div className="relative bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm">
            
            {/* Giant quote mark behind */}
            <div className="absolute top-6 left-6 text-emerald-200/40 text-7xl font-serif select-none pointer-events-none">
              “
            </div>

            <div className="min-h-[180px] flex flex-col justify-between relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-lg sm:text-xl text-slate-700 italic font-medium leading-relaxed">
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </blockquote>

                  {/* Landlord Identity info */}
                  <div className="flex items-center space-x-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-blue-900 text-emerald-400 flex items-center justify-center font-bold text-sm">
                      {testimonials[activeTestimonial].name[0]}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-blue-950">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {testimonials[activeTestimonial].location} • {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls at the bottom right */}
              <div className="flex items-center justify-between sm:justify-end space-x-4 mt-8 pt-6 border-t border-slate-200/60">
                
                {/* Dot indicator */}
                <div className="flex space-x-2 sm:mr-auto">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        activeTestimonial === idx ? 'bg-emerald-600 w-6' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevTestimonial}
                    className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block mb-2">সাশ্রয়ী মূল্য</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-950">
              সহজ এবং সাশ্রয়ী মূল্য
            </h2>
            <div className="w-20 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="max-w-xl mx-auto bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Trust highlight banner */}
            <div className="bg-emerald-500 text-slate-950 font-bold text-xs uppercase py-2 px-6 tracking-wider text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 fill-current" />
              স্মোক টেস্ট ক্যাম্পেইন: প্রথম ৫০ জন পাচ্ছেন ওয়ান-টাইম সেটআপ বোনাস
            </div>

            <div className="p-8 sm:p-12 text-center flex flex-col items-center">
              
              <div className="inline-flex p-3 rounded-full bg-blue-950 border border-blue-800 mb-6">
                <Building2 className="w-10 h-10 text-emerald-400" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Rentora প্রিমিয়াম</h3>
              
              {/* Massive Pricing Display */}
              <div className="my-6">
                <span className="text-slate-400 block text-xs uppercase tracking-widest mb-1">প্যাকেজ প্ল্যান</span>
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="text-4xl sm:text-5xl font-black text-white">
                    ৩,০০০ টাকা <span className="text-lg font-medium text-slate-400">(এককালীন সেটআপ ও ইনস্টলেশন ফি)</span>
                  </div>
                  <div className="text-emerald-400 text-xl font-bold mt-2">
                    + ১,০০০ টাকা/মাস <span className="text-sm font-normal text-slate-400">(মাসিক সাবস্ক্রিপশন)</span>
                  </div>
                </div>
              </div>

              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                কোনো লুকানো চার্জ নেই। আপনার মূল্যবান প্রপার্টি এবং মানসিক শান্তির জন্য প্রতিদিন মাত্র ৩৩ টাকা!
              </p>

              {/* Value list of features */}
              <div className="grid grid-cols-2 gap-4 w-full py-4 border-y border-slate-800 text-left mb-8">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs text-slate-300">যেকোনো সময় বাতিলযোগ্য</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs text-slate-300">আনলিমিটেড ফ্ল্যাট ট্র্যাকিং</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs text-slate-300">সম্পূর্ণ বাংলা গাইডবুক</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs text-slate-300">১০০% সুরক্ষিত ডেটাবেস</span>
                </div>
              </div>

              {/* Primary CTA Inside Price Card */}
              <button
                onClick={openBookingModal}
                className="pulse-glow w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>আপনার বাড়ির জন্য বুক করুন</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="flex items-center space-x-1.5 mt-4 text-[11px] text-slate-400">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>নিরাপদ ও এনক্রিপ্টেড ডাটা এনভায়রনমেন্ট</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* NEW SECTION: FAQ ACCORDION SECTION */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block mb-2">প্রশ্ন ও উত্তর</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-950">
              সাধারণ জিজ্ঞাসা (FAQ)
            </h2>
            <div className="w-20 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={faq.id}
                  className="bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-blue-950 hover:bg-slate-100/70 transition-colors cursor-pointer text-base sm:text-lg"
                  >
                    <span className="flex items-center space-x-3 pr-4">
                      <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-400 flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-600 border-t border-slate-200/40 text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Trust badging footer section */}
      <section className="py-12 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-400 mb-2">সরাসরি ডেটা সিকিউরিটি এবং বিশ্বস্ততা নিশ্চয়তা</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 items-center text-slate-300 font-semibold text-sm">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> ১০০% সুরক্ষিত ডাটাবেস</span>
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-400" /> ২৪/৭ ডেডিকেটেড বাংলা সাপোর্ট</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-emerald-400" /> মেড ইন বাংলাদেশ</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-8 text-slate-500 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="font-medium text-slate-400">Rentora — বাড়িভাড়ার হিসাব রাখার সহজ ডিজিটাল সমাধান</p>
          <p>© ২০২৬ Rentora। সর্বস্বত্ব সংরক্ষিত। এটি একটি লিমিটেড ডেমো এবং প্রোডাক্ট ভ্যালিডেশন পেজ (Smoke Test)।</p>
        </div>
      </footer>

      {/* NEW: FLOATING ACTION BUTTON (FAB) FOR WHATSAPP */}
      <a 
        href="https://wa.me/8801700000000?text=%E0%A6%86%E0%A6%AE%E0%A6%BF%20Rentora%20%E0%A6%85%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%AA%20%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87"
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full p-4 shadow-2xl flex items-center justify-center cursor-pointer pulse-glow group transition-transform hover:scale-110"
        title="হোয়াটসঅ্যাপে আমাদের সাথে কথা বলুন"
      >
        <MessageCircle className="w-7 h-7 text-white fill-emerald-500 group-hover:scale-105 transition-transform" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs py-1 px-3.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold border border-slate-800 shadow-xl hidden sm:inline">
          হোয়াটসঅ্যাপে প্রশ্ন করুন
        </span>
      </a>

      {/* 6. FAKE DOOR LEAD CAPTURE FORM MODAL (With Multi-step flow & Step Indicator) */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 z-10"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-6 py-5 relative">
                  <button 
                    onClick={() => setIsFormOpen(false)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl font-bold pr-8">
                    Rentora সেটআপের জন্য বুকিং স্লট নিন
                  </h3>
                  <p className="text-blue-200 text-xs mt-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                    মাত্র কয়েক সেকেন্ডে আপনার বুকিং তথ্য সাবমিট করুন
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="bg-slate-50 border-b border-slate-200/60 px-6 py-3 flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      formStep >= 1 ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      ১
                    </span>
                    <span className={formStep === 1 ? 'text-blue-900' : 'text-slate-500'}>যোগাযোগের তথ্য</span>
                  </div>
                  
                  <div className="w-12 h-0.5 bg-slate-200 relative">
                    <div className={`absolute top-0 left-0 h-full bg-blue-900 transition-all duration-300 ${
                      formStep === 2 ? 'w-full' : 'w-0'
                    }`} />
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      formStep === 2 ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      ২
                    </span>
                    <span className={formStep === 2 ? 'text-blue-900 font-bold' : 'text-slate-500'}>ফ্ল্যাটের বিবরণ</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-6">
                  
                  {formStep === 1 ? (
                    <div className="space-y-5">
                      
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700">
                          আপনার নাম <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                            }}
                            placeholder="উদা: আশরাফুল ইসলাম"
                            className={`w-full pl-4 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                              errors.name 
                                ? 'border-rose-500 focus:ring-rose-200' 
                                : 'border-slate-200 focus:border-blue-600 focus:ring-blue-100'
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone field */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700">
                          মোবাইল নম্বর <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                            }}
                            placeholder="উদা: 017XXXXXXXX"
                            className={`w-full pl-4 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                              errors.phone 
                                ? 'border-rose-500 focus:ring-rose-200' 
                                : 'border-slate-200 focus:border-blue-600 focus:ring-blue-100'
                            }`}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500">আমরা এই নম্বরে ডেমো এবং ইনস্টলেশনের জন্য কল দেবো।</p>
                        {errors.phone && (
                          <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Next Step Button */}
                      <div className="pt-4 flex justify-end">
                        <button 
                          type="button"
                          onClick={handleNextStep}
                          className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-center cursor-pointer flex items-center justify-center space-x-2"
                        >
                          <span>পরবর্তী ধাপে যান</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      {/* Units field */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700">
                          ফ্ল্যাট বা ইউনিটের সংখ্যা <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="number" 
                            min="1"
                            value={unitCount}
                            onChange={(e) => {
                              setUnitCount(e.target.value);
                              if (errors.unitCount) setErrors(prev => ({ ...prev, unitCount: undefined }));
                            }}
                            placeholder="উদা: ৫"
                            className={`w-full pl-4 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                              errors.unitCount 
                                ? 'border-rose-500 focus:ring-rose-200' 
                                : 'border-slate-200 focus:border-blue-600 focus:ring-blue-100'
                            }`}
                          />
                        </div>
                        {errors.unitCount && (
                          <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.unitCount}
                          </p>
                        )}
                      </div>

                      {/* Summary of what they entered */}
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5 text-xs">
                        <p className="font-bold text-slate-700">আপনার বুকিং সংক্ষিপ্ত বিবরণ:</p>
                        <p className="text-slate-600">বাড়িওয়ালার নাম: <strong className="text-blue-950">{name}</strong></p>
                        <p className="text-slate-600">যোগাযোগ নম্বর: <strong className="text-blue-950">{phone}</strong></p>
                      </div>

                      {/* Extra Trust Info */}
                      <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100 flex items-start space-x-2.5 text-xs text-slate-600">
                        <Lock className="w-4 h-4 text-blue-800 flex-shrink-0 mt-0.5" />
                        <span>আপনার ব্যক্তিগত তথ্য সম্পূর্ণ গোপন রাখা হবে। Rentora সুরক্ষিত ক্লাউড অবকাঠামো ব্যবহার করে।</span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button 
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="w-full sm:w-1/3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3.5 rounded-xl transition-all text-center cursor-pointer"
                        >
                          পূর্ববর্তী ধাপ
                        </button>
                        <button 
                          type="submit"
                          className="w-full sm:w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-center cursor-pointer flex items-center justify-center space-x-2"
                        >
                          <span>বুকিং নিশ্চিত করুন</span>
                          <Check className="w-4 h-4" />
                        </button>
                      </div>

                    </form>
                  )}

                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. SUCCESS POPUP / MODAL MESSAGE */}
      <AnimatePresence>
        {isSuccessOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccessOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 z-10 p-8 text-center"
              >
                
                {/* Large animated visual badge representing waitlist booking */}
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-inner relative">
                  <div className="absolute inset-0 bg-emerald-200/50 rounded-full animate-ping scale-110 opacity-70"></div>
                  <Check className="w-10 h-10 stroke-[2.5]" />
                </div>

                {/* Success Title */}
                <h3 className="text-2xl font-extrabold text-blue-950 mb-4">
                  বুকিং স্লট সাময়িকভাবে পূর্ণ!
                </h3>

                {/* Success Body */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  অত্যধিক চাহিদার কারণে এই সপ্তাহের সরাসরি ডেমো ও সেটআপ বুকিং স্লটগুলো পূর্ণ হয়ে গেছে। তবে চিন্তার কিছু নেই! আপনার বুকিংটি অপেক্ষমাণ তালিকায় (Waitlist) রাখা হয়েছে। আগামী সপ্তাহে নতুন স্লট খালি হওয়া মাত্রই আমাদের টিম আপনাকে কল দিয়ে অ্যাপটি সেটআপ করে দেবে। আমাদের ওপর আস্থা রাখার জন্য আন্তরিক ধন্যবাদ।
                </p>

                {/* Actions */}
                <button 
                  onClick={() => setIsSuccessOpen(false)}
                  className="w-full sm:w-auto min-w-[160px] bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  ঠিক আছে
                </button>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
