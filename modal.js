const closeBtn = document.getElementById('close-btn');
const modalContainer = document.getElementById('modal-container');
const modalContent = document.getElementById('modal-content');

// すべてのportfolio-modal-*要素を取得
const portfolioButtons = document.querySelectorAll('[id^="portfolio-modal-"]');

// モーダルを開く汎用処理
portfolioButtons.forEach(button => {
    button.addEventListener('click', async () => {
        try {
            // ボタンのIDから番号を取得（例: portfolio-modal-1 → 1）
            const modalNumber = button.id.replace('portfolio-modal-', '');
            const htmlFile = `modal-portfolio-${modalNumber}.html`;

            // 別HTMLファイルを読み込む
            const response = await fetch(htmlFile);
            if (!response.ok) throw new Error('読み込みに失敗しました');

            // テキストとして取得し、モーダル内に挿入
            const text = await response.text();
            modalContent.innerHTML = text;

            // モーダルダイアログを表示
            modalContainer.showModal();

            // 背景部分がスクロールしないようにする
            document.body.style.overflow = "hidden";
        } catch (error) {
            console.error(error);
        }
    });
});

// 閉じるボタンをクリックした時の処理
closeBtn.addEventListener('click', () => {
    modalContainer.close();
});

// モーダルの背景（ダイアログの外側）をクリックした時に閉じる処理
modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        modalContainer.close();
    }
});

// モーダルが閉じられた時の共通処理（背景スクロールの解除）
modalContainer.addEventListener('close', () => {
    document.body.style.overflow = "";
});