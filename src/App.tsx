import React, { useState, useEffect, useRef } from 'react';
import { EditableImage } from './components/EditableImage';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2, 
  Plane, 
  Globe, 
  Clock, 
  ShieldCheck, 
  Users,
  Instagram,
  Facebook,
  Twitter,
  Calendar,
  IndianRupee,
  Info,
  ArrowRight,
  MousePointer2,
  Sparkles,
  Loader2,
  Download,
  Key,
  Search,
  Camera,
  ScanLine,
  Zap,
  Home,
  PlaySquare,
  Grid,
  User,
  ShoppingCart,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { TOUR_DETAILS, TourDetail } from './tourData';

// --- Interactive Components ---

const FixedSocials = () => {
  const socials = [
    { icon: <Instagram size={20} />, href: "https://instagram.com/travelofriend", color: "hover:text-pink-600", label: "Instagram" },
    { icon: <Facebook size={20} />, href: "https://facebook.com/travelofriend", color: "hover:text-blue-600", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/travelofriend", color: "hover:text-sky-500", label: "Twitter" },
  ];

  return (
    <div className="hidden lg:flex fixed bottom-8 right-8 z-[70] flex-col gap-4">
      {socials.map((social, idx) => (
        <motion.a
          key={idx}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: 1 + idx * 0.1,
            duration: 0.5,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className={`glass-card p-3 rounded-full text-slate-600 ${social.color} transition-colors shadow-lg flex items-center justify-center group relative`}
          aria-label={social.label}
        >
          {social.icon}
          <span className="absolute right-full mr-3 px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {social.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Main cursor spring
  const mainSpringConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, mainSpringConfig);
  const cursorYSpring = useSpring(cursorY, mainSpringConfig);

  // Trail springs for animated effect
  const trail1X = useSpring(cursorX, { damping: 30, stiffness: 500 });
  const trail1Y = useSpring(cursorY, { damping: 30, stiffness: 500 });
  
  const trail2X = useSpring(cursorX, { damping: 40, stiffness: 300 });
  const trail2Y = useSpring(cursorY, { damping: 40, stiffness: 300 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer Trail 2 */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-orange-500/10 rounded-full pointer-events-none z-[9998] hidden lg:block"
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.5 : 1,
        }}
      />
      
      {/* Outer Trail 1 */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-orange-500/20 rounded-full pointer-events-none z-[9998] hidden lg:block"
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.8 : 1,
        }}
      />

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-orange-500/20 rounded-full pointer-events-none z-[9999] border border-orange-500/40 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2.5 : isClicking ? 0.8 : 1,
          backdropFilter: 'blur(1px)',
        }}
      >
        <motion.div 
          className="absolute inset-0 m-auto w-1.5 h-1.5 bg-orange-500 rounded-full"
          animate={{ 
            scale: isHovering ? 0.5 : 1,
            boxShadow: isHovering ? "0 0 10px rgba(249, 115, 22, 0.8)" : "0 0 0px rgba(249, 115, 22, 0)"
          }}
        />
        
        {/* Animated Ring on Hover */}
        <motion.div
          className="absolute inset-0 border-t-2 border-orange-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ opacity: isHovering ? 1 : 0 }}
        />
      </motion.div>
    </>
  );
};

const Magnetic = ({ children, strength = 0.3 }: { children: React.ReactNode, strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1920"
];

const HeroBackground = ({ y, opacity }: { y: any, opacity: any }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 z-0"
      style={{ y, opacity }}
    >
      <AnimatePresence mode="wait">
        <motion.img 
          key={index}
          src={HERO_IMAGES[index]} 
          alt="Hero Background" 
          initial={{ opacity: 0, scale: isMobile ? 1 : 1.2 }}
          animate={{ opacity: 1, scale: isMobile ? 1.05 : 1.1 }}
          exit={{ opacity: 0, scale: isMobile ? 1.1 : 1.3 }}
          transition={{ duration: isMobile ? 1.5 : 2.5, ease: "easeInOut" }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-slate-50" />
    </motion.div>
  );
};

const InteractiveText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ 
        duration: 0.8,
        y: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 200;
    const yPct = (mouseY / height - 0.5) * 200;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={isMobile ? { y: -5 } : {}}
      className="h-full"
    >
      <div style={isMobile ? {} : { transform: "translateZ(20px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

const CardStack = ({ items, onSelect }: { items: TourDetail[], onSelect: (id: string) => void }) => {
  const [cards, setCards] = useState(items);
  const [isExpanded, setIsExpanded] = useState(false);

  const moveToEnd = (from: number) => {
    setCards((prev) => {
      const newArray = [...prev];
      const [movedItem] = newArray.splice(from, 1);
      newArray.push(movedItem);
      return newArray;
    });
  };

  const shuffleCards = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCards((prev) => {
      const newArray = [...prev];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    });
  };

  return (
    <div 
      className="relative h-[450px] w-[280px] sm:w-[320px] md:h-[500px] md:w-[380px] mx-auto lg:mx-0 cursor-pointer group/stack"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => moveToEnd(0)}
    >
      <AnimatePresence mode="popLayout">
        {cards.slice(0, 4).reverse().map((card, index) => {
          const displayIndex = 3 - index;
          const isTop = displayIndex === 0;

          // Fan out logic
          let xOffset = 0;
          let rotate = 0;
          let yOffset = 0;
          let scale = 1 - displayIndex * 0.05;
          let opacity = 1 - displayIndex * 0.2;

          if (isExpanded) {
            if (displayIndex === 1) {
              xOffset = -140;
              rotate = -12;
              scale = 0.95;
              opacity = 0.9;
            } else if (displayIndex === 2) {
              xOffset = 140;
              rotate = 12;
              scale = 0.95;
              opacity = 0.9;
            } else if (displayIndex === 3) {
              yOffset = -40;
              scale = 0.9;
              opacity = 0.7;
            }
          } else {
            yOffset = displayIndex * 15;
          }

          return (
            <motion.div
              key={card.id}
              className="absolute h-full w-full rounded-3xl bg-white p-4 shadow-2xl border border-white/20 overflow-hidden flex flex-col"
              style={{
                cursor: "pointer",
                transformOrigin: "bottom center",
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                x: xOffset,
                y: yOffset,
                rotate: rotate,
                scale: scale,
                zIndex: 10 - displayIndex,
                opacity: opacity,
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1], // Custom ease-in-out (cubic-bezier)
              }}
              exit={{ 
                x: 300, 
                opacity: 0, 
                scale: 0.5, 
                transition: { duration: 0.4, ease: "easeInOut" } 
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                initial={{ x: '-150%' }}
                animate={{ x: '150%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "linear",
                  repeatDelay: 2
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transform: 'skewX(-25deg)'
                }}
              />

              <div className="relative h-3/5 w-full rounded-2xl overflow-hidden mb-4">
                <EditableImage 
                  id={`hero-card-${card.id}`}
                  defaultSrc={card.image} 
                  alt={card.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800";
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-orange-600 shadow-sm">
                  {card.duration}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{card.name}</h3>
                <p className="text-slate-500 text-[10px] md:text-xs line-clamp-2 mb-4 leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Starting from</span>
                    <span className="text-lg md:text-xl font-bold text-slate-900">₹{card.price.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(card.id);
                    }}
                    className="bg-slate-900 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-bold hover:bg-orange-600 transition-colors flex items-center gap-1 relative z-30"
                  >
                    View <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Hint for interaction */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap"
        >
          <MousePointer2 size={12} className="text-orange-500" /> Hover to Fan Out • Click to Cycle
        </motion.div>
        
        <motion.button
          onClick={shuffleCards}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/80 backdrop-blur-sm border border-slate-200 px-4 py-1.5 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2 shadow-sm hover:border-orange-500 hover:text-orange-600 transition-colors"
        >
          <Globe size={12} /> Shuffle Stack
        </motion.button>
      </div>
    </div>
  );
};

const DOMESTIC_DESTINATIONS = [
  { id: "goa", name: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200" },
  { id: "andaman", name: "Andaman", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1200" },
  { id: "kerala", name: "Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200" },
  { id: "meghalaya-guwahati", name: "Meghalaya & Guwahati", image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=1200" },
  { id: "shimla-manali", name: "Shimla Kullu Manali", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200" },
  { id: "arunachal-pradesh", name: "Arunachal Pradesh", image: "https://images.unsplash.com/photo-1626690110325-4b089970c84a?auto=format&fit=crop&q=80&w=1200" },
  { id: "spiti-valley", name: "Shimla & Spiti Valley", image: "https://images.unsplash.com/photo-1581791538302-03537b9c97bf?auto=format&fit=crop&q=80&w=1200" },
  { id: "darjeeling-only", name: "Darjeeling", image: "https://images.unsplash.com/photo-1610448721566-473ce9da814c?auto=format&fit=crop&q=80&w=1200" },
  { id: "gangtok-only", name: "Gangtok", image: "https://images.unsplash.com/photo-1589136775550-c201359bf63a?auto=format&fit=crop&q=80&w=1200" },
  { id: "darjeeling-gangtok", name: "Darjeeling & Gangtok", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200" },
  { id: "darjeeling-gangtok-pelling", name: "Darjeeling, Gangtok & Pelling", image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=1200" },
  { id: "puri", name: "Puri", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200" },
];

const INTERNATIONAL_DESTINATIONS = [
  { id: "vietnam", name: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200" },
  { id: "bali", name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200" },
  { id: "bangkok-pattaya-phuket-krabi", name: "Bangkok & Pattaya", image: "https://images.unsplash.com/photo-1504214208698-ea1919a23562?auto=format&fit=crop&q=80&w=1200" },
  { id: "phuket-krabi", name: "Phuket & Krabi", image: "https://images.unsplash.com/photo-1589394815804-964ed9be2eb3?auto=format&fit=crop&q=80&w=1200" },
  { id: "kuala-lumpur", name: "Kuala Lumpur", image: "https://images.unsplash.com/photo-1596422846543-b5c64863e939?auto=format&fit=crop&q=80&w=1200" },
  { id: "kuala-lumpur-langkawi", name: "Kuala Lumpur & Langkawi", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200" },
  { id: "phu-quoc", name: "Phu Quoc", image: "https://cdn.audleytravel.com/1050/749/79/16016190-phu-quoc-island-south-vietnam.webp" },
  { name: "Penang", image: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&q=80&w=1200" },
  { name: "Dubai & Abu Dhabi", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200" },
  { name: "Sri Lanka", image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=1200" },
  { name: "Singapore", image: "https://images.unsplash.com/photo-1525625230556-8e8b87469dd0?auto=format&fit=crop&q=80&w=1200" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourDetail | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");

  const generateAIImage = async (tourName: string, promptOverride?: string) => {
    try {
      setGenerationError(null);
      
      // Check for API key
      const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio?.openSelectKey();
      }

      setIsGeneratingImage(true);
      
      const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
      const finalPrompt = promptOverride || `A breathtaking, high-quality, professional travel photography of ${tourName}. Cinematic lighting, vibrant colors, 8k resolution, stunning landscape.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [
            {
              text: finalPrompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: imageSize
          },
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setGeneratedImageUrl(`data:image/png;base64,${base64EncodeString}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        throw new Error("No image was generated by the model.");
      }
    } catch (error: any) {
      console.error("Image generation error:", error);
      if (error.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio?.openSelectKey();
      }
      setGenerationError(error.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const openTourDetails = (id: string) => {
    const tour = TOUR_DETAILS.find(t => t.id === id);
    if (tour) {
      setGeneratedImageUrl(null);
      setGenerationError(null);
      setCustomPrompt("");
      setSelectedTour(tour);
    } else {
      // If not found in detailed list, just scroll to contact
      scrollToSection('contact');
    }
  };

  return (
    <div className={`min-h-screen font-sans text-slate-900 bg-[#f1f5f9] ${selectedTour ? 'overflow-hidden' : ''}`}>
      <CustomCursor />
      
      {/* App-like Header */}
      <div className="bg-gradient-to-b from-[#cce0ff] to-[#f1f5f9] pt-4 pb-2 sticky top-0 z-50 shadow-sm">
        {/* Top Pills */}
        <div className="max-w-7xl mx-auto px-4 flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          <div className="bg-[#ffdb00] rounded-xl px-4 py-2 flex flex-col items-center min-w-[100px] shadow-sm cursor-pointer hover:scale-105 transition-transform">
             <span className="font-bold text-sm italic text-gray-900">Travel-O</span>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 flex flex-col items-center min-w-[100px] shadow-sm cursor-pointer hover:scale-105 transition-transform" onClick={() => scrollToSection('domestic')}>
             <span className="text-red-500 font-bold text-sm">Packages</span>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 flex flex-col items-center min-w-[100px] shadow-sm cursor-pointer hover:scale-105 transition-transform" onClick={() => scrollToSection('international')}>
             <span className="text-orange-500 font-bold text-sm">Flights</span>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 flex flex-col items-center min-w-[100px] shadow-sm cursor-pointer hover:scale-105 transition-transform" onClick={() => scrollToSection('whyus')}>
             <span className="text-green-600 font-bold text-sm">Hotels</span>
          </div>
        </div>

        {/* Address Bar */}
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between my-3">
          <div className="bg-white/80 backdrop-blur-md rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm shadow-sm max-w-[75%] cursor-pointer">
            <Home size={16} className="text-gray-700 shrink-0" />
            <span className="font-bold text-gray-900 shrink-0">HOME</span>
            <span className="truncate text-gray-600">Kalyani, Nadia, West Bengal</span>
            <ChevronDown size={16} className="text-gray-500 shrink-0" />
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-lg px-3 py-1.5 flex items-center gap-1 shadow-sm cursor-pointer">
            <Zap size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-sm">12</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-md border border-gray-100">
            <Search className="text-gray-500" size={24} />
            <input type="text" placeholder="Search destinations, tours..." className="flex-1 outline-none text-base sm:text-lg bg-transparent" />
            <Camera className="text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" size={24} />
            <div className="w-px h-6 bg-gray-300"></div>
            <ScanLine className="text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" size={24} />
          </div>
        </div>

        {/* Categories Row */}
        <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto hide-scrollbar pb-2">
          {[
            { name: "For You", icon: "🌟", active: true, id: "hero" },
            { name: "Domestic", icon: "🏔️", id: "domestic" },
            { name: "International", icon: "✈️", id: "international" },
            { name: "About Us", icon: "ℹ️", id: "about" },
            { name: "Why Us", icon: "🛡️", id: "whyus" },
            { name: "Contact", icon: "📞", id: "contact" },
          ].map((cat, i) => (
            <div key={i} className={`flex flex-col items-center gap-2 min-w-[60px] pb-2 cursor-pointer ${cat.active ? 'border-b-4 border-blue-600' : ''}`} onClick={() => scrollToSection(cat.id)}>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-gray-100 hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${cat.active ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Banner */}
      <div className="max-w-7xl mx-auto px-4 py-4" id="hero">
        <div className="rounded-2xl overflow-hidden relative aspect-[2/1] md:aspect-[3/1] shadow-md group">
          <EditableImage 
            id="main-banner" 
            defaultSrc="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 pointer-events-none">
            <h2 className="text-white text-2xl sm:text-4xl font-bold mb-2">Sunday Street Deals</h2>
            <p className="text-white/90 text-sm sm:text-lg font-medium">Deals starting at ₹2999</p>
          </div>
          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
            <div className="w-6 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* About Us */}
      <section id="about" className="py-16 lg:py-24 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 to-rose-500/20 blur-3xl rounded-3xl" />
              <div className="absolute -top-10 -left-10 opacity-10 pointer-events-none z-0">
                <EditableImage 
                  id="about-logo-watermark"
                  defaultSrc="/logo.png" 
                  alt="" 
                  className="w-40 h-auto grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <EditableImage 
                id="about-main-image"
                defaultSrc="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000" 
                alt="About Travel-O-Friend" 
                className="rounded-3xl shadow-2xl relative z-10 border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 bg-gradient-to-br from-orange-500 to-rose-600 p-8 rounded-2xl text-white hidden md:block shadow-2xl z-20">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm font-medium uppercase tracking-wider opacity-80">Years Experience</p>
              </div>
            </motion.div>
            
            <div className="relative z-10">
              <h3 className="text-orange-600 font-bold uppercase tracking-widest mb-4">About Us</h3>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Your Ultimate <span className="premium-gradient-text">Travel Companion</span></h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Travel-O-Friend is a premier travel agency based in Kalyani, West Bengal, dedicated to providing seamless and memorable travel experiences. We specialize in curated domestic and international tour packages tailored to your preferences and budget.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[
                  "Customized Tour Packages",
                  "Hassle-free Bookings",
                  "Expert Local Guides",
                  "24/7 Customer Support",
                  "Best Price Guarantee",
                  "Safe & Secure Travel"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-orange-500" size={20} />
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Magnetic strength={0.1}>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center gap-2 text-orange-600 font-bold text-lg group"
                >
                  Learn More About Us <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* Domestic Tours */}
      <section id="domestic" className="py-16 lg:py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Domestic Destinations</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Discover the <span className="premium-gradient-text">Beauty of India</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 md:pb-0 hide-scrollbar px-4 md:px-0 -mx-4 md:mx-0">
            {DOMESTIC_DESTINATIONS.map((dest, idx) => (
              <motion.div 
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="perspective-1000 min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center"
              >
                <TiltCard>
                  <div className="group relative overflow-hidden rounded-2xl glass-card hover:bg-white/60 transition-all duration-500 h-full flex flex-col">
                    <div className="h-48 sm:h-64 overflow-hidden relative shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <EditableImage 
                        id={`dest-dom-${idx}`}
                        defaultSrc={dest.image} 
                        alt={dest.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-slate-100"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800";
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{dest.name}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm mb-4 flex-1">Explore the magic of {dest.name} with our special packages.</p>
                      <button 
                        onClick={() => openTourDetails(dest.id)}
                        className="w-full py-2.5 border border-blue-500/50 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Plane size={16} /> View Packages
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Tours */}
      <section id="international" className="py-16 lg:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-orange-600 font-bold uppercase tracking-widest mb-4">International Destinations</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Explore the <span className="premium-gradient-text">World Beyond Borders</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 md:pb-0 hide-scrollbar px-4 md:px-0 -mx-4 md:mx-0">
            {INTERNATIONAL_DESTINATIONS.map((dest, idx) => (
              <motion.div 
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="perspective-1000 min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center"
              >
                <TiltCard>
                  <div className="group relative overflow-hidden rounded-2xl glass-card hover:bg-white/60 transition-all duration-500 h-full flex flex-col">
                    <div className="h-48 sm:h-64 overflow-hidden relative shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <EditableImage 
                        id={`dest-int-${idx}`}
                        defaultSrc={dest.image} 
                        alt={dest.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-slate-100"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800";
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{dest.name}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm mb-4 flex-1">Unforgettable international experience in {dest.name}.</p>
                      <Magnetic strength={0.2}>
                        <button 
                          onClick={() => dest.id ? openTourDetails(dest.id) : scrollToSection('contact')}
                          className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 text-sm sm:text-base"
                        >
                          {dest.id ? (
                            <>
                              <Info size={16} />
                              View Details
                            </>
                          ) : (
                            'Book Now'
                          )}
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="whyus" className="py-16 lg:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Why Choose Us</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">We Provide the <span className="premium-gradient-text">Best Travel Experience</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 hide-scrollbar px-4 md:px-0 -mx-4 md:mx-0">
            {[
              { icon: <Globe className="text-orange-600" size={40} />, title: "Diverse Destinations", desc: "Wide range of domestic and international tour options." },
              { icon: <ShieldCheck className="text-orange-600" size={40} />, title: "Safe & Secure", desc: "Your safety is our top priority throughout the journey." },
              { icon: <Clock className="text-orange-600" size={40} />, title: "24/7 Support", desc: "Round-the-clock assistance for all your travel needs." },
              { icon: <Users className="text-orange-600" size={40} />, title: "Happy Travelers", desc: "Thousands of satisfied customers across the country." }
            ].map((feature, idx) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="perspective-1000 min-w-[260px] sm:min-w-[300px] md:min-w-0 snap-center"
              >
                <TiltCard>
                  <div className="p-6 sm:p-8 rounded-2xl glass-card text-center hover:bg-white/60 transition-all border border-black/5 h-full flex flex-col items-center justify-center">
                    <div className="mb-4 sm:mb-6 flex justify-center">{feature.icon}</div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{feature.title}</h4>
                    <p className="text-slate-600 text-sm sm:text-base">{feature.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h3 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Contact Us</h3>
              <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">Get in Touch for Your Next Adventure</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="glass-card p-4 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">Call Us</h4>
                    <p className="text-slate-600">+91 8017559717</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="glass-card p-4 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">WhatsApp</h4>
                    <p className="text-slate-600">+91 8240747501</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="glass-card p-4 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">Email</h4>
                    <p className="text-slate-600">travelofriend@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="glass-card p-4 rounded-xl text-slate-500 group-hover:bg-slate-600 group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">Address</h4>
                    <p className="text-slate-600">B-1/222, Kalyani, Nadia, West Bengal, India - 741235</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a href="tel:+918017559717" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 w-full sm:w-auto">
                  <Phone size={20} /> Call Now
                </a>
                <a href="https://wa.me/918240747501" target="_blank" rel="noreferrer" className="bg-green-600 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 w-full sm:w-auto">
                  <MessageCircle size={20} /> WhatsApp
                </a>
              </div>
            </div>
            
            <div className="glass-card p-6 sm:p-10 rounded-3xl border border-black/5">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Enquiry Form</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-black/10 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-black/10 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Enter your phone" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Destination</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/50 border border-black/10 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none">
                      <option className="bg-white">Select Destination</option>
                      <optgroup label="Domestic" className="bg-white">
                        {DOMESTIC_DESTINATIONS.map(d => <option key={d.name} className="bg-white">{d.name}</option>)}
                      </optgroup>
                      <optgroup label="International" className="bg-white">
                        {INTERNATIONAL_DESTINATIONS.map(d => <option key={d.name} className="bg-white">{d.name}</option>)}
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Travel Date</label>
                    <input type="date" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-black/10 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-black/10 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Tell us about your travel plans"></textarea>
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 transform hover:scale-[1.02]">
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black/[0.05] text-slate-900 pt-16 lg:pt-20 pb-24 lg:pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/logo.png" 
                  alt="Travel-O-Friend Logo" 
                  className="h-10 w-auto opacity-90"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/200x80/ffffff/000000?text=Travel-O-Friend';
                  }}
                  referrerPolicy="no-referrer"
                />
                <h2 className="text-2xl font-bold tracking-tight premium-gradient-text">Travel-O-Friend</h2>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Your reliable partner for domestic and international tours. We bring the world closer to you with our expert travel services.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all group">
                  <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all group">
                  <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all group">
                  <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-black/5 pb-2">Quick Links</h4>
              <ul className="space-y-4 text-slate-600">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-orange-600 transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-orange-600 transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('domestic')} className="hover:text-orange-600 transition-colors">Domestic Tours</button></li>
                <li><button onClick={() => scrollToSection('international')} className="hover:text-orange-600 transition-colors">International Tours</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-orange-600 transition-colors">Contact Us</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-black/5 pb-2">Top Destinations</h4>
              <ul className="space-y-4 text-slate-600">
                <li><button onClick={() => scrollToSection('domestic')} className="hover:text-orange-600 transition-colors">Goa & Andaman</button></li>
                <li><button onClick={() => scrollToSection('domestic')} className="hover:text-orange-600 transition-colors">Kerala & Darjeeling</button></li>
                <li><button onClick={() => scrollToSection('international')} className="hover:text-orange-600 transition-colors">Vietnam & Bali</button></li>
                <li><button onClick={() => scrollToSection('international')} className="hover:text-orange-600 transition-colors">Dubai & Singapore</button></li>
                <li><button onClick={() => scrollToSection('international')} className="hover:text-orange-600 transition-colors">Thailand & Sri Lanka</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-black/5 pb-2">Contact Info</h4>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start gap-3">
                  <MapPin className="text-orange-600 shrink-0" size={20} />
                  <span>B-1/222, Kalyani, Nadia, West Bengal, India - 741235</span>
                </li>
                <li className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Phone className="text-orange-600 shrink-0" size={20} />
                    <span>+91 8017559717 / 8240747501</span>
                  </div>
                </li>
                <li className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Mail className="text-orange-600 shrink-0" size={20} />
                    <div className="flex flex-col">
                      <span>info@travel-o-friend.com</span>
                      <span>travelofriend@gmail.com</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-black/5 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Travel-O-Friend. All rights reserved.</p>
            <p className="mt-2">Designed for Indian Travelers looking for the best tour experiences.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons (Mobile) */}
      <div className="lg:hidden fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a 
          href="https://wa.me/918240747501" 
          target="_blank" 
          rel="noreferrer"
          className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl animate-bounce border border-white/20"
        >
          <MessageCircle size={28} />
        </a>
        <a 
          href="tel:+918017559717" 
          className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 rounded-full shadow-2xl border border-white/20"
        >
          <Phone size={28} />
        </a>
      </div>

      {/* Tour Detail Modal */}
      <AnimatePresence>
        {selectedTour && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center sm:p-6 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedTour(null);
                setGeneratedImageUrl(null);
                setGenerationError(null);
                setCustomPrompt("");
              }}
              className="absolute inset-0 bg-slate-900/40"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl glass-card sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[90vh] border-0 sm:border border-white/60"
            >
              {/* Modal Header */}
              <div className="relative h-64 sm:h-80 shrink-0">
                <EditableImage 
                  id={`tour-modal-${selectedTour.id}`}
                  defaultSrc={selectedTour.image} 
                  alt={selectedTour.name} 
                  className="w-full h-full object-cover bg-slate-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800";
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                <div className="absolute top-4 left-4 z-20">
                  <EditableImage 
                    id="tour-modal-logo"
                    defaultSrc="/logo.png" 
                    alt="Logo" 
                    className="h-8 w-auto drop-shadow-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button 
                  onClick={() => {
                    setSelectedTour(null);
                    setGeneratedImageUrl(null);
                    setGenerationError(null);
                  }}
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors border border-white/20 z-20"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-slate-900">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {selectedTour.duration}
                    </span>
                    <span className="bg-blue-600/10 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-blue-500/20">
                      <ShieldCheck size={12} /> Verified Package
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold">{selectedTour.name} <span className="premium-gradient-text">Special Tour</span></h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-10 bg-white">
                <div className="grid lg:grid-cols-3 gap-10">
                  {/* Left Column: Details & Itinerary */}
                  <div className="lg:col-span-2 space-y-10">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Info className="text-orange-600" /> Overview
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg italic">
                        "{selectedTour.description}"
                      </p>
                    </div>

                    {/* AI Image Generation Section */}
                    <div className="bg-gradient-to-br from-orange-50 to-rose-50 p-6 rounded-3xl border border-orange-100 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-500 rounded-xl text-white">
                            <Sparkles size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">AI Destination Preview</h4>
                            <p className="text-xs text-slate-500">Generate a custom high-quality view of {selectedTour.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-orange-100">
                          {(['1K', '2K', '4K'] as const).map((size) => (
                            <button
                              key={size}
                              onClick={() => setImageSize(size)}
                              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                                imageSize === size 
                                  ? 'bg-orange-500 text-white shadow-sm' 
                                  : 'text-slate-500 hover:bg-slate-50'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Prompt Input */}
                      <div className="space-y-4 mb-6">
                        <div className="relative">
                          <input
                            type="text"
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            placeholder={`Describe your dream view of ${selectedTour.name}...`}
                            className="w-full px-4 py-3 bg-white border border-orange-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 pr-12 shadow-sm"
                          />
                          <button
                            onClick={() => generateAIImage(selectedTour.name, customPrompt)}
                            disabled={isGeneratingImage || !customPrompt.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
                          >
                            <ArrowRight size={18} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => {
                              const p = `A sunset view of ${selectedTour.name} with warm golden light.`;
                              setCustomPrompt(p);
                              generateAIImage(selectedTour.name, p);
                            }}
                            className="text-[10px] bg-white border border-orange-100 px-2 py-1 rounded-lg text-slate-500 hover:border-orange-300 transition-colors"
                          >
                            🌅 Sunset View
                          </button>
                          <button 
                            onClick={() => {
                              const p = `A misty morning in ${selectedTour.name} with ethereal atmosphere.`;
                              setCustomPrompt(p);
                              generateAIImage(selectedTour.name, p);
                            }}
                            className="text-[10px] bg-white border border-orange-100 px-2 py-1 rounded-lg text-slate-500 hover:border-orange-300 transition-colors"
                          >
                            🌫️ Misty Morning
                          </button>
                          <button 
                            onClick={() => {
                              const p = `Aerial drone shot of ${selectedTour.name} showing the vast landscape.`;
                              setCustomPrompt(p);
                              generateAIImage(selectedTour.name, p);
                            }}
                            className="text-[10px] bg-white border border-orange-100 px-2 py-1 rounded-lg text-slate-500 hover:border-orange-300 transition-colors"
                          >
                            🚁 Aerial Shot
                          </button>
                        </div>
                      </div>

                      {generatedImageUrl ? (
                        <div className="space-y-4">
                          <div className="relative group rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                            <EditableImage 
                              id="ai-generated-view"
                              defaultSrc={generatedImageUrl} 
                              alt="Generated AI View" 
                              className="w-full aspect-video object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                              <button 
                                onClick={() => generateAIImage(selectedTour.name)}
                                className="p-3 bg-white text-orange-600 rounded-full hover:scale-110 transition-transform"
                                title="Regenerate"
                              >
                                <Sparkles size={20} />
                              </button>
                              <a 
                                href={generatedImageUrl} 
                                download={`${selectedTour.name.toLowerCase()}-ai-view.png`}
                                className="p-3 bg-white text-blue-600 rounded-full hover:scale-110 transition-transform"
                                title="Download"
                              >
                                <Download size={20} />
                              </a>
                            </div>
                          </div>
                          <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">Generated by Gemini AI • {imageSize} Resolution</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 px-4 text-center border-2 border-dashed border-orange-200 rounded-2xl bg-white/50">
                          {isGeneratingImage ? (
                            <div className="space-y-4">
                              <Loader2 className="w-10 h-10 text-orange-500 animate-spin mx-auto" />
                              <div>
                                <p className="font-bold text-slate-900">Creating your masterpiece...</p>
                                <p className="text-xs text-slate-500">This may take a few seconds</p>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-500">
                                <Key size={32} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">Visualize Your Trip</p>
                                <p className="text-xs text-slate-500 mb-6">Experience {selectedTour.name} through AI-generated professional photography</p>
                                <button 
                                  onClick={() => generateAIImage(selectedTour.name)}
                                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 mx-auto"
                                >
                                  <Sparkles size={18} /> Generate AI View
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {generationError && (
                        <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs text-center">
                          {generationError}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Calendar className="text-orange-600" /> Day-wise Itinerary
                      </h3>
                      <div className="space-y-6">
                        {selectedTour.itinerary.map((item) => (
                          <div key={item.day} className="relative pl-8 border-l-2 border-black/5 pb-2">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                            <h4 className="font-bold text-slate-900 text-lg mb-3">
                              Day {item.day}: {item.title}
                            </h4>
                            <ul className="space-y-2">
                              {item.activities.map((activity, i) => (
                                <li key={i} className="text-slate-700 flex items-start gap-2">
                                  <ArrowRight size={14} className="mt-1.5 text-orange-600 shrink-0" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Inclusions */}
                  <div className="space-y-8">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-black/5">
                      <h4 className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-4">Special Offer Price</h4>
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-4xl font-bold text-slate-900 flex items-center">
                          <IndianRupee size={28} /> {selectedTour.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-slate-400 line-through text-lg">
                          ₹{selectedTour.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-green-600 font-bold text-sm mb-6">Save ₹{(selectedTour.originalPrice - selectedTour.price).toLocaleString('en-IN')} today!</p>
                      
                      <a 
                        href={`https://wa.me/918240747501?text=Hi, I am interested in the ${selectedTour.name} (${selectedTour.duration}) package.`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
                      >
                        <MessageCircle size={20} /> Book on WhatsApp
                      </a>
                      <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest">Book by 31st March for special price</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-500/10">
                      <h4 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-blue-600" /> Package Inclusions
                      </h4>
                      <ul className="space-y-3">
                        {selectedTour.inclusions.map((inc, i) => (
                          <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-2xl border border-dashed border-black/10">
                      <h4 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                        <Phone size={18} className="text-blue-600" /> Need Help?
                      </h4>
                      <p className="text-sm text-slate-500 mb-4">Our travel experts are available 24/7 to help you plan your perfect trip.</p>
                      <a href="tel:+918017559717" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
                        <Phone size={16} /> +91 8017559717
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 z-[100] lg:hidden pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center gap-1 cursor-pointer text-blue-600" onClick={() => scrollToSection('hero')}>
          <Home size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-blue-600" onClick={() => scrollToSection('domestic')}>
          <Grid size={24} />
          <span className="text-[10px] font-medium">Packages</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-blue-600" onClick={() => scrollToSection('contact')}>
          <Phone size={24} />
          <span className="text-[10px] font-medium">Contact</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-blue-600" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
          <span className="text-[10px] font-medium">Menu</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[110] lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[120] lg:hidden pb-safe max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Menu</h3>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {['About', 'Domestic', 'International', 'Why Us', 'Contact'].map((item) => (
                    <button 
                      key={item} 
                      onClick={() => {
                        scrollToSection(item.toLowerCase().replace(' ', ''));
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
                    >
                      {item}
                    </button>
                  ))}
                  <div className="flex flex-col gap-4 pt-4">
                    <a href="tel:+918017559717" className="flex items-center gap-3 text-slate-900 font-bold p-3 bg-blue-50 rounded-xl">
                      <Phone size={20} className="text-blue-600" /> +91 8017559717
                    </a>
                    <a href="https://wa.me/918240747501" className="flex items-center gap-3 text-slate-900 font-bold p-3 bg-green-50 rounded-xl">
                      <MessageCircle size={20} className="text-green-600" /> WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
