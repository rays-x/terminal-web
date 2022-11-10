import {Payload} from 'payload';
import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import express from 'express';
import passport from 'passport';
import {buildVersionCollectionFields} from 'payload/dist/versions/buildCollectionFields';
import buildQueryPlugin from 'payload/dist/mongoose/buildQuery';
import buildCollectionSchema from 'payload/dist/collections/buildSchema';
import buildSchema from 'payload/dist/mongoose/buildSchema';
import bindCollectionMiddleware from 'payload/dist/collections/bindCollection';
import {CollectionModel, SanitizedCollectionConfig} from 'payload/dist/collections/config/types';
import {getVersionsModelName} from 'payload/dist/versions/getVersionsModelName';
import mountEndpoints from 'payload/dist/express/mountEndpoints';
//
import buildEndpoints from './buildEndpoints';

export default function registerCollections(ctx: Payload): void {
    ctx.config.collections = ctx.config.collections.map((collection: SanitizedCollectionConfig) => {
        const formattedCollection = collection;
        const schema = buildCollectionSchema(formattedCollection, ctx.config);
        if (collection.versions) {
            const versionModelName = getVersionsModelName(collection);
            const versionSchema = buildSchema(
                ctx.config,
                buildVersionCollectionFields(collection),
                {
                    disableUnique: true,
                    options: {
                        timestamps: true
                    }
                }
            );
            versionSchema.plugin<typeof paginate, any>(paginate, {useEstimatedCount: true})
                .plugin(buildQueryPlugin);
            ctx.versions[collection.slug] = mongoose.model(versionModelName, versionSchema) as CollectionModel;
        }
        ctx.collections[formattedCollection.slug] = {
            Model: mongoose.model(formattedCollection.slug, schema) as CollectionModel,
            config: formattedCollection
        };
        // If not local, open routes
        if (!ctx.local) {
            const router = express.Router();
            const {slug} = collection;
            router.all('*', bindCollectionMiddleware(ctx.collections[formattedCollection.slug]));
            if (collection.auth) {
                if (Array.isArray(collection.auth.strategies)) {
                    collection.auth.strategies.forEach(({strategy}) => {
                        passport.use(strategy as any);
                    });
                }
            }
            const endpoints = buildEndpoints(collection);
            mountEndpoints(ctx.express, router, endpoints);
            ctx.router.use(`/${slug}`, router);
        }
        return formattedCollection;
    });
}
