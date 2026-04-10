/* =============================================
   PROMPT STUDIO — App Logic
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // DOM
    const $ = id => document.getElementById(id);

    const inputNama = $('inputNama');
    const inputDesc = $('inputDesc');
    const inputTarget = $('inputTarget');
    const selJenis = $('selJenis');
    const selTech = $('selTech');
    const selSkema = $('selSkema');
    const selPrimer = $('selPrimer');
    const selSekunder = $('selSekunder');
    const inputFont = $('inputFont');
    const selBahasa = $('selBahasa');
    const selTujuan = $('selTujuan');

    const btnGenerate = $('btnGenerate');
    const btnCopy = $('btnCopy');
    const btnDownload = $('btnDownload');
    const btnReset = $('btnReset');

    const outputEmpty = $('outputEmpty');
    const outputPre = $('outputPre');
    const toast = $('toast');
    const toastMsg = $('toastMsg');

    let result = '';

    // Helpers
    function getChecked(cls) {
        return [...document.querySelectorAll(`.${cls}:checked`)].map(c => c.value);
    }

    function extractFontNames(url) {
        if (!url) return [];
        const names = [];
        // Match family= params (can be multiple with |)
        const regex = /family=([^&:]+)/g;
        let m;
        while ((m = regex.exec(url)) !== null) {
            const decoded = decodeURIComponent(m[1].replace(/\+/g, ' '));
            names.push(decoded);
        }
        // Also try specimen URL
        const spec = url.match(/specimen\/([^?&]+)/);
        if (spec && names.length === 0) {
            names.push(spec[1].replace(/\+/g, ' '));
        }
        return names.length > 0 ? names : [url.trim()];
    }

    function showToast(msg) {
        toastMsg.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
    }

    // Generate — ID
    function genID() {
        const nama = inputNama.value.trim();
        const desc = inputDesc.value.trim();
        const target = inputTarget.value.trim();
        const jenis = selJenis.value;
        const tech = selTech.value;
        const uilibs = getChecked('cb-ui');
        const styles = getChecked('cb-style');
        const skema = selSkema.value;
        const primer = selPrimer.value;
        const sekunder = selSekunder.value;
        const fontLink = inputFont.value.trim();
        const fonts = extractFontNames(fontLink);
        const sections = getChecked('cb-sec');
        const features = getChecked('cb-feat');
        const tujuan = selTujuan.value;

        let p = '';
        if (tujuan === 'website') {
            p = `Buatkan saya sebuah website ${jenis} dengan detail sebagai berikut:\n\n`;
        } else {
            p = `Buatkan saya sebuah Project Document (PD) untuk website ${jenis} dengan spesifikasi sebagai berikut:\n\n`;
        }

        p += `═══════════════════════════════════════\n`;
        p += `📋 INFORMASI DASAR\n`;
        p += `═══════════════════════════════════════\n`;
        if (nama) p += `• Nama Website: ${nama}\n`;
        if (desc) p += `• Deskripsi: "${desc}"\n`;
        if (target) p += `• Target Audiens: ${target}\n`;
        p += `• Jenis Website: ${jenis}\n\n`;

        if (uilibs.length) {
            p += `═══════════════════════════════════════\n`;
            p += `🧩 TEKNOLOGI UI / VIRAL LIBRARY\n`;
            p += `═══════════════════════════════════════\n`;
            p += `Gunakan atau integrasikan koleksi UI komponen berikut:\n`;
            uilibs.forEach(u => p += `• ${u}\n`);
            p += `\n`;
        }

        if (styles.length) {
            p += `═══════════════════════════════════════\n`;
            p += `🎨 GAYA DESAIN\n`;
            p += `═══════════════════════════════════════\n`;
            p += `Gunakan gaya desain berikut:\n`;
            styles.forEach(s => p += `• ${s}\n`);
            p += `\n`;
        }

        p += `═══════════════════════════════════════\n`;
        p += `🎨 WARNA & TEMA\n`;
        p += `═══════════════════════════════════════\n`;
        p += `• Skema Warna: ${skema}\n`;
        p += `• Warna Primer: ${primer}\n`;
        p += `• Warna Sekunder: ${sekunder}\n`;
        p += `• Pastikan kontras warna baik untuk readability\n`;
        p += `• Gunakan warna secara konsisten di seluruh website\n\n`;

        if (fontLink) {
            p += `═══════════════════════════════════════\n`;
            p += `✏️ TYPOGRAPHY / FONT\n`;
            p += `═══════════════════════════════════════\n`;
            fonts.forEach(f => p += `• Font: ${f}\n`);
            p += `  Link: ${fontLink}\n`;
            p += `• Import font dari Google Fonts menggunakan <link> tag di <head>\n\n`;
        }

        if (sections.length) {
            p += `═══════════════════════════════════════\n`;
            p += `📄 SECTION / BAGIAN WEBSITE\n`;
            p += `═══════════════════════════════════════\n`;
            p += `Website harus memiliki section-section berikut:\n`;
            sections.forEach((s, i) => p += `${i + 1}. ${s}\n`);
            p += `\n`;
        }

        if (features.length) {
            p += `═══════════════════════════════════════\n`;
            p += `⚡ FITUR TAMBAHAN\n`;
            p += `═══════════════════════════════════════\n`;
            features.forEach(f => p += `• ${f}\n`);
            p += `\n`;
        }

        p += `═══════════════════════════════════════\n`;
        p += `💻 TEKNOLOGI\n`;
        p += `═══════════════════════════════════════\n`;
        p += `• Gunakan: ${tech}\n`;
        p += `• Pastikan kode bersih, terstruktur, dan mudah dibaca\n`;
        p += `• Tambahkan komentar pada bagian penting\n\n`;

        p += `═══════════════════════════════════════\n`;
        p += `🏆 STANDAR KUALITAS\n`;
        p += `═══════════════════════════════════════\n`;
        p += `• Desain harus terlihat profesional dan premium\n`;
        p += `• Gunakan spacing dan padding yang konsisten\n`;
        p += `• Perhatikan hierarchy visual (ukuran font, weight, warna)\n`;
        p += `• Website harus terlihat modern dan up-to-date\n`;
        p += `• Pastikan semua section saling terhubung dengan harmonis\n`;
        p += `• Gunakan gambar placeholder dari https://placehold.co atau Unsplash\n\n`;

        p += `═══════════════════════════════════════\n`;
        if (tujuan === 'website') {
            p += `Tolong buatkan website ini dengan kode yang lengkap dan siap pakai. Berikan semua file yang diperlukan (HTML, CSS, JavaScript) dalam satu respons tanpa placeholder yang terpotong. Pastikan file fungsional 100%.`;
        } else {
            p += `Tolong buatkan rangkuman Project Document (PD) yang komprehensif, terstruktur dengan rapi, profesional, dan siap diserahkan ke tim developer / desain.`;
        }

        return p;
    }

    // Generate — EN
    function genEN() {
        const nama = inputNama.value.trim();
        const desc = inputDesc.value.trim();
        const target = inputTarget.value.trim();
        const jenis = selJenis.value;
        const tech = selTech.value;
        const uilibs = getChecked('cb-ui');
        const styles = getChecked('cb-style');
        const skema = selSkema.value;
        const primer = selPrimer.value;
        const sekunder = selSekunder.value;
        const fontLink = inputFont.value.trim();
        const fonts = extractFontNames(fontLink);
        const sections = getChecked('cb-sec');
        const features = getChecked('cb-feat');
        const tujuan = selTujuan.value;

        let p = '';
        if (tujuan === 'website') {
            p = `Create a complete ${jenis} website with the following specifications:\n\n`;
        } else {
            p = `Create a Project Document (PD) for a ${jenis} website with the following specifications:\n\n`;
        }

        p += `═══════════════════════════════════════\n`;
        p += `📋 BASIC INFORMATION\n`;
        p += `═══════════════════════════════════════\n`;
        if (nama) p += `• Website Name: ${nama}\n`;
        if (desc) p += `• Description: "${desc}"\n`;
        if (target) p += `• Target Audience: ${target}\n`;
        p += `• Website Type: ${jenis}\n\n`;

        if (uilibs.length) {
            p += `═══════════════════════════════════════\n`;
            p += `🧩 UI TECHNOLOGY / VIRAL LIBRARIES\n`;
            p += `═══════════════════════════════════════\n`;
            p += `Use or integrate the following UI component libraries:\n`;
            uilibs.forEach(u => p += `• ${u}\n`);
            p += `\n`;
        }

        if (styles.length) {
            p += `═══════════════════════════════════════\n`;
            p += `🎨 DESIGN STYLE\n`;
            p += `═══════════════════════════════════════\n`;
            p += `Apply the following design styles:\n`;
            styles.forEach(s => p += `• ${s}\n`);
            p += `\n`;
        }

        p += `═══════════════════════════════════════\n`;
        p += `🎨 COLOR SCHEME\n`;
        p += `═══════════════════════════════════════\n`;
        p += `• Color Scheme: ${skema}\n`;
        p += `• Primary Color: ${primer}\n`;
        p += `• Secondary Color: ${sekunder}\n`;
        p += `• Ensure good contrast for readability\n`;
        p += `• Use colors consistently throughout the website\n\n`;

        if (fontLink) {
            p += `═══════════════════════════════════════\n`;
            p += `✏️ TYPOGRAPHY / FONTS\n`;
            p += `═══════════════════════════════════════\n`;
            fonts.forEach(f => p += `• Font: ${f}\n`);
            p += `  Link: ${fontLink}\n`;
            p += `• Import fonts from Google Fonts using <link> tag in <head>\n\n`;
        }

        if (sections.length) {
            p += `═══════════════════════════════════════\n`;
            p += `📄 WEBSITE SECTIONS\n`;
            p += `═══════════════════════════════════════\n`;
            p += `The website must include the following sections:\n`;
            sections.forEach((s, i) => p += `${i + 1}. ${s}\n`);
            p += `\n`;
        }

        if (features.length) {
            p += `═══════════════════════════════════════\n`;
            p += `⚡ ADDITIONAL FEATURES\n`;
            p += `═══════════════════════════════════════\n`;
            features.forEach(f => p += `• ${f}\n`);
            p += `\n`;
        }

        p += `═══════════════════════════════════════\n`;
        p += `💻 TECHNOLOGY STACK\n`;
        p += `═══════════════════════════════════════\n`;
        p += `• Use: ${tech}\n`;
        p += `• Ensure clean, well-structured, and readable code\n`;
        p += `• Add comments on important sections\n\n`;

        p += `═══════════════════════════════════════\n`;
        p += `🏆 QUALITY STANDARDS\n`;
        p += `═══════════════════════════════════════\n`;
        p += `• Design must look professional and premium\n`;
        p += `• Use consistent spacing and padding\n`;
        p += `• Pay attention to visual hierarchy (font size, weight, color)\n`;
        p += `• Website must look modern and up-to-date\n`;
        p += `• Ensure all sections connect harmoniously\n`;
        p += `• Use placeholder images from https://placehold.co or Unsplash\n\n`;

        p += `═══════════════════════════════════════\n`;
        if (tujuan === 'website') {
            p += `Please create this website with complete, production-ready code. Provide all necessary code files (HTML, CSS, JavaScript) in a single response without truncating important parts. Ensure 100% functionality.`;
        } else {
            p += `Please create a comprehensive, well-structured, and professional Project Document (PD) summary ready to be handed off to the development/design team.`;
        }

        return p;
    }

    // Generate click
    btnGenerate.addEventListener('click', () => {
        const lang = selBahasa.value;
        result = lang === 'en' ? genEN() : genID();

        outputEmpty.style.display = 'none';
        outputPre.style.display = 'block';
        outputPre.textContent = result;

        btnCopy.disabled = false;
        btnDownload.disabled = false;

        showToast('Prompt generated ✓');

        if (window.innerWidth <= 900) {
            $('outputCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Copy
    btnCopy.addEventListener('click', () => {
        if (!result) return;
        navigator.clipboard.writeText(result).then(() => {
            btnCopy.textContent = 'Copied!';
            btnCopy.classList.add('copied');
            showToast('Copied to clipboard');
            setTimeout(() => {
                btnCopy.textContent = 'Copy';
                btnCopy.classList.remove('copied');
            }, 1800);
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = result;
            ta.style.cssText = 'position:fixed;opacity:0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Copied!');
        });
    });

    // Download
    btnDownload.addEventListener('click', () => {
        if (!result) return;
        const name = (inputNama.value.trim() || 'prompt').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prompt-${name}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Downloaded ✓');
    });

    // Reset
    btnReset.addEventListener('click', () => {
        inputNama.value = '';
        inputDesc.value = '';
        inputTarget.value = '';
        selJenis.selectedIndex = 0;
        selTech.selectedIndex = 0;
        selSkema.selectedIndex = 0;
        selPrimer.selectedIndex = 0;
        selSekunder.selectedIndex = 0;
        inputFont.value = '';
        selBahasa.selectedIndex = 0;
        selTujuan.selectedIndex = 0;

        // Reset UI libs
        document.querySelectorAll('.cb-ui').forEach(c => c.checked = false);

        // Reset styles
        document.querySelectorAll('.cb-style').forEach(c => {
            c.checked = c.value === 'Modern & Minimalis';
        });

        // Reset sections to defaults
        const defaultSec = [
            'Hero Section dengan headline besar dan CTA button',
            'Navbar / Navigation Bar yang sticky di atas',
            'Footer dengan navigasi, kontak, dan sosial media'
        ];
        document.querySelectorAll('.cb-sec').forEach(c => {
            c.checked = defaultSec.includes(c.value);
        });

        // Reset features
        document.querySelectorAll('.cb-feat').forEach(c => {
            c.checked = c.value === 'Responsive Design (tampil baik di mobile, tablet, desktop)';
        });

        // Reset output
        result = '';
        outputEmpty.style.display = 'flex';
        outputPre.style.display = 'none';
        outputPre.textContent = '';
        btnCopy.disabled = true;
        btnDownload.disabled = true;

        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Form reset ✓');
    });
});
