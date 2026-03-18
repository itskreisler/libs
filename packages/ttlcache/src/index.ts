/**
 * Cache TTL simple en memoria (sin dependencias) para reducir lecturas a DB.
 * Importante: no es persistente. Se invalida al reiniciar el proceso.
 * @template T - Tipo de los valores almacenados en el cache
 */
export class TTLCache<T = any> {
    private defaultTtlMs: number
    private maxSize: number
    private _map: Map<string, { value: T; expiresAt: number }>

    /**
     * Crea una instancia de TTLCache.
     * @param options - Opciones de configuración del cache
     * @param options.defaultTtlMs - Tiempo de vida predeterminado en milisegundos (default: 30000)
     * @param options.maxSize - Tamaño máximo del cache antes de evicción (default: 10000)
     * @example
     * const cache = new TTLCache({ defaultTtlMs: 60000, maxSize: 100 })
     */
    constructor({ defaultTtlMs = 30_000, maxSize = 10_000 }: { defaultTtlMs?: number; maxSize?: number } = {}) {
        this.defaultTtlMs = defaultTtlMs
        this.maxSize = maxSize
        this._map = new Map()
    }

    /**
     * Obtiene un valor del cache si existe y no ha expirado.
     * @param key - Clave del valor a obtener
     * @returns El valor almacenado o undefined si no existe o expiró
     * @example
     * const value = cache.get('myKey')
     */
    get(key: string): T | undefined {
        const hit = this._map.get(key)
        if (!hit) return undefined
        if (hit.expiresAt <= Date.now()) {
            this._map.delete(key)
            return undefined
        }
        return hit.value
    }

    /**
     * Almacena un valor en el cache con un tiempo de expiración.
     * Si el cache alcanza el tamaño máximo, elimina la entrada más antigua.
     * @param key - Clave del valor a almacenar
     * @param value - Valor a almacenar
     * @param ttlMs - Tiempo de vida en milisegundos (opcional, usa defaultTtlMs si no se especifica)
     * @returns El valor almacenado
     * @example
     * cache.set('myKey', { data: 'value' }, 60000)
     */
    set(key: string, value: T, ttlMs: number = this.defaultTtlMs): T {
        if (this._map.size >= this.maxSize) {
            // Evicción simple: borra la primera entrada insertada.
            const firstKey = this._map.keys().next().value
            if (firstKey) this._map.delete(firstKey)
        }

        this._map.set(key, { value, expiresAt: Date.now() + ttlMs })
        return value
    }

    /**
     * Elimina un valor del cache.
     * @param key - Clave del valor a eliminar
     * @example
     * cache.delete('myKey')
     */
    delete(key: string): void {
        this._map.delete(key)
    }
}
