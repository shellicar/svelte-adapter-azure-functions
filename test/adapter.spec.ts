import type { Builder } from '@sveltejs/kit';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { createAdapter } from '../src/adapter';

vi.mock('node:fs', () => ({
  writeFileSync: vi.fn(),
  existsSync: vi.fn(() => true),
}));

vi.mock('esbuild', () => ({
  build: vi.fn(() => Promise.resolve()),
}));

type LogMethods = 'success' | 'error' | 'warn' | 'minor' | 'info';
const getMockBuilder = () => {
  const log = vi.fn() as Mock & Record<LogMethods, Mock>;
  log.minor = vi.fn();
  log.warn = vi.fn();

  return {
    log,
    copy: vi.fn(),
    generateManifest: vi.fn(() => '{}'),
    getBuildDirectory: vi.fn((name) => `build/${name}`),
    getServerDirectory: vi.fn(() => 'server'),
    rimraf: vi.fn(),
    writeClient: vi.fn(),
    writePrerendered: vi.fn(),
  } as unknown as Builder;
};

describe('adapter', () => {
  it('creates valid adapter', () => {
    const adapter = createAdapter();
    expect(adapter.name).toBe('adapter-azure-functions');
  });

  it('configures build correctly', async () => {
    const adapter = createAdapter({
      esbuildOptions: { minify: false },
    });
    const builder = getMockBuilder();

    await adapter.adapt(builder);

    expect(builder.writeClient).toHaveBeenCalledWith(expect.stringContaining('static'));
    expect(builder.writePrerendered).toHaveBeenCalledWith(expect.stringContaining('static'));
    expect(builder.copy).toHaveBeenCalledTimes(2);
  });
});
