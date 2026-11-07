import React, { useState } from 'react';
import { X, Check, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { RunOvaLogo } from '../RunOvaLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', company: '', message: '' });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-white border border-[#E5E0D3] rounded-3xl p-6 sm:p-8 relative text-[#111111] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#383838] hover:text-[#111111] transition-colors focus:outline-none focus:ring-1 focus:ring-[#111111] cursor-pointer rounded-full hover:bg-[#F6F4EE]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <div className="mb-4">
                <RunOvaLogo variant="lockup" size="md" />
              </div>
              <div className="flex items-center gap-2 text-xs text-[#383838] font-mono uppercase tracking-wider mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00EC97]" />
                <span>ENTERPRISE INQUIRY</span>
              </div>
              <h2 id="contact-modal-title" className="text-2xl font-bold tracking-tight text-[#111111]">
                Connect with RunOva
              </h2>
              <p className="text-sm text-[#383838] mt-1">
                Discuss deployment architecture, enterprise governance limits, or tailored agent integrations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Elena Rostova"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F3] border border-[#E5E0D3] text-[#111111] rounded-xl focus:outline-none focus:border-[#111111] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@enterprise.io"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F3] border border-[#E5E0D3] text-[#111111] rounded-xl focus:outline-none focus:border-[#111111] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Apex Retail Group"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F3] border border-[#E5E0D3] text-[#111111] rounded-xl focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
                  Operational Needs *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your primary operational bottlenecks or financial automation requirements..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F3] border border-[#E5E0D3] text-[#111111] rounded-xl focus:outline-none focus:border-[#111111] resize-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-xs font-medium bg-[#111111] text-white hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50 rounded-full cursor-pointer shadow-sm hover:shadow-md"
                >
                  {isSubmitting ? (
                    'Transmitting request...'
                  ) : (
                    <>
                      Submit Operational Brief <Send className="w-3.5 h-3.5 text-[#00EC97]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-[#111111] text-[#00EC97] flex items-center justify-center rounded-2xl">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111111]">Inquiry Received</h3>
              <p className="text-sm text-[#383838] mt-1 max-w-sm mx-auto">
                Thank you, {formData.name}. Our systems engineering team will review your business operational profile and respond within one business day.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-xs font-medium bg-[#111111] text-white hover:bg-black transition-colors rounded-full cursor-pointer shadow-sm hover:shadow-md"
            >
              Return to Website
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

