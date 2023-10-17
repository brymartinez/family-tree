import { DataSource } from './data/datasource';

const datasource = DataSource.getInstance();

datasource.addParent('Bill', 'Arthur', 'M');
datasource.addParent('Bill', 'Margret', 'F');
console.log(datasource.get(false, 'Bill'));
console.log(datasource.get(true, 'Bill'));
datasource.addSibling('Bill', 'Charlie', 'M');
console.log(datasource.get(true, 'Bill'));
