import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Wrench,
  CheckCircle2,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Zap,
  Snowflake,
  Film
} from 'lucide-react';
import { Language } from '../../data/translations';
import { DEMO_IMAGES } from '../../constants/images';
import { createTelUrl } from '../../lib/utils';
import { ScrollReveal } from '../common/ScrollReveal';

export interface ServiceVideoItem {
  id: string;
  serviceId: string;
  title: string;
  adNumber: string;
  tag: string;
  badge: string;
  videoSrc: string;
  posterSrc: string;
  duration: string;
  description: string;
  bullets: string[];
  servicePrice: string;
}

interface ServiceVideoShowcaseProps {
  language: Language;
  onOpenBooking: (serviceId?: string) => void;
  title?: string;
  subtitle?: string;
}

export const ServiceVideoShowcase: React.FC<ServiceVideoShowcaseProps> = ({
  language,
  onOpenBooking,
  title,
  subtitle,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({
    'video-jet-wash': true,
    'video-gas-leak': true,
    'video-pcb-repair': true,
  });
  const [activeModalVideo, setActiveModalVideo] = useState<ServiceVideoItem | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const videoAds: ServiceVideoItem[] = [
    {
      id: 'video-jet-wash',
      serviceId: 'ac-general-service',
      adNumber: 'AD #1',
      title: language === 'roman' ? 'Deep Master Jet Wash (Waterproof Bag Service)' : 'Master Chemical Jet Wash Service',
      tag: 'Maintenance & Airflow',
      badge: 'Zero-Mess Wash',
      videoSrc: '/videos/ad_jet_wash.mp4',
      posterSrc: DEMO_IMAGES.jetWashService,
      duration: '0:07',
      description: language === 'roman'
        ? 'Deewar ya carpet par ek boond pani giray baghair waterproof service jacket laga kar indoor blower wheel aur cooling fins ki high pressure jet cleaning.'
        : 'Watch our zero-mess on-wall chemical jet wash using a high-pressure pump and protective jacket bag to restore 35% airflow velocity and eliminate sour odors.',
      bullets: language === 'roman'
        ? ['Waterproof catch jacket deewar par fit', 'Blower wheel se chiknahat aur mitti saaf', 'Indoor bacterial sanitization foam']
        : ['Waterproof catch bag wall shield', 'High-pressure blower wheel degrease', 'Antimicrobial fin foam sanitization'],
      servicePrice: language === 'roman' ? 'Starting Rs. 2,200 per unit' : 'Starting Rs. 2,200 per unit',
    },
    {
      id: 'video-gas-leak',
      serviceId: 'ac-cooling-issue',
      adNumber: 'AD #2',
      title: language === 'roman' ? '350 PSI Dry Nitrogen Leak Detection & Pure Gas Refill' : 'Precision Refrigerant Leak Detection',
      tag: 'Refrigerant & Pressure',
      badge: '350 PSI Nitrogen Test',
      videoSrc: '/videos/ad_gas_leak.mp4',
      posterSrc: DEMO_IMAGES.gasLeakRepair,
      duration: '0:07',
      description: language === 'roman'
        ? 'Tukkay se gas bharne k bajaye pehle dry nitrogen se micro leak trace kia jata hai, flare union brazing ki jati hai, aur digital scale par toal kar pure R410A/R32 gas grams me bhari jati hai.'
        : 'Never pay for blind gas top-ups. We pressurize with dry nitrogen at 350 PSI to pinpoint the exact flare leak before precision-charging on calibrated digital scales.',
      bullets: language === 'roman'
        ? ['Digital manifold gauge pressure check', '350 PSI dry nitrogen hold test', 'Digital scale par grams me pure gas']
        : ['Digital manifold 4-valve pressure testing', '350 PSI dry nitrogen hold test', 'Digital scale gram-accurate charging'],
      servicePrice: language === 'roman' ? 'Inspection adjusted in bill' : 'Inspection credited in bill',
    },
    {
      id: 'video-pcb-repair',
      serviceId: 'inverter-pcb-repair',
      adNumber: 'AD #3',
      title: language === 'roman' ? 'Inverter Motherboard PCB Lab Repair (E6/F1 Fixed)' : 'Inverter PCB Board Electronics Repair',
      tag: 'Electronics & Inverter Lab',
      badge: 'Component Level Lab',
      videoSrc: '/videos/ad_pcb_repair.mp4',
      posterSrc: DEMO_IMAGES.inverterPcbRepair,
      duration: '0:07',
      description: language === 'roman'
        ? 'Gree, Haier, Dawlance, Kenwood k E6, F1, P0 error codes aur breaker tripping ka component-level repair. Rs. 28,000 naye board k bajaye 50% kam kharche me 90 din warranty k sath fix.'
        : 'Our dedicated ESD electronics lab tests inverter IPM chips, current sensors, and microcontrollers on oscilloscopes, saving 50-70% compared to new motherboard replacement.',
      bullets: language === 'roman'
        ? ['Oscilloscope waveform & IPM testing', 'Power supply & capacitor replacement', '50% bachat + 90 din written warranty']
        : ['Oscilloscope IPM gate signal testing', 'Power supply capacitor micro-soldering', '50% savings with 90-day warranty'],
      servicePrice: language === 'roman' ? 'Half cost of new board' : '50% lower than new board',
    },
  ];

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      // Pause any other playing video
      Object.entries(videoRefs.current).forEach(([k, v]) => {
        if (k !== id && v && !v.paused) {
          v.pause();
        }
      });
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingId(id);
          })
          .catch(() => {
            // Browser prevented audio or aborted playback
            setPlayingId(null);
          });
      } else {
        setPlayingId(id);
      }
    } else {
      video.pause();
      setPlayingId(null);
    }
  };

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;
    video.muted = !video.muted;
    setMutedStates((prev) => ({ ...prev, [id]: video.muted }));
  };

  const openFullscreen = (item: ServiceVideoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModalVideo(item);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 animate-float-subtle">
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'roman' ? '3 Khasoosi Service Video Ads' : 'Featured 3 Service Video Ads'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              {title || (language === 'roman' ? 'ABC Air Care Ki Service Video Ads' : 'Watch Our Real Engineering Procedures in Action')}
            </h2>
            <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
              {subtitle || (language === 'roman'
                ? 'Dekhein hamare certified technicians kis tarah jet wash, gas leak isolation aur inverter PCB motherboards ko live anjaam dete hain.'
                : 'See how our technicians execute deep chemical jet washes, dry nitrogen leak tests, and component-level inverter board diagnostics in real field environments.')}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {videoAds.map((item, idx) => {
            const isPlaying = playingId === item.id;
            const isMuted = mutedStates[item.id] !== false;

            return (
              <ScrollReveal key={item.id} animation="fade-up" delay={idx * 120}>
                <div
                  className="bg-slate-800/90 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl card-interactive-cyber flex flex-col justify-between group h-full"
                >
                  <div>
                    {/* Video Player Container */}
                    <div
                      className="relative aspect-video w-full bg-slate-950 cursor-pointer overflow-hidden group/player"
                      onClick={() => togglePlay(item.id)}
                      data-testid={`video-card-${item.id}`}
                    >
                      <video
                        ref={(el) => {
                          videoRefs.current[item.id] = el;
                        }}
                        src={item.videoSrc}
                        poster={item.posterSrc}
                        playsInline
                        loop
                        muted={isMuted}
                        onPlay={() => setPlayingId(item.id)}
                        onPause={() => setPlayingId((prev) => (prev === item.id ? null : prev))}
                        onEnded={() => setPlayingId(null)}
                        className="w-full h-full object-cover group-hover/player:scale-105 transition-transform duration-500"
                      />

                      {/* Dark gradient overlay for title legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none"></div>

                      {/* Top Ad Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                        <span className="px-2.5 py-0.5 bg-cyan-500 text-slate-950 text-[10px] font-extrabold rounded-full uppercase tracking-wider shadow-md">
                          {item.adNumber}
                        </span>
                        <span className="px-2.5 py-0.5 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold rounded-full border border-slate-700">
                          {item.badge}
                        </span>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-900/85 backdrop-blur-md text-cyan-300 text-[10px] font-mono font-bold rounded-md border border-slate-700 pointer-events-none">
                        {item.duration} HD
                      </div>

                      {/* Center Big Play/Pause Button */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <button
                          type="button"
                          aria-label={isPlaying ? 'Pause video' : 'Play video'}
                          data-testid={`play-btn-${item.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay(item.id);
                          }}
                          className={`btn-animated btn-glow-cyan w-14 h-14 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center shadow-xl backdrop-blur-xs transition-all pointer-events-auto cursor-pointer ${
                            isPlaying ? 'opacity-0 hover:opacity-100 scale-90' : 'opacity-100 scale-100 pulse-ring-effect'
                          }`}
                        >
                          {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
                        </button>
                      </div>

                      {/* Bottom Video Controls Overlay */}
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white z-10 pointer-events-auto">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                            data-testid={`control-play-${item.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlay(item.id);
                            }}
                            className="btn-animated p-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white transition-colors cursor-pointer"
                          >
                            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            type="button"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                            data-testid={`control-mute-${item.id}`}
                            onClick={(e) => toggleMute(item.id, e)}
                            className="btn-animated p-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white transition-colors cursor-pointer"
                            title={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                          </button>
                        </div>

                        <button
                          type="button"
                          data-testid={`theatre-${item.id}`}
                          onClick={(e) => openFullscreen(item, e)}
                          className="btn-animated p-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white transition-colors cursor-pointer"
                          title="Theatre Mode"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                        {item.tag}
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-white font-display">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-700/80">
                      {item.bullets.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="p-4 bg-slate-900/80 border-t border-slate-700 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    <span className="text-cyan-400 font-bold">{item.servicePrice}</span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(item.serviceId)}
                    className="btn-animated btn-glow-cyan px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md group cursor-pointer"
                  >
                    <span>{language === 'roman' ? 'Yeh Service Book Karein' : 'Book Service'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
            );
          })}
        </div>

        {/* Quick Phone Callout with ScrollReveal */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 card-interactive">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                {language === 'roman'
                  ? 'Videos me dikhaya gaya tamam protocol hamare certified technicians on-site follow karte hain.'
                  : 'All procedures shown above are executed with strict adherence to factory vacuum and pressure specifications.'}
              </span>
            </div>

            <a
              href={createTelUrl('+923463902834')}
              className="btn-animated btn-glow-dark px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 shrink-0 group"
            >
              <Phone className="w-4 h-4 group-hover-phone-wobble transition-transform" />
              <span>Direct Hotline: 0346 3902834</span>
            </a>
          </div>
        </ScrollReveal>

      </div>

      {/* Theatre Modal for Fullscreen Watching */}
      {activeModalVideo && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl space-y-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-cyan-600 text-slate-950 text-xs font-bold rounded-full">
                  {activeModalVideo.adNumber}
                </span>
                <h3 className="font-bold text-white text-base font-display">
                  {activeModalVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <video
                src={activeModalVideo.videoSrc}
                poster={activeModalVideo.posterSrc}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-300">
                {activeModalVideo.description}
              </p>

              <button
                onClick={() => {
                  const sid = activeModalVideo.serviceId;
                  setActiveModalVideo(null);
                  onOpenBooking(sid);
                }}
                className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
              >
                <span>{language === 'roman' ? 'Abhi Technician Bulayein' : 'Book This Service'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
