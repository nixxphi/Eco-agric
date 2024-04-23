import VendorModel from './vendor.model.js';
import MarketItem from './marketItem.model.js';
Import CustomerModel from './customer.model.js';

import GenericService from './generic.service.js';


const vendorService = new GenericService(VendorModel);
const marketItemService = new GenericService(MarketItemModel);
const customerService = new GenericService(CustomerModel);


export { vendorService, marketItemService, customerService};
