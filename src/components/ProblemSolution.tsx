import React from 'react';
import { Layers, LineChart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const ProblemSolution: React.FC = () => {
  const benefits = [
    {
      title: 'Less manual work',
      description: 'Delegate repetitive business operations to specialised AI agents.',
      icon: Layers,
      index: '01'
    },
    {
      title: 'Smarter decisions',
      description: 'Let AI analyse business activities and recommend operational improvements.',
      icon: LineChart,
      index: '02'
    },
    {
      title: 'More control',
      description: 'Set budgets, permissions and rules while maintaining ultimate authority over your business.',
      icon: ShieldCheck,
      index: '03'
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white border-b border-[#EAEAEA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#666666] mb-3">
            THE OPERATIONAL SHIFT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111] leading-tight mb-5">
            Running a business shouldn't mean doing everything yourself.
          </h2>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
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
                className="p-8 border border-[#EAEAEA] bg-white hover:border-[#111111] transition-colors flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 border border-[#EAEAEA] bg-[#F7F7F7] group-hover:border-[#111111] group-hover:bg-[#111111] transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#111111] group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-mono text-xs text-[#666666]">{b.index}</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#111111] mb-3">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-[#F7F7F7] flex items-center text-xs font-mono text-[#666666] group-hover:text-[#111111] transition-colors">
                  <span>AUTONOMOUS WORKFLOW</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

