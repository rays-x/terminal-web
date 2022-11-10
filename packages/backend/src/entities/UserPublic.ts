import {index, modelOptions, prop, Ref, plugin} from '@typegoose/typegoose';
import {_BaseEntity} from './_BaseEntity';
import {defaultModelOptions, defaultSchemaOptions} from '../mongoose.config';
import autopopulate from "mongoose-autopopulate";
import {get} from "lodash";
import PhotoEntity from "./Photos";

class Photo {
    @prop({
        ref: () => PhotoEntity,
        autopopulate: {
            select: [
                'id',
                'filename',
                'url'
            ]
        },
    })
    public photo?: Ref<PhotoEntity>;
}

@plugin(autopopulate)
@modelOptions({
    ...defaultModelOptions,
    schemaOptions: {
        ...defaultSchemaOptions,
        toJSON: {
            ...defaultSchemaOptions.toJSON,
            // virtuals: true,
            transform: (doc, {_id, createdAt, updatedAt, name, photos}) => ({
                id: _id,
                createdAt,
                updatedAt,
                name,
                photos: (photos || []).map(_ => get(_, 'photo'))
            })
        },
        collection: 'user'
    }
})
export class UserPublicEntity extends _BaseEntity {
    @prop()
    name?: string;
    @prop({
        default: [],
        type: () => Photo
    })
    photos?: Photo[];
}

export const UserPublicEntityDefaultSelect = [
    'id',
    'name',
    'photos'
];
export default UserPublicEntity;
