import React from 'react';
import { Layers, LineChart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const ProblemSolution: React.FC = () => {
  const benefits = [
    {
      title: 'Less manual work',
      description: 'Delegate repetitive business operations, inventory purchasing, and client follow-ups to specialised AI agents.',
      icon: Layers,
      index: '01'
    },
    {
      title: 'Smarter decisions',
      description: 'Let AI continuous intelligence analyse financial outflows, spot unit economics trends, and recommend improvements.',
      icon: LineChart,
      index: '02'
    },
    {
      title: 'More control',
      description: 'Set deterministic budgets, access permissions, and spend ceilings while retaining absolute authority on NEAR Protocol.',
      icon: ShieldCheck,
      index: '03'
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#F6F4EE] border-b border-[#E5E0D3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E0D3] text-xs font-mono uppercase tracking-widest text-[#2C2C2C] mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#00EC97]" />
            <span>THE OPERATIONAL SHIFT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight mb-5 font-display">
            Running a business shouldn't mean doing everything yourself.
          </h2>
          <p className="text-base sm:text-lg text-[#383838] leading-relaxed">
            From customer management to payments and daily operations, business owners spend too much time managing repetitive tasks. RunOva changes that.
          </p>
        </motion.div>

        {/* 3 Simple Benefit Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="p-8 border border-[#E5E0D3] bg-white hover:border-[#111111] transition-all rounded-3xl flex flex-col justify-between group cursor-default shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl border border-[#E5E0D3] bg-[#F6F4EE] group-hover:border-[#111111] group-hover:bg-[#111111] transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#111111] group-hover:text-[#00EC97] transition-colors" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#555555] bg-[#F6F4EE] px-2.5 py-1 rounded-full border border-[#E5E0D3]">
                      {b.index}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#111111] mb-3 font-display">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#383838] leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5E0D3] flex items-center justify-between text-xs font-mono text-[#555555]">
                  <span>AUTONOMOUS WORKFLOW</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00EC97] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
