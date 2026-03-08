import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
if (!API_BASE.endsWith('/api') && !API_BASE.endsWith('/api/')) {
    API_BASE = API_BASE.replace(/\/$/, "") + '/api';
}
API_BASE = API_BASE.replace(/\/$/, "");

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [profile, setProfile] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchData();
        }
    }, [token]);

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const [s, e, p, c] = await Promise.all([
                axios.get(`${API_BASE}/skills`, config),
                axios.get(`${API_BASE}/experience`, config),
                axios.get(`${API_BASE}/profile`, config),
                axios.get(`${API_BASE}/certifications`, config)
            ]);
            setSkills(s.data);
            setExperience(e.data);
            setProfile(p.data || {});
            setCertifications(c.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            if (err.response?.status === 401) handleLogout();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const menuTabs = ['profile', 'skills', 'experience', 'certifications', 'security'];

    return (
        <div className="min-h-screen bg-[#F8F9FC] text-[#111827] flex flex-col lg:flex-row">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#5D3FF3] rounded-lg flex items-center justify-center text-white font-black text-xs">K</div>
                    <span className="font-black uppercase tracking-widest text-[10px]">Admin</span>
                </div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#5D3FF3]">
                    {isMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                </button>
            </header>

            {/* Mobile Sidebar overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)}>
                    <aside className="w-64 bg-white h-full p-8 flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex-1 space-y-2 mt-8">
                            {menuTabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => { setActiveTab(tab); setIsMenuOpen(false); }}
                                    className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#5D3FF3] text-white' : 'text-gray-400'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <button onClick={handleLogout} className="mt-auto px-6 py-4 rounded-xl bg-red-50 text-red-500 font-bold text-[10px] uppercase tracking-widest">
                            Logout
                        </button>
                    </aside>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col p-8 fixed h-full z-20">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-[#5D3FF3] rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-[#5D3FF3]/20">K</div>
                    <span className="font-black uppercase tracking-widest text-sm">Admin Panel</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuTabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab
                                ? 'bg-[#5D3FF3] text-white shadow-xl shadow-[#5D3FF3]/20 -translate-y-0.5'
                                : 'text-gray-400 hover:text-[#111827] hover:bg-gray-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <button onClick={handleLogout} className="mt-8 px-6 py-4 rounded-2xl border border-gray-100 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-50 transition-all">
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 p-6 md:p-12 lg:p-16 min-h-screen relative">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-12 hidden lg:block">
                        <h2 className="text-xs uppercase tracking-[0.4em] text-[#5D3FF3] font-black mb-2">Management</h2>
                        <h1 className="text-4xl font-bold tracking-tight capitalize">{activeTab}</h1>
                    </header>

                    <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-6 md:p-10 animate-fade-in relative overflow-hidden">
                        {/* Subtle background flair */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#5D3FF3]/5 rounded-full blur-[100px]"></div>

                        <div className="relative z-10">
                            {activeTab === 'profile' && <ProfileManager profile={profile} refresh={fetchData} token={token} />}
                            {activeTab === 'skills' && <SkillsManager skills={skills} refresh={fetchData} token={token} />}
                            {activeTab === 'experience' && <ExperienceManager experience={experience} refresh={fetchData} token={token} />}
                            {activeTab === 'certifications' && <CertificationsManager certifications={certifications} refresh={fetchData} token={token} />}
                            {activeTab === 'security' && <SecurityManager token={token} />}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Sub-components (reusing logic but with improved UI) ---

const InputField = ({ label, ...props }) => (
    <div className="space-y-2">
        <label className="text-[10px] uppercase font-black tracking-widest text-[#5D3FF3] ml-1">{label}</label>
        <input {...props} className="w-full bg-[#F8F9FC] border border-gray-100 px-6 py-4 rounded-2xl outline-none focus:border-[#5D3FF3] focus:ring-4 focus:ring-[#5D3FF3]/5 transition-all font-medium text-sm" />
    </div>
);

const TextAreaField = ({ label, ...props }) => (
    <div className="space-y-2">
        <label className="text-[10px] uppercase font-black tracking-widest text-[#5D3FF3] ml-1">{label}</label>
        <textarea {...props} className="w-full bg-[#F8F9FC] border border-gray-100 px-6 py-4 rounded-2xl outline-none focus:border-[#5D3FF3] focus:ring-4 focus:ring-[#5D3FF3]/5 transition-all font-medium text-sm resize-none" />
    </div>
);

const ActionButton = ({ children, ...props }) => (
    <button {...props} className="w-full py-5 bg-[#111827] text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg hover:bg-black hover:shadow-xl transition-all active:scale-95">
        {children}
    </button>
);



const ProfileManager = ({ profile, refresh, token }) => {
    const [form, setForm] = useState(profile || {});
    const config = { headers: { Authorization: `Bearer ${token}` } };
    useEffect(() => { setForm(profile || {}); }, [profile]);

    const saveProfile = async () => {
        try {
            await axios.post(`${API_BASE}/profile`, form, config);
            refresh();
            alert("Updated!");
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
                <InputField label="Headline" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
                <div className="md:col-span-2">
                    <TextAreaField label="About Me" rows="5" value={form.about || ''} onChange={e => setForm({ ...form, about: e.target.value })} />
                </div>
            </div>
            <ActionButton onClick={saveProfile}>Update Profile</ActionButton>
        </div>
    );
};

const SkillsManager = ({ skills, refresh, token }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const addSkill = async () => {
        if (!name) return;
        try {
            await axios.post(`${API_BASE}/skills`, { name, category }, config);
            setName(''); setCategory(''); refresh();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <InputField label="Skill Name" value={name} onChange={e => setName(e.target.value)} />
                <InputField label="Category" value={category} onChange={e => setCategory(e.target.value)} />
                <ActionButton onClick={addSkill}>Add</ActionButton>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map(s => (
                    <div key={s._id} className="p-6 bg-[#F8F9FC] border border-gray-100 rounded-2xl flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-[#5D3FF3]"></div>
                            <div>
                                <p className="font-bold">{s.name}</p>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{s.category}</p>
                            </div>
                        </div>
                        <button onClick={async () => { await axios.delete(`${API_BASE}/skills/${s._id}`, config); refresh(); }} className="text-gray-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ExperienceManager = ({ experience, refresh, token }) => {
    const [form, setForm] = useState({ role: '', company: '', duration: '', location: '', description: '', tags: '' });
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const addExp = async () => {
        if (!form.role) return;
        try {
            await axios.post(`${API_BASE}/experience`, { ...form, tags: form.tags.split(',').map(t => t.trim()) }, config);
            setForm({ role: '', company: '', duration: '', location: '', description: '', tags: '' });
            refresh();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
                <InputField label="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                <InputField label="Duration" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                <InputField label="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                <div className="md:col-span-2">
                    <TextAreaField label="Description" rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
            </div>
            <ActionButton onClick={addExp}>Add Experience</ActionButton>

            <div className="space-y-4">
                {experience.map(e => (
                    <div key={e._id} className="p-8 bg-[#F8F9FC] border border-gray-100 rounded-[2rem] flex justify-between items-start group">
                        <div className="space-y-1">
                            <p className="font-bold text-lg">{e.role} @ {e.company}</p>
                            <p className="text-[10px] text-[#5D3FF3] uppercase font-black tracking-widest">{e.duration}</p>
                        </div>
                        <button onClick={async () => { await axios.delete(`${API_BASE}/experience/${e._id}`, config); refresh(); }} className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CertificationsManager = ({ certifications, refresh, token }) => {
    const [form, setForm] = useState({ name: '', issuer: '', date: '' });
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const addCert = async () => {
        if (!form.name) return;
        try {
            await axios.post(`${API_BASE}/certifications`, form, config);
            setForm({ name: '', issuer: '', date: '' });
            refresh();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField label="Cert Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <InputField label="Issuer" value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} />
                <InputField label="Date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <ActionButton onClick={addCert}>Add Certification</ActionButton>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map(c => (
                    <div key={c._id} className="p-6 bg-[#F8F9FC] border border-gray-100 rounded-3xl flex justify-between items-center group">
                        <div>
                            <p className="font-bold text-base">{c.name}</p>
                            <p className="text-[10px] text-[#5D3FF3] uppercase font-black tracking-widest">{c.issuer} | {c.date}</p>
                        </div>
                        <button onClick={async () => { await axios.delete(`${API_BASE}/certifications/${c._id}`, config); refresh(); }} className="text-gray-300 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SecurityManager = ({ token }) => {
    const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [status, setStatus] = useState({ loading: false, error: '', success: '' });

    const handleUpdate = async () => {
        if (!form.oldPassword || !form.newPassword) return setStatus({ ...status, error: 'All fields are required' });
        if (form.newPassword !== form.confirmPassword) return setStatus({ ...status, error: 'Passwords do not match' });

        setStatus({ loading: true, error: '', success: '' });
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${API_BASE}/auth/update-password`, {
                oldPassword: form.oldPassword,
                newPassword: form.newPassword
            }, config);
            setStatus({ loading: false, error: '', success: 'Password updated successfully!' });
            setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setStatus({ loading: false, error: err.response?.data?.message || 'Error updating password', success: '' });
        }
    };

    return (
        <div className="space-y-8 max-w-md">
            <div className="space-y-6">
                <InputField
                    label="Current Password"
                    type="password"
                    value={form.oldPassword}
                    onChange={e => setForm({ ...form, oldPassword: e.target.value })}
                />
                <InputField
                    label="New Password"
                    type="password"
                    value={form.newPassword}
                    onChange={e => setForm({ ...form, newPassword: e.target.value })}
                />
                <InputField
                    label="Confirm New Password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                />

                {status.error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider pl-1">{status.error}</p>}
                {status.success && <p className="text-green-500 text-[10px] font-bold uppercase tracking-wider pl-1">{status.success}</p>}

                <ActionButton onClick={handleUpdate} disabled={status.loading}>
                    {status.loading ? 'Updating...' : 'Update Password'}
                </ActionButton>
            </div>
        </div>
    );
};

export default Dashboard;