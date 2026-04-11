import { Product } from "./types";
import { chairs } from "./chairs/data";
import { tables } from "./tables/data";
import { doors } from "./doors/data";
import { windows } from "./windows/data";
import { sofas } from "./sofas/data";
import { beds } from "./beds/data";
import { wardrobes } from "./wardrobes/data";
import { shelves } from "./shelves/data";
import { categories, categoriesArea } from "./categories/data";
import { contactData } from "./contact";

export * from "./types";
export { categories, categoriesArea, contactData };

export const productsArea: Record<string, Product[]> = {
    chairs,
    tables,
    doors,
    windows,
    sofas,
    beds,
    wardrobes,
    shelves
};

export const products: Product[] = Object.values(productsArea).flat();
