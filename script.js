// ===== ナビゲーションメニュー =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// モバイルメニュー開閉
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');

        // ハンバーガーメニューアニメーション
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('show')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ナビゲーションリンククリック時にメニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== アクティブリンクハイライト =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== ヘッダー背景変化 =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', scrollHeader);

// ===== スクロールアニメーション =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素
const animatedElements = document.querySelectorAll('.feature-card, .timeline-item, .portfolio-item, .skill-category');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
// Skills data
const skillsData = {
    ui: {
        title: 'UIスキル',
        skills: [
            { name: 'ワイヤーフレーム', level: 95 },
            { name: 'ビジュアルデザイン', level: 95 },
            { name: 'プロトタイピング', level: 80 },
            { name: 'ユーザビリティテスト', level: 80 },
            { name: 'レスポンシブ対応', level: 90 },
            { name: 'パフォーマンス最適化', level: 90 },
            { name: 'アクセシビリティ対応', level: 90 },
        ]
    },
    technical: {
        title: '開発スキル',
        skills: [
            { name: 'HTML5', level: 95 },
            { name: 'Sassy CSS', level: 95 },
            { name: 'JavaSpript', level: 75 },
        ]
    },
        design: {
        title: 'グラフィックデザイン',
        skills: [
            { name: 'ランディングページ', level: 75 },
            { name: 'ディスプレイ（バナー）広告', level: 95 },
            { name: 'パッケージデザイン', level: 95 },
            { name: 'ポスター・チラシデザイン', level: 75 },
        ]
    },
};
// Initialize skills
let currentSkillCategory = 'ui';
renderSkills(currentSkillCategory);

function switchSkillTab(category) {
    currentSkillCategory = category;

    // Update tab styles
    const tabs = document.querySelectorAll('.skill-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Update title and render skills
    document.getElementById('skillCategoryTitle').textContent = skillsData[category].title;
    renderSkills(category);
}

function renderSkills(category) {
    const container = document.getElementById('skillsContainer');
    const skills = skillsData[category].skills;

    container.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%;" data-level="${skill.level}"></div>
            </div>
        </div>
    `).join('');

    // Animate progress bars
    setTimeout(() => {
        const progressBars = container.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }, 100);
}

// ===== お問い合わせフォーム送信 =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // デモ用のアラート
        alert(`お問い合わせありがとうございます。\n\nお名前: ${formData.name}\nメール: ${formData.email}\n\n※このフォームはデモ用です。実際の送信処理は実装されていません。`);

        // フォームリセット
        contactForm.reset();

        // 実際のプロジェクトでは、ここでAjaxやFetch APIを使ってサーバーに送信します
        // 例:
        // fetch('your-api-endpoint.php', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // });
    });
}

// ===== スムーススクロール（古いブラウザ対応） =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 64;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});