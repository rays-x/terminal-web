import {Block} from 'payload/types';
import {get} from "lodash";

const Paywall: Block = {
  slug: 'paywall', labels: {
    singular: 'Paywall', plural: 'Paywall'
  }, fields: [{
    label: 'Type',
    type: 'select',
    name: 'paywall_type',
    options: ['slider', 'timeline', 'video'],
    defaultValue: 'slider',
    required: true
  }, {
    name: 'video', type: 'upload', relationTo: 'media', required: true, admin: {
      condition: (data, {paywall_type}) => Boolean(paywall_type === 'video'),
    },
  }, {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      condition: (data, {paywall_type}) => Boolean(['timeline', 'video'].includes(paywall_type)),
    }
  },
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      fields: [{
        name: 'title',
        type: 'text',
        required: true,
      }, {
        name: 'file',
        type: 'upload',
        relationTo: 'media',
        required: true
      }], admin: {
        condition: (data, {paywall_type}) => Boolean(paywall_type === 'slider'),
      }
    }, {
      name: 'items', type: 'array', minRows: 2, maxRows: 3, fields: [{
        name: 'title', type: 'text', required: true
      }, {
        name: 'subtitle', type: 'text', required: true
      }, {
        name: 'price', type: 'text', required: true, admin: {
          condition: (root, {id}) => {
            const parent = Array.from(get(root, 'items', [])).find(_ => Array.from(get(_, 'items', [])).find(_ => get(_, 'id') === id))
            return get(parent, 'paywall_type') === 'slider'
          },
        },
      }, {
        name: 'file', type: 'upload', relationTo: 'media', required: true, admin: {
          condition: (root, {id}) => {
            const parent = Array.from(get(root, 'items', [])).find(_ => Array.from(get(_, 'items', [])).find(_ => get(_, 'id') === id))
            return get(parent, 'paywall_type') === 'timeline'
          },
        },
      }, {
        name: 'bonus', type: 'text', admin: {
          condition: (root, {id}) => {
            const parent = Array.from(get(root, 'items', [])).find(_ => Array.from(get(_, 'items', [])).find(_ => get(_, 'id') === id))
            return get(parent, 'paywall_type') === 'slider'
          },
        },
      }, {
        name: 'badge', type: 'text', admin: {
          condition: (root, {id}) => {
            const parent = Array.from(get(root, 'items', [])).find(_ => Array.from(get(_, 'items', [])).find(_ => get(_, 'id') === id))
            return get(parent, 'paywall_type') === 'slider'
          },
        },
      },]
    }, {
      name: 'beforeButton', type: 'group', required: true, fields: [{
        type: 'text', name: 'title', required: true
      }, {
        type: 'text', name: 'subtitle',
      }], admin: {
        condition: (data, {paywall_type}) => Boolean(paywall_type === 'timeline'),
      }
    }, {
      name: 'button', type: 'text', required: true
    }],
};
export default Paywall