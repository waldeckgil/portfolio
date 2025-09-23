// Adiciona classe às perguntas que terminam com "?"
document.addEventListener('DOMContentLoaded', () => {
    const questionLabels = document.querySelectorAll('.form-group > label');
    questionLabels.forEach(label => {
        if (label.textContent.includes('?')) {
            label.classList.add('question-label');
        }
    });
});

// Suas credenciais Supabase
const SUPABASE_URL = 'https://gjaeiepqzlqhyiqnqxoc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqYWVpZXBxemxxaHlpcW5xeG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMTU4MjcsImV4cCI6MjA3Mzg5MTgyN30.JgSq9rJYG-OFMXcP7pRpo0Mp6JhW3zbLPCAapGUgM60';

// Inicializa o cliente Supabase usando o objeto global
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Obtém os elementos do formulário e feedback
const form = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const loadingSpinner = document.getElementById('loading-spinner');
const formFeedback = document.getElementById('form-feedback');

// Função para mostrar feedback visual
function showFeedback(message, type = 'success') {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `feedback-${type}`;
    formFeedback.style.display = 'block';
    formFeedback.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
    formFeedback.style.color = type === 'success' ? '#155724' : '#721c24';
    formFeedback.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`;
}

// Função para esconder feedback
function hideFeedback() {
    if (!formFeedback) return;
    formFeedback.style.display = 'none';
}

// Função para validar o formulário
function validateForm() {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#dc3545';
        } else {
            field.style.borderColor = '#a3c0ff';
        }
    });
    return isValid;
}

// Função para enviar os dados para o Supabase
async function sendData(data) {
    try {
        const { data: insertedData, error } = await _supabase
            .from('portfolio_solucoes') // O nome da sua tabela
            .insert([data]);

        if (error) {
            console.error('Erro ao enviar para o Supabase:', error.message);
            return { success: false, error: error.message };
        }

        console.log('Dados enviados com sucesso:', insertedData);
        return { success: true };
    } catch (error) {
        console.error('Erro inesperado:', error.message);
        return { success: false, error: error.message };
    }
}

// Adiciona um "ouvinte" de evento para quando o formulário for enviado
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    hideFeedback();

    if (!validateForm()) {
        showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    if (submitBtn) {
        submitBtn.disabled = true;
    }
    if (submitText) {
        submitText.style.display = 'none';
    }
    if (loadingSpinner) {
        loadingSpinner.style.display = 'inline-block';
    }

    const respostas = {};
    const formData = new FormData(form);

    formData.forEach((value, key) => {
        if (key === 'tecnologias_atuais' || key === 'beneficios') {
            if (!respostas[key]) {
                respostas[key] = [];
            }
            respostas[key].push(value);
        } else {
            respostas[key] = value;
        }
    });

    const result = await sendData(respostas);

    if (submitBtn) {
        submitBtn.disabled = false;
    }
    if (submitText) {
        submitText.style.display = 'inline';
    }
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }

    if (result.success) {
        // Substitui o conteúdo do formulário por uma mensagem de agradecimento
        form.innerHTML = '<p style="font-size: 1.2rem; color: #155724; background-color: #d4edda; padding: 20px; border-radius: 8px; border: 1px solid #c3e6cb;">Sua mensagem é muito importante para nós. Vamos analisar suas informações e te responder em breve. !</p>';

        // Chama o serviço de back-end para enviar o e-mail
        try {
            const emailResponse = await fetch('SUA_URL_DO_VERCEL/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(respostas),
            });

            if (!emailResponse.ok) {
                const errorText = await emailResponse.text();
                console.error('Erro na resposta do servidor de e-mail:', emailResponse.status, errorText);
                showFeedback('❌ Erro ao enviar e-mail. Tente novamente.', 'error');
            } else {
                const emailResult = await emailResponse.json();
                if (!emailResult.success) {
                    console.error('Erro ao enviar e-mail:', emailResult.error);
                    showFeedback('❌ Erro ao enviar e-mail. Tente novamente.', 'error');
                } else {
                    console.log('E-mail enviado com sucesso!');
                }
            }
        } catch (error) {
            console.error('Erro na requisição do e-mail:', error);
            showFeedback('❌ Erro de conexão ao enviar e-mail. Verifique sua internet e tente novamente.', 'error');
        }
    } else {
        showFeedback('❌ Erro ao enviar as respostas. Tente novamente.', 'error');
        console.error('Erro ao inserir dados no Supabase:', result.error);
    }
});