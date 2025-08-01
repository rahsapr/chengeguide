document.addEventListener('DOMContentLoaded', () => {

    const jumpToTopBtn = document.getElementById('jumpToTopBtn');
    const navbar = document.getElementById('navbar');
    // --- NEW: Quest Progress Bar Elements ---
    const questProgressBar = document.getElementById('questProgressBar');
    const questProgressIcon = document.getElementById('questProgressIcon');

    window.onscroll = () => {
        // --- UPDATED: Progress Bar Logic ---
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = document.documentElement.scrollTop;
        const progress = (scrolled / scrollTotal) * 100;
        
        if (questProgressBar) questProgressBar.style.width = progress + "%";
        if (questProgressIcon) questProgressIcon.style.left = `calc(${progress}% - 12px)`; // -12px to center icon

        // Jump to top button visibility
        if (scrolled > 300) {
            jumpToTopBtn.classList.add('visible');
        } else {
            jumpToTopBtn.classList.remove('visible');
        }
        
        // Sticky nav
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // --- NEW: Confetti on Jump to Top Click ---
    jumpToTopBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Launch confetti!
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.8 }
        });
    });

    // --- NEW: Change Agent Checklist Logic ---
    const checklistItems = document.querySelectorAll('.checklist-item');
    if (checklistItems.length > 0) {
        const checklistObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    const correspondingChecklistItem = document.querySelector(`.checklist-item[data-unlock-target="${targetId}"]`);
                    if (correspondingChecklistItem && !correspondingChecklistItem.classList.contains('completed')) {
                        correspondingChecklistItem.classList.add('completed');
                    }
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

        checklistItems.forEach(item => {
            const sectionToObserve = document.getElementById(item.dataset.unlockTarget);
            if (sectionToObserve) {
                checklistObserver.observe(sectionToObserve);
            }
        });
    }

    // --- NEW: Knowledge Checkpoint Quiz Logic ---
    const quizAnswers = document.querySelectorAll('.quiz-answer-btn');
    const quizResult = document.getElementById('quizResult');

    if (quizAnswers.length > 0) {
        quizAnswers.forEach(button => {
            button.addEventListener('click', () => {
                const isCorrect = button.dataset.correct === 'true';

                // Disable all buttons after one is clicked
                quizAnswers.forEach(btn => btn.disabled = true);

                if (isCorrect) {
                    button.classList.add('correct');
                    quizResult.textContent = 'Correct! Empowering managers is key. Well done!';
                    quizResult.className = 'quiz-result correct';
                    // Launch confetti!
                    confetti({
                        particleCount: 200,
                        spread: 90,
                        origin: { y: 0.6 },
                        angle: 90,
                        startVelocity: 60,
                    });
                } else {
                    button.classList.add('incorrect');
                    quizResult.textContent = 'Not quite. The right answer is "Empowering managers". They are our most vital partners!';
                    quizResult.className = 'quiz-result incorrect';
                    // Find and highlight the correct answer
                    document.querySelector('.quiz-answer-btn[data-correct="true"]').classList.add('correct');
                }
            });
        });
    }

    // --- (All other JS functions from the previous version remain the same) ---
    // Rotating Tips
    const tips = ["Always start with the 'Why'.", "Empower managers; they are your change champions.", "Over-communicate: clarity prevents anxiety.", "Listen to feedback, even when it's tough.", "Celebrate small wins along the way."];
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
    faqItems.forEach(item => { const question = item.querySelector('.faq-question'); const answer = item.querySelector('.faq-answer'); question.addEventListener('click', () => { const isActive = item.classList.contains('active'); if (!isActive) { item.classList.add('active'); answer.style.maxHeight = answer.scrollHeight + 'px'; } else { item.classList.remove('active'); answer.style.maxHeight = null; } }); });
    // Active Nav Link Scrolling
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const activateLink = (id) => { navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === `#${id}`) { link.classList.add('active'); } }); };
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { activateLink(entry.target.id); } }); }, { rootMargin: "-30% 0px -70% 0px" });
    sections.forEach(section => observer.observe(section));
});
