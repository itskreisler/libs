// src/index.ts
var TTLCache = class {
  defaultTtlMs;
  maxSize;
  _map;
  /**
   * Crea una instancia de TTLCache.
   * @param options - Opciones de configuración del cache
   * @param options.defaultTtlMs - Tiempo de vida predeterminado en milisegundos (default: 30000)
   * @param options.maxSize - Tamaño máximo del cache antes de evicción (default: 10000)
   * @example
   * const cache = new TTLCache({ defaultTtlMs: 60000, maxSize: 100 })
   */
  constructor({ defaultTtlMs = 3e4, maxSize = 1e4 } = {}) {
    this.defaultTtlMs = defaultTtlMs;
    this.maxSize = maxSize;
    this._map = /* @__PURE__ */ new Map();
  }
  /**
   * Obtiene un valor del cache si existe y no ha expirado.
   * @param key - Clave del valor a obtener
   * @returns El valor almacenado o undefined si no existe o expiró
   * @example
   * const value = cache.get('myKey')
   */
  get(key) {
    const hit = this._map.get(key);
    if (!hit) return void 0;
    if (hit.expiresAt <= Date.now()) {
      this._map.delete(key);
      return void 0;
    }
    return hit.value;
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
  set(key, value, ttlMs = this.defaultTtlMs) {
    if (this._map.size >= this.maxSize) {
      const firstKey = this._map.keys().next().value;
      if (firstKey) this._map.delete(firstKey);
    }
    this._map.set(key, { value, expiresAt: Date.now() + ttlMs });
    return value;
  }
  /**
   * Elimina un valor del cache.
   * @param key - Clave del valor a eliminar
   * @example
   * cache.delete('myKey')
   */
  delete(key) {
    this._map.delete(key);
  }
};
export {
  TTLCache
};
