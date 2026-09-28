/**
 * geoTopics.ts — class-wise topic picker data for the E5 Geospatial
 * Explorer (Geography, classes 6-10 of the authored corpus; the sandbox
 * serves 6-12 via these bands, 11-12 learners get the same labs with the
 * senior chapters).
 *
 * Grounded in deploy/content/cisce_nodes_v2/c{6..10}_geo_icse_* — every
 * `nodeId` points at an authored enhanced-nodes corpus entry whose
 * enrichment (definition, walkthrough, diagnostics, common misconception)
 * is served by GET /api/content/nodes/{id}/enrichment and rendered through
 * the closed-world MisconceptionPanel loop. No text is invented here:
 * this file carries only ids, short UI labels and quiz target keys.
 */

export interface GeoTopic {
  key: string
  label: string
  /** Authored corpus node for enrichment + misconception content. */
  nodeId: string
}

export interface GeoChapter {
  key: string
  label: string
  topics: GeoTopic[]
}

export interface GeoClassBand {
  key: string
  label: string
  chapters: GeoChapter[]
}

const t = (key: string, label: string, nodeId: string): GeoTopic =>
  ({ key, label, nodeId })

export const GEO_SANDBOX_CLASSES: GeoClassBand[] = [
  {
    key: 'c6', label: 'Class 6',
    chapters: [
      {
        key: 'c6_land', label: 'Landforms',
        topics: [
          t('c6_land_mpp', 'Mountain / plateau / plain', 'c6_geo_icse_01_001'),
          t('c6_land_fold', 'Fold mountains', 'c6_geo_icse_01_002'),
          t('c6_land_block', 'Block mountains & rift valleys', 'c6_geo_icse_01_017'),
          t('c6_land_volc', 'Volcanic mountains', 'c6_geo_icse_01_009'),
        ],
      },
      {
        key: 'c6_water', label: 'Water Bodies (Oceans)',
        topics: [t('c6_water_oc', 'Oceans & seas', 'c6_geo_icse_02_001')],
      },
      {
        key: 'c6_agri', label: 'Agriculture',
        topics: [t('c6_agri_farm', 'Farming types', 'c6_geo_icse_03_001')],
      },
      {
        key: 'c6_min', label: 'Minerals & Ores',
        topics: [t('c6_min_ore', 'Minerals and ores', 'c6_geo_icse_04_001')],
      },
      {
        key: 'c6_earth', label: 'Interior of the Earth',
        topics: [t('c6_earth_int', 'Crust → core', 'c6_geo_icse_05_001')],
      },
      {
        key: 'c6_map', label: 'Map Reading',
        topics: [t('c6_map_col', 'Map colours & symbols', 'c6_geo_icse_06_001')],
      },
    ],
  },
  {
    key: 'c7', label: 'Class 7',
    chapters: [
      {
        key: 'c7_atm', label: 'Atmosphere',
        topics: [t('c7_atm_blanket', 'The atmosphere', 'c7_geo_icse_01_001')],
      },
      {
        key: 'c7_weather', label: 'Weather & Climate',
        topics: [t('c7_weather_wc', 'Weather elements', 'c7_geo_icse_02_001')],
      },
      {
        key: 'c7_rock', label: 'Rocks',
        topics: [t('c7_rock_ign', 'Igneous → sedimentary → metamorphic', 'c7_geo_icse_03_001')],
      },
      {
        key: 'c7_ind', label: 'Industries',
        topics: [t('c7_ind_raw', 'Raw material → finished goods', 'c7_geo_icse_04_001')],
      },
      {
        key: 'c7_energy', label: 'Energy',
        topics: [t('c7_energy_src', 'Conventional & non-conventional energy', 'c7_geo_icse_05_001')],
      },
      {
        key: 'c7_cont', label: 'Europe · Africa · Australia',
        topics: [
          t('c7_cont_eur', 'Europe: countries & cities', 'c7_geo_icse_06_001'),
          t('c7_cont_afr_plateau', 'Africa: the plateau continent', 'c7_geo_icse_06_002'),
          t('c7_cont_afr_phys', 'Africa: physical features', 'c7_geo_icse_06_007'),
          t('c7_cont_afr_life', 'Africa: peoples & life', 'c7_geo_icse_06_010'),
          t('c7_cont_afr_ext', 'Africa: north-to-south extent', 'c7_geo_icse_06_012'),
        ],
      },
      {
        key: 'c7_contour', label: 'Contours & Toposheets',
        topics: [
          t('c7_contour_line', 'Contour lines', 'c7_geo_icse_07_001'),
          t('c7_contour_shapes', 'Contour shapes: hill/valley/spur', 'c7_geo_icse_07_002'),
          t('c7_contour_spacing', 'Steep vs gentle slopes', 'c7_geo_icse_07_003'),
          t('c7_contour_sheet', 'Reading a toposheet', 'c7_geo_icse_07_005'),
        ],
      },
    ],
  },
  {
    key: 'c8', label: 'Class 8',
    chapters: [
      {
        key: 'c8_pop', label: 'Population',
        topics: [
          t('c8_pop_dist', 'Distribution & density', 'c8_geo_icse_01_001'),
          t('c8_pop_over', 'Over- & under-population', 'c8_geo_icse_01_002'),
          t('c8_pop_dyn', 'Birth rate, death rate, growth', 'c8_geo_icse_01_004'),
        ],
      },
      {
        key: 'c8_mig', label: 'Migration & Urbanisation',
        topics: [t('c8_mig_move', 'Why people move', 'c8_geo_icse_02_001')],
      },
      {
        key: 'c8_dis', label: 'Disasters',
        topics: [
          t('c8_dis_hazard', 'Hazard vs disaster', 'c8_geo_icse_04_001'),
          t('c8_dis_mgmt', 'Disaster management', 'c8_geo_icse_04_002'),
          t('c8_dis_eq', 'Earthquake safety: drop-cover-hold', 'c8_geo_icse_04_003'),
          t('c8_dis_src', 'Disaster information sources', 'c8_geo_icse_04_006'),
          t('c8_dis_drill', 'Mock drills', 'c8_geo_icse_04_012'),
        ],
      },
      {
        key: 'c8_asia', label: 'Asia: The Largest Continent',
        topics: [
          t('c8_asia_big', 'Asia: extent & size', 'c8_geo_icse_05_001'),
          t('c8_asia_high', 'Highlands & the Tibetan Plateau', 'c8_geo_icse_05_005'),
          t('c8_asia_basin', 'River basins', 'c8_geo_icse_05_007'),
          t('c8_asia_climate', 'Climate zones north to south', 'c8_geo_icse_05_009'),
          t('c8_asia_veg', 'Natural vegetation belts', 'c8_geo_icse_05_010'),
          t('c8_asia_relief', 'Relief & the monsoon', 'c8_geo_icse_05_013'),
        ],
      },
      {
        key: 'c8_india', label: 'India in the World',
        topics: [t('c8_india_loc', 'India: location & extent', 'c8_geo_icse_06_001')],
      },
      {
        key: 'c8_human', label: 'Human Resources',
        topics: [t('c8_human_res', 'People as a resource', 'c8_geo_icse_07_001')],
      },
    ],
  },
  {
    key: 'c9', label: 'Class 9',
    chapters: [
      {
        key: 'c9_earth', label: 'Earth as a Planet',
        topics: [t('c9_earth_grat', 'Graticule: latitudes & longitudes', 'c9_geo_icse_01_001')],
      },
      {
        key: 'c9_int', label: 'Earth Structure',
        topics: [t('c9_int_layers', 'Crust, mantle, core', 'c9_geo_icse_02_001')],
      },
      {
        key: 'c9_hydro', label: 'Hydrosphere',
        topics: [t('c9_hydro_water', 'Ocean waters', 'c9_geo_icse_03_001')],
      },
      {
        key: 'c9_atm', label: 'Atmosphere',
        topics: [t('c9_atm_layers', 'Layers of the atmosphere', 'c9_geo_icse_04_001')],
      },
      {
        key: 'c9_natreg', label: 'Natural Regions of the World',
        topics: [
          t('c9_natreg_frame', 'What is a natural region?', 'c9_geo_icse_06_001'),
          t('c9_natreg_climate', 'Climate of the seven regions', 'c9_geo_icse_06_002'),
          t('c9_natreg_flora', 'Vegetation of the regions', 'c9_geo_icse_06_003'),
          t('c9_natreg_human', 'Human life in the regions', 'c9_geo_icse_06_005'),
          t('c9_natreg_def', 'Regions defined', 'c9_geo_icse_06_006'),
        ],
      },
      {
        key: 'c9_mapwork', label: 'World Map Work',
        topics: [
          t('c9_map_oc', 'Oceans', 'c9_geo_icse_07_001'),
          t('c9_map_gulf', 'Gulfs & straits', 'c9_geo_icse_07_004'),
          t('c9_map_miss', 'Rivers: Mississippi & Amazon', 'c9_geo_icse_07_006'),
          t('c9_map_appl', 'Mountains: Appalachians & Rockies', 'c9_geo_icse_07_011'),
          t('c9_map_tibet', 'Plateaus: the Tibetan Plateau', 'c9_geo_icse_07_013'),
        ],
      },
    ],
  },
  {
    key: 'c10', label: 'Class 10',
    chapters: [
      {
        key: 'c10_topo', label: 'Toposheets & Grid References',
        topics: [
          t('c10_topo_grid', 'Eastings, northings, grid references', 'c10_geo_icse_01_001'),
          t('c10_topo_cont', 'Contours & relief', 'c10_geo_icse_01_002'),
          t('c10_topo_sym', 'Conventional symbols & colours', 'c10_geo_icse_01_003'),
          t('c10_topo_scale', 'Scale & distance (RF)', 'c10_geo_icse_01_004'),
          t('c10_topo_drain', 'Drainage direction from contours', 'c10_geo_icse_01_007'),
        ],
      },
      {
        key: 'c10_mapindia', label: 'Map of India',
        topics: [
          t('c10_mapindia_ov', 'Outline-map skills overview', 'c10_geo_icse_02_001'),
          t('c10_mapindia_feat', 'Locating physical & political features', 'c10_geo_icse_02_002'),
          t('c10_mapindia_scale', 'Map scale on the India map', 'c10_geo_icse_02_004'),
          t('c10_mapindia_drain', 'Drainage patterns', 'c10_geo_icse_02_006'),
        ],
      },
      {
        key: 'c10_climate', label: 'Climate of India',
        topics: [
          t('c10_climate_ov', 'Climate chapter overview', 'c10_geo_icse_03_001'),
          t('c10_climate_ctrl', 'Controls of India\u2019s climate', 'c10_geo_icse_03_002'),
          t('c10_climate_monsoon', 'The monsoon mechanism', 'c10_geo_icse_03_003'),
          t('c10_climate_graph', 'The climatograph', 'c10_geo_icse_03_007'),
        ],
      },
      {
        key: 'c10_soil', label: 'Soils',
        topics: [t('c10_soil_types', 'Soil types of India', 'c10_geo_icse_04_001')],
      },
      {
        key: 'c10_veg', label: 'Natural Vegetation',
        topics: [t('c10_veg_forest', 'Forest types of India', 'c10_geo_icse_05_001')],
      },
      {
        key: 'c10_water', label: 'Water Management',
        topics: [t('c10_water_mgmt', 'Balancing supply & demand', 'c10_geo_icse_06_001')],
      },
      {
        key: 'c10_minenergy', label: 'Minerals & Energy',
        topics: [
          t('c10_minenergy_dist', 'Mineral belts & power sites', 'c10_geo_icse_07_001'),
          t('c10_minenergy_conc', 'Conventional & non-conventional power', 'c10_geo_icse_07_007'),
        ],
      },
      {
        key: 'c10_agri', label: 'Agriculture (India)',
        topics: [t('c10_agri_crop', 'Cropping patterns', 'c10_geo_icse_08_001')],
      },
      {
        key: 'c10_ind', label: 'Manufacturing Industries',
        topics: [t('c10_ind_loc', 'Industrial location', 'c10_geo_icse_09_001')],
      },
      {
        key: 'c10_transport', label: 'Transport',
        topics: [t('c10_transport_net', 'Roads, rail, waterways, airways', 'c10_geo_icse_10_001')],
      },
      {
        key: 'c10_waste', label: 'Waste Management',
        topics: [t('c10_waste_mgmt', 'Sort, treat, recover', 'c10_geo_icse_11_001')],
      },
    ],
  },
]

/**
 * GEO_TAB_CONFIG — hand-off metadata for the central sandbox page wiring
 * (app/(student)/sandbox/page.tsx is owned by another agent and is wired
 * post-hoc). Shape: { id, label, component } where `component` is the
 * dynamic-import default export of './GeoExplorer'.
 */
export const GEO_TAB_CONFIG = {
  id: 'geo',
  label: '🗺️ Geography Explorer',
  importFactory: () => import('./GeoExplorer'),
} as const

export const totalGeoTopics = GEO_SANDBOX_CLASSES.reduce(
  (n, b) => n + b.chapters.reduce((m, c) => m + c.topics.length, 0), 0)
