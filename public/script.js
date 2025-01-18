document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Toggle mobile navigation
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        updateDarkModeIcon(isDarkMode);
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }

    function updateDarkModeIcon(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    // Animate on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        animateOnScroll.observe(el);
    });

    // Form submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    form.reset();
                    alert('Thank you for your message! I will get back to you soon.');
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Oops! There was a problem submitting your form. Please try again later.');
            })
            .finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
    });

    document.addEventListener('click', () => {
        cursor.classList.add('expand');
        setTimeout(() => {
            cursor.classList.remove('expand');
        }, 500);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });

    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero h2');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        setTimeout(typeWriter, 1000);
    }

    // Project filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Skill progress animation
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
            } else {
                testimonial.style.display = 'none';
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function previousTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    document.querySelector('.testimonial-next').addEventListener('click', nextTestimonial);
    document.querySelector('.testimonial-prev').addEventListener('click', previousTestimonial);

    showTestimonial(currentTestimonial);

    // Blog post preview
    const blogPosts = document.querySelectorAll('.blog-card');
    blogPosts.forEach(post => {
        const readMoreBtn = post.querySelector('.read-more');
        const excerpt = post.querySelector('.blog-excerpt');
        const fullContent = post.querySelector('.blog-full-content');

        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (excerpt.style.display !== 'none') {
                excerpt.style.display = 'none';
                fullContent.style.display = 'block';
                readMoreBtn.textContent = 'Read Less';
            } else {
                excerpt.style.display = 'block';
                fullContent.style.display = 'none';
                readMoreBtn.textContent = 'Read More';
            }
        });
    });

    // Load content from localStorage
    loadHeroContent();
    loadAboutContent();
    loadSkills();
    loadProjects();
    loadServices();
    loadBlogPosts();
    loadTestimonials();
    loadContactInfo();

    function loadHeroContent() {
        const heroData = JSON.parse(localStorage.getItem('heroData')) || {};
        const heroTitle = document.querySelector('.hero h1');
        const heroSubtitle = document.querySelector('.hero h2');
        if (heroTitle) heroTitle.textContent = heroData.title || 'Anakwe Tochukwu Emmanuel';
        if (heroSubtitle) heroSubtitle.textContent = heroData.subtitle || 'Frontend Developer & Founder of Emmy Tech';
    }

    function loadAboutContent() {
        const aboutData = JSON.parse(localStorage.getItem('aboutData')) || {};
        const aboutContent = document.querySelector('.about-text');
        const profilePicture = document.querySelector('.profile-picture');
        if (aboutContent) aboutContent.innerHTML = aboutData.content || '<p>Default about content...</p>';
        if (profilePicture) profilePicture.src = aboutData.image || 'https://placeholder.com/350';
    }

    function loadSkills() {
        const skills = JSON.parse(localStorage.getItem('skills')) || {};
        const skillsContainer = document.querySelector('.skills-container');
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            for (const category in skills) {
                const skillCategory = document.createElement('div');
                skillCategory.className = 'skill-category';
                skillCategory.innerHTML = `
                    <h3>${category}</h3>
                    <ul class="skill-list">
                        ${skills[category].map(skill => `<li><i class="fas fa-check"></i> ${skill}</li>`).join('')}
                    </ul>
                `;
                skillsContainer.appendChild(skillCategory);
            }
        }
    }

    function loadProjects() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const projectGrid = document.querySelector('.project-grid');
        if (projectGrid) {
            projectGrid.innerHTML = '';
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="${project.link}" class="project-link">View Project</a>
                            </div>
                        </div>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                `;
                projectGrid.appendChild(projectCard);
            });
        }
    }

    function loadServices() {
        const services = JSON.parse(localStorage.getItem('services')) || [];
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            servicesGrid.innerHTML = '';
            services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card';
                serviceCard.innerHTML = `
                    <i class="${service.icon}"></i>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                `;
                servicesGrid.appendChild(serviceCard);
            });
        }
    }

    function loadBlogPosts() {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            blogGrid.innerHTML = '';
            blogPosts.forEach(post => {
                const blogCard = document.createElement('article');
                blogCard.className = 'blog-card';
                blogCard.innerHTML = `
                    <img src="${post.image}" alt="${post.title}" class="blog-image">
                    <div class="blog-content">
                        <h3>${post.title}</h3>
                        <p class="blog-excerpt">${post.excerpt}</p>
                        <a href="#" class="read-more">Read More</a>
                    </div>
                `;
                blogGrid.appendChild(blogCard);
            });
        }
    }

    function loadTestimonials() {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        const testimonialGrid = document.querySelector('.testimonial-grid');
        if (testimonialGrid) {
            testimonialGrid.innerHTML = '';
            testimonials.forEach(testimonial => {
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card';
                testimonialCard.innerHTML = `
                    <img src="${testimonial.image}" alt="${testimonial.author}" class="testimonial-image">
                    <blockquote>${testimonial.content}</blockquote>
                    <cite>- ${testimonial.author}, ${testimonial.position}</cite>
                `;
                testimonialGrid.appendChild(testimonialCard);
            });
        }
    }

    function loadContactInfo() {
        const contactInfo = JSON.parse(localStorage.getItem('contactInfo')) || {};
        const contactEmail = document.querySelector('.contact-info p:nth-child(1)');
        const contactPhone = document.querySelector('.contact-info p:nth-child(2)');
        const contactAddress = document.querySelector('.contact-info p:nth-child(3)');
        const socialLinks = document.querySelector('.social-links');

        if (contactEmail) contactEmail.innerHTML = `<i class="fas fa-envelope"></i> Email: <a href="mailto:${contactInfo.email}">${contactInfo.email}</a>`;
        if (contactPhone) contactPhone.innerHTML = `<i class="fas fa-phone"></i> Phone: ${contactInfo.phone}`;
        if (contactAddress) contactAddress.innerHTML = `<i class="fas fa-map-marker-alt"></i> Location: ${contactInfo.address}`;
        
        if (socialLinks) {
            socialLinks.innerHTML = `
                <a href="${contactInfo.github}" target="_blank"><i class="fab fa-github"></i></a>
                <a href="${contactInfo.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
                <a href="${contactInfo.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
            `;
        }
    }


    // Load projects from localStorage
    function loadProjectsFromLocalStorage() { //Renamed to avoid conflict
        const projectGrid = document.querySelector('.project-grid');
        const projects = JSON.parse(localStorage.getItem('projects')) || [];

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.link}" class="project-link">View Project</a>
                        </div>
                    </div>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
            projectGrid.appendChild(projectCard);
        });
    }

    // Load blog posts from localStorage
    function loadBlogPostsFromLocalStorage() { //Renamed to avoid conflict
        const blogGrid = document.querySelector('.blog-grid');
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

        blogPosts.forEach(post => {
            const blogCard = document.createElement('article');
            blogCard.className = 'blog-card';
            blogCard.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="blog-image">
                <div class="blog-content">
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="#" class="read-more">Read More</a>
                </div>
            `;
            blogGrid.appendChild(blogCard);
        });
    }

    // Call the functions to load projects and blog posts
    loadProjectsFromLocalStorage();
    loadBlogPostsFromLocalStorage();
});

