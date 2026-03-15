import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const Blog = () => {
    return (
        <>
            <Navbar />
            <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                <h1>Blog Content Coming Soon...</h1>
            </div>
            <Footer />
        </>
    )
}

export default Blog