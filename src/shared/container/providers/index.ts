import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProviders from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProviders>(
    'StorageProvider',
    DiskStorageProvider
);

