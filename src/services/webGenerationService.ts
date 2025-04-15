
// This is a mock service that simulates AI-generated web code
// In a real implementation, this would connect to an API or local model

interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

const mockTemplates = {
  default: {
    html: `<header>
  <nav>
    <div class="logo">Website Name</div>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button class="mobile-menu-button">Menu</button>
  </nav>
</header>

<main>
  <section id="home" class="hero">
    <div class="hero-content">
      <h1>Welcome to Our Website</h1>
      <p>Your vision, our expertise - creating beautiful web experiences together.</p>
      <button class="cta-button">Get Started</button>
    </div>
  </section>

  <section id="about" class="about">
    <h2>About Us</h2>
    <div class="about-content">
      <div class="about-text">
        <p>We are a team of passionate developers dedicated to creating amazing web experiences. With years of experience in the industry, we bring your ideas to life.</p>
      </div>
      <div class="about-image">
        <div class="image-placeholder">Image</div>
      </div>
    </div>
  </section>

  <section id="services" class="services">
    <h2>Our Services</h2>
    <div class="services-grid">
      <div class="service-card">
        <h3>Web Design</h3>
        <p>Beautiful, responsive designs that look great on any device.</p>
      </div>
      <div class="service-card">
        <h3>Development</h3>
        <p>Clean, efficient code that brings your designs to life.</p>
      </div>
      <div class="service-card">
        <h3>SEO</h3>
        <p>Optimize your site to reach more customers.</p>
      </div>
    </div>
  </section>

  <section id="contact" class="contact">
    <h2>Contact Us</h2>
    <form class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Your name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Your email">
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" placeholder="Your message"></textarea>
      </div>
      <button type="submit" class="submit-button">Send Message</button>
    </form>
  </section>
</main>

<footer>
  <div class="footer-content">
    <div class="footer-logo">Website Name</div>
    <p>© 2025 Your Company. All rights reserved.</p>
  </div>
</footer>`,
    css: `/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Layout */
header, section, footer {
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Typography */
h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
}

/* Navigation */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #5865F2;
}

nav ul {
  display: flex;
  list-style: none;
}

nav li {
  margin-left: 2rem;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover {
  color: #5865F2;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

/* Hero Section */
.hero {
  background-color: #f9f9f9;
  padding: 5rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-button {
  display: inline-block;
  background-color: #5865F2;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1.5rem;
}

.cta-button:hover {
  background-color: #4752c4;
}

/* About Section */
.about {
  padding: 5rem 2rem;
}

.about-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.about-text {
  flex: 1;
  min-width: 300px;
}

.about-image {
  flex: 1;
  min-width: 300px;
}

.image-placeholder {
  background-color: #eee;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #999;
}

/* Services Section */
.services {
  padding: 5rem 2rem;
  background-color: #f9f9f9;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.service-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Contact Section */
.contact {
  padding: 5rem 2rem;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-button {
  background-color: #5865F2;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #4752c4;
}

/* Footer */
footer {
  background-color: #333;
  color: #fff;
  padding: 2rem;
  text-align: center;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  nav ul {
    display: none;
  }
  
  .mobile-menu-button {
    display: block;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.75rem;
  }
  
  .about-content, .services-grid {
    gap: 1.5rem;
  }
}`,
    js: `// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const navMenu = document.querySelector('nav ul');
  
  if (menuButton && navMenu) {
    menuButton.addEventListener('click', function() {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
          }
        }
      }
    });
  });
  
  // Form submission handler
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Simple validation
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill out all fields');
        return;
      }
      
      // In a real application, you would send the form data to a server here
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
});`,
  },
  landing: {
    html: `<div class="landing-page">
  <header>
    <div class="brand">Company Name</div>
    <nav>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#testimonials">Testimonials</a>
      <a href="#faq">FAQ</a>
    </nav>
    <div class="cta-header">
      <a href="#signup" class="button button-outline">Sign Up</a>
      <a href="#login" class="button button-primary">Login</a>
    </div>
    <button class="menu-toggle">☰</button>
  </header>

  <section class="hero">
    <div class="hero-content">
      <h1>Your Product Tagline Goes Here</h1>
      <p class="hero-subtitle">A brief description of your product and what problem it solves for your customers.</p>
      <div class="hero-cta">
        <a href="#getstarted" class="button button-primary">Get Started</a>
        <a href="#demo" class="button button-outline">Watch Demo</a>
      </div>
    </div>
    <div class="hero-image">
      <div class="placeholder">Product Image</div>
    </div>
  </section>

  <section id="features" class="features">
    <h2 class="section-title">Main Features</h2>
    <p class="section-subtitle">Here's what makes our product special</p>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>Secure</h3>
        <p>Enterprise-grade security to protect your data at all times.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Fast</h3>
        <p>Lightning-fast performance and response times under 100ms.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🌐</div>
        <h3>Scalable</h3>
        <p>Scales with your business from startups to enterprises.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🧩</div>
        <h3>Customizable</h3>
        <p>Tailor the experience to your specific needs and workflows.</p>
      </div>
    </div>
  </section>

  <section id="pricing" class="pricing">
    <h2 class="section-title">Simple Pricing</h2>
    <p class="section-subtitle">No hidden fees or complicated tiers</p>
    <div class="pricing-grid">
      <div class="pricing-card">
        <div class="pricing-header">
          <h3>Basic</h3>
          <div class="price">$9<span>/month</span></div>
        </div>
        <ul class="pricing-features">
          <li>Feature One</li>
          <li>Feature Two</li>
          <li>Feature Three</li>
        </ul>
        <a href="#basic" class="button button-outline button-block">Choose Basic</a>
      </div>
      <div class="pricing-card popular">
        <div class="popular-badge">Most Popular</div>
        <div class="pricing-header">
          <h3>Pro</h3>
          <div class="price">$19<span>/month</span></div>
        </div>
        <ul class="pricing-features">
          <li>All Basic Features</li>
          <li>Pro Feature One</li>
          <li>Pro Feature Two</li>
          <li>Pro Feature Three</li>
        </ul>
        <a href="#pro" class="button button-primary button-block">Choose Pro</a>
      </div>
      <div class="pricing-card">
        <div class="pricing-header">
          <h3>Enterprise</h3>
          <div class="price">$49<span>/month</span></div>
        </div>
        <ul class="pricing-features">
          <li>All Pro Features</li>
          <li>Enterprise Feature One</li>
          <li>Enterprise Feature Two</li>
          <li>Enterprise Feature Three</li>
          <li>Priority Support</li>
        </ul>
        <a href="#enterprise" class="button button-outline button-block">Choose Enterprise</a>
      </div>
    </div>
  </section>

  <section id="testimonials" class="testimonials">
    <h2 class="section-title">What Our Customers Say</h2>
    <div class="testimonials-grid">
      <div class="testimonial-card">
        <div class="testimonial-content">
          <p>"This product has transformed our workflow and increased productivity by 200%. Highly recommended!"</p>
        </div>
        <div class="testimonial-author">
          <div class="avatar">JD</div>
          <div class="author-info">
            <div class="author-name">Jane Doe</div>
            <div class="author-title">CEO, Company Inc.</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <div class="testimonial-content">
          <p>"We've been using this for 6 months now and it has revolutionized how we work. The customer support is excellent."</p>
        </div>
        <div class="testimonial-author">
          <div class="avatar">JS</div>
          <div class="author-info">
            <div class="author-name">John Smith</div>
            <div class="author-title">CTO, Tech Solutions</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <div class="testimonial-content">
          <p>"After trying several competitors, this product stands out for its ease of use and powerful features."</p>
        </div>
        <div class="testimonial-author">
          <div class="avatar">SC</div>
          <div class="author-info">
            <div class="author-name">Sarah Connor</div>
            <div class="author-title">Marketing Director</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="faq" class="faq">
    <h2 class="section-title">Frequently Asked Questions</h2>
    <div class="faq-grid">
      <div class="faq-item">
        <div class="faq-question">How do I get started?</div>
        <div class="faq-answer">Simply sign up for an account and follow our easy onboarding process. You'll be up and running in minutes.</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">Can I cancel my subscription?</div>
        <div class="faq-answer">Yes, you can cancel your subscription at any time. There are no long-term contracts or cancelation fees.</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">Is there a free trial available?</div>
        <div class="faq-answer">Yes, we offer a 14-day free trial on all plans. No credit card required.</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">Do you offer discounts for non-profits?</div>
        <div class="faq-answer">Yes, we offer special pricing for non-profit organizations. Please contact our sales team for details.</div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2>Ready to get started?</h2>
    <p>Join thousands of satisfied customers today</p>
    <a href="#signup" class="button button-primary button-large">Create Free Account</a>
  </section>

  <footer>
    <div class="footer-grid">
      <div class="footer-column">
        <div class="footer-brand">Company Name</div>
        <p class="footer-description">Your company's mission statement or brief description goes here.</p>
        <div class="social-links">
          <a href="#" class="social-link">FB</a>
          <a href="#" class="social-link">TW</a>
          <a href="#" class="social-link">IG</a>
          <a href="#" class="social-link">LI</a>
        </div>
      </div>
      <div class="footer-column">
        <h3>Product</h3>
        <ul class="footer-links">
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Testimonials</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Company</h3>
        <ul class="footer-links">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Legal</h3>
        <ul class="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Cookie Policy</a></li>
          <li><a href="#">GDPR</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Company Name. All rights reserved.</p>
    </div>
  </footer>
</div>`,
    css: `/* Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
}

a {
  text-decoration: none;
  color: #4f46e5;
}

ul {
  list-style: none;
}

section {
  padding: 5rem 2rem;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 3rem;
  font-size: 1.125rem;
}

/* Button Styles */
.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.button-primary {
  background-color: #4f46e5;
  color: white;
  border: 1px solid #4f46e5;
}

.button-primary:hover {
  background-color: #4338ca;
  border-color: #4338ca;
}

.button-outline {
  background-color: transparent;
  color: #4f46e5;
  border: 1px solid #4f46e5;
}

.button-outline:hover {
  background-color: rgba(79, 70, 229, 0.1);
}

.button-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.button-block {
  display: block;
  width: 100%;
}

/* Layout */
.landing-page {
  max-width: 100%;
  overflow-x: hidden;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4f46e5;
}

nav {
  display: flex;
  gap: 2rem;
}

nav a {
  color: #374151;
  font-weight: 500;
}

nav a:hover {
  color: #4f46e5;
}

.cta-header {
  display: flex;
  gap: 1rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #4f46e5;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 6rem 2rem;
  background-color: #f9fafb;
}

.hero-content {
  flex: 1;
}

.hero h1 {
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.hero-cta {
  display: flex;
  gap: 1rem;
}

.hero-image {
  flex: 1;
}

.placeholder {
  background-color: #e5e7eb;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  color: #9ca3af;
  font-weight: 500;
}

/* Features Section */
.features {
  background-color: #fff;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background-color: #f9fafb;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

/* Pricing Section */
.pricing {
  background-color: #f9fafb;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-card {
  background-color: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.pricing-header {
  padding: 2rem;
  background-color: #f9fafb;
  text-align: center;
}

.pricing-header h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 3rem;
  font-weight: 700;
  color: #4f46e5;
}

.price span {
  font-size: 1rem;
  font-weight: normal;
  color: #6b7280;
}

.pricing-features {
  padding: 2rem;
}

.pricing-features li {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
}

.pricing-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4f46e5;
}

.pricing-card .button {
  margin: 0 2rem 2rem;
}

.pricing-card.popular {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.popular-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-bottom-left-radius: 0.5rem;
}

/* Testimonials Section */
.testimonials {
  background-color: #fff;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: #f9fafb;
  padding: 2rem;
  border-radius: 0.5rem;
}

.testimonial-content {
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.author-name {
  font-weight: 600;
}

.author-title {
  font-size: 0.875rem;
  color: #6b7280;
}

/* FAQ Section */
.faq {
  background-color: #f9fafb;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.faq-item {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.faq-question {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #4f46e5;
}

/* CTA Section */
.cta-section {
  background-color: #4f46e5;
  color: white;
  text-align: center;
  padding: 5rem 2rem;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-section p {
  margin-bottom: 2rem;
  font-size: 1.25rem;
  opacity: 0.9;
}

.cta-section .button-primary {
  background-color: white;
  color: #4f46e5;
  border-color: white;
}

.cta-section .button-primary:hover {
  background-color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.9);
}

/* Footer */
footer {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 5rem 2rem 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.footer-brand {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer-description {
  opacity: 0.7;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: background-color 0.3s ease;
}

.social-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.footer-column h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #d1d5db;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.7;
  font-size: 0.875rem;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .hero h1 {
    font-size: 3rem;
  }
  
  .pricing-card.popular {
    transform: scale(1.03);
  }
}

@media (max-width: 768px) {
  nav, .cta-header {
    display: none;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .hero {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    padding: 4rem 2rem;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero-cta {
    justify-content: center;
  }
  
  .faq-grid {
    grid-template-columns: 1fr;
  }
  
  .pricing-card.popular {
    transform: none;
  }
}

@media (max-width: 640px) {
  .section-title {
    font-size: 2rem;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .cta-section h2 {
    font-size: 2rem;
  }
  
  .cta-section p {
    font-size: 1rem;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}`,
    js: `// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const nav = document.querySelector('nav');
      const ctaHeader = document.querySelector('.cta-header');
      
      if (nav) {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      }
      
      if (ctaHeader) {
        ctaHeader.style.display = ctaHeader.style.display === 'flex' ? 'none' : 'flex';
      }
    });
  }
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const targetId = href;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for the fixed header
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const nav = document.querySelector('nav');
          const ctaHeader = document.querySelector('.cta-header');
          
          if (window.innerWidth <= 768) {
            if (nav) nav.style.display = 'none';
            if (ctaHeader) ctaHeader.style.display = 'none';
          }
        }
      }
    });
  });
  
  // FAQ items toggle
  const faqItems = document.querySelectorAll('.faq-question');
  
  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isExpanded = this.classList.contains('expanded');
      
      // Reset all other expanded items
      document.querySelectorAll('.faq-question.expanded').forEach(expandedItem => {
        if (expandedItem !== this) {
          expandedItem.classList.remove('expanded');
          expandedItem.nextElementSibling.style.maxHeight = null;
        }
      });
      
      // Toggle current item
      if (!isExpanded) {
        this.classList.add('expanded');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        this.classList.remove('expanded');
        answer.style.maxHeight = null;
      }
    });
  });
  
  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .faq-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
});`,
  },
};

// Function to simulate AI-based code generation
// In a real app, this would connect to an API or local model
export const generateWebCode = async (prompt: string): Promise<GeneratedCode> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Simple keyword matching for different templates
      const lowercasePrompt = prompt.toLowerCase();
      
      if (lowercasePrompt.includes("landing") || 
          lowercasePrompt.includes("product") || 
          lowercasePrompt.includes("saas")) {
        resolve(mockTemplates.landing);
      } else {
        resolve(mockTemplates.default);
      }
    }, 1500);
  });
};
