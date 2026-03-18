# @kreisler/libs

Monorepo con librerías reutilizables de Node.js y proyectos web de ejemplo.

## 📚 Estructura

```
.
├── packages/          # Librerías de Node.js/npm (usando tsup)
│   └── ttlcache/      # Cache con TTL (Time-To-Live)
├── examples/          # Proyectos web que consumen las librerías
└── tsconfig.base.json # Configuración base compartida
```

## 🚀 Instalación

### Primeros pasos

```bash
# Instalar dependencias globales
pnpm install

# Construir todas las librerías
pnpm run build
```

### Usar una librería en tu proyecto

#### Opción 1: Desde el path local (desarrollo local)
```bash
npm install ../packages/ttlcache --save
```

#### Opción 2: Desde npm (cuando se publique)
```bash
npm install @kreisler/ttlcache
```

## 📦 Librerías disponibles

### TTLCache

Cache en memoria con soporte para Time-To-Live (TTL). Perfecto para reducir lecturas a DB.

```javascript
import { TTLCache } from '@kreisler/ttlcache'

const cache = new TTLCache({ defaultTtlMs: 30000, maxSize: 10000 })

// Almacenar un valor (expires en 30 segundos)
cache.set('user:123', { id: 123, name: 'Juan' })

// Obtener el valor
const user = cache.get('user:123') // { id: 123, name: 'Juan' }

// Obtener con TTL personalizado (10 segundos)
cache.set('session:abc', { token: 'xyz' }, 10000)

// Eliminar manualmente
cache.delete('user:123')
```

**Características:**
- ✅ Sin dependencias externas
- ✅ Soporte para TTL personalizado
- ✅ Evicción automática al alcanzar size máximo
- ✅ TypeScript con tipos completos
- ✅ Formatos: ESM y CommonJS

## 🛠️ Comandos útiles

### Librerías (packages/)

```bash
# Construir todas las librerías
pnpm run build:libs

# Ver el output
pnpm run build

# Ejecutar tests
pnpm run test

# Linting
pnpm run lint

# Ver cambios en tiempo real (watch)
pnpm --filter './packages/ttlcache' run watch
```

### Proyectos web (examples/)

```bash
# Construir ejemplos
pnpm run build:examples

# Desarrollo
pnpm run dev
```

### Por paquete específico

```bash
# Usar pnpm --filter para un paquete en particular
pnpm --filter '@kreisler/ttlcache' run build
pnpm --filter '@kreisler/ttlcache' run test:spec
```

## 📋 Scripts disponibles

En la raíz del monorepo:

```bash
pnpm run build         # Construye librerías + ejemplos
pnpm run build:libs    # Solo librerías
pnpm run build:examples # Solo ejemplos
pnpm run test          # Tests de todas las librerías
pnpm run lint          # Linting de librerías
pnpm run dev           # Inicia desarrollo de ejemplos
```

## 🔧 Stack tecnológico

- **Manager**: pnpm workspaces
- **Build**: tsup (para librerías)
- **Linting**: ESLint + TypeScript ESLint
- **Testing**: Node.js test runner
- **TypeScript**: 5.x

## 📝 Convenciones

- Todas las librerías usan **tsup** como builder
- Los nombres de paquetes siguen el patrón: `@kreisler/{nombre}`
- El output va a la carpeta `dist/`
- Soportamos ESM y CommonJS

## 🚀 Publicar una librería

```bash
cd packages/ttlcache
npm publish --access public
```

## 📧 Autor

[Kreisler Ramirez Sierra](https://linktr.ee/itskreisler)

**Sponsoring**: [Buy Me a Coffee](https://www.buymeacoffee.com/kreisler)

## 📄 Licencia

MIT
