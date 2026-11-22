/**
 * Hash-pinned Steam builds and supported four-language pairings.
 */

export const LANGUAGES = {
  en: { label: 'English', short: 'EN', column: 'English', suffix: '_en' },
  ja: { label: '日本語', short: '日本語', column: 'Japanese', suffix: '_ja' },
  'zh-Hant': { label: '繁體中文', short: '繁體', column: 'Text', suffix: '' },
  'zh-Hans': { label: '简体中文', short: '简体', column: 'Simplified Chinese', suffix: '_zh-CN' },
};

export const LANGUAGE_CODES = Object.keys(LANGUAGES);

export const PAIR_LANGUAGES = {};
export const PAIRS = {};
for (const top of LANGUAGE_CODES) {
  for (const bottom of LANGUAGE_CODES) {
    if (top === bottom) continue;
    const key = `${top}-${bottom}`;
    PAIR_LANGUAGES[key] = [top, bottom];
    PAIRS[key] = [LANGUAGES[top].column, LANGUAGES[bottom].column];
  }
}

export const PAIR_ALIASES = {
  'zh-en': 'zh-Hant-en',
  'zh-ja': 'zh-Hant-ja',
};

export const TEXT_COLUMNS = LANGUAGE_CODES.map((c) => LANGUAGES[c].column);
export const SRT_SUFFIXES = Object.fromEntries(
  LANGUAGE_CODES.map((c) => [LANGUAGES[c].column, LANGUAGES[c].suffix]),
);

export function canonicalPair(value) {
  const mapped = PAIR_ALIASES[value] || value;
  if (!(mapped in PAIRS)) {
    throw new Error('Choose two different supported languages.');
  }
  return mapped;
}

export function pairLabel(value) {
  const [top, bottom] = PAIR_LANGUAGES[canonicalPair(value)];
  return `${LANGUAGES[top].label} / ${LANGUAGES[bottom].label}`;
}

export const SCENARIOS_REL = 'StreamingAssets/DDetective/Windows/ddetective.scenarios.asset';
export const SHARED_REL = 'sharedassets0.assets';
export const CATALOG_REL = 'StreamingAssets/aa/catalog.bin';
export const LEVEL0_REL = 'level0';

export const BUILDS = [
  {
    id: '26746656',
    label: 'Windows Steam build observed 2026-11-20',
    videosPath: 'StreamingAssets/aa/StandaloneWindows64/defaultlocalgroup_assets_all_3afc5cd96c3ccdcefccef6a4b4fd41b9.bundle',
    level0PathId: 50511n,
    catalogNeedle: '788a3eb058510747b983d8fd10632167',
    files: {
      'StreamingAssets/DDetective/Windows/ddetective.scenarios.asset': {
        size: 3089524,
        sha256: '29d88a6f603f0065678b40838350d382f9abf4eb6c496fb2d7dc4a0a85a27939',
      },
      'sharedassets0.assets': {
        size: 134991224,
        sha256: '1b51b8e7dd649203c562072d39e01d2d306557b14e76008c1ed1f3e02a0a54a1',
      },
      'StreamingAssets/aa/StandaloneWindows64/defaultlocalgroup_assets_all_3afc5cd96c3ccdcefccef6a4b4fd41b9.bundle': {
        size: 110682,
        sha256: '0a656b3fccaf9b37dc0d650445ee4a43f7ee7ff43104d2b468d4596917d5ed71',
      },
      'StreamingAssets/aa/catalog.bin': {
        size: 85451,
        sha256: '462fc11352ff2cbd797a52dc1c3efa42fcdbf6e8fed57ebd524f880a70c09011',
      },
      level0: {
        size: 15954764,
        sha256: 'e35c0202bf3987c87c7030b435a319b547a5e4d9424aad9cce10eb522c9f4a55',
      },
    },
    runtimeChecks: {
      '../GameAssembly.dll': '88d4aa9591d4dd6be28097c5bb400c518964f2033759b66abd6b1641686bcdf4',
      'il2cpp_data/Metadata/global-metadata.dat': '19d8c065165d11eea67f7e0fc3fcd96d9f6a902209f4b1a9732ef69861ccba41',
      globalgamemanagers: 'b8fc04550403e733ef90ccfd15832d56c7712bc0a96d3a3dee92c79db51fc48e',
    },
  },
  {
    id: '26481838',
    label: 'Windows Steam build observed 2026-11-10',
    videosPath: 'StreamingAssets/aa/StandaloneWindows64/defaultlocalgroup_assets_all_e4f4afab2370d95fb1248791291a1575.bundle',
    level0PathId: 48428n,
    catalogNeedle: '788a3eb058510747b983d8fd10632167',
    files: {
      'StreamingAssets/DDetective/Windows/ddetective.scenarios.asset': {
        size: 3086328,
        sha256: '919dc0ce06a5c9ebd6cb180f4169e73b5fc70c5a4c24b04fd08b4f4c74376fad',
      },
      'sharedassets0.assets': {
        size: 134967560,
        sha256: '9eabad5ba10493ac5a6f6c307a369703d09ef2ad5b41641e02177fd47f08cde4',
      },
      'StreamingAssets/aa/StandaloneWindows64/defaultlocalgroup_assets_all_e4f4afab2370d95fb1248791291a1575.bundle': {
        size: 110704,
        sha256: 'fddda2ab75ce197f869018628b6b70949a41a56b786592e37a820200362fa35b',
      },
      'StreamingAssets/aa/catalog.bin': {
        size: 85451,
        sha256: 'd7d32659d5433ad92e9c4c05dcc300d7c363a2dbaedafae6ed4ca71486e6bc04',
      },
      level0: {
        size: 15650476,
        sha256: '10af2aa197d23868f6319c6b079c788c97c2af92f63b2e2da6c78cbe36c28377',
      },
    },
    runtimeChecks: {
      '../GameAssembly.dll': '06b6d141ff1194d82bd493dd16b317ae8bfbac46f52418d831af66f8bdf424ff',
      'il2cpp_data/Metadata/global-metadata.dat': '4a7973efdd2f9a065d3fff4060523b7a6768fb693005330df510067f375ff2a4',
      globalgamemanagers: '119c501bb46a7f8150ddaabdfaabbfb00adbd7c237b9609836141728810e8ff0',
    },
  },
];

export function buildTargets(profile) {
  return [
    SCENARIOS_REL,
    SHARED_REL,
    profile.videosPath,
    CATALOG_REL,
    LEVEL0_REL,
  ];
}
