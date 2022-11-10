import {modelOptions, prop, Ref, plugin, post, pre} from '@typegoose/typegoose';
import {_BaseEntity} from './_BaseEntity';
import {defaultModelOptions, defaultSchemaOptions} from '../mongoose.config';
import autopopulate from 'mongoose-autopopulate';
import UserEntity from "./User";

export enum MatchType {
    like = 'like',
    dislike = 'dislike',
}

@plugin(autopopulate)
@modelOptions({
    ...defaultModelOptions,
    schemaOptions: {
        ...defaultSchemaOptions,
        toJSON: {
            ...defaultSchemaOptions.toJSON,
            virtuals: true,
            transform: (doc, {_id, createdAt, updatedAt, ...rest}) => ({
                id: _id,
                createdAt,
                updatedAt,
                ...rest
            })
        },
        collection: 'matches'
    }
})
@post<MatchesEntity>('save', (match) => {
    console.log('match', match)
    // chatEmitter.emit('')
})
@pre<MatchesEntity>('save', (match) => {
    console.log('match', match)
    // chatEmitter.emit('')
})
export class MatchesEntity extends _BaseEntity {
    @prop({
        required: true,
        ref: () => UserEntity,
    })
    author!: Ref<UserEntity>;
    @prop({
        required: true,
        ref: () => UserEntity,
    })
    target!: Ref<UserEntity>;
    @prop({
        required: true,
        enum: MatchType,
    })
    type!: MatchType;
}

export const MatchesEntityDefaultSelect = [
    'id',
    'author',
    'target',
    'type',
];
export default MatchesEntity;
