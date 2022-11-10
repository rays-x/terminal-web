import {get} from "lodash";

const isAdmin = ({req: {user}}) => get(user, 'roles', []).includes('admin')
const adminAccess = {
    admin: isAdmin,
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin
}
export default adminAccess