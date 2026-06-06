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

// ===== お問い合わせフォーム送信 =====
//const contactForm = document.getElementById('contact-form');

//if (contactForm) {
 //   contactForm.addEventListener('submit', (e) => {
//        e.preventDefault();
//
  //      const formData = {
 //           name: document.getElementById('name').value,
 //           email: document.getElementById('email').value,
 //           subject: document.getElementById('subject').value,
 //           message: document.getElementById('message').value
   //     };

        // アラート
   //     alert(`お問い合わせありがとうございます。\n\nお名前: ${formData.name}\nメール: ${formData.email}`);

        // フォームリセット
 //       contactForm.reset();
  //  });
//}

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