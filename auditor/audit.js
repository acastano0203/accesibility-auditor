const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const fs = require('fs');
const path = require('path');

// Configuración
const URLS_A_AUDITAR = [
    'http://localhost:5173/'
];

const CARPETA_REPORTES = path.join(__dirname, '..', 'reports');

async function auditarApp() {
    console.log('Iniciando auditoría de accesibilidad...\n');

    // 1. Abrir navegador headless
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const resultadosTotales = [];

    // 2. Recorrer cada URL definida
    for (const url of URLS_A_AUDITAR) {
        console.log(`Auditando: ${url}`);

        try {
            await page.goto(url, { waitUntil: 'networkidle' });

            // 3. Ejecutar axe-core con las reglas WCAG 2.0 A, AA y WCAG 2.1 AA
            const reporte = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
                .analyze();

            resultadosTotales.push({
                url: url,
                timestamp: new Date().toISOString(),
                totalViolaciones: reporte.violations.length,
                violaciones: reporte.violations.map(v => ({
                    id: v.id,
                    impacto: v.impact,
                    descripcion: v.description,
                    ayuda: v.help,
                    urlAyuda: v.helpUrl,
                    criteriosWCAG: v.tags.filter(t => t.startsWith('wcag')),
                    elementosAfectados: v.nodes.length,
                    ejemploHTML: v.nodes[0]?.html,
                    selectorCSS: v.nodes[0]?.target?.[0]
                }))
            });

            console.log(`  -> ${reporte.violations.length} violaciones encontradas\n`);

        } catch (error) {
            console.error(`  Error auditando ${url}: ${error.message}`);
        }
    }

    // 4. Guardar reporte en JSON
    if (!fs.existsSync(CARPETA_REPORTES)) {
        fs.mkdirSync(CARPETA_REPORTES, { recursive: true });
    }

    const nombreArchivo = `reporte-${Date.now()}.json`;
    const rutaArchivo = path.join(CARPETA_REPORTES, nombreArchivo);

    fs.writeFileSync(rutaArchivo, JSON.stringify(resultadosTotales, null, 2));

    console.log(`Reporte guardado en: ${rutaArchivo}\n`);

    // 5. Mostrar resumen en consola
    console.log('===== RESUMEN =====');
    resultadosTotales.forEach(r => {
        console.log(`\n${r.url}`);
        console.log(`Total de violaciones: ${r.totalViolaciones}`);

        const porImpacto = r.violaciones.reduce((acc, v) => {
            acc[v.impacto] = (acc[v.impacto] || 0) + 1;
            return acc;
        }, {});

        Object.entries(porImpacto).forEach(([impacto, cantidad]) => {
            console.log(`  ${impacto}: ${cantidad}`);
        });
    });

    await browser.close();
    console.log('\nAuditoría completada.');
}

auditarApp().catch(err => {
    console.error('Error fatal:', err);
    process.exit(1);
});