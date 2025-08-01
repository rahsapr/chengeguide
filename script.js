document.addEventListener('DOMContentLoaded', () => {

    // --- 11. Jump to Top Button & 12. Sticky Nav ---
    const jumpToTopBtn = document.getElementById('jumpToTopBtn');
    const navbar = document.getElementById('navbar');
    window.onscroll = () => {
        // Jump to top
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
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

    // --- 3. Welcome Section - Rotating Tips ---
    const tips = [
        "Always start with the 'Why'.",
        "Empower managers; they are your change champions.",
        "Over-communicate: clarity prevents anxiety.",
        "Listen to feedback, even when it's tough.",
        "Celebrate small wins along the way."
    ];
    let currentTipIndex = 0;
    const tipTextElement = document.getElementById('rotating-tip-text');
    if(tipTextElement) {
        setInterval(() => {
            currentTipIndex = (currentTipIndex + 1) % tips.length;
            tipTextElement.style.opacity = '0';
            setTimeout(() => {
                tipTextElement.textContent = tips[currentTipIndex];
                tipTextElement.style.opacity = '1';
            }, 500);
        }, 5000); // Change tip every 5 seconds
    }

    // --- 5. Change Management Process - Tabs ---
    const tabsContainer = document.querySelector('.tabs-container');
    if(tabsContainer) {
        const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
        const tabContents = tabsContainer.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabNumber = button.dataset.tab;

                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.dataset.tab === tabNumber) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // --- 6. Timeline - Horizontal Drag/Scroll ---
    const timeline = document.querySelector('.timeline-wrapper');
    if(timeline) {
        let isDown = false;
        let startX;
        let scrollLeft;

        timeline.addEventListener('mousedown', (e) => {
            isDown = true;
            timeline.classList.add('active');
            startX = e.pageX - timeline.offsetLeft;
            scrollLeft = timeline.scrollLeft;
        });
        timeline.addEventListener('mouseleave', () => {
            isDown = false;
            timeline.classList.remove('active');
        });
        timeline.addEventListener('mouseup', () => {
            isDown = false;
            timeline.classList.remove('active');
        });
        timeline.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - timeline.offsetLeft;
            const walk = (x - startX) * 2; // The multiplier makes it scroll faster
            timeline.scrollLeft = scrollLeft - walk;
        });
    }
    
    // --- 9. FAQ Section - Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Optional: close all others when one is opened
            // faqItems.forEach(i => {
            //     i.classList.remove('active');
            //     i.querySelector('.faq-answer').style.maxHeight = null;
            // });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });

    // --- Active Nav Link Scrolling ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    const activateLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, { rootMargin: "-30% 0px -70% 0px" }); // Activate when section is in the middle 30% of the viewport

    sections.forEach(section => observer.observe(section));

});
