# Prácticas DI · MVP React

Prototipo frontend para el portal de prácticas del Departamento de Informática UTFSM. La interfaz está en español y no usa backend: la búsqueda, los filtros, las prácticas guardadas y las postulaciones se simulan en el navegador.

## Ejecutar en local

Requiere Node.js 20.19 o superior, o 22.12 o superior, y npm.

    npm install
    npm run dev

Abre la dirección local que indique Vite. Para generar una versión estática:

    npm run build

## Flujos cubiertos

1. Explorar vacantes, revisar una ficha estandarizada e iniciar una postulación simulada.
2. Buscar **VOLVO CHILE SPA** en el directorio de empresas y revisar su perfil.
3. Buscar **Python** y abrir una práctica compatible.
4. Filtrar por **Las Condes** y revisar una vacante.

También funcionan las prácticas guardadas, el resumen de postulaciones, la edición básica del perfil y la guía rápida. Los datos de empresas, fechas y vacantes son demostrativos; no representan una oferta laboral vigente.

## Entrega del curso

El brief solicita publicar el código fuente en un repositorio público de GitHub y entregar un informe con el enlace, las metas implementadas y capturas de los flujos. Antes de publicar, el equipo debe reemplazar o validar los datos de demostración y realizar commits desde las cuentas de sus integrantes.
