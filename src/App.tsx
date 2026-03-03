import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Star, ArrowUpRight, Play, MapPin, ChevronLeft, ChevronRight, Menu, Camera, ChevronDown, Droplets, Sparkles, X, Zap, ShieldCheck, RefreshCw, Car, CalendarCheck, Navigation, BadgeCheck, MessageSquareHeart } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';



const vehiclePrices: Record<string, number> = {
  'Sedan': 99,
  'SUV': 119,
  'Pickup': 129,
  'Minivan': 129,
  'Large SUV': 149
};

const pricingCards = [
  { price: "$49", label: "/month", title: "GLEAM Go", desc: "2 express hand washes per month. Built for Uber/Lyft drivers who can't afford bad ratings — and commuters who want a clean car without losing half a Saturday. We come to your parking lot, driveway, wherever you are.", services: "2x Express Wash (30 min each)", bg: "bg-[#111]", text: "text-white", accent: "text-[#E23232]" },
  { price: "$79", label: "/month", title: "GLEAM Plus", desc: "1 full wash + 1 express wash per month. The plan condo dwellers and downtown professionals choose when they want clean inside and out, handled completely on autopilot. No scheduling. No thinking. Just a clean car, always.", services: "1x Full Wash + 1x Express Wash", bg: "bg-[#E23232]", text: "text-black", accent: "text-black", popular: true },
  { price: "$129", label: "/month", title: "GLEAM Full", desc: "2 full washes + 1 interior clean + 1 express wash every single month. For families with kid chaos in the backseat, lease holders who need return-condition cars, and anyone who refuses to let their car look anything less than perfect.", services: "2x Full Wash + 1x Interior + 1x Express", bg: "bg-[#111]", text: "text-white", accent: "text-[#E23232]" }
];

const faqItems = [
  {
    q: "Can you wash my car in a condo underground parking lot?",
    a: "Yes — we built GLEAM specifically for this. Our pros use professional waterless and rinseless products that require zero water hookup, leave zero water runoff, and violate zero building rules. We've washed hundreds of vehicles in underground parking across Mississauga and Etobicoke. Your property manager won't hear a thing."
  },
  {
    q: "What if I'm not happy with the wash?",
    a: "We guarantee your satisfaction. If anything doesn't meet your expectations, we'll send a pro back to redo it at no charge. If you're still not satisfied, you get a full refund. We can offer this because every job is photo-documented — we hold ourselves to the same standard you see in the photos."
  },
  {
    q: "Do I need to be present during the wash?",
    a: "No. Most of our clients aren't. Just leave your car accessible — whether that's your driveway, a parking spot, or your condo's visitor parking. We'll text you when we arrive, when we're done, and send your before/after photos so you can see everything without being there."
  },
  {
    q: "What happens if it rains on the day of my appointment?",
    a: "We reschedule for free — no fees, no hassle. If it's light rain, we can still do interior-only services. For subscription members, we'll automatically find the next available slot within your billing cycle so you never lose a service."
  },
  {
    q: "How do you screen your wash pros?",
    a: "Every GLEAM provider has 2+ years of professional car care experience, passes a hands-on test scored by our quality team (minimum 7.5/10), carries $2M liability insurance, and undergoes a background check. We also run random quality audits and track customer satisfaction on every single job."
  },
  {
    q: "Can I skip a month or cancel my subscription?",
    a: "Skip once per quarter with one tap in your account. Cancel anytime with 30 days' notice — no penalty, no fees, no guilt trip. We don't do contracts because we'd rather earn your business every month than lock you in."
  }
];

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('Sedan');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const containerRef = useRef(null);
  const collageRef = useRef(null);
  const collageRef2 = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: collageScroll } = useScroll({
    target: collageRef,
    offset: ["start end", "center center"]
  });

  const { scrollYProgress: collageScroll2 } = useScroll({
    target: collageRef2,
    offset: ["start end", "center center"]
  });

  const heroY = useTransform(heroScroll, [0, 1], [0, 300]);
  const x1 = useTransform(collageScroll, [0, 1], ["-200%", "-120%"]);
  const x2 = useTransform(collageScroll, [0, 1], ["-80%", "-40%"]);
  const x3 = useTransform(collageScroll, [0, 1], ["80%", "40%"]);
  const x4 = useTransform(collageScroll, [0, 1], ["200%", "120%"]);
  const x5 = useTransform(collageScroll2, [0, 1], ["-200%", "-120%"]);
  const x6 = useTransform(collageScroll2, [0, 1], ["-80%", "-40%"]);
  const x7 = useTransform(collageScroll2, [0, 1], ["80%", "40%"]);
  const x8 = useTransform(collageScroll2, [0, 1], ["200%", "120%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-[#E23232] selection:text-white overflow-x-clip" ref={containerRef}>
      <div className="noise"></div>

      {/* Custom Cursor */}
      <motion.div
        className="cursor-dot hidden md:block"
        animate={{ x: mousePosition.x, y: mousePosition.y, scale: isHovering ? 0 : 1 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="cursor-outline hidden md:block"
        animate={{
          x: mousePosition.x, y: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "#E23232" : "rgba(255,255,255,0.5)"
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-6">
          <div className="font-['Anton'] text-2xl tracking-widest uppercase relative cursor-pointer inline-block" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            GLEAM
            <svg width="100%" height="10" viewBox="0 0 80 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-3 left-0 w-full">
              <path d="M2 8 C 15 1, 35 -1, 55 3 C 65 5, 75 7, 78 8" stroke="#E23232" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <span className="hidden lg:block font-mono text-[10px] text-white/40 uppercase tracking-widest border-l border-white/10 pl-6">Serving Etobicoke & Mississauga</span>
        </div>
        <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest">
          {['How It Works', 'Services', 'Plans', 'Reviews'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#E23232] transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>{item}</a>
          ))}
        </div>
        <button
          className="hidden md:block font-mono text-xs uppercase tracking-widest border border-white/30 px-6 py-3 rounded-full hover:bg-[#E23232] hover:border-[#E23232] hover:text-white transition-all"
          onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
        >
          Book Your First Wash
        </button>
        <button className="md:hidden text-white"><Menu /></button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        {/* Video Background */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#050505]/40" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #050505 20%, rgba(5,5,5,0.6) 50%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050505 0%, transparent 25%)' }} />
        </motion.div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col gap-10">
          {/* Social proof above headline */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#E23232] text-[#E23232]" />)}
              <span className="font-mono text-xs text-white/60 uppercase tracking-wider ml-1">4.9 on Google</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs text-white/60 uppercase tracking-wider">2,400+ Cars Washed</span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs text-white/60 uppercase tracking-wider">$2M Insured</span>
          </motion.div>

          <div className="w-full">
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-[12vw] lg:text-[7vw] font-['Anton'] leading-[0.85] uppercase tracking-tighter">
                Spotless
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }} className="text-[12vw] lg:text-[7vw] font-['Anton'] leading-[0.85] uppercase tracking-tighter">
                Car Wash
              </motion.h1>
            </div>
            <div className="overflow-hidden flex items-center gap-4 md:gap-6">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#E23232] flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-[12vw] lg:text-[7vw] font-['Anton'] leading-[0.85] uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px white" }}>
                In Your Spot.
              </motion.h1>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-mono text-sm md:text-base text-white/60 uppercase tracking-widest max-w-2xl mt-4">
              Pro hand-wash at your door. Book in 30 seconds. Before/after photo proof. No scratches. Ever.
            </motion.p>
          </div>

          {/* Hero Booking Widget */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="w-full max-w-xl border border-white/20 p-8 rounded-3xl backdrop-blur-md bg-black/40" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-[#E23232]" />
              <span className="font-mono text-xs text-[#E23232] uppercase tracking-widest">Spring Revival — 20% off your first wash</span>
            </div>
            <div className="flex items-center gap-4 border-b border-white/20 pb-6 mb-6">
              <MapPin className="text-[#E23232] w-6 h-6 shrink-0" />
              <input type="text" placeholder="WHERE SHOULD WE COME? (ADDRESS)" className="bg-transparent outline-none font-mono text-sm w-full uppercase placeholder:text-white/30 text-white" />
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.keys(vehiclePrices).map((vehicle) => (
                <button
                  key={vehicle}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider rounded-full border transition-all ${selectedVehicle === vehicle ? 'bg-[#E23232] border-[#E23232] text-white' : 'border-white/20 text-white/60 hover:border-white hover:text-white'}`}
                >
                  {vehicle}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-mono text-xs text-white/50 uppercase tracking-widest block mb-1">Full Wash From</span>
                <span className="font-['Anton'] text-5xl text-[#E23232] leading-none">${vehiclePrices[selectedVehicle]}</span>
              </div>
              <button className="bg-[#E23232] text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                Book Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-8 border-y border-white/10 overflow-hidden bg-[#E23232] text-black flex">
        <div className="marquee-content flex gap-10 items-center">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-4xl md:text-6xl font-['Anton'] uppercase whitespace-nowrap tracking-wide">We Come To You. Condo. Driveway. Office. Anywhere.</span>
              <Star className="w-8 h-8 fill-black shrink-0" />
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-content flex gap-10 items-center" aria-hidden="true">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-4xl md:text-6xl font-['Anton'] uppercase whitespace-nowrap tracking-wide">We Come To You. Condo. Driveway. Office. Anywhere.</span>
              <Star className="w-8 h-8 fill-black shrink-0" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Top 5 USPs */}
      <section className="py-20 px-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E23232]/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[11px] text-[#E23232] uppercase tracking-[0.3em] text-center mb-12">Why GLEAM is different</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">

            {/* 1. We Come To You */}
            <div className="group flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 bg-white/[0.03] group-hover:border-[#E23232]/40 group-hover:bg-[#E23232]/[0.06] transition-all duration-300">
                <MapPin className="w-6 h-6 text-[#E23232]" />
              </div>
              <div>
                <span className="font-['Anton'] text-lg uppercase block leading-tight">We Come To You</span>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1.5 block leading-relaxed">Condo underground<br />Driveway &middot; Office lot</span>
              </div>
            </div>

            {/* 2. Photo Proof */}
            <div className="group flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 bg-white/[0.03] group-hover:border-[#E23232]/40 group-hover:bg-[#E23232]/[0.06] transition-all duration-300">
                <Camera className="w-6 h-6 text-[#E23232]" />
              </div>
              <div>
                <span className="font-['Anton'] text-lg uppercase block leading-tight">Photo Proof</span>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1.5 block leading-relaxed">Before &amp; after shots<br />on every single wash</span>
              </div>
            </div>

            {/* 3. Book in 30 Seconds */}
            <div className="group flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 bg-white/[0.03] group-hover:border-[#E23232]/40 group-hover:bg-[#E23232]/[0.06] transition-all duration-300">
                <Zap className="w-6 h-6 text-[#E23232]" />
              </div>
              <div>
                <span className="font-['Anton'] text-lg uppercase block leading-tight">Book in 30 Seconds</span>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1.5 block leading-relaxed">No phone tag<br />No callbacks</span>
              </div>
            </div>

            {/* 4. Smart Subscriptions */}
            <div className="group flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 bg-white/[0.03] group-hover:border-[#E23232]/40 group-hover:bg-[#E23232]/[0.06] transition-all duration-300">
                <RefreshCw className="w-6 h-6 text-[#E23232]" />
              </div>
              <div>
                <span className="font-['Anton'] text-lg uppercase block leading-tight">Plans That Make Sense</span>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1.5 block leading-relaxed">Real subscriptions<br />Cancel anytime</span>
              </div>
            </div>

            {/* 5. Satisfaction Guaranteed */}
            <div className="group flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 bg-white/[0.03] group-hover:border-[#E23232]/40 group-hover:bg-[#E23232]/[0.06] transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-[#E23232]" />
              </div>
              <div>
                <span className="font-['Anton'] text-lg uppercase block leading-tight">Satisfaction Guaranteed</span>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1.5 block leading-relaxed">Not happy? We'll<br />make it right — free</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Google Reviews Bar */}
      <section className="py-16 px-6 border-b border-white/10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#E23232] text-[#E23232]" />
                ))}
              </div>
              <span className="font-mono text-sm text-white/50 uppercase tracking-widest">4.9 on Google</span>
            </div>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest hidden md:block">Real reviews from real customers</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Sarah L.", text: "Live in a condo on Hurontario. GLEAM came into my underground parking and washed my car while I was at work. No mess, no complaints. On the monthly plan now.", time: "2 weeks ago" },
              { name: "Michael T.", text: "Called three other services before GLEAM. Two never called back. GLEAM confirmed in 30 seconds, showed up on time, sent before/after photos. Night and day.", time: "1 month ago" },
              { name: "David K.", text: "I drive Uber 10 hours a day. Dirty car = bad ratings. GLEAM's driver plan keeps my car spotless twice a month for $49. Pays for itself in tips alone.", time: "3 weeks ago" },
              { name: "Priya M.", text: "Booked at 11pm, they came next morning. Got a text when they arrived, text when done, and 10 photos of my car looking brand new. This is how it should work.", time: "1 week ago" }
            ].map((review, idx) => (
              <div key={idx} className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#E23232]/30 transition-colors">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E23232] text-[#E23232]" />
                  ))}
                </div>
                <p className="font-serif italic text-sm text-white/60 leading-relaxed line-clamp-4">{review.text}</p>
                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/50 uppercase tracking-wider">{review.name}</span>
                  <span className="font-mono text-[10px] text-white/30">{review.time}</span>
                </div>
                <svg className="w-14 h-5 mt-1" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                  <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C119.25 34.32 129.24 25 141.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                  <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                  <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                  <path d="M35.29 41.19V32H68c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 33.91.36 13.93 16.32-1.53 36.3-1.53c11.01 0 18.82 4.3 24.68 9.99l-6.95 6.95c-4.21-3.95-9.92-7.03-17.73-7.03-14.48 0-25.81 11.68-25.81 25.52s11.33 25.52 25.81 25.52c9.41 0 14.78-3.78 18.22-7.23 2.78-2.78 4.6-6.75 5.32-12.18H35.29z" fill="#4285F4"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Condo Section */}
      <section className="py-32 px-6 md:px-12 border-b border-white/10 relative">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <span className="font-mono text-xs text-[#E23232] uppercase tracking-widest mb-6 block">Toronto's #1 condo car wash problem, solved</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-['Anton'] uppercase leading-[0.9] mb-10">
              Live In A Condo?<br/><span className="text-[#E23232]">We Built This<br/>For You.</span>
            </h2>
            <p className="font-serif italic text-xl md:text-2xl text-white/60 leading-relaxed mb-10 max-w-lg">
              <span className="text-white/80">30% of Toronto homes are condos.</span> Other guys show up with a hose and leave. We show up with waterless products — built for underground parking.
            </p>
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E23232]/10 flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4 text-[#E23232]" />
                </div>
                <span className="font-mono text-sm uppercase tracking-widest">100% waterless — zero building violations</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E23232]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#E23232]" />
                </div>
                <span className="font-mono text-sm uppercase tracking-widest">P1, P2, P3 — we find your car</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E23232]/10 flex items-center justify-center shrink-0">
                  <Camera className="w-4 h-4 text-[#E23232]" />
                </div>
                <span className="font-mono text-sm uppercase tracking-widest">Done while you work — photos sent</span>
              </div>
            </div>
            <button className="font-mono text-xs uppercase tracking-widest border border-[#E23232] text-[#E23232] px-8 py-4 rounded-full hover:bg-[#E23232] hover:text-white transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              Book a Condo Wash
            </button>
          </div>

          <div className="lg:w-1/2 flex flex-col gap-5">
            {/* Hero stat card */}
            <div className="bg-gradient-to-br from-[#E23232] to-[#b91c1c] rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span className="font-['Anton'] text-7xl md:text-8xl text-white leading-none block">500+</span>
                  <span className="font-mono text-xs text-white/70 uppercase tracking-widest mt-2 block">Condo washes completed</span>
                </div>
                <div className="text-right">
                  <span className="font-['Anton'] text-7xl md:text-8xl text-white/20 leading-none block">0</span>
                  <span className="font-mono text-xs text-white/50 uppercase tracking-widest mt-2 block">Complaints filed</span>
                </div>
              </div>
            </div>

            {/* Buildings grid */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8">
              <span className="font-mono text-[10px] text-[#E23232] uppercase tracking-[0.3em] block mb-5">Buildings we've serviced</span>
              <div className="grid grid-cols-2 gap-3">
                {['M City Towers', 'Absolute World', 'Erin Square', 'Sherway Gate', 'Port Credit', 'Square One District', 'Lakeview Village', 'Exchange District'].map((building) => (
                  <div key={building} className="group flex items-center gap-3 bg-[#111] border border-white/5 rounded-xl px-4 py-3 hover:border-[#E23232]/30 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[#E23232]/40 group-hover:bg-[#E23232] transition-colors shrink-0" />
                    <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider group-hover:text-white/80 transition-colors">{building}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust strip */}
            <div className="flex gap-4">
              <div className="flex-1 bg-[#111] border border-white/10 rounded-2xl p-5 flex items-center gap-4 group hover:border-[#E23232]/30 transition-colors">
                <ShieldCheck className="w-6 h-6 text-[#E23232] shrink-0" />
                <div>
                  <span className="font-mono text-xs text-white/80 uppercase tracking-wider block">$2M Insured</span>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">Every pro, every wash</span>
                </div>
              </div>
              <div className="flex-1 bg-[#111] border border-white/10 rounded-2xl p-5 flex items-center gap-4 group hover:border-[#E23232]/30 transition-colors">
                <Sparkles className="w-6 h-6 text-[#E23232] shrink-0" />
                <div>
                  <span className="font-mono text-xs text-white/80 uppercase tracking-wider block">Waterless</span>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">Zero runoff, zero mess</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Agitation Section (Collage) */}
      <section className="py-32 px-6 overflow-hidden relative border-b border-white/10">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-['Anton'] uppercase leading-[0.9] mb-24">
            Your Car Wash Is<br/>Destroying <span className="text-[#E23232]">Your Paint.</span>
          </h2>

          <div ref={collageRef} className="flex justify-center items-center h-[300px] lg:h-[450px] relative mb-24 w-full max-w-5xl mx-auto">
            <motion.img style={{ x: x1 }} src="/Image 1 — Swirl marks in direct sunlight.jpeg" alt="Swirl marks from automated wash" className="absolute w-[160px] lg:w-[280px] h-[220px] lg:h-[380px] object-cover border-[4px] border-[#222] grayscale hover:grayscale-0 hover:z-50 transition-all duration-500 -rotate-[15deg] z-10" />
            <motion.img style={{ x: x2 }} src="/Image 2 — Automated brush grinding dirt.jpeg" alt="Automated brush damage" className="absolute w-[160px] lg:w-[280px] h-[220px] lg:h-[380px] object-cover border-[4px] border-[#222] grayscale hover:grayscale-0 hover:z-50 transition-all duration-500 -rotate-[5deg] z-20" />
            <motion.img style={{ x: x3 }} src="/Image 3 — Deep scratch  clear coat failure.jpeg" alt="Deep scratch and clear coat failure" className="absolute w-[160px] lg:w-[280px] h-[220px] lg:h-[380px] object-cover border-[4px] border-[#222] grayscale hover:grayscale-0 hover:z-50 transition-all duration-500 rotate-[5deg] z-40" />
            <motion.img style={{ x: x4 }} src="/Image 4 — Water spot etching  neglect.jpeg" alt="Water spot etching damage" className="absolute w-[160px] lg:w-[280px] h-[220px] lg:h-[380px] object-cover border-[4px] border-[#222] grayscale hover:grayscale-0 hover:z-50 transition-all duration-500 rotate-[15deg] z-30" />
          </div>

          <p className="font-serif italic text-2xl md:text-3xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
            Automated brushes grind dirt into your paint. Mobile guys never call back.<br className="hidden md:block" /> <span className="text-white/80 font-medium">You deserve better.</span>
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-mono text-sm md:text-base uppercase tracking-widest mb-24">
            <span className="text-white/30">No spinning brushes</span>
            <span className="text-[#E23232]">Hand wash only</span>
            <span className="text-white/30">No scratches</span>
            <span className="text-[#E23232]">Photo proof</span>
            <span className="text-white/30">No wasted Saturdays</span>
          </div>

          <div ref={collageRef2} className="flex justify-center items-center h-[300px] lg:h-[450px] relative w-full max-w-5xl mx-auto">
            <motion.img style={{ x: x5 }} src="/collage-1.jpeg" alt="Wash 1" className="absolute w-[160px] lg:w-[280px] h-[220px] lg:h-[380px] object-cover border-[4px] border-[#222] grayscale hover:grayscale-0 hover:z-50 transition-all duration-500 -rotate-[15deg] z-10" />
            <motion.img style={{ x: x6 }} src="/collage-2.jpeg" alt="Wash 2" className="absolute w-[160px] lg:w-[280px] h-[220px] lg:h-[380px] object-cover border-[4px] border-[#222] grayscale hover:grayscale-0 hover:z-50 transition-all duration-500 -rotate-[5deg] z-20" />
            <motion.img style={{ x: x7 }} src="/collage-3.jpeg" alt="Wash 3" className="absolute w-[160px] lg:w-[280px] h-[220px] lg:h-[380px] object-cover border-[4px] border-[#222] grayscale hover:grayscale-0 hover:z-50 transition-all duration-500 rotate-[5deg] z-40" />
            <motion.img style={{ x: x8 }} src="/collage-4.jpeg" alt="Wash 4" className="absolute w-[160px] lg:w-[280px] h-[220px] lg:h-[380px] object-cover border-[4px] border-[#222] grayscale hover:grayscale-0 hover:z-50 transition-all duration-500 rotate-[15deg] z-30" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <p className="font-mono text-[11px] text-[#E23232] uppercase tracking-[0.3em] mb-4">5 steps. That's it.</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-['Anton'] uppercase leading-[0.9]">
              How <span className="text-[#E23232]">GLEAM</span> Works
            </h2>
          </div>

          {/* Flow Steps */}
          <div className="relative">
            {/* Connecting line - desktop only */}
            <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
              {[
                { num: "01", icon: Car, label: "Pick Your Car", sub: "Select vehicle type & location" },
                { num: "02", icon: CalendarCheck, label: "Book a Wash", sub: "30 seconds — instant confirm" },
                { num: "03", icon: Navigation, label: "Track Your Pro", sub: "Live updates to your phone" },
                { num: "04", icon: BadgeCheck, label: "Approve Photos", sub: "10 before/after shots sent" },
                { num: "05", icon: MessageSquareHeart, label: "Rate & Review", sub: "Tell us how we did" }
              ].map((step, idx) => (
                <div key={idx} className="group relative flex flex-col items-center text-center cursor-default">
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-[#0a0a0a] group-hover:border-[#E23232]/50 group-hover:bg-[#E23232]/[0.08] transition-all duration-500 relative z-10">
                      <step.icon className="w-10 h-10 text-white/20 group-hover:text-[#E23232] transition-all duration-500 group-hover:scale-110" />
                    </div>
                    <span className="absolute -top-2 -right-2 font-['Anton'] text-3xl text-[#E23232]/30 group-hover:text-[#E23232] transition-colors duration-300 z-20">{step.num}</span>
                  </div>

                  {/* Label */}
                  <h3 className="font-['Anton'] text-xl uppercase mb-2 group-hover:text-[#E23232] transition-colors duration-300">{step.label}</h3>
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{step.sub}</p>

                  {/* Arrow connector - between items on desktop */}
                  {idx < 4 && (
                    <div className="hidden lg:block absolute top-16 -right-4 z-20">
                      <ArrowRight className="w-4 h-4 text-white/10" />
                    </div>
                  )}

                  {/* Arrow connector - mobile/tablet */}
                  {idx < 4 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ChevronDown className="w-5 h-5 text-white/10" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Slider */}
      <section className="h-screen relative border-b border-white/10 flex flex-col">
        {/* Header */}
        <div className="text-center pt-10 pb-6 px-6 shrink-0">
          <p className="font-mono text-[11px] text-[#E23232] uppercase tracking-[0.3em] mb-3">See the difference</p>
          <h2 className="text-4xl md:text-6xl font-['Anton'] uppercase leading-[0.9]">
            The GLEAM <span className="text-[#E23232]">Effect</span>
          </h2>
        </div>

        {/* Slider Container - fills remaining height */}
        <div className="flex-1 min-h-0 px-4 md:px-8 pb-4 relative">
          <div
            ref={sliderRef}
            className="relative w-full h-full rounded-2xl overflow-hidden cursor-col-resize select-none border border-white/10"
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onMouseMove={(e) => { if (isDragging.current) handleSliderMove(e.clientX); }}
            onTouchStart={() => { isDragging.current = true; }}
            onTouchEnd={() => { isDragging.current = false; }}
            onTouchMove={(e) => { if (isDragging.current) handleSliderMove(e.touches[0].clientX); }}
            onClick={(e) => handleSliderMove(e.clientX)}
          >
            {/* After image (full, sits behind) */}
            <img src="/after-wash.jpeg" alt="After GLEAM wash" className="absolute inset-0 w-full h-full object-cover" />

            {/* Before image (clipped) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <img src="/before-wash.jpeg" alt="Before GLEAM wash" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${sliderRef.current ? sliderRef.current.offsetWidth : 1400}px`, maxWidth: 'none' }} />
            </div>

            {/* Slider line */}
            <div className="absolute top-0 bottom-0 z-30 pointer-events-none" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
              <div className="w-[2px] h-full bg-white/80 relative">
                {/* Slider handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#E23232] border-4 border-white flex items-center justify-center shadow-[0_0_30px_rgba(226,50,50,0.4)] pointer-events-auto cursor-col-resize">
                  <div className="flex gap-1">
                    <ChevronLeft className="w-4 h-4 text-white" />
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-6 left-6 z-20 bg-black/70 backdrop-blur-sm px-5 py-2.5 rounded-full">
              <span className="font-mono text-xs text-white/70 uppercase tracking-widest">Before</span>
            </div>
            <div className="absolute top-6 right-6 z-20 bg-black/70 backdrop-blur-sm px-5 py-2.5 rounded-full">
              <span className="font-mono text-xs text-white/70 uppercase tracking-widest">After</span>
            </div>

            {/* Bottom hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black/50 backdrop-blur-sm px-5 py-2 rounded-full">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Drag to compare</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="plans" className="py-32 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-8">
            <div>
              <h2 className="text-6xl md:text-8xl font-['Anton'] uppercase leading-[0.9]">Monthly<br/>Plans</h2>
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest mt-4 max-w-md">Cancel anytime — 30-day notice, no fees, no guilt trip. We don't do contracts because we'd rather earn your business every month.</p>
            </div>
            <button className="font-mono text-xs uppercase tracking-widest border border-white/30 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              View One-Time Prices
            </button>
          </div>

          <p className="font-serif italic text-lg text-white/40 max-w-2xl mb-20">
            Subscriptions save you 25-35% vs. booking one-time washes — and you never have to remember to book. We schedule, we show up, your car stays clean.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {pricingCards.map((card, idx) => (
              <div
                key={idx}
                className={`${card.bg} ${card.text} p-12 rounded-3xl flex flex-col h-auto min-h-[580px] border border-white/10 transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-2 cursor-default relative`}
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              >
                {'popular' in card && <span className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest bg-black text-white px-4 py-1.5 rounded-full">Most Popular</span>}
                <div className="flex items-baseline gap-1 mb-6">
                  <h3 className={`text-7xl font-['Anton'] ${card.accent}`}>{card.price}</h3>
                  <span className="font-mono text-sm opacity-60">{card.label}</span>
                </div>
                <h4 className="text-3xl font-['Anton'] uppercase mb-3">{card.title}</h4>
                <span className="font-mono text-xs opacity-50 uppercase tracking-widest mb-6 block">{card.services}</span>
                <p className="font-serif italic text-lg opacity-70 mb-12 flex-grow">{card.desc}</p>
                <button className={`font-mono text-xs uppercase tracking-widest border ${card.bg === 'bg-[#E23232]' ? 'border-black hover:bg-black hover:text-[#E23232]' : 'border-white/30 hover:bg-white hover:text-black'} px-8 py-4 rounded-full transition-all self-start`}>
                  Start Your Plan
                </button>
              </div>
            ))}
          </div>

          {/* GLEAM Prime — Premium Tier */}
          <div className="bg-[#111] border border-[#E23232]/30 p-12 rounded-3xl flex flex-col md:flex-row gap-10 items-center cursor-default relative overflow-hidden" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E23232]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex-grow relative z-10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#E23232] block mb-3">The complete package</span>
              <div className="flex items-baseline gap-2 mb-3">
                <h3 className="text-6xl font-['Anton'] text-[#E23232]">$179</h3>
                <span className="font-mono text-sm text-white/60">/month</span>
              </div>
              <h4 className="text-3xl font-['Anton'] uppercase mb-4">GLEAM Prime</h4>
              <p className="font-serif italic text-lg text-white/60 max-w-xl mb-6">
                Everything in GLEAM Full, plus a monthly salt flush in winter, priority scheduling so you always get your preferred time slot, and 15% off any add-on services. For anyone who wants their car looking showroom-clean at all times — without thinking about it.
              </p>
              <span className="font-mono text-xs text-white/30 uppercase tracking-widest">All GLEAM Full Washes + Salt Flush + Priority + 15% Off Add-Ons</span>
            </div>
            <button className="font-mono text-xs uppercase tracking-widest border border-[#E23232] text-[#E23232] px-8 py-4 rounded-full hover:bg-[#E23232] hover:text-white transition-all shrink-0 relative z-10">
              Go Prime
            </button>
          </div>

          {/* Second vehicle discount */}
          <p className="font-mono text-xs text-white/30 uppercase tracking-widest text-center mt-8">
            Second vehicle in the same household? 20% off the second plan.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-32 px-6 md:px-12 border-b border-white/10 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden border border-white/10">

            {/* Left — CTA side */}
            <div className="lg:w-[45%] relative overflow-hidden">
              <img src="/booking-bg.jpeg" alt="GLEAM wash" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
              <div className="relative z-10 p-10 md:p-14 flex flex-col justify-end h-full min-h-[400px] lg:min-h-0">
                <p className="font-mono text-[11px] text-[#E23232] uppercase tracking-[0.3em] mb-4">Ready to see the difference?</p>
                <h2 className="text-5xl md:text-6xl font-['Anton'] uppercase leading-[0.9] mb-6">
                  Book Your<br/><span className="text-[#E23232]">First Wash</span>
                </h2>
                <p className="font-serif italic text-lg text-white/50 mb-8 max-w-sm">
                  If it's not the best car wash you've ever had, it's free.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] text-white/30 uppercase tracking-widest">
                  <span>$2M insured</span>
                  <span>Photo proof</span>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right — Form side */}
            <div className="lg:w-[55%] bg-[#0a0a0a] p-10 md:p-14">
              <form className="flex flex-col gap-6 h-full">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full group">
                    <label className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-[#E23232] transition-colors text-white placeholder:text-white/20" />
                  </div>
                  <div className="w-full group">
                    <label className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-2">Email</label>
                    <input type="email" placeholder="john@email.com" className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-[#E23232] transition-colors text-white placeholder:text-white/20" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full group">
                    <label className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-2">Phone</label>
                    <input type="tel" placeholder="(416) 000-0000" className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-[#E23232] transition-colors text-white placeholder:text-white/20" />
                  </div>
                  <div className="w-full group">
                    <label className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-2">Vehicle</label>
                    <input type="text" placeholder="BMW M4, Tesla Model 3..." className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-[#E23232] transition-colors text-white placeholder:text-white/20" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full group">
                    <label className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-2">Wash Type</label>
                    <select className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-[#E23232] transition-colors text-white appearance-none cursor-pointer" defaultValue="">
                      <option value="" disabled className="bg-[#111]">Select a wash</option>
                      <option value="express" className="bg-[#111]">Express Wash ($49+)</option>
                      <option value="interior" className="bg-[#111]">Interior Clean ($69+)</option>
                      <option value="full" className="bg-[#111]">Full Wash ($99+)</option>
                      <option value="subscription" className="bg-[#111]">Monthly Plan</option>
                    </select>
                  </div>
                  <div className="w-full group">
                    <label className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-2">Location</label>
                    <select className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-[#E23232] transition-colors text-white appearance-none cursor-pointer" defaultValue="">
                      <option value="" disabled className="bg-[#111]">Where's your car?</option>
                      <option value="condo" className="bg-[#111]">Condo Underground</option>
                      <option value="driveway" className="bg-[#111]">Home Driveway</option>
                      <option value="office" className="bg-[#111]">Office Parking Lot</option>
                      <option value="other" className="bg-[#111]">Other</option>
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <label className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-2">Notes (optional)</label>
                  <textarea placeholder="Gate codes, parking level, pet hair situation..." rows={2} className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-[#E23232] transition-colors text-white placeholder:text-white/20 resize-none"></textarea>
                </div>

                <button type="button" className="w-full bg-[#E23232] text-white font-['Anton'] text-xl uppercase tracking-wider py-5 rounded-xl hover:bg-white hover:text-black transition-all mt-2 group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <span className="flex items-center justify-center gap-3">
                    Book My Wash — 20% Off
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest text-center">
                  Spring special — 20% off first wash. Satisfaction guaranteed.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-6xl md:text-8xl font-['Anton'] uppercase leading-[0.9] mb-6 text-center">Questions?<br/><span className="text-[#E23232]">Answers.</span></h2>
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest text-center mb-20">Everything you'd want to know before booking</p>

          <div className="flex flex-col gap-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left cursor-pointer"
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="font-mono text-sm uppercase tracking-widest pr-8">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#E23232] shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-8 font-sans text-white/60 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-10 px-6 md:px-12 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-mono text-xs uppercase tracking-widest text-white/50">
            <div>
              <h3 className="text-white mb-6 font-bold">Navigation</h3>
              <ul className="space-y-4">
                <li><a href="#services" className="hover:text-[#E23232] transition-colors">Services</a></li>
                <li><a href="#plans" className="hover:text-[#E23232] transition-colors">Monthly Plans</a></li>
                <li><a href="#" className="hover:text-[#E23232] transition-colors">Become a Wash Pro</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-6 font-bold">Service Areas</h3>
              <ul className="space-y-4">
                <li>Etobicoke</li>
                <li>Mississauga</li>
                <li>Port Credit</li>
                <li>Greater Toronto Area</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-6 font-bold">Contact</h3>
              <ul className="space-y-4">
                <li>hello@gleam.ca</li>
                <li>@gleamgta</li>
                <li>(416) 555-GLEAM</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-6 font-bold">Hours</h3>
              <ul className="space-y-4">
                <li>Mon - Sat: 8AM - 7PM</li>
                <li>Sunday: 9AM - 5PM</li>
                <li className="text-[#E23232]">Now Booking Spring Washes</li>
              </ul>
            </div>
          </div>

          <div className="mt-24 text-center font-mono text-xs text-white/30 uppercase tracking-widest">
            © 2026 GLEAM Auto Care Inc. $2M insured. Satisfaction guaranteed. Serving the Greater Toronto Area.
          </div>
        </div>
      </footer>
    </div>
  );
}
