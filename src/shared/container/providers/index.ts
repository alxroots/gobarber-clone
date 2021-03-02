import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProviders from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProviders>(
    'StorageProvider',
    DiskStorageProvider
);

