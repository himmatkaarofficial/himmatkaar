"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Software Engineer at Tech Corp",
    location: "Karachi",
    image: "/himmatkaar-logo.jpg",
    text: "HimmatKaar transformed my career. The fellowship taught me not just technical skills, but how to think critically and communicate effectively. Within 2 months of completing the program, I landed my dream job at a leading tech company!",
    rating: 5
  },
  {
    name: "Fatima Ali",
    role: "Marketing Manager",
    location: "Lahore",
    image: "/himmatkaar-logo.jpg",
    text: "The confidence I gained through HimmatKaar is invaluable. The public speaking sessions and resume workshops prepared me for real-world challenges. I'm now leading a team of 10 people and couldn't be happier!",
    rating: 5
  },
  {
    name: "Hassan Raza",
    role: "Data Analyst",
    location: "Islamabad",
    image: "/himmatkaar-logo.jpg",
    text: "Coming from a small town, I never thought I could compete with city students. HimmatKaar showed me that with the right mindset and skills, anything is possible. The mentorship and community support were incredible. Forever grateful!",
    rating: 5
  },
  {
    name: "Ayesha Malik",
    role: "Product Designer",
    location: "Faisalabad",
    image: "/himmatkaar-logo.jpg",
    text: "The fellowship's focus on lifelong learning changed my perspective. I learned how to learn, which has been crucial in my fast-paced design career. The skills I gained are applicable to every aspect of my professional life.",
    rating: 5
  },
  {
    name: "Ali Hussain",
    role: "Business Analyst",
    location: "Multan",
    image: "/himmatkaar-logo.jpg",
    text: "HimmatKaar didn't just teach me skills; it gave me a community of like-minded individuals. The networking opportunities and peer learning were as valuable as the formal curriculum. Highly recommend to everyone!",
    rating: 5
  },
  {
    name: "Sara Ahmed",
    role: "HR Specialist",
    location: "Peshawar",
    image: "/himmatkaar-logo.jpg",
    text: "The interview preparation and professional communication modules were game-changers. I went from being nervous in interviews to confidently presenting myself. Got multiple job offers within weeks of graduation!",
    rating: 5
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-[#08170d] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="glow-green-orb w-[450px] h-[450px] -top-20 right-10 opacity-20" />

      <Navbar />

      <main className="pt-20 flex-grow">

        {/* Hero */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative z-10 border-b border-[#1a3a24]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="annotation-curly">&#123; Community Voices &#125;</span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]"
              >
                Success{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Stories!
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg lg:text-xl text-[#8ea896] max-w-2xl mx-auto leading-relaxed font-normal"
              >
                Hear from our incredible fellows who have transformed their careers and lives through the HimmatKaar experience.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Carousel area */}
        <section className="py-12 px-4 sm:px-6 relative z-20 border-b border-[#1a3a24]">
          <div className="max-w-6xl mx-auto">
            <TestimonialCarousel />
          </div>
        </section>

        {/* Grid Testimonials */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1a3a24]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <span className="annotation-curly mb-3 inline-block">&#123; Fellow Testimonials &#125;</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
                More Voices From{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Our Fellows!
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#8ea896] max-w-xl font-normal">Discover the diverse experiences of our growing community across Pakistan.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-[#0e2417] rounded-xl p-6 sm:p-8 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <Quote className="text-[#0ae448]/40 w-8 h-8" />
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="text-[#0ae448] fill-[#0ae448]" size={14} />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm sm:text-base text-[#8ea896] mb-8 leading-relaxed font-normal group-hover:text-white transition-colors">
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-[#1a3a24]">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#1a3a24] relative shrink-0">
                      <Image 
                        src={testimonial.image} 
                        alt={`${testimonial.name} - ${testimonial.role} from ${testimonial.location}`}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full" 
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                      <p className="text-[11px] font-mono text-[#0ae448] uppercase tracking-wider">{testimonial.role}</p>
                      <p className="text-[10px] text-[#8ea896] font-mono">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats / Satisfaction section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <span className="annotation-curly mb-3 inline-block">&#123; Difference &#125;</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-14 tracking-tight">
              The HimmatKaar{" "}
              <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                Difference!
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { number: "92%", label: "Would Recommend to a Friend" },
                { number: "88%", label: "Fellowship Completion Rate" },
                { number: "95%", label: "Overall Satisfaction Score" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#0e2417] rounded-xl p-8 sm:p-10 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300"
                >
                  <div className="text-4xl sm:text-6xl font-bold text-[#0ae448] mb-3 font-mono">{stat.number}</div>
                  <div className="text-sm font-mono text-[#8ea896] uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}



