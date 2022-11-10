import {SanitizedCollectionConfig} from 'payload/dist/collections/config/types';
import {Endpoint} from 'payload/dist/config/types';
import find from 'payload/dist/collections/requestHandlers/find';
import create from 'payload/dist/collections/requestHandlers/create';
import findVersions from 'payload/dist/collections/requestHandlers/findVersions';
import findVersionByID from 'payload/dist/collections/requestHandlers/findVersionByID';
import restoreVersion from 'payload/dist/collections/requestHandlers/restoreVersion';
import deleteHandler from 'payload/dist/collections/requestHandlers/delete';
import findByID from 'payload/dist/collections/requestHandlers/findByID';
import update, {deprecatedUpdate} from 'payload/dist/collections/requestHandlers/update';

const buildEndpoints = (collection: SanitizedCollectionConfig): Endpoint[] => {
    let {endpoints} = collection;
    if (collection.versions) {
        endpoints = endpoints.concat([
            {
                path: '/versions',
                method: 'get',
                handler: findVersions
            },
            {
                path: '/versions/:id',
                method: 'get',
                handler: findVersionByID
            },
            {
                path: '/versions/:id',
                method: 'post',
                handler: restoreVersion
            }
        ]);
    }
    return endpoints.concat([
        {
            path: '/',
            method: 'get',
            handler: find
        },
        {
            path: '/',
            method: 'post',
            handler: create
        },
        {
            path: '/:id',
            method: 'put',
            handler: deprecatedUpdate
        },
        {
            path: '/:id',
            method: 'patch',
            handler: update,
        },
        {
            path: '/:id',
            method: 'get',
            handler: findByID
        },
        {
            path: '/:id',
            method: 'delete',
            handler: deleteHandler
        }
    ]);
};
export default buildEndpoints;
