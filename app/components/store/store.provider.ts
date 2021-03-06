import { InMemoryStoreService } from './in-memory-store.service';
import { LocalStorageStoreService } from './local-storage-store.service';
import { StoreService } from './store.service';

const storeFactory = (): StoreService => {
	if (window && window.localStorage) {
		try {
			window.localStorage.setItem("____test", "success");
			window.localStorage.removeItem("____test");
			return new LocalStorageStoreService(window);
		} catch (e) {

		}
	}
	return new InMemoryStoreService();
};

export let StoreProvider = {
	provide: StoreService,
	useFactory: storeFactory,
	deps: []
};
