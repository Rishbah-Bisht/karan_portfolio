import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import AdminDashboard from './admin/Dashboard';
import Login from './admin/Login';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
if (!API_BASE.endsWith('/api') && !API_BASE.endsWith('/api/')) {
    API_BASE = API_BASE.replace(/\/$/, "") + '/api';
}
API_BASE = API_BASE.replace(/\/$/, "");

function App() {
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, skillsRes, expRes, certsRes] = await Promise.all([
                    axios.get(`${API_BASE}/profile`),
                    axios.get(`${API_BASE}/skills`),
                    axios.get(`${API_BASE}/experience`),
                    axios.get(`${API_BASE}/certifications`)
                ]);
                setProfile(profileRes.data);
                setSkills(skillsRes.data);
                setExperience(expRes.data);
                setCertifications(certsRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (profile || skills.length || experience.length || certifications.length) {
            // Give it a bit of time for DOM to render
            setTimeout(() => {
                gsap.utils.toArray(".reveal").forEach((el, i) => {
                    let xValue = i % 2 === 0 ? -50 : 50;
                    gsap.fromTo(el,
                        { opacity: 0, x: xValue, y: 20 },
                        {
                            scrollTrigger: {
                                trigger: el,
                                start: "top 90%",
                                toggleActions: "play none none reverse"
                            },
                            opacity: 1, x: 0, y: 0,
                            duration: 1, ease: "power3.out"
                        }
                    );
                });
                ScrollTrigger.refresh();
            }, 100);
        }
    }, [profile, skills, experience, certifications]);

    return (
        <div className="relative min-h-screen">
            <AnimatedBackground />
            <Routes>
                <Route path="/" element={
                    <>
                        <Navbar />
                        <Hero profile={profile} />
                        <About profile={profile} />
                        <Skills skills={skills} />
                        <Experience experience={experience} />
                        <Certifications certifications={certifications} />
                        <Contact />
                        <Footer />
                    </>
                } />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
        </div>
    );
}

export default App;
