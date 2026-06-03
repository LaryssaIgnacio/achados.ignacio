// ==========================================
// MODELO DE CONFIGURAÇÃO — achados.ignacio
// ==========================================
// Copie este arquivo, renomeie para supabase.js
// e preencha com suas credenciais reais do Supabase.
// O arquivo supabase.js está no .gitignore e NÃO vai para o GitHub.

const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_PUBLICA_AQUI';

// ==========================================
// FUNÇÃO BASE
// ==========================================

async function supabaseFetch(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': options.prefer || 'return=representation'
    };
    try {
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers: { ...headers, ...options.headers },
            body: options.body ? JSON.stringify(options.body) : null
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro Supabase:', error);
        throw error;
    }
}

// Cole aqui o restante das funções do seu supabase.js original...
