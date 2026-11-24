
/* =====================================
   SENWALLPROJECT
   SIMPLE CODE BUILDER v1.0
===================================== */

// =====================================
// 1. ELEMENT SELECTORS
// =====================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Sidebar
const sidebar = $("#sidebar");
const pageTitle = $("#pageTitle");

// Editor
const htmlCode = $("#htmlCode");
const cssCode = $("#cssCode");
const jsCode = $("#jsCode");

// Project
const projectName = $("#projectName");

// Preview
const previewFrame = $("#previewFrame");

// Local Storage
const STORAGE_KEY = "senwall_projects";

// State
let currentCategory = "all";


// =====================================
// 2. TEMPLATE DATA
// =====================================

const templates = [
    {
        id: 1,
        name: "Navbar",
        category: "navigation",
        description: "Navigasi website sederhana",
        html: `<nav class="navbar">
    <h2>My Website</h2>
    <div class="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
    </div>
</nav>`,
        css: `.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    background: #222;
    color: white;
}
.nav-links a {
    color: white;
    text-decoration: none;
    margin-left: 15px;
}`
    },
    {
        id: 2,
        name: "Login Form",
        category: "form",
        description: "Form login sederhana",
        html: `<div class="login-box">
    <h2>Login</h2>
    <input type="text" placeholder="Username">
    <input type="password" placeholder="Password">
    <button>Masuk</button>
</div>`,
        css: `.login-box {
    max-width: 320px;
    margin: 40px auto;
    padding: 25px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 3px 15px #0002;
}
.login-box input {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    box-sizing: border-box;
}
.login-box button {
    width: 100%;
    padding: 12px;
    background: #222;
    color: white;
    border: none;
    border-radius: 6px;
}`
    },
    {
        id: 3,
        name: "Register Form",
        category: "form",
        description: "Form pendaftaran",
        html: `<div class="register-box">
    <h2>Daftar Akun</h2>
    <input type="text" placeholder="Nama">
    <input type="email" placeholder="Email">
    <input type="password" placeholder="Password">
    <button>Daftar</button>
</div>`,
        css: `.register-box {
    max-width: 340px;
    margin: 30px auto;
    padding: 25px;
    background: white;
    border-radius: 12px;
}
.register-box input {
    width: 100%;
    padding: 12px;
    margin: 7px 0;
    box-sizing: border-box;
}
.register-box button {
    width: 100%;
    padding: 12px;
    background: #333;
    color: white;
    border: none;
}`
    },
    {
        id: 4,
        name: "Product Card",
        category: "card",
        description: "Kartu produk",
        html: `<div class="product-card">
    <div class="product-image">Gambar Produk</div>
    <h3>Nama Produk</h3>
    <p>Deskripsi produk singkat.</p>
    <strong>Rp100.000</strong>
    <button>Beli Sekarang</button>
</div>`,
        css: `.product-card {
    max-width: 250px;
    padding: 15px;
    border-radius: 12px;
    background: white;
    box-shadow: 0 3px 12px #0002;
}
.product-image {
    height: 130px;
    background: #ddd;
    display: grid;
    place-items: center;
}
.product-card button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
}`
    },
    {
        id: 5,
        name: "Admin Dashboard",
        category: "layout",
        description: "Layout dashboard admin",
        html: `<div class="dashboard">
    <h2>Admin Dashboard</h2>
    <div class="stats">
        <div class="stat-card">Total Pengguna: 120</div>
        <div class="stat-card">Total Proyek: 25</div>
    </div>
</div>`,
        css: `.dashboard {
    padding: 20px;
    background: #f4f4f4;
}
.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 15px;
}
.stat-card {
    padding: 20px;
    background: white;
    border-radius: 10px;
}`
    },
    {
        id: 6,
        name: "Footer",
        category: "layout",
        description: "Footer website",
        html: `<footer class="footer">
    <h3>My Website</h3>
    <p>Terima kasih sudah berkunjung.</p>
    <small>© 2026 My Website</small>
</footer>`,
        css: `.footer {
    padding: 25px;
    text-align: center;
    background: #222;
    color: white;
}`
    },
    {
        id: 7,
        name: "Button Collection",
        category: "other",
        description: "Kumpulan tombol",
        html: `<div class="buttons">
    <button class="primary">Primary</button>
    <button class="secondary">Secondary</button>
    <button class="outline">Outline</button>
</div>`,
        css: `.buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.buttons button {
    padding: 12px 20px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
}
.primary {
    background: #222;
    color: white;
}
.secondary {
    background: #ddd;
}
.outline {
    background: transparent;
    border: 1px solid #222 !important;
}`
    },
    {
        id: 8,
        name: "Popup Modal",
        category: "other",
        description: "Popup informasi",
        html: `<div class="modal">
    <div class="modal-content">
        <h2>Halo!</h2>
        <p>Ini adalah popup sederhana.</p>
        <button onclick="this.parentElement.parentElement.remove()">Tutup</button>
    </div>
</div>`,
        css: `.modal {
    position: fixed;
    inset: 0;
    background: #0008;
    display: grid;
    place-items: center;
}
.modal-content {
    background: white;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
}`
    },
    {
        id: 9,
        name: "Hero Section",
        category: "layout",
        description: "Bagian pembuka website",
        html: `<section class="hero">
    <h1>Selamat Datang</h1>
    <p>Bangun website impianmu bersama kami.</p>
    <button>Mulai Sekarang</button>
</section>`,
        css: `.hero {
    padding: 70px 20px;
    text-align: center;
    background: #222;
    color: white;
}
.hero button {
    padding: 12px 22px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
}`
    },
    {
        id: 10,
        name: "Contact Form",
        category: "form",
        description: "Form pesan pengunjung",
        html: `<form class="contact-form">
    <h2>Hubungi Kami</h2>
    <input type="text" placeholder="Nama">
    <input type="email" placeholder="Email">
    <textarea placeholder="Pesan"></textarea>
    <button type="submit">Kirim Pesan</button>
</form>`,
        css: `.contact-form {
    max-width: 350px;
    margin: 30px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
}
.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 11px;
    margin: 7px 0;
    box-sizing: border-box;
}
.contact-form textarea {
    min-height: 100px;
}
.contact-form button {
    padding: 12px;
    width: 100%;
}`
    },
   {
      id: 11,
      name: "content Form",
      category: "form",
      description: "scrape javascript, kotak bergerak",
      js: `<div id="kotak" style="width:50px;height:50px;background:blue;position:absolute;"></div>

<script>
const kotak = document.getElementById('kotak');
let pos = 0;
function gerak() {
  pos += 2;
  kotak.style.left = pos + 'px';
  if (pos < 300) requestAnimationFrame(gerak);
}
gerak();
</script>`
   }

];


// =====================================
// 3. HELPER FUNCTIONS
// =====================================

// Mengamankan teks sebelum ditampilkan sebagai HTML
function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, function(char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[char];
    });
}

// Menampilkan notifikasi
let notificationTimer;

function notify(message) {
    const notification = $("#notification");
    const notificationMessage = $("#notificationMessage");

    if (!notification || !notificationMessage) {
        console.log(message);
        return;
    }

    notificationMessage.textContent = message;
    notification.classList.add("show");

    clearTimeout(notificationTimer);

    notificationTimer = setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}

// =====================================
// 4. NAVIGATION SYSTEM
// =====================================

function showPage(pageId) {
    const pages = $$(".page");
    const navItems = $$(".nav-item");

    // Sembunyikan semua halaman
    pages.forEach(page => {
        page.classList.remove("active");
    });

    // Hilangkan status aktif dari navigasi
    navItems.forEach(item => {
        item.classList.remove("active");
    });

    // Tampilkan halaman yang dipilih
    const targetPage = $("#" + pageId);

    if (!targetPage) {
        console.warn("Halaman tidak ditemukan:", pageId);
        return;
    }

    targetPage.classList.add("active");

    // Aktifkan menu navigasi
    const activeNav = $(`.nav-item[data-page="${pageId}"]`);

    if (activeNav) {
        activeNav.classList.add("active");
    }

    // Ubah judul halaman
    const titles = {
        dashboard: "Dashboard",
        templates: "Templates",
        editor: "Code Editor",
        preview: "Live Preview",
        components: "Components",
        projects: "My Projects",
        settings: "Settings"
    };

    if (pageTitle) {
        pageTitle.textContent = titles[pageId] || "SENWALLPROJECT";
    }

    // Tutup sidebar pada perangkat mobile
    if (sidebar) {
        sidebar.classList.remove("open");
    }
}

// Klik menu navigasi
$$(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        const pageId = item.dataset.page;

        if (pageId) {
            showPage(pageId);
        }
    });
});

// Tombol menuju halaman tertentu
$$("[data-goto]").forEach(button => {
    button.addEventListener("click", () => {
        const pageId = button.dataset.goto;

        if (pageId) {
            showPage(pageId);
        }
    });
});

// Buka sidebar
const menuToggle = $("#menuToggle");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        if (sidebar) {
            sidebar.classList.toggle("open");
        }
    });
}

// Tutup sidebar
const closeSidebar = $("#closeSidebar");

if (closeSidebar) {
    closeSidebar.addEventListener("click", () => {
        if (sidebar) {
            sidebar.classList.remove("open");
        }
    });
}


// =====================================
// 5. TEMPLATE RENDER SYSTEM
// =====================================

function renderTemplates() {
    const templateGrid = $("#templateGrid");

    if (!templateGrid) return;

    const searchInput = $("#templateSearch");
    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const filteredTemplates = templates.filter(template => {
        const matchesSearch =
            template.name.toLowerCase().includes(searchValue) ||
            template.description.toLowerCase().includes(searchValue);

        const matchesCategory =
            currentCategory === "all" ||
            template.category === currentCategory;

        return matchesSearch && matchesCategory;
    });

    if (filteredTemplates.length === 0) {
        templateGrid.innerHTML = `
            <div class="empty-state">
                <h3>Template tidak ditemukan</h3>
                <p>Coba kata kunci atau kategori lain.</p>
            </div>
        `;
        return;
    }

    templateGrid.innerHTML = filteredTemplates.map(template => `
        <div class="template-card">
            <div class="template-card-info">
                <h3>${escapeHTML(template.name)}</h3>
                <p>${escapeHTML(template.description)}</p>
                <span class="template-category">
                    ${escapeHTML(template.category)}
                </span>
            </div>

            <button
                class="use-template-btn"
                data-template-id="${template.id}"
            >
                Gunakan Template
            </button>
        </div>
    `).join("");
}

// Pencarian template
const templateSearch = $("#templateSearch");

if (templateSearch) {
    templateSearch.addEventListener("input", renderTemplates);
}

// Tombol kategori
$$(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        currentCategory = button.dataset.category || "all";

        $$(".category-btn").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        renderTemplates();
    });
});


// =====================================
// 6. USE TEMPLATE SYSTEM
// =====================================

function useTemplate(templateId) {
    const template = templates.find(item => {
        return item.id === Number(templateId);
    });

    if (!template) {
        notify("Template tidak ditemukan!");
        return;
    }

    // Masukkan kode template ke editor
    if (htmlCode) {
        htmlCode.value = template.html;
    }

    if (cssCode) {
        cssCode.value = template.css;
    }

    // Kosongkan JavaScript sebelumnya
    if (jsCode) {
        jsCode.value = "";
    }

    // Isi nama proyek
    if (projectName) {
        projectName.value = template.name;
    }

    // Buka halaman editor
    showPage("editor");

    // Perbarui preview
    updatePreview();

    notify("Template berhasil digunakan!");
}

// Event klik tombol Gunakan Template
const templateGrid = $("#templateGrid");

if (templateGrid) {
    templateGrid.addEventListener("click", event => {
        const button = event.target.closest(".use-template-btn");

        if (!button) return;

        const templateId = button.dataset.templateId;

        useTemplate(templateId);
    });
}


// =====================================
// 7. EDITOR TAB SYSTEM
// =====================================

function switchEditor(type) {
    const editorTabs = $$(".editor-tab");

    const editorPanels = [
        $("#htmlPanel"),
        $("#cssPanel"),
        $("#javascriptPanel")
    ];

    // Nonaktifkan semua tab
    editorTabs.forEach(tab => {
        tab.classList.remove("active");
    });

    // Sembunyikan semua panel
    editorPanels.forEach(panel => {
        if (panel) {
            panel.classList.remove("active");
        }
    });

    // Aktifkan tab yang dipilih
    const selectedTab = $(
        `.editor-tab[data-editor="${type}"]`
    );

    if (selectedTab) {
        selectedTab.classList.add("active");
    }

    // Tampilkan panel yang dipilih
    const selectedPanel = $("#" + type + "Panel");

    if (selectedPanel) {
        selectedPanel.classList.add("active");
    }
}

// Event klik tab editor
$$(".editor-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        const editorType = tab.dataset.editor;

        if (editorType) {
            switchEditor(editorType);
        }
    });
});


// =====================================
// 8. LIVE PREVIEW SYSTEM
// =====================================

function updatePreview() {
    if (!previewFrame) return;

    const html = htmlCode ? htmlCode.value : "";
    const css = cssCode ? cssCode.value : "";
    const javascript = jsCode ? jsCode.value : "";

    // Mencegah tag script penutup merusak srcdoc
    const safeJS = javascript.replace(
        /<\/script/gi,
        "<\\/script"
    );

    const previewContent = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 15px;
            font-family: Arial, sans-serif;
        }

        ${css}
    </style>
</head>
<body>

    ${html}

    <script>
        ${safeJS}
    <\/script>

</body>
</html>
`;

    previewFrame.srcdoc = previewContent;
}

// Tombol refresh preview
const refreshPreview = $("#refreshPreview");

if (refreshPreview) {
    refreshPreview.addEventListener("click", () => {
        updatePreview();
        notify("Preview diperbarui!");
    });
}

// Perbarui preview saat kode berubah
[htmlCode, cssCode, jsCode].forEach(editor => {
    if (editor) {
        editor.addEventListener("input", updatePreview);
    }
});


// =====================================
// 9. COPY CODE SYSTEM
// =====================================

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        notify("Kode berhasil disalin!");
    } catch (error) {
        // Fallback jika Clipboard API tidak tersedia
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.select();

        try {
            const copied = document.execCommand("copy");

            if (copied) {
                notify("Kode berhasil disalin!");
            } else {
                notify("Gagal menyalin kode!");
            }
        } catch (fallbackError) {
            notify("Browser tidak mendukung salin kode.");
        }

        textarea.remove();
    }
}

// Tombol salin kode editor aktif
const copyCurrentCode = $("#copyCurrentCode");

if (copyCurrentCode) {
    copyCurrentCode.addEventListener("click", () => {
        const activeTab = $(".editor-tab.active");
        const editorType = activeTab
            ? activeTab.dataset.editor
            : "html";

        let code = "";

        if (editorType === "html" && htmlCode) {
            code = htmlCode.value;
        } else if (editorType === "css" && cssCode) {
            code = cssCode.value;
        } else if (editorType === "javascript" && jsCode) {
            code = jsCode.value;
        }

        copyText(code);
    });
}


// =====================================
// 10. LOCAL STORAGE SYSTEM
// =====================================

// Mengambil semua proyek tersimpan
function getProjects() {
    try {
        const savedProjects = localStorage.getItem(STORAGE_KEY);

        return savedProjects
            ? JSON.parse(savedProjects)
            : [];
    } catch (error) {
        console.error("Gagal membaca proyek:", error);
        return [];
    }
}

// Menyimpan daftar proyek
function saveProjects(projects) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(projects)
        );

        return true;
    } catch (error) {
        console.error("Gagal menyimpan proyek:", error);
        notify("Penyimpanan gagal!");
        return false;
    }
}

// Menyimpan proyek editor saat ini
function saveProject() {
    const name = projectName && projectName.value.trim()
        ? projectName.value.trim()
        : "Proyek Tanpa Nama";

    const html = htmlCode ? htmlCode.value : "";
    const css = cssCode ? cssCode.value : "";
    const javascript = jsCode ? jsCode.value : "";

    const projects = getProjects();

    const existingIndex = projects.findIndex(project => {
        return project.name.toLowerCase() === name.toLowerCase();
    });

    const projectData = {
        id: existingIndex >= 0
            ? projects[existingIndex].id
            : Date.now(),

        name: name,
        html: html,
        css: css,
        javascript: javascript,
        updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
        projects[existingIndex] = projectData;
    } else {
        projects.unshift(projectData);
    }

    if (saveProjects(projects)) {
        if (projectName) {
            projectName.value = name;
        }

        notify("Proyek berhasil disimpan!");

        updateDashboard();
        renderProjects();
        renderRecentProjects();
    }
}

// Tombol simpan proyek
const saveProjectButton = $("#saveProject");

if (saveProjectButton) {
    saveProjectButton.addEventListener("click", saveProject);
}


// =====================================
// 11. PROJECT MANAGEMENT SYSTEM
// =====================================

// Menampilkan daftar proyek
function renderProjects() {
    const projectsGrid = $("#projectsGrid");

    if (!projectsGrid) return;

    const searchInput = $("#projectSearch");
    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const projects = getProjects();

    const filteredProjects = projects.filter(project => {
        return project.name.toLowerCase().includes(searchValue);
    });

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-state">
                <h3>Belum ada proyek</h3>
                <p>Simpan proyek pertamamu di Code Editor.</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card">
            <div class="project-info">
                <h3>${escapeHTML(project.name)}</h3>
                <p>
                    Diperbarui:
                    ${escapeHTML(
                        new Date(project.updatedAt).toLocaleString("id-ID")
                    )}
                </p>
            </div>

            <div class="project-actions">
                <button
                    class="open-project-btn"
                    data-id="${project.id}"
                >
                    Buka
                </button>

                <button
                    class="delete-project-btn"
                    data-id="${project.id}"
                >
                    Hapus
                </button>
            </div>
        </div>
    `).join("");
}

// Membuka proyek
function openProject(projectId) {
    const project = getProjects().find(item => {
        return String(item.id) === String(projectId);
    });

    if (!project) {
        notify("Proyek tidak ditemukan!");
        return;
    }

    if (projectName) {
        projectName.value = project.name;
    }

    if (htmlCode) {
        htmlCode.value = project.html || "";
    }

    if (cssCode) {
        cssCode.value = project.css || "";
    }

    if (jsCode) {
        jsCode.value = project.javascript || "";
    }

    showPage("editor");
    updatePreview();

    notify("Proyek berhasil dibuka!");
}

// Menghapus proyek
function deleteProject(projectId) {
    const confirmed = confirm(
        "Apakah kamu yakin ingin menghapus proyek ini?"
    );

    if (!confirmed) return;

    const projects = getProjects().filter(project => {
        return String(project.id) !== String(projectId);
    });

    if (saveProjects(projects)) {
        renderProjects();
        renderRecentProjects();
        updateDashboard();

        notify("Proyek berhasil dihapus!");
    }
}

// Event tombol proyek
const projectsGrid = $("#projectsGrid");

if (projectsGrid) {
    projectsGrid.addEventListener("click", event => {
        const openButton = event.target.closest(".open-project-btn");
        const deleteButton = event.target.closest(".delete-project-btn");

        if (openButton) {
            openProject(openButton.dataset.id);
        }

        if (deleteButton) {
            deleteProject(deleteButton.dataset.id);
        }
    });
}

// Pencarian proyek
const projectSearch = $("#projectSearch");

if (projectSearch) {
    projectSearch.addEventListener("input", renderProjects);
}



// =====================================
// 12. RECENT PROJECTS SYSTEM
// =====================================

function renderRecentProjects() {
    const recentContainer = $("#recentProjects");

    if (!recentContainer) return;

    const projects = getProjects()
        .sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        })
        .slice(0, 5);

    if (projects.length === 0) {
        recentContainer.innerHTML = `
            <div class="empty-state">
                <p>Belum ada proyek terbaru.</p>
            </div>
        `;
        return;
    }

    recentContainer.innerHTML = projects.map(project => `
        <div class="recent-project-item">
            <div class="recent-project-info">
                <h4>${escapeHTML(project.name)}</h4>
                <small>
                    ${escapeHTML(
                        new Date(project.updatedAt).toLocaleString("id-ID")
                    )}
                </small>
            </div>

            <button
                class="open-recent-btn"
                data-id="${project.id}"
            >
                Buka
            </button>
        </div>
    `).join("");
}

// Event tombol buka proyek terbaru
const recentProjects = $("#recentProjects");

if (recentProjects) {
    recentProjects.addEventListener("click", event => {
        const button = event.target.closest(".open-recent-btn");

        if (!button) return;

        openProject(button.dataset.id);
    });
}


// =====================================
// 13. EXPORT CODE SYSTEM
// =====================================

// Membuat dan mengunduh file
function downloadFile(filename, content, type) {
    const blob = new Blob([content], {
        type: type
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
}

// Membuat tombol export
function createExportButtons() {
    const editorFooter = $(".editor-footer");

    if (!editorFooter) return;

    // Hindari membuat tombol ganda
    if ($("#exportButtons")) return;

    const exportContainer = document.createElement("div");

    exportContainer.id = "exportButtons";
    exportContainer.className = "export-buttons";

    exportContainer.innerHTML = `
        <button type="button" id="exportHTML">
            Export HTML
        </button>

        <button type="button" id="exportCSS">
            Export CSS
        </button>

        <button type="button" id="exportJS">
            Export JS
        </button>
    `;

    editorFooter.appendChild(exportContainer);

    // Export HTML
    $("#exportHTML").addEventListener("click", () => {
        const content = htmlCode ? htmlCode.value : "";

        downloadFile(
            "index.html",
            content,
            "text/html;charset=utf-8"
        );

        notify("File HTML berhasil dibuat!");
    });

    // Export CSS
    $("#exportCSS").addEventListener("click", () => {
        const content = cssCode ? cssCode.value : "";

        downloadFile(
            "style.css",
            content,
            "text/css;charset=utf-8"
        );

        notify("File CSS berhasil dibuat!");
    });

    // Export JavaScript
    $("#exportJS").addEventListener("click", () => {
        const content = jsCode ? jsCode.value : "";

        downloadFile(
            "script.js",
            content,
            "text/javascript;charset=utf-8"
        );

        notify("File JavaScript berhasil dibuat!");
    });
}


// =====================================
// 14. RESET EDITOR SYSTEM
// =====================================

function resetEditor() {
    const confirmed = confirm(
        "Yakin ingin mengosongkan semua kode editor?"
    );

    if (!confirmed) return;

    // Kosongkan HTML
    if (htmlCode) {
        htmlCode.value = "";
    }

    // Kosongkan CSS
    if (cssCode) {
        cssCode.value = "";
    }

    // Kosongkan JavaScript
    if (jsCode) {
        jsCode.value = "";
    }

    // Reset nama proyek
    if (projectName) {
        projectName.value = "";
    }

    // Perbarui preview
    updatePreview();

    notify("Editor berhasil direset!");
}

// Event tombol reset
const resetCodeButton = $("#resetCode");

if (resetCodeButton) {
    resetCodeButton.addEventListener("click", resetEditor);
}


// =====================================
// 15. CUSTOM COMPONENT GENERATOR
// =====================================

function createCustomComponent() {
    const typeInput = $("#componentType");
    const textInput = $("#componentText");
    const colorInput = $("#componentColor");
    const radiusInput = $("#componentRadius");
    const sizeInput = $("#componentSize");
    const preview = $("#componentPreview");

    if (!typeInput || !textInput || !preview) {
        notify("Form komponen tidak ditemukan!");
        return;
    }

    const type = typeInput.value;
    const text = textInput.value.trim() || "Komponen Baru";
    const color = colorInput ? colorInput.value : "#222222";
    const radius = radiusInput ? radiusInput.value : "8";
    const size = sizeInput ? sizeInput.value : "16";

    const safeText = escapeHTML(text);

    let html = "";
    let css = "";

    // Button
    if (type === "button") {
        html = `<button class="custom-component">${safeText}</button>`;

        css = `
.custom-component {
    background: ${color};
    color: white;
    padding: 12px 22px;
    border: none;
    border-radius: ${radius}px;
    font-size: ${size}px;
    cursor: pointer;
}
`;
    }

    // Card
    else if (type === "card") {
        html = `
<div class="custom-component">
    <h3>${safeText}</h3>
    <p>Deskripsi komponen kamu.</p>
</div>`;

        css = `
.custom-component {
    background: ${color};
    color: white;
    padding: 20px;
    border-radius: ${radius}px;
    font-size: ${size}px;
}
`;
    }

    // Heading
    else if (type === "heading") {
        html = `<h2 class="custom-component">${safeText}</h2>`;

        css = `
.custom-component {
    color: ${color};
    font-size: ${size}px;
    border-radius: ${radius}px;
}
`;
    }

    // Badge
    else if (type === "badge") {
        html = `<span class="custom-component">${safeText}</span>`;

        css = `
.custom-component {
    display: inline-block;
    background: ${color};
    color: white;
    padding: 6px 12px;
    border-radius: ${radius}px;
    font-size: ${size}px;
}
`;
    }

    else {
        notify("Jenis komponen tidak dikenal!");
        return;
    }

    // Tampilkan preview
    preview.innerHTML = `
        <style>${css}</style>
        ${html}
    `;

    // Simpan hasil untuk digunakan di editor
    preview.dataset.html = html;
    preview.dataset.css = css;

    notify("Komponen berhasil dibuat!");
}

// Tombol generate komponen
const generateComponentButton = $("#generateComponent");

if (generateComponentButton) {
    generateComponentButton.addEventListener(
        "click",
        createCustomComponent
    );
}


// =====================================
// 16. CLEAR DATA SYSTEM
// =====================================

function clearAllData() {
    const confirmed = confirm(
        "PERINGATAN!\n\n" +
        "Semua proyek yang tersimpan akan dihapus.\n" +
        "Apakah kamu yakin ingin melanjutkan?"
    );

    if (!confirmed) return;

    try {
        // Hapus data proyek SENWALLPROJECT
        localStorage.removeItem(STORAGE_KEY);

        // Perbarui tampilan
        renderProjects();
        renderRecentProjects();
        updateDashboard();

        notify("Semua proyek berhasil dihapus!");
    } catch (error) {
        console.error("Gagal menghapus data:", error);
        notify("Gagal menghapus data!");
    }
}

// Event tombol hapus semua data
const clearDataButton = $("#clearData");

if (clearDataButton) {
    clearDataButton.addEventListener("click", clearAllData);
}


// =====================================
// 17. DASHBOARD STATISTICS SYSTEM
// =====================================

function updateDashboard() {
    const totalProjects = $("#totalProjects");
    const totalTemplates = $("#totalTemplates");

    const projects = getProjects();

    // Hitung jumlah proyek
    if (totalProjects) {
        totalProjects.textContent = projects.length;
    }

    // Hitung jumlah template
    if (totalTemplates) {
        totalTemplates.textContent = templates.length;
    }

    // Perbarui daftar proyek terbaru
    renderRecentProjects();
}


// =====================================
// 18. INITIALIZATION SYSTEM
// =====================================

function initializeApp() {
    console.log("SENWALLPROJECT berhasil dimulai!");

    // Tampilkan halaman Dashboard
    showPage("dashboard");

    // Tampilkan template
    renderTemplates();

    // Tampilkan proyek tersimpan
    renderProjects();

    // Tampilkan proyek terbaru
    renderRecentProjects();

    // Perbarui statistik Dashboard
    updateDashboard();

    // Buat tombol export
    createExportButtons();

    // Tampilkan preview awal
    updatePreview();

    // Atur tab editor awal
    switchEditor("html");

    console.log("Semua fitur SENWALLPROJECT siap digunakan!");
}

// Jalankan aplikasi setelah HTML selesai dimuat
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}
