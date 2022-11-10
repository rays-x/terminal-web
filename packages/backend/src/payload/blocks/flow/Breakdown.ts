import {Block} from 'payload/types';
import {QuestionMessage} from "../quiz/QuestionMessage";
import {VerticalActions} from "../quiz/VerticalActions";
import QuestionMatchesMessage from "../quiz/QuestionMatchesMessage";

const Breakdown: Block = {
    slug: 'breakdown',
    labels: {
        singular: 'Breakdown',
        plural: 'Breakdowns'
    },
    fields: [
        {
            name: 'items',
            label: 'Items',
            type: 'blocks',
            minRows: 1,
            blocks: [
                QuestionMessage,
                QuestionMatchesMessage,
            ],
        },
        {
            name: 'answer',
            type: 'blocks',
            maxRows: 1,
            minRows: 1,
            blocks: [
                VerticalActions,
            ],
        },
    ],
};
export default Breakdown