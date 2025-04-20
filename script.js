document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links li a');
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');

  // Toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Close menu when a nav item is clicked
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
      
      // Update active nav item
      navItems.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Sticky navbar and scroll-to-top button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      if (navbar) navbar.classList.add('sticky');
      if (scrollTopBtn) scrollTopBtn.classList.add('show');
    } else {
      if (navbar) navbar.classList.remove('sticky');
      if (scrollTopBtn) scrollTopBtn.classList.remove('show');
    }
    
    // Update active nav item based on scroll position
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // Scroll to top button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Projects filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Gallery filtering
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Update active filter
      galleryFilters.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeLightbox = document.querySelector('.close-lightbox');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  let currentImageIndex = 0;
  let galleryImages = [];

  // Only proceed if gallery items exist
  if (galleryItems.length > 0 && lightbox) {
    // Open lightbox when gallery image is clicked
    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      const title = item.querySelector('h3')?.textContent || '';
      const desc = item.querySelector('p')?.textContent || '';
      
      if (img) {
        galleryImages.push({
          src: img.src,
          title: title,
          description: desc
        });
        
        item.addEventListener('click', function() {
          lightbox.style.display = 'flex';
          lightboxImg.src = img.src;
          lightboxCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
          currentImageIndex = index;
          document.body.style.overflow = 'hidden';
          
          setTimeout(() => {
            lightbox.style.opacity = '1';
          }, 10);
        });
      }
    });

    // Close lightbox
    if (closeLightbox) {
      closeLightbox.addEventListener('click', function() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
          lightbox.style.display = 'none';
          document.body.style.overflow = 'auto';
        }, 300);
      });
    }
    
    // Outside click to close lightbox
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox && closeLightbox) {
        closeLightbox.click();
      }
    });

    // Navigate through gallery images
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
      });
      
      nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
      });
    }
    
    function updateLightboxImage() {
      if (lightboxImg) {
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
          lightboxImg.src = galleryImages[currentImageIndex].src;
          if (lightboxCaption) {
            lightboxCaption.innerHTML = `<h3>${galleryImages[currentImageIndex].title}</h3>
                                       <p>${galleryImages[currentImageIndex].description}</p>`;
          }
          lightboxImg.style.opacity = '1';
        }, 200);
      }
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
      if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape' && closeLightbox) {
          closeLightbox.click();
        } else if (e.key === 'ArrowLeft' && prevBtn) {
          prevBtn.click();
        } else if (e.key === 'ArrowRight' && nextBtn) {
          nextBtn.click();
        }
      }
    });
  }

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const prevTestimonial = document.querySelector('.testimonial-prev');
  const nextTestimonial = document.querySelector('.testimonial-next');
  let currentSlide = 0;

  // Only proceed if testimonials exist
  if (testimonialSlides.length > 0) {
    // Show initial slide
    showTestimonial(currentSlide);

    function showTestimonial(index) {
      testimonialSlides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(50px)';
        slide.style.display = 'none';
      });
      
      testimonialDots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      testimonialSlides[index].style.display = 'block';
      if (testimonialDots[index]) testimonialDots[index].classList.add('active');
      
      setTimeout(() => {
        testimonialSlides[index].style.opacity = '1';
        testimonialSlides[index].style.transform = 'translateX(0)';
      }, 100);
    }

    // Next/prev testimonial buttons
    if (prevTestimonial && nextTestimonial) {
      prevTestimonial.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(currentSlide);
      });
      
      nextTestimonial.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showTestimonial(currentSlide);
      });
    }
    
    // Testimonial dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentSlide = index;
        showTestimonial(currentSlide);
      });
    });

    // Auto advance testimonials
    setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showTestimonial(currentSlide);
    }, 6000);
  }

  // Form validation and submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const subject = document.getElementById('subject')?.value || '';
      const message = document.getElementById('message')?.value || '';
      
      if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showFormMessage('Your message has been sent successfully!', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showFormMessage(message, type) {
    if (!contactForm) return;
    
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create and show new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    contactForm.appendChild(messageElement);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      messageElement.style.opacity = '0';
      setTimeout(() => {
        messageElement.remove();
      }, 300);
    }, 4000);
  }

  // Animation on scroll
  const animatedElements = document.querySelectorAll('.section-header, .about-image, .about-content, .timeline-item, .skills-category, .project-card, .experience-item, .contact-info, .contact-form');
  
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Fixed typing animation for hero text
  const greetingElement = document.querySelector('.greeting');
  if (greetingElement) {
    // Store the original content with HTML
    const originalContent = greetingElement.innerHTML;
    greetingElement.innerHTML = '';
    
    // Identify the parts of the greeting
    const prefix = "Hi, I'm ";
    const highlightedText = "Jahnavi";
    
    // Type the prefix first
    let prefixIndex = 0;
    function typePrefixText() {
      if (prefixIndex < prefix.length) {
        greetingElement.innerHTML += prefix[prefixIndex];
        prefixIndex++;
        setTimeout(typePrefixText, 100);
      } else {
        // After prefix is completed, add the highlighted name with the span
        const span = document.createElement('span');
        span.className = 'highlight';
        greetingElement.appendChild(span);
        
        // Type the highlighted name
        let nameIndex = 0;
        function typeHighlightedName() {
          if (nameIndex < highlightedText.length) {
            span.textContent += highlightedText[nameIndex];
            nameIndex++;
            setTimeout(typeHighlightedName, 100);
          }
        }
        typeHighlightedName();
      }
    }
    
    // Start the typing effect after a short delay
    setTimeout(typePrefixText, 500);
  }

  // Initialize any tooltips
  const tooltips = document.querySelectorAll('[data-tooltip]');
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('data-tooltip');
      const tip = document.createElement('div');
      tip.className = 'tooltip';
      tip.textContent = tooltipText;
      document.body.appendChild(tip);
      
      const rect = this.getBoundingClientRect();
      tip.style.top = `${rect.top - tip.offsetHeight - 10 + window.scrollY}px`;
      tip.style.left = `${rect.left + (rect.width / 2) - (tip.offsetWidth / 2)}px`;
      tip.style.opacity = '1';
      
      this.addEventListener('mouseleave', function() {
        tip.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(tip)) {
            document.body.removeChild(tip);
          }
        }, 300);
      });
    });
  });
  
  // Scroll Down Button
  const scrollDownBtn = document.querySelector('.scroll-indicator');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function() {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        window.scrollTo({
          top: aboutSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  }
});
 // Create floating particles
 const particlesContainers = document.querySelectorAll('.particles-container');
  
 particlesContainers.forEach(container => {
   for (let i = 0; i < 20; i++) {
     createParticle(container);
   }
 });
 
 function createParticle(container) {
   const particle = document.createElement('div');
   particle.classList.add('particle');
   
   // Random size between 3px and 8px
   const size = Math.random() * 5 + 3;
   particle.style.width = `${size}px`;
   particle.style.height = `${size}px`;
   
   // Random position
   particle.style.left = `${Math.random() * 100}%`;
   particle.style.top = `${Math.random() * 100}%`;
   
   // Random animation duration between 20s and 40s
   const duration = Math.random() * 20 + 20;
   particle.style.animation = `float-up ${duration}s infinite linear`;
   
   // Random delay so they don't all start at the same time
   particle.style.animationDelay = `${Math.random() * duration}s`;
   
   container.appendChild(particle);
 }