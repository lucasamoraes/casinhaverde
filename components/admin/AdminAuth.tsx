import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Button } from '../Button';
import { SectionTitle } from '../SectionTitle';
import { ArrowLeft, Lock, Mail, Key } from 'lucide-react';

interface AdminAuthProps {
  onLogin: () => void;
  onBack: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin, onBack }) => {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage({ type: 'error', text: 'Erro ao entrar: ' + error.message });
      setLoading(false);
    } else {
      onLogin();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Verificação do Código da Escola
    if (schoolCode !== 'casinhaverde2026!') {
      setMessage({ type: 'error', text: 'Código da escola inválido. Acesso negado.' });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage({ type: 'error', text: 'Erro ao cadastrar: ' + error.message });
    } else {
      setMessage({ type: 'success', text: 'Cadastro realizado! Verifique seu email para confirmar.' });
      setView('login');
    }
    setLoading(false);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/admin',
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Email de recuperação enviado!' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-lg border border-gray-100">
        
        <Button variant="outline" size="sm" onClick={onBack} className="mb-6 flex items-center gap-2">
           <ArrowLeft size={16} /> Voltar ao Site
        </Button>

        <div className="text-center mb-8">
           <div className="bg-casinha-leaf w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
             <Lock size={32} />
           </div>
           <h2 className="text-3xl font-display font-bold text-casinha-brown">Área Restrita</h2>
           <p className="text-gray-500">Gestão de conteúdo da Casinha Verde</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-bold text-center ${message.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-600 ml-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 rounded-full bg-gray-50 border border-gray-200 focus:border-casinha-leaf outline-none" 
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-600 ml-2">Senha</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 rounded-full bg-gray-50 border border-gray-200 focus:border-casinha-leaf outline-none" 
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button type="button" onClick={() => setView('forgot')} className="text-sm text-casinha-leaf font-bold hover:underline">
                Esqueci minha senha
              </button>
            </div>

            <Button type="submit" className="w-full bg-casinha-leaf hover:bg-green-800" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="text-center pt-4 border-t border-gray-100 mt-6">
              <p className="text-gray-600 text-sm">Não tem acesso?</p>
              <button type="button" onClick={() => setView('register')} className="text-casinha-brown font-bold hover:underline mt-1">
                Cadastrar Novo Usuário
              </button>
            </div>
          </form>
        )}

        {view === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-600 ml-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-3 rounded-full bg-gray-50 border border-gray-200 outline-none" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-600 ml-2">Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-3 rounded-full bg-gray-50 border border-gray-200 outline-none" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-casinha-red ml-2">Código da Escola *</label>
              <input 
                type="password" 
                value={schoolCode} 
                onChange={(e) => setSchoolCode(e.target.value)} 
                className="w-full px-6 py-3 rounded-full bg-gray-50 border border-casinha-red/30 focus:border-casinha-red outline-none" 
                placeholder="Insira o código de segurança"
                required 
              />
            </div>

            <Button type="submit" className="w-full bg-casinha-brown hover:bg-brown-800" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </Button>
            
            <button type="button" onClick={() => setView('login')} className="block w-full text-center text-sm text-gray-500 font-bold hover:underline mt-4">
              Voltar para Login
            </button>
          </form>
        )}

        {view === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-4">
            <p className="text-sm text-gray-600 mb-4 text-center">Digite seu email para receber um link de redefinição de senha.</p>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-600 ml-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-3 rounded-full bg-gray-50 border border-gray-200 outline-none" required />
            </div>
            <Button type="submit" className="w-full bg-casinha-leaf hover:bg-green-800" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Email'}
            </Button>
            <button type="button" onClick={() => setView('login')} className="block w-full text-center text-sm text-gray-500 font-bold hover:underline mt-4">
              Voltar para Login
            </button>
          </form>
        )}

      </div>
    </div>
  );
};