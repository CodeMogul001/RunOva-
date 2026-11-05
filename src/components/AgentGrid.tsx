import React from 'react';
import { 
  TrendingUp, 
  MessageSquareText, 
  Landmark, 
  PackageCheck, 
  BarChart3, 
  Cpu, 
  ArrowUpRight 
} from 'lucide-react';
import { motion } from 'motion/react';
import { AGENTS_DATA } from '../data/agents';
import { AgentInfo } from '../types';

interface AgentGridProps {
  onSelectAgent: (agent: AgentInfo) => void;
}

export const AgentGrid: React.FC<AgentGridProps> = ({ onSelectAgent }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return TrendingUp;
      case 'MessageSquareText':
        return MessageSquareText;
      case 'Landmark':
        return Landmark;
      case 'PackageCheck':
        return PackageCheck;
      case 'BarChart3':
        return BarChart3;
      case 'Cpu':
      default:
        return Cpu;
    }
  };

  return (
    <section id="workforce" className="py-20 sm:py-28 bg-white border-b border-[#EAEAEA] overflow-hidden">
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
            SPECIALISED AGENTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111] leading-tight mb-5">
            Meet your new workforce.
          </h2>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            A coordinated team of specialised AI agents working together to keep your business moving.
          </p>
        </motion.div>

        {/* 6 Minimal Agent Cards in 3-col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS_DATA.map((agent, index) => {
            const Icon = getIcon(agent.iconName);
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: '#111111' }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectAgent(agent)}
                className="p-8 border border-[#EAEAEA] bg-white transition-colors cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 border border-[#EAEAEA] bg-[#F7F7F7] group-hover:border-[#111111] group-hover:bg-[#111111] transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#111111] group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-mono text-xs text-[#666666]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#111111] mb-2 flex items-center justify-between">
                    <span>{agent.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#CCCCCC] group-hover:text-[#111111] transition-colors" />
                  </h3>

                  <p className="text-sm text-[#666666] leading-relaxed mb-6">
                    {agent.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F7F7F7] flex items-center justify-between text-xs font-mono text-[#666666]">
                  <span>Ceiling: {agent.maxAutonomyBudget}</span>
                  <span className="group-hover:text-[#111111] transition-colors">
                    Inspect rules &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
