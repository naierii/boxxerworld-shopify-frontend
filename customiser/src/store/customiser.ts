/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CustomProductFragment,
  CustomProductPartFragment,
  FlagFragment,
  MaterialFragment,
  Maybe,
  ModelFragment,
  Scalars,
} from '@graphql/generated/graphql';
import {
  ShopifyProductVariantFragment,
  ShopifyShopifyGetProductByIdQuery,
} from '@graphql/generated/graphql-shopify';
import { MaterialTextureModel } from '@models';
import produce from 'immer';
import { Euler, Vector3 } from 'three';
import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import { UNIT } from './constants';
interface SelectedModel {
  optionId: Scalars['ID'];
  model?: Maybe<ModelFragment>;
}

interface Part {
  part: CustomProductPartFragment;
  material: MaterialFragment;
}

export interface FlagCustomiser {
  key?: string;
  flag?: FlagFragment;
  canvasJSON?: any;
  materialJSON?: any;
  decalPosition?: Vector3;
  decalOrientation?: Euler;
  decalRotation?: number;
  decalScale?: number;
  decalFreeze?: boolean;
  edit?: boolean;
}
export interface NavItem {
  id?: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  type: 'option' | 'part' | 'fitting' | 'size' | 'flags' | 'names';
  index?: number;
  required?: boolean;
}
interface SizingMeasurement {
  value?: number;
  unit?: string;
}
export interface CustomiserState {
  canvas?: {
    width: number;
    height: number;
  };
  customProduct?: CustomProductFragment;
  selectedModels: SelectedModel[];
  savedModels: SelectedModel[];
  selectedPart: Maybe<CustomProductPartFragment>;
  navItems: NavItem[];
  selectedNav: Maybe<NavItem>;
  parts: Part[];
  savedParts: Part[];
  flags: FlagCustomiser[];
  variations: Array<ShopifyProductVariantFragment>;
  sizing?: {
    height?: SizingMeasurement;
    weight?: SizingMeasurement;
    variation?: ShopifyProductVariantFragment;
  };
  decalPosition?: Vector3;
  decalRotation?: Euler;
  decalScale?: number;
  decalFreeze: boolean;
}

export interface CustomiserActions {
  total: () => string;
  setSelectedModel: (optionId: Scalars['ID'], model?: Maybe<ModelFragment>) => void;
  setCustomProduct: (
    customProduct: CustomProductFragment,
    shopifyProduct: ShopifyShopifyGetProductByIdQuery,
  ) => void;
  setSelectedPart: (data: CustomProductPartFragment) => void;
  setPart: (part: CustomProductPartFragment, material: MaterialFragment) => void;
  setSelectedNav: (index: number, save?: boolean) => void;
  setCanvasSize: (width: number, height: number) => void;
  setSizing: (
    height?: SizingMeasurement,
    weight?: SizingMeasurement,
    variation?: ShopifyProductVariantFragment,
  ) => void;
  cancelPartChange: () => void;
  addFlag: (flag: FlagCustomiser) => void;
  updateFlag: (key: string, flag: FlagCustomiser) => void;
  deleteFlag: (key: string) => void;
  resetNav: () => void;
  texture: (nodeId: string) => MaterialTextureModel;
  reset: () => void;
  setDecalPosition: (position: Vector3) => void;
  setDecalRotation: (rotation: Euler) => void;
  setDecalFreeze: (freeze: boolean) => void;
}

const initialState: CustomiserState = {
  selectedModels: [],
  savedModels: [],
  selectedPart: null,
  navItems: [],
  selectedNav: null,
  parts: [],
  savedParts: [],
  flags: [],
  variations: [],
  sizing: {
    height: {
      unit: UNIT.HEIGHT.CM,
    },
    weight: {
      unit: UNIT.WEIGHT.KG,
    },
  },
  decalFreeze: false,
};

const createCustomiser: StateCreator<
  CustomiserState & CustomiserActions,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  []
> = (set, get) => ({
  ...initialState,
  total: () => {
    let total = 0;
    const variation = get().sizing?.variation;
    if (variation?.price.amount) {
      total = total + Number(variation.price.amount);
    }

    get().parts.forEach((part) => {
      const priceAdjust = part.part.areaSize?.data?.attributes?.priceAdjust ?? 1;
      const price = part.material.attributes?.price?.data?.attributes?.price ?? 0;
      const sum = priceAdjust * price;
      total = total + sum;
    });

    return total.toFixed(2);
  },
  setCustomProduct: (customProduct, shopifyProduct) => {
    let dataToSet: {
      customProduct: CustomProductFragment;
      selectedModels?: SelectedModel[];
      savedModels?: SelectedModel[];
      navItems?: NavItem[];
      selectedNav?: NavItem;
      variations?: Array<ShopifyProductVariantFragment>;
    } = {
      customProduct,
      variations: shopifyProduct.product?.variants.nodes,
    };

    if (!get().selectedModels.length && customProduct.attributes?.options) {
      const models: SelectedModel[] = [];
      customProduct.attributes.options.forEach((option) => {
        if (option?.models?.length && option?.models[0]?.model?.data) {
          models.push({ optionId: option.id, model: option?.models[0]?.model?.data });
        }
      });

      const navFitting: NavItem = {
        name: 'Fitting',
        type: 'fitting',
        required: true,
      };

      const navParts: NavItem[] =
        customProduct.attributes.parts?.map((o) => ({
          id: o?.id ?? '',
          name: o?.name ?? '',
          type: 'part',
          required: !o?.optional,
        })) ?? [];

      const navSize: NavItem = {
        name: 'Size',
        type: 'size',
        required: true,
      };

      const navFlags: NavItem = {
        name: 'Flags',
        type: 'flags',
      };

      const navNames: NavItem = {
        name: 'Text',
        type: 'names',
      };

      const navItems = [navFitting, ...navParts, navNames, navFlags, navSize].map((i, index) => {
        i.index = index;
        return i;
      });

      dataToSet = {
        ...dataToSet,
        selectedModels: models,
        savedModels: models,
        navItems: navItems,
        selectedNav: navItems[0],
      };
    }

    set(dataToSet);
  },
  setCanvasSize: (width, height) => {
    set(
      produce((state: CustomiserState) => {
        state.canvas = { width, height };
      }),
    );
  },
  setSizing: (height, weight, variation) => {
    set(
      produce((state: CustomiserState) => {
        if (height) {
          state.sizing = { ...state.sizing, height };
        }
        if (weight) {
          state.sizing = { ...state.sizing, weight };
        }
        if (variation) {
          state.sizing = { ...state.sizing, variation };
        }
      }),
    );
  },
  setSelectedModel: (id, model) => {
    set(
      produce((state: CustomiserState) => {
        const option = state.selectedModels.find((m) => m.optionId === id);

        if (option) {
          option.model = model;
        }
      }),
    );
  },
  setPart: (part, material) => {
    set(
      produce((state: CustomiserState) => {
        const findPart = state.parts.find((p) => p.part.id === part.id);
        if (findPart) {
          findPart.material = material;
        } else {
          state.parts.push({ part, material });
        }
      }),
    );
  },
  setSelectedPart: (data) => set({ selectedPart: data }),
  setSelectedNav: (index, save) =>
    set(
      produce((state: CustomiserState) => {
        const navItem = state.navItems.find((n) => n.index === index);

        if (navItem) {
          state.selectedNav = navItem;

          if (navItem.type === 'part') {
            const part = state.customProduct?.attributes?.parts?.find((o) => o?.id === navItem.id);
            if (part) {
              state.selectedPart = part;
            }
          } else {
            state.selectedPart = null;
          }
        }

        if (save) {
          state.savedParts = state.parts;
          state.savedModels = state.selectedModels;
        }
      }),
    ),
  resetNav: () => set({ selectedPart: null }),
  cancelPartChange: () =>
    set(
      produce((state: CustomiserState) => {
        state.parts = state.savedParts;
        state.selectedModels = state.savedModels;
      }),
    ),
  texture: (nodeId) => {
    const parts = get().parts;
    let materials: MaterialTextureModel = {};
    for (const p of parts) {
      const test = p.part.modelParts?.data.map((mp) => mp?.attributes?.nodeId).indexOf(nodeId);
      if (test != -1 && p?.material?.attributes?.images) {
        p.material.attributes.images?.forEach((image) => {
          materials = {
            ...materials,
            [image?.mapType as string]: image?.image?.data?.attributes?.url as string,
          };
        });

        break;
      }
    }
    return materials;
  },
  addFlag: (flag) => {
    set(
      produce((state: CustomiserState) => {
        const newKey = flag.key ?? uuidv4();
        state.flags = [...state.flags, { ...flag, key: newKey, edit: true, decalFreeze: false }];
      }),
    );
  },
  updateFlag: (key, flag) => {
    set(
      produce((state: CustomiserState) => {
        state.flags = [
          ...state.flags.map((f) => {
            if (f.key === key) {
              return { ...f, ...flag };
            }
            return f;
          }),
        ];
      }),
    );
  },
  deleteFlag: (key) => {
    set(
      produce((state: CustomiserState) => {
        state.flags = [...state.flags.filter((f) => f.key !== key)];
      }),
    );
  },
  reset: () => {
    set((state) => {
      useCustomiserStore.persist.clearStorage();
      return {
        ...initialState,
      };
    });
  },
  setDecalPosition: (data) => set({ decalPosition: data }),
  setDecalRotation: (data) => set({ decalRotation: data }),
  setDecalFreeze: (data) => set({ decalFreeze: data }),
});

export const useCustomiserStore = create<CustomiserState & CustomiserActions>()(
  devtools(
    persist((...a) => ({
      ...createCustomiser(...a),
    })),
  ),
);
