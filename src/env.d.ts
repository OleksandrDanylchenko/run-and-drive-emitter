/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_GOOGLE_MAP_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
