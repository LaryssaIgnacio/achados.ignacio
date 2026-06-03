// ==========================================
// CONFIGURAÇÃO DO SUPABASE - achados.ignacio
// ==========================================

const SUPABASE_URL = 'https://fcbravcgmscceshhohft.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0M8NNIVNYis9nzbRjNpxLQ_IuZEYQeF';

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
            headers: {
                ...headers,
                ...options.headers
            },
            body: options.body
                ? JSON.stringify(options.body)
                : null
        });

        if (!response.ok) {

            const errorText = await response.text();

            console.error('Erro detalhado:', errorText);

            throw new Error(errorText);
        }

        return await response.json();

    } catch (error) {

        console.error('Erro Supabase:', error);

        throw error;
    }
}

// ==========================================
// CARREGAR PRODUTOS
// ==========================================

async function carregarProdutosSupabase(tipo = 'loja') {

    try {

        return await supabaseFetch(
            `pecas?tipo=eq.${tipo}&disponivel=eq.sim&order=created_at.desc`
        );

    } catch (error) {

        console.error('Erro ao carregar produtos:', error);

        return [];
    }
}

// ==========================================
// ADICIONAR PEÇA
// ==========================================

async function adicionarPecaSupabase(dados) {

    try {

        return await supabaseFetch('pecas', {
            method: 'POST',
            body: {
                nome: dados.nome,
                categoria: dados.categoria,
                preco: parseFloat(dados.preco),
                tamanho: dados.tamanho,
                descricao: dados.descricao,
                imagem_url: dados.imagem_url,
                disponivel: dados.disponivel,
                tipo: dados.tipo || 'loja',
                created_at: new Date().toISOString()
            }
        });

    } catch (error) {

        console.error('Erro ao adicionar peça:', error);

        throw error;
    }
}

// ==========================================
// UPLOAD DE IMAGEM (CORRIGIDO)
// O erro anterior era a falta do header Content-Type
// ==========================================

async function uploadImagemSupabase(file) {

    try {

        const bucket = 'Produtos';

        const nomeLimpo = file.name
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9._-]/g, "");

        const nomeArquivo = `${Date.now()}_${Math.random().toString(36).slice(2)}_${nomeLimpo}`;
        const caminhoArquivo = `produtos/${nomeArquivo}`;

        const response = await fetch(
            `${SUPABASE_URL}/storage/v1/object/${bucket}/${caminhoArquivo}`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': file.type
                },
                body: file
            }
        );

        if (!response.ok) {

            const erro = await response.text();

            console.error('Erro real do upload:', erro);

            throw new Error(erro);
        }

        return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${caminhoArquivo}`;

    } catch (error) {

        console.error('Erro no upload:', error);

        throw error;
    }
}

// ==========================================
// UPLOAD DE MÚLTIPLAS IMAGENS
// ==========================================

async function uploadMultiplasImagensSupabase(files) {
    const urls = [];
    for (const file of Array.from(files)) {
        const url = await uploadImagemSupabase(file);
        urls.push(url);
    }
    return urls.join(', ');
}

// ==========================================
// EXCLUIR PEÇA
// ==========================================

async function excluirPecaSupabase(id) {

    return await supabaseFetch(`pecas?id=eq.${id}`, {
        method: 'DELETE'
    });
}

// ==========================================
// ATUALIZAR PEÇA
// ==========================================

async function atualizarPecaSupabase(id, dados) {

    return await supabaseFetch(`pecas?id=eq.${id}`, {
        method: 'PATCH',
        body: dados
    });
}

// ==========================================
// VERIFICAR CONFIGURAÇÃO
// ==========================================

function verificarConfiguracaoSupabase() {

    if (!SUPABASE_URL || !SUPABASE_KEY) {

        console.error('Supabase não configurado!');

        return false;
    }

    return true;
}

// ==========================================
// INICIAR
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    verificarConfiguracaoSupabase();

});
