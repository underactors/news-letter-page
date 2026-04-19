import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, BookOpen, Quote, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Welcome to The Signal.",
        description: "Your first issue will arrive this Sunday.",
      });
      setEmail('');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-brand-ink selection:text-brand-paper">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference px-6 py-6 md:px-12 flex justify-between items-center">
        <div className="font-serif text-2xl font-bold tracking-tighter text-brand-paper">The Signal.</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-brand-paper">
          <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#issues" className="hover:opacity-70 transition-opacity">Past Issues</a>
          <a href="#manifesto" className="hover:opacity-70 transition-opacity">Manifesto</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 pt-20 pb-12">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 border border-brand-ink/20 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest text-brand-ink/70">
              <Award className="w-3.5 h-3.5" />
              <span>Read by 45,000+ curious minds</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.95] text-brand-ink mb-8">
              A weekly digest<br />
              <span className="italic text-brand-ink/80">for the insatiably</span><br />
              curious.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-brand-ink/70 max-w-xl mb-12 font-sans leading-relaxed">
              Every Sunday morning, we send a deeply researched, beautifully crafted letter exploring the intersection of culture, technology, and philosophy. No noise. Just signal.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="w-full max-w-md">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Your best email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting || isSuccess}
                  className="h-14 rounded-none border-brand-ink/30 bg-transparent text-base focus-visible:ring-brand-ink focus-visible:border-brand-ink placeholder:text-brand-ink/40"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting || isSuccess}
                  className="h-14 rounded-none px-8 bg-brand-ink text-brand-paper hover:bg-brand-ink/90 font-medium text-base min-w-[140px]"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Subscribing...</span>
                  ) : isSuccess ? (
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Subscribed</span>
                  ) : (
                    <span className="flex items-center gap-2">Join Free <ArrowRight className="w-4 h-4" /></span>
                  )}
                </Button>
              </form>
              <p className="text-xs text-brand-ink/50 mt-4 flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> Reads in 5 minutes. Unsubscribe anytime.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-5 relative h-[50vh] lg:h-[80vh] w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-brand-ink/5 mix-blend-multiply" />
            <img 
              src="/images/hero-abstract.png" 
              alt="Abstract ink flowing" 
              className="w-full h-full object-cover object-center border border-brand-ink/10 shadow-2xl grayscale-[20%] contrast-125"
            />
            
            {/* Floating testimonial */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-brand-paper p-6 border border-brand-ink/10 shadow-xl max-w-xs z-20">
              <Quote className="w-6 h-6 text-brand-accent mb-3 opacity-50" />
              <p className="font-serif italic text-brand-ink/90 mb-3 text-sm md:text-base leading-snug">
                "The only newsletter I actively look forward to reading. It feels like receiving a letter from a brilliant friend."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-ink/10 flex items-center justify-center font-serif text-xs font-bold text-brand-ink">ES</div>
                <div className="text-xs">
                  <p className="font-bold text-brand-ink">Elena S.</p>
                  <p className="text-brand-ink/60">Creative Director</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Logos */}
      <section className="py-16 md:py-24 border-y border-brand-ink/10 bg-brand-ink/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-ink/40 mb-10">Read by thinkers at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
            <span className="font-serif text-xl md:text-2xl font-bold">The Atlantic</span>
            <span className="font-serif text-xl md:text-2xl font-bold">WIRED</span>
            <span className="font-serif text-xl md:text-2xl font-bold">Stanford</span>
            <span className="font-serif text-xl md:text-2xl font-bold">Figma</span>
            <span className="font-serif text-xl md:text-2xl font-bold">Pentagram</span>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          <motion.div variants={fadeInUp} className="flex flex-col">
            <div className="w-12 h-12 rounded-none border border-brand-ink flex items-center justify-center mb-6">
              <span className="font-serif italic text-xl">01</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-4 text-brand-ink">Deeply Researched</h3>
            <p className="text-brand-ink/70 leading-relaxed">We read the papers, books, and long-form essays so you don't have to. Every issue distills hours of reading into a concise, elegant 5-minute digest.</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex flex-col">
            <div className="w-12 h-12 rounded-none border border-brand-ink flex items-center justify-center mb-6 bg-brand-ink text-brand-paper">
              <span className="font-serif italic text-xl">02</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-4 text-brand-ink">Beautifully Crafted</h3>
            <p className="text-brand-ink/70 leading-relaxed">Typography, pacing, and whitespace matter. We design our emails with the same care as a premium print magazine. A visual reset for your inbox.</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex flex-col">
            <div className="w-12 h-12 rounded-none border border-brand-ink flex items-center justify-center mb-6">
              <span className="font-serif italic text-xl">03</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-4 text-brand-ink">Intellectually Honest</h3>
            <p className="text-brand-ink/70 leading-relaxed">No hot takes. No clickbait. We explore timeless ideas rather than timely news, focusing on concepts that will still be relevant a decade from now.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Image & Manifesto */}
      <section id="manifesto" className="py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[60vh] lg:h-auto min-h-[600px] relative">
            <img 
              src="/images/magazine-stack.png" 
              alt="Magazines" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
            />
          </div>
          <div className="bg-brand-ink text-brand-paper p-12 md:p-24 flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-6xl font-medium leading-tight mb-8">
              We believe in <span className="italic text-brand-paper/70">slow consumption</span> in a fast world.
            </h2>
            <div className="space-y-6 text-brand-paper/80 text-lg font-light leading-relaxed max-w-xl">
              <p>
                The internet is a firehose of information, but there's a drought of meaning. We are drowning in context-free data, hot takes, and algorithmic noise designed to fracture our attention.
              </p>
              <p>
                The Signal is our antidote. We curate the quiet, profound, and enduring ideas hidden beneath the surface. We write for those who still appreciate the texture of a well-crafted sentence and the depth of a fully formed thought.
              </p>
              <p className="pt-4 font-serif italic text-2xl text-brand-paper">
                "Read less. Think more."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Issues Preview */}
      <section id="issues" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-brand-ink mb-4">Inside the Archive</h2>
            <p className="text-brand-ink/60 text-lg max-w-md">A glimpse into the topics we explore every week. Join to read the full archive.</p>
          </div>
          <Button variant="outline" className="rounded-none border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-brand-paper h-12 px-6">
            View All Issues
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              issue: "Issue No. 42",
              title: "The Architecture of Memory",
              desc: "How physical spaces shape our ability to remember, and why digital environments make us forgetful.",
              date: "Oct 12"
            },
            {
              issue: "Issue No. 41",
              title: "In Praise of Shadows",
              desc: "A modern reading of Tanizaki's essay on aesthetics, applied to user interface design.",
              date: "Oct 05"
            },
            {
              issue: "Issue No. 40",
              title: "The End of Average",
              desc: "Why designing for the mathematical middle guarantees failure in complex systems.",
              date: "Sep 28"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group border border-brand-ink/10 p-8 hover:bg-brand-ink/5 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest uppercase text-brand-ink/50">{item.issue}</span>
                <span className="text-xs text-brand-ink/40">{item.date}</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3 text-brand-ink group-hover:text-brand-accent transition-colors">{item.title}</h3>
              <p className="text-brand-ink/70 text-sm leading-relaxed mb-8">{item.desc}</p>
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-brand-ink group-hover:text-brand-accent transition-colors">
                Read Extract <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 md:px-12 bg-brand-paper border-t border-brand-ink/10 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[1px] border-brand-ink/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[1px] border-brand-ink/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-[1px] border-brand-ink/5 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <BookOpen className="w-10 h-10 mx-auto text-brand-ink/30 mb-8" />
          <h2 className="font-serif text-5xl md:text-7xl font-medium text-brand-ink mb-8 leading-tight">
            Ready to elevate your Sunday?
          </h2>
          <p className="text-xl text-brand-ink/70 mb-12 max-w-xl mx-auto">
            Join 45,000+ readers who start their week with clarity, insight, and beautiful design.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto justify-center">
            <Input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || isSuccess}
              className="h-14 rounded-none border-brand-ink/30 bg-white text-base focus-visible:ring-brand-ink focus-visible:border-brand-ink"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className="h-14 rounded-none px-8 bg-brand-ink text-brand-paper hover:bg-brand-ink/90 font-medium text-base min-w-[140px]"
            >
              {isSubmitting ? (
                "Subscribing..."
              ) : isSuccess ? (
                "Subscribed"
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-brand-ink/10 bg-brand-paper text-center text-sm text-brand-ink/50">
        <div className="font-serif text-xl font-bold text-brand-ink/30 mb-6">The Signal.</div>
        <div className="flex justify-center gap-6 mb-6">
          <a href="#" className="hover:text-brand-ink transition-colors">Twitter</a>
          <a href="#" className="hover:text-brand-ink transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-ink transition-colors">Archive</a>
          <a href="#" className="hover:text-brand-ink transition-colors">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} The Signal Publication. All rights reserved.</p>
      </footer>
    </div>
  );
}
