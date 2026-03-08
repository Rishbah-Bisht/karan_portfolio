const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Profile = require('./models/Profile');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Create Admin if it doesn't exist
        const adminExists = await Admin.findOne({ username: 'admin' });
        if (!adminExists) {
            await Admin.create({
                username: 'admin',
                password: process.env.ADMIN_PASSWORD || 'admin123'
            });
            console.log('Admin user created.');
        }

        // Add Profile
        await Profile.deleteMany();
        await Profile.create({
            name: "Karan Singh Negi",
            title: "Full Stack Web Developer Intern @ Papa Solutions",
            about: "Final-year BCA student (Class of 2026) specializing in the MERN stack with a passion for integrating AI/ML features into practical web applications. Experienced in building scalable solutions and solving complex problems.",
            email: "hkaran682@gmail.com"
        });

        // Add Skills
        await Skill.deleteMany();
        const skills = [
            { name: "MongoDB", category: "Backend" },
            { name: "Express.js", category: "Backend" },
            { name: "React.js", category: "Frontend" },
            { name: "Node.js", category: "Backend" },
            { name: "Tailwind CSS", category: "Frontend" },
            { name: "JavaScript", category: "Languages" },
            { name: "Python", category: "Languages" },
            { name: "GSAP", category: "Animations" }
        ];
        await Skill.insertMany(skills);

        // Add Experience
        await Experience.deleteMany();
        const experience = [
            {
                role: "Web Developer Intern",
                company: "Papa Solutions",
                duration: "Aug 2025 - Present",
                location: "Remote",
                description: "Developing scalable digital products using the MERN stack.",
                tags: ["React", "Express", "MongoDB", "Node.js"]
            }
        ];
        await Experience.insertMany(experience);

        console.log('Seeding complete!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
