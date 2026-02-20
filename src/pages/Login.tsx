import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

const Login: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const type = searchParams.get('type') || 'student';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Professional Security: Auto-redirect if already logged in
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && type === 'agent') {
            navigate('/admin', { replace: true });
        }
    }, [navigate, type]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (type === 'agent') {
                const response = await api.login({ email, password });
                if (response.success) {
                    // Use replace to prevent back-button loops
                    navigate('/admin', { replace: true });
                } else {
                    setError(response.message || 'Login failed. Please check your credentials.');
                }
            } else {
                setError('Student login is currently under development. Please use the WhatsApp button for assistance.');
            }
        } catch (err: any) {
            setError(err.message || 'Invalid email or password. Ensure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-0 sm:p-4 md:p-8 relative overflow-hidden">
            <div className="max-w-6xl w-full bg-white sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row min-h-screen sm:min-h-[700px] border border-slate-100 relative z-10">

                {/* Image Section - Background on Mobile, Side-panel on Desktop */}
                <div className="absolute inset-0 md:relative md:w-1/2 bg-[#06083D] z-0 md:z-auto">
                    <img
                        src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop"
                        alt="University Campus"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 md:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#06083D]/80 via-[#06083D]/30 to-primary/10 backdrop-blur-[1px] md:backdrop-blur-none transition-all"></div>

                    <div className="hidden md:block absolute bottom-16 left-16 right-16 text-white z-10">
                        <div className="w-16 h-1 bg-primary mb-8 rounded-full"></div>
                        <h2 className="text-5xl font-display font-bold mb-6 leading-tight">Start Your Journey in Malaysia</h2>
                        <p className="text-xl opacity-90 leading-relaxed font-medium text-slate-100">
                            {type === 'agent' ? 'Access your dashboard to manage student applications and university partnerships.' : 'Plan your future with the best universities in Malaysia. Your dream education starts here.'}
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-20 flex flex-col items-center justify-center relative bg-white/95 md:bg-white backdrop-blur-md md:backdrop-blur-none min-h-screen sm:min-h-0 z-10">
                    <div className="w-full max-w-sm">
                        <div className="text-center mb-8 sm:mb-12 flex flex-col items-center">
                            <Link to="/" className="mb-8 sm:mb-10 group">
                                <div className="flex flex-col items-center">
                                    {/* LOGO PLACEHOLDER: Replace this div with your <img> tag */}
                                    {/* <img src="/path-to-your-logo.png" alt="Hikmah Abroad" className="h-16 w-auto mb-4" /> */}
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#06083D] rounded-2xl mb-4 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                                        <span className="material-symbols-rounded text-3xl sm:text-4xl text-white">school</span>
                                    </div>
                                    <div className="text-center">
                                        <h1 className="text-xl sm:text-2xl font-display font-black text-[#06083D] tracking-tighter leading-none mb-1">HIKMAH ABROAD</h1>
                                        <p className="text-[8px] sm:text-[9px] text-[#06083D]/60 font-black uppercase tracking-[0.25em]">Your Trusted Partner in Overseas Education</p>
                                    </div>
                                </div>
                            </Link>
                            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#06083D] mb-2 sm:mb-3">Sign In</h2>
                            <p className="text-slate-400 font-bold text-xs sm:text-sm tracking-wide uppercase">
                                {type === 'agent' ? 'Agent Login' : 'Student Account'}
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold mb-6 sm:mb-8 animate-in slide-in-from-top duration-300 flex items-center gap-3 shadow-sm">
                                <span className="material-symbols-rounded text-xl">error_outline</span>
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-rounded text-[20px] sm:text-[22px]">alternate_email</span>
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 sm:pl-14 pr-6 py-3.5 sm:py-4.5 bg-[#F8FAFC] border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium text-sm sm:text-base"
                                        placeholder="Your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-rounded text-[20px] sm:text-[22px]">lock</span>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-3.5 sm:py-4.5 bg-[#F8FAFC] border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium text-sm sm:text-base"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-[#06083D] transition-colors"
                                    >
                                        <span className="material-symbols-rounded text-xl">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm py-1 sm:py-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg border-2 border-slate-200 bg-white text-primary focus:ring-primary/20 transition-all cursor-pointer" />
                                    <span className="text-slate-500 font-bold group-hover:text-slate-700 transition-colors">Remember Me</span>
                                </label>
                                <a href="#" className="font-bold text-primary hover:text-primary/80 transition-colors">Forgot?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-white transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2 text-base sm:text-lg mt-2 sm:mt-4 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#06083D] hover:bg-[#0A0D4D] hover:scale-[1.01] active:scale-[0.99] border-b-4 border-slate-900'
                                    }`}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>Sign In <span className="material-symbols-rounded font-bold">arrow_forward</span></>
                                )}
                            </button>

                            <div className="text-center mt-6 sm:mt-10">
                                <p className="text-slate-400 font-bold text-xs sm:text-sm">
                                    Not registered yet? <Link to="/contact" className="text-primary hover:text-primary/80 transition-colors ml-1">Create an Account</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
