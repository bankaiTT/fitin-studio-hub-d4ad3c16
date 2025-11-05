import { Instagram, Youtube, Twitter, Send, MessageCircle } from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Programs', href: '/programs' },
      { name: 'Trainers', href: '/trainers' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'FAQ', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Careers', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/fitin.india?igsh=MWszazJ6ajJ5Zzl0NQ==', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@fitin-l2e?si=kGXiQkDv565Mz_ki', label: 'YouTube' },
    { icon: Twitter, href: 'https://x.com/SINGHNIHAL32551?t=YX_YmBmzlj2jUn2jN3PgBw&s=09', label: 'X (Twitter)' },
    { icon: Send, href: 'https://t.me/fitIn71', label: 'Telegram' },
    { icon: MessageCircle, href: 'https://chat.whatsapp.com/KAd9qHJQJ100r9SZi3V3Xy?mode=wwt', label: 'WhatsApp' },
    { icon: MessageCircle, href: 'https://discord.gg/JCnCM5cVP', label: 'Discord' },
  ];

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="FitIn" className="h-16 w-auto" />
              <span className="text-5xl font-bebas text-primary tracking-wider">FitIn</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transform your body and life with personalized fitness programs, expert trainers,
              and a supportive community dedicated to your success.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 hover:shadow-lavender-glow transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} FitIn. All rights reserved. Built with passion for fitness excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
