import { estimateKwhFromBill } from './src/lib/calculator/calculateSlabBill';
import { tariffDatabase } from './src/data/tariffs/database';
const res = estimateKwhFromBill(5000, tariffDatabase[3]);
console.log(res);
