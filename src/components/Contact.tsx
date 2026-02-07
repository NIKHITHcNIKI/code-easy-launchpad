import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Mail, Phone, Send, MessageCircle, Clock } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', course: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Join Us Today</h2>
          <p className="section-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Course Interest</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="">Select a course</option>
                    <optgroup label="For School Students">
                      <option value="robotics">Robotics</option>
                      <option value="coding-kids">Coding (Scratch/Python)</option>
                      <option value="pcmb">PCMB Tuition</option>
                      <option value="competitive">Competitive Exam Coaching</option>
                      <option value="summer-camp">Summer Camps</option>
                    </optgroup>
                    <optgroup label="For College & Graduates">
                      <option value="web-dev">Programming & Web Development</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="software-testing">Software Testing</option>
                      <option value="cloud">Cloud Computing</option>
                      <option value="excel-tally">Advanced Excel & Tally</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell us about your learning goals..."
                />
              </div>

              <motion.button
                type="submit"
                className="btn-hero-primary w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <MessageCircle className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </a>

              <a
                href="mailto:info@codeeasy.in"
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-muted-foreground">info@codeeasy.in</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Visit Us</p>
                  <p className="text-muted-foreground">Tumkur, Karnataka, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Working Hours</p>
                  <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124442.81699799426!2d77.03419961640623!3d13.340881899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb02e9d8c5af1e9%3A0x7f4b4ddd7f4c4d4c!2sTumakuru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;