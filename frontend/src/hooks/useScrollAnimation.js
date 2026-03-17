import { useEffect } from 'react';

const useScrollAnimation = () => {
    useEffect(() => {
        // 1. Reveal Observer (from bottom)
        const revealOptions = {
            threshold: 0.1, // Lowered for better reliability
            rootMargin: '0px 0px -20px 0px' 
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealVisible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, revealOptions);

        // Function to observe all current elements
        const observeNewElements = () => {
            const revealElements = document.querySelectorAll('.reveal:not(.revealVisible)');
            revealElements.forEach((el) => revealObserver.observe(el));
        };

        observeNewElements();

        // 2. Mutation Observer to catch dynamic content (like blogs)
        const mutationObserver = new MutationObserver(() => {
            observeNewElements();
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 3. Header Exit Observer (fade out near top)
        const headerOptions = {
            threshold: 0,
            rootMargin: '-100px 0px 0px 0px' 
        };

        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting && entry.boundingClientRect.top < 100) {
                    entry.target.classList.add('headerFadeOut');
                } else {
                    entry.target.classList.remove('headerFadeOut');
                }
            });
        }, headerOptions);

        const headers = document.querySelectorAll('.sectionHeader');
        headers.forEach((h) => headerObserver.observe(h));

        return () => {
            revealObserver.disconnect();
            mutationObserver.disconnect();
            headerObserver.disconnect();
        };
    }, []);
};

export default useScrollAnimation;
