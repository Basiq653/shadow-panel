const supabase = Supabase.createClient(
    'https://bozcxkjhlhjslperttio.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvemN4a2pobGhqc2xwZXJ0dGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NTk1MjIsImV4cCI6MjA5ODQzNTUyMn0.oRfVst1Js9IwulNXZl_SqcnXXqybCzvIdgFvWcoDSYg'
);

async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || password.length < 6) return alert("Введите email и пароль (6+ символов)");
    
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("✅ Регистрация успешна! Теперь войдите.");
}

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    showSection('main');
}

function logout() {
    supabase.auth.signOut();
    location.reload();
}

function showSection(section) {
    const content = document.getElementById('main-content');
    
    if (section === 'main') {
        content.innerHTML = `<h1>Панель управления</h1><p>Добро пожаловать в Shadow Panel.</p>`;
    } else if (section === 'builder') {
        content.innerHTML = `
            <h1>Builder</h1>
            <div style="background:#181818;padding:80px;text-align:center;border-radius:12px;margin-top:30px;">
                <h2>Доступ закрыт</h2>
                <p style="margin:20px 0;color:#aaa;">Купите подписку для доступа к Builder</p>
                <button onclick="showSection('subs')" style="padding:15px 40px;background:#00ff9d;color:black;border:none;border-radius:8px;">Купить подписку</button>
            </div>`;
    } else if (section === 'subs') {
        content.innerHTML = `
            <h1>Подписки</h1>
            <div style="display:flex;gap:20px;margin-top:30px;flex-wrap:wrap;">
                <div style="flex:1;min-width:280px;background:#181818;padding:30px;border-radius:12px;text-align:center;">
                    <h2>1 Месяц</h2><h1 style="color:#00ff9d;">500₽</h1>
                    <button onclick="buyPlan('1 месяц')">Купить</button>
                </div>
                <div style="flex:1;min-width:280px;background:#181818;padding:30px;border-radius:12px;text-align:center;border:2px solid #00ff9d;">
                    <h2>1 Год</h2><h1 style="color:#00ff9d;">5500₽</h1>
                    <button onclick="buyPlan('1 год')">Купить</button>
                </div>
                <div style="flex:1;min-width:280px;background:#181818;padding:30px;border-radius:12px;text-align:center;">
                    <h2>Навсегда</h2><h1 style="color:#00ff9d;">50000₽</h1>
                    <button onclick="buyPlan('Навсегда')">Купить</button>
                </div>
            </div>`;
    }
}

function buyPlan(plan) {
    alert(`Вы выбрали: ${plan}\nОплата в разработке.`);
}

// Auto-login
window.onload = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        showSection('main');
    }
};