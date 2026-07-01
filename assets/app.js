const supabase = Supabase.createClient(
    'https://bozcxkjhlhjslperttio.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvemN4a2pobGhqc2xwZXJ0dGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NTk1MjIsImV4cCI6MjA5ODQzNTUyMn0.oRfVst1Js9IwulNXZl_SqcnXXqybCzvIdgFvWcoDSYg'
);

let user = null;

function renderLogin() {
    document.getElementById('root').innerHTML = `
        <div class="login">
            <div class="card">
                <h1>SHADOW</h1>
                <input type="email" id="email" placeholder="Email">
                <input type="password" id="password" placeholder="Пароль">
                <button class="btn-login" onclick="handleLogin()">Войти</button>
                <button class="btn-reg" onclick="handleRegister()">Зарегистрироваться</button>
                <p id="msg" style="margin-top:15px; color:#0f0"></p>
            </div>
        </div>
    `;
}

async function handleRegister() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('msg');
    
    const { error } = await supabase.auth.signUp({ email, password });
    msg.textContent = error ? error.message : "Зарегистрировано! Войдите.";
    msg.style.color = error ? "red" : "lime";
}

async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('msg');
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        msg.textContent = error.message;
        msg.style.color = "red";
    } else {
        user = (await supabase.auth.getUser()).data.user;
        renderDashboard();
    }
}

function renderDashboard() {
    document.getElementById('root').innerHTML = `
        <div class="dashboard">
            <div class="sidebar">
                <h2 style="color:#00ff9d;margin-bottom:30px">SHADOW</h2>
                <div class="nav-item" onclick="showBuilder()">Builder</div>
                <div class="nav-item" onclick="showSubs()">Подписки</div>
                <div onclick="logout()" style="margin-top:100px;color:#f66;cursor:pointer">Выйти</div>
            </div>
            <div class="main" id="content">
                <h1>Панель управления</h1>
                <p>Добро пожаловать</p>
            </div>
        </div>
    `;
}

function showBuilder() {
    document.getElementById('content').innerHTML = `<h1>Builder</h1><p>Купи подписку для доступа</p>`;
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

// Start
window.onload = () => {
    supabase.auth.getSession().then(({ data }) => {
        if (data.session) renderDashboard();
        else renderLogin();
    });
};
