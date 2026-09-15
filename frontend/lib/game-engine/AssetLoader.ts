/**
 * AssetLoader — centralized asset loading for PixiJS sprites.
 *
 * Loads and caches assets from /public/assets/ so they can be used
 * as PIXI.Sprite textures instead of primitive Graphics shapes.
 *
 * Asset sources:
 * - /assets/emoji/*.png — OpenMoji (CC BY-SA 4.0)
 * - /assets/kenney/animals/*.png — Kenney Animal Pack Redux (CC0)
 * - /assets/kenney/food/*.png — Kenney Food Kit (CC0)
 * - /assets/kenney/shapes/*.png — Kenney Shape Characters (CC0)
 * - /assets/kenney/ui/*.png — Kenney UI Pack (CC0)
 * - /assets/kenney/particles/*.png — Kenney Particle Pack (CC0)
 * - /rive/*.riv — Rive animation files
 */

import * as PIXI from 'pixi.js';

export type AssetCategory = 'emoji' | 'animal' | 'food' | 'shape' | 'ui' | 'particle';

interface CachedTexture {
  texture: PIXI.Texture;
  width: number;
  height: number;
}

class AssetLoaderClass {
  private cache = new Map<string, CachedTexture>();
  private loadingPromises = new Map<string, Promise<PIXI.Texture>>();

  /**
   * Get the full URL for an asset.
   */
  private getUrl(category: AssetCategory, name: string): string {
    const paths: Record<AssetCategory, string> = {
      emoji: '/assets/emoji/',
      animal: '/assets/kenney/animals/',
      food: '/assets/kenney/food/',
      shape: '/assets/kenney/shapes/',
      ui: '/assets/kenney/ui/',
      particle: '/assets/kenney/particles/',
    };
    return paths[category] + name + '.png';
  }

  /**
   * Load a single asset and return its texture.
   * Cached after first load.
   */
  async load(category: AssetCategory, name: string): Promise<PIXI.Texture> {
    const key = `${category}/${name}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!.texture;
    }
    if (this.loadingPromises.has(key)) {
      return this.loadingPromises.get(key)!;
    }

    const url = this.getUrl(category, name);
    const promise = new Promise<PIXI.Texture>((resolve, reject) => {
      PIXI.Assets.load(url)
        .then((texture: PIXI.Texture) => {
          const cached: CachedTexture = {
            texture,
            width: texture.width,
            height: texture.height,
          };
          this.cache.set(key, cached);
          this.loadingPromises.delete(key);
          resolve(texture);
        })
        .catch((err: Error) => {
          this.loadingPromises.delete(key);
          console.warn(`AssetLoader: Failed to load ${key} from ${url}`, err);
          reject(err);
        });
    });

    this.loadingPromises.set(key, promise);
    return promise;
  }

  /**
   * Load multiple assets at once.
   */
  async loadAll(assets: Array<{ category: AssetCategory; name: string }>): Promise<PIXI.Texture[]> {
    return Promise.all(assets.map(a => this.load(a.category, a.name)));
  }

  /**
   * Create a sprite from a loaded asset.
   * Falls back to null if the asset hasn't been loaded.
   */
  getSprite(category: AssetCategory, name: string): PIXI.Sprite | null {
    const key = `${category}/${name}`;
    const cached = this.cache.get(key);
    if (!cached) return null;
    const sprite = new PIXI.Sprite(cached.texture);
    sprite.anchor.set(0.5);
    return sprite;
  }

  /**
   * Create a sprite synchronously if the asset is cached, otherwise return null.
   * Call load() first to ensure the asset is in cache.
   */
  trySprite(category: AssetCategory, name: string): PIXI.Sprite | null {
    return this.getSprite(category, name);
  }

  /**
   * Create a sprite with a consistent visual style applied.
   * For Class 1-5, we apply a subtle warm tint and outline to make
   * mixed asset sources (Kenney, OpenMoji) look more cohesive.
   */
  tryStyledSprite(
    category: AssetCategory,
    name: string,
    options?: { tint?: number; scale?: number; outline?: boolean }
  ): PIXI.Sprite | null {
    const sprite = this.getSprite(category, name);
    if (!sprite) return null;

    // Apply tint if specified (for color-coding objects)
    if (options?.tint !== undefined) {
      sprite.tint = options.tint;
    }

    // Apply scale
    if (options?.scale !== undefined) {
      sprite.scale.set(options.scale);
    }

    return sprite;
  }

  /**
   * Check if an asset is loaded.
   */
  isLoaded(category: AssetCategory, name: string): boolean {
    return this.cache.has(`${category}/${name}`);
  }

  /**
   * Preload common assets used across many games.
   * Call this at startup to avoid loading delays during gameplay.
   */
  async preloadCommon(): Promise<void> {
    const common: Array<{ category: AssetCategory; name: string }> = [
      // Counting objects
      { category: 'emoji', name: 'apple' },
      { category: 'emoji', name: 'mango' },
      { category: 'emoji', name: 'cupcake' },
      { category: 'emoji', name: 'cake' },
      { category: 'emoji', name: 'star' },
      { category: 'emoji', name: 'ball' },
      { category: 'emoji', name: 'coin' },
      { category: 'emoji', name: 'fish' },
      { category: 'emoji', name: 'flower' },
      { category: 'food', name: 'apple' },
      { category: 'food', name: 'banana' },
      { category: 'food', name: 'cake' },
      { category: 'food', name: 'cupcake' },
      { category: 'food', name: 'cookie' },
      { category: 'food', name: 'strawberry' },
      { category: 'food', name: 'orange' },
      { category: 'food', name: 'pizza' },
      // Animals
      { category: 'animal', name: 'owl' },
      { category: 'animal', name: 'frog' },
      { category: 'animal', name: 'rabbit' },
      { category: 'animal', name: 'dog' },
      { category: 'animal', name: 'cow' },
      { category: 'animal', name: 'elephant' },
      { category: 'animal', name: 'parrot' },
      { category: 'animal', name: 'bear' },
      { category: 'animal', name: 'panda' },
      { category: 'animal', name: 'monkey' },
      // Nature
      { category: 'emoji', name: 'tree' },
      { category: 'emoji', name: 'sun' },
      { category: 'emoji', name: 'cloud' },
      { category: 'emoji', name: 'rainbow' },
      { category: 'emoji', name: 'leaf' },
      { category: 'emoji', name: 'seedling' },
      { category: 'emoji', name: 'house' },
      { category: 'emoji', name: 'heart' },
      { category: 'emoji', name: 'trophy' },
      { category: 'emoji', name: 'flower' },
      { category: 'emoji', name: 'sunflower' },
      { category: 'emoji', name: 'butterfly' },
      { category: 'emoji', name: 'bird' },
      { category: 'emoji', name: 'deer' },
      { category: 'emoji', name: 'fountain' },
      { category: 'emoji', name: 'bridge' },
      { category: 'emoji', name: 'windmill' },
      // Celebrations
      { category: 'particle', name: 'star_01' },
      { category: 'particle', name: 'spark_01' },
      { category: 'particle', name: 'magic_01' },
      { category: 'particle', name: 'flare_01' },
      // UI
      { category: 'emoji', name: 'sparkles' },
      { category: 'emoji', name: 'party-popper' },
      { category: 'emoji', name: 'confetti' },
    ];

    try {
      await this.loadAll(common);
    } catch (e) {
      // Some assets may fail — that's OK, we fall back to primitives
      console.warn('AssetLoader: Some common assets failed to preload', e);
    }
  }

  /**
   * Clear the cache (e.g., when switching games).
   */
  clear(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }
}

export const AssetLoader = new AssetLoaderClass();
