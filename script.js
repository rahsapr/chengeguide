document.addEventListener('DOMContentLoaded', () => {

    // --- REFINED Progress Bar Logic ---
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = document.documentElement.scrollTop;
        const progress = (scrolled / scrollTotal) * 100;
        if(progressBar) progressBar.style.width = progress + "%";
    });

    // --- NEW: Interactive Sidebar Checklist Logic ---
    const checklistToggleBtn = document.getElementById('checklistToggleBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const checklistSidebar = document.getElementById('checklistSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const checklistCheckboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');

    const toggleSidebar = () => {
        checklistSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    };

    if (checklistToggleBtn && checklistSidebar && closeSidebarBtn && sidebarOverlay) {
        checklistToggleBtn.addEventListener('click', toggleSidebar);
        closeSidebarBtn.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }
    
    // --- NEW: Save/Load Checklist Progress using localStorage ---
    const saveProgress = () => {
        const progress = {};
        checklistCheckboxes.forEach(checkbox => {
            progress[checkbox.dataset.task] = checkbox.checked;
        });
        localStorage.setItem('checklistProgress', JSON.stringify(progress));
    };

    const loadProgress = () => {
        const progress = JSON.parse(localStorage.getItem('checklistProgress'));
        if (progress) {
            checklistCheckboxes.forEach(checkbox => {
                const taskName = checkbox.dataset.task;
                if (progress[taskName] !== undefined) {
                    checkbox.checked = progress[taskName];
                }
            });
        }
    };

    // Add event listeners to save progress on change
    checklistCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveProgress);
    });

    // Load initial progress when the page loads
    loadProgress();


    // --- All other stable functions from the previous version ---

    // Jump to Top Button
    const jumpToTopBtn = document.getElementById('jumpToTopBtn');
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            jumpToTopBtn.classList.add('visible');
        } else {
            jumpToTopBtn.classList.remove('visible');
        }
    });
    
    // Sticky Nav
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Welcome Section - Rotating Tips
    const tips = ["Always start with the 'Why'.", "Empower managers; they are your change champions.", "Over-communicate: clarity prevents anxiety."];
    let currentTipIndex = 0;
    const tipTextElement = document.getElementById('rotating-tip-text');
    if(tipTextElement) { setInterval(() => { currentTipIndex = (currentTipIndex + 1) % tips.length; tipTextElement.style.opacity = '0'; setTimeout(() => { tipTextElement.textContent = tips[currentTipIndex]; tipTextElement.style.opacity = '1'; }, 500); }, 5000); }
    
    // Process Tabs
    const tabsContainer = document.querySelector('.tabs-container');
    if(tabsContainer) { const tabButtons = tabsContainer.querySelectorAll('.tab-btn'); const tabContents = tabsContainer.querySelectorAll('.tab-content'); tabButtons.forEach(button => { button.addEventListener('click', () => { const tabNumber = button.dataset.tab; tabButtons.forEach(btn => btn.classList.remove('active')); button.classList.add('active'); tabContents.forEach(content => { content.classList.remove('active'); if (content.dataset.tab === tabNumber) { content.classList.add('active'); } }); }); }); }
    
    // Timeline Drag/Scroll
    const timeline = document.querySelector('.timeline-wrapper');
    if(timeline) { let isDown = false, startX, scrollLeft; timeline.addEventListener('mousedown', (e) => { isDown = true; timeline.classList.add('active'); startX = e.pageX - timeline.offsetLeft; scrollLeft = timeline.scrollLeft; }); timeline.addEventListener('mouseleave', () => { isDown = false; timeline.classList.remove('active'); }); timeline.addEventListener('mouseup', () => { isDown = false; timeline.classList.remove('active'); }); timeline.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - timeline.offsetLeft; const walk = (x - startX) * 2; timeline.scrollLeft = scrollLeft - walk; }); }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => { const question = item.querySelector('.faq-question'); const answer = item.querySelector('.faq-answer'); if(question && answer) { question.addEventListener('click', () => { const isActive = item.classList.contains('active'); if (!isActive) { item.classList.add('active'); answer.style.maxHeight = answer.scrollHeight + 'px'; } else { item.classList.remove('active'); answer.style.maxHeight = null; } }); }});
    
    // Active Nav Link Scrolling
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const activateLink = (id) => { navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === `#${id}`) { link.classList.add('active'); } }); };
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { activateLink(entry.target.id); } }); }, { rootMargin: "-30% 0px -70% 0px" });
    sections.forEach(section => observer.observe(section));
});
