import Pelayanan from '../containers/main/pelayanan';
import Keuangan from '../containers/main/keuangan';
import { IUserData } from '../store/sessions/reducer';
import { BulbTwoTone, DollarCircleTwoTone } from '@ant-design/icons';

const getRoutes = (userData: IUserData) => {
    const routes = [
        {
            path: '/pelayanan',
            component: Pelayanan,
            text: 'Pelayanan',
            // hidden: userData.position.title !== 'Pelayanan',
            hidden: false,
            icon: BulbTwoTone,
        },
        {
            path: '/keuangan',
            component: Keuangan,
            text: 'Keuangan',
            // hidden: userData.position.title !== 'Keuangan',
            hidden: false,
            icon: DollarCircleTwoTone,
        },
    ];
    return routes;
};

export default getRoutes;
