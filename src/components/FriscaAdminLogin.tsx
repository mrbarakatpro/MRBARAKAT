import React, { useState } from 'react';
import { useFrisca } from '../context/FriscaContext';
import { FriscaLogo } from './FriscaLogo';
import {
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Globe,
} from 'lucide-react';

interface FriscaAdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export const FriscaAdminLogin: React.FC<FriscaAdminLoginProps> = ({
  onLoginSuccess,
  onBackToSite,
}) => {
  const { verifyAdminLogin, adminLang, toggleAdminLang, adminT } = useFrisca();
  const isAr = adminLang === 'ar';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg(adminT.loginErrorEmpty);
      return;
    }

    setIsLoading(true);

    try {
      const isValid = await verifyAdminLogin(username, password);
      setIsLoading(false);

      if (isValid) {
        onLoginSuccess();
      } else {
        setErrorMsg(adminT.loginErrorInvalid);
      }
    } catch {
      setIsLoading(false);
      setErrorMsg(adminT.loginErrorInvalid);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#140306] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#450d14] via-[#1a0508] to-[#0d0204] text-white flex flex-col justify-center items-center p-4 sm:p-6 font-sans selection:bg-[#782229] selection:text-white"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top Brand & Controls: Back to Site + Language Switcher */}
      <div className="w-full max-w-md flex items-center justify-between mb-6 gap-3">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBackToSite();
          }}
          className="inline-flex items-center gap-1.5 text-xs text-[#e0b4b8] hover:text-white font-bold transition-colors cursor-pointer bg-[#2a080e]/70 hover:bg-[#3d0e15] px-3 py-1.5 rounded-xl border border-[#52131b]/60"
        >
          {isAr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{adminT.loginBackToSite}</span>
        </a>

        <div className="flex items-center gap-2">
          {/* Language Switcher Button */}
          <button
            onClick={toggleAdminLang}
            className="px-2.5 py-1.5 rounded-xl bg-[#2a080e]/70 hover:bg-[#3d0e15] border border-[#52131b]/60 hover:border-[#d4a373] text-[#e0b4b8] hover:text-[#d4a373] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg tracking-wider text-white font-serif">
              FRISCA
            </span>
            <FriscaLogo size={24} />
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#1d060a]/90 backdrop-blur-xl border border-[#5a151f]/60 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Decorative Top Ambient Glow */}
        <div className="absolute top-0 right-1/4 left-1/4 h-1 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent opacity-80" />

        <div className="text-center mb-6 space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#782229] to-[#3d0e15] border border-[#a12f39]/50 mx-auto flex items-center justify-center shadow-lg shadow-[#782229]/30 mb-3">
            <Lock className="w-7 h-7 text-[#d4a373]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif tracking-wide">
            {adminT.loginTitle}
          </h2>
          <p className="text-xs text-[#e0b4b8]/80 leading-relaxed">
            {adminT.loginSubtitle}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/80 border border-red-700/60 text-red-200 text-xs flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold text-white mb-1.5">
              {adminT.loginUsernameLabel}
            </label>
            <div className="relative">
              <div
                className={`absolute inset-y-0 ${
                  isAr ? 'right-0 pr-3.5' : 'left-0 pl-3.5'
                } flex items-center pointer-events-none text-[#d4a373]`}
              >
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={adminT.loginUsernamePlaceholder}
                className={`w-full bg-[#120407] border border-[#481119] focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] rounded-xl ${
                  isAr ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                } py-2.5 text-sm text-white placeholder-white/30 transition-all outline-none font-mono`}
                dir="ltr"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-white mb-1.5">
              {adminT.loginPasswordLabel}
            </label>
            <div className="relative">
              <div
                className={`absolute inset-y-0 ${
                  isAr ? 'right-0 pr-3.5' : 'left-0 pl-3.5'
                } flex items-center pointer-events-none text-[#d4a373]`}
              >
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={adminT.loginPasswordPlaceholder}
                className={`w-full bg-[#120407] border border-[#481119] focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] rounded-xl ${
                  isAr ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10 text-left'
                } py-2.5 text-sm text-white placeholder-white/30 transition-all outline-none font-mono`}
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${
                  isAr ? 'left-0 pl-3' : 'right-0 pr-3'
                } flex items-center text-[#e0b4b8] hover:text-white transition-colors cursor-pointer`}
                title={showPassword ? adminT.hidePassword : adminT.showPassword}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#782229] via-[#8c2630] to-[#782229] hover:from-[#8c2630] hover:to-[#9f2c37] text-white font-extrabold text-xs shadow-lg shadow-[#782229]/40 border border-[#a82e39]/60 cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
                <span>{adminT.loginSubmitBtn}</span>
              </>
            )}
          </button>
        </form>

        {/* Security badge at bottom */}
        <div className="mt-6 pt-4 border-t border-[#3b0f15]/50 flex items-center justify-center gap-1.5 text-[11px] text-[#e0b4b8]/70">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{adminT.loginSecurityBadge}</span>
        </div>
      </div>
    </div>
  );
};
