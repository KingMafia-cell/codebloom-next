import { useState } from 'react';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

interface Props {
  onUnlock: () => void;
}

const PASSCODE = '123';

export const LockScreen = ({ onUnlock }: Props) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;

    if (password === PASSCODE) {
      sessionStorage.setItem('ide-unlocked', 'true');
      onUnlock();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(`Incorrect password (${3 - newAttempts} attempts remaining)`);
      setPassword('');
      if (newAttempts >= 3) {
        setLocked(true);
        setError('Too many attempts. Locked for 30 seconds.');
        setTimeout(() => { setLocked(false); setAttempts(0); setError(''); }, 30000);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-xs mx-4">
        <div className="glass-strong rounded-2xl p-6 space-y-6 glow-primary">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-lg font-semibold text-foreground">NexCode IDE</h1>
            <p className="text-xs text-muted-foreground">Enter passcode to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Password"
                disabled={locked}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-[11px] text-destructive text-center animate-fade-in">{error}</p>
            )}

            <button
              type="submit"
              disabled={locked || !password}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {locked ? 'Locked' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
