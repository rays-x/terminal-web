import {Payload} from 'payload';
import {promiseMap} from '../utils';
import {Logger} from '../config/logger/api-logger';

const importIdQuiz = async (payload: Payload) => {
    // console.log('quiz', quiz);
    await promiseMap(['en', 'ru'], async locale => {
        const quizExists = (await payload.find({
            collection: 'quiz',
            locale,
            depth: 0,
            limit: 999 * 999 * 999
        })).docs;
        await promiseMap(quizExists, async ({id, ...data}) => {
            try {
                await payload.update({
                    id,
                    locale,
                    collection: 'quiz',
                    data
                })
            } catch (e) {
                console.error(id, e);
            }
        });
    })

    Logger.info('import of id fix is done');
};
export default importIdQuiz;
