export interface IUserData {
    access: {
        claim: {
            create: boolean;
            read: boolean;
            update: boolean;
        };
        bpu: {
            create: boolean;
            read: boolean;
            update: boolean;
        };
        mppa_pk: {
            create: boolean;
            read: boolean;
            update: boolean;
        };
    };
    _id: string;
    username: string;
    displayName: string;
    email: string;
    position: {
        title: string;
        branch: string;
    };
}

export interface ISessionState {
    isLogin: boolean;
    loading: boolean;
    userData: IUserData;
}
export interface ISessionAction {
    type: ISessionActionType;
    data: any;
}
type ISessionActionType = 'SET_LOADING' | 'SET_PROFILE' | 'RESET';

const defaultValue: ISessionState = {
    isLogin: false,
    loading: false,
    userData: {
        access: {
            claim: {
                create: false,
                read: false,
                update: false,
            },
            bpu: {
                create: false,
                read: false,
                update: false,
            },
            mppa_pk: {
                create: false,
                read: false,
                update: false,
            },
        },
        _id: '',
        username: '',
        displayName: '',
        email: '',
        position: {
            title: '',
            branch: '',
        },
    },
};

export default function reducer(state = defaultValue, action: ISessionAction) {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                isLogin: true,
                userData: action.data,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.data,
            };
        case 'RESET':
            return defaultValue;
        default:
            return state;
    }
}
