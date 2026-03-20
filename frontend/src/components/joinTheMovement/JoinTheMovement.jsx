import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useModal } from '../../context/ModalContext';
import Stepper, { Step } from '../react-bits/stepper/Stepper';
import styles from './JoinTheMovement.module.css';
import { toast } from 'react-hot-toast';
import Logo from '../../assets/navbar/wordmark.svg';

const JoinTheMovement = () => {
    const { isJoinModalOpen, closeJoinModal } = useModal();
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        goal: '',
        time: 'Morning'
    });

    // Reset state when modal closes
    useEffect(() => {
        if (!isJoinModalOpen) {
            const timer = setTimeout(() => {
                setStarted(false);
                setCompleted(false);
                setIsSubmitting(false);
                setFormData({ email: '', goal: '', time: 'Morning' });
            }, 300);
            return () => clearTimeout(timer);
        } else {
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
        }
    }, [isJoinModalOpen]);

    // Re-enable scrolling on cleanup
    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!isJoinModalOpen) return null;

    const handleStart = () => setStarted(true);

    const handleSubmit = async () => {
        // Basic validation
        if (!formData.email || !formData.goal || !formData.time) {
            toast.error('Please complete all steps first.');
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading('Adding you to the waitlist...');

        try {
            // Map internal IDs to labels/descriptions for the API
            const goalLabels = {
                starting: 'Just Starting Out',
                consistent: 'Staying Consistent',
                serious: 'Training seriously',
                fun: 'Moving for fun'
            };

            const API_BASE_URL = import.meta.env.VITE_API_URL || '';
            const fetchUrl = `${API_BASE_URL.replace(/\/$/, '')}/waitlist`;

            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    description: goalLabels[formData.goal] || formData.goal,
                    usualMoveTime: formData.time
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'You have been added to the waitlist! 🎉', { id: loadingToast });
                setCompleted(true);
            } else {
                toast.error(data.message || data.errors?.[0] || 'Something went wrong. Please try again.', { id: loadingToast });
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Network error. Please check your connection.', { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFinalStep = () => {
        handleSubmit();
    };

    return (
        <div className={styles.modalOverlay} onClick={closeJoinModal}>
            <motion.div
                layout
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
                <button className={styles.closeButton} onClick={closeJoinModal}>
                    Close
                </button>

                <header className={styles.header}>
                    <img src={Logo} alt="Sequorr" className={styles.logo} />
                </header>

                <main className={styles.body}>
                    <div className={styles.contentWrapper}>
                        <AnimatePresence mode="wait">
                            {!started ? (
                                <motion.div
                                    key="welcome"
                                    className={styles.welcomeContainer}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <h1 className={styles.mainTitle}>Be part of the first move.</h1>
                                    <p className={styles.description}>
                                        Sequorr is building fitness that feels human, social, and pressure-free.
                                        Join early and move with people like you.
                                    </p>
                                    <button className={styles.btnPrimary} onClick={handleStart} disabled={isSubmitting}>
                                        {isSubmitting ? 'Joining...' : 'Let\'s move'}
                                    </button>
                                </motion.div>
                            ) : completed ? (
                                <motion.div
                                    key="success"
                                    className={styles.welcomeContainer}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <h1 className={styles.mainTitle}>Congrats, you are in ;)</h1>
                                    <p className={styles.description}>We'll see you on the inside soon.</p>
                                    <button className={styles.btnPrimary} onClick={closeJoinModal}>
                                        Explore what's coming
                                    </button>
                                    <p className={styles.footerNoteSuccess} style={{ marginTop: '30px' }}>Fitness feels better together.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="stepper"
                                    className={styles.stepperContainer}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Stepper
                                        onFinalStepCompleted={handleFinalStep}
                                        stepCircleContainerClassName={styles.stepperInner}
                                        canMove={(step) => {
                                            if (step === 1) {
                                                if (!formData.email) {
                                                    toast.error('Please enter your email.');
                                                    return false;
                                                }
                                                // Simple email regex
                                                if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
                                                    toast.error('Please enter a valid email address.');
                                                    return false;
                                                }
                                            }
                                            if (step === 2 && !formData.goal) {
                                                toast.error('Please select an option.');
                                                return false;
                                            }
                                            if (step === 3 && !formData.time) {
                                                toast.error('Please select a time.');
                                                return false;
                                            }
                                            return true;
                                        }}
                                    >
                                        <Step>
                                            <div className={styles.stepContent}>
                                                <h2 className={styles.question}>Where should we send your invite?</h2>
                                                <input
                                                    type="email"
                                                    placeholder="you@domain.com"
                                                    className={styles.emailInput}
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </Step>

                                        <Step>
                                            <div className={styles.stepContent}>
                                                <h2 className={styles.question}>What best describes you right now?</h2>
                                                <div className={styles.optionsGrid}>
                                                    {[
                                                        { id: 'starting', label: 'Just Starting Out', icon: '⛰️' },
                                                        { id: 'consistent', label: 'Staying Consistent', icon: '➕' },
                                                        { id: 'serious', label: 'Training seriously', icon: '⭐' },
                                                        { id: 'fun', label: 'Moving for fun', icon: '✳️' }
                                                    ].map(opt => (
                                                        <div
                                                            key={opt.id}
                                                            className={`${styles.option} ${formData.goal === opt.id ? styles.selected : ''}`}
                                                            onClick={() => setFormData({ ...formData, goal: opt.id })}
                                                        >
                                                            <span>{opt.icon}</span>
                                                            {opt.label}
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className={styles.subtext}>You're exactly who we built this for ;)</p>
                                            </div>
                                        </Step>

                                        <Step>
                                            <div className={styles.stepContent}>
                                                <h2 className={styles.question}>When do you usually move?</h2>
                                                <div className={styles.timeOptions}>
                                                    {[
                                                        { id: 'Morning', icon: '🌅' },
                                                        { id: 'Noon', icon: '☀️' },
                                                        { id: 'Evening', icon: '🌆' }
                                                    ].map(opt => (
                                                        <div
                                                            key={opt.id}
                                                            className={`${styles.timeOption} ${formData.time === opt.id ? styles.selected : ''}`}
                                                            onClick={() => setFormData({ ...formData, time: opt.id })}
                                                        >
                                                            <span>{opt.icon}</span>
                                                            {opt.id}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Step>
                                    </Stepper>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <p className={styles.footerNote}>We'll only reach out when Sequorr is ready for you.</p>
                </main>
            </motion.div>
        </div>
    );
};

export default JoinTheMovement;
