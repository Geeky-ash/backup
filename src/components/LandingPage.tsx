import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Container,
  HeroWrapper,
  HeroTitle,
  HeroSubtitle,
  Button,
  AboutWrapper,
  AboutTitle,
  AboutDescription,
  FeatureCard,
} from './LandingPageStyles';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Component (redirect to /login)
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    navigate('/login');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a GSAP timeline for the hero section
      const tl = gsap.timeline();

      // Simulate SplitText by animating individual words in the title
      const title = heroRef.current?.querySelector('.hero-title');
      if (title) {
        const words = title.textContent?.split(' ') || [];
        title.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

        tl.fromTo(
          '.word',
          { opacity: 0, y: 50, rotate: 10 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
          }
        );
      }

      // Animate the subtitle
      tl.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.5' // Overlap with the previous animation
      );

      // Animate the button with a bounce effect
      tl.fromTo(
        '.hero-button',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <HeroWrapper ref={heroRef}>
      <HeroTitle className="hero-title">Revolutionizing HealthCare Sector</HeroTitle>
      <HeroSubtitle className="hero-subtitle">
        Manage appointments and patient queues effortlessly with MediQueue.
      </HeroSubtitle>
      <Button className="hero-button" onClick={handleGetStarted}>
        Get Started
      </Button>
    </HeroWrapper>
  );
};

// About MediQueue Component
const AboutMediQueue: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the About section while scrolling
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top 20%',
        end: '+=300', // Pin for 300px of scrolling
        pin: true,
        pinSpacing: false,
      });

      // Animate the About section
      gsap.fromTo(
        '.about-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-title',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.about-description',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-description',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate feature cards with stagger on scroll
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Add hover effects to feature cards
      const cards = aboutRef.current?.querySelectorAll('.feature-card');
      cards?.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <AboutWrapper ref={aboutRef}>
      <AboutTitle className="about-title">About MediQueue</AboutTitle>
      <AboutDescription className="about-description">
        MediQueue is a cutting-edge management system designed to streamline patient management for both hospitals and patients. With advanced predictive analytics, MediQueue helps hospitals anticipate patient inflow, ensuring efficient resource allocation and reduced waiting times.
      </AboutDescription>
      <div className="features-grid">
        <FeatureCard className="feature-card">
          <h3>Live Patient Queue</h3>
          <p>
            Patients can view real-time queue updates, making their hospital visits smoother and more predictable. Get instant notifications about your position in the queue and estimated wait times.
          </p>
          <p className="additional-info">
            <strong>Additional Benefit:</strong> Reduces patient anxiety by providing transparency and allows for better time management during hospital visits.
          </p>
        </FeatureCard>
        <FeatureCard className="feature-card">
          <h3>Inventory Management for Hospitals</h3>
          <p>
            Hospital staff gain access to detailed inventory insights, ensuring critical supplies are always available. Track stock levels, expiration dates, and usage patterns in real-time.
          </p>
          <p className="additional-info">
            <strong>Additional Benefit:</strong> Prevents shortages of essential medical supplies and optimizes procurement processes for cost efficiency.
          </p>
        </FeatureCard>
        <FeatureCard className="feature-card">
          <h3>Inter-Hospital Communication</h3>
          <p>
            MediQueue enables various hospitals to communicate and collaborate, sharing resources and fulfilling requirements seamlessly. Request or offer equipment, staff, or beds during emergencies.
          </p>
          <p className="additional-info">
            <strong>Additional Benefit:</strong> Enhances regional healthcare coordination and ensures no hospital is overwhelmed during peak times.
          </p>
        </FeatureCard>
        <FeatureCard className="feature-card">
          <h3>Focused on Both Hospitals and Patients</h3>
          <p>
            Whether you're a healthcare provider or a patient, MediQueue is designed to enhance your experience with intuitive features. Hospitals benefit from streamlined operations, while patients enjoy a hassle-free experience.
          </p>
          <p className="additional-info">
            <strong>Additional Benefit:</strong> Bridges the gap between healthcare providers and patients, fostering trust and improving overall satisfaction.
          </p>
        </FeatureCard>
      </div>
    </AboutWrapper>
  );
};

// Home Page Component (for the "/" route)
export const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on particles
      gsap.to('.particle', {
        y: (i, target) => {
          // Different speeds for each particle based on index
          return (target.offsetTop * 0.5) * (i % 2 === 0 ? 1 : -1);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, // Smoothly syncs with scroll
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  console.log('HomePage rendering');
  return (
    <Container ref={containerRef}>
      <div className="particles-wrapper">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>
      <Hero />
      <AboutMediQueue />
    </Container>
  );
};