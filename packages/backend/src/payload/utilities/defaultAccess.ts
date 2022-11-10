import {get} from "lodash";

const isAdmin = ({req: {user}}) => get(user, 'roles', []).includes('admin')
const defaultAccess = {
    admin: isAdmin,
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin
}
export default defaultAccess