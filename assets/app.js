const supabase = Supabase.createClient(
    'https://bozcxkjhlhjslperttio.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvemN4a2pobGhqc2xwZXJ0dGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NTk1MjIsImV4cCI6MjA5ODQzNTUyMn0.oRfVst1Js9IwulNXZl_SqcnXXqybCzvIdgFvWcoDSYg'
);

function showLogin() {
    document.getElementById('root').innerHTML = `
        <div class="login-screen">
            <div class="card">
                <h1>SHADOW PANEL</h1>
                <input type="email" id="email" placeholder="Email">
                <input type="password" id="password" placeholder="Пароль">
                <button class="btn-primary" onclick="login()">Войти</button>
                <button class="btn-secondary" onclick="register()">Зарегистрироваться</button>
                <p id="status" style="margin-top:20px"></p>
            </div>
        </div>
    `;
}

async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('status');
    
    const { error } = await supabase.auth.signUp({ email, password });
    status.style.color = error ? '#ff6666' : '#00ff9d';
    status.textContent = error ? error.message : '✅ Зарегистрировано! Войдите.';
}

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('status');
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        status.style.color = '#ff6666';
        status.textContent = error.message;
    } else {
        showDashboard();
    }
}

function showDashboard() {
    document.getElementById('root').innerHTML = `
        <div class="dashboard">
            <div class="sidebar">
                <h2 style="color:#00ff9d;margin-bottom:30px">SHADOW</h2>
                <div class="nav-item active" onclick="showMain()">Панель</div>
                <div class="nav-item" onclick="showBuilder()">Builder</div>
                <div class="nav-item" onclick="showSubs()">Подписки</div>
                <div onclick="logout()" style="margin-top:100px;color:#f66;cursor:pointer">Выйти</div>
            </div>
            <div class="main" id="content">
                <h1>Добро пожаловать</h1>
            </div>
        </div>
    `;
}

function showMain() {
    document.getElementById('content').innerHTML = `<h1>Панель управления</h1>`;
}

function showBuilder() {
    document.getElementById('content').innerHTML = `<h1>Builder</h1><p>Нужна подписка</p>`;
}

function showSubs() {
    document.getElementById('content').innerHTML = `
        <h1>Подписки</h1>
        <p>1 месяц — 500₽</p>
        <p>1 год — 5500₽</p>
        <p>Навсегда — 50000₽</p>
    `;
}

function logout() {
    supabase.auth.signOut();
    location.reload();
}

window.onload = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) showDashboard();
    else showLogin();
};
