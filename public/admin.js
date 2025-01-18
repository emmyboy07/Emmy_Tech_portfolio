document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');

    // Check if user is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login.html';
    }

    // Logout functionality
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    });

    // Load existing data
    loadHeroData();
    loadAboutData();
    loadSkills();
    loadProjects();
    loadServices();
    loadBlogPosts();
    loadTestimonials();
    loadContactInfo();

    // Hero Section
    const editHeroForm = document.getElementById('edit-hero-form');
    editHeroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('hero-title').value;
        const subtitle = document.getElementById('hero-subtitle').value;
        localStorage.setItem('heroData', JSON.stringify({ title, subtitle }));
        alert('Hero section updated successfully!');
    });

    // About Section
    const editAboutForm = document.getElementById('edit-about-form');
    editAboutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('about-content').value;
        const image = document.getElementById('about-image').value;
        localStorage.setItem('aboutData', JSON.stringify({ content, image }));
        alert('About section updated successfully!');
    });

    // Skills Section
    const addSkillForm = document.getElementById('add-skill-form');
    const skillsList = document.getElementById('skills-list');
    addSkillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const category = document.getElementById('skill-category').value;
        const name = document.getElementById('skill-name').value;
        let skills = JSON.parse(localStorage.getItem('skills')) || {};
        if (!skills[category]) {
            skills[category] = [];
        }
        skills[category].push(name);
        localStorage.setItem('skills', JSON.stringify(skills));
        addSkillForm.reset();
        loadSkills();
    });

    // Projects Section
    const addProjectForm = document.getElementById('add-project-form');
    const projectList = document.getElementById('project-list');
    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const image = document.getElementById('project-image').value;
        const link = document.getElementById('project-link').value;
        const project = { title, description, image, link };
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
        addProjectForm.reset();
        loadProjects();
    });

    // Services Section
    const addServiceForm = document.getElementById('add-service-form');
    const serviceList = document.getElementById('service-list');
    addServiceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('service-title').value;
        const description = document.getElementById('service-description').value;
        const icon = document.getElementById('service-icon').value;
        const service = { title, description, icon };
        let services = JSON.parse(localStorage.getItem('services')) || [];
        services.push(service);
        localStorage.setItem('services', JSON.stringify(services));
        addServiceForm.reset();
        loadServices();
    });

    // Blog Posts Section
    const addBlogForm = document.getElementById('add-blog-form');
    const blogList = document.getElementById('blog-list');
    addBlogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('blog-title').value;
        const excerpt = document.getElementById('blog-excerpt').value;
        const content = document.getElementById('blog-content').value;
        const image = document.getElementById('blog-image').value;
        const blogPost = { title, excerpt, content, image };
        let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogPosts.push(blogPost);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        addBlogForm.reset();
        loadBlogPosts();
    });

    // Testimonials Section
    const addTestimonialForm = document.getElementById('add-testimonial-form');
    const testimonialList = document.getElementById('testimonial-list');
    addTestimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('testimonial-content').value;
        const author = document.getElementById('testimonial-author').value;
        const position = document.getElementById('testimonial-position').value;
        const image = document.getElementById('testimonial-image').value;
        const testimonial = { content, author, position, image };
        let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.push(testimonial);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        addTestimonialForm.reset();
        loadTestimonials();
    });

    // Contact Information
    const editContactForm = document.getElementById('edit-contact-form');
    editContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const address = document.getElementById('contact-address').value;
        const github = document.getElementById('contact-github').value;
        const linkedin = document.getElementById('contact-linkedin').value;
        const twitter = document.getElementById('contact-twitter').value;
        const contactInfo = { email, phone, address, github, linkedin, twitter };
        localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
        alert('Contact information updated successfully!');
    });

    function loadHeroData() {
        const heroData = JSON.parse(localStorage.getItem('heroData')) || {};
        document.getElementById('hero-title').value = heroData.title || '';
        document.getElementById('hero-subtitle').value = heroData.subtitle || '';
    }

    function loadAboutData() {
        const aboutData = JSON.parse(localStorage.getItem('aboutData')) || {};
        document.getElementById('about-content').value = aboutData.content || '';
        document.getElementById('about-image').value = aboutData.image || '';
    }

    function loadSkills() {
        const skills = JSON.parse(localStorage.getItem('skills')) || {};
        skillsList.innerHTML = '';
        for (const category in skills) {
            const categoryItem = document.createElement('li');
            categoryItem.innerHTML = `
                <strong>${category}</strong>
                <ul>
                    ${skills[category].map(skill => `<li>${skill} <button class="delete-btn" data-category="${category}" data-skill="${skill}">Delete</button></li>`).join('')}
                </ul>
            `;
            skillsList.appendChild(categoryItem);
        }
        addDeleteListeners('skill');
    }

    function loadProjects() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projectList.innerHTML = '';
        projects.forEach((project, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${project.title}</span>
                <button class="delete-btn" data-index="${index}" data-type="project">Delete</button>
            `;
            projectList.appendChild(li);
        });
        addDeleteListeners('project');
    }

    function loadServices() {
        const services = JSON.parse(localStorage.getItem('services')) || [];
        serviceList.innerHTML = '';
        services.forEach((service, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${service.title}</span>
                <button class="delete-btn" data-index="${index}" data-type="service">Delete</button>
            `;
            serviceList.appendChild(li);
        });
        addDeleteListeners('service');
    }

    function loadBlogPosts() {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogList.innerHTML = '';
        blogPosts.forEach((post, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${post.title}</span>
                <button class="delete-btn" data-index="${index}" data-type="blog">Delete</button>
            `;
            blogList.appendChild(li);
        });
        addDeleteListeners('blog');
    }

    function loadTestimonials() {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonialList.innerHTML = '';
        testimonials.forEach((testimonial, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${testimonial.author}</span>
                <button class="delete-btn" data-index="${index}" data-type="testimonial">Delete</button>
            `;
            testimonialList.appendChild(li);
        });
        addDeleteListeners('testimonial');
    }

    function loadContactInfo() {
        const contactInfo = JSON.parse(localStorage.getItem('contactInfo')) || {};
        document.getElementById('contact-email').value = contactInfo.email || '';
        document.getElementById('contact-phone').value = contactInfo.phone || '';
        document.getElementById('contact-address').value = contactInfo.address || '';
        document.getElementById('contact-github').value = contactInfo.github || '';
        document.getElementById('contact-linkedin').value = contactInfo.linkedin || '';
        document.getElementById('contact-twitter').value = contactInfo.twitter || '';
    }

    function addDeleteListeners(type) {
        const deleteButtons = document.querySelectorAll(`.delete-btn[data-type="${type}"]`);
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (type === 'skill') {
                    const category = button.getAttribute('data-category');
                    const skill = button.getAttribute('data-skill');
                    let skills = JSON.parse(localStorage.getItem('skills')) || {};
                    skills[category] = skills[category].filter(s => s !== skill);
                    if (skills[category].length === 0) {
                        delete skills[category];
                    }
                    localStorage.setItem('skills', JSON.stringify(skills));
                    loadSkills();
                } else {
                    const index = button.getAttribute('data-index');
                    let items = JSON.parse(localStorage.getItem(`${type}s`)) || [];
                    items.splice(index, 1);
                    localStorage.setItem(`${type}s`, JSON.stringify(items));
                    if (type === 'project') loadProjects();
                    else if (type === 'service') loadServices();
                    else if (type === 'blog') loadBlogPosts();
                    else if (type === 'testimonial') loadTestimonials();
                }
            });
        });
    }
});

