import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import styles from './Blogs.module.css'

import { GridScan } from '../../components/react-bits/gridScan/GridScan.jsx'
import FeaturedBlogs from '../../components/featuredBlogs/FeaturedBlogs'
import Movement from '../../components/movement/Movement'
import Footer from '../../components/footer/Footer'

const Blogs = () => {
    const handleJoinClick = () => {
        console.log('Join the Movement clicked');
    }

    return (
        <>
            <Navbar />
            {/* Blogs Hero section */}
            <section className={styles.blogsHeroSection}>
                <div className={styles.blogsHeroBackground}>
                    <GridScan
                        className={styles.gridScan}
                        scanColor="#00ff00"
                        scanSpeed={1.0}
                        gridColor="#111"
                    />
                </div>

                <div className={styles.blogsHeroContent}>
                    <div className={styles.blogsHeroTagline}>
                        <p className={styles.taglineText}>Written for real life, not perfect routines.</p>
                    </div>

                    <div className={styles.blogsHeroText}>
                        <h1 className={styles.blogsHeroTitle}>Sequorr</h1>

                        <h3 className={styles.blogsHeroSubtitle}>Thoughts, experiences, and reflections on staying active — together.</h3>
                    </div>

                    <div className={styles.blogsHeroButtonGroup}>
                        <button onClick={handleJoinClick} className={styles.btnPrimary}>Join the Movement</button>
                    </div>
                </div>
            </section>

            {/* Featured Blogs Section */}
            < FeaturedBlogs />

            {/* Movement Section */}
            < Movement />

            {/* Footer Section */}
            < Footer />
        </>
    )
}

export default Blogs