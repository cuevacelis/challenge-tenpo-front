# Challenge Tenpo Front

Este proyecto es una aplicación web construida con React, TypeScript y Vite.

## Requisitos previos

- Node.js >= 18.x
- pnpm >= 8.x (recomendado para manejar dependencias)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd challenge-tenpo-front
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```

## Scripts disponibles

- **Desarrollo:**
  ```bash
  pnpm dev
  ```
  Inicia el servidor de desarrollo en `http://localhost:5173` (por defecto).

- **Build producción:**
  ```bash
  pnpm build
  ```
  Genera la versión optimizada en la carpeta `dist/`.

- **Previsualización del build:**
  ```bash
  pnpm preview
  ```
  Sirve localmente el build de producción.

- **Lint:**
  ```bash
  pnpm lint
  ```
  Ejecuta las reglas de linting configuradas.

## Estructura del proyecto

```
challenge-tenpo-front/
  public/                # Archivos estáticos
  src/                   # Código fuente principal
    assets/              # Imágenes y recursos
    components/          # Componentes reutilizables
    context/             # Contextos de React
    hooks/               # Custom hooks
    lib/                 # Librerías y utilidades
    routes/              # Rutas y páginas
    styles/              # Estilos globales
  package.json           # Configuración de dependencias y scripts
  vite.config.ts         # Configuración de Vite
```

## Linting y convenciones

- El proyecto utiliza ESLint y Biome para mantener la calidad del código.
- Sigue las convenciones de commit descritas en `git-conventions.mdc`.
- Para aplicar el linting automáticamente:
  ```bash
  pnpm lint:fix
  ```

## Notas adicionales

- Puedes personalizar la configuración de ESLint en `eslint.config.js`.
- Para más detalles sobre la estructura o contribución, revisa los comentarios en el código y la documentación interna.

---

Si tienes dudas, contacta al equipo de desarrollo o revisa la documentación interna del proyecto.
