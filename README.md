# @kreisler/ttlcache

Cache TTL simple en memoria (sin dependencias) para reducir lecturas a DB.

![npm](https://img.shields.io/npm/v/@kreisler/ttlcache)
![license](https://img.shields.io/npm/l/@kreisler/ttlcache)
![downloads](https://img.shields.io/npm/dm/@kreisler/ttlcache)

## ✨ Características

- ✅ **Sin dependencias** - Código puro sin librerías externas
- ✅ **TTL (Time-To-Live)** - Expiración automática de claves
- ✅ **TypeScript** - Tipos completos incluidos
- ✅ **Dual format** - Soporta ESM y CommonJS
- ✅ **Pequeño** - Solo ~2KB después del build
- ✅ **Evicción automática** - Limpieza cuando se alcanza el tamaño máximo

## 📦 Instalación

### Desde npm
```bash
npm install @kreisler/ttlcache
# o
pnpm add @kreisler/ttlcache
```

### En desarrollo local (desde monorepo)
```bash
npm install ../packages/ttlcache --save
```

## 🚀 Uso rápido

```javascript
import { TTLCache } from '@kreisler/ttlcache'

// Crear instancia
const cache = new TTLCache({ 
  defaultTtlMs: 30000,  // 30 segundos por defecto
  maxSize: 10000        // Máximo 10,000 entries
})

// Guardar un valor (con TTL por defecto)
cache.set('user:123', { id: 123, name: 'Juan' })

// Obtener
const user = cache.get('user:123')
// { id: 123, name: 'Juan' }

// Guardar con TTL personalizado (10 segundos)
cache.set('tempKey', 'value', 10000)

// Eliminar
cache.delete('user:123')
```

## 📚 API

### Constructor

```typescript
new TTLCache<T>({
  defaultTtlMs?: number  // Default: 30000 (30 segundos)
  maxSize?: number       // Default: 10000 entradas
})
```

### Métodos

#### `get(key: string): T | undefined`
Obtiene un valor del cache. Retorna `undefined` si no existe o ha expirado.

```javascript
const value = cache.get('myKey')
```

#### `set(key: string, value: T, ttlMs?: number): T`
Almacena un valor con expiración. Si se alcanza `maxSize`, elimina la entrada más antigua.

```javascript
// Con TTL por defecto
cache.set('key', 'value')

// Con TTL personalizado (5 segundos)
cache.set('key', 'value', 5000)
```

#### `delete(key: string): void`
Elimina manualmente una clave del cache.

```javascript
cache.delete('user:123')
```

## 💡 Casos de uso

### Cache de consultas a DB
```javascript
const cache = new TTLCache({ defaultTtlMs: 60000 })

async function getUser(id) {
  const cached = cache.get(`user:${id}`)
  if (cached) return cached
  
  const user = await db.users.findById(id)
  cache.set(`user:${id}`, user)
  return user
}
```

### Cache de sesiones
```javascript
const sessions = new TTLCache({ 
  defaultTtlMs: 3600000, // 1 hora
  maxSize: 5000 
})

app.post('/login', (req, res) => {
  const sessionId = generateId()
  sessions.set(sessionId, { userId: user.id, ...data })
  res.cookie('session', sessionId)
})
```

### Rate limiting
```javascript
const attempts = new TTLCache({ defaultTtlMs: 60000 })

function checkRateLimit(ip) {
  const count = attempts.get(ip) || 0
  if (count >= 100) return false
  
  attempts.set(ip, count + 1, 60000)
  return true
}
```

## 🧪 Testing

```bash
# Correr tests unitarios
pnpm run test:spec

# Watch mode
pnpm run watch
```

## 📈 Build

La librería se compila automaticamente con `tsup`:

```bash
# Build ESM + CJS + tipos
pnpm run build

# Output:
# dist/index.js       - ESM
# dist/index.cjs      - CommonJS
# dist/index.d.ts     - Tipos ESM
# dist/index.d.cts    - Tipos CommonJS
```

## ⚠️ Limitaciones

- **No persistente**: Los datos se pierden al reiniciar el proceso
- **Memory-based**: Todo se almacena en RAM
- **Single instance**: Cada instancia es independiente
- **No replicación**: No sincroniza entre procesos

Para persistent caching, considera usar Redis.

## 📝 Notas importantes

1. **Expiración lazy**: Los valores expirados se eliminan cuando se intenta acceder a ellos
2. **FIFO eviction**: Cuando se alcanza `maxSize`, se elimina la entrada más antigua
3. **Thread-safe**: Para ambientes multi-threaded, considera usar sincronización externa

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor abre un issue o pull request.

## 📄 Licencia

MIT © Kreisler Ramirez Sierra

## 🔗 Links

- [GitHub Repo](https://github.com/itskreisler/libs)
- [Author](https://linktr.ee/itskreisler)
- [Sponsor](https://www.buymeacoffee.com/kreisler)
